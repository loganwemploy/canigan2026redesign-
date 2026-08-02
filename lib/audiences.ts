import { ASSESSMENT_URL } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

export const AUDIENCE_KEYS = [
  "strong-after-weight-loss",
  "active-aging",
  "midlife-vitality",
  "motherhood-nutrition",
  "share-and-save",
] as const;

export type AudienceKey = (typeof AUDIENCE_KEYS)[number];

export interface AudienceProfile {
  slug: AudienceKey;
  navLabel: string;
  chooserTitle: string;
  chooserBody: string;
  seoTitle: string;
  seoDescription: string;
  heroEyebrow: string;
  heroTasks: { time: string; title: string; detail: string }[];
  challengeTitle: string;
  oldWay: string[];
  caniganWay: string[];
  positioningLead: string;
  positioningAccent: string;
  heroImageAlt: string;
  content: Pick<HomeData, "hero" | "challenge" | "science" | "nutrition" | "opportunity" | "getStarted" | "contact" | "footer">;
}

const sharedOpportunity: HomeData["opportunity"] = {
  label: "Member & Ambassador Options",
  plate: "Pl. III",
  heading: "Save on what you use.\nShare only if it feels right.",
  bullets: [
    { text: "Members receive 15% off product pricing." },
    { text: "Qualifying $100+ loyalty orders can earn product points over time." },
    { text: "Qualified Ambassadors can earn commissions from customer product sales." },
    { text: "Earnings are never paid for weight loss or simply recruiting someone." },
  ],
  image: { driveUrl: "/images/opportunity-phone.jpg" },
  ambHeading: "A product-first path, with Candy beside you",
  ambBody:
    "Begin as a Member for everyday savings, or ask about becoming an Ambassador when you are ready to serve customers. Current program rules, qualifying sales, expenses, and individual effort matter; earnings are not guaranteed.",
  ambCtaLabel: "Ask Candy about the options",
  ambImage: { driveUrl: "/images/ambassador-program.png" },
};

const sharedFooter: HomeData["footer"] = {
  tagline: "Personal wellness guidance, thoughtful product options, and real follow-through with Candy.",
  incomeDisclaimer:
    "Member savings and Ambassador compensation are separate. Ambassador earnings are based on qualifying product sales under the current Shaklee Compensation Plan, not on weight loss or simply recruiting. Earnings are not guaranteed and depend on sales, expenses, skill, and effort.",
  healthDisclaimer:
    "Educational information only; not medical advice. Products and programs do not diagnose, treat, cure, or prevent disease. Discuss nutrition, exercise, pregnancy, lactation, medical conditions, and rapid weight change with your qualified healthcare professional.",
};

