import { Badge } from "@/components/ui/badge";
import { workflow } from "@/lib/landingContent";
import { ResearchPreview } from "./ResearchPreview";
export function WorkflowStory() {
  return (
    <div className="workflow-story">
      <div className="workflow-panels">
        {workflow.map((step) => (
          <article key={step.number} className="workflow-panel">
            <div className="workflow-caption">
              <span className="eyebrow">
                Step {step.number} / Research loop
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <Badge
                variant={"preview" in step ? "outline" : "secondary"}
                className="max-w-full whitespace-normal"
              >
                {step.status}
              </Badge>
            </div>
            {"preview" in step ? (
              <ResearchPreview chapter={step.preview} />
            ) : (
              <div className="workflow-idea">
                <span className="mono">{step.idea.flow}</span>
                <h4>{step.idea.question}</h4>
                <p>{step.idea.body}</p>
                <Badge variant="outline">
                  {step.status.startsWith("Planned")
                    ? "Planned workflow · Concept preview"
                    : "Research workflow · Concept preview"}
                </Badge>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
