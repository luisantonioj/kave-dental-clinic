import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { SocialPost } from "../../content/social-posts";
import { SocialFeed } from "./SocialFeed";

const RECORDS = [
  {
    id: "approved-post",
    status: "approved",
    platform: "instagram",
    kind: "post",
    url: "https://www.instagram.com/p/APPROVED/",
    publishedAt: "2026-07-20T08:00:00+08:00",
    summary: "Approved clinic update",
    consentReference: "consent:social-approved",
  },
  {
    id: "pending-post",
    status: "pending-approval",
    platform: "facebook",
    kind: "post",
    url: "https://www.facebook.com/kave/posts/123/",
    publishedAt: "2026-07-21T08:00:00+08:00",
    summary: "Pending clinic update",
  },
] as const satisfies readonly SocialPost[];

describe("SocialFeed", () => {
  it("renders only approved curated records without exposing consent references", () => {
    const { container } = render(<SocialFeed records={RECORDS} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Approved clinic update" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Pending clinic update")).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent("consent:social-approved");
  });

  it("renders verified profile links when no post is approved", () => {
    render(<SocialFeed records={[]} />);

    expect(screen.getByTestId("social-feed-empty-state")).toHaveTextContent(
      "No social posts are approved for website display yet",
    );
    expect(
      screen.getByRole("link", { name: "Watch Reels on Instagram" }),
    ).toHaveAttribute(
      "href",
      "https://www.instagram.com/kavedentalclinic/reels/",
    );
    expect(
      screen.getByRole("link", { name: "Watch Reels on Facebook" }),
    ).toHaveAttribute(
      "href",
      "https://www.facebook.com/profile.php?id=61551864636049&sk=reels_tab",
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/kavedentalclinic/",
    );
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/profile.php?id=61551864636049",
    );
  });
});
