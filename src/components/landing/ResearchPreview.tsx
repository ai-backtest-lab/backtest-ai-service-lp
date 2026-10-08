import { Badge } from "@/components/ui/badge";
import {
  Activity,
  CandlestickChart,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
const bars = [
  22, 25, 19, 28, 33, 31, 26, 22, 29, 38, 34, 43, 48, 44, 39, 45, 50, 43, 47,
  53, 57, 52, 61, 66, 62, 56, 63, 68, 65, 72, 76, 71, 80, 84, 78, 85, 91, 86,
];
export function ResearchPreview({ chapter = 0 }: { chapter?: number }) {
  return (
    <div
      className="research-preview"
      aria-label="Illustrative research workspace"
    >
      <div className="preview-toolbar">
        <span>
          <Activity /> Research workspace
        </span>
        <Badge variant="outline">Illustrative preview</Badge>
      </div>
      <div className="preview-meta">
        <span className="mono">
          BTC / USD <ChevronDown />
        </span>
        <span className="mono">Daily research view</span>
        <SlidersHorizontal />
      </div>
      <div className="preview-main">
        <div className="preview-chart">
          <div className="chart-label">
            <CandlestickChart /> Historical price context
          </div>
          <div className="candles" aria-hidden="true">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`candle ${i % 4 === 2 ? "candle-down" : ""}`}
                style={{
                  left: `${(i / (bars.length - 1)) * 95}%`,
                  height: `${14 + ((i * 7) % 20)}px`,
                  bottom: `${h * 0.7}%`,
                }}
              />
            ))}
          </div>
          <div className="chart-axis mono">
            <span>Historical window</span>
            <span>Closed candles</span>
            <span>Research only</span>
          </div>
        </div>
        <div className="preview-sidebar">
          <span className="eyebrow">RESEARCH CONTROLS</span>
          <span>Strategy hypothesis</span>
          <strong>Trend & breakout</strong>
          <span>Result assumptions</span>
          <strong>Costs · Data · Window</strong>
          <span>AI interpretation</span>
          <Badge variant="secondary">Claude · Planned</Badge>
          <div className="preview-note">
            Numbers come from the engine.
            <br />
            Questions come next.
          </div>
        </div>
      </div>
      <div className="preview-bottom mono">
        <span className="status-dot" />
        <span>
          {chapter === 0
            ? "Define the hypothesis"
            : chapter < 3
              ? "Inspect the evidence"
              : "Plan the next experiment"}
        </span>
        <span>Not simulated performance</span>
      </div>
    </div>
  );
}
