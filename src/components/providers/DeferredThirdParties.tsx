import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
	AnalyticsConfig,
	AnalyticsField,
	AnalyticsIssue,
} from "@/lib/analytics/config";

import { Analytics } from "@/components/analytics/Analytics";
import { useAnalyticsConsent } from "@/contexts/analytics-consent-context";
import { useDeferredLoad } from "./useDeferredLoad";

const ANALYTICS_FIELDS: AnalyticsField[] = [
	"clarityId",
	"gaId",
	"gtmId",
	"zohoCode",
	"facebookPixelId",
	"plausibleDomain",
	"plausibleEndpoint",
];

const DEFAULT_PLAUSIBLE_ENDPOINT = "https://plausible.io/api/event";

const DEFAULT_RETRY_DELAY_MS = 2000;
const DEFAULT_MAX_RETRIES = 3;

const warnLog = (message: string, data?: unknown) => {
	console.warn("DeferredThirdParties", message, data);
};

const MicrosoftClarityScript = ({ projectId }: { projectId?: string }) => {
	useEffect(() => {
		if (!projectId || typeof window === "undefined") {
			return;
		}

		if (document.getElementById("clarity-script")) {
			return;
		}

		const script = document.createElement("script");
		script.id = "clarity-script";
		script.type = "text/javascript";
		script.innerHTML = `
                        (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${projectId}");
                `;
		document.head.appendChild(script);

		return () => {
			document.getElementById("clarity-script")?.remove();
		};
	}, [projectId]);

	return null;
};

const PlausibleScript = ({
	domain,
	endpoint,
}: {
	domain?: string;
	endpoint?: string;
}) => {
	useEffect(() => {
		if (!domain || typeof window === "undefined") {
			return;
		}

		let isMounted = true;

		const load = async () => {
			try {
				const { init } = await import("@plausible-analytics/tracker");
				if (!isMounted) {
					return;
				}
				init({
					domain,
					endpoint: endpoint || DEFAULT_PLAUSIBLE_ENDPOINT,
					autoCapturePageviews: true,
					captureOnLocalhost: false,
				});
			} catch (error) {
				warnLog("Failed to initialize Plausible Analytics.", error);
			}
		};

		void load();

		return () => {
			isMounted = false;
		};
	}, [domain, endpoint]);

	return null;
};

const FacebookPixelScript = ({ pixelId }: { pixelId?: string }) => {
	useEffect(() => {
		if (!pixelId || typeof window === "undefined") {
			return;
		}

		if (window.fbq) {
			// Already initialized
			return;
		}

		let isMounted = true;

		const load = async () => {
			try {
				const ReactPixel = await import("react-facebook-pixel");
				if (!isMounted) {
					return;
				}
				ReactPixel.default.init(pixelId);
				// Track initial page view
				ReactPixel.default.pageView();
			} catch (error) {
				warnLog("Failed to initialize Facebook Pixel.", error);
			}
		};

		void load();

		return () => {
			isMounted = false;
		};
	}, [pixelId]);

	return null;
};

function useZohoLoader(enabled: boolean, zohoCode?: string) {
	useEffect(() => {
		if (!enabled || !zohoCode || typeof window === "undefined") {
			return;
		}

		if (document.getElementById("zsiqscript")) {
			return;
		}

		window.$zoho = window.$zoho || {};
		window.$zoho.salesiq = window.$zoho.salesiq || {
			widgetcode: "",
			values: {},
			ready: () => undefined,
		};

		const script = document.createElement("script");
		script.id = "zsiqscript";
		script.src = `https://salesiq.zohopublic.com/widget?wc=${zohoCode}`;
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);

		return () => {
			document.getElementById("zsiqscript")?.remove();
		};
	}, [enabled, zohoCode]);
}

interface ProviderResponse extends AnalyticsConfig {
	warnings?: AnalyticsIssue[];
	fallbacksUsed?: Partial<Record<AnalyticsField, boolean>>;
}

interface DeferredThirdPartiesProps {
	clarityProjectId?: string;
	zohoWidgetCode?: string;
	facebookPixelId?: string;
	plausibleDomain?: string;
	plausibleEndpoint?: string;
	retryDelayMs?: number;
	maxRetries?: number;
	maxWaitMs?: number;
	initialConfig?: Partial<AnalyticsConfig>;
}

