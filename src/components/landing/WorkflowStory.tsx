import { Badge } from "@/components/ui/badge";
import { workflow } from "@/lib/landingContent";
import { ResearchPreview } from "./ResearchPreview";
export function WorkflowStory() {
  return (
    <div className="workflow-story">
      <div className="workflow-panels">
        {workflow.map((step, i) => (
          <article key={step.number} className="workflow-panel">
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
  );
}
