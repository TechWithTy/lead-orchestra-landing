export interface IntakeAttributionFields {
	gclid?: string;
	wbraid?: string;
	gbraid?: string;
	msclkid?: string;
	fbclid?: string;
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	utm_term?: string;
	utm_content?: string;
	utm_icp?: string;
}

const TRACKING_KEYS = [
	"gclid",
	"wbraid",
	"gbraid",
	"msclkid",
	"fbclid",
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_term",
	"utm_content",
	"utm_icp",
] as const;

const ICP_URL_KEYS = ["utm_icp", "icp", "icpCategory", "icp_type"] as const;
const ATTRIBUTION_STORAGE_KEY = "lo_attrib";
const ATTRIBUTION_TTL_MS = 180 * 24 * 60 * 60 * 1000; // 180 days

const toNonEmptyString = (value: string | null): string | undefined => {
	if (typeof value !== "string") return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

type StoredAttribution = IntakeAttributionFields & { ts?: number };

const readFromUrl = (url: string): IntakeAttributionFields => {
	try {
		const parsed = new URL(url);
		const result: IntakeAttributionFields = {};

		for (const key of TRACKING_KEYS) {
			const value = toNonEmptyString(parsed.searchParams.get(key));
			if (value) {
				result[key] = value;
			}
		}

		return result;
	} catch {
		return {};
	}
};

const canUseStorage = (): boolean =>
	typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readStoredAttribution = (): IntakeAttributionFields => {
	if (!canUseStorage()) return {};

	try {
		const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
		if (!raw) return {};

		const parsed = JSON.parse(raw) as StoredAttribution;
		if (!parsed || typeof parsed !== "object") return {};
		if (
			typeof parsed.ts === "number" &&
			Date.now() - parsed.ts > ATTRIBUTION_TTL_MS
		) {
			window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
			return {};
		}

		const result: IntakeAttributionFields = {};
		for (const key of TRACKING_KEYS) {
			const value = toNonEmptyString(
				typeof parsed[key] === "string" ? parsed[key] : null,
			);
			if (value) {
				result[key] = value;
			}
		}
		return result;
	} catch {
		return {};
	}
};

const persistAttribution = (fields: IntakeAttributionFields): void => {
	if (!canUseStorage()) return;
	try {
		const payload: StoredAttribution = {
			...fields,
			ts: Date.now(),
		};
		window.localStorage.setItem(
			ATTRIBUTION_STORAGE_KEY,
			JSON.stringify(payload),
		);
	} catch {
		// Ignore storage failures.
	}
};

export const getAttributionFieldsFromUrl = (
	url: string,
): IntakeAttributionFields => {
	const fromUrl = readFromUrl(url);
	const fromStorage = readStoredAttribution();
	const merged: IntakeAttributionFields = {
		...fromUrl,
		...fromStorage,
	};

	if (Object.keys(merged).length > 0) {
		persistAttribution(merged);
	}

	return merged;
};

export const resolveUtmIcpFromUrlOrState = (
	url: string,
	selectedIcp?: string,
): string | undefined => {
	const selected = toNonEmptyString(selectedIcp ?? null);

	try {
		const parsed = new URL(url);
		for (const key of ICP_URL_KEYS) {
			const value = toNonEmptyString(parsed.searchParams.get(key));
			if (value) {
				return value;
			}
		}
		return selected;
	} catch {
		return selected;
	}
};
