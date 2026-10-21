import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { organisation } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = pageMetadata(
  "Contact Us",
  "Contact Academic Excellence Tutors at academicexcellencetuts@gmail.com or 069 278 5124. Prepare an email enquiry about subjects, tutoring or enrolment.",
  "/contact",
);

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="We’re here to help"
        title="A question is a good place to start."
        green
      >
        <p>
          Want to know more about subjects, online lessons or enrolment? Get in
          touch with Academic Excellence Tutors.
        </p>
      </PageHero>
      <section className="container-shell section-pad grid items-start gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-16">
        <div>
          <p className="eyebrow">Let’s talk</p>
          <h2 className="section-title mt-5">Your next step starts here.</h2>
          <p className="mt-5 max-w-md leading-relaxed">
            Reach AET directly by email or phone, or prepare an email enquiry
            using the form.
          </p>
          <div className="mt-9 grid gap-5">
            <a
              href={`mailto:${organisation.email}`}
              className="flex items-start gap-4 rounded-xl border border-ink/25 p-5 transition-colors hover:bg-brand-blue/15"
            >
              <span className="icon-tile size-11! bg-brand-blue">
                <Mail size={23} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wider">
                  Email AET
                </span>
                <span className="mt-2 block break-all text-sm underline underline-offset-4">
                  {organisation.email}
                </span>
              </span>
            </a>
            <a
              href={organisation.phoneHref}
              className="flex items-start gap-4 rounded-xl border border-ink/25 p-5 transition-colors hover:bg-brand-green/20"
            >
              <span className="icon-tile size-11! bg-brand-yellow">
                <Phone size={23} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wider">
                  Call AET
                </span>
                <span className="mt-2 block text-sm underline underline-offset-4">
                  {organisation.phone}
                </span>
              </span>
            </a>
          </div>
          <div className="mt-9 border-t border-ink/20 pt-7">
            <h3 className="font-medium">Ready to enquire about enrolment?</h3>
            <p className="mt-3 text-sm leading-relaxed">
              Use the enrolment form to include your learner’s grade, curriculum
              and subjects.
            </p>
            <Link
              href="/enrol"
              className="text-link mt-5 inline-flex items-center gap-2 text-sm font-medium"
            >
              Start an enrolment enquiry
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-ink/25 p-6 sm:p-8">
          <h2 className="text-2xl font-medium tracking-tight">
            Prepare an enquiry
          </h2>
          <p className="mb-8 mt-3 text-sm leading-relaxed">
            We’ll prepare an email draft for you to review and send yourself. No
            message is sent by this website.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
