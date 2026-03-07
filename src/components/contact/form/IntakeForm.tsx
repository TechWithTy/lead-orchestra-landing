"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import Header from "@/components/common/Header";
import {
	getAttributionFieldsFromUrl,
	resolveUtmIcpFromUrlOrState,
} from "@/components/contact/form/attributionFields";
import {
	createFieldProps,
	renderFormField,
} from "@/components/contact/form/formFieldHelpers";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	type IntakeFormValues,
	intakeFormFields,
	intakeFormSchema,
} from "@/data/contact/intakeFormFields";
import type { FieldConfig } from "@/types/contact/formFields";
import {
	generateMetaEventId,
	trackIntakeFormSubmit,
} from "@/utils/seo/fbpixel";
import { HiddenAttributionFields } from "./HiddenAttributionFields";

export default function IntakeForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const form = useForm<IntakeFormValues>({
		resolver: zodResolver(intakeFormSchema),
		defaultValues: {},
	});

	const noWebsite = form.watch("noWebsite") === true;
	const sourceKnowledge = form.watch("sourceKnowledge");
	const currentCrm = form.watch("currentCrm");
	const leadVolume = form.watch("leadVolumePerMonth");
	const businessType = form.watch("businessType") ?? [];
	const icpCategory = form.watch("icpCategory") ?? "";
	const isB2C = useMemo(() => {
		const b2cSignals = ["b2c", "consumers", "dating"];
		const bt = Array.isArray(businessType)
			? businessType.join(" ").toLowerCase()
			: "";
		const icp = String(icpCategory).toLowerCase();
		return (
			b2cSignals.some((s) => bt.includes(s)) ||
			b2cSignals.some((s) => icp.includes(s))
		);
	}, [businessType, icpCategory]);

	const isRequiredField = useMemo(() => {
		const alwaysRequired = new Set<string>([
			"name",
			"companyName",
			"email",
			"phone",
			"leadOwner",
			"speed",
			"monthlyBudget",
			"paidPilot",
			"businessType",
			"icpCategory",
			"icpDescription",
			"leadVolumePerMonth",
			"avgDealAmount",
			"dealsPerMonth",
			"conversionRate",
			"currentCrm",
			"crmConnection",
			"validationExpectation",
			"sourceKnowledge",
			"painPoints",
			"interestedFeatures",
		]);

		return (fieldName: string) => {
			if (alwaysRequired.has(fieldName)) return true;
			if (fieldName === "website") return !noWebsite;
			if (fieldName === "highIntentSources") return sourceKnowledge === "known";
			if (fieldName === "currentLeadSources")
				return sourceKnowledge === "unknown";
			if (fieldName === "leadDeliveryDestination") return currentCrm === "None";
			if (fieldName === "leadOpsReady") return leadVolume === "2000+";
			if (fieldName === "acquisitionChannel") return isB2C;
			return false;
		};
	}, [currentCrm, isB2C, leadVolume, noWebsite, sourceKnowledge]);

	const visibleFields = useMemo(() => {
		return intakeFormFields.filter((field) => {
			// Hide website input if "noWebsite" is checked.
			if (field.name === "website") return !noWebsite;

			// Sources branching
			if (field.name === "highIntentSources")
				return sourceKnowledge === "known";
			if (field.name === "currentLeadSources")
				return sourceKnowledge === "unknown";

			// CRM none branching
			if (field.name === "leadDeliveryDestination")
				return currentCrm === "None";

			// Lead volume branching
			if (field.name === "leadOpsReady") return leadVolume === "2000+";

			// B2C branching
			if (field.name === "acquisitionChannel") return isB2C;

			// Keep everything else visible.
			return true;
		});
	}, [currentCrm, isB2C, leadVolume, noWebsite, sourceKnowledge]);

	const onSubmit = async (data: IntakeFormValues) => {
		setIsSubmitting(true);
		try {
			const metaEventId = generateMetaEventId();
			const attribution = getAttributionFieldsFromUrl(window.location.href);
			const utmIcp = resolveUtmIcpFromUrlOrState(
				window.location.href,
				data.icpCategory,
			);
			// * Submit to Notion API
			const response = await fetch("/api/contact/intake", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					...attribution,
					utm_icp: utmIcp,
					metaEventId,
					eventSourceUrl: window.location.href,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to submit form");
			}

			// * Fire Facebook Pixel Lead Event with form data
			trackIntakeFormSubmit({
				businessType: data.businessType,
				monthlyBudget: data.monthlyBudget,
				priority: Array.isArray(data.priorityLevel)
					? data.priorityLevel[0]
					: undefined,
				eventId: metaEventId,
			});
			router.push("/contact/thank-you?source=intake");
		} catch (err) {
			console.error("Submission failed:", err);
			toast.error("Submission failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="relative mx-auto max-w-3xl rounded-2xl border border-primary/40 bg-gradient-to-br from-white via-background to-primary-50 p-6 shadow-xl ring-1 ring-primary/10 transition-all sm:p-10 dark:bg-gradient-to-br dark:from-background dark:via-background-dark dark:to-primary/10">
			<div className="-z-10 absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-focus/10 opacity-60 blur-lg dark:from-primary/30 dark:to-focus/20" />
			<Header
				title="Lead Orchestra Intake"
				subtitle="Tell us about your business and the leads you need. We'll build your scraping and enrichment workflow."
				size="md"
				className="mb-10 text-center"
			/>

			<FormProvider {...form}>
				<Form {...form}>
					<form
						id="lo-intake-form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<HiddenAttributionFields />
						{/* Render Fields */}
						{visibleFields.map((field) => (
							<FormField
								key={field.name}
								control={form.control}
								name={field.name as keyof IntakeFormValues}
								render={({ field: formField }) => (
									<FormItem className="space-y-1">
										<FormLabel className="font-medium text-black text-sm dark:text-white/80">
											{field.label}
											{isRequiredField(field.name) ? (
												<span className="ml-1 text-destructive">*</span>
											) : null}
										</FormLabel>
										{field.description && (
											<FormDescription className="pb-2 text-muted-foreground text-sm">
												{(() => {
													const urlRegex = /(https?:\/\/[^\s]+)/g;
													const parts = field.description.split(urlRegex);
													return parts.map((part, index) => {
														if (part.match(urlRegex)) {
															return (
																<a
																	key={`${field.name}-${part}-${index}`}
																	href={part}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="break-all text-primary underline hover:opacity-80"
																>
																	{part}
																</a>
															);
														}
														return part;
													});
												})()}
											</FormDescription>
										)}
										<FormControl>
											{renderFormField(
												createFieldProps<FieldConfig>(field, formField),
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}

						<Button
							type="submit"
							disabled={isSubmitting}
							className="mt-6 w-full bg-gradient-to-r from-primary to-focus py-6 font-semibold text-lg shadow-lg transition-transform hover:scale-[1.01]"
						>
							{isSubmitting ? (
								<span className="flex items-center justify-center gap-2">
									<Loader2 className="h-5 w-5 animate-spin" /> Sending...
								</span>
							) : (
								"Submit Request"
							)}
						</Button>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
