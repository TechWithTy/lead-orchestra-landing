import type { Plan, PricingCatalog } from "@/types/service/plans";
import { ROI_ESTIMATOR } from "./pricing/roiEstimator";

export const pricingCatalog: PricingCatalog = {
	pricing: {
		monthly: [
			{
				id: "open-source",
				name: "Open Source",
				price: 0,
				unit: "month",
				ctaType: "link",
				ctaLabel: "View on GitHub",
				idealFor: "Developers, solo users, small projects",
				credits: { ai: 0, lead: 0 },
				seats: 1,
				features: [
					"100% free and open-source",
					"Local-first, no database required",
					"Unlimited scraping & crawling",
					"MCP plugin ecosystem access",
					"CSV/JSON export",
					"Community support",
					"Upgrade to hosted or enterprise for team features",
				],
			},
			{
				id: "starter",
				name: "Starter",
				price: 500,
				unit: "month",
				ctaType: "subscribe",
				idealFor: "Founders and small teams who want reliable lead delivery",
				credits: { ai: 250, lead: 2000 },
				seats: { included: 2, additionalSeat: 0 },
				features: [
					"2,000 leads / month included",
					"$0.25 per lead effective rate",
					"Choose ICP + sources (websites, directories, SERPs)",
					"Basic enrichment included (name, company, URL, email/phone when available)",
					"CSV export + CRM-ready formatting",
					"Weekly delivery and replacements for obvious duplicates",
				],
			},
			{
				id: "growth",
				name: "Growth",
				price: 1500,
				unit: "month",
				ctaType: "subscribe",
				idealFor: "Growth teams scaling outreach with consistent volume",
				credits: { ai: 1000, lead: 10000 },
				seats: { included: 5, additionalSeat: 0 },
				features: [
					"10,000 leads / month included",
					"$0.15 per lead effective rate",
					"Everything in Starter plus:",
					"Deeper enrichment options (titles, socials, tech signals when available)",
					"Lead-type segmentation (industry, geo, role)",
					"Faster delivery cadence",
					"Priority support",
				],
			},
			{
				id: "scale",
				name: "Scale",
				price: 5000,
				unit: "month",
				ctaType: "subscribe",
				idealFor: "High-volume teams optimizing cost per lead at scale",
				credits: { ai: 5000, lead: 50000 },
				seats: { included: "unlimited", additionalSeat: 0 },
				features: [
					"50,000 leads / month included",
					"$0.10 per lead effective rate",
					"Everything in Growth plus:",
					"Custom sourcing playbooks per vertical",
					"Deduping + suppression lists (domains, emails, phones)",
					"Bulk export + scheduled deliveries",
					"SLA support and onboarding",
				],
			},
		],
		annual: [
			{
				id: "starterAnnual",
				name: "Starter",
				price: 4990,
				unit: "year",
				ctaType: "subscribe",
				idealFor: "Founders and small teams who want reliable lead delivery",
				credits: { ai: 250, lead: 2000 },
				seats: { included: 2, additionalSeat: 0 },
				features: [
					"All Starter monthly features",
					"Save ~17% with annual billing",
				],
			},
			{
				id: "growthAnnual",
				name: "Growth",
				price: 14990,
				unit: "year",
				ctaType: "subscribe",
				idealFor: "Growth teams scaling outreach with consistent volume",
				credits: { ai: 1000, lead: 10000 },
				seats: { included: 5, additionalSeat: 0 },
				features: [
					"All Growth monthly features",
					"Save ~17% with annual billing",
				],
			},
			{
				id: "scaleAnnual",
				name: "Scale",
				price: 49900,
				unit: "year",
				ctaType: "contactSales",
				idealFor: "High-volume teams optimizing cost per lead at scale",
				credits: { ai: 5000, lead: 50000 },
				seats: { included: "unlimited", additionalSeat: 0 },
				features: [
					"All Scale monthly features",
					"Save ~17% with annual billing",
					"Priority onboarding",
				],
			},
		],
		oneTime: [
			{
				id: "selfHosted",
				name: "Self-Hosted Enterprise License",
				pricingModel: "$7,999/year — Contact Sales",
				ctaPrimary: {
					label: "Contact Sales",
					type: "contactSales",
					action: "openLeadForm",
					description:
						"Connect with our enterprise team to customize deployment and licensing terms.",
				},
				ctaSecondary: {
					label: "View Documentation",
					type: "link",
					action: "navigate",
					description:
						"Review self-hosted deployment guides and technical requirements.",
				},
				idealFor:
					"Enterprise agencies, data teams, and organizations requiring full control and compliance",
				includes: [
					"Full source access for ingestion engine",
					"Unlimited internal deployments (within one org)",
					"Standard modules: MCP server, connector library, normalization engine",
					"Basic support (business hours)",
					"Minor updates (bug fixes, minor features)",
				],
				aiCredits: {
					plan: "Optional Credit Packs",
					description:
						"Lead Verification: 10,000 contacts → $2,500 | AI Automation: 5,000 runs → $1,000 | Bundle: 20,000 leads + 10,000 AI credits → $4,000",
				},
				pricingOptions: [
					{
						model: "Base License",
						details:
							"$7,999/year — Full source access, unlimited internal deployments, standard modules",
					},
					{
						model: "Add-On Modules",
						details:
							"Proxy Pool/Geo-Rotation: $1,999/year | Anti-Bot/Captcha: $2,499/year | Custom Scraper Builder: $1,999/year | Compliance Shield: $1,499/year | Team Dashboard: $1,199/year | Deal Scale API Bridge: $1,299/year",
					},
					{
						model: "Premium Support",
						details:
							"$2,499/year — 24×7 support, 4-hour SLA, dedicated account manager, quarterly architecture review",
					},
				],
				roiEstimator: ROI_ESTIMATOR,
				notes: [
					"Self-hosted model positions Lead Orchestra as enterprise-grade for agencies/data teams needing control and compliance.",
					"High license fee + modules + credits ensure 80-120% margin: license covers fixed costs, credits cover variable with margin.",
					"Tie-in with Deal Scale remains clear: ingestion from Lead Orchestra → export → AI workflows in Deal Scale.",
				],
				requirements: [
					"Executive alignment on data governance and compliance",
					"Dedicated technical contact for deployment integrations",
					"Secure infrastructure budget for private hosting (cloud or on-prem)",
					"Annual compliance review cadence with Lead Orchestra success team",
				],
			},
		],
	},
};

