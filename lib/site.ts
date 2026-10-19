export const site = {
  name: "Zun Ul Noor",
  role: "Frontend Engineer / Full-Stack Developer",
  location: "Karachi, Pakistan",
  tagline: "I build digital systems.",
  bookingUrl: "https://cal.com/zun-ul-noor",
  email: "zunnoor46@gmail.com",
  phone: "+92 309 7473629",
  linkedin: "https://linkedin.com/in/zun-ul-noor",
  github: "https://github.com/ZunulNoor",
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export function canonical(path: string): string | undefined {
  if (!siteUrl) return undefined;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/$/, "")}${clean}`;
}

export type NavItem = { href: string; label: string };

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];
