"use client";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionAllowed } from "./useMotionAllowed";
import "./ScrollReveal.css";
gsap.registerPlugin(ScrollTrigger);
interface Props {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}
export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.2,
  baseRotation = 1,
  blurStrength = 3,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const allowed = useMotionAllowed();
  useEffect(() => {
    if (!allowed || !ref.current) return;
    const el = ref.current;
    const context = gsap.context(() => {
      gsap.fromTo(
        el,
        { rotate: baseRotation, transformOrigin: "0% 50%" },
        {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainerRef?.current ?? window,
            start: "top bottom",
            end: rotationEnd,
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        el.querySelectorAll(".word"),
        {
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : "none",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scroller: scrollContainerRef?.current ?? window,
            start: "top bottom-=15%",
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      );
    }, el);
    return () => context.revert();
  }, [
    allowed,
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    baseRotation,
    blurStrength,
    rotationEnd,
    wordAnimationEnd,
  ]);
  return (
    <h2
      ref={ref}
      className={`scroll-reveal ${containerClassName}`}
      aria-label={typeof children === "string" ? children : undefined}
    >
      <span className={`scroll-reveal-text ${textClassName}`}>
        {typeof children === "string"
          ? children.split(/(\s+)/).map((word, i) =>
              /\s/.test(word) ? (
                word
              ) : (
                <span aria-hidden="true" className="word" key={i}>
                  {word}
                </span>
              ),
            )
          : children}
      </span>
    </h2>
  );
}
