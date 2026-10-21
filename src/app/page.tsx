import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  MessagesSquare,
  UsersRound,
  Video,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { services, subjects, welcomeStatement } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SubjectCard } from "@/components/ui/subject-card";
import { Cta } from "@/components/sections/cta";
import { Journey } from "@/components/sections/journey";

export const metadata = pageMetadata(
  "Online Tutoring for Grades 8–12",
  "Welcome to Academic Excellence Tutors. Explore CAPS and IEB subjects, weekly live online lessons and dedicated learner-parent-tutor support.",
  "/",
);

export default function Home() {
  return (
    <>
      <section className="container-shell pt-5 md:pt-7">
        <div className="grid items-center gap-12 rounded-2xl bg-brand-blue px-7 py-12 sm:px-10 md:rounded-3xl lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:px-14 lg:py-16">
          <div>
            <p className="eyebrow">Online tutoring · Grades 8–12</p>
            <h1 className="hero-title mt-6">Welcome to Academic Excellence</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed md:text-lg">
              A supportive place to learn, ask questions and work towards your
              academic goals. Let’s take your next step together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/enrol">Enrol Now</ButtonLink>
              <ButtonLink href="/subjects" secondary arrow={false}>
                Explore subjects
              </ButtonLink>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm font-medium">
              <Check size={18} aria-hidden="true" />
              CAPS & IEB curricula
            </p>
          </div>
          <aside
            aria-label="Your AET learning support"
            className="learning-sheet mx-auto w-full max-w-md lg:rotate-2"
          >
            <div className="flex items-center justify-between border-b border-ink/20 pb-5">
              <span className="text-xs font-medium uppercase tracking-[.15em]">
                The learning notebook
              </span>
              <BookOpen size={24} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <p className="my-7 text-3xl font-medium leading-[1.15] tracking-[-.04em] sm:text-[2.4rem]">
              Room to ask.
              <br />
              Space to grow.
            </p>
            <div className="grid gap-5">
              <div className="flex items-center gap-4">
                <span className="icon-tile size-11! rounded-full! bg-brand-blue">
                  <Video size={21} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    Weekly live online lessons
                  </p>
                  <p className="mt-1 text-xs">Microsoft Teams or Google Meet</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="icon-tile size-11! rounded-full! bg-brand-yellow">
                  <UsersRound size={21} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    At least two assigned tutors
                  </p>
                  <p className="mt-1 text-xs">
                    A connected learning support team
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="icon-tile size-11! rounded-full! bg-brand-green">
                  <MessagesSquare size={21} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    Parents stay in the loop
                  </p>
                  <p className="mt-1 text-xs">
                    Your dedicated support group chat
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-7 flex items-center justify-between border-t border-ink/20 pt-5 text-xs font-medium">
              <span>LEARNER + PARENT + TUTORS</span>
              <ArrowUpRight size={21} aria-hidden="true" />
            </div>
          </aside>
        </div>
      </section>

      <section className="container-shell section-pad grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="A little about AET"
          title="Learning is a team effort."
        />
        <div>
          <p className="text-base leading-[1.9]">{welcomeStatement}</p>
          <Link
            href="/about"
            className="text-link mt-6 inline-flex items-center gap-2 text-sm font-medium"
          >
            Get to know AET
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-y border-ink/15 bg-brand-green/20">
        <div className="container-shell section-pad">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Support that stays with you"
              title="More than a weekly lesson."
            >
              <p>
                Live teaching, thoughtful preparation and resources to support
                the work you put in.
              </p>
            </SectionHeading>
            <Link
              href="/services"
              className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-medium"
            >
              What’s included
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[services[0], services[1], services[2], services[4]].map(
              (service, index) => (
                <article
                  key={service.title}
                  className="border-t border-ink/30 pt-6"
                >
                  <span
                    className={`icon-tile ${index % 2 ? "bg-brand-yellow" : "bg-white"}`}
                  >
                    <FeatureIcon name={service.icon} />
                  </span>
                  <h3 className="mt-5 text-lg font-medium leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Find your focus"
            title="Your subjects. Your next step."
          >
            <p>
              Explore academic support across ten subjects under the CAPS and
              IEB curricula.
            </p>
          </SectionHeading>
          <Link
            href="/subjects"
            className="text-link inline-flex shrink-0 items-center gap-2 text-sm font-medium"
          >
            View all ten subjects
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[subjects[0], subjects[2], subjects[3], subjects[4]].map(
            (subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                index={index}
                headingAs="h3"
              />
            ),
          )}
        </div>
      </section>

      <section className="container-shell">
        <div className="grid overflow-hidden rounded-2xl border border-ink/20 md:grid-cols-2 md:rounded-3xl">
          <div className="bg-brand-yellow p-8 md:p-12">
            <p className="eyebrow">A connected support system</p>
            <h2 className="section-title mt-5">
              For learners.
              <br />
              With parents.
              <br />
              Together with tutors.
            </h2>
            <p className="mt-6 leading-relaxed">
              You don’t have to navigate academic challenges alone. AET brings
              your support network into the same conversation.
            </p>
          </div>
          <div className="grid gap-7 p-8 md:p-12">
            {[
              [
                "Support from more than one tutor",
                "A minimum of two assigned tutors gives every learner a team to learn with.",
              ],
              [
                "A shared view of progress",
                "A dedicated group chat helps parents stay involved in their child’s academic journey.",
              ],
              [
                "Resources alongside your lessons",
                "Complimentary notes, academic advice and free textbooks support your preparation.",
              ],
            ].map(([title, description]) => (
              <div key={title} className="flex gap-4">
                <Check
                  size={21}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Journey />
      <Cta />
    </>
  );
}
