import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/slug";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "slug"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "Job title, e.g. Founder.",
      },
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: {
          contains: "image",
        },
      },
      admin: {
        description: "Optional portrait shown on author and blog pages.",
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
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (!data.slug && typeof data.name === "string") {
          data.slug = slugify(data.name);
        }
        return data;
      },
    ],
  },
};
