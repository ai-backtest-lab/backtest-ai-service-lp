import { shot, shotUrl, type ShotId } from "@/lib/media";

/** A real Research Lab screenshot (synthetic market data). */
export function ProductShot({
  id,
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
  showCaption = true,
}: {
  id: ShotId;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
}) {
  const s = shot(id);
  const small = s.files.find((f) => f.width === 1280)!;
  return (
    <figure className="product-shot">
      {/* Static export: files are pre-encoded WebP at two widths, so next/image adds nothing. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shotUrl(id, 1280)}
        srcSet={s.files.map((f) => `${shotUrl(id, f.width)} ${f.width}w`).join(", ")}
        sizes={sizes}
        width={small.width}
        height={small.height}
        alt={s.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      {showCaption && <figcaption>{s.caption}</figcaption>}
    </figure>
  );
}
