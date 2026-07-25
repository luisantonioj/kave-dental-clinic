import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { NAV_ITEMS } from "../../content/navigation";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("links to every planned route from the primary navigation", () => {
    render(<SiteHeader />);

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });

    for (const item of NAV_ITEMS) {
      expect(
        within(navigation).getByRole("link", {
          name: item.label,
        }),
      ).toHaveAttribute("href", item.href);
    }
  });

  it("moves focus into the mobile disclosure and restores it on Escape", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    const trigger = screen.getByRole("button", {
      name: "Menu",
    });
    await user.click(trigger);

    const mobileNavigation = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      within(mobileNavigation).getByRole("link", {
        name: NAV_ITEMS[0].label,
      }),
    ).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", {
        name: "Mobile navigation",
      }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
