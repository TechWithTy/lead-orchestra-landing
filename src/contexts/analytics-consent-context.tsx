'use client';

import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

const STORAGE_KEY = 'dealscale-analytics-consent';

type AnalyticsConsentValue = {
	hasConsented: boolean;
	grantConsent: () => void;
	revokeConsent: () => void;
};

const AnalyticsConsentContext = createContext<AnalyticsConsentValue | undefined>(undefined);

interface AnalyticsConsentProviderProps {
	children: ReactNode;
	defaultConsent?: boolean;
}

export function AnalyticsConsentProvider({
	children,
	defaultConsent = false,
}: AnalyticsConsentProviderProps) {
	const [hasConsented, setHasConsented] = useState(defaultConsent);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (stored === 'granted') {
				setHasConsented(true);
				if (process.env.NODE_ENV === 'production') {
					console.log('[AnalyticsConsent] Consent granted from localStorage');
				}
				return;
			}
			if (stored === 'denied') {
				setHasConsented(false);
				if (process.env.NODE_ENV === 'production') {
					console.warn('[AnalyticsConsent] Consent denied in localStorage - clearing to use defaultConsent');
					// If defaultConsent is true but localStorage has 'denied', clear it to allow autoload
					if (defaultConsent) {
						window.localStorage.removeItem(STORAGE_KEY);
						setHasConsented(true);
						return;
					}
				}
				return;
			}
		} catch (error) {
			console.warn('[AnalyticsConsent] Failed to read local storage', error);
		}
		setHasConsented(defaultConsent);
		if (process.env.NODE_ENV === 'production') {
			console.log('[AnalyticsConsent] Using defaultConsent:', defaultConsent, 'from NEXT_PUBLIC_ANALYTICS_AUTOLOAD:', process.env.NEXT_PUBLIC_ANALYTICS_AUTOLOAD);
		}
	}, [defaultConsent]);

	const persist = useCallback((value: boolean, storageValue: string) => {
		setHasConsented(value);
		if (typeof window === 'undefined') {
			return;
		}
		try {
			window.localStorage.setItem(STORAGE_KEY, storageValue);
		} catch (error) {
			console.warn('[AnalyticsConsent] Failed to persist consent', error);
		}
	}, []);

	const grantConsent = useCallback(() => persist(true, 'granted'), [persist]);
	const revokeConsent = useCallback(() => persist(false, 'denied'), [persist]);

	const value = useMemo<AnalyticsConsentValue>(
		() => ({
			hasConsented,
			grantConsent,
			revokeConsent,
		}),
		[grantConsent, hasConsented, revokeConsent]
	);

	return (
		<AnalyticsConsentContext.Provider value={value}>{children}</AnalyticsConsentContext.Provider>
	);
}

export function useAnalyticsConsent(): AnalyticsConsentValue {
	const context = useContext(AnalyticsConsentContext);
	if (!context) {
		throw new Error('useAnalyticsConsent must be used within an AnalyticsConsentProvider');
	}
	return context;
}
