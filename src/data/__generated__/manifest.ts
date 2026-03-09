export type DataModuleKey =
	| "about/hero"
	| "about/marquee"
	| "about/milestones"
	| "about/team"
	| "about/timeline"
	| "about/timelineSummary"
	| "activity/activityStream"
	| "affiliate"
	| "auth/formFields"
	| "auth/resetPassword"
	| "auth/signIn"
	| "auth/signUp"
	| "bento/caseStudy"
	| "bento/landingSnapshot"
	| "bento/main"
	| "caseStudy/caseStudies"
	| "caseStudy/slugDetails/copy"
	| "caseStudy/slugDetails/testimonials"
	| "categories"
	| "closers/mockClosers"
	| "company"
	| "constants/booking"
	| "constants/legal/cookies"
	| "constants/legal/GDPR"
	| "constants/legal/hippa"
	| "constants/legal/PII"
	| "constants/legal/privacy"
	| "constants/legal/tcpCompliance"
	| "constants/legal/terms"
	| "constants/seo"
	| "contact/affiliate"
	| "contact/authFormFields"
	| "contact/closer"
	| "contact/conversionFormFields"
	| "contact/formFields"
	| "contact/intakeFormFields"
	| "contact/pilotFormFields"
	| "contact/va"
	| "discount"
	| "discount/mockDiscountCodes"
	| "events"
	| "faq/default"
	| "faq/personaFaq"
	| "features"
	| "features/deal_scales_timeline"
	| "features/feature_timeline"
	| "home/aiOutreachStudio"
	| "landing/strapiLandingContent"
	| "layout/nav"
	| "legal/legalDocuments"
	| "medium/post"
	| "mlsProperties"
	| "partners"
	| "personas/catalog"
	| "personas/testimonialsByPersona"
	| "portfolio"
	| "products"
	| "products/aeo"
	| "products/aeo-copy"
	| "products/agents"
	| "products/agents-copy"
	| "products/closers"
	| "products/closers-copy"
	| "products/copy"
	| "products/credits"
	| "products/credits-copy"
	| "products/custom-gpt"
	| "products/custom-gpt-copy"
	| "products/essentials"
	| "products/essentials-copy"
	| "products/free-resource-copy"
	| "products/free-resources"
	| "products/hero"
	| "products/lead-magnets"
	| "products/lead-magnets-copy"
	| "products/leads-copy"
	| "products/license"
	| "products/monetize"
	| "products/monetize-copy"
	| "products/notion"
	| "products/notion-copy"
	| "products/reviews"
	| "products/sizingChart"
	| "products/vas"
	| "products/workflow"
	| "products/workflow-copy"
	| "projects"
	| "service/services"
	| "service/slug_data/consultationSteps"
	| "service/slug_data/copyright"
	| "service/slug_data/faq"
	| "service/slug_data/how_it_works"
	| "service/slug_data/integrations"
	| "service/slug_data/methodologies"
	| "service/slug_data/pricing"
	| "service/slug_data/pricing/other"
	| "service/slug_data/pricing/roiEstimator"
	| "service/slug_data/problems_solutions"
	| "service/slug_data/testimonials"
	| "service/slug_data/trustedCompanies"
	| "shipping"
	| "skiptTraceExample"
	| "social/share"
	| "transcripts"
	| "transcripts/voiceCloningAfter"
	| "transcripts/voiceCloningBefore"
	| "values"
	| "vas/mockVAs"
	| "worklow/dsl";

