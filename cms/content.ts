import type { HomeData, ZoomMeeting } from "@/lib/home-types";

export const ASSESSMENT_URL =
  "https://meology.shaklee.com/?sponsorId=Ika2Kd%2FVNEo9lL643BSciw%3D%3D&pwsName=candywilson";

export const PHONE = "847-826-1121";
export const EMAIL = "candy@caniganhealthoptions.com";

/**
 * Official Shaklee US lifestyle / product photography (CDN).
 * Used as image-slot defaults so Candy’s site mirrors the strongest converting
 * visuals from us.shaklee.com without changing layout or styling.
 */
/**
 * Shaklee's public marketing images are mostly promo banners with headline text
 * burned in, so only the text-free stills are safe for full-bleed frames — and
 * they top out at 450px. They're reserved for slots that sit under a dark
 * overlay, where the resolution never shows.
 */
const SHAKLEE = {
  productStill: "https://images.shaklee.com/hp/ShakDiff_Guranteed-tinified.jpg",
  activeLifestyle: "https://images.shaklee.com/hp/ShakDiff_Proven-tinified.jpg",
} as const;

/** Full site copy — conversion-focused for Members + Ambassadors (Shaklee US messaging). */
export const homeSeed: HomeData = {
  hero: {
    brand: "Canigan Health Options",
    plate: "Pl. I",
    title: "Feel better.\nShare what works.\nEarn on product sales.",
    welcome:
      "Welcome to Canigan Health Options with Candy — clinically backed Shaklee wellness,\nplus a flexible Ambassador path built on real customer product purchases.",
    image: { driveUrl: "" },
    primaryCta: { label: "Take A Free Personalized Health Quiz", url: ASSESSMENT_URL },
    secondaryCta: { label: "Get In Touch", url: "#contact" },
  },
  challenge: {
    label: "The Challenge",
    heading: "We are living longer,\nbut are we living better?",
    body: "Everyday stress, processed foods, and environmental factors quietly drain our vital energy. Millions struggle with poor sleep, low vitality, digestive issues, and joint discomfort — and most never get a personalized nutrition plan.",
    goalBadge: "The Goal",
    goalHeading: "Start with your body.\nThen share the results.",
    goalBody:
      "Take the free Meology assessment, build a simple daily stack that fits your life, and when you feel the difference you’ll have a story worth sharing — with friends who want wellness, and with partners who want supplemental income.",
  },
  science: {
    label: "Scientific Integrity",
    plate: "Pl. XVII",
    heading: "70 years of science people can trust — and sell with confidence.",
    cards: [
      {
        title: "Proven science",
        body: "Backed by more than 100 published, peer-reviewed clinical studies — credibility that opens conversations.",
      },
      {
        title: "Uncompromising testing",
        body: "Over 100,000 quality tests performed each year to guarantee purity and potency.",
      },
      {
        title: "100% safe & clean",
        body: "Free from artificial flavors, sweeteners, and harmful contaminants — easy to recommend.",
      },
      {
        title: "Results worth sharing",
        body: "Product-first sharing wins customers. Ambassadors earn on product sales — never on recruiting.",
      },
    ],
  },
  nutrition: {
    plate: "Pl. II",
    strip: "Personalized nutrition that creates loyal customers",
    columns: [
      {
        heading: "Daily essentials",
        paragraphs: [
          {
            text: "Meology builds a customized vitamin plan around your body, goals, and lifestyle — the easiest first yes for new Members.",
          },
          {
            text: "Foundational multis, protein, and targeted solutions support energy, sleep, immunity, and healthy aging so people feel the difference fast.",
          },
          {
            text: "Simple daily habits create repeat orders — the heart of a sustainable Ambassador income.",
          },
        ],
      },
      {
        heading: "Energy, fitness & longevity",
        paragraphs: [
          {
            text: "Life Shake™ and clean protein options fuel active days with plant-powered nutrition people actually finish.",
          },
          {
            text: "Clinically studied longevity stacks — including cellular support favorites like Vivix® and Liquid BioCell® — give you premium products worth talking about.",
          },
          {
            text: "Lead with the free health quiz, deliver a plan, then invite them to Membership savings or Ambassador earning when they’re ready.",
          },
        ],
      },
    ],
    image: { driveUrl: "" },
    ctaLabel: "Find your plan — take the free assessment",
    ctaUrl: ASSESSMENT_URL,
  },
  opportunity: {
    label: "The Opportunity",
    plate: "Pl. III",
    heading: "Turn passion for wellness\ninto product-based income.",
    bullets: [
      { text: "Earn 30% on new customer sales in their first 30 days.†" },
      { text: "Earn up to 40% on returning customer purchases.†" },
      { text: "Earn $50 Star Club on every $500 from 3+ new customers / month.†" },
      { text: "Earn up to 10% on team product sales — paid for sales, not recruiting.†" },
    ],
    image: { driveUrl: "" },
    ambHeading: "Become a Shaklee Ambassador with Candy’s mentorship",
    ambBody:
      "Share products you love from your phone with a turn-key digital storefront, no inventory risk, and free Priority Shipping on qualifying new-Ambassador kits. Start as a Member to save, or as an Ambassador to earn on customer product sales — Candy coaches you step by step. Rank Up bonuses of up to $20,000 are available for Ambassadors who advance and hold rank under official rules.†",
    ambCtaLabel: "Ask Candy about joining",
    ambImage: { driveUrl: SHAKLEE.productStill },
  },
  benchmarks: {
    label: "Realistic Benchmarks",
    heading: "What could product-based earnings look like?",
    rows: [
      {
        level: "Director",
        description: "First leadership milestone — personal customers plus a small sharing circle.",
        monthlyRange: "$1,000–$1,100",
        avgMonthly: "$1,060",
        yearlyAverage: "$12,750",
        active: true,
      },
      {
        level: "Senior Director",
        description: "Momentum from retained Members and consistent monthly product volume.",
        monthlyRange: "$1,100–$1,300",
        avgMonthly: "$1,080",
        yearlyAverage: "$12,930",
        active: true,
      },
      {
        level: "Coordinator",
        description: "Guiding a growing team of Ambassadors who serve their own customers.",
        monthlyRange: "$1,800–$2,100",
        avgMonthly: "$2,050",
        yearlyAverage: "$24,500",
        active: true,
      },
      {
        level: "Senior Coordinator",
        description: "Established leadership with leveraged team product volume.",
        monthlyRange: "$2,400–$2,800",
        avgMonthly: "$2,470",
        yearlyAverage: "$29,600",
        active: true,
      },
    ],
    disclaimer:
      "†Figures are illustrative teaching benchmarks only — not a promise of income. Individual results vary based on effort, skill, and customer product sales. Shaklee Ambassadors do not earn compensation for recruiting. See Shaklee’s current Income Disclosure Statement and Compensation Plan at us.shaklee.com/earnings.",
    cta: { label: "See what an extra check could mean — talk to Candy", url: "#contact" },
  },
  business: {
    plate: "Pl. IX",
    heading: "You're in business for yourself, not by yourself.",
    items: [
      {
        title: "Product-first playbook",
        body: "Candy’s system starts with Meology and personal results — then customer referrals, Membership, and optional Ambassador enrollment.",
      },
      {
        title: "Digital tools day one",
        body: "Replicated storefront, mobile apps, and training so you can share links and take orders without inventory.",
      },
      {
        title: "Star Club & weekly pay",
        body: "Hit $500 in new-customer product sales with 3+ new enrollments in a calendar month to unlock the $50 Star Club Bonus (rules apply).†",
      },
      {
        title: "Community & mentorship",
        body: "Live Zoom coaching, scripts, and a team that answers questions — so you never guess what to do next.",
      },
      {
        title: "Flexible by design",
        body: "Work around family and life. Build when you can. Grow as your confidence and customer list grow.",
      },
    ],
  },
  getStarted: {
    label: "Get Started Today",
    plate: "Pl. XIX",
    heading:
      "Four simple steps Candy uses to help people feel better — and help Ambassadors build product-based income.",
    steps: [
      { label: "Take the free Meology quiz" },
      { label: "Experience the products yourself" },
      { label: "Share results & serve customers" },
      { label: "Grow as a Member or Ambassador" },
    ],
    primaryCta: { label: "Start with the free health quiz", url: ASSESSMENT_URL },
  },
  about: {
    label: "About Me",
    plate: "Pl. XXI",
    heading: "I'm Candy — 75+, active, and not on a single prescribed med.",
    body: "I'm Candy, owner of Canigan Health Options. I am 75+ yrs old with no doctor prescribed medication. A mother of three, and a grandmother. Let me help you feel healthier — and, if you want, earn supplemental income the ethical way: by sharing high-quality products people reorder. If you are looking to make a difference, build community, and grow with training and tools that work, joining our team at Canigan Health Options is the right choice. Our mission is healthier lives backed by science, with mentorship so Ambassadors succeed through customer product sales.",
    image: { driveUrl: "" },
    phone: PHONE,
    email: EMAIL,
  },
  zoomSection: {
    label: "Join Me On Zoom",
    plate: "Pl. XXII",
    heading: "Pull up a chair — live wellness & business topics with Candy.",
    note: "New topics are announced regularly — product education for Members and sharing skills for Ambassadors. Can't make it live? Get in touch and Candy will catch you up.",
    image: { driveUrl: "" },
    imageCaption: "7 clinical studies + landmark research on nutrient status and biomarkers of health.",
  },
  heritage: {
    label: "Wellness Is Where We've Been",
    plate: "Pl. VII",
    heading: "A century of firsts.",
    body: "From the first multivitamin in the United States in 1915 to personalized nutrition today — the science behind what Candy shares has been a hundred years in the making.",
    image: { driveUrl: "" },
    imageAlt:
      "Shaklee heritage timeline, 1915 to 2021: the first US multivitamin, Basic-H concentrated organic cleaner, the first plant-based soy protein, Pure Performance athletes, NASA missions, climate-neutral certification, YOUTH skincare, and Meology personalized nutrition.",
  },
  contact: {
    label: "Get In Touch",
    plate: "Pl. XXIII",
    heading: "Tell Candy where you'd like to begin.",
    blurb:
      "Feel better as a Member, earn as an Ambassador, or both — send a note and Candy will personally reach out with next steps.",
    personas: [
      { label: "Entrepreneurially Minded" },
      { label: "Health-Conscious" },
      { label: "Specific Health Condition" },
      { label: "Active Individual" },
      { label: "Eco-Conscious" },
    ],
    successMessage: "Thank you! Your message is on its way — Candy will reach out shortly.",
  },
  footer: {
    tagline: "Product-first wellness. Product-based income. Real mentorship with Candy.",
    incomeDisclaimer:
      "Income figures are illustrative and not guaranteed. Success depends on your skills and personal effort. Shaklee Ambassadors do not earn compensation for the recruitment or sponsorship of other Ambassadors. See the official Shaklee Compensation Plan and Income Disclosure Statement.",
    healthDisclaimer:
      "Statements on this site have not been evaluated by the Food and Drug Administration and are not intended to diagnose, treat, cure, or prevent any disease.",
  },
};

