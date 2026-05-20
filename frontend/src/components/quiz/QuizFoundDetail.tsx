interface QuizFoundDetailProps {
  label: string;
  value: string;
}

export function QuizFoundDetail({ label, value }: QuizFoundDetailProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="max-w-[60%] truncate text-right text-sm font-bold text-[#4D61DE]">
        {value}
      </span>
    </div>
  );
}
