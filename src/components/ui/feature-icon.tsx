import {
  Atom,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  GraduationCap,
  History,
  Languages,
  Leaf,
  MessagesSquare,
  NotebookPen,
  Sigma,
  TrendingUp,
  UsersRound,
  Video,
} from "lucide-react";

const icons = {
  math: Sigma,
  calculator: Calculator,
  atom: Atom,
  leaf: Leaf,
  book: BookOpen,
  language: Languages,
  chart: ChartNoAxesCombined,
  business: TrendingUp,
  history: History,
  briefcase: BriefcaseBusiness,
  video: Video,
  tutors: UsersRound,
  exam: ClipboardList,
  notes: NotebookPen,
  chat: MessagesSquare,
  progress: GraduationCap,
  invoice: FileText,
};

export function FeatureIcon({
  name,
  size = 24,
  className = "",
}: {
  name: keyof typeof icons;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name];
  return (
    <Icon
      size={size}
      strokeWidth={1.65}
      className={className}
      aria-hidden="true"
    />
  );
}
