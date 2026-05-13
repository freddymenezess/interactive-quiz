import { useNavigate } from "react-router-dom";
import { BarChart2 } from "lucide-react";
import BottomNav from "../components/ui/BottomNav";
import Sidebar from "../components/ui/Sidebar";

const quizzes = [
  { id: 1, subject: "📐", title: "Integers Quiz", questions: 10, people: 1427, color: "bg-orange-100" },
  { id: 2, subject: "🧠", title: "General Knowledge", questions: 15, people: 337, color: "bg-blue-100" },
  { id: 3, subject: "📊", title: "Statistics Math Quiz", questions: 12, people: 337, color: "bg-green-100" },
];

export default function QuizzesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F2EDE4] pb-24 md:pb-0 md:flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 px-5 py-6 max-w-lg mx-auto md:max-w-2xl md:mx-0 md:px-10">
        <h1 className="text-xl font-extrabold text-gray-900 mb-6">Your Quizzes</h1>

        <div className="flex flex-col gap-3">
          {quizzes.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
              <div className={`w-12 h-12 ${q.color} rounded-xl flex items-center justify-center text-lg`}>
                {q.subject}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{q.title}</p>
                <p className="text-xs text-gray-400">{q.questions} Questions · {q.people} People join</p>
              </div>
              <button className="flex items-center gap-1 text-xs text-[#4D61DE] font-bold">
                <BarChart2 size={14} color="#4D61DE" /> Result
              </button>
            </div>
          ))}
        </div>

        {/* FAB */}
        <button
          onClick={() => navigate("/create-quiz")}
          className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 bg-[#4D61DE] rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-blue-600 transition z-40"
        >
          +
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
