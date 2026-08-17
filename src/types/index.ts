export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  id?: string;
  slug: string;
  index: string;
  title: string;
  promise: string;
  bullets: string[];
  description: string;
  faqs: Faq[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export interface LocationModel {
  id: string;
  slug: string;
  name: string;
  region?: string | null;
  isActive: boolean;
}

export interface ServiceLocationModel {
  id: string;
  serviceId: string;
  locationId: string;
  customIntro?: string | null;
  published: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
  service: Service;
  location: LocationModel;
}

export interface CaseStudy {
  id?: string;
  slug: string;
  client: string;
  category: string;
  summary: string;
  resultLabel: string;
  variant: "interiors" | "fitness" | "ecommerce";
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export interface Testimonial {
  id?: string;
  quote: string;
  name: string;
  role: string;
  published?: boolean;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  lottie: string;
}

export interface Metric {
  value: number;
  suffix: string;
  label: string;
}

export type BlogBlockType = "h2" | "h3" | "paragraph" | "list";

export interface BlogBlockModel {
  id: string;
  postId: string;
  type: BlogBlockType;
  text?: string | null;
  items: string[];
  order: number;
}

export interface Post {
  id?: string;
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  category: string;
  status?: "draft" | "published";
  blocks: BlogBlockModel[];
  content?: any[];
  faqs: Faq[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id?: string;
  slug: string;
  name: string;
  category: string;
  price: number | null;
  originalPrice: number | null;
  description: string;
  features: string[];
  specs: ProductSpec[];
  benefits: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalOverride?: string | null;
  noIndex?: boolean;
}

export interface SiteSettingsModel {
  id: string;
  name: string;
  tagline: string;
  eyebrow: string;
  phone: string;
  phoneHref: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  gst: string;
  businessHours: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutIntro: string;
  mission: string;
  vision: string;
  clients: string[];
  whyChooseUs: { title: string; description: string }[];
  metricItems: Metric[];
}
