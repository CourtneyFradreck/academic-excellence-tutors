"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import { Brand } from "@/components/layout/brand";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    const media = window.matchMedia("(min-width: 1024px)");
    function onResize() {
      if (media.matches) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container-shell flex min-h-22 items-center justify-between gap-4">
        <Brand />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/enrol"
            className="button button-primary header-enrol"
            aria-current={pathname === "/enrol" ? "page" : undefined}
          >
            Enrol Now
            <ArrowUpRight
              size={17}
              className="hidden sm:block"
              aria-hidden="true"
            />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="border-t border-ink/15 bg-white lg:hidden"
      >
        <div className="container-shell grid gap-1 py-4">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
              className="nav-link rounded-lg px-3 py-3"
            >
              {link.label}
            </Link>
          ))}
          <p className="px-3 pb-2 pt-4 text-sm">
            Online tutoring · Grades 8–12 · CAPS & IEB
          </p>
        </div>
      </nav>
    </header>
  );
}
