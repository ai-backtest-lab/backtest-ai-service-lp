import type { MetadataRoute } from "next";
import { landingIdentity } from "@/lib/landingContent";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const identity = landingIdentity(process.env);
  return {
    rules: {
      userAgent: "*",
      ...(identity.release ? { allow: "/" } : { disallow: "/" }),
    },
    ...(identity.release ? { sitemap: `${identity.domain}/sitemap.xml` } : {}),
  };
}
