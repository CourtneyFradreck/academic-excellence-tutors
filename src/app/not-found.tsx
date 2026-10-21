import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-shell section-pad">
      <p className="eyebrow">Page not found · 404</p>
      <h1 className="hero-title mt-6 max-w-2xl">
        Let’s get you back on track.
      </h1>
      <p className="mb-8 mt-6 max-w-xl leading-relaxed">
        This page may have moved as part of our new website. Explore our
        tutoring services or head back home to find what you need.
      </p>
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/subjects" secondary>
          Explore subjects
        </ButtonLink>
      </div>
    </section>
  );
}
