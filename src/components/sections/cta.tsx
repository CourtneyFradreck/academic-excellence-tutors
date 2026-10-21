import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function Cta() {
  return (
    <section
      className="container-shell pb-16 md:pb-24"
      aria-labelledby="cta-title"
    >
      <div className="cta-panel">
        <div className="max-w-xl">
          <p className="eyebrow">Your next chapter</p>
          <h2 id="cta-title" className="section-title mt-4">
            Let’s take the next step, together.
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed">
            Tell us where you need support. Start an enrolment enquiry and
            explore what learning with AET could look like.
          </p>
        </div>
        <div className="relative z-1 flex shrink-0 flex-col items-start gap-4">
          <ButtonLink href="/enrol">Enrol Now</ButtonLink>
          <a
            href="/contact"
            className="text-link inline-flex items-center gap-2 text-sm font-medium"
          >
            Have a question?
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
