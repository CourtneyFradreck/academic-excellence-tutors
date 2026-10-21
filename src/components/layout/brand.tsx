import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link
      href="/"
      className="brand-link"
      aria-label="Academic Excellence Tutors — home"
    >
      <span className="brand-emblem" aria-hidden="true">
        <Image
          src="/brand/aet-logo.jpg"
          alt=""
          width={156}
          height={156}
          sizes="156px"
          preload
        />
      </span>
      <span className="max-w-[110px] text-xs font-semibold leading-[1.25] tracking-tight sm:max-w-none sm:text-base">
        Academic Excellence{" "}
        <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-[.22em]">
          Tutors
        </span>
      </span>
    </Link>
  );
}
