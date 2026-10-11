import founder from "@/content/founder.json";

export type FounderDecision = Exclude<keyof typeof founder, "_note">;

/** A founder decision, or null while it is still open. */
export function founderValue(key: FounderDecision): string | null {
  const value = founder[key];
  return typeof value === "string" && value.trim() ? value : null;
}

/** Open decisions are shown as drafts in development and omitted from production builds. */
export const isDraftBuild = process.env.NODE_ENV !== "production";
