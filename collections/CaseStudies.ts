import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/slug";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt", "_status"],
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
        description: "Shown at the top of the study and on the index cards.",
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
      name: "clientLabel",
      type: "text",
      admin: {
        description:
          "Anonymous descriptor shown on the card, e.g. Midwest HVAC consolidator · 38 brands.",
      },
    },
    {
      name: "resultStat",
      type: "text",
      admin: {
        description: "The headline number, e.g. +78%.",
      },
    },
    {
      name: "resultLabel",
      type: "text",
      admin: {
        description: "What the number measures, e.g. Organic leads, year over year.",
      },
    },
    {
      name: "resultDetail",
      type: "text",
      admin: {
        description:
          "Supporting context, e.g. FY2024 to FY2025.",
      },
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
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "metaTitle",
      type: "text",
      admin: {
        description: "Overrides the title in search results and the browser tab.",
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
