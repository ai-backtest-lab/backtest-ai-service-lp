import type { Metadata, MetadataRoute } from "next";
import type { LandingIdentity } from "./landingContent";
export interface SeoPage {
  path: string;
  title: string;
  description: string;
  modified?: string;
}
export const homeSeo: SeoPage = {
  path: "/",
  title: "Quantitative Backtesting & AI Research Roadmap",
  description:
    "Private quantitative research for historical crypto backtesting. Claude-powered analysis is planned.",
};
export const privacySeo: SeoPage = {
  path: "/privacy/",
  title: "Privacy Notice",
  description:
    "Read how the AI Backtest Lab public site handles local assets, optional contact email and its planned Claude API integration.",
};
export const disclaimerSeo: SeoPage = {
  path: "/disclaimer/",
  title: "Research Disclaimer",
  description:
    "Understand the limits of historical backtesting, illustrative research views and the planned Claude analysis layer at AI Backtest Lab.",
};
export function publicSeoPages(): SeoPage[] {
  return [homeSeo, privacySeo, disclaimerSeo];
}
export function pageMetadata(
  identity: LandingIdentity,
  page: SeoPage,
): Metadata {
  const title =
    page.path === "/"
      ? `${identity.brand} | ${page.title}`
      : `${page.title} | ${identity.brand}`;
  const url = identity.domain + page.path;
  return {
    metadataBase: new URL(identity.domain),
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/media/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/media/icon-16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/media/icon-180.png", sizes: "180x180", type: "image/png" },
      ],
    },
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: url },
    robots: {
      index: identity.release,
      follow: identity.release,
      googleBot: {
        index: identity.release,
        follow: identity.release,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: identity.brand,
      title,
      description: page.description,
      images: [
        {
          url: "/media/og.png",
          width: 1200,
          height: 630,
          alt: "AI Backtest Lab hero: Backtest with Data. Understand Your Strategy with AI. Claude integration planned.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: ["/media/og.png"],
    },
  };
}
export function seoSitemap(identity: LandingIdentity): MetadataRoute.Sitemap {
  return identity.release
    ? publicSeoPages().map((page) => ({
        url: identity.domain + page.path,
        ...(page.modified ? { lastModified: page.modified } : {}),
      }))
    : [];
}
export function seoRobots(identity: LandingIdentity): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(identity.release ? { sitemap: `${identity.domain}/sitemap.xml` } : {}),
  };
}
export function pageSchema(identity: LandingIdentity, page: SeoPage) {
  const url = identity.domain + page.path;
  const graph: Record<string, unknown>[] = [];
  if (page.path === "/") {
    graph.push({
      "@type": "Organization",
      "@id": identity.domain + "/#organization",
      name: identity.brand,
      url: identity.domain + "/",
      description:
        "An independently developed quantitative trading research project with Claude API analysis planned.",
      logo: {
        "@type": "ImageObject",
        url: identity.domain + "/media/icon-512.png",
        width: 512,
        height: 512,
      },
      email: identity.email,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "general inquiries",
          email: identity.email,
          url: identity.domain + "/#contact",
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: identity.supportEmail,
          url: identity.domain + "/#contact",
        },
      ],
    });
    graph.push({
      "@type": "WebSite",
      "@id": identity.domain + "/#website",
      name: identity.brand,
      url: identity.domain + "/",
      inLanguage: "en",
      publisher: { "@id": identity.domain + "/#organization" },
    });
  }
  graph.push({
    "@type": "WebPage",
    "@id": url + "#webpage",
    url,
    name:
      page.path === "/"
        ? `${identity.brand} | ${page.title}`
        : `${page.title} | ${identity.brand}`,
    description: page.description,
    isPartOf: { "@id": identity.domain + "/#website" },
    inLanguage: "en",
    ...(page.modified ? { dateModified: page.modified } : {}),
    ...(page.path !== "/"
      ? { breadcrumb: { "@id": url + "#breadcrumb" } }
      : {}),
  });
  if (page.path !== "/") {
    const trail = [{ name: identity.brand, url: identity.domain + "/" }];
    trail.push({ name: page.title, url });
    graph.push({
      "@type": "BreadcrumbList",
      "@id": url + "#breadcrumb",
      itemListElement: trail.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
export function serializeSchema(value: unknown) {
  return JSON.stringify(value).replace(
    /</g,
    () => String.fromCharCode(92) + "u003c",
  );
}
