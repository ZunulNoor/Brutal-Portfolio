/**
 * Project content — single typed source of truth for the index,
 * home "selected work", and case-study routes (AGENTS.md §6).
 * Every claim below traces to the supplied resume/portfolio document.
 */

export type ProjectKind = "professional" | "independent";

export type Project = {
  slug: string;
  /** Display number, e.g. "01". */
  no: string;
  title: string;
  tagline: string;
  /** Product type, e.g. "Production logistics SaaS". */
  type: string;
  kind: ProjectKind;
  kindLabel: string;
  /** Employer or context, where the source names one. */
  org?: string;
  role: string;
  stack: string[];
  url: string;
  urlLabel: string;
  featured?: boolean;
  context: string[];
  responsibilities: string[];
  implementation: string[];
  challenges?: string[];
  outcomes: string[];
  /** Distinct visual treatment per project, inside the shared system. */
  accent: {
    tone: "ink" | "paper" | "signal";
    motif: "grid" | "hatch" | "dots" | "bars";
  };
};

export const projects: Project[] = [
  {
    slug: "shipox",
    no: "01",
    title: "Shipox",
    tagline:
      "Maintaining and enhancing the dashboard of a delivery-management SaaS serving logistics businesses across KSA and European markets.",
    type: "Production logistics SaaS",
    kind: "professional",
    kindLabel: "Professional",
    org: "Zip24",
    role: "Frontend Engineer — dashboard maintenance & enhancement",
    stack: ["React.js", "MUI", "React Query", "Google Maps", "JavaScript"],
    url: "https://shipox.com/",
    urlLabel: "shipox.com",
    featured: true,
    context: [
      "Shipox is a delivery-management platform used by logistics businesses to run orders, dispatch operations, drivers, fleet activity, tracking, analytics, and cash-on-delivery workflows.",
      "The platform connects order intake with dispatch, route optimization, driver operations, delivery confirmation, and operational reporting — so the dashboard is where the business actually runs.",
    ],
    responsibilities: [
      "Maintain and enhance production dashboard interfaces across multiple customer configurations.",
      "Fix production UI and logic issues in live logistics workflows.",
      "Implement new client-driven features while preserving existing business workflows.",
      "Integrate APIs for pagination, search, filtering, reporting, and operational data.",
      "Work with Google Maps-based functionality and map interaction flows.",
      "Collaborate with backend engineers and designers to deliver and maintain production features.",
    ],
    implementation: [
      "Order, driver, hub/warehouse, route, reporting, and role-based dashboard experiences.",
      "API-driven data flows for operational lists: pagination, search, filtering, and reporting views.",
      "Map-based operational views tying orders, drivers, and routes to geography.",
      "Client-driven functionality added behind the existing workflow structure, not over it.",
    ],
    challenges: [
      "Multiple customer configurations share one dashboard codebase — new functionality must land without breaking any existing business workflow.",
      "Production issues arrive from live operations, so fixes are triaged and scoped against real dispatch and delivery activity.",
    ],
    outcomes: [
      "Ongoing production contribution to a complex logistics product used across international markets.",
      "Practice in the maintenance discipline: read the existing system first, change it surgically, and verify against real workflows.",
    ],
    accent: { tone: "ink", motif: "grid" },
  },
  {
    slug: "udrive",
    no: "02",
    title: "Udrive",
    tagline:
      "Figma-to-interface implementation for a car-sharing platform, including booking and map-related user flows.",
    type: "Car-sharing / vehicle-rental platform",
    kind: "professional",
    kindLabel: "Professional",
    role: "Frontend development — responsive UI & map flows",
    stack: ["React.js", "Next.js", "MUI", "Mapbox", "Google Maps"],
    url: "https://udrive.ae/en",
    urlLabel: "udrive.ae",
    featured: true,
    context: [
      "Udrive is a car-sharing and rental service offering vehicles that can be rented from minutes to months through its platform.",
      "The public website presents vehicle access, booking-oriented journeys, and the broader car-sharing service.",
    ],
    responsibilities: [
      "Convert Figma designs into responsive, production-ready interfaces.",
      "Build frontend screens with React/Next.js and Material UI.",
      "Implement map and geolocation-related experiences with Mapbox and Google Maps.",
      "Work on location-aware booking and customer interaction flows.",
    ],
    implementation: [
      "Design-faithful responsive screens composed from reusable MUI-based interface patterns.",
      "Booking journeys connected to location state: pickup context, map display, and customer interaction steps.",
      "Map provider usage split by experience — Mapbox and Google Maps where each fits the flow.",
    ],
    outcomes: [
      "Shipped responsive marketing and booking surfaces for an international consumer platform.",
      "Reinforced a Figma-to-production workflow: match the design, then make it behave on every viewport.",
    ],
    accent: { tone: "paper", motif: "bars" },
  },
  {
    slug: "tasarr",
    no: "03",
    title: "Tasarr",
    tagline:
      "Frontend work on cross-border logistics between the UAE and Pakistan — order, shipment, and tracking workflows.",
    type: "Cross-border logistics platform",
    kind: "professional",
    kindLabel: "Professional",
    role: "Frontend development — dashboard & workflow UI",
    stack: ["React", "Next.js", "Dashboard UI", "REST APIs"],
    url: "https://tasarr.com/",
    urlLabel: "tasarr.com",
    context: [
      "Tasarr provides technology-powered cross-border delivery between the UAE and Pakistan, covering order tracking, shipment consolidation, customs handling, and last-mile delivery.",
      "Its platform gives merchants, shoppers, and delivery operations order management, live tracking, analytics, and operational visibility.",
    ],
    responsibilities: [
      "Work on interfaces for order and shipment management workflows.",
      "Support dashboard experiences involving tracking, operational data, and logistics status.",
      "Work with API-driven frontend flows and business-focused UI requirements.",
    ],
    implementation: [
      "Dashboard-style workflows presenting shipment state, tracking events, and operational data.",
      "API-driven frontend flows shaped by the needs of merchants and delivery operations.",
    ],
    outcomes: [
      "Contributed frontend work to a product connecting cross-border commerce stakeholders.",
      "Further practice in logistics-domain UI: status, tracking, and operational clarity first.",
    ],
    accent: { tone: "paper", motif: "hatch" },
  },
  {
    slug: "thena-law",
    no: "04",
    title: "THENA Law",
    tagline:
      "Responsive interface implementation for a legal-services website with structured, sectioned content.",
    type: "Legal-services website",
    kind: "professional",
    kindLabel: "Professional",
    role: "Frontend implementation — responsive UI",
    stack: ["Responsive frontend", "Structured layouts", "Reusable sections"],
    url: "https://site.thenalaw.com/",
    urlLabel: "site.thenalaw.com",
    context: [
      "THENA Law's web presence communicates the firm's services, expertise, and business information through a structured corporate website.",
      "Professional-services content demands clean information hierarchy and navigation visitors can trust.",
    ],
    responsibilities: [
      "Implement responsive layouts for professional-service content.",
      "Translate design requirements into reusable frontend sections.",
      "Keep information hierarchy clean and navigation straightforward.",
    ],
    implementation: [
      "Sectioned page architecture with consistent spacing and type rhythm across viewports.",
      "Reusable content sections that keep service and firm information uniformly presented.",
    ],
    outcomes: [
      "Delivered a responsive corporate site where structure and readability carry the design.",
    ],
    accent: { tone: "paper", motif: "dots" },
  },
  {
    slug: "emg",
    no: "05",
    title: "EMG",
    tagline:
      "Responsive frontend implementation for an enterprise-facing web project in the Zip24 ecosystem.",
    type: "Enterprise-facing web project",
    kind: "professional",
    kindLabel: "Professional",
    org: "Zip24",
    role: "Frontend implementation — interface development",
    stack: ["Responsive frontend", "Reusable UI patterns"],
    url: "https://emg.zip24.com/",
    urlLabel: "emg.zip24.com",
    context: [
      "EMG is an enterprise-facing web project within the Zip24 ecosystem, presented as a dedicated live web experience.",
      "Enterprise audiences expect production-ready presentation and consistent behavior across devices.",
    ],
    responsibilities: [
      "Develop and maintain responsive web UI.",
      "Implement structured page sections and reusable interface patterns.",
      "Hold production-ready presentation and cross-device usability.",
    ],
    implementation: [
      "Pattern-based sections composed into a coherent enterprise page system.",
      "Responsive behavior treated as a requirement, not a breakpoint afterthought.",
    ],
    outcomes: [
      "Shipped and maintained an enterprise surface inside a larger product ecosystem.",
    ],
    accent: { tone: "ink", motif: "bars" },
  },
  {
    slug: "etech-solutions",
    no: "06",
    title: "E-Tech Solutions",
    tagline:
      "Corporate website and web-application work for a Pakistan-based software house, spanning frontend and backend.",
    type: "Corporate website & web applications",
    kind: "professional",
    kindLabel: "Professional",
    org: "E-Tech Solutions",
    role: "Full-Stack / Web Developer",
    stack: ["React", "Next.js", "WordPress", "JavaScript", "Node.js", "MySQL", "Firebase"],
    url: "https://etspk.net/",
    urlLabel: "etspk.net",
    context: [
      "E-Tech Solutions is a Pakistan-based software house offering software development, custom and WordPress websites, mobile applications, CRM, hosting, and digital services.",
      "The engagement covered business website interfaces alongside application functionality with backend support.",
    ],
    responsibilities: [
      "Build and maintain business website interfaces and web experiences.",
      "Work on CRM-style functionality and web application flows.",
      "Support backend functionality across Node.js, MySQL, and Firebase-backed features.",
    ],
    implementation: [
      "React/Next.js and WordPress interfaces depending on the surface, with responsive UI throughout.",
      "Application flows backed by Node.js services, MySQL data, and Firebase media uploads.",
      "Deployment environments handled as part of delivery, not an afterthought.",
    ],
    outcomes: [
      "Full-stack delivery experience across marketing surfaces, application flows, and supporting backends.",
    ],
    accent: { tone: "paper", motif: "grid" },
  },
  {
    slug: "healthcare-risk-prediction",
    no: "07",
    title: "Healthcare Risk Prediction",
    tagline:
      "An independent machine-learning web app that predicts diabetes risk from 21 lifestyle and health inputs.",
    type: "Machine-learning application",
    kind: "independent",
    kindLabel: "Independent",
    role: "Sole developer — model integration & interface",
    stack: ["Python", "Streamlit", "XGBoost"],
    url: "https://healthcareriskpridiction-zunulnoor.streamlit.app/",
    urlLabel: "Streamlit app",
    context: [
      "A deployed machine-learning web application that exposes a healthcare risk-prediction workflow through an interactive browser interface.",
      "The project demonstrates the full path from machine-learning logic to a usable web product: trained classifier, real-time inference, and results a non-technical user can act on.",
    ],
    responsibilities: [
      "Train and integrate an XGBoost classifier on 21 lifestyle, health-history, and demographic features.",
      "Build the interactive Streamlit frontend around the prediction workflow.",
      "Implement a personalized recommendation engine alongside the prediction output.",
      "Deploy the application on Streamlit Cloud.",
    ],
    implementation: [
      "XGBoost classifier reporting approximately 86% accuracy — the share of correct predictions on the evaluation data — with ROC AUC above 0.82, meaning the model discriminates well between risk classes.",
      "21-feature input workflow feeding real-time inference with immediate result display.",
      "Recommendation engine translating model output into personalized guidance.",
    ],
    challenges: [
      "Machine-learning output is only useful if the interface earns trust: inputs must be clear, results legible, and recommendations framed as guidance, not diagnosis.",
    ],
    outcomes: [
      "A live ML application connecting model-driven logic to user inputs and displayed results.",
      "Working evidence of the React-to-Python range: the same engineer who maintains SaaS dashboards can ship model-backed products.",
    ],
    accent: { tone: "signal", motif: "dots" },
  },
  {
    slug: "zipped-docs",
    no: "08",
    title: "Zipped Docs",
    tagline:
      "An independently developed WordPress documentation plugin, published on the WordPress Plugin Directory.",
    type: "Published WordPress plugin",
    kind: "independent",
    kindLabel: "Independent",
    role: "Sole developer — architecture, UI, security & publication",
    stack: ["WordPress", "PHP", "JavaScript", "REST API", "Gutenberg"],
    url: "https://wordpress.org/plugins/zipped-docs/",
    urlLabel: "wordpress.org plugin",
    featured: true,
    context: [
      "Zipped Docs turns WordPress into a full-featured documentation platform for product docs, knowledge bases, help centers, and developer documentation.",
      "It began as internal tooling at Zip24 — migrating the team's documentation off Notion — and was then refined and published publicly on the WordPress Plugin Directory.",
    ],
    responsibilities: [
      "Design the documentation content architecture: dedicated post types and hierarchical categories.",
      "Build the reading experience: navigation rail, chapter engine, hierarchical table of contents, scroll-spy, breadcrumbs, and previous/next navigation.",
      "Implement instant client-side search with REST API fallback and in-content highlighting.",
      "Ship configurable settings, shortcode support, Gutenberg compatibility, and REST endpoints.",
      "Harden the plugin for public release and publish it on WordPress.org.",
    ],
    implementation: [
      "A precomputed documentation graph that reduces repeated dynamic queries.",
      "Search layered for speed and resilience: instant client-side results with a REST API fallback.",
      "Settings and shortcodes that let site owners shape the docs experience without code.",
      "Security hardening throughout: nonce protection, input validation, sanitization, output escaping, and cleanup controls.",
    ],
    challenges: [
      "Internal tooling and public product have different bars — publication required compatibility, settings surfaces, and security review beyond what an internal plugin needs.",
      "Documentation UX lives in the details: scroll-spy accuracy, search relevance, and navigation state must all stay correct as content grows.",
    ],
    outcomes: [
      "A publicly listed WordPress.org plugin: independent architecture, UI, security, and release work, end to end.",
      "Proof of product thinking — an internal migration need developed into a releasable tool.",
    ],
    accent: { tone: "ink", motif: "hatch" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);
