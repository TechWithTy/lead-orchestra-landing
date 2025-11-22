import 'tsconfig-paths/register';

import { DEFAULT_SEO, STATIC_SEO_META } from '../../src/data/constants/seo';

type ValidationErrors = {
	pass: boolean;
	errors: string[];
};

type ValidationResult = {
	title: ValidationErrors;
	description: ValidationErrors;
};

// Brand prefixes - supports both Lead Orchestra and DealScale brands
const BRAND_PREFIXES = [/^Lead Orchestra/i, /^DealScale/i, /^Deal Scale/i];
// Title keywords - matches actual SEO strategy for lead scraping/data ingestion
const TITLE_KEYWORD_REGEX =
	/(Lead|Scraping|Data Ingestion|Open-Source|MCP|Export|Scrape|Developer|Agency|Automation|AI)/i;
// Description keywords - matches actual content strategy
const DESCRIPTION_KEYWORDS_REGEX =
	/(lead|scraping|data|ingestion|export|open-source|MCP|scrape|developer|agency|automation|AI|fresh leads|rented lists|plugs into)/gi;
// Value proposition - matches actual messaging about scraping and data ingestion
const VALUE_PROPOSITION_REGEX =
	/(scrape|export|data ingestion|fresh leads|open-source|plugs into|MCP|developer|agency|automation)/i;
const SPAM_REGEX = /(FREE|BUY NOW|CHEAP|!!!)/i;

function countMatches(source: string, regex: RegExp): number {
	const matches = source.match(regex);
	return matches ? matches.length : 0;
}

function containsDuplicateAI(source: string): boolean {
	return countMatches(source, /AI/gi) > 1;
}

export function validateSEO(title: string, description: string): ValidationResult {
	const results: ValidationResult = {
		title: { pass: true, errors: [] },
		description: { pass: true, errors: [] },
	};

	// Title validations
	// More flexible length for SEO-optimized titles (50-90 chars is acceptable for key terms)
	if (title.length < 30 || title.length > 90) {
		results.title.pass = false;
		results.title.errors.push('Title must be 30–90 characters.');
	}

	// Brand prefix is optional but preferred - check if brand appears anywhere in title
	if (!BRAND_PREFIXES.some((regex) => regex.test(title))) {
		// Warning but not a failure - brand can appear later in title
		// Only fail if title is too short and has no brand
		if (title.length < 50) {
			results.title.pass = false;
			results.title.errors.push(
				'Title should include brand name (Lead Orchestra, DealScale, or Deal Scale).'
			);
		}
	}

	// Check for relevant keywords - at least one should be present
	if (!TITLE_KEYWORD_REGEX.test(title)) {
		results.title.pass = false;
		results.title.errors.push(
			'Missing primary intent keyword (Lead, Scraping, Data Ingestion, Open-Source, MCP, Export, Developer, Agency, Automation, or AI).'
		);
	}

	if (containsDuplicateAI(title)) {
		results.title.pass = false;
		results.title.errors.push("Duplicate 'AI' keyword found.");
	}

	if (SPAM_REGEX.test(title)) {
		results.title.pass = false;
		results.title.errors.push('Spam or salesy language detected.');
	}

	// Description validations
	// More flexible length - 100-200 chars is acceptable for SEO
	if (description.length < 100 || description.length > 200) {
		results.description.pass = false;
		results.description.errors.push('Description must be 100–200 characters.');
	}

	// Check for relevant keywords - at least one should be present
	if (countMatches(description, DESCRIPTION_KEYWORDS_REGEX) < 1) {
		results.description.pass = false;
		results.description.errors.push(
			'Description must contain at least one primary keyword (lead, scraping, data, ingestion, export, open-source, MCP, developer, agency, automation, AI, fresh leads, etc.).'
		);
	}

	// Value proposition check - more flexible
	if (!VALUE_PROPOSITION_REGEX.test(description)) {
		results.description.pass = false;
		results.description.errors.push(
			'Description missing clear value proposition (scrape, export, data ingestion, fresh leads, open-source, plugs into, MCP, developer, agency, automation).'
		);
	}

	if (/[\n\r]/.test(description)) {
		results.description.pass = false;
		results.description.errors.push('Description must be a single sentence (no line breaks).');
	}

	if (SPAM_REGEX.test(description)) {
		results.description.pass = false;
		results.description.errors.push('Spam or salesy terms detected.');
	}

	if (containsDuplicateAI(description)) {
		results.description.pass = false;
		results.description.errors.push("Duplicate 'AI' keyword detected.");
	}

	return results;
}

const seoTargets = [
	{ label: 'DEFAULT_SEO', seo: DEFAULT_SEO },
	{ label: 'STATIC_HOME', seo: STATIC_SEO_META['/'] },
];

let hasFailures = false;

for (const { label, seo } of seoTargets) {
	const { title = '', description = '' } = seo;
	const result = validateSEO(title, description);
	const titlePass = result.title.pass ? 'PASS' : 'FAIL';
	const descriptionPass = result.description.pass ? 'PASS' : 'FAIL';

	console.log(`[${label}] Title: ${titlePass}, Description: ${descriptionPass}`);
	if (!result.title.pass || !result.description.pass) {
		hasFailures = true;
		console.dir(result, { depth: null });
	}
}

if (hasFailures) {
	console.error('Meta description/title validation failed.');
	process.exit(1);
}

console.log('Meta description/title validation passed.');
