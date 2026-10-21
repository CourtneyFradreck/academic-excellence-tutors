export interface EnrolmentValues {
  learnerName: string;
  grade: string;
  curriculum: string;
  subjects: string[];
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  message: string;
  consent: boolean;
}

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}
export type FormErrors<T> = Partial<Record<keyof T, string>>;
export interface EmailDraft {
  to: string;
  subject: string;
  body: string;
}
