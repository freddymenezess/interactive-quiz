import { useState } from 'react';
import { useAuth } from '@context/AuthContext';
import { useRanking } from '@hooks/useRanking';
import { getAvatar } from '../lib/utils';
import BottomNav from '@components/layout/BottomNav';
import Sidebar from '@components/layout/Sidebar';

const avatarColors = [
  'bg-yellow-400',
  'bg-pink-400',
  'bg-blue-400',
  'bg-purple-400',
  'bg-green-400',
  'bg-orange-400',
  'bg-red-400',
  'bg-teal-400',
  'bg-indigo-400',
];

export default function Ranking() {
  const [tab, setTab] = useState<'Semanal' | 'Todo Tempo'>('Todo Tempo');
  const { user } = useAuth();
  const { players, isLoading, error } = useRanking();

  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <div className="min-h-screen bg-[#F2EDE4] pb-24 md:flex md:pb-0">
      <Sidebar />

      <main className="mx-auto max-w-lg flex-1 px-5 py-6 md:mx-0 md:ml-64 md:max-w-2xl md:px-10">
        <h1 className="mb-6 text-xl font-extrabold text-gray-900">Ranking</h1>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {(['Semanal', 'Todo Tempo'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                tab === t
                  ? 'bg-blue-btn text-white'
                  : 'border border-gray-200 bg-white text-gray-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-2xl bg-white/60"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : players.length === 0 ? (
          <p className="text-sm text-gray-400">
            Ainda não há jogadores no ranking.
          </p>
        ) : (
          <>
            {/* Top 3 */}
            {top3.length >= 0 && (
              <div className="mb-8 flex items-end justify-center gap-6">
                {[top3[1], top3[0], top3[2]].filter(Boolean).map((p, i) => {
                  const isFirst = i === 1;
                  const gender = p.gender;
                  const isMe = p.userId === user?.id;
                  return (
                    <div
                      key={p.userId}
                      className={`flex flex-col items-center ${isFirst ? 'mb-4' : ''}`}
                    >
                      <div
                        className={`${isFirst ? 'h-16 w-16 text-xl' : 'h-12 w-12 text-base'} flex items-center justify-center rounded-full font-extrabold text-white`}
                      >
                        <img src={getAvatar(gender)} alt="Avatar" />
                      </div>
                      <p
                        className={`mt-2 text-xs font-bold ${isMe ? 'text-blue-btn' : 'text-gray-800'}`}
                      >
                        {p.name} {isMe && '(eu)'}
                      </p>
                      <p className="text-blue-btn text-xs font-semibold">
                        {p.totalScore} pts
                      </p>
                      <div
                        className={`mt-2 ${isFirst ? 'bg-blue-btn' : 'bg-gray-300'} flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white`}
                      >
                        {isFirst ? '1' : i === 0 ? '2' : '3'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Resto */}
            <div className="flex flex-col gap-3">
              {rest.map((p) => {
                const color =
                  avatarColors[(p.position - 1) % avatarColors.length];
                const isMe = p.userId === user?.id;
                return (
                  <div
                    key={p.userId}
                    className={`flex items-center gap-4 rounded-2xl border p-4 ${isMe ? 'border-blue-btn bg-blue-50' : 'border-gray-100 bg-white'}`}
                  >
                    <span className="w-5 text-sm font-bold text-gray-400">
                      {p.position}
                    </span>
                    <div
                      className={`${color} flex h-10 w-10 items-center justify-center rounded-full font-bold text-white`}
                    >
                      {p.name[0].toUpperCase()}
                    </div>
                    <p
                      className={`flex-1 text-sm font-bold ${isMe ? 'text-blue-btn' : 'text-gray-800'}`}
                    >
                      {p.name}{' '}
                      {isMe && (
                        <span className="font-normal text-gray-400">(eu)</span>
                      )}
                    </p>
                    <p className="text-blue-btn text-sm font-bold">
                      {p.totalScore} pts
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
