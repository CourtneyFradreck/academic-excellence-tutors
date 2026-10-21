import { journey } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function Journey() {
  return (
    <section className="container-shell section-pad">
      <SectionHeading
        eyebrow="How it works"
        title="A clear path to academic support."
      >
        <p>
          From your first enquiry to your weekly lessons, here’s how you connect
          with AET.
        </p>
      </SectionHeading>
      <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {journey.map((step, index) => (
          <li key={step.title} className="border-t-2 border-ink/25 pt-6">
            <span
              className={`inline-flex size-10 items-center justify-center rounded-full text-sm font-medium ${index % 2 ? "bg-brand-green" : "bg-brand-yellow"}`}
            >
              0{index + 1}
            </span>
            <h3 className="mt-5 text-lg font-medium leading-snug">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
