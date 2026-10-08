import { LandingPage } from "@/components/landing/LandingPage";
import { landingIdentity } from "@/lib/landingContent";
import { StructuredData } from "@/components/StructuredData";
import { homeSeo } from "@/lib/seo";
export default function Home() {
  const identity = landingIdentity();
  return (
    <>
      <StructuredData identity={identity} page={homeSeo} />
      <LandingPage identity={identity} />
    </>
  );
}
