import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/slug";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "slug", "publishedAt", "_status"],
    group: "Content",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: {
          equals: "published",
        },
      };
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Hero image",
      filterOptions: {
        mimeType: {
          contains: "image",
        },
      },
      admin: {
        description: "Shown at the top of the post and on the blog index cards.",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "metaTitle",
      type: "text",
      admin: {
        description: "Overrides the post title in search results and the browser tab.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (!data.slug && typeof data.title === "string") {
          data.slug = slugify(data.title);
        }
        return data;
      },
    ],
    beforeChange: [
      ({ data, originalDoc }) => {
        if (!data) return data;
        if (
          data._status === "published" &&
          !data.publishedAt &&
          !originalDoc?.publishedAt
        ) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};
