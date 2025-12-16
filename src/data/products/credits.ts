import {
	LicenseType,
	ProductCategory,
	type ProductType,
} from "@/types/products";
import { AIConversationCreditsABTest } from "./copy";

const defaultLeadColors: ProductType["colors"] = [];
const defaultLeadReviews: ProductType["reviews"] = [];

const localBusinessLeadSubtypes: ProductType["sizes"] = [
	{ name: "Dentist", value: "dentist", inStock: true },
	{ name: "Roofer", value: "roofer", inStock: true },
	{ name: "HVAC", value: "hvac", inStock: true },
	{ name: "Plumber", value: "plumber", inStock: true },
	{ name: "Lawyer", value: "lawyer", inStock: true },
	{ name: "Restaurant", value: "restaurant", inStock: true },
	{ name: "Gym", value: "gym", inStock: true },
	{ name: "Med Spa", value: "med-spa", inStock: true },
];

const eventLeadSubtypes: ProductType["sizes"] = [
	{ name: "Conference", value: "conference", inStock: true },
	{ name: "Wedding", value: "wedding", inStock: true },
	{ name: "Festival", value: "festival", inStock: true },
	{ name: "Nightlife", value: "nightlife", inStock: true },
	{
		name: "Nonprofit Fundraiser",
		value: "nonprofit-fundraiser",
		inStock: true,
	},
	{ name: "Sports", value: "sports", inStock: true },
	{ name: "Trade Show", value: "trade-show", inStock: true },
	{ name: "Meetup", value: "meetup", inStock: true },
];

export const creditProducts: ProductType[] = [
	{
		id: "ai-credits-bundle",
		name: "Lead Credits",
		price: 100, // Starting price for the smallest bundle
		sku: "DS-AI-CRED",
		slug: "lead-credits",
		licenseName: LicenseType.Proprietary,
		abTest: AIConversationCreditsABTest,
		description:
			"Power your lead scraping and data processing workflows with lead credits. Each credit is used for data operations like scraping leads, normalizing data, and exporting to your CRM. Keep your pipeline automation running smoothly by topping up your credits anytime.",
		categories: [
			ProductCategory.Credits,
			ProductCategory.AddOn,
			ProductCategory.Automation,
		],
		images: ["/products/coins.png"],
		// Different bundle sizes are offered as 'types'
		types: [
			{ name: "1,000", value: "1k-credits", price: 100 },
			{ name: "5,000", value: "5k-credits", price: 450 }, // Bulk discount
			{ name: "15,000", value: "15k-credits", price: 1200 }, // Better discount
		],
		reviews: [], // * Required by ProductType
		colors: [], // * Required by ProductType
		sizes: [], // * Required by ProductType
		faqs: [
			{
				question: "What is a Lead Credit used for?",
				answer:
					"Lead Credits are consumed during data operations managed by your scraping jobs. This includes scraping leads from websites, normalizing data, and exporting to your CRM or other systems.",
			},
			{
				question: "Do these credits expire?",
				answer:
					"Purchased credits do not expire and will roll over each month as long as you have an active Lead Orchestra account.",
			},
		],
	},
	{
		id: "lead-credits-bundle",
		name: "Targeted Lead Credits",
		price: 200, // Starting price
		sku: "DS-LEAD-CRED",
		slug: "targeted-lead-credits",
		licenseName: LicenseType.Proprietary,
		description:
			"Purchase new, high-quality leads directly from our database of over 140M+ properties. Use Lead Credits to build hyper-targeted lists based on your specific investment criteria, such as location, property type, and owner details.",
		categories: [
			ProductCategory.Credits,
			ProductCategory.AddOn,
			ProductCategory.Leads,
		],
		images: ["/products/coins.png"],
		types: [
			{ name: "50", value: "50-leads", price: 200 },
			{ name: "200", value: "200-leads", price: 700 },
			{ name: "500", value: "500-leads", price: 1500 },
		],
		reviews: [], // * Required by ProductType
		colors: [], // * Required by ProductType
		sizes: [], // * Required by ProductType
		faqs: [
			{
				question: "What information is included with each lead?",
				answer:
					"Each lead includes the property address, owner's name (when available), and basic property characteristics. Contact information is included as part of the lead data when available.",
			},
			{
				question: "Can I filter the leads I want to purchase?",
				answer:
					"Yes. Our platform allows you to apply various filters to define your ideal customer profile (ICP) before purchasing a list, ensuring you only pay for leads that match your strategy.",
			},
		],
	},
];

