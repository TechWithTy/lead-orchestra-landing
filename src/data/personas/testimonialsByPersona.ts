import { DEFAULT_PERSONA_KEY } from "@/data/personas/catalog";
import type { PersonaKey } from "@/data/personas/catalog";
import type { Testimonial } from "@/types/testimonial";

export interface PersonaTestimonial extends Testimonial {
	persona: PersonaKey;
}

export const personaTestimonials: Record<PersonaKey, PersonaTestimonial[]> = {
	investor: [
		{
			persona: "investor",
			id: 1,
			name: "Ava Moretti",
			role: "Principal, Moretti Capital Holdings",
			content:
				"Lead Orchestra transformed our data pipeline almost overnight. It is the first scraping tool that genuinely adds capacity instead of adding complexity. We scrape property data from Zillow and Realtor, normalize it automatically, and export to our deal pipeline—all without maintaining fragile scripts.",
			problem:
				"Our analysts were overwhelmed by inconsistent lead sources, manual data extraction, and scraping scripts that broke constantly. We were losing 3 to 5 solid opportunities every month because we couldn't get fresh data fast enough.",
			solution:
				"Lead Orchestra centralized our scraping through the MCP API aggregator, automatic data normalization, and flexible export options. We cut our data acquisition time by more than 50 percent and increased high quality deal flow across three markets with fresh, unique leads.",
			rating: 5,
			company: "Moretti Capital Holdings",
		},
		{
			persona: "investor",
			id: 2,
			name: "Raj Patel",
			role: "Managing Director, Horizon Equity Investments",
			content:
				"As a multi market investor, Lead Orchestra is the closest thing to having a full time data engineer running 24 hours a day. We set up automated scraping jobs for each market, and fresh property data flows into our pipeline automatically.",
			problem:
				"We were drowning in manual data entry and inconsistent scraping. Even with a strong team, we missed time sensitive off market opportunities because our data pipeline was too slow and unreliable.",
			solution:
				"Lead Orchestra's automated scraping jobs, data normalization layer, and export to CRM gave us reliable daily data flow. Our data acquisition costs dropped by nearly 40 percent and our pipeline is more predictable than ever with fresh leads.",
			rating: 5,
			company: "Horizon Equity Investments",
		},
		{
			persona: "investor",
			id: 3,
			name: "Sophia Kim",
			role: "Lead Acquisitions Strategist, Kim Equity Partners",
			content:
				"I recommend Lead Orchestra to every serious investor. It is built for fast moving acquisitions teams that need reliable data pipelines and consistent fresh leads. The open-source nature means we have full control over our data.",
			problem:
				"We were losing track of data sources and spending too much on list providers, especially in high volume weeks. Stale data cost us competitive deals in multiple markets.",
			solution:
				"Lead Orchestra's unified scraping interface, automatic normalization, and export capabilities gave us reliable daily deal flow. Our data quality increased by roughly 27 percent in the first month, and we're getting leads no one else has.",
			rating: 5,
			company: "Kim Equity Partners",
		},
	],
	wholesaler: [
		{
			persona: "wholesaler",
			id: 4,
			name: "Jordan Alvarez",
			role: "Founder, Alvarez Off Market Group",
			content:
				"Lead Orchestra automated our lead scraping more effectively than any list provider, manual extraction, or VA team we ever used. We scrape property listings from Zillow, Realtor, and MLS, normalize the data automatically, and export to our deal tracker—all in minutes.",
			problem:
				"Our lead sources were scattered across multiple list providers and manual extraction, leading to inconsistent data quality and high costs. We were constantly paying for stale, oversold lists.",
			solution:
				"Lead Orchestra unified our scraping from multiple sources, automatic data normalization, and export to our pipeline. Our lead acquisition costs dropped by more than 30 percent in 60 days, and we're getting fresh leads no one else has.",
			rating: 5,
			company: "Alvarez Off Market Group",
		},
		{
			persona: "wholesaler",
			id: 5,
			name: "Marcus Bishop",
			role: "CEO, Bishop Property Solutions",
			content:
				"My wholesaling business finally feels scalable. Lead Orchestra replaced inconsistent manual data extraction with a predictable automated scraping system. We set up daily scraping jobs, and fresh property data flows into our pipeline automatically.",
			problem:
				"Fast moving deals slipped through the cracks because we couldn't get fresh property data quickly enough. Our manual scraping was slow and unreliable.",
			solution:
				"Lead Orchestra's automated scraping jobs make data extraction instant, and the normalization layer ensures consistent data quality. We secured 4 contracts in the first two weeks using fresh leads we scraped ourselves.",
			rating: 5,
			company: "Bishop Property Solutions",
		},
		{
			persona: "wholesaler",
			id: 6,
			name: "Lila Torres",
			role: "Co Founder, Torres Home Buyers",
			content:
				"Lead Orchestra feels like hiring a full data engineering team without the overhead. It is incredibly consistent and removes all guesswork from lead acquisition. We scrape, normalize, and export—that's it.",
			problem:
				"Lead intake was slow, list providers delivered inconsistent quality, and we were losing momentum because we couldn't get fresh data fast enough.",
			solution:
				"Lead Orchestra's automated scraping and data normalization kept our entire pipeline fed with fresh leads. We increased our lead volume by more than 50 percent and our deal flow stabilized immediately with unique, high-quality data.",
			rating: 5,
			company: "Torres Home Buyers",
		},
	],
	agent: [
		{
			persona: "agent",
			id: 7,
			name: "Maya Thompson",
			role: "Top Producing Agent, Thompson and Co.",
			content:
				"Lead Orchestra is like having a personal data engineer working behind the scenes. I scrape listing data from Zillow and Realtor, normalize it automatically, and export to my CRM. My pipeline has never been this active with fresh, unique leads.",
			problem:
				"I could not keep up with finding new listings and extracting property data during peak season. Opportunities were slipping away because I was spending too much time on manual data entry.",
			solution:
				"Lead Orchestra scrapes listings instantly, normalizes the data automatically, and exports to my CRM. I set up daily scraping jobs, and fresh property data flows into my pipeline automatically. My lead volume doubled within 30 days.",
			rating: 5,
			company: "Thompson and Co.",
		},
		{
			persona: "agent",
			id: 8,
			name: "Chris Delgado",
			role: "Realtor, Delgado Realty Group",
			content:
				"I have tried every list provider and scraping tool, but Lead Orchestra is the only platform that keeps my data pipeline moving automatically without constant maintenance. The MCP plugins make it easy to add new sources.",
			problem:
				"Manual data extraction and inconsistent scraping scripts slowed me down and cost me listing opportunities. List providers sold me stale data everyone else already had.",
			solution:
				"Lead Orchestra scrapes any source, normalizes every lead automatically, and exports to my systems. I spend my time meeting clients instead of maintaining scrapers or buying stale lists.",
			rating: 5,
			company: "Delgado Realty Group",
		},
		{
			persona: "agent",
			id: 9,
			name: "Rebecca Shaw",
			role: "Associate Broker, Shaw Realty Advisors",
			content:
				"Lead Orchestra supercharged my listing pipeline and helped me find more seller opportunities in a competitive market. I scrape fresh property data that no one else has access to.",
			problem:
				"My data sources were too slow and competing agents beat me to new listings. My lead acquisition was inconsistent on busy weeks because I relied on list providers.",
			solution:
				"Lead Orchestra's automated scraping, data normalization, and export capabilities helped me get fresh property data faster. My listing opportunities increased by 35 percent in the first month with unique leads I scraped myself.",
			rating: 5,
			company: "Shaw Realty Advisors",
		},
	],
	founder: [],
	loan_officer: [],
};

export const getTestimonialsForPersona = (
	persona: PersonaKey,
): PersonaTestimonial[] =>
	personaTestimonials[persona]?.length
		? personaTestimonials[persona]
		: personaTestimonials[DEFAULT_PERSONA_KEY];

export const findFirstPersonaTestimonial = (): PersonaTestimonial =>
	personaTestimonials[DEFAULT_PERSONA_KEY][0];