export const PricingPlans: Plan[] = [
	{
		id: "open-source",
		name: "Open Source",
		price: {
			monthly: {
				amount: 0,
				description: "100% free and open-source",
				features: [
					"100% free and open-source",
					"Local-first, no database required",
					"Unlimited scraping & crawling",
					"MCP plugin ecosystem access",
					"CSV/JSON export",
					"Community support",
					"Upgrade to hosted or enterprise for team features",
				],
			},
			annual: { amount: 0, description: "", features: [] },
			oneTime: { amount: 0, description: "", features: [] },
		},
		cta: { text: "Get Started Free", type: "link", href: "https://github.com" },
	},
	{
		id: "team-plan",
		name: "Team Plan",
		price: {
			monthly: {
				amount: 99,
				description: "per month",
				features: [
					"Everything in Open Source plus:",
					"3-10 team seats",
					"Shared workspace",
					"Unlimited scraping",
					"White-labeled exports",
					"Agency API access",
					"Deal Scale AI credits package included",
					"Priority support",
				],
			},
			annual: {
				amount: 990,
				description: "per year (save ~17%)",
				features: [
					"All Team monthly features",
					"Save ~17% with annual billing",
					"Priority onboarding",
				],
			},
			oneTime: { amount: 0, description: "", features: [] },
		},
		highlighted: false,
		cta: { text: "Subscribe", type: "checkout" },
	},
	{
		id: "agency-plan",
		name: "Agency Plan",
		price: {
			monthly: {
				amount: 399,
				description: "per month",
				features: [
					"Everything in Team plus:",
					"10+ seats included",
					"Advanced team management",
					"Custom branding & white-label",
					"Advanced API access",
					"Enhanced Deal Scale AI credits",
					"Dedicated account manager",
					"Priority plugin marketplace access",
				],
			},
			annual: {
				amount: 3990,
				description: "per year (save ~17%)",
				features: [
					"All Agency monthly features",
					"Save ~17% with annual billing",
					"Priority onboarding & success engineer",
				],
			},
			oneTime: { amount: 0, description: "", features: [] },
		},
		highlighted: true,
		cta: { text: "Get Started", type: "checkout" },
	},
	{
		id: "enterprise",
		name: "Enterprise",
		price: {
			monthly: {
				amount: 1500,
				description: "per month",
				features: [
					"Everything in Agency plus:",
					"SOC2 / ISO compliance",
					"Private hosting options",
					"SSO & advanced security",
					"Usage caps & compliance layers",
					"Custom MCP provider access",
					"Dedicated support & SLA",
					"Custom integrations",
				],
			},
			annual: {
				amount: 15000,
				description: "per year (save ~17%)",
				features: [
					"All Enterprise monthly features",
					"Save ~17% with annual billing",
					"Dedicated compliance & integration team",
				],
			},
			oneTime: { amount: 0, description: "", features: [] },
		},
		highlighted: false,
		cta: { text: "Contact Sales", type: "link", href: "/contact" },
	},
];

export default pricingCatalog;
