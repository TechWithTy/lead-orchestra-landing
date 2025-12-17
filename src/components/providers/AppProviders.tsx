"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Suspense, useEffect, useMemo, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { Toaster } from "@/components/ui/toaster";
import BodyThemeSync from "@/contexts/BodyThemeSync";
import { AnalyticsConsentProvider } from "@/contexts/analytics-consent-context";
import { ThemeProvider } from "@/contexts/theme-context";

import type { AnalyticsConfig } from "@/lib/analytics/config";

import { ChunkErrorHandler } from "./ChunkErrorHandler";
import NextAuthProvider from "./NextAuthProvider";

const SuspenseFallback = () => (
	<div className="min-h-screen w-full bg-slate-950 text-white">
		<div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
			<div className="animate-spin rounded-full border-2 border-white/30 border-t-transparent p-3" />
			<p className="font-semibold text-white/70 text-xs uppercase tracking-[0.3em]">
				Preparing interface
			</p>
		</div>
	</div>
);

interface AppProvidersProps {
	children: ReactNode;
	clarityProjectId?: string;
	zohoWidgetCode?: string;
	facebookPixelId?: string;
	plausibleDomain?: string;
	plausibleEndpoint?: string;
	initialAnalyticsConfig?: Partial<AnalyticsConfig>;
}

const ClientExperience = dynamic(
	() =>
		import("./ClientExperience")
			.then((mod) => {
				console.log("[AppProviders] ClientExperience dynamic import SUCCESS");
				return {
					default: mod.ClientExperience,
				};
			})
			.catch((error) => {
				console.error("[AppProviders] ClientExperience dynamic import FAILED", error);
				// Return a fallback component that logs the error
				return {
					default: () => {
						console.error("[AppProviders] ClientExperience fallback rendered due to import error");
						return null;
					},
				};
			}),
	{ ssr: false, loading: () => {
		console.log("[AppProviders] ClientExperience loading...");
		return null;
	} },
);

// Immediate top-level logging to verify env vars at module load time
if (typeof window !== "undefined") {
	console.log("[AppProviders] Module loaded - Env check:", {
		NEXT_PUBLIC_ANALYTICS_AUTOLOAD: process.env.NEXT_PUBLIC_ANALYTICS_AUTOLOAD,
		NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
		NODE_ENV: process.env.NODE_ENV,
	});
}

export function AppProviders({
	children,
	clarityProjectId,
	zohoWidgetCode,
	facebookPixelId,
	plausibleDomain,
	plausibleEndpoint,
	initialAnalyticsConfig,
}: AppProvidersProps) {
	// Log immediately when component function is called
	console.log("[AppProviders] Component function called", {
		hasWindow: typeof window !== "undefined",
		NEXT_PUBLIC_ANALYTICS_AUTOLOAD: process.env.NEXT_PUBLIC_ANALYTICS_AUTOLOAD,
		NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
	});

	const [queryClient] = useState(() => new QueryClient());
	const defaultAnalyticsConsent =
		process.env.NEXT_PUBLIC_ANALYTICS_AUTOLOAD === "true";

	// Debug logging to verify env var is being read
	useEffect(() => {
		console.log("[AppProviders] Analytics consent debug:", {
			NEXT_PUBLIC_ANALYTICS_AUTOLOAD:
				process.env.NEXT_PUBLIC_ANALYTICS_AUTOLOAD,
			defaultAnalyticsConsent,
			type: typeof process.env.NEXT_PUBLIC_ANALYTICS_AUTOLOAD,
		});
	}, [defaultAnalyticsConsent]);

	const analyticsProps = useMemo(
		() => ({
			clarityProjectId,
			zohoWidgetCode,
			facebookPixelId,
			plausibleDomain,
			plausibleEndpoint,
			initialAnalyticsConfig,
		}),
		[
			clarityProjectId,
			facebookPixelId,
			initialAnalyticsConfig,
			plausibleDomain,
			plausibleEndpoint,
			zohoWidgetCode,
		],
	);

	return (
		<AnalyticsConsentProvider defaultConsent={defaultAnalyticsConsent}>
			<ThemeProvider>
				<ChunkErrorHandler />
				<BodyThemeSync />
				<Suspense fallback={<SuspenseFallback />}>
					<Toaster />
					<NextAuthProvider>
						<QueryClientProvider client={queryClient}>
							<PageLayout>{children}</PageLayout>
						</QueryClientProvider>
					</NextAuthProvider>
				</Suspense>
				<ClientExperience {...analyticsProps} />
			</ThemeProvider>
		</AnalyticsConsentProvider>
	);
}
