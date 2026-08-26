import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isAuthor, truncateBio } from "@/lib/author";
import { getPayloadClient } from "@/lib/get-payload";
import { isMedia, mediaImageSrc } from "@/lib/media";
import type { Category } from "@/payload-types";

export const revalidate = 60;

type Args = {
  params: Promise<{ slug: string }>;
};

function isCategory(value: number | Category): value is Category {
  return typeof value === "object" && value !== null && "title" in value;
}

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

async function getPublishedPost(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    depth: 2,
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: "published" } },
      ],
    },
  });

  return docs[0] ?? null;
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return { title: "Post not found | Grand River Labs" };
  }

  return {
    title: `${post.metaTitle || post.title} | Grand River Labs`,
    description: post.metaDescription || post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: Args) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) notFound();

  const image = isMedia(post.featuredImage) ? post.featuredImage : null;
  const date = formatDate(post.publishedAt);
  const categories = (post.categories ?? []).filter(isCategory);
  const author = isAuthor(post.author) ? post.author : null;
  const authorPhoto = author && isMedia(author.photo) ? author.photo : null;

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <article>
          <header className="section blog-hero">
            <div className="shell blog-post__header">
              <p className="eyebrow">
                <Link href="/blog">Blog</Link>
              </p>
              <h1 className="section-heading blog-post__headline">{post.title}</h1>
              <div className="blog-post__meta">
                {author ? (
                  <span>
                    By{" "}
                    <Link href={`/author/${author.slug}`}>{author.name}</Link>
                  </span>
                ) : null}
                {date ? (
                  <time dateTime={post.publishedAt ?? undefined}>{date}</time>
                ) : null}
                {categories.length > 0 ? (
                  <span>
                    {categories.map((category) => category.title).join(", ")}
                  </span>
                ) : null}
              </div>
            </div>
          </header>

          {image?.url ? (
            <div className="shell">
              <div className="blog-post__media">
                <Image
                  src={mediaImageSrc(image.url)}
                  alt={image.alt || post.title}
                  width={image.width ?? 1600}
                  height={image.height ?? 900}
                  sizes="(min-width: 900px) 48rem, 100vw"
                  priority
                />
              </div>
            </div>
          ) : null}

          <div className="section blog-post__body">
            <div className="shell blog-content">
              {post.content ? (
                <RichText data={post.content as SerializedEditorState} />
              ) : null}
            </div>

            {author ? (
              <div className="shell">
                <aside className="author-card">
                  {authorPhoto?.url ? (
                    <Link
                      className="author-card__photo"
                      href={`/author/${author.slug}`}
                    >
                      <Image
                        src={mediaImageSrc(authorPhoto.url)}
                        alt={authorPhoto.alt || author.name}
                        width={authorPhoto.width ?? 96}
                        height={authorPhoto.height ?? 96}
                        sizes="72px"
                      />
                    </Link>
                  ) : null}
                  <div className="author-card__copy">
                    <p className="author-card__name">
                      <Link href={`/author/${author.slug}`}>{author.name}</Link>
                    </p>
                    <p className="author-card__title">{author.title}</p>
                    <p className="author-card__bio">{truncateBio(author.bio)}</p>
                    <Link
                      className="author-card__more"
                      href={`/author/${author.slug}`}
                    >
                      More from {author.name}
                    </Link>
                  </div>
                </aside>
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
