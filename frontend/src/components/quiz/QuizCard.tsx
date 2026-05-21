import avatar1 from '@assets/avatars/male.png';
import avatar2 from '@assets/avatars/female.png';
import avatar3 from '@assets/avatars/male2.png';

const avatars = [avatar1, avatar2, avatar3];

interface QuizCardProps {
  icon: React.ReactNode;
  title: string;
  count: string;
  category: string;
  onResult?: () => void;
}

export function QuizCard({
  icon,
  title,
  count,
  category,
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
          Começar
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {avatars.map((avatar, i) => (
            <div
              key={i}
              className="h-7 w-7 rounded-full flex items-center justify-center border-2 border-white text-xs font-bold text-white"
            >
              <img src={avatar} alt={`Avatar ${i + 1}`} className="h-full w-full rounded-full object-cover" />
            </div>
          ))}
        </div>
        <span className="text-traco truncate text-xs font-medium">
          {category}
        </span>
      </div>
    </div>
  );
}
