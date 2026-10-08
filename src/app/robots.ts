import { landingIdentity } from "@/lib/landingContent";
import { seoRobots } from "@/lib/seo";
export const dynamic = "force-static";
export default function robots() {
  return seoRobots(landingIdentity());
}
