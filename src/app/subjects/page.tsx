import { BookOpen, Check } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { subjects } from "@/data/site";
import { PageHero } from "@/components/sections/page-hero";
import { SubjectCard } from "@/components/ui/subject-card";
import { Cta } from "@/components/sections/cta";

export const metadata = pageMetadata(
  "Subjects",
  "Explore all ten AET tutoring subjects, including Mathematics, Sciences, languages and commerce, under CAPS and IEB for Grades 8–12.",
  "/subjects",
);

export default function Subjects() {
  return (
    <>
      <PageHero
        eyebrow="Find your focus"
        title="Support for the subjects that matter to you."
      >
        <p>
          From numbers and science to languages and business, explore all ten
          subjects offered by Academic Excellence Tutors.
        </p>
      </PageHero>
      <section
        className="container-shell section-pad"
        aria-label="All tutoring subjects"
      >
        <div className="mb-9 flex flex-col justify-between gap-4 border-b border-ink/20 pb-6 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-sm font-medium">
            <BookOpen size={20} aria-hidden="true" />
            Ten subjects. One connected support team.
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Check size={18} aria-hidden="true" />
            CAPS & IEB · Grades 8–12
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => (
            <SubjectCard key={subject.id} subject={subject} index={index} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed">
          Not sure where to start? Tell AET which subjects you need help with
          when you prepare your enrolment enquiry.
        </p>
      </section>
      <Cta />
    </>
  );
}
