"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import TextType from "./effects/TextType";
gsap.registerPlugin(ScrollTrigger);
const sections = [
  [
    "01",
    "Observe",
    "What did the report measure?",
    "Interpret recorded outcomes and reference the metrics supplied by the engine.",
  ],
  [
    "02",
    "Question",
    "What evidence is missing?",
    "Highlight cost assumptions, sample limitations and the uncertainty of historical results.",
  ],
  [
    "03",
    "Test",
    "What should we validate next?",
    "Suggest an out-of-sample or sensitivity experiment. The researcher decides whether to run it.",
  ],
];
export function ClaudeStory() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width:1024px) and (min-height:720px) and (prefers-reduced-motion:no-preference)",
      () => {
        el.dataset.phase = "0";
        ScrollTrigger.create({
          id: "claude-story",
          trigger: el,
          start: "top top+=90",
          end: () => `+=${window.innerHeight * 2}`,
          pin: el.querySelector(".claude-stage"),
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            el.dataset.phase = String(Math.min(2, Math.floor(st.progress * 3)));
          },
        });
        return () => {
          delete el.dataset.phase;
        };
      },
    );
    return () => mm.revert();
  }, []);
  return (
    <div className="claude-story" ref={ref}>
      <div className="claude-stage">
        <div className="report-source">
          <span className="eyebrow">01 / QUANTITATIVE INPUT</span>
          <h3>
            The engine supplies
            <br />
            the evidence.
          </h3>
          <div className="source-fields mono">
            {[
              "strategy_version",
              "historical_window",
              "recorded_costs",
              "risk_metrics",
              "data_limitations",
            ].map((field, i) => (
              <div key={field}>
                <span>{field}</span>
                <span>{i === 4 ? "explicit" : "engine record"}</span>
              </div>
            ))}
          </div>
          <p>
            No exchange keys. No trading authority.
            <br />
            Only the research report and its context.
          </p>
          <span className="source-arrow">→</span>
        </div>
        <div className="ai-report">
          <div className="report-toolbar">
            <span className="report-mark">✳</span>
            <span>Claude research report</span>
            <Badge variant="outline">Planned</Badge>
          </div>
          <p className="report-caption mono">
            ILLUSTRATIVE REPORT · NOT A LIVE AI RESPONSE
          </p>
          <div className="report-intro">
            <TextType
              text="Start with what the evidence supports."
              loop={false}
              typingSpeed={35}
              startOnVisible
            />
          </div>
          {sections.map(([number, title, question, body], i) => (
            <section
              key={title}
              data-report-phase={i}
              className="report-section"
            >
              <div className="report-section-title">
                <span className="mono">{number}</span>
                <h4>{title}</h4>
              </div>
              <strong>{question}</strong>
              <p>{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
