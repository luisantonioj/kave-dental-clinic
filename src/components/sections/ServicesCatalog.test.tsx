import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getAllServiceCategories } from "../../content/services";
import { ServicesCatalog } from "./ServicesCatalog";

const UNSUPPORTED_SERVICE_CLAIMS =
  /chip-proof|decades-long|perfect fit|48-hour|same-day|master ceramist|in-house lab|10\+|ready for perfection/i;

describe("ServicesCatalog", () => {
  it("renders all 6 categories and all 22 procedures", () => {
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
});
