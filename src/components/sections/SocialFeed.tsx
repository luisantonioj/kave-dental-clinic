import {
  SOCIAL_POST_RECORDS,
  type SocialPost,
} from "../../content/social-posts";
import { getApprovedSocialPosts } from "../../lib/social-posts";
import { SocialFeedClient } from "./SocialFeedClient";

export interface SocialFeedProps {
  records?: readonly SocialPost[];
}

export function SocialFeed({ records = SOCIAL_POST_RECORDS }: SocialFeedProps) {
  const posts = getApprovedSocialPosts(records);

  return (
    <section
      aria-labelledby="social-feed-heading"
      className="bg-surface px-gutter py-section text-text"
      data-testid="social-feed"
    >
      <div className="mx-auto w-full max-w-wide">
        <div className="grid gap-stack lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:items-end">
          <div>
            <h2
              className="font-display text-heading font-extrabold uppercase"
              id="social-feed-heading"
            >
              Latest from <span className="text-text-muted">Kave</span>
            </h2>
          </div>
        </div>

        <SocialFeedClient posts={posts} />
      </div>
    </section>
  );
}
