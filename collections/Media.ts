import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
    useAsTitle: "filename",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for screen readers and SEO.",
      },
    },
  ],
  upload: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
};
