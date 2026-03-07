import { Client } from "@notionhq/client";
import type { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import { NextResponse } from "next/server";

import {
	buildMetaUserDataFromRequest,
	generateServerEventId,
	resolveEventSourceUrl,
	sendMetaConversionEvent,
	splitFullName,
} from "@/lib/analytics/meta-conversions-api";

// * Initialize Notion Client
const notion = new Client({
	auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID || process.env.NOTION_DB_ID;

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const parseMidpointNumber = (value: unknown): number => {
			if (typeof value === "number" && Number.isFinite(value)) return value;
			if (typeof value !== "string") return 0;
			const raw = value.trim().toLowerCase();
			if (raw.length === 0 || raw === "unknown") return 0;

			// Format: "2000+", "50+", "10+"
			const plusMatch = raw.match(/^(\d+(?:\.\d+)?)\+$/);
			if (plusMatch) return Number(plusMatch[1]);

			// Format: "0-500", "500-2000", "1-3"
			const rangeMatch = raw.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
			if (rangeMatch) {
				const a = Number(rangeMatch[1]);
				const b = Number(rangeMatch[2]);
				if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
				return Math.round((a + b) / 2);
			}

			// Money formats: "<1000", "1000-5000", "10000+"
			const moneyLessThan = raw.match(/^<\s*(\d+(?:\.\d+)?)$/);
			if (moneyLessThan) return Math.max(0, Number(moneyLessThan[1]) - 1);

			const asNumber = Number(raw.replace(/[^0-9.]/g, ""));
			return Number.isFinite(asNumber) ? asNumber : 0;
		};
		const providedEventId =
			typeof body.metaEventId === "string" ? body.metaEventId : undefined;
		const metaEventId = providedEventId || generateServerEventId();
		const providedEventSourceUrl =
			typeof body.eventSourceUrl === "string" ? body.eventSourceUrl : undefined;
		const eventSourceUrl = resolveEventSourceUrl(
			request,
			providedEventSourceUrl,
		);
		const { firstName, lastName } = splitFullName(
			typeof body.name === "string" ? body.name : undefined,
		);

		// Helper to safely format multiselect/select/text for Notion properties
		// * Note: This mapping depends on the EXACT property names in your Notion DB.
		// * If a property doesn't exist, the API call will fail.
		// * I've mapped the keys from intakeFormFields.ts to likely Notion Property names.

		const properties: CreatePageParameters["properties"] = {
			" Name": {
				title: [
					{
						text: {
							content:
								typeof body.companyName === "string" &&
								body.companyName.trim().length > 0
									? `${body.name || "Untitled Lead"} - ${body.companyName.trim()}`
									: body.name || "Untitled Lead",
						},
					},
				],
			},
			Email: {
				rich_text: [
					{
						text: {
							content: body.email || "",
						},
					},
				],
			},
			"Business Type / Niche": {
				multi_select: (body.businessType || []).map((v: string) => ({
					name: v,
				})),
			},
			"Avg Deal Amount ($)": {
				number: parseMidpointNumber(body.avgDealAmount),
			},
			"Deals / Month": {
				number: parseMidpointNumber(body.dealsPerMonth),
			},
			"Lead Volume / Month": {
				number: parseMidpointNumber(body.leadVolumePerMonth),
			},
			"Conversion Rate %": {
				number: parseMidpointNumber(body.conversionRate),
			},
			"Current CRM": {
				rich_text: [
					{
						text: {
							content: body.currentCrm || "",
						},
					},
				],
			},
			"Existing Lead Lists?": {
				multi_select: (body.existingLeadLists || []).map((v: string) => ({
					name: v,
				})),
			},
			"Who will be responsible for reviewing and acting on the leads?": {
				select: body.leadOwner ? { name: body.leadOwner } : null,
			},
			"Main Pain Point(s)": {
				multi_select: (body.painPoints || []).map((v: string) => ({ name: v })),
			},
			"Monthly Budget": {
				select: body.monthlyBudget ? { name: body.monthlyBudget } : null,
			},
			"Priority Level": {
				multi_select: (body.priorityLevel || []).map((v: string) => ({
					name: v,
				})),
			},
			"Start Date ": {
				date: body.startDate ? { start: body.startDate } : null,
			},
		};
		const addRichTextProperty = (propertyName: string, value: unknown) => {
			if (typeof value !== "string" || value.trim().length === 0) {
				return;
			}
			properties[propertyName] = {
				rich_text: [
					{
						text: {
							content: value.trim(),
						},
					},
				],
			};
		};
		addRichTextProperty("gclid", body.gclid);
		addRichTextProperty("utm_source", body.utm_source);
		addRichTextProperty("utm_campaign", body.utm_campaign);
		addRichTextProperty("utm_term", body.utm_term);
		addRichTextProperty("utm_content", body.utm_content);
		addRichTextProperty("utm_icp", body.utm_icp);

		// * Optional fields
		if (body.phone) {
			properties.Phone = {
				rich_text: [
					{
						text: {
							content: body.phone,
						},
					},
				],
			};
		}
		if (
			typeof body.icpCategory === "string" &&
			body.icpCategory.trim().length > 0
		) {
			properties["ICP Category"] = {
				multi_select: [{ name: body.icpCategory.trim() }],
			};
		}
		if (body.icpDescription) {
			properties["Describe Your Ideal Customer Profile"] = {
				rich_text: [{ text: { content: body.icpDescription } }],
			};
		}
		if (
			Array.isArray(body.highIntentSources) &&
			body.highIntentSources.length > 0
		) {
			properties["High-Intent Lead Sources"] = {
				rich_text: [{ text: { content: body.highIntentSources.join(", ") } }],
			};
		}
		if (body.validationExpectation) {
			properties["What is your expectation for initial validation?"] = {
				select: { name: body.validationExpectation },
			};
		}
		if (body.speed) {
			properties[
				"If approved, how soon can you actively work and test a new lead list?"
			] = {
				select: { name: body.speed },
			};
		}
		if (body.scrapingInstructions) {
			properties["Detailed Scraping Instructions ?"] = {
				rich_text: [{ text: { content: body.scrapingInstructions } }],
			};
		}
		if (
			typeof body.crmConnection === "string" &&
			body.crmConnection.trim().length > 0
		) {
			properties["Can we connect directly to your CRM?"] = {
				select: { name: body.crmConnection.trim() },
			};
		}
		if (body.interestedFeatures && body.interestedFeatures.length > 0) {
			properties["Interested in these features?"] = {
				multi_select: body.interestedFeatures.map((v: string) => ({
					name: v,
				})),
			};
		}
		if (body.paidPilot) {
			properties[
				"Are you willing to pay for a small pilot to validate lead quality before scaling"
			] = {
				select: { name: body.paidPilot },
			};
		}
		if (body.kickoffDate) {
			properties["Schedule Kickoff Call"] = {
				date: { start: body.kickoffDate },
			};
		}
		if (body.website) {
			properties["Company Website ?"] = {
				url: body.website,
			};
		}
		if (body.notes) {
			properties.Notes = {
				rich_text: [
					{
						text: {
							content: String(body.notes),
						},
					},
				],
			};
		}

		let notionSynced = false;
		if (!DATABASE_ID) {
			console.error(
				"[contact/intake] NOTION_DATABASE_ID is not defined; skipping Notion sync.",
			);
		} else {
			try {
				console.log("[contact/intake] Attempting to sync to Notion with properties:", JSON.stringify(properties, null, 2));
				await notion.pages.create({
					parent: { database_id: DATABASE_ID },
					properties: properties,
				});
				notionSynced = true;
			} catch (notionError: unknown) {
				console.error(
					"[contact/intake] Notion sync failed.",
					notionError,
				);
				// If it's a validation error, we want to know WHICH property failed
				if (typeof notionError === "object" && notionError !== null && "body" in notionError) {
					console.error("[contact/intake] Notion Error Body:", (notionError as any).body);
				}
			}
		}

		void sendMetaConversionEvent({
			eventName: "Lead",
			eventId: metaEventId,
			eventSourceUrl,
			actionSource: "website",
			userData: buildMetaUserDataFromRequest(request, {
				email: body.email,
				phone: body.phone,
				firstName,
				lastName,
			}),
			customData: {
				currency: "USD",
				value: parseMidpointNumber(body.avgDealAmount),
				contentName: "Lead Orchestra Intake",
				contentCategory: "Lead Form",
			},
		});

		return NextResponse.json({ success: true, notionSynced }, { status: 200 });
	} catch (error: unknown) {
		console.error("Notion API Error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to create lead in Notion",
			},
			{ status: 500 },
		);
	}
}
