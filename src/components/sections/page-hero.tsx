import type { ReactNode } from "react";
import { ArrowDownRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  children,
  green = false,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  green?: boolean;
}) {
  return (
    <section className="container-shell pt-5 md:pt-7">
      <div
        className={`page-hero ${green ? "bg-brand-green" : "bg-brand-blue"}`}
      >
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="hero-title mt-5">{title}</h1>
          <div className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
            {children}
          </div>
        </div>
        <ArrowDownRight
          size={72}
          strokeWidth={1}
          className="hidden shrink-0 md:block"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
