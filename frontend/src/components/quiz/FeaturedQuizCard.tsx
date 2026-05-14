import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { getAvatar } from '@/lib/utils';

interface FeaturedQuizCardProps {
  title: string;
  category: string;
  sharedBy: string;
  quizId: string;
  gender: 'male' | 'female';
  onDismiss?: () => void;
}

export function FeaturedQuizCard({
  category,
  title,
  sharedBy,
  quizId,
  gender,
  onDismiss,
}: FeaturedQuizCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-par overflow-hidden rounded-2xl">
      <div className="p-5 md:p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-red rounded-full bg-white px-3 py-1 text-xs font-bold">
            {category}
          </span>
          <button
            onClick={onDismiss}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition hover:bg-white/30"
          >
            <X size={14} />
          </button>
        </div>
        <h3 className="mb-1 text-xl font-extrabold text-white md:text-2xl">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-xs font-bold text-white">
              <img src={getAvatar(gender)} alt="Avatar" />
            </div>
            <div>
              <p className="text-xs text-white/60">Adicionado por</p>
              <p className="text-xs font-bold text-white">{sharedBy}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/quiz/${quizId}/play`)}
            className="bg-blue-btn flex items-center gap-2 rounded-3xl px-5 py-2 text-sm font-bold text-white transition hover:cursor-pointer hover:opacity-90"
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  );
}
