import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HiddenAttributionFields } from "../HiddenAttributionFields";
import { getAttributionFieldsFromUrl } from "../attributionFields";

describe("Attribution Tracking Logic", () => {
	beforeEach(() => {
		window.localStorage.clear();
		vi.clearAllMocks();
	});

	describe("getAttributionFieldsFromUrl", () => {
		it("should capture parameters from URL and store them in localStorage", () => {
			const url = "https://example.com/?gclid=test_gclid&utm_source=google";
			const result = getAttributionFieldsFromUrl(url);

			expect(result.gclid).toBe("test_gclid");
			expect(result.utm_source).toBe("google");

			const stored = JSON.parse(
				window.localStorage.getItem("lo_attrib") || "{}",
			);
			expect(stored.gclid).toBe("test_gclid");
		});

		it("should implement first-touch wins logic", () => {
			// First touch
			const firstUrl = "https://example.com/?utm_source=first_source";
			getAttributionFieldsFromUrl(firstUrl);

			const storedAfterFirst = JSON.parse(
				window.localStorage.getItem("lo_attrib") || "{}",
			);
			expect(storedAfterFirst.utm_source).toBe("first_source");

			// Second touch with different source
			const secondUrl = "https://example.com/?utm_source=second_source";
			const resultSecond = getAttributionFieldsFromUrl(secondUrl);

			// Result should still be first_source
			expect(resultSecond.utm_source).toBe("first_source");

			const storedAfterSecond = JSON.parse(
				window.localStorage.getItem("lo_attrib") || "{}",
			);
			expect(storedAfterSecond.utm_source).toBe("first_source");
		});

		it("should merge new fields while keeping old ones (first-touch per field)", () => {
			// First touch has source
			getAttributionFieldsFromUrl(
				"https://example.com/?utm_source=first_source",
			);

			// Second touch has campaign but different source
			const result = getAttributionFieldsFromUrl(
				"https://example.com/?utm_source=second_source&utm_campaign=first_campaign",
			);

			expect(result.utm_source).toBe("first_source");
			expect(result.utm_campaign).toBe("first_campaign");
		});
	});

	describe("HiddenAttributionFields Component", () => {
		it("should render hidden inputs for all tracking keys", () => {
			render(<HiddenAttributionFields />);

			const keys = [
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
			];

			for (const key of keys) {
				const input = document.querySelector(
					`input[name="${key}"]`,
				) as HTMLInputElement;
				expect(input).toBeDefined();
				expect(input?.type).toBe("hidden");
			}
		});

		it("should populate inputs from localStorage on mount", () => {
			const mockAttrib = {
				gclid: "stored_gclid",
				utm_source: "stored_source",
			};
			window.localStorage.setItem("lo_attrib", JSON.stringify(mockAttrib));

			render(<HiddenAttributionFields />);

			const gclidInput = document.querySelector(
				'input[name="gclid"]',
			) as HTMLInputElement;
			const utmSourceInput = document.querySelector(
				'input[name="utm_source"]',
			) as HTMLInputElement;

			expect(gclidInput.value).toBe("stored_gclid");
			expect(utmSourceInput.value).toBe("stored_source");
		});
	});
});
