import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPayloadClient } from "@/lib/get-payload";
import type { Media, Post } from "@/payload-types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Grand River Labs",
  description:
    "Notes on digital strategy, websites, automation, and running a focused digital department.",
};

function isMedia(value: Post["featuredImage"]): value is Media {
  return typeof value === "object" && value !== null && "url" in value;
}

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
                  return (
                    <li key={post.id}>
                      <article className="blog-card">
                        <Link className="blog-card__link" href={`/blog/${post.slug}`}>
                          {image?.url ? (
                            <div className="blog-card__media">
                              <Image
                                src={image.url}
                                alt={image.alt || post.title}
                                fill
                                sizes="(min-width: 900px) 360px, 100vw"
                              />
                            </div>
                          ) : null}
                          <div className="blog-card__body">
                            {date ? (
                              <time className="blog-card__date" dateTime={post.publishedAt ?? undefined}>
                                {date}
                              </time>
                            ) : null}
                            <h2 className="blog-card__title">{post.title}</h2>
                            {post.excerpt ? (
                              <p className="blog-card__excerpt">{post.excerpt}</p>
                            ) : null}
                            <span className="blog-card__more">Read post</span>
                          </div>
                        </Link>
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
