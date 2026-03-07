import { Client } from "@notionhq/client";
import { config } from "dotenv";

config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID || process.env.NOTION_DB_ID;

const ensureEnv = (): void => {
	if (!NOTION_API_KEY || !DATABASE_ID) {
		throw new Error(
			"Missing NOTION_API_KEY or NOTION_DATABASE_ID/NOTION_DB_ID",
		);
	}
};

const run = async () => {
	ensureEnv();

	const notion = new Client({ auth: NOTION_API_KEY });
	const db = (await notion.databases.retrieve({
		database_id: DATABASE_ID!,
	})) as {
		data_sources?: Array<{ id: string }>;
	};

	const dataSourceId = db.data_sources?.[0]?.id;
	if (!dataSourceId) {
		throw new Error("Could not resolve Notion data source ID from database.");
	}

	const response = await fetch(
		`https://api.notion.com/v1/data_sources/${dataSourceId}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${NOTION_API_KEY}`,
				"Notion-Version": "2025-09-03",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				properties: {
					utm_icp: {
						rich_text: {},
					},
				},
			}),
		},
	);

	if (!response.ok) {
		const text = await response.text();
		if (
			response.status === 400 &&
			text.toLowerCase().includes("already exists")
		) {
			console.log("utm_icp already exists on intake data source.");
			return;
		}
		throw new Error(
			`Failed to add utm_icp property: ${response.status} ${text}`,
		);
	}

	console.log("Added utm_icp property to intake data source.");
};

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
