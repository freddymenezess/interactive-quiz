import { useNavigate } from "react-router-dom";
import { Home, LayoutGrid, BarChart2, Users } from "lucide-react";
import BottomNav from "../components/ui/BottomNav";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Quizzes", path: "/quizzes", icon: LayoutGrid },
  { label: "Leaderboard", path: "/leaderboard", icon: BarChart2 },
  { label: "Friends", path: "/friends", icon: Users },
];

const quizzes = [
  {
    id: 1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4D61DE" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    bg: "bg-blue-50",
    title: "Integers Quiz",
    count: "10 Quizzes",
    people: "+437 People join",
    avatars: ["bg-pink-400", "bg-purple-400", "bg-blue-400"],
  },
  {
    id: 2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    bg: "bg-pink-50",
    title: "General Knowledge",
    count: "06 Quizzes",
    people: "+437 People join",
    avatars: ["bg-yellow-400", "bg-green-400", "bg-orange-400"],
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const username = "Mbala";
  const activePath = "/";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] pb-24 md:pb-0 md:flex">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen p-6 gap-6 fixed left-0 top-0">
        <div className="text-xl font-extrabold text-[#4D61DE]">QuizApp</div>
        <nav className="flex flex-col gap-1 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition text-left ${
                  isActive
                    ? "bg-[#4D61DE] text-white"
                    : "text-gray-500 hover:bg-[#F2EDE4] hover:text-[#4D61DE]"
                }`}
              >
                <Icon size={18} color={isActive ? "white" : "#9CA3AF"} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 px-5 py-6 max-w-lg mx-auto md:max-w-2xl md:mx-0 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-[#4D61DE] font-semibold flex items-center gap-1">
              ☀️ {getGreeting()}
            </p>
            <h1 className="text-2xl font-extrabold text-gray-900">{username}</h1>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow">
            {username[0]}
          </div>
        </div>

        {/* Quizzes title + Quiz code button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-900">Quizzes</h2>
          <button
            onClick={() => navigate("/enter-code")}
            className="flex items-center gap-1 bg-[#4D61DE] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            <span className="text-base">+</span> Quiz code
          </button>
        </div>

        {/* Featured Quiz Card */}
        <div className="rounded-2xl overflow-hidden mb-6 relative"
          style={{ background: "linear-gradient(135deg, #c0392b 0%, #2c3e9e 100%)" }}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-white text-[#4D61DE] font-bold px-3 py-1 rounded-full">General Knowledge</span>
              <span className="text-xs bg-white/20 text-white font-semibold px-3 py-1 rounded-full">2min</span>
              <button className="ml-auto w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">✕</button>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-1">Saturday night Quiz</h3>
            <p className="text-xs text-white/70 mb-4">13 Quizzes</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold">B</div>
                <div>
                  <p className="text-xs text-white/60">Shared By</p>
                  <p className="text-xs text-white font-bold">Brandon Matrovs</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/quiz")}
                className="bg-[#4D61DE] text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-blue-600 transition"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>

        {/* Your Quizzes */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-extrabold text-gray-900">Your Quizzes</h2>
          <button onClick={() => navigate("/quizzes")} className="text-xs text-[#4D61DE] font-bold">See all</button>
        </div>

        <div className="flex flex-col gap-4">
          {quizzes.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${q.bg} rounded-xl flex items-center justify-center`}>
                  {q.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{q.title}</p>
                  <p className="text-xs text-gray-400">{q.count}</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-[#4D61DE] font-bold">
                  <BarChart2 size={14} color="#4D61DE" />
                  Result
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {q.avatars.map((color, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium">{q.people}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAB - mobile only */}
        <button
          onClick={() => navigate("/enter-code")}
          className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#4D61DE] rounded-full flex items-center justify-center text-white text-2xl shadow-xl hover:bg-blue-600 transition z-40"
        >
          +
        </button>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
