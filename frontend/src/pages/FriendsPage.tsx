import { useState } from 'react';
import BottomNav from '../components/layout/BottomNav';
import Sidebar from '../components/layout/Sidebar';

const friends = [
  { name: 'Tanya', points: 120, avatar: 'T', color: 'bg-pink-400' },
  { name: 'Esther', points: 98, avatar: 'E', color: 'bg-purple-400' },
  { name: 'Regina', points: 87, avatar: 'R', color: 'bg-blue-400' },
  { name: 'Aubrey', points: 76, avatar: 'A', color: 'bg-green-400' },
  { name: 'Colleen', points: 65, avatar: 'C', color: 'bg-yellow-400' },
  { name: 'Claire', points: 54, avatar: 'C', color: 'bg-orange-400' },
];

export default function FriendsPage() {
  const [search, setSearch] = useState('');

  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2EDE4] pb-24 md:flex md:pb-0">
      <Sidebar />

      <main className="mx-auto max-w-lg flex-1 px-5 py-6 md:mx-0 md:ml-64 md:max-w-2xl md:px-10">
        <h1 className="mb-4 text-xl font-extrabold text-gray-900">Friends</h1>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Find friend"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E8ECF4] bg-white px-4 py-3 pl-10 text-sm outline-none"
          />
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        {/* Friends list */}
        <div className="flex flex-col gap-3">
          {filtered.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4"
            >
              <div
                className={`${f.color} flex h-10 w-10 items-center justify-center rounded-full font-bold text-white`}
              >
                {f.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{f.name}</p>
                <p className="text-xs text-gray-400">{f.points} points</p>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2EDE4] font-bold text-[#4D61DE] transition hover:bg-[#4D61DE] hover:text-white">
                +
              </button>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
