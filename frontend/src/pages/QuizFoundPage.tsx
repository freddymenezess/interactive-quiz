import { useNavigate } from 'react-router-dom';
import { X, Share2 } from 'lucide-react';

export default function QuizFoundPage() {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Saturday night Quiz',
        text: 'Join my quiz! Code: Q-452-456',
        url: 'https://quiz.com/sci6',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4] px-5 py-10">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg">
        {/* Close button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
        >
          <X size={16} color="#666" />
        </button>

        {/* Top illustration */}
        <div className="flex items-center justify-center bg-[#F2EDE4] py-8">
          <div className="relative">
            {/* Shield */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-red-700 to-red-900 shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-700">
                <span className="text-3xl">⭐</span>
              </div>
            </div>
            {/* Ribbon */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-sm bg-red-800 px-4 py-1 text-[10px] font-bold text-white">
              Quiz Game
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-6 pb-6">
          {/* Badges */}
          <div className="mb-4 flex gap-2">
            <span className="rounded-full bg-[#F2EDE4] px-3 py-1 text-xs font-semibold text-gray-600">
              General Knowledge
            </span>
            <span className="rounded-full bg-[#F2EDE4] px-3 py-1 text-xs font-semibold text-gray-600">
              2min
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-5 text-xl font-extrabold text-gray-900">
            Saturday night Quiz
          </h2>

          {/* Details */}
          <div className="mb-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Quiz Code
              </span>
              <span className="text-sm font-bold text-[#4D61DE]">
                Q-452-456
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Invite Link
              </span>
              <span className="text-sm font-bold text-[#4D61DE]">
                quiz.com/sci6
              </span>
            </div>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4D61DE] py-4 font-bold text-white transition hover:bg-blue-600"
          >
            <Share2 size={18} color="white" />
            Share Links
          </button>
        </div>
      </div>
    </div>
  );
}
