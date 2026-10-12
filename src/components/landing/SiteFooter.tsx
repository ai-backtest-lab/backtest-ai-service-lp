import Link from "next/link";
import {
  demoRepoUrl,
  demoUrl,
  founderGithubUrl,
  githubOrgUrl,
  type LandingIdentity,
} from "@/lib/landingContent";
export function SiteFooter({ identity }: { identity: LandingIdentity }) {
  return (
        <footer className="site-footer section-shell">
          <Link className="brand" href="/#top">
            <span className="brand-symbol">
              ai<span>↗</span>
            </span>
            <span>AI Backtest Lab</span>
          </Link>
          <p>Private quantitative research. AI analysis planned.</p>
          <div className="footer-contact">
            <a href={`mailto:${identity.email}`}>
              <span>Founder</span>
              {identity.email}
            </a>
            <a href={`mailto:${identity.supportEmail}`}>
              <span>Support</span>
              {identity.supportEmail}
            </a>
          </div>
          <nav aria-label="Legal navigation">
            <a href={demoUrl}>Interactive demo</a>
            <a href="/product/">Product</a>
            <a href={githubOrgUrl}>GitHub organization</a>
            <a href={founderGithubUrl}>Founder GitHub</a>
            <a href={demoRepoUrl}>Demo source</a>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="/disclaimer/">Research disclaimer</a>
            <a href="/media/react-bits-license.txt">Component notices</a>
            <span>© 2026 AI Backtest Lab</span>
          </nav>
        </footer>
  );
}
