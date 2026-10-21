"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { contactDraft, readContact, validateContact } from "@/lib/forms";
import type { ContactValues, EmailDraft, FormErrors } from "@/types/forms";
import { EmailDraftPanel } from "@/components/forms/email-draft";
import {
  ErrorSummary,
  focusFirstError,
  FormField,
  FormNotice,
  useFormReady,
} from "@/components/forms/form-ui";

export function ContactForm() {
  const ready = useFormReady();
  const [errors, setErrors] = useState<FormErrors<ContactValues>>({});
  const [attempted, setAttempted] = useState(false);
  const [draft, setDraft] = useState<EmailDraft | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readContact(new FormData(event.currentTarget));
    const nextErrors = validateContact(values);
    setAttempted(true);
    setErrors(nextErrors);
    setDraft(null);
    if (Object.keys(nextErrors).length) {
      focusFirstError(event.currentTarget, nextErrors);
      return;
    }
    setDraft(contactDraft(values));
  }
  function change(event: FormEvent<HTMLFormElement>) {
    setDraft(null);
    if (attempted)
      setErrors(
        validateContact(readContact(new FormData(event.currentTarget))),
      );
  }
  return (
    <div>
      <ErrorSummary errors={errors} />
      <form
        noValidate
        onSubmit={submit}
        onChange={change}
        aria-label="Contact enquiry form"
      >
        <fieldset disabled={!ready} className="min-w-0 space-y-6">
          <legend className="sr-only">Your contact enquiry</legend>
          <FormField id="name" label="Your full name" error={errors.name}>
            <input
              className="form-input"
              id="name"
              name="name"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </FormField>
          <FormField id="email" label="Email address" error={errors.email}>
            <input
              className="form-input"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </FormField>
          <FormField id="message" label="Your message" error={errors.message}>
            <textarea
              className="form-input min-h-40 resize-y"
              id="message"
              name="message"
              rows={6}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
          </FormField>
          <FormNotice />
          <button
            type="submit"
            className="button button-primary w-full sm:w-auto"
          >
            Prepare email draft
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </fieldset>
      </form>
      {draft && <EmailDraftPanel draft={draft} />}
    </div>
  );
}
