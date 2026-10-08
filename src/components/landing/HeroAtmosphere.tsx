"use client";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { useMotionAllowed } from "./effects/useMotionAllowed";
export function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const [Effect, setEffect] = useState<ComponentType<{
    color: string;
    speed: number;
    opacity: number;
    scale: number;
    renderScale: number;
    maxDpr: number;
    targetFps: number;
    iterations: number;
    mouseInteractive: boolean;
  }> | null>(null);
  const [compact, setCompact] = useState(false);
  const allowed = useMotionAllowed();
  useEffect(() => {
    if (!allowed) return;
    let active = true;
    const mq = window.matchMedia("(max-width:767px)");
    const update = () => setCompact(mq.matches);
    mq.addEventListener("change", update);
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const load = () =>
      import("./effects/Plasma").then((module) => {
        if (active) {
          update();
          setEffect(() => module.default);
        }
      });
    document.fonts.ready.then(() => {
      if (!active) return;
      if ("requestIdleCallback" in window)
        idle = window.requestIdleCallback(
          () => {
            if (active) void load();
          },
          { timeout: 1500 },
        );
      else
        timer = setTimeout(() => {
          if (active) void load();
        }, 300);
    });
    return () => {
      active = false;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
      mq.removeEventListener("change", update);
    };
  }, [allowed]);
  return (
    <div ref={ref} className="hero-atmosphere" aria-hidden="true">
      <div className="atmosphere-fallback" />
      {allowed && Effect && (
        <Effect
          color="#77dca5"
          speed={0.35}
          opacity={0.65}
          scale={1.1}
          renderScale={compact ? 0.3 : 0.45}
          maxDpr={compact ? 1 : 1.25}
          targetFps={compact ? 24 : 30}
          iterations={compact ? 24 : 40}
          mouseInteractive={false}
        />
      )}
    </div>
  );
}
