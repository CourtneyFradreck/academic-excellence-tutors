import type { Subject } from "@/data/site";
import { FeatureIcon } from "@/components/ui/feature-icon";

export function SubjectCard({
  subject,
  index,
  headingAs: Heading = "h2",
}: {
  subject: Subject;
  index: number;
  headingAs?: "h2" | "h3";
}) {
  return (
    <article className="subject-card">
      <div className="flex items-start justify-between gap-4">
        <span
          className={`icon-tile ${index % 3 === 0 ? "bg-brand-blue" : index % 3 === 1 ? "bg-brand-yellow" : "bg-brand-green"}`}
        >
          <FeatureIcon name={subject.icon} size={28} />
        </span>
        <span className="text-xs font-medium tracking-wider" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-8 text-xs font-medium uppercase tracking-wider">
        {subject.area}
      </p>
      <Heading className="mb-5 mt-2 text-xl font-medium leading-snug tracking-tight">
        {subject.name}
      </Heading>
      <p className="mt-auto border-t border-ink/15 pt-4 text-sm">
        CAPS & IEB curricula
      </p>
    </article>
  );
}
