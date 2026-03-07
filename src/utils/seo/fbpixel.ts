/**
 * Facebook Pixel Event Tracking Utility
 *
 * Standard Events Reference:
 * - PageView: Tracked automatically on page load
 * - Lead: User submits a form expressing interest
 * - CompleteRegistration: User completes signup/registration
 * - ViewContent: User views specific content (e.g., landing pages)
 * - InitiateCheckout: User starts checkout process
 *
 * Custom Events for Intake Form:
 * - IntakeFormStart: User starts filling the intake form
 * - IntakeFormProgress: User progresses through form fields
 * - IntakeFormSubmit: User submits the intake form (use Lead for this)
 */

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

interface MetaTrackingOptions {
	eventID?: string;
}

// Check if Facebook Pixel is loaded
const isFbqAvailable = (): boolean => {
	return typeof window !== "undefined" && typeof window.fbq === "function";
};

// Generic event tracking
export const pageView = (): void => {
	if (isFbqAvailable()) {
		window.fbq("track", "PageView");
	}
};

export const event = (
	name: string,
	options: Record<string, unknown> = {},
	trackingOptions?: MetaTrackingOptions,
): void => {
	if (isFbqAvailable()) {
		window.fbq("track", name, options, trackingOptions);
	}
};

// Custom event for non-standard events
export const customEvent = (
	name: string,
	options: Record<string, unknown> = {},
	trackingOptions?: MetaTrackingOptions,
): void => {
	if (isFbqAvailable()) {
		window.fbq("trackCustom", name, options, trackingOptions);
	}
};

// ============================================
// STANDARD FACEBOOK PIXEL EVENTS
// ============================================

/**
 * Track when a user submits a lead/intake form
 * Use this for the main form submission success
 */
export const trackLead = (options?: {
	contentName?: string;
	contentCategory?: string;
	value?: number;
	currency?: string;
	eventId?: string;
}): void => {
	if (isFbqAvailable()) {
		window.fbq(
			"track",
			"Lead",
			{
				content_name: options?.contentName || "Lead Form",
				content_category: options?.contentCategory || "Intake",
				value: options?.value || 0,
				currency: options?.currency || "USD",
			},
			options?.eventId ? { eventID: options.eventId } : undefined,
		);
	}
};

/**
 * Track when a user completes registration/signup
 */
export const trackCompleteRegistration = (options?: {
	contentName?: string;
	status?: string;
	value?: number;
	currency?: string;
}): void => {
	if (isFbqAvailable()) {
		window.fbq("track", "CompleteRegistration", {
			content_name: options?.contentName || "User Registration",
			status: options?.status || "complete",
			value: options?.value || 0,
			currency: options?.currency || "USD",
		});
	}
};

/**
 * Track when a user views specific content (landing page, product, etc.)
 */
export const trackViewContent = (options?: {
	contentName?: string;
	contentCategory?: string;
	contentIds?: string[];
	contentType?: string;
	value?: number;
	currency?: string;
}): void => {
	if (isFbqAvailable()) {
		window.fbq("track", "ViewContent", {
			content_name: options?.contentName,
			content_category: options?.contentCategory,
			content_ids: options?.contentIds,
			content_type: options?.contentType,
			value: options?.value || 0,
			currency: options?.currency || "USD",
		});
	}
};

/**
 * Track when a user initiates checkout
 */
export const trackInitiateCheckout = (options?: {
	contentIds?: string[];
	contentType?: string;
	numItems?: number;
	value?: number;
	currency?: string;
}): void => {
	if (isFbqAvailable()) {
		window.fbq("track", "InitiateCheckout", {
			content_ids: options?.contentIds,
			content_type: options?.contentType,
			num_items: options?.numItems,
			value: options?.value || 0,
			currency: options?.currency || "USD",
		});
	}
};

// ============================================
// INTAKE FORM SPECIFIC EVENTS (Custom)
// ============================================

/**
 * Track when a user starts filling out the intake form
 * Fire this when the form becomes visible or user focuses on first field
 */
export const trackIntakeFormStart = (): void => {
	customEvent("IntakeFormStart", {
		content_name: "Lead Orchestra Intake Form",
		timestamp: new Date().toISOString(),
	});
};

/**
 * Track intake form progress (e.g., user fills certain fields)
 * Useful for understanding where users drop off
 */
export const trackIntakeFormProgress = (options: {
	step?: number;
	stepName?: string;
	fieldsCompleted?: number;
	totalFields?: number;
}): void => {
	customEvent("IntakeFormProgress", {
		content_name: "Lead Orchestra Intake Form",
		step: options.step,
		step_name: options.stepName,
		fields_completed: options.fieldsCompleted,
		total_fields: options.totalFields,
		completion_percentage: options.totalFields
			? Math.round(((options.fieldsCompleted || 0) / options.totalFields) * 100)
			: 0,
	});
};

/**
 * Track successful intake form submission
 * This fires the standard Lead event with intake-specific data
 */
export const trackIntakeFormSubmit = (options?: {
	businessType?: string[];
	monthlyBudget?: string;
	priority?: string;
	eventId?: string;
}): void => {
	trackLead({
		contentName: "Lead Orchestra Intake",
		contentCategory: "B2B Lead Generation",
		value: getLeadValue(options?.monthlyBudget),
		currency: "USD",
		eventId: options?.eventId,
	});

	// Also fire a custom event with more details
	customEvent(
		"IntakeFormSubmit",
		{
			content_name: "Lead Orchestra Intake Form",
			business_type: options?.businessType?.join(", "),
			monthly_budget: options?.monthlyBudget,
			priority: options?.priority,
			timestamp: new Date().toISOString(),
		},
		options?.eventId ? { eventID: options.eventId } : undefined,
	);
};

export const generateMetaEventId = (): string => {
	if (
		typeof crypto !== "undefined" &&
		typeof crypto.randomUUID === "function"
	) {
		return crypto.randomUUID();
	}

	return `meta_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
};

/**
 * Track form abandonment (user leaves without submitting)
 * Call this on page unload if form has data but wasn't submitted
 */
export const trackIntakeFormAbandon = (options?: {
	fieldsCompleted?: number;
	totalFields?: number;
	lastField?: string;
}): void => {
	customEvent("IntakeFormAbandon", {
		content_name: "Lead Orchestra Intake Form",
		fields_completed: options?.fieldsCompleted,
		total_fields: options?.totalFields,
		last_field: options?.lastField,
		completion_percentage: options?.totalFields
			? Math.round(((options.fieldsCompleted || 0) / options.totalFields) * 100)
			: 0,
		timestamp: new Date().toISOString(),
	});
};

// Helper to estimate lead value based on monthly budget
function getLeadValue(monthlyBudget?: string): number {
	if (!monthlyBudget) return 0;

	// Map budget ranges to estimated lead values
	const budgetValueMap: Record<string, number> = {
		"<$250": 50,
		"$250–$1k": 150,
		"$1k–$3k": 500,
		"$1k - $3k": 500,
		"$3k+": 1000,
		"$3k - $5k": 1200,
	};

	return budgetValueMap[monthlyBudget] || 0;
}
