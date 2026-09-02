"use client";

import { useEffect, useRef, useState } from "react";

import { CLINIC_DETAILS } from "../../content/clinic";
import type { CuratedSocialPost } from "../../lib/social-posts";
import { Button } from "../ui/Button";

const POSTS_PER_PAGE = 12;

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeZone: "Asia/Manila",
  }).format(new Date(value));
}

function platformLabel(platform: CuratedSocialPost["platform"]) {
  return platform === "instagram" ? "Instagram" : "Facebook";
}

function contentKindLabel(kind: CuratedSocialPost["kind"]) {
  if (kind === "reel") {
    return "Reel";
  }

  if (kind === "video") {
    return "Video";
  }

  return "Post";
}

interface SocialPostCardProps {
  post: CuratedSocialPost;
}

function SocialPostCard({ post }: SocialPostCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleWindowBlur() {
      if (document.activeElement === iframeRef.current) {
        setIsPlaying(true);
      }
    }

    window.addEventListener("blur", handleWindowBlur);
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  return (
    <article
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-image border border-border bg-black shadow-md"
      onClick={() => setIsPlaying(true)}
    >
      <iframe
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0"
        loading="lazy"
        ref={iframeRef}
        referrerPolicy="strict-origin-when-cross-origin"
        src={post.embedUrl}
        title={`${platformLabel(post.platform)} ${contentKindLabel(post.kind)}: ${post.summary}`}
      />

      {!isPlaying ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-inline bg-gradient-to-t from-black/90 via-black/50 to-transparent p-card-x pb-card-y pt-stack text-white transition-opacity duration-300"
          data-testid={`social-overlay-${post.id}`}
        >
          <h3 className="line-clamp-3 font-display text-card font-bold leading-snug text-white drop-shadow-md">
            {post.summary}
          </h3>
          <time
            className="text-body-sm text-white/80"
            dateTime={post.publishedAt}
          >
            {formatPublishedDate(post.publishedAt)}
          </time>
        </div>
      ) : null}
    </article>
  );
}

export interface SocialFeedClientProps {
  posts: readonly CuratedSocialPost[];
}

export function SocialFeedClient({ posts }: SocialFeedClientProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const visiblePosts = posts.slice(0, visibleCount);

  if (posts.length === 0) {
    return (
      <div
        className="mt-card-y border-y border-border py-card-y"
        data-testid="social-feed-empty-state"
      >
        <p className="max-w-reading text-lead">
          No social posts are approved for website display yet.
        </p>
        <p className="mt-cluster max-w-reading text-body text-text-muted">
          Watch our latest smile transformations, treatments, and clinic updates
          directly on our official social channels.
        </p>
        <div className="mt-stack flex flex-wrap items-center gap-cluster">
          {CLINIC_DETAILS.instagramReelsUrl ? (
            <a
              className="inline-flex min-h-control items-center justify-center rounded-button bg-action px-button-x py-button-y text-button font-bold text-action-contrast transition-colors hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              href={CLINIC_DETAILS.instagramReelsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Watch Reels on Instagram
            </a>
          ) : null}
          {CLINIC_DETAILS.facebookReelsUrl ? (
            <a
              className="inline-flex min-h-control items-center justify-center rounded-button border border-border bg-transparent px-button-x py-button-y text-button font-bold text-text transition-colors hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              href={CLINIC_DETAILS.facebookReelsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Watch Reels on Facebook
            </a>
          ) : null}
        </div>
        <p className="mt-stack text-body text-text-muted">
          Visit Kave Dental Clinic on{" "}
          <a
            className="inline-flex min-h-control items-center underline underline-offset-4"
            href={CLINIC_DETAILS.instagramUrl}
            rel="noreferrer"
            target="_blank"
          >
            Instagram
          </a>{" "}
          or{" "}
          <a
            className="inline-flex min-h-control items-center underline underline-offset-4"
            href={CLINIC_DETAILS.facebookUrl}
            rel="noreferrer"
            target="_blank"
          >
            Facebook
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <ul
        aria-label={`${posts.length} approved social ${posts.length === 1 ? "post" : "posts"}`}
        className="mt-card-y grid gap-cluster md:grid-cols-2 lg:grid-cols-3"
      >
        {visiblePosts.map((post) => (
          <li key={post.id}>
            <SocialPostCard post={post} />
          </li>
        ))}
      </ul>

      <div className="mt-card-y flex flex-wrap items-center justify-between gap-cluster border-t border-border pt-card-y">
        <p className="text-body text-text-muted">
          Explore more patient reels and clinic transformations on our official
          channels:
        </p>
        <div className="flex flex-wrap items-center gap-inline">
          {CLINIC_DETAILS.instagramReelsUrl ? (
            <a
              className="inline-flex min-h-control items-center text-label font-bold uppercase tracking-label underline underline-offset-4"
              href={CLINIC_DETAILS.instagramReelsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Instagram Reels ↗
            </a>
          ) : null}
          {CLINIC_DETAILS.facebookReelsUrl ? (
            <a
              className="inline-flex min-h-control items-center text-label font-bold uppercase tracking-label underline underline-offset-4"
              href={CLINIC_DETAILS.facebookReelsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Facebook Reels ↗
            </a>
          ) : null}
        </div>
      </div>

      {visibleCount < posts.length ? (
        <div className="mt-card-y flex justify-center">
          <Button
            onClick={() =>
              setVisibleCount((current) => current + POSTS_PER_PAGE)
            }
            variant="secondary"
          >
            Load more
          </Button>
        </div>
      ) : null}
    </>
  );
}
