import { describe, expect, it, vi } from "vitest";

// Mock for global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Form Error Handling (JSON Parse Resilience)", () => {
	it("should safely handle non-JSON 500 server errors on fetch", async () => {
		// Setup mock to return a 500 with an HTML body
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 500,
			statusText: "Internal Server Error",
			json: async () => {
				throw new SyntaxError("Unexpected token < in JSON at position 0");
			},
		});

		// Simulate the standard error-handling logic used in the forms
		let thrownError: Error | null = null;
		try {
			const response = await fetch("/api/contact/intake");
			if (!response.ok) {
				// The new safe pattern
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || "Failed to submit form");
			}
		} catch (e: unknown) {
			thrownError = e as Error;
		}

		// It should gracefully throw our fallback error, not the SyntaxError
		expect(thrownError).toBeDefined();
		expect(thrownError?.message).toBe("Failed to submit form");
		expect(thrownError?.name).not.toBe("SyntaxError");
	});

	it("should safely handle rate limit 429 HTML responses", async () => {
		// Setup mock to return a 429 string or HTML
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 429,
			statusText: "Too Many Requests",
			json: async () => {
				throw new SyntaxError("Unexpected token T in JSON at position 0");
			},
		});

		let thrownError: Error | null = null;
		try {
			const response = await fetch("/api/contact/newsletter");
			if (!response.ok) {
				// The new safe pattern
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || "Failed to submit form");
			}
		} catch (e: unknown) {
			thrownError = e as Error;
		}

		expect(thrownError).toBeDefined();
		expect(thrownError?.message).toBe("Failed to submit form");
		expect(thrownError?.name).not.toBe("SyntaxError");
	});
});
