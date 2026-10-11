import { isDraftBuild } from "@/lib/founder";

/** Development-only reminder for an open founder decision; production builds render nothing. */
export function FounderPending({ decision }: { decision: string }) {
  if (!isDraftBuild) return null;
  return <p className="founder-pending">Draft only · founder decision pending: {decision}</p>;
}