export type DataModuleLoaders = {
	"about/hero": () => Promise<typeof import("../about/hero")>;
	"about/marquee": () => Promise<typeof import("../about/marquee")>;
	"about/milestones": () => Promise<typeof import("../about/milestones")>;
	"about/team": () => Promise<typeof import("../about/team")>;
	"about/timeline": () => Promise<typeof import("../about/timeline")>;
	"about/timelineSummary": () => Promise<
		typeof import("../about/timelineSummary")
	>;
	"activity/activityStream": () => Promise<
		typeof import("../activity/activityStream")
	>;
	affiliate: () => Promise<typeof import("../affiliate/index")>;
	"auth/formFields": () => Promise<typeof import("../auth/formFields")>;
	"auth/resetPassword": () => Promise<typeof import("../auth/resetPassword")>;
	"auth/signIn": () => Promise<typeof import("../auth/signIn")>;
	"auth/signUp": () => Promise<typeof import("../auth/signUp")>;
	"bento/caseStudy": () => Promise<typeof import("../bento/caseStudy")>;
	"bento/landingSnapshot": () => Promise<
		typeof import("../bento/landingSnapshot")
	>;
	"bento/main": () => Promise<typeof import("../bento/main")>;
	"caseStudy/caseStudies": () => Promise<
		typeof import("../caseStudy/caseStudies")
	>;
	"caseStudy/slugDetails/copy": () => Promise<
		typeof import("../caseStudy/slugDetails/copy")
	>;
	"caseStudy/slugDetails/testimonials": () => Promise<
		typeof import("../caseStudy/slugDetails/testimonials")
	>;
	categories: () => Promise<typeof import("../categories")>;
	"closers/mockClosers": () => Promise<typeof import("../closers/mockClosers")>;
	company: () => Promise<typeof import("../company")>;
	"constants/booking": () => Promise<typeof import("../constants/booking")>;
	"constants/legal/cookies": () => Promise<
		typeof import("../constants/legal/cookies")
	>;
	"constants/legal/GDPR": () => Promise<
		typeof import("../constants/legal/GDPR")
	>;
	"constants/legal/hippa": () => Promise<
		typeof import("../constants/legal/hippa")
	>;
	"constants/legal/PII": () => Promise<typeof import("../constants/legal/PII")>;
	"constants/legal/privacy": () => Promise<
		typeof import("../constants/legal/privacy")
	>;
	"constants/legal/tcpCompliance": () => Promise<
		typeof import("../constants/legal/tcpCompliance")
	>;
	"constants/legal/terms": () => Promise<
		typeof import("../constants/legal/terms")
	>;
	"constants/seo": () => Promise<typeof import("../constants/seo")>;
	"contact/affiliate": () => Promise<typeof import("../contact/affiliate")>;
	"contact/authFormFields": () => Promise<
		typeof import("../contact/authFormFields")
	>;
	"contact/closer": () => Promise<typeof import("../contact/closer")>;
	"contact/conversionFormFields": () => Promise<
		typeof import("../contact/conversionFormFields")
	>;
	"contact/formFields": () => Promise<typeof import("../contact/formFields")>;
	"contact/intakeFormFields": () => Promise<
		typeof import("../contact/intakeFormFields")
	>;
	"contact/pilotFormFields": () => Promise<
		typeof import("../contact/pilotFormFields")
	>;
	"contact/va": () => Promise<typeof import("../contact/va")>;
	discount: () => Promise<typeof import("../discount/index")>;
	"discount/mockDiscountCodes": () => Promise<
		typeof import("../discount/mockDiscountCodes")
	>;
	events: () => Promise<typeof import("../events/index")>;
	"faq/default": () => Promise<typeof import("../faq/default")>;
	"faq/personaFaq": () => Promise<typeof import("../faq/personaFaq")>;
	features: () => Promise<typeof import("../features/index")>;
	"features/deal_scales_timeline": () => Promise<
		typeof import("../features/deal_scales_timeline")
	>;
	"features/feature_timeline": () => Promise<
		typeof import("../features/feature_timeline")
	>;
	"home/aiOutreachStudio": () => Promise<
		typeof import("../home/aiOutreachStudio")
	>;
	"landing/strapiLandingContent": () => Promise<
		typeof import("../landing/strapiLandingContent")
	>;
	"layout/nav": () => Promise<typeof import("../layout/nav")>;
	"legal/legalDocuments": () => Promise<
		typeof import("../legal/legalDocuments")
	>;
	"medium/post": () => Promise<typeof import("../medium/post")>;
	mlsProperties: () => Promise<typeof import("../mlsProperties")>;
	partners: () => Promise<typeof import("../partners/index")>;
	"personas/catalog": () => Promise<typeof import("../personas/catalog")>;
	"personas/testimonialsByPersona": () => Promise<
		typeof import("../personas/testimonialsByPersona")
	>;
	portfolio: () => Promise<typeof import("../portfolio/index")>;
	products: () => Promise<typeof import("../products/index")>;
	"products/aeo": () => Promise<typeof import("../products/aeo")>;
	"products/aeo-copy": () => Promise<typeof import("../products/aeo-copy")>;
	"products/agents": () => Promise<typeof import("../products/agents")>;
	"products/agents-copy": () => Promise<
		typeof import("../products/agents-copy")
	>;
	"products/closers": () => Promise<typeof import("../products/closers")>;
	"products/closers-copy": () => Promise<
		typeof import("../products/closers-copy")
	>;
	"products/copy": () => Promise<typeof import("../products/copy")>;
	"products/credits": () => Promise<typeof import("../products/credits")>;
	"products/credits-copy": () => Promise<
		typeof import("../products/credits-copy")
	>;
	"products/custom-gpt": () => Promise<typeof import("../products/custom-gpt")>;
	"products/custom-gpt-copy": () => Promise<
		typeof import("../products/custom-gpt-copy")
	>;
	"products/essentials": () => Promise<typeof import("../products/essentials")>;
	"products/essentials-copy": () => Promise<
		typeof import("../products/essentials-copy")
	>;
	"products/free-resource-copy": () => Promise<
		typeof import("../products/free-resource-copy")
	>;
	"products/free-resources": () => Promise<
		typeof import("../products/free-resources")
	>;
	"products/hero": () => Promise<typeof import("../products/hero")>;
	"products/lead-magnets": () => Promise<
		typeof import("../products/lead-magnets")
	>;
	"products/lead-magnets-copy": () => Promise<
		typeof import("../products/lead-magnets-copy")
	>;
	"products/leads-copy": () => Promise<typeof import("../products/leads-copy")>;
	"products/license": () => Promise<typeof import("../products/license")>;
	"products/monetize": () => Promise<typeof import("../products/monetize")>;
	"products/monetize-copy": () => Promise<
		typeof import("../products/monetize-copy")
	>;
	"products/notion": () => Promise<typeof import("../products/notion")>;
	"products/notion-copy": () => Promise<
		typeof import("../products/notion-copy")
	>;
	"products/reviews": () => Promise<typeof import("../products/reviews")>;
	"products/sizingChart": () => Promise<
		typeof import("../products/sizingChart")
	>;
	"products/vas": () => Promise<typeof import("../products/vas")>;
	"products/workflow": () => Promise<typeof import("../products/workflow")>;
	"products/workflow-copy": () => Promise<
		typeof import("../products/workflow-copy")
	>;
	projects: () => Promise<typeof import("../projects")>;
	"service/services": () => Promise<typeof import("../service/services")>;
	"service/slug_data/consultationSteps": () => Promise<
		typeof import("../service/slug_data/consultationSteps")
	>;
	"service/slug_data/copyright": () => Promise<
		typeof import("../service/slug_data/copyright")
	>;
	"service/slug_data/faq": () => Promise<
		typeof import("../service/slug_data/faq")
	>;
	"service/slug_data/how_it_works": () => Promise<
		typeof import("../service/slug_data/how_it_works")
	>;
	"service/slug_data/integrations": () => Promise<
		typeof import("../service/slug_data/integrations")
	>;
	"service/slug_data/methodologies": () => Promise<
		typeof import("../service/slug_data/methodologies/index")
	>;
	"service/slug_data/pricing": () => Promise<
		typeof import("../service/slug_data/pricing")
	>;
	"service/slug_data/pricing/other": () => Promise<
		typeof import("../service/slug_data/pricing/other")
	>;
	"service/slug_data/pricing/roiEstimator": () => Promise<
		typeof import("../service/slug_data/pricing/roiEstimator")
	>;
	"service/slug_data/problems_solutions": () => Promise<
		typeof import("../service/slug_data/problems_solutions")
	>;
	"service/slug_data/testimonials": () => Promise<
		typeof import("../service/slug_data/testimonials")
	>;
	"service/slug_data/trustedCompanies": () => Promise<
		typeof import("../service/slug_data/trustedCompanies")
	>;
	shipping: () => Promise<typeof import("../shipping/index")>;
	skiptTraceExample: () => Promise<typeof import("../skiptTraceExample/index")>;
	"social/share": () => Promise<typeof import("../social/share")>;
	transcripts: () => Promise<typeof import("../transcripts/index")>;
	"transcripts/voiceCloningAfter": () => Promise<
		typeof import("../transcripts/voiceCloningAfter")
	>;
	"transcripts/voiceCloningBefore": () => Promise<
		typeof import("../transcripts/voiceCloningBefore")
	>;
	values: () => Promise<typeof import("../values/index")>;
	"vas/mockVAs": () => Promise<typeof import("../vas/mockVAs")>;
	"worklow/dsl": () => Promise<typeof import("../worklow/dsl")>;
};

