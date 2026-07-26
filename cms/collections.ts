import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [{ name: "name", type: "text" }],
};

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 1024, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
  },
  admin: {
    description:
      "Photos can also be hosted on Google Drive — every image slot on the Home page accepts a Drive share link directly, no upload needed.",
  },
  fields: [{ name: "alt", type: "text", required: true }],
};

export const Zooms: CollectionConfig = {
  slug: "zooms",
  labels: { singular: "Zoom Meeting", plural: "Zoom Meetings" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "time", "active", "updatedAt"],
    description:
      "Edit the next Zoom here. The most recent active meeting powers the site Zoom section and hero invite button.",
    livePreview: {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}/#zoom`,
    },
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "date",
      type: "text",
      required: true,
      admin: { description: "Shown as-is, e.g. 'Wed. July 22, 2026'" },
    },
    {
      name: "time",
      type: "text",
      required: true,
      admin: { description: "e.g. '8 pm EST'" },
    },
    { name: "zoomLength", label: "Length", type: "text", defaultValue: "30 minutes" },
    {
      name: "link",
      type: "text",
      required: true,
      admin: { description: "Zoom invite URL" },
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Only the newest active meeting is shown on the public site.",
      },
    },
  ],
};

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Contact Submission", plural: "Contact Submissions" },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "createdAt"],
    description: "Messages sent through the 'Get in touch' form on the site.",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    {
      name: "personas",
      type: "text",
      admin: { description: "How the sender described themself" },
    },
    { name: "message", type: "textarea" },
  ],
  timestamps: true,
};
