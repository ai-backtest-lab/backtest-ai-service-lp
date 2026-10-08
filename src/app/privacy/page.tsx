import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy/" },
};
export default function Privacy() {
  return (
    <main className="legal-page">
      <Link href="/">← AI Backtest Lab</Link>
      <h1>Privacy notice</h1>
      <p>
        This website introduces the AI Backtest Lab research project. It does
        not provide account registration, trading controls, a public AI endpoint
        or a waitlist submission form.
      </p>
      <p>
        This version uses locally bundled fonts and assets. It does not include
        third-party analytics or marketing trackers. A hosting provider may
        process ordinary request metadata when the site is deployed;
        deployment-specific details will be added before public launch.
      </p>
      <p>
        If a founder contact email is configured, opening its link uses your
        email application. Any information you choose to send is handled through
        the founder’s email provider. Contact configuration and the applicable
        retention details must be verified before opening early access.
      </p>
      <p>
        Claude API integration is planned. This public website does not send
        visitor input or trading data to Anthropic.
      </p>
      <p>Updated October 8, 2026.</p>
    </main>
  );
}