export type DataModuleModules = {
	[K in DataModuleKey]: Awaited<ReturnType<DataModuleLoaders[K]>>;
};

export type DataManifestEntry<K extends DataModuleKey = DataModuleKey> = {
	readonly key: K;
	readonly importPath: string;
	readonly loader: DataModuleLoaders[K];
};

export const dataManifest = {
	"about/hero": {
		key: "about/hero",
		importPath: "../about/hero",
		loader: () => import("../about/hero"),
	},
	"about/marquee": {
		key: "about/marquee",
		importPath: "../about/marquee",
		loader: () => import("../about/marquee"),
	},
	"about/milestones": {
		key: "about/milestones",
		importPath: "../about/milestones",
		loader: () => import("../about/milestones"),
	},
	"about/team": {
		key: "about/team",
		importPath: "../about/team",
		loader: () => import("../about/team"),
	},
	"about/timeline": {
		key: "about/timeline",
		importPath: "../about/timeline",
		loader: () => import("../about/timeline"),
	},
	"about/timelineSummary": {
		key: "about/timelineSummary",
		importPath: "../about/timelineSummary",
		loader: () => import("../about/timelineSummary"),
	},
	"activity/activityStream": {
		key: "activity/activityStream",
		importPath: "../activity/activityStream",
		loader: () => import("../activity/activityStream"),
	},
	affiliate: {
		key: "affiliate",
		importPath: "../affiliate/index",
		loader: () => import("../affiliate/index"),
	},
	"auth/formFields": {
		key: "auth/formFields",
		importPath: "../auth/formFields",
		loader: () => import("../auth/formFields"),
	},
	"auth/resetPassword": {
		key: "auth/resetPassword",
		importPath: "../auth/resetPassword",
		loader: () => import("../auth/resetPassword"),
	},
	"auth/signIn": {
		key: "auth/signIn",
		importPath: "../auth/signIn",
		loader: () => import("../auth/signIn"),
	},
	"auth/signUp": {
		key: "auth/signUp",
		importPath: "../auth/signUp",
		loader: () => import("../auth/signUp"),
	},
	"bento/caseStudy": {
		key: "bento/caseStudy",
		importPath: "../bento/caseStudy",
		loader: () => import("../bento/caseStudy"),
	},
	"bento/landingSnapshot": {
		key: "bento/landingSnapshot",
		importPath: "../bento/landingSnapshot",
		loader: () => import("../bento/landingSnapshot"),
	},
	"bento/main": {
		key: "bento/main",
		importPath: "../bento/main",
		loader: () => import("../bento/main"),
	},
	"caseStudy/caseStudies": {
		key: "caseStudy/caseStudies",
		importPath: "../caseStudy/caseStudies",
		loader: () => import("../caseStudy/caseStudies"),
	},
	"caseStudy/slugDetails/copy": {
		key: "caseStudy/slugDetails/copy",
		importPath: "../caseStudy/slugDetails/copy",
		loader: () => import("../caseStudy/slugDetails/copy"),
	},
	"caseStudy/slugDetails/testimonials": {
		key: "caseStudy/slugDetails/testimonials",
		importPath: "../caseStudy/slugDetails/testimonials",
		loader: () => import("../caseStudy/slugDetails/testimonials"),
	},
	categories: {
		key: "categories",
		importPath: "../categories",
		loader: () => import("../categories"),
	},
	"closers/mockClosers": {
		key: "closers/mockClosers",
		importPath: "../closers/mockClosers",
		loader: () => import("../closers/mockClosers"),
	},
	company: {
		key: "company",
		importPath: "../company",
		loader: () => import("../company"),
	},
	"constants/booking": {
		key: "constants/booking",
		importPath: "../constants/booking",
		loader: () => import("../constants/booking"),
	},
	"constants/legal/cookies": {
		key: "constants/legal/cookies",
		importPath: "../constants/legal/cookies",
		loader: () => import("../constants/legal/cookies"),
	},
	"constants/legal/GDPR": {
		key: "constants/legal/GDPR",
		importPath: "../constants/legal/GDPR",
		loader: () => import("../constants/legal/GDPR"),
	},
	"constants/legal/hippa": {
		key: "constants/legal/hippa",
		importPath: "../constants/legal/hippa",
		loader: () => import("../constants/legal/hippa"),
	},
	"constants/legal/PII": {
		key: "constants/legal/PII",
		importPath: "../constants/legal/PII",
		loader: () => import("../constants/legal/PII"),
	},
	"constants/legal/privacy": {
		key: "constants/legal/privacy",
		importPath: "../constants/legal/privacy",
		loader: () => import("../constants/legal/privacy"),
	},
	"constants/legal/tcpCompliance": {
		key: "constants/legal/tcpCompliance",
		importPath: "../constants/legal/tcpCompliance",
		loader: () => import("../constants/legal/tcpCompliance"),
	},
	"constants/legal/terms": {
		key: "constants/legal/terms",
		importPath: "../constants/legal/terms",
		loader: () => import("../constants/legal/terms"),
	},
	"constants/seo": {
		key: "constants/seo",
		importPath: "../constants/seo",
		loader: () => import("../constants/seo"),
	},
	"contact/affiliate": {
		key: "contact/affiliate",
		importPath: "../contact/affiliate",
		loader: () => import("../contact/affiliate"),
	},
	"contact/authFormFields": {
		key: "contact/authFormFields",
		importPath: "../contact/authFormFields",
		loader: () => import("../contact/authFormFields"),
	},
	"contact/closer": {
		key: "contact/closer",
		importPath: "../contact/closer",
		loader: () => import("../contact/closer"),
	},
	"contact/conversionFormFields": {
		key: "contact/conversionFormFields",
		importPath: "../contact/conversionFormFields",
		loader: () => import("../contact/conversionFormFields"),
	},
	"contact/formFields": {
		key: "contact/formFields",
		importPath: "../contact/formFields",
		loader: () => import("../contact/formFields"),
	},
	"contact/intakeFormFields": {
		key: "contact/intakeFormFields",
		importPath: "../contact/intakeFormFields",
		loader: () => import("../contact/intakeFormFields"),
	},
	"contact/pilotFormFields": {
		key: "contact/pilotFormFields",
		importPath: "../contact/pilotFormFields",
		loader: () => import("../contact/pilotFormFields"),
	},
	"contact/va": {
		key: "contact/va",
		importPath: "../contact/va",
		loader: () => import("../contact/va"),
	},
	discount: {
		key: "discount",
		importPath: "../discount/index",
		loader: () => import("../discount/index"),
	},
	"discount/mockDiscountCodes": {
		key: "discount/mockDiscountCodes",
		importPath: "../discount/mockDiscountCodes",
		loader: () => import("../discount/mockDiscountCodes"),
	},
	events: {
		key: "events",
		importPath: "../events/index",
		loader: () => import("../events/index"),
	},
	"faq/default": {
		key: "faq/default",
		importPath: "../faq/default",
		loader: () => import("../faq/default"),
	},
	"faq/personaFaq": {
		key: "faq/personaFaq",
		importPath: "../faq/personaFaq",
		loader: () => import("../faq/personaFaq"),
	},
	features: {
		key: "features",
		importPath: "../features/index",
		loader: () => import("../features/index"),
	},
	"features/deal_scales_timeline": {
		key: "features/deal_scales_timeline",
		importPath: "../features/deal_scales_timeline",
		loader: () => import("../features/deal_scales_timeline"),
	},
	"features/feature_timeline": {
		key: "features/feature_timeline",
		importPath: "../features/feature_timeline",
		loader: () => import("../features/feature_timeline"),
	},
	"home/aiOutreachStudio": {
		key: "home/aiOutreachStudio",
		importPath: "../home/aiOutreachStudio",
		loader: () => import("../home/aiOutreachStudio"),
	},
	"landing/strapiLandingContent": {
		key: "landing/strapiLandingContent",
		importPath: "../landing/strapiLandingContent",
		loader: () => import("../landing/strapiLandingContent"),
	},
	"layout/nav": {
		key: "layout/nav",
		importPath: "../layout/nav",
		loader: () => import("../layout/nav"),
	},
	"legal/legalDocuments": {
		key: "legal/legalDocuments",
		importPath: "../legal/legalDocuments",
		loader: () => import("../legal/legalDocuments"),
	},
	"medium/post": {
		key: "medium/post",
		importPath: "../medium/post",
		loader: () => import("../medium/post"),
	},
	mlsProperties: {
		key: "mlsProperties",
		importPath: "../mlsProperties",
		loader: () => import("../mlsProperties"),
	},
	partners: {
		key: "partners",
		importPath: "../partners/index",
		loader: () => import("../partners/index"),
	},
	"personas/catalog": {
		key: "personas/catalog",
		importPath: "../personas/catalog",
		loader: () => import("../personas/catalog"),
	},
	"personas/testimonialsByPersona": {
		key: "personas/testimonialsByPersona",
		importPath: "../personas/testimonialsByPersona",
		loader: () => import("../personas/testimonialsByPersona"),
	},
	portfolio: {
		key: "portfolio",
		importPath: "../portfolio/index",
		loader: () => import("../portfolio/index"),
	},
	products: {
		key: "products",
		importPath: "../products/index",
		loader: () => import("../products/index"),
	},
	"products/aeo": {
		key: "products/aeo",
		importPath: "../products/aeo",
		loader: () => import("../products/aeo"),
	},
	"products/aeo-copy": {
		key: "products/aeo-copy",
		importPath: "../products/aeo-copy",
		loader: () => import("../products/aeo-copy"),
	},
	"products/agents": {
		key: "products/agents",
		importPath: "../products/agents",
		loader: () => import("../products/agents"),
	},
	"products/agents-copy": {
		key: "products/agents-copy",
		importPath: "../products/agents-copy",
		loader: () => import("../products/agents-copy"),
	},
	"products/closers": {
		key: "products/closers",
		importPath: "../products/closers",
		loader: () => import("../products/closers"),
	},
	"products/closers-copy": {
		key: "products/closers-copy",
		importPath: "../products/closers-copy",
		loader: () => import("../products/closers-copy"),
	},
	"products/copy": {
		key: "products/copy",
		importPath: "../products/copy",
		loader: () => import("../products/copy"),
	},
	"products/credits": {
		key: "products/credits",
		importPath: "../products/credits",
		loader: () => import("../products/credits"),
	},
	"products/credits-copy": {
		key: "products/credits-copy",
		importPath: "../products/credits-copy",
		loader: () => import("../products/credits-copy"),
	},
	"products/custom-gpt": {
		key: "products/custom-gpt",
		importPath: "../products/custom-gpt",
		loader: () => import("../products/custom-gpt"),
	},
	"products/custom-gpt-copy": {
		key: "products/custom-gpt-copy",
		importPath: "../products/custom-gpt-copy",
		loader: () => import("../products/custom-gpt-copy"),
	},
	"products/essentials": {
		key: "products/essentials",
		importPath: "../products/essentials",
		loader: () => import("../products/essentials"),
	},
	"products/essentials-copy": {
		key: "products/essentials-copy",
		importPath: "../products/essentials-copy",
		loader: () => import("../products/essentials-copy"),
	},
	"products/free-resource-copy": {
		key: "products/free-resource-copy",
		importPath: "../products/free-resource-copy",
		loader: () => import("../products/free-resource-copy"),
	},
	"products/free-resources": {
		key: "products/free-resources",
		importPath: "../products/free-resources",
		loader: () => import("../products/free-resources"),
	},
	"products/hero": {
		key: "products/hero",
		importPath: "../products/hero",
		loader: () => import("../products/hero"),
	},
	"products/lead-magnets": {
		key: "products/lead-magnets",
		importPath: "../products/lead-magnets",
		loader: () => import("../products/lead-magnets"),
	},
	"products/lead-magnets-copy": {
		key: "products/lead-magnets-copy",
		importPath: "../products/lead-magnets-copy",
		loader: () => import("../products/lead-magnets-copy"),
	},
	"products/leads-copy": {
		key: "products/leads-copy",
		importPath: "../products/leads-copy",
		loader: () => import("../products/leads-copy"),
	},
	"products/license": {
		key: "products/license",
		importPath: "../products/license",
		loader: () => import("../products/license"),
	},
	"products/monetize": {
		key: "products/monetize",
		importPath: "../products/monetize",
		loader: () => import("../products/monetize"),
	},
	"products/monetize-copy": {
		key: "products/monetize-copy",
		importPath: "../products/monetize-copy",
		loader: () => import("../products/monetize-copy"),
	},
	"products/notion": {
		key: "products/notion",
		importPath: "../products/notion",
		loader: () => import("../products/notion"),
	},
	"products/notion-copy": {
		key: "products/notion-copy",
		importPath: "../products/notion-copy",
		loader: () => import("../products/notion-copy"),
	},
	"products/reviews": {
		key: "products/reviews",
		importPath: "../products/reviews",
		loader: () => import("../products/reviews"),
	},
	"products/sizingChart": {
		key: "products/sizingChart",
		importPath: "../products/sizingChart",
		loader: () => import("../products/sizingChart"),
	},
	"products/vas": {
		key: "products/vas",
		importPath: "../products/vas",
		loader: () => import("../products/vas"),
	},
	"products/workflow": {
		key: "products/workflow",
		importPath: "../products/workflow",
		loader: () => import("../products/workflow"),
	},
	"products/workflow-copy": {
		key: "products/workflow-copy",
		importPath: "../products/workflow-copy",
		loader: () => import("../products/workflow-copy"),
	},
	projects: {
		key: "projects",
		importPath: "../projects",
		loader: () => import("../projects"),
	},
	"service/services": {
		key: "service/services",
		importPath: "../service/services",
		loader: () => import("../service/services"),
	},
	"service/slug_data/consultationSteps": {
		key: "service/slug_data/consultationSteps",
		importPath: "../service/slug_data/consultationSteps",
		loader: () => import("../service/slug_data/consultationSteps"),
	},
	"service/slug_data/copyright": {
		key: "service/slug_data/copyright",
		importPath: "../service/slug_data/copyright",
		loader: () => import("../service/slug_data/copyright"),
	},
	"service/slug_data/faq": {
		key: "service/slug_data/faq",
		importPath: "../service/slug_data/faq",
		loader: () => import("../service/slug_data/faq"),
	},
	"service/slug_data/how_it_works": {
		key: "service/slug_data/how_it_works",
		importPath: "../service/slug_data/how_it_works",
		loader: () => import("../service/slug_data/how_it_works"),
	},
	"service/slug_data/integrations": {
		key: "service/slug_data/integrations",
		importPath: "../service/slug_data/integrations",
		loader: () => import("../service/slug_data/integrations"),
	},
	"service/slug_data/methodologies": {
		key: "service/slug_data/methodologies",
		importPath: "../service/slug_data/methodologies/index",
		loader: () => import("../service/slug_data/methodologies/index"),
	},
	"service/slug_data/pricing": {
		key: "service/slug_data/pricing",
		importPath: "../service/slug_data/pricing",
		loader: () => import("../service/slug_data/pricing"),
	},
	"service/slug_data/pricing/other": {
		key: "service/slug_data/pricing/other",
		importPath: "../service/slug_data/pricing/other",
		loader: () => import("../service/slug_data/pricing/other"),
	},
	"service/slug_data/pricing/roiEstimator": {
		key: "service/slug_data/pricing/roiEstimator",
		importPath: "../service/slug_data/pricing/roiEstimator",
		loader: () => import("../service/slug_data/pricing/roiEstimator"),
	},
	"service/slug_data/problems_solutions": {
		key: "service/slug_data/problems_solutions",
		importPath: "../service/slug_data/problems_solutions",
		loader: () => import("../service/slug_data/problems_solutions"),
	},
	"service/slug_data/testimonials": {
		key: "service/slug_data/testimonials",
		importPath: "../service/slug_data/testimonials",
		loader: () => import("../service/slug_data/testimonials"),
	},
	"service/slug_data/trustedCompanies": {
		key: "service/slug_data/trustedCompanies",
		importPath: "../service/slug_data/trustedCompanies",
		loader: () => import("../service/slug_data/trustedCompanies"),
	},
	shipping: {
		key: "shipping",
		importPath: "../shipping/index",
		loader: () => import("../shipping/index"),
	},
	skiptTraceExample: {
		key: "skiptTraceExample",
		importPath: "../skiptTraceExample/index",
		loader: () => import("../skiptTraceExample/index"),
	},
	"social/share": {
		key: "social/share",
		importPath: "../social/share",
		loader: () => import("../social/share"),
	},
	transcripts: {
		key: "transcripts",
		importPath: "../transcripts/index",
		loader: () => import("../transcripts/index"),
	},
	"transcripts/voiceCloningAfter": {
		key: "transcripts/voiceCloningAfter",
		importPath: "../transcripts/voiceCloningAfter",
		loader: () => import("../transcripts/voiceCloningAfter"),
	},
	"transcripts/voiceCloningBefore": {
		key: "transcripts/voiceCloningBefore",
		importPath: "../transcripts/voiceCloningBefore",
		loader: () => import("../transcripts/voiceCloningBefore"),
	},
	values: {
		key: "values",
		importPath: "../values/index",
		loader: () => import("../values/index"),
	},
	"vas/mockVAs": {
		key: "vas/mockVAs",
		importPath: "../vas/mockVAs",
		loader: () => import("../vas/mockVAs"),
	},
	"worklow/dsl": {
		key: "worklow/dsl",
		importPath: "../worklow/dsl",
		loader: () => import("../worklow/dsl"),
	},
} as const satisfies { readonly [K in DataModuleKey]: DataManifestEntry<K> };

export type DataManifest = typeof dataManifest;

export type DataModuleLoader<K extends DataModuleKey = DataModuleKey> =
	DataModuleLoaders[K];

export type DataModuleModule<K extends DataModuleKey = DataModuleKey> =
	DataModuleModules[K];
