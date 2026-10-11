import media from "@/content/media.json";

export type ShotId = (typeof media.screenshots)[number]["id"];
export type Shot = (typeof media.screenshots)[number];

export const mediaLabel = media.label;
export const productVideo = media.video;

export function shot(id: ShotId): Shot {
  const found = media.screenshots.find((s) => s.id === id);
  if (!found) throw new Error(`unknown product screenshot: ${id}`);
  return found;
}

export const shotUrl = (id: ShotId, width: number) => `/media/product/${id}-${width}.webp`;
