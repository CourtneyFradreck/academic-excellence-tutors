"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { organisation } from "@/data/site";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

// Prevent a native GET submission (and PII in the URL) before hydration or with JS disabled.
export function useFormReady() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

export function FormField({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {optional && <span className="font-normal"> (optional)</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed">
          {hint}
        </p>
      )}
      <FieldError id={id} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="form-error">
      <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      {error}
    </p>
  );
}

export function ErrorSummary({
  errors,
}: {
  errors: Partial<Record<string, string>>;
}) {
  const entries = Object.entries(errors).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );
  if (!entries.length) return null;
  return (
    <div
      role="alert"
      aria-label="Form errors"
      className="mb-7 rounded-lg border-2 border-ink bg-brand-yellow/20 p-5"
    >
      <p className="font-medium">Please check the following details:</p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
        {entries.map(([key, error]) => (
          <li key={key}>
            <a className="text-link" href={`#${key}`}>
              {error}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function focusFirstError(
  form: HTMLFormElement,
  errors: Partial<Record<string, string>>,
) {
  const first = Object.keys(errors)[0];
  if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}

export function FormNotice() {
  return (
    <>
      <p className="text-sm leading-relaxed">
        Your details stay on this page until you choose to open or copy the
        draft. You must send the email yourself; preparing a draft does not send
        an enquiry to AET.
      </p>
      <noscript>
        <p className="mt-4 rounded-lg border border-ink bg-brand-yellow/25 p-4">
          Enable JavaScript to prepare a draft, or email{" "}
          <a
            href={`mailto:${organisation.email}`}
            className="text-link break-all"
          >
            {organisation.email}
          </a>{" "}
          directly. This form is disabled while JavaScript is unavailable.
        </p>
      </noscript>
    </>
  );
}