export const AUDIENCES: Record<AudienceKey, AudienceProfile> = {
  "strong-after-weight-loss": {
    slug: "strong-after-weight-loss",
    navLabel: "Weight-loss strength",
    chooserTitle: "I’m losing weight and want to stay strong",
    chooserBody: "Protein, strength habits, and a calmer plan for rapid-change seasons.",
    seoTitle: "Protein & Strength Support During Weight Loss | Canigan Health",
    seoDescription:
      "Build a protein-first routine with strength habits and personal guidance from Candy during a season of significant weight change.",
    heroEyebrow: "Strength-focused support for a changing body",
    heroTasks: [
      { time: "First", title: "Map your real routine", detail: "Appetite, meals, activity, and goals" },
      { time: "Then", title: "Build a protein-first plan", detail: "Practical options you can actually finish" },
      { time: "Ongoing", title: "Protect the strength habit", detail: "Pair nutrition with resistance work" },
    ],
    challengeTitle: "The scale can move faster than your strength plan.",
    oldWay: ["Chasing the lowest number", "Assuming protein alone is enough", "Waiting until weakness feels obvious"],
    caniganWay: ["Protein distributed across your day", "Resistance exercise that fits your level", "Clinician coordination during rapid change"],
    positioningLead: "Weight change is only one measure.",
    positioningAccent: "Strength, energy, and function deserve a plan too.",
    heroImageAlt: "Candy offering personal wellness guidance",
    content: {
      hero: {
        brand: "Canigan Health Options",
        plate: "Strength Track",
        title: "Lose weight.\nKeep building strength.\nFeel like yourself.",
        welcome:
          "Rapid weight change can affect lean tissue and how your face and body look. Protein matters, but it works best as part of a complete plan that includes resistance exercise and guidance from your healthcare team.",
        image: { driveUrl: "" },
        primaryCta: { label: "Build my strength-focused plan", url: ASSESSMENT_URL },
        secondaryCta: { label: "Ask Candy a question", url: "#contact" },
      },
      challenge: {
        label: "The Strength Question",
        heading: "Weight loss and strength are not the same outcome.",
        body:
          "Research suggests lean mass can make up a meaningful share of total weight lost, although lean mass is not identical to muscle and individual results vary. That is why responsible support pairs adequate nutrition with strength work—not fear or miracle claims.",
        goalBadge: "The Goal",
        goalHeading: "Support function, not just a number.",
        goalBody: "Create a repeatable protein and movement routine that respects your appetite, preferences, medical care, and real life.",
      },
      science: {
        label: "What the evidence supports",
        plate: "Evidence",
        heading: "The strongest current guidance combines protein-aware eating, progressive resistance exercise, and clinical follow-up.",
        cards: [
          { title: "Protein has a role", body: "Protein supplies amino acids used throughout the body. Your appropriate amount depends on your health, intake, and clinician guidance." },
          { title: "Strength work matters", body: "Protein by itself is not a muscle-preservation strategy. Resistance exercise provides the signal that nutrition supports." },
          { title: "Appearance can change", body: "Rapid loss can reduce facial and body volume. No shake or supplement can promise to prevent those cosmetic changes." },
          { title: "Your care team leads", body: "Persistent weakness, very low intake, or rapid change belongs in a conversation with the clinician managing your care." },
        ],
      },
      nutrition: {
        plate: "Pl. II",
        strip: "Protein-first does not mean protein-only",
        columns: [
          { heading: "Make protein easier", paragraphs: [
            { text: "When appetite is smaller, a practical protein option can make a meal or snack easier to complete." },
            { text: "Life Shake provides 20 grams of plant protein per serving. It is food support—not a promise to preserve facial volume or muscle." },
          ] },
          { heading: "Build the full routine", paragraphs: [
            { text: "Pair nutrition with strength training appropriate for your current ability and medical guidance." },
            { text: "Candy can help you organize questions, products, and habits; your healthcare professional manages your treatment and safety." },
          ] },
        ],
        image: { driveUrl: "/images/shaklee-active-day.jpg" },
        ctaLabel: "Start a protein-first conversation",
        ctaUrl: "#contact",
      },
      opportunity: sharedOpportunity,
      getStarted: {
        label: "Start With Strength",
        plate: "Pl. XIX",
        heading: "A calm four-step start for nutrition and strength during significant weight change.",
        steps: [
          { label: "Review concerns with your clinician" },
          { label: "Map meals and protein gaps" },
          { label: "Choose appropriate strength work" },
          { label: "Adjust with real feedback" },
        ],
        primaryCta: { label: "Talk through my routine with Candy", url: "#contact" },
      },
      contact: {
        label: "Talk With Candy",
        plate: "Pl. XXIII",
        heading: "What feels hardest about staying nourished and strong?",
        blurb: "Tell Candy what your days look like. She can help you explore practical product and routine options alongside your professional care.",
        personas: [{ label: "Protein feels difficult" }, { label: "I want a strength routine" }, { label: "My appetite has changed" }, { label: "I am supporting someone else" }, { label: "I want Member savings" }],
        successMessage: "Thank you. Candy will reach out personally.",
      },
      footer: sharedFooter,
    },
  },
  "active-aging": {
    slug: "active-aging",
    navLabel: "Active aging",
    chooserTitle: "I want to stay active and independent",
    chooserBody: "Readable, practical support for strength, energy, and everyday function.",
    seoTitle: "Healthy Aging, Strength & Independence | Canigan Health",
    seoDescription: "Explore simple nutrition and strength habits that support active aging, independence, and everyday vitality with Candy.",
    heroEyebrow: "Healthy aging with practical, personal support",
    heroTasks: [
      { time: "Today", title: "Choose your priority", detail: "Strength, energy, balance, or routine" },
      { time: "Next", title: "Simplify daily nutrition", detail: "Fewer decisions, clearer habits" },
      { time: "Together", title: "Keep the plan realistic", detail: "Candy checks in and helps adjust" },
    ],
    challengeTitle: "Living longer should still feel like living well.",
    oldWay: ["Complicated supplement cabinets", "Ignoring gradual strength loss", "A plan that is hard to read or follow"],
    caniganWay: ["Simple daily essentials", "Strength and balance habits", "Clear guidance in plain language"],
    positioningLead: "The goal is not to chase youth.",
    positioningAccent: "It is to protect the life you want to keep living.",
    heroImageAlt: "Candy, an active older wellness guide",
    content: {
      hero: {
        brand: "Canigan Health Options", plate: "Active Aging", title: "Stay capable.\nStay curious.\nStay in your life.",
        welcome: "Strength, balance, and adequate nutrition help support the everyday abilities that make independence possible. Candy turns broad wellness advice into a routine you can understand and use.",
        image: { driveUrl: "" }, primaryCta: { label: "Explore my healthy-aging plan", url: ASSESSMENT_URL }, secondaryCta: { label: "Talk with Candy", url: "#contact" },
      },
      challenge: { label: "The Independence Goal", heading: "Small daily habits protect meaningful abilities.", body: "Age-related muscle loss can make ordinary tasks harder over time. Strength and resistance training, adequate food, sleep, and appropriate medical care all have a place in an active-aging plan.", goalBadge: "The Goal", goalHeading: "Keep doing what matters.", goalBody: "Build a simple routine around the abilities you value: carrying groceries, walking confidently, gardening, traveling, and keeping up with family." },
      science: { label: "Healthy-aging evidence", plate: "Evidence", heading: "National Institute on Aging guidance emphasizes strength, balance, endurance, and flexibility for health and independence.", cards: [
        { title: "Strength supports function", body: "Resistance work can help maintain the strength used in daily life. Begin at an appropriate level and progress safely." },
        { title: "Food still matters", body: "Protein and overall nourishment support the body, but needs can change with health conditions, appetite, and medications." },
        { title: "Consistency wins", body: "A routine you repeat is more useful than an elaborate plan that stays on paper." },
        { title: "Personal guidance", body: "Candy helps simplify the wellness part while your healthcare professionals guide diagnosis and treatment." },
      ] },
      nutrition: { plate: "Pl. II", strip: "Simple enough to become a habit", columns: [
        { heading: "Cover the basics", paragraphs: [{ text: "Build meals and daily essentials around what you already enjoy and can prepare reliably." }, { text: "Use convenient protein options when they genuinely make your routine easier—not as a substitute for varied food or care." }] },
        { heading: "Support an active life", paragraphs: [{ text: "Connect your nutrition routine to a real activity: a walk, strength session, garden day, or time with grandchildren." }, { text: "Review supplements with a pharmacist or clinician if you take medicines or manage kidney, liver, or other health conditions." }] },
      ], image: { driveUrl: "/images/hero-trail.jpg" }, ctaLabel: "Take the free wellness assessment", ctaUrl: ASSESSMENT_URL },
      opportunity: sharedOpportunity,
      getStarted: { label: "Begin Simply", plate: "Pl. XIX", heading: "Four clear steps toward a routine that supports your independence.", steps: [{ label: "Choose one ability to support" }, { label: "Review health considerations" }, { label: "Build a simple daily routine" }, { label: "Check in and adjust" }], primaryCta: { label: "Ask Candy where to start", url: "#contact" } },
      contact: { label: "Talk With Candy", plate: "Pl. XXIII", heading: "What would you like to keep doing with confidence?", blurb: "Share the everyday goal that matters to you. Candy will personally help you find a simple place to begin.", personas: [{ label: "Strength and mobility" }, { label: "Energy and routine" }, { label: "Simple nutrition" }, { label: "Healthy weight" }, { label: "Member savings" }], successMessage: "Thank you. Candy will reach out personally." },
      footer: sharedFooter,
    },
  },
  "midlife-vitality": {
    slug: "midlife-vitality",
    navLabel: "Midlife vitality",
    chooserTitle: "I’m navigating midlife changes",
    chooserBody: "A steady plan for strength, energy, recovery, and confidence.",
    seoTitle: "Midlife Nutrition, Strength & Vitality | Canigan Health",
    seoDescription: "Create a realistic midlife wellness routine for strength, energy, and recovery with personal guidance from Candy.",
    heroEyebrow: "A steadier approach to midlife wellness",
    heroTasks: [{ time: "Notice", title: "Name what has changed", detail: "Energy, recovery, strength, or routine" }, { time: "Build", title: "Anchor meals and movement", detail: "Protein-aware eating plus strength" }, { time: "Refine", title: "Track what helps", detail: "Useful feedback, without obsession" }],
    challengeTitle: "Midlife does not need another punishing reset.",
    oldWay: ["Cutting more and eating less", "Treating every change as a failure", "Buying a cure-all for complex symptoms"],
    caniganWay: ["Strength-supportive nutrition", "Recovery and consistency", "Medical care for symptoms that need it"],
    positioningLead: "Your body is changing.", positioningAccent: "Your plan can become wiser, not harsher.", heroImageAlt: "Candy offering personal midlife wellness guidance",
    content: {
      hero: { brand: "Canigan Health Options", plate: "Midlife Vitality", title: "Build strength.\nSupport energy.\nMove forward kindly.", welcome: "Midlife can change body composition, sleep, recovery, and how familiar routines feel. A grounded plan starts with strength, adequate nutrition, and professional care for symptoms—not shame or extremes.", image: { driveUrl: "" }, primaryCta: { label: "Build my midlife routine", url: ASSESSMENT_URL }, secondaryCta: { label: "Talk with Candy", url: "#contact" } },
      challenge: { label: "The Midlife Shift", heading: "The old formula may no longer fit.", body: "Midlife changes are real, but they are not a personal failure. Protein-aware meals and resistance exercise can support muscle and function; persistent or disruptive symptoms deserve evaluation by a qualified clinician.", goalBadge: "The Goal", goalHeading: "Strong, nourished, and informed.", goalBody: "Use a realistic routine to support daily energy and strength while getting the right medical help for concerns outside a wellness coach's scope." },
      science: { label: "A grounded framework", plate: "Evidence", heading: "Current midlife guidance consistently centers resistance exercise, sufficient nutrition, sleep, and individualized medical care.", cards: [{ title: "Strength is foundational", body: "Resistance exercise supports muscle and function through midlife and beyond." }, { title: "Protein supports the work", body: "Protein contributes to muscle protein synthesis, but it does not replace training, sleep, or overall nourishment." }, { title: "Symptoms deserve care", body: "Wellness products cannot diagnose or treat hormonal, metabolic, or other medical concerns." }, { title: "Avoid extremes", body: "A sustainable pattern is more credible than a rapid-fix promise or body-shaming message." }] },
      nutrition: { plate: "Pl. II", strip: "Nourishment for a stronger next chapter", columns: [{ heading: "Anchor the day", paragraphs: [{ text: "Start with meals and snacks that include protein, fiber-rich plants, and enough energy for your life." }, { text: "Convenient plant protein can fill a practical gap when breakfast or busy days are inconsistent." }] }, { heading: "Train and recover", paragraphs: [{ text: "Pair nutrition with progressive strength work at a level that fits your health and experience." }, { text: "Treat sleep, stress, and recovery as part of the plan—not evidence that you lack willpower." }] }], image: { driveUrl: "/images/shaklee-nutrition-lineup.png" }, ctaLabel: "Explore my personalized plan", ctaUrl: ASSESSMENT_URL },
      opportunity: sharedOpportunity,
      getStarted: { label: "A Wiser Reset", plate: "Pl. XIX", heading: "Four steps to replace extremes with a stronger midlife routine.", steps: [{ label: "Name your real priority" }, { label: "Anchor protein and meals" }, { label: "Add appropriate strength work" }, { label: "Review and refine" }], primaryCta: { label: "Start my midlife plan", url: ASSESSMENT_URL } },
      contact: { label: "Talk With Candy", plate: "Pl. XXIII", heading: "What has changed—and what do you want back?", blurb: "Tell Candy whether your priority is strength, energy, consistency, or simply making nutrition easier.", personas: [{ label: "Strength and body composition" }, { label: "Energy and recovery" }, { label: "Simpler nutrition" }, { label: "Healthy aging" }, { label: "Member savings" }], successMessage: "Thank you. Candy will reach out personally." },
      footer: sharedFooter,
    },
  },
  "motherhood-nutrition": {
    slug: "motherhood-nutrition", navLabel: "Motherhood nutrition", chooserTitle: "I’m preparing for or recovering from pregnancy", chooserBody: "Clinician-first nutrition support for preconception, pregnancy, and postpartum life.",
    seoTitle: "Preconception & Postpartum Nutrition Support | Canigan Health", seoDescription: "Explore clinician-first nutrition routines for preconception, pregnancy, breastfeeding, and postpartum recovery with Candy.",
    heroEyebrow: "Clinician-first nutrition for the motherhood journey",
    heroTasks: [{ time: "First", title: "Bring in your care team", detail: "Review needs, products, and medicines" }, { time: "Then", title: "Make nourishment practical", detail: "Simple meals, snacks, and routines" }, { time: "With care", title: "Adapt as the season changes", detail: "Preconception through postpartum" }],
    challengeTitle: "Motherhood nutrition is not a weight-loss campaign.",
    oldWay: ["One-size-fits-all supplement lists", "Pressure to shrink or bounce back", "Assuming natural always means appropriate"],
    caniganWay: ["Obstetric or pediatric guidance first", "Enough food and practical routines", "Separate support for each stage"],
    positioningLead: "This season asks a lot of your body.", positioningAccent: "Support should begin with safety, nourishment, and grace.", heroImageAlt: "Candy offering personal nutrition guidance",
    content: {
      hero: { brand: "Canigan Health Options", plate: "Motherhood Nutrition", title: "Nourish this season.\nQuestion every shortcut.\nLead with care.", welcome: "Nutrition needs shift before, during, and after pregnancy. Candy can help make everyday nourishment feel more manageable, but your obstetric, pediatric, and lactation professionals should approve supplements and guide individual needs.", image: { driveUrl: "" }, primaryCta: { label: "Start a clinician-ready conversation", url: "#contact" }, secondaryCta: { label: "Talk with Candy", url: "#contact" } },
      challenge: { label: "The Care Standard", heading: "Each stage has different needs and different cautions.", body: "Pregnancy and lactation can increase needs for several nutrients, but more is not automatically better. Supplements, protein products, herbs, medicines, allergies, and medical conditions should be reviewed with qualified professionals.", goalBadge: "The Goal", goalHeading: "Prepared questions. Practical nourishment.", goalBody: "Build a stage-appropriate routine your care team understands and you can realistically follow on demanding days." },
      science: { label: "Safety before selling", plate: "Evidence", heading: "Authoritative pregnancy guidance emphasizes individualized care, adequate nourishment, and professional review of supplements.", cards: [{ title: "Stage matters", body: "Preconception, pregnancy, breastfeeding, and postpartum recovery are distinct stages—not one generic program." }, { title: "Care teams approve", body: "Bring labels and ingredient lists to the professionals who know your history and your baby's needs." }, { title: "No bounce-back pressure", body: "This page does not promote intentional weight loss during pregnancy or promise rapid postpartum body change." }, { title: "Food comes first", body: "Products can be convenient, but they do not replace varied food, prenatal care, or medical treatment." }] },
      nutrition: { plate: "Pl. II", strip: "Practical nourishment, reviewed by your care team", columns: [{ heading: "Make the day easier", paragraphs: [{ text: "Plan simple, tolerated foods and hydration around the realities of nausea, fatigue, appetite, feeding, and sleep disruption." }, { text: "A clinician can help determine whether a protein product or supplement fits your stage and health history." }] }, { heading: "Bring better questions", paragraphs: [{ text: "Ask about nutrient needs, ingredient safety, medicine interactions, allergies, and breastfeeding considerations." }, { text: "Candy can help organize options and labels so your appointment starts with clear information." }] }], image: { driveUrl: "/images/shaklee-nutrition-lineup.png" }, ctaLabel: "Ask Candy for product labels", ctaUrl: "#contact" },
      opportunity: { ...sharedOpportunity, heading: "Save on family essentials.\nKeep earning a separate decision.", ambHeading: "Member savings first; business only if and when you choose", ambBody: "Motherhood is not a sales angle. If Member pricing helps your household, Candy can explain it. If you later ask about the Ambassador option, she will explain qualifying product-sales rules and non-guaranteed earnings separately." },
      getStarted: { label: "Begin With Safety", plate: "Pl. XIX", heading: "Four steps for a better conversation with Candy and your care team.", steps: [{ label: "Name your current stage" }, { label: "List products and medicines" }, { label: "Ask your care team" }, { label: "Build a practical routine" }], primaryCta: { label: "Prepare my questions", url: "#contact" } },
      contact: { label: "Talk With Candy", plate: "Pl. XXIII", heading: "Which stage are you in, and what feels difficult?", blurb: "Candy can share labels, product details, and practical ideas for you to review with the professionals guiding your care.", personas: [{ label: "Preparing for pregnancy" }, { label: "Currently pregnant" }, { label: "Breastfeeding" }, { label: "Postpartum recovery" }, { label: "Supporting a new parent" }], successMessage: "Thank you. Candy will reach out personally." },
      footer: sharedFooter,
    },
  },
  "share-and-save": {
    slug: "share-and-save", navLabel: "Share & save", chooserTitle: "I want to save—and maybe build income", chooserBody: "Clear Member value and a product-sales Ambassador path without hype.",
    seoTitle: "Shaklee Member Savings & Ambassador Support | Canigan Health", seoDescription: "Compare Member savings with the Shaklee Ambassador product-sales path and get practical mentorship from Candy.",
    heroEyebrow: "Member value and product-first entrepreneurship",
    heroTasks: [{ time: "Use", title: "Start with your own routine", detail: "Know what you are sharing" }, { time: "Serve", title: "Help customers choose", detail: "Real needs, clear follow-through" }, { time: "Earn", title: "Qualifying product sales", detail: "Current plan rules apply" }],
    challengeTitle: "A credible wellness business begins with customers, not hype.",
    oldWay: ["Income-first promises", "Pressure to recruit", "Buying volume without customer demand"],
    caniganWay: ["Member savings you can explain", "Customer product sales", "Mentorship, disclosure, and follow-through"],
    positioningLead: "Save because the products fit.", positioningAccent: "Share because you can serve—not because income is promised.", heroImageAlt: "Candy mentoring a wellness customer",
    content: {
      hero: { brand: "Canigan Health Options", plate: "Share & Save", title: "Use what fits.\nShare what helps.\nEarn on real sales.", welcome: "Members can receive 15% off product pricing. Qualified Ambassadors may earn from customer product sales under the current compensation plan—never from weight loss or simply signing up friends and family.", image: { driveUrl: "" }, primaryCta: { label: "Compare Member and Ambassador options", url: "#contact" }, secondaryCta: { label: "Talk with Candy", url: "#contact" } },
      challenge: { label: "The Credibility Test", heading: "Would the product still matter without the opportunity?", body: "A durable direct-selling relationship starts with customer value, accurate claims, repeat use, and service. Compensation rules can change, earnings are not guaranteed, and purchases should reflect genuine household or customer demand.", goalBadge: "The Goal", goalHeading: "Product value before income talk.", goalBody: "Understand Member savings first, then evaluate the Ambassador path with current rules, realistic expenses, and no pressure." },
      science: { label: "Trust-building basics", plate: "Evidence", heading: "Wellness is a major direct-selling category, but conversion never excuses unsupported health or earnings claims.", cards: [{ title: "Use current facts", body: "Quote official product labels, current program terms, and current compensation documents—not memories or social posts." }, { title: "Lead with customers", body: "Ambassador compensation is tied to qualifying product sales under the plan, not simply recruitment." }, { title: "Disclose honestly", body: "Income varies and expenses matter. Never present an incentive as automatic or typical earnings." }, { title: "Serve after the sale", body: "Follow-up, product education, and listening build more trust than pressure or urgency." }] },
      nutrition: { plate: "Pl. II", strip: "Know the value before you share it", columns: [{ heading: "Member value", paragraphs: [{ text: "Members receive 15% off product pricing. Qualifying loyalty orders of $100 or more can build product points over time under current terms." }, { text: "Free shipping thresholds and promotions can change; Candy will confirm the current offer before you order." }] }, { heading: "Ambassador earnings", paragraphs: [{ text: "Qualified Ambassadors can earn customer-sales commissions under tiered current rules." }, { text: "Current Star Club terms include a $50 bonus for each qualifying $500 in first-order product sales from at least three new enrollments, with a possible $25 qualifying Ambassador-paired boost; limits and full rules apply." }] }], image: { driveUrl: "/images/opportunity-phone.jpg" }, ctaLabel: "Get the current program details", ctaUrl: "#contact" },
      opportunity: { ...sharedOpportunity, label: "The Product-Sales Path", heading: "Member savings or\nqualified product-sales income.", bullets: [{ text: "15% Member pricing on product orders." }, { text: "5% to 15% in product points on qualifying loyalty orders over time." }, { text: "Tiered Ambassador customer-sales commissions under current rules." }, { text: "No compensation for weight loss or simply recruiting." }], ambHeading: "Candy helps you build the ethical way", ambBody: "Learn the products, listen for a real customer need, share only supportable claims, and follow through. Candy will also show you the current compensation plan, incentive rules, and income disclosure before you decide.", ambCtaLabel: "Compare the two paths" },
      getStarted: { label: "Start Clearly", plate: "Pl. XIX", heading: "Four steps from personal value to an optional product-sales business.", steps: [{ label: "Choose Member or Ambassador" }, { label: "Use products that fit" }, { label: "Serve real customer needs" }, { label: "Track sales and expenses" }], primaryCta: { label: "Compare my options with Candy", url: "#contact" } },
      contact: { label: "Talk With Candy", plate: "Pl. XXIII", heading: "Do you want savings, product-sales income, or both?", blurb: "Candy will explain the current terms plainly so you can choose without pressure or exaggerated promises.", personas: [{ label: "Member savings only" }, { label: "Ambassador information" }, { label: "Current incentives" }, { label: "Customer-sales coaching" }, { label: "I am still deciding" }], successMessage: "Thank you. Candy will reach out personally." },
      footer: sharedFooter,
    },
  },
};

export function isAudienceKey(value: string): value is AudienceKey {
  return AUDIENCE_KEYS.includes(value as AudienceKey);
}

/** Preserve every non-personalized surface and explicitly freeze About Me. */
export function personalizeHome(home: HomeData, key: AudienceKey): HomeData {
  const profile = AUDIENCES[key];
  return {
    ...home,
    ...profile.content,
    about: home.about,
  };
}
