"use client";

import { NavigationLoader } from "@/components/ui/navigation-loader";
import { ScrollDistanceIndicator } from "@/components/ui/scroll-distance-indicator";
import type { AnalyticsConfig } from "@/lib/analytics/config";

import { DeferredThirdParties } from "./DeferredThirdParties";
import { PerformanceMonitor } from "./PerformanceMonitor";

type ClientExperienceProps = {
	clarityProjectId?: string;
	zohoWidgetCode?: string;
	facebookPixelId?: string;
	plausibleDomain?: string;
	plausibleEndpoint?: string;
	initialAnalyticsConfig?: Partial<AnalyticsConfig>;
};

export function ClientExperience({
	clarityProjectId,
	zohoWidgetCode,
	facebookPixelId,
	plausibleDomain,
	plausibleEndpoint,
	initialAnalyticsConfig,
}: ClientExperienceProps) {
	return (
		<>
			<PerformanceMonitor />
			<NavigationLoader />
			<ScrollDistanceIndicator />
			<DeferredThirdParties
				clarityProjectId={clarityProjectId}
				zohoWidgetCode={zohoWidgetCode}
				facebookPixelId={facebookPixelId}
				plausibleDomain={plausibleDomain}
				plausibleEndpoint={plausibleEndpoint}
				initialConfig={initialAnalyticsConfig}
			/>
		</>
	);
}
