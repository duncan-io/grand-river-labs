import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPayloadClient } from "@/lib/get-payload";
import { isMedia, mediaImageSrc } from "@/lib/media";

export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

async function getAuthor(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "authors",
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return docs[0] ?? null;
}

async function getAuthorPosts(authorId: number) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 24,
    sort: "-publishedAt",
    where: {
      and: [
        { author: { equals: authorId } },
        { _status: { equals: "published" } },
      ],
    },
  });

  return docs;
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    return { title: "Author not found | Grand River Labs" };
  }

  return {
    title: `${author.name} | Grand River Labs`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: Args) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) notFound();

  const photo = isMedia(author.photo) ? author.photo : null;
  const posts = await getAuthorPosts(author.id);

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <header className="section author-hero">
          <div className="shell author-profile">
            {photo?.url ? (
              <div className="author-profile__photo">
                <Image
                  src={mediaImageSrc(photo.url)}
                  alt={photo.alt || author.name}
                  width={photo.width ?? 240}
                  height={photo.height ?? 240}
                  sizes="120px"
                  priority
                />
              </div>
            ) : null}
            <div className="author-profile__copy">
              <p className="eyebrow">
                <Link href="/blog">Blog</Link>
              </p>
              <h1 className="section-heading author-profile__name">
                {author.name}
              </h1>
              <p className="author-profile__title">{author.title}</p>
              <p className="author-profile__bio">{author.bio}</p>
            </div>
          </div>
        </header>

        <section className="section blog-index" aria-label={`Posts by ${author.name}`}>
          <div className="shell">
            <h2 className="author-posts__heading">Posts by {author.name}</h2>
            {posts.length === 0 ? (
              <p className="blog-empty">No published posts yet.</p>
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
                        <Link
                          className="blog-card__link"
                          href={`/blog/${post.slug}`}
                        >
                          {image?.url ? (
                            <div className="blog-card__media">
                              <Image
                                src={mediaImageSrc(image.url)}
                                alt={image.alt || post.title}
                                fill
                                sizes="(min-width: 900px) 360px, 100vw"
                              />
                            </div>
                          ) : null}
                          <div className="blog-card__body">
                            {date ? (
                              <time
                                className="blog-card__date"
                                dateTime={post.publishedAt ?? undefined}
                              >
                                {date}
                              </time>
                            ) : null}
                            <h3 className="blog-card__title">{post.title}</h3>
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
