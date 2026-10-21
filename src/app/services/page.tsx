import { pageMetadata } from "@/lib/metadata";
import { services } from "@/data/site";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { Journey } from "@/components/sections/journey";
import { Cta } from "@/components/sections/cta";

export const metadata = pageMetadata(
  "Tutoring Services",
  "Discover weekly live online lessons, a minimum of two tutors, exam preparation, free textbooks, academic advice and parent progress visibility at AET.",
  "/services",
);

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="What learning with AET includes"
        title="A little structure. A whole support team."
        green
      >
        <p>
          Weekly teaching, resources and connected support for learners in
          Grades 8–12, under the CAPS and IEB curricula.
        </p>
      </PageHero>
      <section className="container-shell section-pad">
        <SectionHeading
          eyebrow="Our tutoring services"
          title="The support behind your next step."
        />
        <div className="mt-10 grid gap-x-12 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="flex items-start gap-5 border-t border-ink/20 py-8"
            >
              <span
                className={`icon-tile ${index % 3 === 0 ? "bg-brand-blue" : index % 3 === 1 ? "bg-brand-yellow" : "bg-brand-green"}`}
              >
                <FeatureIcon name={service.icon} />
              </span>
              <div>
                <h3 className="text-lg font-medium leading-snug">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="border-y border-ink/15 bg-brand-blue/15">
        <Journey />
      </div>
      <section className="container-shell py-12 md:py-16">
        <div className="max-w-3xl border-l-4 border-brand-yellow pl-6">
          <h2 className="text-xl font-medium">About fees and enrolment</h2>
          <p className="mt-3 leading-relaxed">
            AET issues a quotation or invoice upon enrolment, with fees payable
            upon enrolment. Please discuss your requirements and fees directly
            with AET. The website helps you prepare an enquiry; it does not
            calculate fees, generate invoices or take payments.
          </p>
        </div>
      </section>
      <Cta />
    </>
  );
}
