import { describe, expect, it } from "vitest";

import type { SocialPost } from "../content/social-posts";
import {
  createSocialEmbedUrl,
  getApprovedSocialPosts,
  normalizeSocialPostUrl,
} from "./social-posts";

const RECORDS = [
  {
    id: "facebook-newer",
    status: "approved",
    platform: "facebook",
    kind: "post",
    url: "https://m.facebook.com/kavedental/posts/222/?utm_source=test",
    publishedAt: "2026-07-20T08:00:00+08:00",
    summary: "A newer approved Facebook post",
    consentReference: "consent:facebook-newer",
  },
  {
    id: "instagram-cross-post",
    status: "approved",
    platform: "instagram",
    kind: "reel",
    url: "https://instagram.com/reel/ABC_123/?igsh=test",
    publishedAt: "2026-07-19T08:00:00+08:00",
    summary: "The preferred Instagram cross-post",
    crossPostGroup: "clinic-update",
    consentReference: "consent:instagram-cross-post",
  },
  {
    id: "facebook-cross-post",
    status: "approved",
    platform: "facebook",
    kind: "reel",
    url: "https://www.facebook.com/reel/987654/",
    publishedAt: "2026-07-19T08:01:00+08:00",
    summary: "The duplicate Facebook cross-post",
    crossPostGroup: "clinic-update",
    consentReference: "consent:facebook-cross-post",
  },
  {
    id: "pending",
    status: "pending-approval",
    platform: "instagram",
    kind: "post",
    url: "https://www.instagram.com/p/PENDING/",
    publishedAt: "2026-07-21T08:00:00+08:00",
    summary: "Pending content",
  },
  {
    id: "invalid-consent",
    status: "approved",
    platform: "instagram",
    kind: "post",
    url: "https://www.instagram.com/p/INVALID_CONSENT/",
    publishedAt: "2026-07-21T08:00:00+08:00",
    summary: "Missing consent",
    consentReference: "consent:   ",
  },
  {
    id: "invalid-domain",
    status: "approved",
    platform: "instagram",
    kind: "post",
    url: "https://example.com/p/NOT_INSTAGRAM/",
    publishedAt: "2026-07-21T08:00:00+08:00",
    summary: "Invalid host",
    consentReference: "consent:invalid-host",
  },
] as const satisfies readonly SocialPost[];

describe("curated social post selection", () => {
  it("filters unsafe records, sorts newest first, and prefers Instagram cross-posts", () => {
    const posts = getApprovedSocialPosts(RECORDS);

    expect(posts.map((post) => post.id)).toEqual([
      "facebook-newer",
      "instagram-cross-post",
    ]);
    expect(posts[0]?.canonicalUrl).toBe(
      "https://www.facebook.com/kavedental/posts/222/",
    );
    expect(posts[1]?.canonicalUrl).toBe(
      "https://www.instagram.com/reel/ABC_123/",
    );
  });

  it("removes exact canonical URL duplicates", () => {
    const duplicateRecords = [
      RECORDS[0],
      {
        ...RECORDS[0],
        id: "duplicate",
        url: "https://www.facebook.com/kavedental/posts/222/",
      },
    ] satisfies readonly SocialPost[];

    expect(getApprovedSocialPosts(duplicateRecords)).toHaveLength(1);
  });

  it("rejects invalid dates and empty summaries", () => {
    const invalidRecords = [
      {
        ...RECORDS[0],
        id: "invalid-date",
        publishedAt: "not-a-date",
      },
      {
        ...RECORDS[0],
        id: "empty-summary",
        summary: " ",
      },
    ] satisfies readonly SocialPost[];

    expect(getApprovedSocialPosts(invalidRecords)).toEqual([]);
  });
});

describe("social URL handling", () => {
  it("normalizes supported Instagram URLs and removes tracking data", () => {
    expect(
      normalizeSocialPostUrl(
        "instagram",
        "reel",
        "https://instagram.com/reel/ABC_123/?igsh=tracking",
      ),
    ).toBe("https://www.instagram.com/reel/ABC_123/");
  });

  it("normalizes supported Facebook post and watch URLs", () => {
    expect(
      normalizeSocialPostUrl(
        "facebook",
        "post",
        "https://m.facebook.com/kave/posts/123?utm_source=test",
      ),
    ).toBe("https://www.facebook.com/kave/posts/123/");
    expect(
      normalizeSocialPostUrl(
        "facebook",
        "video",
        "https://www.facebook.com/watch/?v=456&utm_source=test",
      ),
    ).toBe("https://www.facebook.com/watch/?v=456");
  });

  it("rejects profile, HTTP, credential-bearing, mismatched, and unrelated URLs", () => {
    expect(
      normalizeSocialPostUrl(
        "instagram",
        "post",
        "https://www.instagram.com/kavedentalclinic/",
      ),
    ).toBeNull();
    expect(
      normalizeSocialPostUrl(
        "instagram",
        "reel",
        "http://www.instagram.com/reel/ABC/",
      ),
    ).toBeNull();
    expect(
      normalizeSocialPostUrl(
        "instagram",
        "post",
        "https://user:password@www.instagram.com/p/ABC/",
      ),
    ).toBeNull();
    expect(
      normalizeSocialPostUrl(
        "instagram",
        "post",
        "https://www.instagram.com/reel/ABC/",
      ),
    ).toBeNull();
    expect(
      normalizeSocialPostUrl(
        "facebook",
        "post",
        "https://example.com/kave/posts/123/",
      ),
    ).toBeNull();
  });

  it("creates only official Meta embed URLs", () => {
    expect(
      createSocialEmbedUrl(
        "instagram",
        "post",
        "https://www.instagram.com/p/ABC/",
      ),
    ).toBe("https://www.instagram.com/p/ABC/embed/");

    const facebookEmbed = new URL(
      createSocialEmbedUrl(
        "facebook",
        "video",
        "https://www.facebook.com/kave/videos/123/",
      ),
    );
    expect(facebookEmbed.origin).toBe("https://www.facebook.com");
    expect(facebookEmbed.pathname).toBe("/plugins/video.php");
    expect(facebookEmbed.searchParams.get("href")).toBe(
      "https://www.facebook.com/kave/videos/123/",
    );

    const autoplayEmbed = new URL(
      createSocialEmbedUrl(
        "facebook",
        "reel",
        "https://www.facebook.com/reel/123/",
        true,
      ),
    );
    expect(autoplayEmbed.searchParams.get("autoplay")).toBe("true");
  });
});
