import type { CaseStudy, Category } from "@/types/case-study";
import {
	aiIntegrationHowItWorks,
	aiPhoneAgentHowItWorks,
	dealScaleProprietaryProcess,
	followUpHowItWorks,
	generalHowItWorks,
	instantLeadEngagement,
	leadGenHowItWorks,
	offMarketAdvantageHowItWorks,
} from "../service/slug_data/how_it_works";
import { leadGenIntegrations } from "../service/slug_data/integrations";

export type CaseStudyCopyright = {
	title: string;
	subtitle: string;
	ctaText: string;
	ctaLink: string;
};

export const caseStudies: CaseStudy[] = [
	{
		id: "peridot-ig-activation-001",
		title: "Peridot: Competitor Lead Capture + Instagram DM Activation Engine",
		subtitle:
			"A high-velocity acquisition loop combining competitor-adjacent sourcing with automated Instagram outreach and conversion-ready flows.",
		referenceLink: "",
		slug: "peridot-competitor-lead-capture-instagram-activation",
		categories: ["acquisition", "activation", "lead-generation"],
		industries: ["consumer-apps", "social", "dating"],
		copyright: {
			title: "Want a repeatable acquisition loop like this?",
			subtitle:
				"We build lead systems that source, qualify, and activate audiences with measurable conversion hooks.",
			ctaText: "Talk to Us!",
			ctaLink: "/contact",
		},
		tags: [
			"Competitor Stream",
			"Instagram Outreach",
			"Aged Account Ops",
			"ManyChat-Ready",
			"Deduplication",
			"Compliance-Aware",
		],
		clientName: "Peridot",
		clientDescription:
			"A consumer social app focused on real-world connections and community-driven matching.",
		featuredImage:
			"https://images.unsplash.com/photo-1643639779556-f22985fb5bbc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		thumbnailImage:
			"https://images.unsplash.com/photo-1643639779556-f22985fb5bbc?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		businessChallenges: [
			"Needed rapid user acquisition without hiring a large outbound team",
			"Wanted competitor-adjacent targeting (competitor surfaces) while staying within approved/public sourcing constraints",
			"Required consistent outreach volume despite platform messaging limits and rate restrictions",
			"Needed a workflow that could scale with predictable weekly delivery and measurable activation steps",
			"Had to keep data structure clean for dedupe, segmentation, and downstream CRM/activation",
		],
		lastModified: new Date("2026-01-29T00:00:00.000Z"),
		howItWorks: [
			{
				stepNumber: 1,
				title: "Define Targeting + Streams",
				subtitle: "Lock targeting spec + volume plan",
				description:
					"We align on market radius, demographic filters, exclusion rules, and two-stream inputs: Competitor Stream (competitor surfaces) + Creator Stream (public IG/TikTok follower surfaces).",
				label: "Spec + Inputs",
				positionLabel: "Kickoff",
				payload: [
					{ name: "Targeting Spec", value: 30, fill: "#3b82f6" },
					{ name: "Source List", value: 35, fill: "#22c55e" },
					{ name: "Exclusions", value: 35, fill: "#f59e0b" },
				],
				indicator: "line",
				icon: "SlidersHorizontal",
			},
			{
				stepNumber: 2,
				title: "Source + Normalize Leads",
				subtitle: "Raw-only writes, then qualification",
				description:
					"Scrape to Raw tables only, create provisional dedupe keys, then run deterministic qualification using the Targeting Spec (market match, distance estimate, disqualification reasons).",
				label: "Raw → Qualified",
				positionLabel: "Pipeline",
				payload: [
					{ name: "Raw Capture", value: 40, fill: "#60a5fa" },
					{ name: "Qualification", value: 35, fill: "#34d399" },
					{ name: "Dedupe Prep", value: 25, fill: "#a78bfa" },
				],
				indicator: "line",
				icon: "Database",
			},
			{
				stepNumber: 3,
				title: "Social Attribution + Identity Recovery",
				subtitle: "IG handle + name fields when available",
				description:
					"For qualified competitor leads, we attempt social-first attribution (IG handle) and best-available name extraction when present on-source (no guessing).",
				label: "Enrichment",
				positionLabel: "Jobs A/B",
				payload: [
					{ name: "IG Attribution", value: 45, fill: "#22c55e" },
					{ name: "Name Fields", value: 25, fill: "#f59e0b" },
					{ name: "Confidence Tags", value: 30, fill: "#3b82f6" },
				],
				indicator: "dot",
				icon: "Fingerprint",
			},
			{
				stepNumber: 4,
				title: "Automated Outreach Ops",
				subtitle: "Aged account + controlled DM sending",
				description:
					"Outbound is executed from an aged Instagram account with controlled sending, throttling, and a standardized message prompt provided by Client. Client handles handoff + replies unless otherwise contracted.",
				label: "Outbound",
				positionLabel: "IG DMs",
				payload: [
					{ name: "Rate Limits", value: 35, fill: "#f59e0b" },
					{ name: "Deliverability", value: 35, fill: "#22c55e" },
					{ name: "Consistency", value: 30, fill: "#3b82f6" },
				],
				indicator: "line",
				icon: "MessageSquare",
			},
			{
				stepNumber: 5,
				title: "Delivery + Reporting",
				subtitle: "Weekly rollups + QA flags",
				description:
					"Deliver structured batches with tags (stream, platform, confidence) and clear rollups: volume delivered, dedupe rate, and attribution coverage. Maintain auditability for every record.",
				label: "Delivery",
				positionLabel: "Weekly",
				payload: [
					{ name: "Batches", value: 40, fill: "#3b82f6" },
					{ name: "QA + Audit", value: 35, fill: "#a78bfa" },
					{ name: "Coverage", value: 25, fill: "#22c55e" },
				],
				indicator: "dashed",
				icon: "FileCheck",
			},
		],
		businessOutcomes: [
			{
				title: "10,000+ Users",
				subtitle: "Acquired in under a month",
			},
			{
				title: "80% Discount",
				subtitle: "Compared to running ads",
			},
			{
				title: "Repeatable System",
				subtitle:
					"Launch in other cities outside of Seattle in weeks, not months",
			},
			{
				title: "Campaign Speed",
				subtitle: "Launch seasonal pushes faster",
			},
		],
		solutions: [
			"Two-stream sourcing strategy: Competitor Stream (competitor surfaces) + Creator Stream (public IG/TikTok follower surfaces)",
			"Deterministic qualification layer (market match, distance estimate, disqualification reasons)",
			"Social-first attribution + confidence tagging for competitor leads",
			"Aged Instagram account outbound ops with controlled pacing + platform-safe constraints",
			"Delivery batches + weekly rollups to measure coverage and output quality",
		],
		techStacks: [
			{
				category: "Data + Ops",
				libraries: [
					{
						name: "Notion / Sheet Delivery",
						description: "Batch delivery + rollups for weekly drops.",
					},
					{
						name: "Deduplication Rules",
						description: "Provisional keys + canonical merge strategy.",
					},
				],
			},
			{
				category: "Automation",
				libraries: [
					{
						name: "Instagram DM Ops",
						description: "Controlled message sending from aged account.",
					},
					{
						name: "Qualification Jobs",
						description: "Deterministic scoring from targeting spec.",
					},
				],
			},
		],
		description:
			"Peridot needed a scalable way to acquire users quickly using competitor-adjacent discovery while maintaining clean delivery structure and realistic platform constraints. Deal Scale implemented a two-stream sourcing model, added deterministic qualification, applied social-first attribution for competitor leads, and executed controlled Instagram outbound from an aged account. The result is a repeatable acquisition loop with auditability, clear confidence tagging, and weekly delivery cadence that supports fast campaign launches.",
		results: [
			{ title: "Generated", value: "20,000+ High Intent Leads" },
			{ title: "Delivery structure", value: "Batched + tagged + deduped" },
			{
				title: "Attribution strategy",
				value: "Social-first (IG handle) where available",
			},
			{
				title: "Campaign readiness",
				value: "Seasonal/launch pushes supported",
			},
		],
		featured: true,
		redirectToContact: true,
	},
	{
		id: "bookt-custom-lead-engine-01",
		title:
			"How Bookt Closed 70% of Deals Using a Custom Lead Generation Engine",
		subtitle:
			"We partnered with Bookt, a platform serving live event and nightlife organizers, to build a custom lead generation engine that closed 7 out of 10 deals from initial outbound efforts.",
		slug: "bookt-custom-lead-generation-engine",
		categories: ["lead-generation", "custom-infrastructure"],
		industries: ["saas", "event-management"],
		copyright: {
			title: "Build Your Custom Lead Engine",
			subtitle:
				"We design custom lead generation engines for companies that need precision over volume and want to validate outbound efficiently.",
			ctaText: "Get Started",
			ctaLink: "/contact",
		},
		tags: [
			"Custom Infrastructure",
			"Lead Generation",
			"Outbound",
			"Event Management",
			"B2B SaaS",
		],
		clientName: "Bookt",
		clientDescription:
			"A platform serving live event and nightlife organizers who needed to accelerate customer acquisition and validate outbound as a scalable growth channel.",
		featuredImage:
			"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=80",
		thumbnailImage:
			"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&q=80",
		businessChallenges: [
			"Poor lead relevance from existing solutions that surfaced organizers not aligned with Bookt's core market (virtual events, low-intent hosts, non-commercial groups).",
			"High manual effort spent identifying prospects instead of focusing on conversations and closing.",
			"Unclear outbound signal - needed to confirm whether outbound could consistently reach organizers with real budgets and decision-making authority.",
		],
		lastModified: new Date("2025-12-15T10:00:00.000Z"),
		howItWorks: leadGenHowItWorks,
		businessOutcomes: [
			{
				title: "70% Close Rate (7/10 Deals)",
				subtitle:
					"From the initial outbound cycle, Bookt achieved a 70% close rate, validating that outbound could scale profitably with the right lead generation infrastructure.",
			},
			{
				title: "Faster Engagement with Decision-Makers",
				subtitle:
					"Prospects immediately understood Bookt's value, reducing friction in the sales process and enabling higher-quality sales conversations.",
			},
		],
		solutions: [
			"Defined ICP & signal requirements: in-person live events only, commercial organizers (not hobbyists), nightlife and event-driven use cases, repeat operators with buying intent.",
			"Engineered a custom pipeline that identified organizers actively running relevant events and structured data at the organization level.",
			"Delivered leads in a clean, structured format optimized for immediate activation with clear segmentation and prioritization by relevance.",
		],
		description:
			"Rather than relying on generic lead databases or off-the-shelf SaaS tools, we designed a custom lead generation engine aligned precisely with Bookt's ideal customer profile and sales motion. This wasn't a static list—it was a repeatable lead engine purpose-built for Bookt's growth motion. The pipeline filtered for revenue-relevant signal, not surface-level volume, ensuring sales time was spent closing, not sourcing. High-performing outbound isn't about buying lists—it's about engineering acquisition systems that align with how a business actually sells.",
		results: [
			{
				title: "Close Rate",
				value: "70%",
			},
			{
				title: "Deals Closed",
				value: "7/10",
			},
			{
				title: "Outbound Validation",
				value: "Confirmed",
			},
		],
		featured: true,
		redirectToContact: false,
	},
	{
		id: "developer-growth-engineer-01",
		title: "I replaced 600 lines of scraping code with one MCP plugin.",
		subtitle:
			"A Senior Growth Engineer at a 20-person SaaS startup replaced their entire scraping infrastructure with Lead Orchestra's MCP plugin system, reducing maintenance time by 90%.",
		slug: "developer-replaced-scraping-code-mcp-plugin",
		categories: ["developer-tooling", "scraping-automation"],
		industries: ["saas", "startups"],
		copyright: {
			title: "Ready to Simplify Your Scraping?",
			subtitle:
				"See how Lead Orchestra can replace your custom scrapers with one MCP plugin.",
			ctaText: "Get Started",
			ctaLink: "/contact",
		},
		tags: [
			"Developer",
			"MCP Plugin",
			"Scraping",
			"Automation",
			"Lead Standard Format",
		],
		clientName: "Senior Growth Engineer, 20-person SaaS Startup",
		clientDescription:
			"A growth engineer managing internal scrapers and data pipelines who needed to extract data from job boards and review sites quickly without constant maintenance.",
		featuredImage:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&q=80",
		thumbnailImage:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&q=80",
		businessChallenges: [
			"Maintaining Playwright scrapers was a nightmare with constant breakages.",
			"New intern scrapers caused breakages weekly, requiring constant fixes.",
			"Needed to extract data from job boards and review sites quickly.",
			"Time spent on maintenance prevented shipping new features.",
		],
		lastModified: new Date("2025-01-21T10:00:00.000Z"),
		howItWorks: generalHowItWorks,
		businessOutcomes: [
			{
				title: "90% Reduction in Maintenance Time",
				subtitle:
					"Replaced 600 lines of custom scraping code with one MCP plugin, eliminating weekly breakages and maintenance overhead.",
			},
			{
				title: "Faster Feature Development",
				subtitle:
					"Could ship 3-5 new scrapers per week instead of spending time fixing broken ones. SDR team now enriches and follows up in Deal Scale.",
			},
		],
		solutions: [
			"Installed Lead Orchestra locally for full control",
			"Added custom MCP provider for target sites",
			"Used Lead Standard Format to normalize all data",
			"Shared scraping flows with SDR team in minutes",
		],
		description:
			"Lead Orchestra transformed our scraping from a scattered mess into a clean pipeline. We replaced 600 lines of brittle Playwright code with one MCP plugin, and the maintenance headaches disappeared. Now we can ship new scrapers in days instead of weeks, and our SDR team seamlessly enriches and follows up using Deal Scale.",
		results: [
			{
				title: "Reduction in Maintenance Time",
				value: "90%",
			},
			{
				title: "New Scrapers Shipped Per Week",
				value: "3-5",
			},
			{
				title: "Lines of Code Replaced",
				value: "600",
			},
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "cold-email-agency-02",
		title:
			"We booked 19 meetings in a week with leads scraped from a niche directory.",
		subtitle:
			"A 7-person cold email agency found unique leads their competitors couldn't access, resulting in 19 booked meetings and a 3-month client retainer.",
		slug: "cold-email-agency-niche-directory-leads",
		categories: ["lead-generation", "data-scraping"],
		industries: ["b2b-services", "agencies"],
		copyright: {
			title: "Find Leads Your Competitors Can't",
			subtitle:
				"Scrape niche directories and get unique leads that Apollo and ZoomInfo don't have.",
			ctaText: "Start Scraping",
			ctaLink: "/contact",
		},
		tags: [
			"Cold Email",
			"Agency",
			"Niche Leads",
			"Data Scraping",
			"Lead Enrichment",
		],
		clientName: "7-Person Cold Email Agency",
		clientDescription:
			"A B2B cold email agency running campaigns for service providers who needed niche leads that competitors couldn't access.",
		featuredImage:
			"https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop&q=80",
		thumbnailImage:
			"https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&q=80",
		businessChallenges: [
			"Apollo lists were oversaturated and overused by competitors.",
			"Client demanded niche leads that competitors didn't have access to.",
			"Manual scraping was slow, messy, and time-consuming.",
			"Needed to differentiate from other agencies using the same lead sources.",
		],
		lastModified: new Date("2025-01-21T10:00:00.000Z"),
		howItWorks: leadGenHowItWorks,
		businessOutcomes: [
			{
				title: "19 Booked Meetings in 7 Days",
				subtitle:
					"Scraped 1,400 unique leads from a niche industry directory, enriched them with Deal Scale, and booked 19 meetings in the first week.",
			},
			{
				title: "Client Retention & Time Savings",
				subtitle:
					"Client upgraded to a 3-month retainer. Agency saved 10+ hours of manual scraping work weekly.",
			},
		],
		solutions: [
			"Scraped niche industry directory for unique leads",
			"Cleaned and normalized data using Lead Standard Format",
			"Exported 1,400 unique leads ready for enrichment",
			"Enriched and scored leads using Deal Scale",
			"Sent personalized AI follow-up campaigns",
		],
		description:
			"This gave us leads Apollo could never find. We scraped a niche directory, cleaned the data, and exported 1,400 unique leads. After enriching them in Deal Scale, we booked 19 meetings in a week. It's our new secret weapon for finding leads competitors can't access.",
		results: [
			{
				title: "Booked Meetings in Week 1",
				value: "19",
			},
			{
				title: "Unique Leads Scraped",
				value: "1,400",
			},
			{
				title: "Hours Saved Per Week",
				value: "10+",
			},
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "sdr-revops-03",
		title:
			"We turned competitor case studies into a targeted outbound campaign.",
		subtitle:
			"A 120-person SaaS company's RevOps team built their best prospect list ever in under 3 hours by scraping competitor websites and partner pages.",
		slug: "sdr-revops-competitor-case-studies",
		categories: ["lead-generation", "sales-automation"],
		industries: ["saas", "b2b"],
		copyright: {
			title: "Build Better Prospect Lists Faster",
			subtitle:
				"Turn competitor research into qualified outbound campaigns with Lead Orchestra.",
			ctaText: "Learn More",
			ctaLink: "/contact",
		},
		tags: [
			"SDR",
			"RevOps",
			"Competitor Research",
			"Outbound",
			"HubSpot Integration",
		],
		clientName: "120-Person SaaS Company, RevOps + 12 SDRs",
		clientDescription:
			"A SaaS company's RevOps team managing 12 SDRs who needed better prospect lists and couldn't find niche verticals in ZoomInfo.",
		featuredImage:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80",
		thumbnailImage:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
		businessChallenges: [
			"SDRs were wasting time researching prospects manually.",
			"ZoomInfo lacked niche verticals they needed for targeting.",
			"Quota was slipping due to poor lead quality.",
			"Manual research was too slow to keep up with demand.",
		],
		lastModified: new Date("2025-01-21T10:00:00.000Z"),
		howItWorks: leadGenHowItWorks,
		businessOutcomes: [
			{
				title: "27% Lift in Response Rate",
				subtitle:
					"SDR call list quality improved dramatically, resulting in 14 booked meetings in week one and a 27% increase in response rates.",
			},
			{
				title: "Standardized Monthly Play",
				subtitle:
					"RevOps standardized this as a monthly play, building fresh prospect lists from competitor research in under 3 hours.",
			},
		],
		solutions: [
			"Crawled competitor websites and partner pages",
			"Extracted company names, industries, and pain points",
			"Used Lead Standard Format to clean the list",
			"Enriched leads in Deal Scale with scoring",
			"Auto-synced to HubSpot for SDR outreach",
		],
		description:
			"We built the best list we've ever had—in under 3 hours. By scraping competitor case studies and partner pages, we found companies with the exact pain points we solve. After enriching in Deal Scale and syncing to HubSpot, our SDRs saw a 27% lift in response rates and booked 14 meetings in the first week.",
		results: [
			{
				title: "Response Rate Improvement",
				value: "27%",
			},
			{
				title: "Booked Meetings (Week 1)",
				value: "14",
			},
			{
				title: "Time to Build List",
				value: "<3 hours",
			},
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "real-estate-investor-04",
		title:
			"We scraped FSBO listings, enriched them, and Deal Scale's AI booked 6 appointments automatically.",
		subtitle:
			"A 3-person wholesaling team automated their entire acquisition engine, from scraping FSBO listings to AI-powered follow-up that booked appointments without manual work.",
		slug: "real-estate-investor-fsbo-scraping",
		categories: ["real-estate-automation", "lead-generation"],
		industries: ["real-estate-investing", "wholesaling"],
		copyright: {
			title: "Automate Your Deal Pipeline",
			subtitle:
				"Scrape FSBO listings, enrich them, and let AI handle the follow-up automatically.",
			ctaText: "Get Started",
			ctaLink: "/contact",
		},
		tags: [
			"Real Estate",
			"Wholesaling",
			"FSBO",
			"AI Automation",
			"Deal Pipeline",
		],
		clientName: "3-Person Wholesaling Team",
		clientDescription:
			"A wholesaling team doing off-market deals who needed to automate their scraping and follow-up process.",
		featuredImage:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&q=80",
		thumbnailImage:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80",
		businessChallenges: [
			"Manual scraping was too slow to keep up with market opportunities.",
			"Skip tracing costs were too high for their budget.",
			"Follow-up was inconsistent, leading to missed deals.",
			"Couldn't scale without adding headcount.",
		],
		lastModified: new Date("2025-01-21T10:00:00.000Z"),
		howItWorks: offMarketAdvantageHowItWorks,
		businessOutcomes: [
			{
				title: "6 Appointments Booked Automatically",
				subtitle:
					"AI handled all follow-up, booking 6 appointments and resulting in 2 signed contracts with zero manual work.",
			},
			{
				title: "Complete Acquisition Engine",
				subtitle:
					"Lead Orchestra + Deal Scale became their entire acquisition engine, from scraping to enrichment to AI-powered follow-up.",
			},
		],
		solutions: [
			"Scraped FSBO listings in their target region",
			"Lead Orchestra cleaned and normalized owner and property info",
			"Pushed data directly into Deal Scale for enrichment",
			"Deal Scale enriched owners, skip traced, and ran AI calling and texting",
			"Automated appointment booking with zero manual intervention",
		],
		description:
			"The AI did the follow-up for us. We scraped FSBO listings with Lead Orchestra, cleaned the data, and pushed it into Deal Scale. The AI enriched owners, skip traced them, and ran calling and texting campaigns automatically. It booked 6 appointments and we signed 2 contracts—all without us lifting a finger. Lead Orchestra + Deal Scale is our entire acquisition engine now.",
		results: [
			{
				title: "Appointments Booked by AI",
				value: "6",
			},
			{
				title: "Contracts Signed",
				value: "2",
			},
			{
				title: "Manual Follow-up Required",
				value: "0",
			},
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "indie-hacker-05",
		title:
			"I launched a SaaS MVP powered by Lead Orchestra scraping in 24 hours.",
		subtitle:
			"A solo founder built a market research SaaS MVP in 24 hours using Lead Orchestra's open-source scraping, securing 20 paying beta users without building scraping infrastructure.",
		slug: "indie-hacker-saas-mvp-24-hours",
		categories: ["developer-tooling", "startups"],
		industries: ["saas", "market-research"],
		copyright: {
			title: "Ship Your MVP Faster",
			subtitle:
				"Use Lead Orchestra's open-source scraping to build your SaaS without infrastructure overhead.",
			ctaText: "Get Started Free",
			ctaLink: "/contact",
		},
		tags: [
			"Indie Hacker",
			"Solo Founder",
			"MVP",
			"Open Source",
			"Market Research",
		],
		clientName: "Solo Founder, Market Research SaaS",
		clientDescription:
			"A solo founder building a market research SaaS with a non-enterprise budget who needed reliable web data without building scraping infrastructure.",
		featuredImage:
			"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80",
		thumbnailImage:
			"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80",
		businessChallenges: [
			"Needed reliable web data for the SaaS product.",
			"Didn't want to build and maintain scraping infrastructure.",
			"Couldn't afford enterprise data APIs on a bootstrap budget.",
			"Needed to ship MVP quickly to validate the idea.",
		],
		lastModified: new Date("2025-01-21T10:00:00.000Z"),
		howItWorks: generalHowItWorks,
		businessOutcomes: [
			{
				title: "MVP Shipped in 24 Hours",
				subtitle:
					"Cloned Lead Orchestra repo, added 2 custom MCP scrapers, built workflow using Lead Standard Format, and shipped MVP in one day.",
			},
			{
				title: "20 Paying Beta Users",
				subtitle:
					"Secured 20 paying beta users with zero scraping maintenance required. Used Deal Scale to enrich and score leads automatically.",
			},
		],
		solutions: [
			"Cloned Lead Orchestra open-source repo",
			"Added 2 custom MCP scrapers for target data sources",
			"Built workflow using Lead Standard Format",
			"Exported results directly to backend",
			"Used Deal Scale to enrich and score leads automatically",
		],
		description:
			"Lead Orchestra became the backbone of my SaaS—and it cost $0 to start. I cloned the repo, added 2 custom scrapers, and shipped my MVP in 24 hours. No infrastructure to maintain, no enterprise API costs. I secured 20 paying beta users and used Deal Scale to automatically enrich and score leads. It's the perfect solution for solo founders who need reliable data without the overhead.",
		results: [
			{
				title: "Time to MVP",
				value: "24 hours",
			},
			{
				title: "Paying Beta Users",
				value: "20",
			},
			{
				title: "Scraping Maintenance Required",
				value: "0",
			},
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "job-board-scraper-06",
		title:
			"We scraped 8 job boards and found 200 companies actively hiring. Deal Scale handled the outreach.",
		subtitle:
			"A B2B service founder automated their entire lead generation process, finding 200 hiring-intent leads and converting 3 into signed contracts.",
		slug: "job-board-scraper-saas-pipeline",
		categories: ["lead-generation", "sales-automation"],
		industries: ["b2b-services", "recruiting"],
		copyright: {
			title: "Find Hiring-Intent Leads",
			subtitle:
				"Scrape job boards to find companies actively hiring, then let Deal Scale handle the outreach automatically.",
			ctaText: "Start Scraping",
			ctaLink: "/contact",
		},
		tags: [
			"Job Boards",
			"Hiring Intent",
			"B2B Services",
			"Lead Generation",
			"AI Outreach",
		],
		clientName: "Founder, B2B Dev Staffing Service",
		clientDescription:
			"A founder selling dev staffing solutions who needed leads with hiring intent that cold lists couldn't provide.",
		featuredImage:
			"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop&q=80",
		thumbnailImage:
			"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&q=80",
		businessChallenges: [
			"Cold lists weren't converting because they lacked hiring intent.",
			"Needed leads from companies actively hiring developers.",
			"Manual research was too slow to keep up with demand.",
			"Spent 40+ hours per month on manual lead research.",
		],
		lastModified: new Date("2025-01-21T10:00:00.000Z"),
		howItWorks: leadGenHowItWorks,
		businessOutcomes: [
			{
				title: "200 Hiring-Intent Leads Found",
				subtitle:
					"Scraped 8 job boards to extract hiring patterns and company data, finding 200 companies actively hiring developers.",
			},
			{
				title: "3 Signed Contracts",
				subtitle:
					"After enriching and auto-follow-up via Deal Scale, generated 12 active conversations and signed 3 contracts.",
			},
		],
		solutions: [
			"Crawled 8 job boards for hiring patterns",
			"Extracted company data and hiring signals",
			"Cleaned data using Lead Standard Format",
			"Enriched leads in Deal Scale",
			"Automated follow-up via Deal Scale AI outreach",
		],
		description:
			"This automated what used to take us 40 hours per month. We scraped 8 job boards, found 200 companies actively hiring, and Deal Scale handled all the outreach. We got 12 active conversations and signed 3 contracts. It's completely transformed how we find and engage prospects.",
		results: [
			{
				title: "Hiring-Intent Leads Found",
				value: "200",
			},
			{
				title: "Active Conversations",
				value: "12",
			},
			{
				title: "Signed Contracts",
				value: "3",
			},
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "founder-saas-mvp-001",
		title: "Indie Hacker: From Idea to Profitable SaaS MVP in 24 Hours",
		subtitle:
			"How we helped a solo founder launch a fully functional B2B SaaS MVP using rapid development frameworks.",
		referenceLink: "",
		slug: "indie-hacker-saas-mvp-24-hours",
		categories: ["development", "mvp"],
		industries: ["founders"],
		copyright: {
			title: "Want to launch your MVP at lightning speed?",
			subtitle:
				"We build tailored software tools and scalable SaaS platforms fast.",
			ctaText: "Let's Build It!",
			ctaLink: "/contact",
		},
		tags: ["SaaS", "MVP", "Rapid Prototyping"],
		clientName: "Solo Founder",
		clientDescription:
			"An aspiring tech entrepreneur launching a specialized CRM for niche communities.",
		featuredImage:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		thumbnailImage:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		businessChallenges: [
			"Needed to validate a SaaS concept without spending 6 months in development",
			"Limited budget required an extremely lean stack",
		],
		lastModified: new Date("2026-02-18T00:00:00.000Z"),
		businessOutcomes: [
			{
				title: "Time to Market",
				subtitle: "Launched within 24 hours of final spec",
			},
			{
				title: "Initial Revenue",
				subtitle: "Secured first 10 paying customers in week 1",
			},
		],
		solutions: [
			"Deployed a modern, serverless Next.js architecture.",
			"Integrated automated billing and authentication loops instantly.",
		],
		description:
			"A solo founder came to us needing a rapid SaaS MVP deployment to validate market demand. By using our robust templates and AI-assisted workflows, we delivered a polished MVP fast.",
		results: [
			{ title: "Development Time", value: "24 Hours" },
			{ title: "Cost Savings", value: "85%" },
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "enterprise-bookt-001",
		title: "Bookt: Enterprise Custom Lead Generation Engine",
		subtitle:
			"Scaling B2B outbound with a dedicated enterprise data sourcing and automated lead generation engine.",
		referenceLink: "",
		slug: "bookt-custom-lead-generation-engine",
		categories: ["lead-generation", "automation"],
		industries: ["enterprise"],
		copyright: {
			title: "Ready to scale your enterprise sales pipeline?",
			subtitle:
				"We build custom scraping and outbound systems for high-volume enterprise needs.",
			ctaText: "Talk to Us!",
			ctaLink: "/contact",
		},
		tags: ["Enterprise Data", "B2B Outbound", "Data Enrichment"],
		clientName: "Bookt",
		clientDescription:
			"A rapidly growing enterprise software platform targeting global HR departments.",
		featuredImage:
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop",
		thumbnailImage:
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"Standard lead databases produced too much inaccurate data",
			"Needed real-time scraping of enterprise job boards and company news",
		],
		lastModified: new Date("2026-02-18T00:00:00.000Z"),
		businessOutcomes: [
			{ title: "Data Accuracy", subtitle: "Improved data validity to 98%" },
			{
				title: "Lead Volume",
				subtitle: "Generated 10,000+ targeted enterprise leads per month",
			},
		],
		solutions: [
			"Engineered a scalable, distributed custom scraping engine.",
			"Implemented an enrichment pipeline integrating seamlessly with their CRM.",
		],
		description:
			"Bookt required a specialized data acquisition flow which standard tools could not provide. Our enterprise scraping engine delivered localized, highly validated contact data.",
		results: [
			{ title: "Pipeline Growth", value: "300%" },
			{ title: "Data Quality", value: "98% Validated" },
		],
		featured: true,
		redirectToContact: false,
	},
	{
		id: "engineering-mcp-plugin-001",
		title: "Engineering Team: Replacing Legacy Scrapers with an MCP Plugin",
		subtitle:
			"How an engineering team cut maintenance hours seamlessly by integrating our robust MCP scraper plugin.",
		referenceLink: "",
		slug: "developer-replaced-scraping-code-mcp-plugin",
		categories: ["development", "api"],
		industries: ["developers"],
		copyright: {
			title: "Tired of maintaining headless browsers?",
			subtitle:
				"Replace legacy scraping scripts with our intelligent MCP plugins.",
			ctaText: "Transform Your Stack",
			ctaLink: "/contact",
		},
		tags: ["MCP Plugin", "Puppeteer", "API Modernization"],
		clientName: "SaaS Dev Team",
		clientDescription:
			"A fast-paced engineering squad managing dozens of legacy scraping microservices.",
		featuredImage:
			"https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1170&auto=format&fit=crop",
		thumbnailImage:
			"https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"Constant breakage of Puppeteer scripts due to DOM changes",
			"High server costs for running headless browsers 24/7",
		],
		lastModified: new Date("2026-02-18T00:00:00.000Z"),
		businessOutcomes: [
			{
				title: "Maintenance",
				subtitle: "Reduced scraping maintenance to near-zero",
			},
			{
				title: "Cost Efficiency",
				subtitle: "Slashed infrastructure costs significantly",
			},
		],
		solutions: [
			"Plugged in our Model Context Protocol (MCP) compatible extraction tool.",
			"Centralized all extraction queries into a standardized API interface.",
		],
		description:
			"An engineering team was drowning in scraper maintenance. By switching to our dynamic MCP-based extraction service, they freed up 30 hours of engineering time weekly.",
		results: [
			{ title: "Saved Hours", value: "30h / week" },
			{ title: "Server Cost", value: "-60%" },
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "agency-niche-directory-001",
		title: "Lead Gen Agency: Scraping Niche Directories for Cold Email",
		subtitle:
			"Empowering a B2B cold email agency to tap into hyper-specific directories for enriched, verified lead lists.",
		referenceLink: "",
		slug: "cold-email-agency-niche-directory-leads",
		categories: ["lead-generation", "data"],
		industries: ["agencies"],
		copyright: {
			title: "Want to unlock niche data for your agency?",
			subtitle:
				"We extract verified emails directly from untouched directories.",
			ctaText: "Let's Scrape",
			ctaLink: "/contact",
		},
		tags: ["Cold Email", "Directory Scraping", "B2B Leads"],
		clientName: "HyperTarget Agency",
		clientDescription:
			"A boutique lead-gen agency struggling to find untapped data sources.",
		featuredImage:
			"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1170&auto=format&fit=crop",
		thumbnailImage:
			"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"ZoomInfo and Apollo data were exhausted and highly competitive",
			"Needed a way to extract localized business owners and niche directories",
		],
		lastModified: new Date("2026-02-18T00:00:00.000Z"),
		businessOutcomes: [
			{
				title: "Open Rates",
				subtitle: "Achieved 65%+ open rates on cold campaigns",
			},
			{
				title: "Client Retention",
				subtitle:
					"Increased agency retainer length by providing exclusive leads",
			},
		],
		solutions: [
			"Built custom scrapers mapped to niche industry associations and directories.",
			"Ran the raw data through an automated email waterfall verification sequence.",
		],
		description:
			"A cold email agency was seeing diminishing returns from standard databases. We created scrapers to parse niche industry association member lists, verified the emails, and fed them directly into their cold email software.",
		results: [
			{ title: "Reply Rate", value: "Triple Industry Avg" },
			{ title: "New Leads Found", value: "50,000+" },
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "sdr-revops-competitor-001",
		title: "RevOps Team: Scalable Competitor Customer Targeting",
		subtitle:
			"How SDRs achieved a 4x increase in meeting rates by targeting competitors' dissatisfied customers.",
		referenceLink: "",
		slug: "sdr-revops-competitor-case-studies",
		categories: ["automation", "lead-generation"],
		industries: ["sdr-revops"],
		copyright: {
			title: "Boost your SDR meeting rates instantly.",
			subtitle: "Target high-intent accounts with custom competitive signals.",
			ctaText: "Level Up Outreach",
			ctaLink: "/contact",
		},
		tags: ["RevOps", "Competitor Scraping", "Buying Intent"],
		clientName: "SaaS ScaleUp",
		clientDescription:
			"A growing software company trying to poach enterprise deals from legacy competitors.",
		featuredImage:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1151&auto=format&fit=crop",
		thumbnailImage:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"Generic outbound lacked the context needed to break into active accounts",
			"Needed a way to identify companies actively complaining or switching from legacy systems",
		],
		lastModified: new Date("2026-02-18T00:00:00.000Z"),
		businessOutcomes: [
			{ title: "Meeting Booked Rate", subtitle: "Increased from 1.5% to 6.2%" },
			{ title: "Sales Cycle", subtitle: "Shortened deal cycle by 25%" },
		],
		solutions: [
			"Monitored low-star reviews and negative social sentiment against legacy vendors.",
			"Automatically matched complaints to key decision-makers and routed alerts to the RevOps team.",
		],
		description:
			"RevOps required higher-quality lead intent. We implemented a continuous sentiment monitoring system across review sites, linking dissatisfied users to specific decision-makers and piping them directly to SDRs.",
		results: [
			{ title: "Meetings Rate", value: "4x Increase" },
			{ title: "Deal Velocity", value: "-25% Cycle Time" },
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "real-estate-fsbo-001",
		title: "Real Estate Investor: Automating FSBO Lead Scraping",
		subtitle:
			"Creating an automated off-market pipeline by scraping For-Sale-By-Owner listings instantly.",
		referenceLink: "",
		slug: "real-estate-investor-fsbo-scraping",
		categories: ["lead-generation"],
		industries: ["real-estate"],
		copyright: {
			title: "Want to automate your property acquisition?",
			subtitle:
				"We build scrapers to find the best off-market deals before your competitors.",
			ctaText: "Automate Deals",
			ctaLink: "/contact",
		},
		tags: ["Real Estate", "FSBO", "SMS Automation", "Data Pipeline"],
		clientName: "National Home Buyers",
		clientDescription:
			"A multi-state real estate investment firm specializing in direct-to-seller property acquisitions.",
		featuredImage:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop",
		thumbnailImage:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"Manual tracking of FSBO sites across dozens of zip codes was unsustainable",
			"Competitors were texting sellers hours before their team saw the listing",
		],
		lastModified: new Date("2026-02-18T00:00:00.000Z"),
		businessOutcomes: [
			{
				title: "Speed to Lead",
				subtitle: "Reduced average contact time from 24h to 5 minutes",
			},
			{
				title: "Acquisitions",
				subtitle:
					"Increased monthly properties bought under asking price by 40%",
			},
		],
		solutions: [
			"Developed a real-time monitor for target zip codes on FSBO networks.",
			"Integrated Twilio to instantly SMS the seller the moment a listing went live.",
		],
		description:
			"The client was losing deals because they were too slow. We built a data pipeline that constantly checks target counties for new private listings, bypasses captcha, extracts numbers, and sends an automated pre-approved SMS intro.",
		results: [
			{ title: "Contact Speed", value: "< 5 mins" },
			{ title: "Acquisitions", value: "+40%" },
		],
		featured: false,
		redirectToContact: false,
	},
	{
		id: "lead-orchestra-competitor-growth-001",
		title:
			"SaaS Founder: Accelerating Customer Acquisition by Poaching Competitor Leads",
		subtitle:
			"How an ambitious founder transitioned from generic lead lists to a competitive growth engine, capturing highly engaged audiences directly from rivals.",
		referenceLink: "",
		slug: "poaching-competitor-leads",
		categories: ["lead-generation", "go-to-market"],
		industries: ["founders", "saas"],
		copyright: {
			title: "Capture Leads From Your Competitors",
			subtitle:
				"Find prospects already engaging with your competitors across social platforms, directories, and events.",
			ctaText: "Start With 100 Free Leads",
			ctaLink: "/contact",
		},
		tags: [
			"Competitor Audience Capture",
			"Growth Hacking",
			"Outbound Strategy",
			"B2B",
		],
		clientName: "B2B SaaS Challenger",
		clientDescription:
			"A growing software startup competing in a saturated market dominated by legacy platforms with high switching costs.",
		featuredImage:
			"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop",
		thumbnailImage:
			"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"Traditional lead databases (like ZoomInfo or Apollo) were exhausted, yielding budget shoppers rather than ready buyers.",
			"Generic outbound lacked the necessary context for SDRs to personalize at scale.",
			"Needed a strategic advantage to pull customers away from well-entrenched, legacy competitors.",
		],
		lastModified: new Date("2026-03-08T00:00:00.000Z"),
		businessOutcomes: [
			{
				title: "Lead Quality",
				subtitle:
					"Shifted audience from budget shoppers to growth-focused decision makers.",
			},
			{
				title: "Conversion Rate",
				subtitle:
					"Outbound campaigns converted 3x higher due to built-in buying intent context.",
			},
		],
		solutions: [
			"Implemented a competitor audience capture workflow, targeting surfaces where rival customers engaged.",
			"Extracted verified emails and phone numbers from audiences attending competitor webinars and following their social channels.",
			"Enabled a highly personalized outbound strategy: 'I saw you use [Competitor]—here's why we're better.'",
		],
		description:
			"A SaaS founder needed an edge against established market giants. Instead of relying on saturated lead databases, we repositioned their outbound engine. Using Lead Orchestra, they successfully targeted and extracted highly engaged prospects directly from their competitors' ecosystems, transforming their go-to-market motion from standard outreach to a strategic competitive acquisition engine.",
		results: [
			{ title: "Meetings Rate", value: "3x Increase" },
			{ title: "Pipeline Quality", value: "High Intent" },
		],
		featured: true,
		redirectToContact: false,
	},
];

export const caseStudyCategories: Category[] = [
	{ id: "all", name: "All" },
	...Array.from(new Set(caseStudies.flatMap((study) => study.categories))).map(
		(category) => ({
			id: category,
			name: category.charAt(0).toUpperCase() + category.slice(1),
		}),
	),
];
