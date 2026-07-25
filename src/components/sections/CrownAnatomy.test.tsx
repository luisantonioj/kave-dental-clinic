import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CROWN_ANATOMY_POINTS } from "../../content/services-page";
import { CrownAnatomy } from "./CrownAnatomy";

describe("CrownAnatomy", () => {
  it("keeps every discussion point understandable without imagery", () => {
    render(<CrownAnatomy />);

    for (const point of CROWN_ANATOMY_POINTS) {
      expect(
        screen.getByRole("heading", { level: 3, name: point.label }),
      ).toBeInTheDocument();
      expect(screen.getByText(point.description)).toBeInTheDocument();
    }
  });
});
