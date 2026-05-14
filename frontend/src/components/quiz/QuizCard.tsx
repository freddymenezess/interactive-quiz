interface QuizCardProps {
  icon: React.ReactNode;
  title: string;
  count: string;
  people: string;
  avatarColors: string[];
  onResult?: () => void;
}

export function QuizCard({
  icon,
  title,
  count,
  people,
  avatarColors,
  onResult,
}: QuizCardProps) {
  return (
    <div className="border-borda bg-preenchimento rounded-2xl border p-4">
      <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white p-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-titulo truncate text-sm font-bold">{title}</p>
          <p className="text-traco truncate text-xs">{count}</p>
        </div>
        <button
          onClick={onResult}
          className="text-blue-btn flex shrink-0 items-center gap-1 text-xs font-bold hover:underline"
        >
          Ver mais
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {avatarColors.map((color, i) => (
            <div
              key={i}
              className={`h-7 w-7 rounded-full ${color} flex items-center justify-center border-2 border-white text-xs font-bold text-white`}
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
        </div>
        <span className="text-traco truncate text-xs font-medium">
          {people}
        </span>
      </div>
    </div>
  );
}
