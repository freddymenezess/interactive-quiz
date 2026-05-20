interface QuizFoundBadgeProps {
  label: string;
}

export function QuizFoundBadge({ label }: QuizFoundBadgeProps) {
  return (
    <span className="rounded-full bg-[#F2EDE4] px-3 py-1 text-xs font-semibold text-gray-600">
      {label}
    </span>
  );
}
