import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ContactThankYouPage from "../page";

vi.mock("../ThankYouTrackingClient", () => ({
	ThankYouTrackingClient: () => <div data-testid="thank-you-tracking-client" />,
}));

describe("Contact thank-you page (smoke)", () => {
	it("renders success messaging and CTA links", () => {
		render(<ContactThankYouPage />);

		expect(
			screen.getByRole("heading", { name: "Thank you for applying" }),
		).toBeInTheDocument();
		expect(screen.getByText(/we have your submission/i)).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute(
			"href",
			"/",
		);
		expect(
			screen.getByRole("link", { name: "Submit Another Response" }),
		).toHaveAttribute("href", "/contact");
	});
});
