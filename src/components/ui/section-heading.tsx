import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {children && (
        <div className="mt-5 text-base leading-relaxed md:text-lg">
          {children}
        </div>
      )}
    </div>
  );
}
