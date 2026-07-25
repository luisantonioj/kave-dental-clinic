import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const GLOBAL_STYLES = readFileSync(
  resolve(process.cwd(), "src/styles/globals.css"),
  "utf8",
);

function readHexToken(name: string) {
  const match = GLOBAL_STYLES.match(
    new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`),
  );

  if (!match?.[1]) {
    throw new Error(`Missing hexadecimal color token: ${name}`);
  }

  return match[1];
}

function relativeLuminance(hex: string) {
  const channels = [1, 3, 5].map((index) =>
    Number.parseInt(hex.slice(index, index + 2), 16),
  );
  const [red, green, blue] = channels.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(first: string, second: string) {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

describe("global accessibility tokens", () => {
  it.each([
    ["text", "surface", 4.5],
    ["text-muted", "surface", 4.5],
    ["text-inverse", "surface-inverse", 4.5],
    ["text-inverse-muted", "surface-inverse-raised", 4.5],
    ["action-contrast", "action", 4.5],
    ["error-inverse", "surface-inverse-raised", 4.5],
    ["focus", "surface", 3],
    ["focus", "surface-inverse", 3],
    ["border-strong", "surface-inverse", 3],
  ])(
    "%s against %s meets its minimum contrast ratio",
    (foreground, background, minimumRatio) => {
      expect(
        contrastRatio(readHexToken(foreground), readHexToken(background)),
      ).toBeGreaterThanOrEqual(minimumRatio);
    },
  );

  it("removes non-essential motion when reduced motion is requested", () => {
    expect(GLOBAL_STYLES).toContain("@media (prefers-reduced-motion: reduce)");
    expect(GLOBAL_STYLES).toContain("--motion-duration-fast: 0.01ms");
    expect(GLOBAL_STYLES).toContain("animation-duration: 0.01ms !important");
    expect(GLOBAL_STYLES).toContain("transition-duration: 0.01ms !important");
    expect(GLOBAL_STYLES).toContain("scroll-behavior: auto !important");
  });
});
