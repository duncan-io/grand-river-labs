import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "@/components/contact";
import { isAuthor } from "@/lib/author";
import { getPublishedPosts } from "@/lib/cms";
import { formatDate } from "@/lib/format";
import { isMedia, mediaImageSrc } from "@/lib/media";
import { PageShell } from "@/components/page-shell";
import "./blog.css";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog | Grand River Labs",
  description:
    "Notes on digital strategy, websites, automation, and running a focused digital department.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <PageShell>
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
      <ContactSection
        variant="cta"
        eyebrow="From the article"
        heading="Want to talk about this?"
        copy="If this raised a question about your site, your channels, or work still sitting with the team, send a note. We'll get back within one business day."
        messageLabel="What should we look at?"
        messagePlaceholder="The part of this that matches a problem you're in—or the decision you're trying to make."
      />
    </PageShell>
  );
}
