import { NextResponse } from "next/server";

import { queryNotionDatabase } from "@/utils/notion/notion";

// match imports
import { mapNotionPageToLinkTree } from "@/utils/notion/linktreeMapper";
import type {
	NotionPage,
	NotionQueryResponse,
} from "@/utils/notion/notionTypes";

export async function GET() {
	console.log("[API] Starting LINKTREE GET request");
	try {
		const notionKey = process.env.NOTION_KEY;
		const rawId = process.env.NOTION_REDIRECTS_ID;

		console.log("[API] Env vars check:", {
			hasKey: !!notionKey,
			keyLength: notionKey?.length,
			rawId: rawId,
		});

		if (!notionKey) throw new Error("Missing NOTION_KEY");

		const addDashes = (id: string) =>
			id.replace(/^(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/, "$1-$2-$3-$4-$5");
		const dbId = !rawId
			? undefined
			: rawId.includes("-")
				? rawId
				: rawId.length === 32
					? addDashes(rawId)
					: rawId;

		console.log("[API] Resolved DB ID:", dbId);

		if (!dbId) {
			console.error("[API] Missing DB ID");
			return NextResponse.json(
				{ ok: false, error: "missing NOTION_REDIRECTS_ID" },
				{ status: 500 },
			);
		}

		console.log("[API] Fetching from Notion...");
		// Inline fetch to be absolutely sure
		const response = await fetch(
			`https://api.notion.com/v1/databases/${dbId}/query`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${notionKey}`,
					"Notion-Version": "2022-06-28",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ page_size: 100 }),
				// cache: "no-store", // Next.js 13+ cache control
				next: { revalidate: 0 },
			},
		);

		console.log("[API] Notion response status:", response.status);

		if (!response.ok) {
			const text = await response.text();
			console.error("[API] Notion error body:", text);
			throw new Error(`Notion API failed: ${response.status} ${text}`);
		}

		const data = await response.json();
		console.log(
			"[API] Notion data received. Results count:",
			data?.results?.length,
		);

		const results: NotionPage[] = Array.isArray(data?.results)
			? data.results
			: [];

		console.log("[API] Mapping results...");
		const items = results
			.map((page) => {
				try {
					return mapNotionPageToLinkTree(page);
				} catch (e) {
					console.error("[API] Mapping error for page:", page.id, e);
					return null;
				}
			})
			.filter((m) =>
				Boolean(
					m &&
						m.linkTreeEnabled &&
						((m.destination && m.destination.length > 0) ||
							(Array.isArray(m.files) && m.files.length > 0)),
				),
			);

		// Cast to remove nulls for valid return type although filter does it logic-wise
		const validItems = items.filter(
			(i): i is NonNullable<typeof i> => i !== null,
		);

		console.log("[API] Final items count:", validItems.length);
		return NextResponse.json({ ok: true, items: validItems });
	} catch (err: unknown) {
		console.error("[API] CRITICAL ERROR:", err);
		const msg = err instanceof Error ? err.message : "internal error";
		return NextResponse.json({ ok: false, error: msg }, { status: 500 });
	}
}
