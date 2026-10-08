import { pageSchema, serializeSchema, type SeoPage } from "@/lib/seo";
import type { LandingIdentity } from "@/lib/landingContent";
export function StructuredData({
  identity,
  page,
}: {
  identity: LandingIdentity;
  page: SeoPage;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeSchema(pageSchema(identity, page)),
      }}
    />
  );
}
