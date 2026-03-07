import { config } from "dotenv";
import { NextRequest } from "next/server";

config();

const assert = (condition: boolean, message: string): void => {
	if (!condition) {
		throw new Error(message);
	}
};

const run = async () => {
	// Dynamic import to ensure env vars are loaded first if needed, though config() is at top.
	const { POST } = await import(
		"../../src/app/api/analytics/meta/events/route"
	);

	const payload = {
		eventName: "StartApplication",
		eventSourceUrl: "http://localhost:3000/contact",
		// generic test data
		firstName: "E2E_Test",
		email: "e2e_test@example.com",
	};

	const request = new NextRequest(
		"http://localhost/api/analytics/meta/events",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		},
	);

	const response = await POST(request);
	const result = (await response.json()) as {
		ok?: boolean;
		eventName?: string;
		metaResult?: { ok: boolean; skippedReason?: string; errorMessage?: string };
		error?: string;
	};

	assert(
		response.status === 200,
		`Expected 200 from analytics route, got ${response.status}. Error: ${result.error}`,
	);
	assert(result.ok === true, "Route did not return ok=true");
	assert(result.eventName === "StartApplication", "Event name mismatch");

	console.log("Analytics E2E PASSED");
	if (result.metaResult?.ok) {
		console.log("Meta CAPI request succeeded.");
	} else {
		console.log(
			"Meta CAPI request skipped or failed (expected if creds missing):",
			result.metaResult,
		);
	}
};

run().catch((error) => {
	console.error("Analytics E2E FAILED");
	console.error(error);
	process.exit(1);
});
