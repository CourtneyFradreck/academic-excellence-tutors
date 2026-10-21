import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  secondary = false,
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
    >
      {children}
      {arrow && <ArrowUpRight size={18} aria-hidden="true" />}
    </Link>
  );
}
