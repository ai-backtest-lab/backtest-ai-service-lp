"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { workflow } from "@/lib/landingContent";
import { ResearchPreview } from "./ResearchPreview";
gsap.registerPlugin(ScrollTrigger);
export function WorkflowStory() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 1024px) and (min-height:720px) and (prefers-reduced-motion:no-preference)",
      () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-chapter]", el);
        const initialStyles = panels.map((panel) =>
          panel.getAttribute("style"),
        );
        const buttons = gsap.utils.toArray<HTMLButtonElement>(
          "[data-chapter-button]",
          el,
        );
        let active = 0;
        let initialized = false;
        const show = (i: number) => {
          active = i;
          panels.forEach((p, j) => {
            gsap.to(p, {
              autoAlpha: j === i ? 1 : 0,
              y: j === i ? 0 : 18,
              duration: initialized ? 0.35 : 0,
              overwrite: true,
            });
            p.inert = j !== i;
          });
          buttons.forEach((b, j) => {
            b.dataset.active = String(j === i);
            b.setAttribute("aria-pressed", String(j === i));
          });
          el.dataset.activeChapter = String(i);
          initialized = true;
        };
        show(0);
        const st = ScrollTrigger.create({
          id: "product-story",
          trigger: el,
          start: "top top+=76",
          end: () => `+=${Math.round(window.innerHeight * 3.2)}`,
          pin: el.querySelector(".workflow-stage"),
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(5, Math.floor(self.progress * 6));
            if (i !== active) show(i);
          },
        });
        const onClick = (event: Event) => {
          const button = (event.target as Element).closest<HTMLButtonElement>(
            "[data-chapter-button]",
          );
          if (!button) return;
          const i = Number(button.dataset.chapterButton);
          window.scrollTo({
            top: st.start + ((i + 0.1) / 6) * (st.end - st.start),
            behavior: "instant",
          });
          show(i);
        };
        el.addEventListener("click", onClick);
        return () => {
          el.removeEventListener("click", onClick);
          gsap.killTweensOf(panels);
          panels.forEach((p, index) => {
            p.inert = false;
            const original = initialStyles[index];
            if (original === null) p.removeAttribute("style");
            else p.setAttribute("style", original);
          });
          el.removeAttribute("data-active-chapter");
        };
      },
      ref,
    );
    return () => media.revert();
  }, []);
  return (
    <div className="workflow-story" ref={ref}>
      <div className="workflow-stage">
        <div
          className="chapter-navigation"
          aria-label="Research workflow steps"
        >
          {workflow.map((step, i) => (
            <button
              key={step.number}
              data-chapter-button={i}
              aria-pressed={i === 0}
            >
              <span className="mono">{step.number}</span>
              {step.title}
            </button>
          ))}
        </div>
        <div className="workflow-panels">
          {workflow.map((step, i) => (
            <article data-chapter key={step.number} className="workflow-panel">
              <div className="workflow-caption">
                <span className="eyebrow">
                  STEP {step.number} / RESEARCH LOOP
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <Badge variant={i < 3 ? "outline" : "secondary"}>
                  {step.status}
                </Badge>
              </div>
              {i < 3 ? (
                <ResearchPreview chapter={i} />
              ) : (
                <div className="workflow-idea">
                  <span className="mono">
                    {i === 3
                      ? "REPORT → INTERPRETATION"
                      : i === 4
                        ? "OBSERVATION → HYPOTHESIS"
                        : "HYPOTHESIS → NEW TEST"}
                  </span>
                  <h4>
                    {i === 3
                      ? "What does the evidence actually say?"
                      : i === 4
                        ? "What deserves another test?"
                        : "One answer. A better question."}
                  </h4>
                  <p>
                    {i === 3
                      ? "Claude will read the supplied report, identify limitations and explain the metrics used."
                      : i === 4
                        ? "A suggested test remains a hypothesis until a quantitative experiment validates it."
                        : "The researcher chooses the next experiment. AI has no authority to run or trade automatically."}
                  </p>
                  <Badge variant="outline">
                    Planned workflow · Concept preview
                  </Badge>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
