export const offerImg =
	"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80";
import {
	BookIcon,
	BriefcaseIcon,
	BuildingIcon,
	Code2Icon,
	DollarSignIcon,
	FileTextIcon,
	GlobeIcon,
	HomeIcon,
	InfoIcon,
	LightbulbIcon,
	type LucideIcon,
	MailIcon,
	NewspaperIcon,
	PhoneIcon,
	RocketIcon,
	SearchIcon,
	UsersIcon,
} from "lucide-react";

import type { StaticImageData } from "next/image";

export type NavItemChild = {
	title: string;
	href: string;
	icon: LucideIcon;
	/**
	 * Optional image URL or import for CTA card
	 */
	image?: string | StaticImageData;
	/**
	 * Optional CTA title for menu card
	 */
	ctaTitle?: string;
	/**
	 * Optional CTA subtitle for menu card
	 */
	ctaSubtitle?: string;
	/**
	 * Optional CTA button config
	 */
	ctaButton?: {
		label: string;
		href: string;
	};
};

export type NavItem = {
	title: string;
	href: string;
	icon?: LucideIcon;
	children?: NavItemChild[];
};

export const navItems: NavItem[] = [
	{ title: "Home", href: "/", icon: HomeIcon },

	{ title: "Features", href: "/features", icon: DollarSignIcon },
	{ title: "Pricing", href: "/pricing", icon: NewspaperIcon },
	{ title: "Marketplace", href: "/products", icon: NewspaperIcon },

	{
		title: "Our Expertise",
		href: "#",
		icon: BookIcon,
		children: [
			{ title: "Blogs", href: "/blogs", icon: HomeIcon },
			{ title: "Case Studies", href: "/case-studies", icon: NewspaperIcon },
			{ title: "Enterprise", href: "/pricing", icon: BuildingIcon },
			{ title: "About Us", href: "/about", icon: BriefcaseIcon },

			{ title: "Events", href: "/events", icon: HomeIcon },

			{ title: "Partners", href: "/partners", icon: UsersIcon },
			{ title: "Careers", href: "/careers", icon: BriefcaseIcon },
			{
				title: "Tools For Lead Gen Agencies",
				href: "/blogs?tag=lead+gen+agencies+tools",
				icon: FileTextIcon,
			},
			{
				title: "Tools For Founders",
				href: "/blogs?tag=founders+tools",
				icon: FileTextIcon,
			},

			{
				title: "Sign Up For Our Newsletter",
				href: "/newsletter",
				icon: FileTextIcon,
				image: offerImg,
				ctaTitle: "N8N Lead Gen Workflows",
				ctaSubtitle:
					"Get ready-to-use n8n lead gen workflows for Lead Orchestra scraping automation.",
				ctaButton: {
					label: "See Workflows",
					href: "/blogs?tag=n8n+workflows",
				},
			},
		],
	},
	{
		title: "Industries",
		href: "#",
		icon: BuildingIcon,
		children: [
			{
				title: "Founders",
				href: "/case-studies/indie-hacker-saas-mvp-24-hours",
				icon: RocketIcon,
			},
			{
				title: "Enterprise",
				href: "/case-studies/bookt-custom-lead-generation-engine",
				icon: BuildingIcon,
			},
			{
				title: "Developers & Engineers",
				href: "/case-studies/developer-replaced-scraping-code-mcp-plugin",
				icon: Code2Icon,
			},
			{
				title: "Lead Gen Agencies",
				href: "/case-studies/cold-email-agency-niche-directory-leads",
				icon: MailIcon,
			},
			{
				title: "SDR & RevOps Teams",
				href: "/case-studies/sdr-revops-competitor-case-studies",
				icon: SearchIcon,
			},
			{
				title: "Real Estate",
				href: "/case-studies/real-estate-investor-fsbo-scraping",
				icon: HomeIcon,
			},
		],
	},
	{ title: "Contact Us", href: "/contact", icon: PhoneIcon },
];
