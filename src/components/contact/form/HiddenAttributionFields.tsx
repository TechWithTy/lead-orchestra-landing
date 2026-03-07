"use client";

import { useEffect, useRef } from "react";

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

/**
 * Renders hidden input fields for attribution tracking and populates them from localStorage on mount.
 * This ensures that external tracking tools (like WhatConverts) can capture these values from the DOM.
 */
export function HiddenAttributionFields() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		try {
			const raw = window.localStorage.getItem("lo_attrib");
			if (!raw) return;

			const attrib = JSON.parse(raw);
			if (!attrib || typeof attrib !== "object") return;

			for (const key of TRACKING_KEYS) {
				const value = attrib[key];
				if (value && typeof value === "string") {
					const el = containerRef.current?.querySelector<HTMLInputElement>(
						`input[name="${key}"]`,
					);
					if (el) {
						el.value = value;
					}
				}
			}
		} catch (error) {
			console.warn(
				"[HiddenAttributionFields] Failed to populate fields:",
				error,
			);
		}
	}, []);

	return (
		<div ref={containerRef} className="hidden" aria-hidden="true">
			{TRACKING_KEYS.map((key) => (
				<input key={key} type="hidden" name={key} />
			))}
		</div>
	);
}