export function DeferredThirdParties({
	clarityProjectId,
	zohoWidgetCode,
	facebookPixelId,
	plausibleDomain,
	plausibleEndpoint,
	retryDelayMs = DEFAULT_RETRY_DELAY_MS,
	maxRetries = DEFAULT_MAX_RETRIES,
	maxWaitMs,
	initialConfig,
}: DeferredThirdPartiesProps) {
	// Immediate logging at component start (before any early returns)
	if (typeof window !== "undefined") {
		console.log("[DeferredThirdParties] Component rendering", {
			hasWindow: true,
			NEXT_PUBLIC_ANALYTICS_AUTOLOAD:
				process.env.NEXT_PUBLIC_ANALYTICS_AUTOLOAD,
			NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
		});
	}

	const mergedInitialConfig = useMemo<AnalyticsConfig>(() => {
		const base: AnalyticsConfig = {};

		const apply = (config?: Partial<AnalyticsConfig>) => {
			for (const field of ANALYTICS_FIELDS) {
				const value = config?.[field];
				if (value) {
					base[field] = value;
				}
			}
		};

		apply(initialConfig);
		apply({
			clarityId: clarityProjectId,
			zohoCode: zohoWidgetCode,
			facebookPixelId,
			plausibleDomain,
			plausibleEndpoint,
		});

		if (!base.plausibleEndpoint) {
			base.plausibleEndpoint = DEFAULT_PLAUSIBLE_ENDPOINT;
		}

		return base;
	}, [
		clarityProjectId,
		initialConfig,
		facebookPixelId,
		plausibleDomain,
		plausibleEndpoint,
		zohoWidgetCode,
	]);

	const { hasConsented } = useAnalyticsConsent();
	const analyticsAutoload =
		process.env.NEXT_PUBLIC_ANALYTICS_AUTOLOAD === "true";

	// When autoload is enabled, immediately enable loading without deferred logic
	// This matches the working implementation pattern
	const deferredShouldLoad = useDeferredLoad({
		enabled: hasConsented && !analyticsAutoload, // Only use deferred loading if autoload is disabled
		requireInteraction: true,
		timeout: typeof maxWaitMs === "number" ? maxWaitMs : 0,
	});

	const shouldLoad =
		analyticsAutoload && hasConsented
			? true // Immediately enable if autoload is on and consent is granted
			: deferredShouldLoad;
	const [providerData, setProviderData] = useState<ProviderResponse | null>(
		null,
	);
	const [config, setConfig] = useState<AnalyticsConfig>(mergedInitialConfig);
	const [attempt, setAttempt] = useState(0);
	const retryTimerRef = useRef<number | null>(null);
	const errorLoggedRef = useRef(false);

	useEffect(() => {
		setConfig((prev) => ({ ...mergedInitialConfig, ...prev }));
	}, [mergedInitialConfig]);

	const needsServerConfig = useMemo(
		() => ANALYTICS_FIELDS.some((field) => !config[field]),
		[config],
	);

	useEffect(() => {
		return () => {
			if (retryTimerRef.current) {
				window.clearTimeout(retryTimerRef.current);
				retryTimerRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (!hasConsented) {
			return;
		}
		if (shouldLoad && needsServerConfig) {
			setAttempt(0);
		}
	}, [hasConsented, needsServerConfig, shouldLoad]);

	const scheduleRetry = useCallback(() => {
		if (typeof window === "undefined") {
			return;
		}

		if (retryTimerRef.current) {
			window.clearTimeout(retryTimerRef.current);
		}

		retryTimerRef.current = window.setTimeout(() => {
			setAttempt((prev) => {
				if (prev >= maxRetries) {
					return prev;
				}

				return prev + 1;
			});
			retryTimerRef.current = null;
		}, retryDelayMs);
	}, [maxRetries, retryDelayMs]);

	useEffect(() => {
		if (
			!hasConsented ||
			!shouldLoad ||
			providerData ||
			attempt > maxRetries ||
			!needsServerConfig
		) {
			return;
		}

		let isCancelled = false;
		const controller = new AbortController();

		const fetchProviders = async () => {
			try {
				const response = await fetch("/api/init-providers", {
					cache: "no-store",
					signal: controller.signal,
				});
				const payload = await response.json();

				if (!response.ok || payload.error) {
					throw { status: response.status, body: payload };
				}

				if (isCancelled) {
					return;
				}

				setProviderData(payload as ProviderResponse);
				setConfig((prev) => ({ ...prev, ...payload }));

				if (Array.isArray(payload.warnings)) {
					for (const issue of payload.warnings) {
						warnLog(issue.message, issue);
					}
				}
			} catch (error) {
				if (isCancelled) {
					return;
				}

				if (!errorLoggedRef.current) {
					warnLog("Failed to load provider configuration.", error);
					errorLoggedRef.current = true;
				}
				if (attempt < maxRetries) {
					scheduleRetry();
				}
			}
		};

		fetchProviders();

		return () => {
			isCancelled = true;
			controller.abort();
		};
	}, [
		attempt,
		maxRetries,
		needsServerConfig,
		providerData,
		scheduleRetry,
		hasConsented,
		shouldLoad,
	]);

	const clarityId = providerData?.clarityId ?? config.clarityId;
	const zohoCode = providerData?.zohoCode ?? config.zohoCode;
	const resolvedFacebookPixelId =
		providerData?.facebookPixelId ?? config.facebookPixelId;
	const plausibleConfig = useMemo(
		() => ({
			domain: providerData?.plausibleDomain ?? config.plausibleDomain,
			endpoint: providerData?.plausibleEndpoint ?? config.plausibleEndpoint,
		}),
		[
			config.plausibleDomain,
			config.plausibleEndpoint,
			providerData?.plausibleDomain,
			providerData?.plausibleEndpoint,
		],
	);
	const analyticsConfig = useMemo<Pick<AnalyticsConfig, "gaId" | "gtmId">>(
		() => ({
			gaId: providerData?.gaId ?? config.gaId,
			gtmId: providerData?.gtmId ?? config.gtmId,
		}),
		[config.gaId, config.gtmId, providerData?.gaId, providerData?.gtmId],
	);

	// When autoload is enabled, render if consent is granted and shouldLoad is true
	// This allows the component to render and fetch IDs if needed via API
	// Otherwise, require at least one analytics ID to be present
	const shouldRender =
		hasConsented &&
		(analyticsAutoload && shouldLoad
			? true // If autoload is enabled and shouldLoad is true, render to allow fetching
			: Boolean(
					analyticsConfig.gaId ||
						analyticsConfig.gtmId ||
						clarityId ||
						zohoCode ||
						resolvedFacebookPixelId ||
						plausibleConfig.domain,
				));

	// Debug logging for troubleshooting (always log, not just production)
	useEffect(() => {
		console.log("[DeferredThirdParties] Debug:", {
			hasConsented,
			shouldLoad,
			shouldRender,
			analyticsAutoload,
			gaId: analyticsConfig.gaId,
			gtmId: analyticsConfig.gtmId,
			clarityId,
			needsServerConfig,
			initialConfigGaId: initialConfig?.gaId,
			configGaId: config.gaId,
			providerDataGaId: providerData?.gaId,
			nodeEnv: process.env.NODE_ENV,
		});
	}, [
		hasConsented,
		shouldLoad,
		shouldRender,
		analyticsAutoload,
		analyticsConfig.gaId,
		analyticsConfig.gtmId,
		clarityId,
		needsServerConfig,
		initialConfig,
		config.gaId,
		providerData?.gaId,
	]);

	useZohoLoader(shouldRender, zohoCode);

	if (!shouldRender) {
		// Log why we're not rendering
		console.log(
			"[DeferredThirdParties] NOT RENDERING - shouldRender is false",
			{
				hasConsented,
				shouldLoad,
				analyticsAutoload,
				gaId: analyticsConfig.gaId,
				gtmId: analyticsConfig.gtmId,
				clarityId,
				shouldRenderCondition:
					analyticsAutoload && shouldLoad
						? "autoload enabled and shouldLoad true"
						: "requires analytics IDs",
			},
		);
		return null;
	}

	return (
		<>
			<Analytics config={analyticsConfig} />
			<MicrosoftClarityScript projectId={clarityId} />
			<FacebookPixelScript pixelId={resolvedFacebookPixelId} />
			<PlausibleScript
				domain={plausibleConfig.domain}
				endpoint={plausibleConfig.endpoint}
			/>
		</>
	);
}
