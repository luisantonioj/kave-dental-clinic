import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, TextLink } from "./Button";

describe("Button", () => {
  it("is keyboard focusable and invokes its action", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Continue</Button>);

    await user.tab();
    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("prevents interaction and retains disabled styling", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Unavailable
      </Button>,
    );

    const button = screen.getByRole("button", {
      name: "Unavailable",
    });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    );

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders a keyboard-focusable text-link treatment", async () => {
    const user = userEvent.setup();

    render(<TextLink href="/services">View services</TextLink>);

    await user.tab();
    expect(screen.getByRole("link", { name: "View services" })).toHaveFocus();
  });
});
