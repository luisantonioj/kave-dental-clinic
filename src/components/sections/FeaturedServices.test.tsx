import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ApprovedService } from "../../content/services";
import { FeaturedServices } from "./FeaturedServices";

const TEST_SERVICES = [
  "Service one",
  "Service two",
  "Service three",
  "Service four",
].map(
  (name, index) =>
    ({
      id: `service-${index + 1}`,
      name,
      category: "aesthetic",
      summary: "Test-only approved service summary.",
      detailRoute: "/services",
      status: "approved",
      image: {
        src: `/approved/service-${index + 1}.webp`,
        alt: `Test-only image for ${name}`,
        width: 800,
        height: 600,
      },
    }) satisfies ApprovedService,
);

describe("FeaturedServices", () => {
  it("renders approved service cards in the responsive grid", () => {
    render(<FeaturedServices services={TEST_SERVICES} />);

    const list = screen.getByRole("list");
    expect(list).toHaveClass("grid-cols-1", "sm:grid-cols-2", "xl:grid-cols-4");
    expect(within(list).getAllByRole("listitem")).toHaveLength(4);

    for (const service of TEST_SERVICES) {
      expect(
        screen.getByRole("heading", { name: service.name }),
      ).toBeInTheDocument();
    }
    for (const link of screen.getAllByRole("link", {
      name: "Learn more",
    })) {
      expect(link).toHaveAttribute("href", "/services");
    }
  });

  it("renders a coherent state when no service media is approved", () => {
    render(<FeaturedServices services={[]} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "awaiting clinic-approved images and wording",
    );
    expect(
      screen.getByRole("link", { name: "Visit services" }),
    ).toHaveAttribute("href", "/services");
  });
});
