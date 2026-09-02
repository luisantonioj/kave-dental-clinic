import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { getAllServiceCategories } from "../../content/services";
import { ServicesCatalog } from "./ServicesCatalog";

const UNSUPPORTED_SERVICE_CLAIMS =
  /chip-proof|decades-long|perfect fit|48-hour|same-day|master ceramist|in-house lab|10\+|ready for perfection/i;

describe("ServicesCatalog", () => {
  it("renders all 6 categories and all 24 procedures by default", () => {
    const { container } = render(<ServicesCatalog />);

    const categories = getAllServiceCategories();
    expect(categories).toHaveLength(6);

    let totalProcedures = 0;
    for (const category of categories) {
      expect(
        screen.getByRole("heading", { name: category.name }),
      ).toBeInTheDocument();

      for (const proc of category.procedures) {
        totalProcedures += 1;
        expect(
          screen.getByRole("heading", { name: proc.name }),
        ).toBeInTheDocument();
      }
    }

    expect(totalProcedures).toBe(24);

    for (const category of categories) {
      for (const proc of category.procedures) {
        expect(
          screen.getByRole("link", {
            name: `Book consultation for ${proc.name}`,
          }),
        ).toHaveAttribute("href", "/booking");
      }
    }

    expect(container).not.toHaveTextContent(UNSUPPORTED_SERVICE_CLAIMS);
  });

  it("filters procedures dynamically based on search query", async () => {
    const user = userEvent.setup();
    render(<ServicesCatalog />);

    const searchInput = screen.getByRole("searchbox", {
      name: "Search Procedures & Treatments",
    });

    await user.type(searchInput, "zirconia");

    // Zirconia Veneers and Zirconia Crowns should be present
    expect(
      screen.getByRole("heading", { name: "Zirconia Veneers" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Zirconia Crowns" }),
    ).toBeInTheDocument();

    // Dental Check-up or Wisdom Tooth should not be displayed
    expect(
      screen.queryByRole("heading", { name: "Dental Check-up" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Wisdom Tooth Extraction" }),
    ).not.toBeInTheDocument();
  });

  it("filters procedures when clicking a category pill", async () => {
    const user = userEvent.setup();
    render(<ServicesCatalog />);

    const cosmeticPill = screen.getByRole("tab", {
      name: /Cosmetic Dentistry/i,
    });
    await user.click(cosmeticPill);

    expect(
      screen.getByRole("heading", { name: "Cosmetic Dentistry" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Zirconia Veneers" }),
    ).toBeInTheDocument();

    // Other categories should be hidden
    expect(
      screen.queryByRole("heading", { name: "General Dentistry" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Orthodontics" }),
    ).not.toBeInTheDocument();

    // Clicking All Services restores all categories
    const allServicesPill = screen.getByRole("tab", {
      name: /All Services/i,
    });
    await user.click(allServicesPill);

    expect(
      screen.getByRole("heading", { name: "General Dentistry" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Orthodontics" }),
    ).toBeInTheDocument();
  });

  it("clears search input with clear button and with Escape key", async () => {
    const user = userEvent.setup();
    render(<ServicesCatalog />);

    const searchInput = screen.getByRole("searchbox", {
      name: "Search Procedures & Treatments",
    });

    await user.type(searchInput, "implants");
    expect(searchInput).toHaveValue("implants");

    const clearButton = screen.getByRole("button", {
      name: "Clear search query",
    });
    await user.click(clearButton);
    expect(searchInput).toHaveValue("");

    // Test Escape key
    await user.type(searchInput, "braces");
    expect(searchInput).toHaveValue("braces");
    fireEvent.keyDown(searchInput, { key: "Escape" });
    expect(searchInput).toHaveValue("");
  });

  it("shows empty state on unmatched query and allows resetting search", async () => {
    const user = userEvent.setup();
    render(<ServicesCatalog />);

    const searchInput = screen.getByRole("searchbox", {
      name: "Search Procedures & Treatments",
    });

    await user.type(searchInput, "unknownxyzprocedure");

    expect(
      screen.getByRole("heading", { name: "No matching procedures found" }),
    ).toBeInTheDocument();

    const resetButton = screen.getByRole("button", {
      name: "Reset Search & Show All",
    });
    await user.click(resetButton);

    expect(searchInput).toHaveValue("");
    expect(
      screen.getByRole("heading", { name: "General Dentistry" }),
    ).toBeInTheDocument();
  });
});
