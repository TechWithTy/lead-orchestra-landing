"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
	type QuickApplyValues,
	quickApplyFields,
	quickApplySchema,
} from "@/data/contact/conversionFormFields";
import { trackMetaServerEvent } from "@/lib/analytics/meta-events-client";
import type { FieldConfig } from "@/types/contact/formFields";
import {
	generateMetaEventId,
	trackIntakeFormStart,
	trackIntakeFormSubmit,
} from "@/utils/seo/fbpixel";
import { HiddenAttributionFields } from "./HiddenAttributionFields";

export default function ConversionForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [hasStarted, setHasStarted] = useState(false);
	const router = useRouter();

	const form = useForm<QuickApplyValues>({
		resolver: zodResolver(quickApplySchema),
		defaultValues: {
			name: "",
			email: "",
			website: "",
			businessType: [],
			monthlyBudget: "",
			icpCategory: "",
			speed: "",
		},
		mode: "onBlur",
	});

	const { handleSubmit } = form;

	const handleFormInteraction = () => {
		if (!hasStarted) {
			setHasStarted(true);
			// Track "StartApplication" (CAPI + Pixel)
			// Client-side custom event
			trackIntakeFormStart();
			// Server-side CAPI event
			void trackMetaServerEvent({
				eventName: "StartApplication",
				eventId: generateMetaEventId(),
				eventSourceUrl: window.location.href,
			});
		}
	};

	const onSubmit = async (data: QuickApplyValues) => {
		setIsSubmitting(true);
		try {
			const metaEventId = generateMetaEventId();
			const attribution = getAttributionFieldsFromUrl(window.location.href);
			const utmIcp = resolveUtmIcpFromUrlOrState(
				window.location.href,
				data.icpCategory,
			);

			// Submit to intake API
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
					// Flag as conversion/quick-apply
					isQuickApply: true,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to submit form");
			}

			// Track event
			trackIntakeFormSubmit({
				businessType: data.businessType,
				monthlyBudget: data.monthlyBudget,
				eventId: metaEventId,
			});

			router.push("/contact/thank-you?source=conversion");
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
				title="Quick Application"
				subtitle="Grab your spot in the queue with the basics. Takes less than 60 seconds."
				size="sm"
				className="mb-8 text-center"
			/>

			<FormProvider {...form}>
				<Form {...form}>
					<form
						id="lo-intake-form"
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
						onFocusCapture={handleFormInteraction}
					>
						<HiddenAttributionFields />
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{quickApplyFields.map((field) => (
								<FormField
									key={field.name}
									control={form.control}
									name={field.name as keyof QuickApplyValues}
									render={({ field: formField }) => (
										<FormItem
											className={
												field.name === "name" || field.name === "email"
													? "md:col-span-1"
													: "md:col-span-2"
											}
										>
											<FormLabel className="font-medium text-black text-sm dark:text-white/80">
												{field.label}
												<span className="ml-1 text-destructive">*</span>
											</FormLabel>
											{field.description && (
												<FormDescription className="line-clamp-1 pb-1 text-muted-foreground text-xs leading-relaxed transition-all hover:line-clamp-none">
													{field.description}
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
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-gradient-to-r from-primary to-focus py-6 font-semibold shadow-lg transition-transform hover:scale-[1.01]"
						>
							{isSubmitting ? (
								<span className="flex items-center justify-center gap-2">
									<Loader2 className="h-5 w-5 animate-spin" /> Submitting...
								</span>
							) : (
								<span className="flex items-center justify-center gap-2">
									Submit Application <CheckCircle2 className="h-4 w-4" />
								</span>
							)}
						</Button>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
