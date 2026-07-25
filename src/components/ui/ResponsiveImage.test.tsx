import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResponsiveImage } from "./ResponsiveImage";

describe("ResponsiveImage", () => {
  it("reserves intrinsic dimensions and declares responsive sizes", () => {
    render(
      <ResponsiveImage
        image={{
          src: "/approved/example.webp",
          alt: "Approved clinic interior",
          width: 1200,
          height: 800,
        }}
        sizes="(min-width: 768px) 50vw, 100vw"
      />,
    );

    const image = screen.getByRole("img", {
      name: "Approved clinic interior",
    });

    expect(image).toHaveAttribute("width", "1200");
    expect(image).toHaveAttribute("height", "800");
    expect(image).toHaveAttribute("sizes", "(min-width: 768px) 50vw, 100vw");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).not.toHaveAttribute("fetchpriority", "high");
  });
});
