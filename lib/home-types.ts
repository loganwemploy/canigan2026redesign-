/** Shape of the Home global as consumed by the frontend (and produced by the seed). */

export interface ImageSlot {
  driveUrl?: string | null;
  upload?: { url?: string | null; alt?: string | null } | number | null;
}

export interface Cta {
  label: string;
  url: string;
}

export interface HomeData {
  hero: {
    brand: string;
    plate: string;
    title: string;
    welcome: string;
    image?: ImageSlot;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  challenge: {
    label: string;
    heading: string;
    body: string;
    goalBadge: string;
    goalHeading: string;
    goalBody: string;
  };
  science: {
    label: string;
    plate: string;
    title: string;
    heading: string;
    cards: { title: string; body: string }[];
  };
  nutrition: {
    plate: string;
    strip: string;
    columns: { heading: string; paragraphs: { text: string }[] }[];
    image?: ImageSlot;
    imageAlt?: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  opportunity: {
    label: string;
    plate: string;
    heading: string;
    bullets: { text: string }[];
    image?: ImageSlot;
    ambHeading: string;
    ambBody: string;
    ambCtaLabel: string;
    ambImage?: ImageSlot;
  };
  benchmarks: {
    label: string;
    heading: string;
    rows: {
      level: string;
      description: string;
      monthlyRange: string;
      avgMonthly: string;
      yearlyAverage: string;
      active: boolean;
    }[];
    disclaimer: string;
    cta: Cta;
  };
  business: {
    plate: string;
    heading: string;
    items: { title: string; body: string }[];
  };
  getStarted: {
    label: string;
    plate: string;
    heading: string;
    steps: { label: string }[];
    primaryCta: Cta;
  };
  about: {
    label: string;
    plate: string;
    heading: string;
    body: string;
    image?: ImageSlot;
    phone: string;
    email: string;
  };
  zoomSection: {
    label: string;
    plate: string;
    heading: string;
    note: string;
    image?: ImageSlot;
    imageCaption: string;
  };
  heritage: {
    label: string;
    plate: string;
    heading: string;
    body: string;
    image?: ImageSlot;
    imageAlt: string;
  };
  contact: {
    label: string;
    plate: string;
    heading: string;
    blurb: string;
    personas: { label: string }[];
    successMessage: string;
  };
  footer: {
    tagline: string;
    incomeDisclaimer: string;
    healthDisclaimer: string;
  };
}

export interface ZoomMeeting {
  id?: number;
  title: string;
  date: string;
  time: string;
  zoomLength?: string | null;
  link: string;
  active?: boolean | null;
}
