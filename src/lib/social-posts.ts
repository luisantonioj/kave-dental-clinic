import {
  SOCIAL_POST_RECORDS,
  type ApprovedSocialPost,
  type SocialContentKind,
  type SocialPlatform,
  type SocialPost,
} from "../content/social-posts";

export interface CuratedSocialPost {
  id: string;
  platform: SocialPlatform;
  kind: SocialContentKind;
  canonicalUrl: string;
  embedUrl: string;
  publishedAt: string;
  summary: string;
}

const INSTAGRAM_HOSTS = new Set(["instagram.com", "www.instagram.com"]);
const FACEBOOK_HOSTS = new Set([
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
]);

function normalizePath(pathname: string) {
  const withoutDuplicateSlashes = pathname.replace(/\/{2,}/g, "/");
  return withoutDuplicateSlashes.endsWith("/")
    ? withoutDuplicateSlashes
    : `${withoutDuplicateSlashes}/`;
}

function normalizeInstagramUrl(
  url: URL,
  kind: SocialContentKind,
): string | null {
  const match = url.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/);

  if (!match) {
    return null;
  }

  const pathKind = match[1];
  const kindMatches =
    (kind === "reel" && pathKind === "reel") ||
    (kind === "video" && pathKind === "tv") ||
    (kind === "post" && pathKind === "p");

  if (!kindMatches) {
    return null;
  }

  return `https://www.instagram.com/${pathKind}/${match[2]}/`;
}

function normalizeFacebookUrl(
  url: URL,
  kind: SocialContentKind,
): string | null {
  const path = normalizePath(url.pathname);

  if (kind === "reel" && /^\/reel\/[A-Za-z0-9._-]+\/$/.test(path)) {
    return `https://www.facebook.com${path}`;
  }

  if (
    kind === "video" &&
    (/\/videos\/[A-Za-z0-9._-]+\/$/.test(path) || /^\/watch\/$/.test(path))
  ) {
    if (path === "/watch/") {
      const videoId = url.searchParams.get("v");
      return videoId
        ? `https://www.facebook.com/watch/?v=${encodeURIComponent(videoId)}`
        : null;
    }

    return `https://www.facebook.com${path}`;
  }

  if (kind !== "post") {
    return null;
  }

  if (/\/posts\/[A-Za-z0-9._-]+\/$/.test(path)) {
    return `https://www.facebook.com${path}`;
  }

  if (path === "/permalink.php/" || path === "/story.php/") {
    const storyId = url.searchParams.get("story_fbid");
    const pageId = url.searchParams.get("id");

    return storyId && pageId
      ? `https://www.facebook.com${path.slice(0, -1)}?story_fbid=${encodeURIComponent(storyId)}&id=${encodeURIComponent(pageId)}`
      : null;
  }

  if (path === "/photo.php/") {
    const photoId = url.searchParams.get("fbid");
    return photoId
      ? `https://www.facebook.com/photo.php?fbid=${encodeURIComponent(photoId)}`
      : null;
  }

  return null;
}

export function normalizeSocialPostUrl(
  platform: SocialPlatform,
  kind: SocialContentKind,
  rawUrl: string,
): string | null {
  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" || url.username || url.password) {
    return null;
  }

  if (platform === "instagram") {
    return INSTAGRAM_HOSTS.has(url.hostname.toLowerCase())
      ? normalizeInstagramUrl(url, kind)
      : null;
  }

  return FACEBOOK_HOSTS.has(url.hostname.toLowerCase())
    ? normalizeFacebookUrl(url, kind)
    : null;
}

export function createSocialEmbedUrl(
  platform: SocialPlatform,
  kind: SocialContentKind,
  canonicalUrl: string,
  autoplay = false,
) {
  if (platform === "instagram") {
    return `${canonicalUrl}embed/`;
  }

  const plugin = kind === "post" ? "post.php" : "video.php";
  const query = new URLSearchParams({
    href: canonicalUrl,
    show_text: kind === "post" ? "true" : "false",
    width: "500",
  });

  if (autoplay) {
    query.set("autoplay", "true");
  }

  return `https://www.facebook.com/plugins/${plugin}?${query.toString()}`;
}

function isApprovedRecord(record: SocialPost): record is ApprovedSocialPost {
  return (
    record.status === "approved" &&
    record.consentReference.slice("consent:".length).trim().length > 0
  );
}

function toCuratedPost(record: ApprovedSocialPost): CuratedSocialPost | null {
  const canonicalUrl = normalizeSocialPostUrl(
    record.platform,
    record.kind,
    record.url,
  );
  const publishedTime = Date.parse(record.publishedAt);

  if (
    !canonicalUrl ||
    Number.isNaN(publishedTime) ||
    record.summary.trim().length === 0
  ) {
    return null;
  }

  return {
    id: record.id,
    platform: record.platform,
    kind: record.kind,
    canonicalUrl,
    embedUrl: createSocialEmbedUrl(record.platform, record.kind, canonicalUrl),
    publishedAt: new Date(publishedTime).toISOString(),
    summary: record.summary.trim(),
  };
}

export function getApprovedSocialPosts(
  records: readonly SocialPost[] = SOCIAL_POST_RECORDS,
): readonly CuratedSocialPost[] {
  const canonicalUrls = new Set<string>();
  const crossPostGroups = new Map<string, CuratedSocialPost>();
  const ungrouped: CuratedSocialPost[] = [];

  for (const record of records) {
    if (!isApprovedRecord(record)) {
      continue;
    }

    const curatedPost = toCuratedPost(record);

    if (!curatedPost || canonicalUrls.has(curatedPost.canonicalUrl)) {
      continue;
    }

    canonicalUrls.add(curatedPost.canonicalUrl);

    if (!record.crossPostGroup?.trim()) {
      ungrouped.push(curatedPost);
      continue;
    }

    const group = record.crossPostGroup.trim();
    const existing = crossPostGroups.get(group);

    if (!existing || curatedPost.platform === "instagram") {
      crossPostGroups.set(group, curatedPost);
    }
  }

  return [...ungrouped, ...crossPostGroups.values()].sort((left, right) => {
    const timeDifference =
      Date.parse(right.publishedAt) - Date.parse(left.publishedAt);
    return timeDifference || left.id.localeCompare(right.id);
  });
}
