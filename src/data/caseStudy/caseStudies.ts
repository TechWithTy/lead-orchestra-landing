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
		id: "agencies-conference-competitor-001",
		title: "Growth Agency: Capturing Leads from Competitor Webinars & Events",
		subtitle:
			"How a specialized agency started booking meetings by scraping attendee lists and chat engagement from rivals' virtual events.",
		referenceLink: "",
		slug: "agency-poaching-competitor-webinars",
		categories: ["lead-generation", "go-to-market"],
		industries: ["agencies"],
		copyright: {
			title: "Want to poach attendees from competitor events?",
			subtitle: "Stop settling for cold lists. Capture prospects who are actively raising their hands right now.",
			ctaText: "Start With 100 Free Leads",
			ctaLink: "/contact",
		},
		tags: [
			"Event Scraping",
			"Competitor Intelligence",
			"High Intent Leads",
		],
		clientName: "Elite Growth Marketing",
		clientDescription: "A boutique B2B performance marketing agency looking to outmaneuver larger local competitors.",
		featuredImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1170&auto=format&fit=crop",
		thumbnailImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"Fierce competition meant standard outbound cold calls were largely ignored.",
			"Competitors were hosting massive online webinars and effectively vacuuming up the local market demand.",
			"Needed a way to intercept potential clients right when they were at peak problem-awareness."
		],
		lastModified: new Date("2026-03-08T00:00:00.000Z"),
		howItWorks: [
			{
				stepNumber: 1,
				title: "Event Monitoring",
				subtitle: "Identify rival webinars",
				description: "We automatically track the top 5 competitors in your specific niche, flagging any upcoming public webinars or virtual events hosted on LinkedIn Live, Zoom, or Demio.",
				label: "Monitor",
				positionLabel: "Pre-Event",
				payload: [{ name: "Tracking", value: 100, fill: "#3b82f6" }],
				indicator: "line",
				icon: "Search"
			},
			{
				stepNumber: 2,
				title: "Attendee & Engagement Extraction",
				subtitle: "Scrape public RSVPs",
				description: "As the event goes live, our systems seamlessly extract public RSVPs, likes, comments, and attendee metadata directly from the event surfaces.",
				label: "Extraction",
				positionLabel: "During Event",
				payload: [{ name: "Data Sourcing", value: 100, fill: "#22c55e" }],
				indicator: "line",
				icon: "Users"
			},
			{
				stepNumber: 3,
				title: "Enrichment & Multi-Channel Outbound",
				subtitle: "Cross-reference and deploy",
				description: "We enrich those public profiles with verified work emails and initiate immediate, highly contextualized email and LinkedIn follow-ups: 'Noticed you attended X event...'",
				label: "Activation",
				positionLabel: "Post-Event",
				payload: [{ name: "Conversion", value: 100, fill: "#f59e0b" }],
				indicator: "dot",
				icon: "Mail"
			}
		],
		businessOutcomes: [
			{ title: "Booking Rate", subtitle: "28% reply-to-meeting conversion rate" },
			{ title: "Pipeline", subtitle: "Added $450k in pipeline from 3 competitor events" },
		],
		solutions: [
			"Event-driven intelligence gathering focusing exclusively on competitor-hosted spaces.",
			"Real-time data enrichment translating social footprints into verified corporate contact details.",
			"Automated, hyper-contextual 'warm' outbound triggered within 24 hours of the event."
		],
		description: "Instead of fighting for attention with generic cold outreach, we built a system for this agency to actively intercept their competitors' prospects. By monitoring rival webinars and scraping public attendee interactions, the agency was able to reach out to highly problem-aware leads precisely when they were shopping for solutions.",
		results: [
			{ title: "Hot Leads Scraped", value: "1,200+" },
			{ title: "Cost Per Acquisition", value: "Down 40%" },
		],
		howItWorks: generalHowItWorks,
		featured: true,
		redirectToContact: false,
	},
	{
		id: "b2b-software-facebook-group-001",
		title: "B2B Software: Migrating Users from Competitors' Facebook Groups",
		subtitle:
			"Steering highly engaged users away from an established legacy competitor by ethically extracting leads from their official support groups.",
		referenceLink: "",
		slug: "poaching-competitor-facebook-groups",
		categories: ["lead-generation", "automation"],
		industries: ["saas", "enterprise"],
		copyright: {
			title: "Are your competitors' customers complaining online?",
			subtitle: "Turn their negative reviews and support struggles into your next booked meetings.",
			ctaText: "Start With 100 Free Leads",
			ctaLink: "/contact",
		},
		tags: [
			"Community Scraping",
			"Competitor Displacement",
			"Buying Intent",
		],
		clientName: "NextGen Software",
		clientDescription: "A modern SaaS alternative looking to disrupt a market controlled by a single, outdated Goliath platform.",
		featuredImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1170&auto=format&fit=crop",
		thumbnailImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"The competitor had a massive monopoly and an incredibly sticky product ecosystem.",
			"Standard lead generation was too slow to find the 'tipping point' when users were actually ready to switch.",
			"Needed a way to target users exactly when they experienced friction with the legacy tool."
		],
		lastModified: new Date("2026-03-08T00:00:00.000Z"),
		howItWorks: [
			{
				stepNumber: 1,
				title: "Community Mapping",
				subtitle: "Identify hubs of friction",
				description: "Our system catalogs where the competitor's users gather for support and networking—specifically targeting unofficial subreddits, official Facebook user groups, and specialized forums.",
				label: "Mapping",
				positionLabel: "Setup",
				payload: [{ name: "Target Identification", value: 100, fill: "#3b82f6" }],
				indicator: "line",
				icon: "Network"
			},
			{
				stepNumber: 2,
				title: "Sentiment & Complaint Extraction",
				subtitle: "Filter for buying signals",
				description: "We don't just scrape members—we scrape conversations. NLP filtering automatically isolates users posting complaints about downtime, missing features, or price hikes.",
				label: "Extraction",
				positionLabel: "Ongoing",
				payload: [{ name: "Signal Extraction", value: 100, fill: "#22c55e" }],
				indicator: "line",
				icon: "SlidersHorizontal"
			},
			{
				stepNumber: 3,
				title: "Profile Resolution & Outreach",
				subtitle: "Match social identity to corporate email",
				description: "We match their social profiles to verified business emails, enabling an automated sequence: 'Saw you were struggling with [Legacy Tool]'s export feature. Our platform does that natively.'",
				label: "Resolution",
				positionLabel: "Activation",
				payload: [{ name: "Outreach Ops", value: 100, fill: "#f59e0b" }],
				indicator: "dot",
				icon: "Mail"
			}
		],
		businessOutcomes: [
			{ title: "Close Rate", subtitle: "Generated deals closed 40% faster than average" },
			{ title: "Market Share", subtitle: "Successfully migrated 150+ teams off the legacy platform in Q1" },
		],
		solutions: [
			"Scraped members and monitored specific complaint keywords inside competitor-focused community groups.",
			"Used robust identity resolution to match social media users (Facebook/Reddit handles) to professional B2B contact records.",
			"Integrated seamlessly with the client's CRM to flag high-intent conversational triggers automatically."
		],
		description: "When the market Goliath’s product began experiencing frequent outages, their users flooded community groups with complaints. Instead of letting those complaints fade into the void, we orchestrated an extraction pipeline that monitored these groups. It automatically parsed negative sentiment, resolved the posters' B2B identities, and routed them to our client's sales team for an immediate, empathetic, and perfectly timed interception.",
		results: [
			{ title: "Competitor Users Reached", value: "8,500+" },
			{ title: "Win Rate vs Legacy", value: "62%" },
		],
		howItWorks: generalHowItWorks,
		featured: true,
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
		howItWorks: generalHowItWorks,
		featured: true,
		redirectToContact: false,
	},
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
		howItWorks: generalHowItWorks,
		featured: true,
		redirectToContact: true,
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
		howItWorks: generalHowItWorks,
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
		howItWorks: generalHowItWorks,
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
		howItWorks: generalHowItWorks,
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
		howItWorks: generalHowItWorks,
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
		howItWorks: generalHowItWorks,
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
		howItWorks: generalHowItWorks,
		featured: false,
		redirectToContact: false,
	},
	{
		id: "dev-competitor-api-sniffing-001",
		title: "Engineering Team: Reverse-Engineering Competitor Data APIs",
		subtitle: "How a development team bypassed frontend scraping blocks by listening to competitor mobile API traffic to source prospects.",
		slug: "developer-poaches-competitor-api",
		categories: ["growth-hacking", "lead-generation"],
		industries: ["developers", "engineering"],
		copyright: {
			title: "Need deep technical data extraction?",
			subtitle: "Move beyond simple HTML parsing. We orchestrate complex competitor data capture ecosystems.",
			ctaText: "Start With 100 Free Leads",
			ctaLink: "/contact",
		},
		tags: [
			"API Interception",
			"Competitor Poaching",
			"B2B Developer"
		],
		clientName: "DataFlow Stack",
		clientDescription: "A fast-growing technical toolset company targeting engineers actively using a legacy enterprise competitor.",
		featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop",
		thumbnailImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"The competitor obfuscated code and aggressively blocked traditional scraping IPs.",
			"Needed to identify 'power users' of the competitor's platform who were hitting scale limits."
		],
		lastModified: new Date("2026-03-08T00:00:00.000Z"),
		businessOutcomes: [
			{ title: "Conversion Quality", subtitle: "Sourced purely technical decision-makers." },
			{ title: "Acquisition Speed", subtitle: "Bypassed anti-bot systems yielding a stable daily flow." }
		],
		solutions: [
			"Deployed an API-level monitor to intercept undocumented competitor app endpoints.",
			"Automated continuous prospect extraction mapping technical identifiers to developer GitHub/LinkedIn profiles."
		],
		description: "When traditional UI scraping failed against a well-funded competitor, we took the engineering route. By analyzing how the competitor's own mobile app requested data, we built a script that safely mimicked API calls, pulling a directory of highly active developer users which were then matched to professional business identities.",
		results: [
			{ title: "Active Users Found", value: "14,000+" },
			{ title: "Response Rate", value: "34%" }
		],
		howItWorks: generalHowItWorks,
		featured: false,
		redirectToContact: false,
	},
	{
		id: "sdr-competitor-g2-intent",
		title: "SDR / RevOps: Capturing High-Intent Rival Buyers on Review Sites",
		subtitle: "How a RevOps team routed users looking at a competitor's G2 profiles straight into their outbound cadences.",
		slug: "sdr-revops-competitor-poaching-g2",
		categories: ["lead-generation", "automation"],
		industries: ["sales", "sdr", "revops"],
		copyright: {
			title: "Looking to intercept active buyers?",
			subtitle: "People looking at your competitors are ready to buy. Reach them first.",
			ctaText: "Start With 100 Free Leads",
			ctaLink: "/contact",
		},
		tags: [
			"Buyer Intent",
			"Sales Automation",
			"Competitor Conquesting"
		],
		clientName: "ScaleVelocity CRM",
		clientDescription: "A Series B sales acceleration platform seeking to unseat the market leader.",
		featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop",
		thumbnailImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"SDRs were wasting time engaging cold prospects not currently in a buying cycle.",
			"Competitor possessed massive brand awareness, meaning buyers naturally went to them first."
		],
		lastModified: new Date("2026-03-08T00:00:00.000Z"),
		businessOutcomes: [
			{ title: "Pipeline Velocity", subtitle: "Sales cycle decreased by 45 days on average." },
			{ title: "Quota Attainment", subtitle: "SDR team beat quota by 22% in the first quarter." }
		],
		solutions: [
			"Scraped reviewer identity clues and firmographic data from software review platforms.",
			"Used Waterfall Enrichment tools to identify the specific buyer and enrich with mobile numbers."
		],
		description: "RevOps needed better leads for their SDRs. We built an automated engine that continuously scraped software review boards for companies complaining about the market leader. By the time those unhappy customers were actively evaluating choices, the SDR team was already cold-calling them with a perfectly timed counter-offer.",
		results: [
			{ title: "Intent Verified Leads", value: "750/mo" },
			{ title: "Meetings Booked", value: "+110%" }
		],
		howItWorks: generalHowItWorks,
		featured: false,
		redirectToContact: false,
	},
	{
		id: "real-estate-competitor-brokerage-poaching",
		title: "Real Estate: Poaching the Top Selling Agents from Rival Brokerages",
		subtitle: "How a boutique real estate team grew their headcount by scraping competitor broker production data.",
		slug: "real-estate-poach-competitor-agents",
		categories: ["acquisition", "lead-generation"],
		industries: ["real-estate", "recruiting"],
		copyright: {
			title: "Want to recruit the best in the business?",
			subtitle: "Stop guessing who produces. We provide the data you need to recruit top performers.",
			ctaText: "Start With 100 Free Leads",
			ctaLink: "/contact",
		},
		tags: [
			"Recruiting Ops",
			"Competitor Extraction",
			"Real Estate Growth"
		],
		clientName: "Ascend Brokerage",
		clientDescription: "A high-split, tech-forward real estate brokerage wanting to expand rapidly in a new market.",
		featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop",
		thumbnailImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400&auto=format&fit=crop",
		businessChallenges: [
			"Recruiters were blindly contacting agents who had low closing volume.",
			"Competitor brokerages hid contact details of their top-performing agents to prevent poaching."
		],
		lastModified: new Date("2026-03-08T00:00:00.000Z"),
		businessOutcomes: [
			{ title: "Recruiting Target", subtitle: "Added 40 high-volume agents in exactly 6 months." },
			{ title: "Time Saved", subtitle: "Recruiters spent 0 hours researching closing volume." }
		],
		solutions: [
			"Scraped regional MLS and competitor 'team' pages to map agents against their 12-month production volume.",
			"Filtered the list to only include agents closing $10M+ who were at brokerages with unfavorable commission splits."
		],
		description: "Instead of blindly cold calling licensed real estate agents, this brokerage engaged us to programmatically build a tiered list of competitor agents. By bridging MLS transaction data with the competitor brokerages' internal rosters, we gave the recruiting team a high-intent list of targets—and their direct contact numbers—leading to historic recruiting velocity.",
		results: [
			{ title: "Top Agents Identified", value: "1,050+" },
			{ title: "Successful Recruits", value: "40" }
		],
		howItWorks: generalHowItWorks,
		featured: false,
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
