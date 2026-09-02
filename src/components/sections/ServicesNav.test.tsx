import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getAllServiceCategories } from "../../content/services";
import { ServicesNav } from "./ServicesNav";

describe("ServicesNav", () => {
  it("renders navigation links for all 6 categories", () => {
    render(<ServicesNav />);

    const nav = screen.getByRole("navigation", {
      name: "Services categories",
    });
    expect(nav).toBeInTheDocument();

    const categories = getAllServiceCategories();
    for (const category of categories) {
      const link = screen.getByRole("link", {
        name: new RegExp(`${category.number}.*${category.name}`),
      });
      expect(link).toHaveAttribute("href", `#${category.anchorId}`);
    }
  });
});
