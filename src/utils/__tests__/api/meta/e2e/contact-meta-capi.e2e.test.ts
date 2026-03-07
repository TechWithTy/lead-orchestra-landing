import { NextRequest } from "next/server";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/externalRequests/sendgrid", () => ({
	addToSendGrid: vi.fn(),
}));

vi.mock("@/lib/analytics/meta-conversions-api", () => ({
	buildMetaUserDataFromRequest: vi.fn(() => ({
		email: "meta@example.com",
		clientIpAddress: "127.0.0.1",
		clientUserAgent: "vitest",
	})),
	generateServerEventId: vi.fn(() => "evt_generated_mock"),
	resolveEventSourceUrl: vi.fn((_: Request, explicit?: string) => explicit),
	splitFullName: vi.fn(() => ({ firstName: "Jane", lastName: "Doe" })),
	sendMetaConversionEvent: vi.fn().mockResolvedValue({ ok: true }),
}));

let POST: typeof import("@/app/api/contact/route").POST;
let mockedAddToSendGrid: ReturnType<typeof vi.fn>;
let mockedSendMetaConversionEvent: ReturnType<typeof vi.fn>;

beforeAll(async () => {
	({ POST } = await import("@/app/api/contact/route"));
	const sendgridModule = await import("@/lib/externalRequests/sendgrid");
	const metaModule = await import("@/lib/analytics/meta-conversions-api");
	mockedAddToSendGrid = sendgridModule.addToSendGrid as ReturnType<
		typeof vi.fn
	>;
	mockedSendMetaConversionEvent =
		metaModule.sendMetaConversionEvent as ReturnType<typeof vi.fn>;
});

describe("POST /api/contact Meta CAPI integration (E2E)", () => {
	beforeEach(() => {
		mockedAddToSendGrid.mockReset();
		mockedSendMetaConversionEvent.mockReset();
		mockedSendMetaConversionEvent.mockResolvedValue({ ok: true });
	});

	it("fires a Lead CAPI event with shared event metadata after successful contact submission", async () => {
		mockedAddToSendGrid.mockResolvedValue(202);

		const payload = {
			email: "contact@example.com",
			firstName: "Jane",
			lastName: "Doe",
			selectedService: "Lead Gen",
			metaEventId: "evt_123",
			eventSourceUrl: "https://dealscale.io/contact",
			beta_tester: true,
		};

		const request = new NextRequest("http://localhost/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		const response = await POST(request);
		const responseBody = await response.json();

		expect(response.status).toBe(200);
		expect(responseBody.message).toBe("Contact captured successfully.");
		expect(mockedAddToSendGrid).toHaveBeenCalledTimes(1);
		expect(mockedSendMetaConversionEvent).toHaveBeenCalledTimes(2);
		expect(mockedSendMetaConversionEvent).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({
				eventName: "Lead",
				eventId: "evt_123",
				eventSourceUrl: "https://dealscale.io/contact",
				actionSource: "website",
				testEventCode: undefined,
				customData: expect.objectContaining({
					currency: "USD",
					contentName: "Lead Gen",
					contentCategory: "Beta Tester",
				}),
			}),
		);
		expect(mockedSendMetaConversionEvent).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining({
				eventName: "Contact",
				eventId: "evt_123",
				eventSourceUrl: "https://dealscale.io/contact",
				actionSource: "website",
				customData: expect.objectContaining({
					currency: "USD",
					contentName: "Lead Gen",
					contentCategory: "Beta Tester",
				}),
			}),
		);
	});

	it("still calls CAPI when SendGrid fails", async () => {
		mockedAddToSendGrid.mockResolvedValue(500);

		const payload = {
			email: "contact@example.com",
		};

		const request = new NextRequest("http://localhost/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		const response = await POST(request);
		const responseBody = await response.json();

		expect(response.status).toBe(200);
		expect(responseBody.message).toBe("Contact captured successfully.");
		expect(mockedSendMetaConversionEvent).toHaveBeenCalledTimes(2);
	});

	it("uses env test code only when useTestEventCode flag is true", async () => {
		process.env.META_TEST_EVENT_CODE = "TEST123";
		mockedAddToSendGrid.mockResolvedValue(202);
		const payload = {
			email: "contact@example.com",
			useTestEventCode: true,
		};

		const request = new NextRequest("http://localhost/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		const response = await POST(request);
		expect(response.status).toBe(200);
		expect(mockedSendMetaConversionEvent).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({
				testEventCode: "TEST123",
			}),
		);
	});
});
