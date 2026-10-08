import type { MetadataRoute } from "next";
import { landingIdentity } from "@/lib/landingContent";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const identity = landingIdentity(process.env);
  return identity.release
    ? ["/", "/privacy/", "/disclaimer/"].map((path) => ({
        url: identity.domain + path,
      }))
    : [];
}
