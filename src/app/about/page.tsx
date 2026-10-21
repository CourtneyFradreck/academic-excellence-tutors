import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  UsersRound,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Cta } from "@/components/sections/cta";

export const metadata = pageMetadata(
  "About Us",
  "Meet Academic Excellence Tutors: structured, supportive online tutoring for Grades 8–12, with CAPS and IEB support and involved parents.",
  "/about",
);

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Academic Excellence Tutors"
        title="Academic support, with people at its heart."
      >
        <p>
          AET brings learners, parents and tutors together around one shared
          purpose: supporting each learner’s academic journey.
        </p>
      </PageHero>
      <section className="container-shell section-pad grid gap-10 md:grid-cols-2 md:gap-16">
        <SectionHeading
          eyebrow="Who we are"
          title="A supportive place to keep learning."
        />
        <div className="space-y-5 leading-relaxed">
          <p>
            Academic Excellence Tutors (AET) is an online tutoring platform
            offering structured, high-quality academic support to learners in
            Grades 8–12 under the CAPS and IEB curricula.
          </p>
          <p>
            Our aim is to make academic support welcoming, encouraging and
            purposeful. Through weekly live lessons, examination preparation and
            learning resources, we help learners work towards their academic
            goals.
          </p>
          <p>
            Lessons take place through Microsoft Teams or Google Meet, bringing
            your learning support online.
          </p>
        </div>
      </section>
      <section className="container-shell">
        <div className="rounded-2xl bg-brand-green p-8 md:rounded-3xl md:p-12">
          <SectionHeading
            eyebrow="Our educational approach"
            title="Structure for learning. Space for questions."
          />
          <div className="mt-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                Icon: GraduationCap,
                title: "Grades 8–12",
                text: "Academic support throughout these important school years.",
              },
              {
                Icon: BookOpen,
                title: "CAPS & IEB",
                text: "Tutoring across ten subjects under both curricula.",
              },
              {
                Icon: UsersRound,
                title: "A team around you",
                text: "Every learner is assigned a minimum of two tutors.",
              },
              {
                Icon: HeartHandshake,
                title: "Connected support",
                text: "Parents, learners and tutors stay in touch through a dedicated group chat.",
              },
            ].map(({ Icon, title, text }) => (
              <article key={title}>
                <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-shell section-pad grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="rounded-2xl border border-ink/25 p-8 md:p-10">
          <p className="eyebrow">Parents & guardians</p>
          <h2 className="section-title mt-5">Part of the conversation.</h2>
          <p className="mt-6 leading-relaxed">
            Upon enrolment, AET creates a group chat with the learner, parent or
            guardian, and assigned tutors. It gives parents visibility into
            their child’s academic performance and progress, keeping learner
            support a shared effort.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center">
          <SectionHeading
            eyebrow="A purposeful learning model"
            title="Live lessons. Thoughtful preparation."
          >
            <p>
              Weekly online lessons work alongside structured examination
              preparation, complimentary notes, academic advice and free
              textbooks.
            </p>
            <p className="mt-4">
              Explore the support included in AET’s tutoring service.
            </p>
          </SectionHeading>
          <ButtonLink href="/services" secondary className="mt-7">
            Explore our services
          </ButtonLink>
        </div>
      </section>
      <Cta />
    </>
  );
}
