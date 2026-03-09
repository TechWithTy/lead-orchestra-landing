"use client";

import { Button } from "@/components/ui/button";
import { trackMetaServerEvent } from "@/lib/analytics/meta-events-client";
import { event, generateMetaEventId } from "@/utils/seo/fbpixel";
import { motion } from "framer-motion";
import { Calendar, Info } from "lucide-react";
import * as React from "react";
// * For accessibility and animation

export function ScheduleMeeting() {
	const calendarLink = "https://calendar.notion.so/meet/cyberoni/em2w42l93";
	const [showBenefits, setShowBenefits] = React.useState(false);
	const handleScheduleClick = React.useCallback(() => {
		const eventId = generateMetaEventId();
		event(
			"Schedule",
			{
				content_name: "Consultation Booking",
			},
			{ eventID: eventId },
		);
		void trackMetaServerEvent({
			eventName: "Schedule",
			eventId,
			eventSourceUrl:
				typeof window !== "undefined" ? window.location.href : undefined,
		});
	}, []);

	return (
		<div className="mb-8 flex flex-col items-center rounded-xl border border-white/10 bg-background-dark/50 p-8 text-center shadow-xl backdrop-blur-sm">
			<div className="mb-4 flex flex-col items-center">
				<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
					<Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
				</div>
				<h2 className="font-bold text-2xl text-black dark:text-white">
					Schedule a Consultation
				</h2>
				<p className="text-black dark:text-white">
					Book a consultation to discuss your specific needs and see how we can
					help you scale your lead generation.
				</p>
			</div>
			{/* * Collapsible: What to expect on your tour */}
			<button
				type="button"
				aria-expanded={showBenefits}
				aria-controls="tour-benefits"
				className="mb-2 flex items-center gap-2 text-primary text-xs underline hover:text-focus focus:outline-none"
				onClick={() => setShowBenefits((v) => !v)}
			>
				<Info className="h-4 w-4" aria-hidden="true" />
				What to expect from the consultation
			</button>
			{showBenefits && (
				<ul
					id="tour-benefits"
					className="mb-4 ml-1 list-disc space-y-1 text-left text-muted-foreground text-xs"
					aria-live="polite"
				>
					<li>Deep dive into your current lead generation process</li>
					<li>Identify bottlenecks and automation opportunities</li>
					<li>Live demo of relevant scraping and enrichment workflows</li>
					<li>Custom strategy plan for your niche</li>
				</ul>
			)}

			{/* * Animated CTA Button */}
			<motion.div
				initial={{ scale: 1 }}
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.97 }}
				className="w-full"
			>
				<Button
					asChild
					className="mt-4 w-full bg-gradient-to-r from-primary to-focus transition-opacity hover:opacity-90 focus:ring-2 focus:ring-primary focus:ring-offset-2"
					aria-label="Book a consultation"
					data-testid="schedule-meeting-cta"
				>
					<a
						href={calendarLink}
						target="_blank"
						rel="noopener noreferrer"
						onClick={handleScheduleClick}
					>
						Book a Consultation
					</a>
				</Button>
			</motion.div>
		</div>
	);
}
