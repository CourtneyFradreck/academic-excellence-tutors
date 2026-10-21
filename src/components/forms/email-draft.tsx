"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Mail } from "lucide-react";
import { mailtoHref } from "@/lib/forms";
import type { EmailDraft } from "@/types/forms";

export function EmailDraftPanel({ draft }: { draft: EmailDraft }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    heading.current?.focus();
  }, []);
  const text = `To: ${draft.to}\nSubject: ${draft.subject}\n\n${draft.body}`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(
        "Email text copied. Paste it into an email addressed to AET and send it yourself.",
      );
    } catch {
      setCopyStatus(
        "Copy is unavailable in this browser. Select and copy the email text below, then paste it into your email app.",
      );
    }
  }
  return (
    <section
      aria-labelledby="draft-title"
      className="mt-9 rounded-xl border-2 border-ink bg-brand-green/20 p-5 sm:p-7"
    >
      <p className="eyebrow">Review your email</p>
      <h2
        id="draft-title"
        ref={heading}
        tabIndex={-1}
        className="mt-4 text-2xl font-medium tracking-tight"
      >
        Your draft is ready to review.
      </h2>
      <p className="mt-4 text-sm leading-relaxed">
        <strong>No enquiry has been sent.</strong> Open your email app, review
        the details and send the email to AET. If your app doesn’t open or the
        full message doesn’t appear, copy the text below instead.
      </p>
      <div className="my-6 flex flex-wrap gap-4">
        <a href={mailtoHref(draft)} className="button button-primary">
          Open email app
          <Mail size={18} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={copy}
          className="button button-secondary"
        >
          Copy email text
          <Copy size={17} aria-hidden="true" />
        </button>
      </div>
      <p role="status" className="mb-4 text-sm leading-relaxed">
        {copyStatus}
      </p>
      <label htmlFor="email-draft-text" className="form-label">
        Email draft
      </label>
      <textarea
        id="email-draft-text"
        className="form-input min-h-72 text-sm! leading-relaxed"
        readOnly
        rows={12}
        value={text}
      />
      <p className="mt-3 text-xs leading-relaxed">
        The website cannot confirm whether your email app opened or whether you
        sent the email. Keep a copy in your sent mail for your records.
      </p>
    </section>
  );
}
