import { render, screen } from "@testing-library/react";
import type React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

type DataModuleSelector<T> = (value: unknown) => T;

const useDataModuleMock = vi.fn();

vi.mock("@/stores/useDataModuleStore", () => ({
	__esModule: true,
	useDataModule: (...args: unknown[]) => useDataModuleMock(...args),
}));

vi.mock("@/components/auth/AuthGuard", () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/contact/form/IntakeForm", () => ({
	__esModule: true,
	default: () => <div data-testid="intake-form" />,
}));

vi.mock("@/components/contact/form/ConversionForm", () => ({
	__esModule: true,
	default: () => <div data-testid="conversion-form" />,
}));

vi.mock("@/components/contact/form/ContactSteps", () => ({
	__esModule: true,
	ContactSteps: ({ steps }: { steps: unknown[] }) => (
		<div data-testid="contact-steps" data-count={steps.length} />
	),
}));

vi.mock("@/components/contact/schedule/ScheduleMeeting", () => ({
	__esModule: true,
	ScheduleMeeting: () => <div data-testid="schedule-meeting" />,
}));

vi.mock("@/components/contact/newsletter/Newsletter", () => ({
	__esModule: true,
	Newsletter: () => <div data-testid="contact-newsletter" />,
}));

const TrustedByMock = vi.fn(() => <div data-testid="trusted-by" />);

vi.mock("@/components/contact/utils/TrustedByScroller", () => ({
	__esModule: true,
	default: () => TrustedByMock(),
}));

vi.mock("@/components/home/Testimonials", () => ({
	__esModule: true,
	default: ({ testimonials }: { testimonials: unknown[] }) => (
		<div data-testid="testimonials" data-count={testimonials.length} />
	),
}));

vi.mock("next-auth/react", () => ({
	__esModule: true,
	useSession: () => ({ data: null }),
}));

const useSearchParamsMock = vi.fn(() => new URLSearchParams());
const useRouterMock = vi.fn(() => ({ push: vi.fn() }));
const usePathnameMock = vi.fn(() => "/contact");

vi.mock("next/navigation", () => ({
	__esModule: true,
	useSearchParams: () => useSearchParamsMock(),
	useRouter: () => useRouterMock(),
	usePathname: () => usePathnameMock(),
}));

const loadContactClient = async () =>
	(await import("../ContactClient")).default;

describe("ContactClient", () => {
	beforeEach(() => {
		useDataModuleMock.mockReset();
		TrustedByMock.mockClear();
	});

	it("renders loading fallbacks while contact data modules are idle", async () => {
		useDataModuleMock.mockImplementation(
			(key: string, selector: DataModuleSelector<unknown>) => {
				switch (key) {
					case "service/slug_data/trustedCompanies":
						return selector({
							status: "idle",
							data: undefined,
							error: undefined,
						});
					case "service/slug_data/testimonials":
						return selector({
							status: "idle",
							data: undefined,
							error: undefined,
						});
					case "service/slug_data/consultationSteps":
						return selector({
							status: "idle",
							data: undefined,
							error: undefined,
						});
					default:
						return selector({
							status: "ready",
							data: undefined,
							error: undefined,
						});
				}
			},
		);

		const ContactClient = await loadContactClient();

		render(<ContactClient />);

		expect(screen.getByText(/Loading trusted partners/i)).toBeInTheDocument();
		expect(screen.getByText(/Loading next steps/i)).toBeInTheDocument();
	});

	it("renders conversion form by default", async () => {
		useDataModuleMock.mockImplementation((_k, selector) =>
			selector({ status: "ready" }),
		);
		const ContactClient = await loadContactClient();
		render(<ContactClient />);
		expect(screen.getByTestId("conversion-form")).toBeInTheDocument();
		expect(screen.queryByTestId("intake-form")).not.toBeInTheDocument();
	});

	it("switches to intake form when activeTab=prequalification in URL", async () => {
		useSearchParamsMock.mockReturnValue(
			new URLSearchParams("tab=prequalification"),
		);
		useDataModuleMock.mockImplementation((_k, selector) =>
			selector({ status: "ready" }),
		);
		const ContactClient = await loadContactClient();
		render(<ContactClient />);
		expect(screen.getByTestId("intake-form")).toBeInTheDocument();
		expect(screen.queryByTestId("conversion-form")).not.toBeInTheDocument();
	});

	it("updates URL when tab is switched", async () => {
		const pushMock = vi.fn();
		useRouterMock.mockReturnValue({ push: pushMock });
		useSearchParamsMock.mockReturnValue(new URLSearchParams());
		useDataModuleMock.mockImplementation((_k, selector) =>
			selector({ status: "ready" }),
		);

		const ContactClient = await loadContactClient();
		render(<ContactClient />);

		const prequalificationTab = screen.getByRole("tab", {
			name: /Consultation Form/i,
		});
		import("@testing-library/react").then(({ fireEvent }) => {
			fireEvent.click(prequalificationTab);
			expect(pushMock).toHaveBeenCalledWith("/contact?tab=prequalification", {
				scroll: false,
			});
		});
	});
});
