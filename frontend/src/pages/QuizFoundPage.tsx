import { useNavigate } from "react-router-dom";
import { X, Share2 } from "lucide-react";

export default function QuizFoundPage() {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Saturday night Quiz",
        text: "Join my quiz! Code: Q-452-456",
        url: "https://quiz.com/sci6",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-lg relative">
        {/* Close button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center z-10"
        >
          <X size={16} color="#666" />
        </button>

        {/* Top illustration */}
        <div className="bg-[#F2EDE4] flex items-center justify-center py-8">
          <div className="relative">
            {/* Shield */}
            <div className="w-24 h-24 bg-gradient-to-b from-red-700 to-red-900 rounded-full flex items-center justify-center shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-b from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <span className="text-3xl">⭐</span>
              </div>
            </div>
            {/* Ribbon */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-800 text-white text-[10px] font-bold px-4 py-1 rounded-sm">
              Quiz Game
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-6">
          {/* Badges */}
          <div className="flex gap-2 mb-4">
            <span className="text-xs bg-[#F2EDE4] text-gray-600 font-semibold px-3 py-1 rounded-full">General Knowledge</span>
            <span className="text-xs bg-[#F2EDE4] text-gray-600 font-semibold px-3 py-1 rounded-full">2min</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-extrabold text-gray-900 mb-5">Saturday night Quiz</h2>

          {/* Details */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">Quiz Code</span>
              <span className="text-sm font-bold text-[#4D61DE]">Q-452-456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">Invite Link</span>
              <span className="text-sm font-bold text-[#4D61DE]">quiz.com/sci6</span>
            </div>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="w-full bg-[#4D61DE] text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition flex items-center justify-center gap-2"
          >
            <Share2 size={18} color="white" />
            Share Links
          </button>
        </div>
      </div>
    </div>
  );
}
