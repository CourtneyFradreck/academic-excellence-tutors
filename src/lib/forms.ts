import { curricula, grades, organisation, subjects } from "@/data/site";
import type {
  ContactValues,
  EmailDraft,
  EnrolmentValues,
  FormErrors,
} from "@/types/forms";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const readString = (data: FormData, name: string) =>
  String(data.get(name) ?? "").trim();

export function readEnrolment(data: FormData): EnrolmentValues {
  return {
    learnerName: readString(data, "learnerName"),
    grade: readString(data, "grade"),
    curriculum: readString(data, "curriculum"),
    subjects: data.getAll("subjects").map(String),
    guardianName: readString(data, "guardianName"),
    guardianEmail: readString(data, "guardianEmail"),
    guardianPhone: readString(data, "guardianPhone"),
    message: readString(data, "message"),
    consent: data.get("consent") === "on",
  };
}

export function validateEnrolment(
  values: EnrolmentValues,
): FormErrors<EnrolmentValues> {
  const errors: FormErrors<EnrolmentValues> = {};
  if (!values.learnerName.trim())
    errors.learnerName = "Enter the learner’s full name.";
  if (!grades.some((grade) => grade === values.grade))
    errors.grade = "Choose a grade from 8 to 12.";
  if (!curricula.some((curriculum) => curriculum === values.curriculum))
    errors.curriculum = "Choose CAPS or IEB.";
  if (
    !values.subjects.length ||
    !values.subjects.every((id) =>
      subjects.some((subject) => subject.id === id),
    )
  )
    errors.subjects = "Select at least one of the listed subjects.";
  if (!values.guardianName.trim())
    errors.guardianName = "Enter the parent or guardian’s full name.";
  if (!emailPattern.test(values.guardianEmail.trim()))
    errors.guardianEmail = "Enter a valid parent or guardian email address.";
  const phone = values.guardianPhone.replace(/[\s()-]/g, "");
  if (!/^\+?\d{7,15}$/.test(phone))
    errors.guardianPhone =
      "Enter a valid contact number, including an area or country code.";
  if (!values.consent)
    errors.consent =
      "Confirm your permission to share these details and acknowledge the email step.";
  return errors;
}

export function readContact(data: FormData): ContactValues {
  return {
    name: readString(data, "name"),
    email: readString(data, "email"),
    message: readString(data, "message"),
  };
}

export function validateContact(
  values: ContactValues,
): FormErrors<ContactValues> {
  const errors: FormErrors<ContactValues> = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!emailPattern.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!values.message.trim())
    errors.message = "Tell us what you would like to ask AET.";
  return errors;
}

export function enrolmentDraft(values: EnrolmentValues): EmailDraft {
  return {
    to: organisation.email,
    subject: "AET enrolment enquiry",
    body: [
      "Hello Academic Excellence Tutors,",
      "",
      "I would like to enquire about enrolment.",
      "",
      "LEARNER INFORMATION",
      `Full name: ${values.learnerName}`,
      `Grade: ${values.grade}`,
      `Curriculum: ${values.curriculum}`,
      `Subjects: ${subjects
        .filter((subject) => values.subjects.includes(subject.id))
        .map((subject) => subject.name)
        .join(", ")}`,
      "",
      "PARENT / GUARDIAN INFORMATION",
      `Full name: ${values.guardianName}`,
      `Email: ${values.guardianEmail}`,
      `Contact number: ${values.guardianPhone}`,
      "",
      "ADDITIONAL INFORMATION",
      values.message || "No additional information provided.",
      "",
      "I confirm that I am the parent/guardian or have permission to share these details with AET.",
      "Please contact me to discuss tutoring and enrolment arrangements, including a quotation or invoice.",
    ].join("\n"),
  };
}

export function contactDraft(values: ContactValues): EmailDraft {
  return {
    to: organisation.email,
    subject: "AET website enquiry",
    body: [
      "Hello Academic Excellence Tutors,",
      "",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      "",
      values.message,
    ].join("\n"),
  };
}

export function mailtoHref(draft: EmailDraft): string {
  return `mailto:${draft.to}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body.replace(/\r?\n/g, "\r\n"))}`;
}