export const zoomSeed: ZoomMeeting = {
  title: "Age-Related Macular Degeneration",
  date: "Wed. July 22, 2026",
  time: "8 pm EST",
  zoomLength: "30 minutes",
  link: "https://us02web.zoom.us/j/8478261121?omn=83013639458",
  active: true,
};

/** Bundled / CDN fallback images per slot when no Drive link / upload is set. */
export const FALLBACK_IMAGES = {
  // De-texted crop of Candy's brand photo (see app/api/hero-image) — the raw
  // file has the wordmark + contact info baked in, which collided with the
  // on-page headline. The response is immutably cached, so bump ?v when the
  // route's crop or patch changes, or browsers keep the old frame for a year.
  hero: "/api/hero-image?v=2",
  nutrition: "/images/basic-h2-water.png",
  // Google-thumbnail sources (554px / 353px wide) — deliberately rendered small
  // and contained rather than full-bleed so they stay sharp. Swap via the CMS
  // if higher-resolution originals turn up.
  biomarkers: "/images/biomarkers-study.jpg",
  heritage: "/images/shaklee-heritage-timeline.jpg",
  opportunity: "/images/ambassador-program.png",
  // Sits under a 72% overlay, so the low-res Shaklee still reads perfectly here
  ambassador: SHAKLEE.productStill,
  about: "/images/canigan-health-logo.png",
  logo: "/images/canigan-health-logo.png",
  spare: SHAKLEE.activeLifestyle,
} as const;
