import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Backtest Lab",
    short_name: "AI Backtest Lab",
    description:
      "Quantitative backtesting research with Claude-assisted interpretation planned.",
    start_url: "/",
    display: "browser",
    background_color: "#090d0b",
    theme_color: "#090d0b",
    icons: [
      { src: "/media/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/media/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
