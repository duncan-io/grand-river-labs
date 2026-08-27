import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isAuthor } from "@/lib/author";
import { getPayloadClient } from "@/lib/get-payload";
import { isMedia, mediaImageSrc } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Grand River Labs",
  description:
    "Notes on digital strategy, websites, automation, and running a focused digital department.",
};

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogIndexPage() {
  const payload = await getPayloadClient();
  const { docs: posts } = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 24,
    sort: "-publishedAt",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <section className="section blog-hero">
          <div className="shell blog-hero__content">
            <p className="eyebrow">From the desk</p>
            <h1 className="section-heading blog-hero__headline">The blog</h1>
            <p className="section-copy blog-hero__copy">
              Practical notes on websites, digital strategy, automation, and
              the work of running a focused digital department.
            </p>
          </div>
        </section>

        <section className="section blog-index" aria-label="Blog posts">
          <div className="shell">
            {posts.length === 0 ? (
              <p className="blog-empty">No posts yet. Check back soon.</p>
            ) : (
              <ul className="blog-grid">
                {posts.map((post) => {
                  const image = isMedia(post.featuredImage)
                    ? post.featuredImage
                    : null;
                  const date = formatDate(post.publishedAt);
                  const author = isAuthor(post.author) ? post.author : null;
                  return (
                    <li key={post.id}>
                      <article className="blog-card">
                        {image?.url ? (
                          <Link
                            className="blog-card__media-link"
                            href={`/blog/${post.slug}`}
                          >
                            <div className="blog-card__media">
                              <Image
                                src={mediaImageSrc(image.url)}
                                alt={image.alt || post.title}
                                fill
                                sizes="(min-width: 900px) 360px, 100vw"
                              />
                            </div>
                          </Link>
                        ) : null}
                        <div className="blog-card__body">
                          <div className="blog-card__meta">
                            {date ? (
                              <time
                                className="blog-card__date"
                                dateTime={post.publishedAt ?? undefined}
                              >
                                {date}
                              </time>
                            ) : null}
                            {author ? (
                              <Link
                                className="blog-card__author"
                                href={`/author/${author.slug}`}
                              >
                                {author.name}
                              </Link>
                            ) : null}
                          </div>
                          <Link
                            className="blog-card__link"
                            href={`/blog/${post.slug}`}
                          >
                            <h2 className="blog-card__title">{post.title}</h2>
                            {post.excerpt ? (
                              <p className="blog-card__excerpt">{post.excerpt}</p>
                            ) : null}
                            <span className="blog-card__more">Read post</span>
                          </Link>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
