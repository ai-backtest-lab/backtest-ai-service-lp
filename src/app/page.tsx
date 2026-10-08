import { LandingPage } from "@/components/landing/LandingPage";
import { landingIdentity } from "@/lib/landingContent";
export default function Home() {
  return <LandingPage identity={landingIdentity(process.env)} />;
}
