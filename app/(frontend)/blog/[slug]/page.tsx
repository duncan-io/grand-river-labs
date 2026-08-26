import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPayloadClient } from "@/lib/get-payload";
import type { Category, Media, Post } from "@/payload-types";

export const revalidate = 60;

type Args = {
  params: Promise<{ slug: string }>;
};

function isMedia(value: Post["featuredImage"]): value is Media {
  return typeof value === "object" && value !== null && "url" in value;
}

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
            <div className="shell blog-post__media">
              <Image
                src={image.url}
                alt={image.alt || post.title}
                width={image.width ?? 1600}
                height={image.height ?? 900}
                sizes="(min-width: 900px) 78rem, 100vw"
                priority
              />
            </div>
          ) : null}

          <div className="section blog-post__body">
            <div className="shell blog-content">
              {post.content ? (
                <RichText data={post.content as SerializedEditorState} />
              ) : null}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
