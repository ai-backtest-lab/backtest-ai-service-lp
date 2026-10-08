"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function LandingMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion:no-preference)", () => {
      el.querySelectorAll("[data-reveal]").forEach((node) =>
        gsap.fromTo(
          node,
          { y: 24, opacity: 1 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 92%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        ),
      );
      const context = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-copy]",
          { y: 20, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
        );
      }, el);
      return () => context.revert();
    });
    let disposed = false;
    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, []);
  return (
    <div ref={ref} className="landing">
      {children}
    </div>
  );
}
