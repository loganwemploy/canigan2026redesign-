/** Field paths the visual site editor can open and save into Payload. */

export type EditorTarget =
  | { kind: "home"; path: string; label: string; type: "text" | "textarea" | "image" }
  | { kind: "zoom"; path: string; label: string; type: "text" | "textarea" | "checkbox" };

export const HOME_EDITOR_FIELDS: Extract<EditorTarget, { kind: "home" }>[] = [
  { kind: "home", path: "hero.brand", label: "Hero brand", type: "text" },
  { kind: "home", path: "hero.plate", label: "Hero plate", type: "text" },
  { kind: "home", path: "hero.title", label: "Hero headline", type: "textarea" },
  { kind: "home", path: "hero.welcome", label: "Hero welcome", type: "textarea" },
  { kind: "home", path: "hero.image", label: "Hero photo", type: "image" },
  { kind: "home", path: "hero.primaryCta.label", label: "Hero quiz CTA label", type: "text" },
  { kind: "home", path: "hero.primaryCta.url", label: "Hero quiz CTA URL", type: "text" },
  { kind: "home", path: "hero.secondaryCta.label", label: "Hero contact CTA label", type: "text" },
  { kind: "home", path: "hero.secondaryCta.url", label: "Hero contact CTA URL", type: "text" },

  { kind: "home", path: "challenge.label", label: "Challenge label", type: "text" },
  { kind: "home", path: "challenge.heading", label: "Challenge heading", type: "textarea" },
  { kind: "home", path: "challenge.body", label: "Challenge body", type: "textarea" },
  { kind: "home", path: "challenge.goalBadge", label: "Goal badge", type: "text" },
  { kind: "home", path: "challenge.goalHeading", label: "Goal heading", type: "textarea" },
  { kind: "home", path: "challenge.goalBody", label: "Goal body", type: "textarea" },

  { kind: "home", path: "science.label", label: "Science label", type: "text" },
  { kind: "home", path: "science.heading", label: "Science heading", type: "textarea" },

  { kind: "home", path: "nutrition.ctaLabel", label: "Nutrition CTA", type: "text" },
  { kind: "home", path: "nutrition.image", label: "Nutrition photo", type: "image" },

  { kind: "home", path: "opportunity.label", label: "Opportunity label", type: "text" },
  { kind: "home", path: "opportunity.heading", label: "Opportunity heading", type: "textarea" },
  { kind: "home", path: "opportunity.image", label: "Opportunity photo", type: "image" },
  { kind: "home", path: "opportunity.ambHeading", label: "Ambassador heading", type: "textarea" },
  { kind: "home", path: "opportunity.ambBody", label: "Ambassador body", type: "textarea" },
  { kind: "home", path: "opportunity.ambImage", label: "Ambassador photo", type: "image" },
  { kind: "home", path: "opportunity.ambCtaLabel", label: "Ambassador CTA", type: "text" },

  { kind: "home", path: "benchmarks.heading", label: "Benchmarks heading", type: "textarea" },
  { kind: "home", path: "benchmarks.cta.label", label: "Benchmarks CTA", type: "text" },

  { kind: "home", path: "business.heading", label: "Business heading", type: "textarea" },

  { kind: "home", path: "getStarted.heading", label: "Get started heading", type: "textarea" },
  { kind: "home", path: "getStarted.primaryCta.label", label: "Get started CTA", type: "text" },

  { kind: "home", path: "about.heading", label: "About heading", type: "textarea" },
  { kind: "home", path: "about.body", label: "About body", type: "textarea" },
  { kind: "home", path: "about.image", label: "About photo", type: "image" },
  { kind: "home", path: "about.phone", label: "Phone", type: "text" },
  { kind: "home", path: "about.email", label: "Email", type: "text" },

  { kind: "home", path: "zoomSection.label", label: "Zoom section label", type: "text" },
  { kind: "home", path: "zoomSection.heading", label: "Zoom section heading", type: "textarea" },
  { kind: "home", path: "zoomSection.note", label: "Zoom section note", type: "textarea" },

  { kind: "home", path: "contact.heading", label: "Contact heading", type: "textarea" },
  { kind: "home", path: "contact.blurb", label: "Contact blurb", type: "textarea" },

  { kind: "home", path: "footer.tagline", label: "Footer tagline", type: "textarea" },
];

export const ZOOM_EDITOR_FIELDS: Extract<EditorTarget, { kind: "zoom" }>[] = [
  { kind: "zoom", path: "title", label: "Zoom title", type: "text" },
  { kind: "zoom", path: "date", label: "Zoom date", type: "text" },
  { kind: "zoom", path: "time", label: "Zoom time", type: "text" },
  { kind: "zoom", path: "zoomLength", label: "Zoom length", type: "text" },
  { kind: "zoom", path: "link", label: "Zoom invite URL", type: "text" },
  { kind: "zoom", path: "active", label: "Active on site", type: "checkbox" },
];

export function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function setByPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let cursor: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (!(key in cursor) || typeof cursor[key] !== "object" || cursor[key] === null) {
      cursor[key] = {};
    }
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]!] = value;
}
