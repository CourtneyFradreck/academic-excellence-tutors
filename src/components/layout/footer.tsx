import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { navigation, organisation } from "@/data/site";
import { Brand } from "@/components/layout/brand";

export function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.2fr_.7fr_1fr] md:gap-14">
        <div>
          <Brand />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Structured online tutoring. A connected support team. Space to grow
            academically.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider">
            Grades 8–12 · CAPS & IEB
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Explore AET</h2>
          <nav
            aria-label="Footer navigation"
            className="mt-5 grid justify-items-start gap-3 text-sm"
          >
            {navigation.map((link) => (
              <Link key={link.href} href={link.href} className="text-link">
                {link.label}
              </Link>
            ))}
            <Link
              href="/enrol"
              className="text-link inline-flex items-center gap-2"
            >
              Enrol Now
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Let’s talk about learning</h2>
          <div className="mt-5 grid gap-4 text-sm">
            <a href={`mailto:${organisation.email}`} className="contact-link">
              <Mail size={18} aria-hidden="true" />
              <span className="break-all">{organisation.email}</span>
            </a>
            <a href={organisation.phoneHref} className="contact-link">
              <Phone size={18} aria-hidden="true" />
              {organisation.phone}
            </a>
          </div>
          <p className="mt-5 text-sm leading-relaxed">
            Have a question about subjects or enrolment? Get in touch with AET.
          </p>
        </div>
      </div>
      <div className="container-shell flex flex-col justify-between gap-3 border-t border-ink/15 py-6 text-xs sm:flex-row">
        <p>
          © {new Date().getFullYear()} {organisation.name}.
        </p>
        <p>Inspiring excellence, one lesson at a time.</p>
      </div>
    </footer>
  );
}
