import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { NAV_ITEMS } from "../../content/navigation";
import { SiteHeader } from "./SiteHeader";
import { ThemeProvider } from "./ThemeProvider";

function renderHeader() {
  return render(
    <ThemeProvider>
      <SiteHeader />
    </ThemeProvider>,
  );
}

describe("SiteHeader", () => {
  it("provides a first-focus skip link to the page main content", () => {
    renderHeader();

    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("links to every planned route from the primary navigation", () => {
    renderHeader();

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

  it("renders an accessible theme toggle button", () => {
    renderHeader();

    expect(
      screen.getAllByRole("button", {
        name: /switch to (dark|light) mode/i,
      }).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("moves focus into the mobile disclosure and restores it on Escape", async () => {
    const user = userEvent.setup();

    renderHeader();

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
