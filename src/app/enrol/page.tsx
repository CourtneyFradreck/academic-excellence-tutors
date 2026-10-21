import { BookOpen, Mail, Phone, UsersRound } from "lucide-react";
import { organisation } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/page-hero";
import { EnrolmentForm } from "@/components/forms/enrolment-form";

export const metadata = pageMetadata(
  "Enrolment",
  "Start an AET enrolment enquiry for Grades 8–12. Choose CAPS or IEB subjects and prepare an email to discuss tutoring with Academic Excellence Tutors.",
  "/enrol",
);

export default function Enrol() {
  return (
    <>
      <PageHero
        eyebrow="Take your next step"
        title="Let’s start your learning journey."
      >
        <p>
          Tell us about the learner and the support you’re looking for. This
          form prepares an enrolment enquiry to send from your own email app.
        </p>
      </PageHero>
      <section
        className="container-shell section-pad grid items-start gap-12 lg:grid-cols-[1fr_300px] lg:gap-16"
        aria-label="Enrolment enquiry"
      >
        <EnrolmentForm />
        <aside className="grid gap-7 lg:sticky lg:top-28">
          <div className="rounded-xl border border-ink/25 bg-brand-green p-7">
            <p className="eyebrow">Learning with AET</p>
            <h2 className="mt-5 text-2xl font-medium tracking-tight">
              Support starts with a conversation.
            </h2>
            <ul className="mt-6 grid gap-5 text-sm">
              <li className="flex items-start gap-3">
                <UsersRound size={20} className="shrink-0" aria-hidden="true" />
                At least two assigned tutors per learner
              </li>
              <li className="flex items-start gap-3">
                <BookOpen size={20} className="shrink-0" aria-hidden="true" />
                Weekly lessons, exam preparation and learning resources
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-ink/25 p-7">
            <h2 className="font-medium">What happens next?</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Review your draft, then open your email app and send it to AET.
              Your enquiry is only sent when you send that email.
            </p>
            <h3 className="mt-6 font-medium">Quotations & invoices</h3>
            <p className="mt-3 text-sm leading-relaxed">
              Discuss enrolment and fees directly with AET. A quotation or
              invoice is issued upon enrolment; this page does not calculate
              fees or generate an invoice.
            </p>
          </div>
          <div className="px-1">
            <h2 className="font-medium">Prefer to get in touch?</h2>
            <a
              href={`mailto:${organisation.email}`}
              className="contact-link mt-4 text-sm"
            >
              <Mail size={18} aria-hidden="true" />
              <span className="break-all">{organisation.email}</span>
            </a>
            <a
              href={organisation.phoneHref}
              className="contact-link mt-4 text-sm"
            >
              <Phone size={18} aria-hidden="true" />
              {organisation.phone}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