export const leadProducts: ProductType[] = [
	{
		id: "leads-real-estate-off-market",
		name: "Real Estate Off-Market Leads",
		description:
			"Purchase off-market property leads with clear owner/property fields. Choose Basic for clean records, or Enriched for deeper contact and context fields.",
		price: 0.25,
		sku: "LO-LEADS-RE-OFFMARKET",
		slug: "real-estate-off-market-leads",
		licenseName: LicenseType.Proprietary,
		categories: [ProductCategory.Leads, ProductCategory.Data],
		images: [
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop&q=80",
		],
		types: [
			{ name: "Basic Lead", value: "basic", price: 0.25 },
			{ name: "Enriched Lead", value: "enriched", price: 0.55 },
		],
		reviews: defaultLeadReviews,
		colors: defaultLeadColors,
		sizes: [],
		faqs: [
			{
				question: "What is the difference between Basic and Enriched?",
				answer:
					"Basic leads include clean, normalized core fields. Enriched leads include additional contact and context fields when available.",
			},
		],
	},
	{
		id: "leads-real-estate-investor-b2b",
		name: "Real Estate Investor & Wholesaler (B2B) Leads",
		description:
			"Generate B2B lead lists of investors, wholesalers, and institutional buyers. Choose Basic for clean profiles, or Enriched for expanded contact/context fields.",
		price: 0.35,
		sku: "LO-LEADS-RE-B2B",
		slug: "real-estate-investor-b2b-leads",
		licenseName: LicenseType.Proprietary,
		categories: [ProductCategory.Leads, ProductCategory.Data],
		images: [
			"https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=900&fit=crop&q=80",
		],
		types: [
			{ name: "Basic Lead", value: "basic", price: 0.35 },
			{ name: "Enriched Lead", value: "enriched", price: 0.75 },
		],
		reviews: defaultLeadReviews,
		colors: defaultLeadColors,
		sizes: [],
	},
	{
		id: "leads-local-business-listings",
		name: "Local Business Listing Leads",
		description:
			"Scrape local business listings at scale. Pick a subtype (industry) to focus your list, then choose Basic vs Enriched lead depth.",
		price: 0.2,
		sku: "LO-LEADS-LOCAL-BIZ",
		slug: "local-business-listing-leads",
		licenseName: LicenseType.Proprietary,
		categories: [ProductCategory.Leads, ProductCategory.Data],
		images: [
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop&q=80",
		],
		types: [
			{ name: "Basic Lead", value: "basic", price: 0.2 },
			{ name: "Enriched Lead", value: "enriched", price: 0.45 },
		],
		reviews: defaultLeadReviews,
		colors: defaultLeadColors,
		sizes: localBusinessLeadSubtypes,
	},
	{
		id: "leads-event-organizers",
		name: "Event Organizer Leads",
		description:
			"Generate lead lists of organizers, venues, and promoters. Choose an event subtype and the lead depth (Basic vs Enriched).",
		price: 0.3,
		sku: "LO-LEADS-EVENTS",
		slug: "event-organizer-leads",
		licenseName: LicenseType.Proprietary,
		categories: [ProductCategory.Leads, ProductCategory.Data],
		images: [
			"https://images.unsplash.com/photo-1515169067868-5387a2d0bfe4?w=1200&h=900&fit=crop&q=80",
		],
		types: [
			{ name: "Basic Lead", value: "basic", price: 0.3 },
			{ name: "Enriched Lead", value: "enriched", price: 0.65 },
		],
		reviews: defaultLeadReviews,
		colors: defaultLeadColors,
		sizes: eventLeadSubtypes,
	},
	{
		id: "leads-dating-profiles",
		name: "Dating Profile Leads",
		description:
			"Build datasets from publicly available profile pages where permitted. Choose Basic for core fields or Enriched for expanded fields when available.",
		price: 0.1,
		sku: "LO-LEADS-DATING",
		slug: "dating-profile-leads",
		licenseName: LicenseType.Proprietary,
		categories: [ProductCategory.Leads, ProductCategory.Data],
		images: [
			"https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&h=900&fit=crop&q=80",
		],
		types: [
			{ name: "Basic Lead", value: "basic", price: 0.1 },
			{ name: "Enriched Lead", value: "enriched", price: 0.25 },
		],
		reviews: defaultLeadReviews,
		colors: defaultLeadColors,
		sizes: [],
	},
	{
		id: "leads-b2c-consumers",
		name: "B2C Consumer Leads",
		description:
			"Purchase consumer lead lists from public web sources for B2C outreach. Choose Basic vs Enriched lead depth based on your campaign needs.",
		price: 0.15,
		sku: "LO-LEADS-B2C",
		slug: "b2c-consumer-leads",
		licenseName: LicenseType.Proprietary,
		categories: [ProductCategory.Leads, ProductCategory.Data],
		images: [
			"https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1200&h=900&fit=crop&q=80",
		],
		types: [
			{ name: "Basic Lead", value: "basic", price: 0.15 },
			{ name: "Enriched Lead", value: "enriched", price: 0.35 },
		],
		reviews: defaultLeadReviews,
		colors: defaultLeadColors,
		sizes: [],
	},
];
