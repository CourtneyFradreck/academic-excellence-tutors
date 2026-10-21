export const organisation = {
  name: "Academic Excellence Tutors",
  shortName: "AET",
  email: "academicexcellencetuts@gmail.com",
  phone: "069 278 5124",
  phoneHref: "tel:+27692785124",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/subjects", label: "Subjects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const grades = ["8", "9", "10", "11", "12"] as const;
export const curricula = ["CAPS", "IEB"] as const;

export const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "math",
    area: "Numbers & reasoning",
  },
  {
    id: "mathematical-literacy",
    name: "Mathematical Literacy",
    icon: "calculator",
    area: "Everyday mathematics",
  },
  {
    id: "physical-sciences",
    name: "Physical Sciences",
    icon: "atom",
    area: "Science & discovery",
  },
  {
    id: "life-sciences",
    name: "Life Sciences",
    icon: "leaf",
    area: "Life & the natural world",
  },
  {
    id: "english",
    name: "English",
    icon: "book",
    area: "Language & expression",
  },
  {
    id: "afrikaans",
    name: "Afrikaans",
    icon: "language",
    area: "Language & expression",
  },
  {
    id: "accounting",
    name: "Accounting",
    icon: "chart",
    area: "Financial understanding",
  },
  {
    id: "economic-management-sciences",
    name: "Economic and Management Sciences",
    icon: "business",
    area: "Economics & management",
  },
  {
    id: "history",
    name: "History",
    icon: "history",
    area: "The past & its perspectives",
  },
  {
    id: "business-studies",
    name: "Business Studies",
    icon: "briefcase",
    area: "Business & enterprise",
  },
] as const;

export type SubjectId = (typeof subjects)[number]["id"];
export type Subject = (typeof subjects)[number];

export const services = [
  {
    icon: "video",
    title: "Weekly live online lessons",
    description:
      "Learn with your tutors each week through Microsoft Teams or Google Meet.",
  },
  {
    icon: "tutors",
    title: "At least two assigned tutors",
    description:
      "Every learner is assigned a minimum of two tutors for consistent, well-rounded academic support.",
  },
  {
    icon: "exam",
    title: "Structured examination preparation",
    description:
      "Build your preparation around focused academic support as you work towards your examinations.",
  },
  {
    icon: "notes",
    title: "Complimentary notes & academic advice",
    description:
      "Support your learning between lessons with notes and academic guidance included in the service.",
  },
  {
    icon: "book",
    title: "Free textbooks",
    description: "Textbooks are included as part of AET’s tutoring support.",
  },
  {
    icon: "chat",
    title: "A dedicated support group chat",
    description:
      "A learner–parent/guardian–tutor group chat keeps your support network connected upon enrolment.",
  },
  {
    icon: "progress",
    title: "Parents stay involved",
    description:
      "The dedicated group chat gives parents and guardians visibility into their child’s academic performance and progress.",
  },
  {
    icon: "invoice",
    title: "Clear enrolment arrangements",
    description:
      "A quotation or invoice is issued upon enrolment. Discuss fees directly with AET; this website does not calculate prices or issue invoices.",
  },
] as const;

export const journey = [
  {
    title: "Tell us what you need",
    description:
      "Choose your subjects and prepare an enrolment email with your learner and parent or guardian details.",
  },
  {
    title: "Discuss your enrolment",
    description:
      "Send the email to AET to discuss your requirements and enrolment arrangements. A quotation or invoice is issued upon enrolment.",
  },
  {
    title: "Connect with your tutors",
    description:
      "Every enrolled learner is assigned at least two tutors, with a dedicated learner–parent–tutor group chat.",
  },
  {
    title: "Learn, prepare & stay connected",
    description:
      "Take part in weekly live lessons, use your learning resources and keep parents involved in your progress.",
  },
] as const;

export const welcomeStatement =
  "Academic Excellence Tutors (AET) is an online tutoring platform offering structured, high-quality academic support to learners in Grades 8 to 12. Lessons are conducted weekly via Microsoft Teams or Google Meet, and every learner is assigned a minimum of two tutors to ensure consistent, well-rounded support. Upon enrolment, a group chat is created between the learner, parent/guardian, and assigned tutor(s), allowing parents to easily track their child's academic performance and progress. An invoice or quotation is issued upon enrolment, and the service includes live lessons, structured exam preparation, as well as complimentary notes and academic advice.";
