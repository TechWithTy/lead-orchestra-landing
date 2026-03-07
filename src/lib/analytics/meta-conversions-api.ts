import * as bizSdk from "facebook-nodejs-business-sdk";

type ActionSource =
	| "website"
	| "app"
	| "phone_call"
	| "chat"
	| "physical_store"
	| "system_generated"
	| "other";

interface MetaCapiUserDataInput {
	email?: string;
	phone?: string;
	firstName?: string;
	lastName?: string;
	clientIpAddress?: string;
	clientUserAgent?: string;
	fbc?: string;
	fbp?: string;
}

interface MetaCapiCustomDataInput {
	currency?: string;
	value?: number;
	contentName?: string;
	contentCategory?: string;
}

export interface MetaCapiEventInput {
	eventName: string;
	eventTime?: number;
	eventId?: string;
	eventSourceUrl?: string;
	actionSource?: ActionSource;
	userData?: MetaCapiUserDataInput;
	customData?: MetaCapiCustomDataInput;
	testEventCode?: string;
}

interface MetaCapiConfig {
	enabled: boolean;
	accessToken?: string;
	pixelId?: string;
}

export const generateServerEventId = (): string => {
	if (
		typeof crypto !== "undefined" &&
		typeof crypto.randomUUID === "function"
	) {
		return crypto.randomUUID();
	}

	return `meta_srv_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
};

export const splitFullName = (
	fullName?: string,
): { firstName?: string; lastName?: string } => {
	if (!fullName) {
		return {};
	}

	const trimmed = fullName.trim();
	if (!trimmed) {
		return {};
	}

	const parts = trimmed.split(/\s+/);
	if (parts.length === 1) {
		return { firstName: parts[0] };
	}

	const [firstName, ...rest] = parts;
	return {
		firstName,
		lastName: rest.join(" "),
	};
};

const getMetaCapiConfig = (): MetaCapiConfig => {
	const enabled =
		process.env.META_CAPI_ENABLED === "true" ||
		process.env.NEXT_PUBLIC_META_CAPI_ENABLED === "true";

	return {
		enabled,
		accessToken:
			process.env.META_CAPI_ACCESS_TOKEN ||
			process.env.FACEBOOK_CONVERSIONS_API_ACCESS_TOKEN,
		pixelId: process.env.META_PIXEL_ID || process.env.FACEBOOK_PIXEL_ID,
	};
};

export const isMetaCapiEnabled = (): boolean => {
	const config = getMetaCapiConfig();
	return Boolean(config.enabled && config.accessToken && config.pixelId);
};

export const resolveClientIp = (request: Request): string | undefined => {
	const forwardedFor = request.headers.get("x-forwarded-for");
	if (forwardedFor) {
		const [firstIp] = forwardedFor.split(",").map((v) => v.trim());
		if (firstIp) {
			return firstIp;
		}
	}

	const realIp = request.headers.get("x-real-ip");
	if (realIp?.trim()) {
		return realIp.trim();
	}

	const cfIp = request.headers.get("cf-connecting-ip");
	if (cfIp?.trim()) {
		return cfIp.trim();
	}

	return undefined;
};

const parseCookieHeader = (
	cookieHeader: string | null,
): Record<string, string> => {
	if (!cookieHeader) {
		return {};
	}

	const cookies: Record<string, string> = {};
	for (const entry of cookieHeader.split(";")) {
		const [rawKey, ...rawValueParts] = entry.trim().split("=");
		if (!rawKey || rawValueParts.length === 0) {
			continue;
		}

		cookies[rawKey] = decodeURIComponent(rawValueParts.join("="));
	}

	return cookies;
};

export const resolveMetaCookieValues = (
	request: Request,
): { fbc?: string; fbp?: string } => {
	const cookies = parseCookieHeader(request.headers.get("cookie"));
	return {
		fbc: cookies._fbc,
		fbp: cookies._fbp,
	};
};

export const resolveEventSourceUrl = (
	request: Request,
	explicitUrl?: string,
): string | undefined => {
	if (explicitUrl?.trim()) {
		return explicitUrl.trim();
	}

	const referer = request.headers.get("referer");
	if (referer?.trim()) {
		return referer.trim();
	}

	const origin = request.headers.get("origin");
	if (origin?.trim()) {
		return origin.trim();
	}

	return undefined;
};

export const buildMetaUserDataFromRequest = (
	request: Request,
	input: Pick<
		MetaCapiUserDataInput,
		"email" | "phone" | "firstName" | "lastName"
	>,
): MetaCapiUserDataInput => {
	const { fbc, fbp } = resolveMetaCookieValues(request);
	return {
		email: input.email,
		phone: input.phone,
		firstName: input.firstName,
		lastName: input.lastName,
		clientIpAddress: resolveClientIp(request),
		clientUserAgent: request.headers.get("user-agent") || undefined,
		fbc,
		fbp,
	};
};

export const sendMetaConversionEvent = async (
	input: MetaCapiEventInput,
): Promise<{
	ok: boolean;
	skippedReason?: string;
	response?: unknown;
	errorMessage?: string;
}> => {
	const config = getMetaCapiConfig();

	if (!config.enabled) {
		return { ok: false, skippedReason: "disabled" };
	}
	if (!config.accessToken || !config.pixelId) {
		return { ok: false, skippedReason: "missing_config" };
	}

	try {
		bizSdk.FacebookAdsApi.init(config.accessToken);

		const userData = new bizSdk.UserData();
		if (input.userData?.email) userData.setEmail(input.userData.email);
		if (input.userData?.phone) userData.setPhone(input.userData.phone);
		if (input.userData?.firstName)
			userData.setFirstName(input.userData.firstName);
		if (input.userData?.lastName) userData.setLastName(input.userData.lastName);
		if (input.userData?.clientIpAddress) {
			userData.setClientIpAddress(input.userData.clientIpAddress);
		}
		if (input.userData?.clientUserAgent) {
			userData.setClientUserAgent(input.userData.clientUserAgent);
		}
		if (input.userData?.fbc) userData.setFbc(input.userData.fbc);
		if (input.userData?.fbp) userData.setFbp(input.userData.fbp);

		const customData = new bizSdk.CustomData();
		if (typeof input.customData?.value === "number") {
			customData.setValue(input.customData.value);
		}
		if (input.customData?.currency) {
			customData.setCurrency(input.customData.currency);
		}
		if (input.customData?.contentName) {
			customData.setContentName(input.customData.contentName);
		}
		if (input.customData?.contentCategory) {
			customData.setContentCategory(input.customData.contentCategory);
		}

		const serverEvent = new bizSdk.ServerEvent()
			.setEventName(input.eventName)
			.setEventTime(input.eventTime ?? Math.floor(Date.now() / 1000))
			.setActionSource(input.actionSource ?? "website")
			.setUserData(userData)
			.setCustomData(customData);

		if (input.eventId) {
			serverEvent.setEventId(input.eventId);
		}
		if (input.eventSourceUrl) {
			serverEvent.setEventSourceUrl(input.eventSourceUrl);
		}

		const eventRequest = new bizSdk.EventRequest(
			config.accessToken,
			config.pixelId,
		).setEvents([serverEvent]);

		if (input.testEventCode) {
			eventRequest.setTestEventCode(input.testEventCode);
		}

		const response = await eventRequest.execute();
		return { ok: true, response };
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown Meta CAPI error";
		console.error("[meta-capi] Failed to send event", {
			eventName: input.eventName,
			error,
		});
		return {
			ok: false,
			skippedReason: "request_failed",
			errorMessage,
		};
	}
};
