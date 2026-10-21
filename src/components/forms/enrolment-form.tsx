"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { curricula, grades, subjects } from "@/data/site";
import { enrolmentDraft, readEnrolment, validateEnrolment } from "@/lib/forms";
import type { EmailDraft, EnrolmentValues, FormErrors } from "@/types/forms";
import { EmailDraftPanel } from "@/components/forms/email-draft";
import {
  ErrorSummary,
  FieldError,
  focusFirstError,
  FormField,
  FormNotice,
  useFormReady,
} from "@/components/forms/form-ui";

export function EnrolmentForm() {
  const ready = useFormReady();
  const [errors, setErrors] = useState<FormErrors<EnrolmentValues>>({});
  const [attempted, setAttempted] = useState(false);
  const [draft, setDraft] = useState<EmailDraft | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readEnrolment(new FormData(event.currentTarget));
    const nextErrors = validateEnrolment(values);
    setAttempted(true);
    setErrors(nextErrors);
    setDraft(null);
    if (Object.keys(nextErrors).length) {
      focusFirstError(event.currentTarget, nextErrors);
      return;
    }
    setDraft(enrolmentDraft(values));
  }
  function change(event: FormEvent<HTMLFormElement>) {
    setDraft(null);
    if (attempted)
      setErrors(
        validateEnrolment(readEnrolment(new FormData(event.currentTarget))),
      );
  }
  const described = (id: string, hint = false) =>
    [
      hint ? `${id}-hint` : "",
      errors[id as keyof EnrolmentValues] ? `${id}-error` : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-medium tracking-tight">
          Prepare your enrolment enquiry
        </h2>
        <p className="mt-3 text-sm leading-relaxed">
          All fields are required unless marked optional. A parent or guardian
          should complete this form, or give permission to share the learner’s
          details.
        </p>
      </div>
      <ErrorSummary errors={errors} />
      <form
        noValidate
        onSubmit={submit}
        onChange={change}
        aria-label="Enrolment enquiry form"
      >
        <fieldset disabled={!ready} className="min-w-0 space-y-8">
          <legend className="sr-only">
            Learner and parent or guardian details
          </legend>
          <section className="form-section" aria-labelledby="learner-heading">
            <h3 id="learner-heading" className="form-section-title">
              <span className="form-number" aria-hidden="true">
                01
              </span>
              Learner information
            </h3>
            <div className="grid gap-6">
              <FormField
                id="learnerName"
                label="Learner’s full name"
                error={errors.learnerName}
              >
                <input
                  className="form-input"
                  id="learnerName"
                  name="learnerName"
                  autoComplete="section-learner name"
                  required
                  aria-invalid={Boolean(errors.learnerName)}
                  aria-describedby={described("learnerName")}
                />
              </FormField>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField id="grade" label="Grade" error={errors.grade}>
                  <select
                    id="grade"
                    name="grade"
                    className="form-input"
                    defaultValue=""
                    required
                    aria-invalid={Boolean(errors.grade)}
                    aria-describedby={described("grade")}
                  >
                    <option value="">Select a grade</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        Grade {grade}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField
                  id="curriculum"
                  label="Curriculum"
                  error={errors.curriculum}
                >
                  <select
                    id="curriculum"
                    name="curriculum"
                    className="form-input"
                    defaultValue=""
                    required
                    aria-invalid={Boolean(errors.curriculum)}
                    aria-describedby={described("curriculum")}
                  >
                    <option value="">Select a curriculum</option>
                    {curricula.map((curriculum) => (
                      <option key={curriculum} value={curriculum}>
                        {curriculum}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
              <fieldset
                id="subjects"
                tabIndex={-1}
                aria-describedby={described("subjects", true)}
                aria-invalid={Boolean(errors.subjects)}
              >
                <legend className="form-label">
                  Subjects requiring tutoring
                </legend>
                <p id="subjects-hint" className="mb-4 text-xs">
                  Choose one or more subjects. All ten subjects are offered
                  under CAPS and IEB.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {subjects.map((subject) => (
                    <label
                      key={subject.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink/30 p-3.5 text-sm leading-relaxed has-checked:border-ink has-checked:bg-brand-blue/20"
                    >
                      <input
                        type="checkbox"
                        name="subjects"
                        value={subject.id}
                        className="form-check"
                        aria-describedby={described("subjects", true)}
                      />
                      <span>{subject.name}</span>
                    </label>
                  ))}
                </div>
                <FieldError id="subjects" error={errors.subjects} />
              </fieldset>
            </div>
          </section>
          <section className="form-section" aria-labelledby="guardian-heading">
            <h3 id="guardian-heading" className="form-section-title">
              <span className="form-number" aria-hidden="true">
                02
              </span>
              Parent or guardian
            </h3>
            <div className="grid gap-6">
              <FormField
                id="guardianName"
                label="Parent/guardian’s full name"
                error={errors.guardianName}
              >
                <input
                  className="form-input"
                  id="guardianName"
                  name="guardianName"
                  autoComplete="section-guardian name"
                  required
                  aria-invalid={Boolean(errors.guardianName)}
                  aria-describedby={described("guardianName")}
                />
              </FormField>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  id="guardianEmail"
                  label="Email address"
                  error={errors.guardianEmail}
                >
                  <input
                    className="form-input"
                    id="guardianEmail"
                    name="guardianEmail"
                    type="email"
                    autoComplete="section-guardian email"
                    required
                    aria-invalid={Boolean(errors.guardianEmail)}
                    aria-describedby={described("guardianEmail")}
                  />
                </FormField>
                <FormField
                  id="guardianPhone"
                  label="Contact number"
                  hint="For example, 069 278 5124 or +27 69 278 5124."
                  error={errors.guardianPhone}
                >
                  <input
                    className="form-input"
                    id="guardianPhone"
                    name="guardianPhone"
                    type="tel"
                    autoComplete="section-guardian tel"
                    required
                    aria-invalid={Boolean(errors.guardianPhone)}
                    aria-describedby={described("guardianPhone", true)}
                  />
                </FormField>
              </div>
            </div>
          </section>
          <section
            className="form-section"
            aria-labelledby="additional-heading"
          >
            <h3 id="additional-heading" className="form-section-title">
              <span className="form-number" aria-hidden="true">
                03
              </span>
              A little more about your needs
            </h3>
            <FormField
              id="message"
              label="Message or learning requirements"
              hint="Share anything you’d like AET to know about the support you are looking for."
              optional
            >
              <textarea
                className="form-input min-h-36 resize-y"
                id="message"
                name="message"
                rows={5}
                aria-describedby="message-hint"
              />
            </FormField>
          </section>
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
              <input
                className="form-check"
                id="consent"
                name="consent"
                type="checkbox"
                required
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={described("consent")}
              />
              <span>
                I confirm that I am the parent/guardian or have permission to
                share these details with AET. I understand that I must send the
                prepared email myself.
              </span>
            </label>
            <FieldError id="consent" error={errors.consent} />
          </div>
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
