import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("renders with an accessible label", () => {
    renderToggle();

    expect(
      screen.getByRole("button", { name: /switch to (dark|light) mode/i }),
    ).toBeInTheDocument();
  });

  it("toggles its label between dark and light when clicked", async () => {
    const user = userEvent.setup();

    renderToggle();

    const toggle = screen.getByRole("button", {
      name: /switch to (dark|light) mode/i,
    });
    const initialLabel = toggle.getAttribute("aria-label");

    await user.click(toggle);

    const updatedLabel = toggle.getAttribute("aria-label");
    expect(updatedLabel).not.toBe(initialLabel);

    if (initialLabel === "Switch to dark mode") {
      expect(updatedLabel).toBe("Switch to light mode");
    } else {
      expect(updatedLabel).toBe("Switch to dark mode");
    }
  });

  it("responds to keyboard activation", async () => {
    const user = userEvent.setup();

    renderToggle();

    const toggle = screen.getByRole("button", {
      name: /switch to (dark|light) mode/i,
    });
    const initialLabel = toggle.getAttribute("aria-label");

    toggle.focus();
    await user.keyboard("{Enter}");

    expect(toggle.getAttribute("aria-label")).not.toBe(initialLabel);
  });
});
