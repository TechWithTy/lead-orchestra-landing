import { Client } from "@notionhq/client";
import { config } from "dotenv";
import { NextRequest } from "next/server";

config();

type NotionRichTextProperty = {
	rich_text?: Array<{ plain_text?: string; text?: { content?: string } }>;
};

type NotionTitleProperty = {
	title?: Array<{ plain_text?: string; text?: { content?: string } }>;
};

type NotionPage = {
	id: string;
	properties?: Record<string, unknown>;
};

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID || process.env.NOTION_DB_ID;

const readRichText = (page: NotionPage, propertyName: string): string => {
	const property = page.properties?.[propertyName] as
		| NotionRichTextProperty
		| undefined;
	return (
		property?.rich_text
			?.map((item) => item.plain_text || item.text?.content || "")
			.join("")
			.trim() || ""
	);
};

const readTitle = (page: NotionPage, propertyName: string): string => {
	const property = page.properties?.[propertyName] as
		| NotionTitleProperty
		| undefined;
	return (
		property?.title
			?.map((item) => item.plain_text || item.text?.content || "")
			.join("")
			.trim() || ""
	);
};

const assert = (condition: boolean, message: string): void => {
	if (!condition) {
		throw new Error(message);
	}
};

const run = async () => {
	if (!NOTION_API_KEY || !DATABASE_ID) {
		throw new Error(
			"Missing NOTION_API_KEY or NOTION_DATABASE_ID/NOTION_DB_ID",
		);
	}

	// Route reads DATABASE_ID at module initialization time.
	if (!process.env.NOTION_DATABASE_ID) {
		process.env.NOTION_DATABASE_ID = DATABASE_ID;
	}
	const { POST } = await import("../../src/app/api/contact/intake/route");

	const notion = new Client({ auth: NOTION_API_KEY });
	const marker = `codex-e2e-${Date.now()}`;

	const payload = {
		name: marker,
		companyName: "Lead Orchestrator QA",
		email: `${marker}@example.com`,
		phone: "+15555550123",
		website: "https://example.com",
		businessType: ["🧑‍💻 Tech & SaaS Niche"],
		gclid: "test-gclid-123",
		utm_source: "google",
		utm_medium: "cpc",
		utm_campaign: "intake-e2e",
		utm_term: "lead orchestration",
		utm_content: "hero_cta",
		fbclid: "fb-test-123",
		msclkid: "ms-test-123",
		wbraid: "wb-test-123",
		gbraid: "gb-test-123",
		utm_icp: "enterprise_segment_a",
	};

	const request = new NextRequest("http://localhost/api/contact/intake", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const response = await POST(request);
	const result = (await response.json()) as {
		success?: boolean;
		notionSynced?: boolean;
		error?: string;
	};

	assert(
		response.status === 200,
		`Expected 200 from intake route, got ${response.status}`,
	);
	assert(result.success === true, "Intake route did not return success=true");
	assert(result.notionSynced === true, "Intake route did not sync to Notion");

	const queryResponse = await fetch(
		`https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${NOTION_API_KEY}`,
				"Notion-Version": "2022-06-28",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				page_size: 25,
				sorts: [{ timestamp: "created_time", direction: "descending" }],
			}),
		},
	);

	assert(
		queryResponse.ok,
		`Notion query failed with status ${queryResponse.status}`,
	);
	const queryJson = (await queryResponse.json()) as { results?: NotionPage[] };
	const pages = queryJson.results || [];

	const matched = pages.find((page) =>
		readTitle(page, " Name").includes(marker),
	);

	assert(
		Boolean(matched),
		`Could not find generated lead page for marker ${marker}`,
	);
	const page = matched as NotionPage;

	assert(readRichText(page, "gclid") === payload.gclid, "gclid value mismatch");
	assert(
		readRichText(page, "utm_source") === payload.utm_source,
		"utm_source value mismatch",
	);
	assert(
		readRichText(page, "utm_campaign") === payload.utm_campaign,
		"utm_campaign value mismatch",
	);
	assert(
		readRichText(page, "utm_term") === payload.utm_term,
		"utm_term value mismatch",
	);
	assert(
		readRichText(page, "utm_content") === payload.utm_content,
		"utm_content value mismatch",
	);
	assert(
		readRichText(page, "utm_icp") === payload.utm_icp,
		"utm_icp value mismatch",
	);

	await notion.pages.update({
		page_id: page.id,
		in_trash: true,
	});

	console.log("E2E PASSED");
	console.log(`marker=${marker}`);
	console.log(`verified_page_id=${page.id}`);
};

run().catch((error) => {
	console.error("E2E FAILED");
	console.error(error);
	process.exit(1);
});
