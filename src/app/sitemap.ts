import { landingIdentity } from "@/lib/landingContent";
import { seoSitemap } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap() {
  return seoSitemap(landingIdentity());
}
