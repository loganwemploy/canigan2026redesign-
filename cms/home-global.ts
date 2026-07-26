import type { GlobalConfig, Field } from "payload";
import { homeSeed } from "./content";

/**
 * An image slot accepts EITHER a Google Drive share link (preferred — Candy's
 * photos live in Drive) OR an uploaded file. Drive wins when both are set.
 */
const imageSlot = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  admin: { description: "Paste a Google Drive share link, or upload a file. Drive link wins if both are set." },
  fields: [
    {
      name: "driveUrl",
      label: "Google Drive link",
      type: "text",
      admin: { placeholder: "https://drive.google.com/file/d/…/view?usp=sharing" },
    },
    { name: "upload", label: "…or upload", type: "upload", relationTo: "media" },
  ],
});

const cta = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [
    { name: "label", type: "text", required: true },
    { name: "url", type: "text", required: true },
  ],
});

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  access: { read: () => true },
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
      breakpoints: [
        { name: "mobile", width: 433, height: 900, label: "Mobile" },
        { name: "tablet", width: 768, height: 1024, label: "Tablet" },
        { name: "desktop", width: 1440, height: 900, label: "Desktop" },
      ],
    },
    description:
      "Every word and image on the homepage. Open Live Preview for side-by-side editing, or visit /site-editor for a 1:1 click-to-edit replica (photos + Zoom included).",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                { name: "brand", type: "text", required: true, defaultValue: homeSeed.hero.brand },
                { name: "plate", type: "text", defaultValue: homeSeed.hero.plate, admin: { description: "Small plate mark, e.g. 'Pl. I'" } },
                { name: "title", type: "textarea", required: true, defaultValue: homeSeed.hero.title, admin: { description: "Line breaks are preserved." } },
                { name: "welcome", type: "textarea", required: true, defaultValue: homeSeed.hero.welcome },
                imageSlot("image", "Hero image"),
                cta("primaryCta", "Primary button"),
                cta("secondaryCta", "Secondary button"),
              ],
            },
          ],
        },
        {
          label: "Challenge",
          fields: [
            {
              name: "challenge",
              type: "group",
              fields: [
                { name: "label", type: "text", defaultValue: homeSeed.challenge.label },
                { name: "heading", type: "textarea", defaultValue: homeSeed.challenge.heading },
                { name: "body", type: "textarea", defaultValue: homeSeed.challenge.body },
                { name: "goalBadge", type: "text", defaultValue: homeSeed.challenge.goalBadge },
                { name: "goalHeading", type: "textarea", defaultValue: homeSeed.challenge.goalHeading },
                { name: "goalBody", type: "textarea", defaultValue: homeSeed.challenge.goalBody },
              ],
            },
          ],
        },
        {
          label: "Science",
          fields: [
            {
              name: "science",
              type: "group",
              fields: [
                { name: "label", type: "text", defaultValue: homeSeed.science.label },
                { name: "plate", type: "text", defaultValue: homeSeed.science.plate },
                { name: "heading", type: "textarea", defaultValue: homeSeed.science.heading },
                {
                  name: "cards",
                  type: "array",
                  minRows: 1,
                  maxRows: 6,
                  defaultValue: homeSeed.science.cards,
                  admin: { description: "Numbered 01, 02, 03… automatically." },
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "body", type: "textarea", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Nutrition",
          fields: [
            {
              name: "nutrition",
              type: "group",
              fields: [
                { name: "plate", type: "text", defaultValue: homeSeed.nutrition.plate },
                { name: "strip", type: "text", defaultValue: homeSeed.nutrition.strip },
                {
                  name: "columns",
                  type: "array",
                  minRows: 1,
                  maxRows: 3,
                  defaultValue: homeSeed.nutrition.columns,
                  fields: [
                    { name: "heading", type: "text", required: true },
                    {
                      name: "paragraphs",
                      type: "array",
                      fields: [{ name: "text", type: "textarea", required: true }],
                    },
                  ],
                },
                imageSlot("image", "Nutrition image"),
                { name: "ctaLabel", type: "text", defaultValue: homeSeed.nutrition.ctaLabel },
                { name: "ctaUrl", type: "text", defaultValue: homeSeed.nutrition.ctaUrl },
              ],
            },
          ],
        },
        {
          label: "Opportunity",
          fields: [
            {
              name: "opportunity",
              type: "group",
              fields: [
                { name: "label", type: "text", defaultValue: homeSeed.opportunity.label },
                { name: "plate", type: "text", defaultValue: homeSeed.opportunity.plate },
                { name: "heading", type: "textarea", defaultValue: homeSeed.opportunity.heading },
                {
                  name: "bullets",
                  type: "array",
                  defaultValue: homeSeed.opportunity.bullets,
                  fields: [{ name: "text", type: "text", required: true }],
                },
                imageSlot("image", "Opportunity image"),
                { name: "ambHeading", type: "textarea", defaultValue: homeSeed.opportunity.ambHeading },
                { name: "ambBody", type: "textarea", defaultValue: homeSeed.opportunity.ambBody },
                { name: "ambCtaLabel", type: "text", defaultValue: homeSeed.opportunity.ambCtaLabel },
                imageSlot("ambImage", "Ambassador image"),
              ],
            },
          ],
        },
        {
          label: "Benchmarks",
          fields: [
            {
              name: "benchmarks",
              type: "group",
              fields: [
                { name: "label", type: "text", defaultValue: homeSeed.benchmarks.label },
                { name: "heading", type: "textarea", defaultValue: homeSeed.benchmarks.heading },
                {
                  name: "rows",
                  type: "array",
                  defaultValue: homeSeed.benchmarks.rows,
                  fields: [
                    { name: "level", type: "text", required: true },
                    { name: "description", type: "textarea", required: true },
                    { name: "monthlyRange", type: "text", required: true },
                    { name: "avgMonthly", type: "text", required: true },
                    { name: "yearlyAverage", type: "text", required: true },
                    { name: "active", type: "checkbox", defaultValue: true },
                  ],
                },
                { name: "disclaimer", type: "textarea", defaultValue: homeSeed.benchmarks.disclaimer },
                cta("cta", "Call to action"),
              ],
            },
          ],
        },
        {
          label: "Business",
          fields: [
            {
              name: "business",
              type: "group",
              fields: [
                { name: "plate", type: "text", defaultValue: homeSeed.business.plate },
                { name: "heading", type: "textarea", defaultValue: homeSeed.business.heading },
                {
                  name: "items",
                  type: "array",
                  defaultValue: homeSeed.business.items,
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "body", type: "textarea", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Get started",
          fields: [
            {
              name: "getStarted",
              type: "group",
              fields: [
                { name: "label", type: "text", defaultValue: homeSeed.getStarted.label },
                { name: "plate", type: "text", defaultValue: homeSeed.getStarted.plate },
                { name: "heading", type: "textarea", defaultValue: homeSeed.getStarted.heading },
                {
                  name: "steps",
                  type: "array",
                  defaultValue: homeSeed.getStarted.steps,
                  fields: [{ name: "label", type: "text", required: true }],
                },
                cta("primaryCta", "Primary button"),
              ],
            },
          ],
        },
        {
          label: "About & Zoom",
          fields: [
            {
              name: "about",
              type: "group",
              fields: [
                { name: "label", type: "text", defaultValue: homeSeed.about.label },
                { name: "plate", type: "text", defaultValue: homeSeed.about.plate },
                { name: "heading", type: "textarea", defaultValue: homeSeed.about.heading },
                { name: "body", type: "textarea", defaultValue: homeSeed.about.body },
                imageSlot("image", "Photo of Candy"),
                { name: "phone", type: "text", defaultValue: homeSeed.about.phone },
                { name: "email", type: "text", defaultValue: homeSeed.about.email },
              ],
            },
            {
              name: "zoomSection",
              label: "Zoom section",
              type: "group",
              fields: [
                { name: "label", type: "text", defaultValue: homeSeed.zoomSection.label },
                { name: "plate", type: "text", defaultValue: homeSeed.zoomSection.plate },
                { name: "heading", type: "textarea", defaultValue: homeSeed.zoomSection.heading },
                { name: "note", type: "textarea", defaultValue: homeSeed.zoomSection.note },
              ],
            },
          ],
        },
        {
          label: "Contact & Footer",
          fields: [
            {
              name: "contact",
              type: "group",
              fields: [
                { name: "label", type: "text", defaultValue: homeSeed.contact.label },
                { name: "plate", type: "text", defaultValue: homeSeed.contact.plate },
                { name: "heading", type: "textarea", defaultValue: homeSeed.contact.heading },
                { name: "blurb", type: "textarea", defaultValue: homeSeed.contact.blurb },
                {
                  name: "personas",
                  type: "array",
                  defaultValue: homeSeed.contact.personas,
                  fields: [{ name: "label", type: "text", required: true }],
                },
                { name: "successMessage", type: "text", defaultValue: homeSeed.contact.successMessage },
              ],
            },
            {
              name: "footer",
              type: "group",
              fields: [
                { name: "tagline", type: "textarea", defaultValue: homeSeed.footer.tagline },
                { name: "incomeDisclaimer", type: "textarea", defaultValue: homeSeed.footer.incomeDisclaimer },
                { name: "healthDisclaimer", type: "textarea", defaultValue: homeSeed.footer.healthDisclaimer },
              ],
            },
          ],
        },
      ],
    },
  ],
};
