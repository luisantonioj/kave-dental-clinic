import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { CuratedSocialPost } from "../../lib/social-posts";
import { SocialFeedClient } from "./SocialFeedClient";

function createPosts(count: number): readonly CuratedSocialPost[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `post-${index}`,
    platform: index % 2 === 0 ? "instagram" : "facebook",
    kind: index % 3 === 0 ? "reel" : "post",
    canonicalUrl:
      index % 2 === 0
        ? `https://www.instagram.com/reel/POST_${index}/`
        : `https://www.facebook.com/kave/posts/${index}/`,
    embedUrl:
      index % 2 === 0
        ? `https://www.instagram.com/reel/POST_${index}/embed/`
        : `https://www.facebook.com/plugins/post.php?href=post-${index}`,
    publishedAt: new Date(Date.UTC(2026, 6, 28 - index, 0, 0, 0)).toISOString(),
    summary: `Approved social item ${index + 1}`,
  })) as readonly CuratedSocialPost[];
}

describe("SocialFeedClient", () => {
  it("reveals curated posts 12 at a time", async () => {
    const user = userEvent.setup();
    render(<SocialFeedClient posts={createPosts(25)} />);

    expect(screen.getAllByRole("article")).toHaveLength(12);

    await user.click(screen.getByRole("button", { name: "Load more" }));
    expect(screen.getAllByRole("article")).toHaveLength(24);

    await user.click(screen.getByRole("button", { name: "Load more" }));
    expect(screen.getAllByRole("article")).toHaveLength(25);
    expect(
      screen.queryByRole("button", { name: "Load more" }),
    ).not.toBeInTheDocument();
  });

  it("renders embedded iframes directly on the screen for each visible post", () => {
    render(<SocialFeedClient posts={createPosts(2)} />);

    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(2);

    const firstIframe = within(articles[0]).getByTitle(
      "Instagram Reel: Approved social item 1",
    );
    expect(firstIframe).toHaveAttribute(
      "src",
      "https://www.instagram.com/reel/POST_0/embed/",
    );
    expect(firstIframe).toHaveAttribute("loading", "lazy");

    const secondIframe = within(articles[1]).getByTitle(
      "Facebook Post: Approved social item 2",
    );
    expect(secondIframe).toHaveAttribute(
      "src",
      "https://www.facebook.com/plugins/post.php?href=post-1",
    );
  });

  it("provides channel links to explore reels on Meta", () => {
    render(<SocialFeedClient posts={createPosts(2)} />);

    expect(
      screen.getByRole("link", { name: "Instagram Reels ↗" }),
    ).toHaveAttribute(
      "href",
      "https://www.instagram.com/kavedentalclinic/reels/",
    );

    expect(
      screen.getByRole("link", { name: "Facebook Reels ↗" }),
    ).toHaveAttribute(
      "href",
      "https://www.facebook.com/profile.php?id=61551864636049&sk=reels_tab",
    );
  });

  it("hides overlay text when user interacts with a video", async () => {
    const user = userEvent.setup();
    render(<SocialFeedClient posts={createPosts(2)} />);

    const facebookArticle = screen.getAllByRole("article")[1];
    expect(
      within(facebookArticle).getByTestId("social-overlay-post-1"),
    ).toBeInTheDocument();
    expect(
      within(facebookArticle).getByRole("heading", {
        name: "Approved social item 2",
      }),
    ).toBeInTheDocument();

    await user.click(facebookArticle);

    expect(
      within(facebookArticle).queryByTestId("social-overlay-post-1"),
    ).not.toBeInTheDocument();
    expect(
      within(facebookArticle).queryByRole("heading", {
        name: "Approved social item 2",
      }),
    ).not.toBeInTheDocument();
  });

  it("renders empty state with verified social and reels links when posts array is empty", () => {
    render(<SocialFeedClient posts={[]} />);

    expect(screen.getByTestId("social-feed-empty-state")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Watch Reels on Instagram" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Watch Reels on Facebook" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Instagram" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Facebook" })).toBeInTheDocument();
  });
});
