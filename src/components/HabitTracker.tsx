import React from 'react';
import { BrushingRecord, Badge } from '../types/dental';
import { soundManager } from '../utils/audio';
import { Calendar, Sun, Moon, Flame, CheckCircle, Sparkles, Award } from 'lucide-react';

interface HabitTrackerProps {
  records: Record<string, BrushingRecord>;
  onToggleRecord: (dateStr: string, time: 'morning' | 'night') => void;
  streakDays: number;
  badges: Badge[];
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({
  records,
  onToggleRecord,
  streakDays,
  badges,
}) => {
  // Generate the last 7 days list (today and past 6 days)
  const daysList = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' });
    const dayNum = d.getDate();
    return { dateStr, dayName, dayNum };
  });

  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>Jurnal Kebiasaan Gigi Sehat</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Catatan Sikat Gigi Harian
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Beri tanda centang setelah kamu selesai menyikat gigi pagi (sesudah sarapan) dan malam (sebelum tidur).
        </p>
      </div>

      {/* Streak & Stat Highlight Card */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner shrink-0">
            <Flame className="w-9 h-9 text-amber-300 fill-amber-300 animate-bounce-soft" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-sky-100 block">
              Pencapaian Rutinitas
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading mt-0.5">
              {streakDays} Hari Beruntun!
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 mt-1">
              Pertahankan kebiasaan baik ini untuk melindungi senyum indahmu seumur hidup.
            </p>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-xs font-bold text-sky-100 block">Target Harian:</span>
          <span className="text-lg font-black font-heading mt-0.5 block">2x Sikat Gigi</span>
        </div>
      </div>

      {/* 7-Day Checklist Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sky-100 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-sky-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              7 Hari Terakhir
            </h3>
            <p className="text-xs text-slate-500">Klik ikon matahari atau bulan untuk mencatat</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" /> Pagi (Sarapan)
            </span>
            <span className="flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-500" /> Malam (Tidur)
            </span>
          </div>
        </div>

        {/* Calendar Day Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 pt-2">
          {daysList.map((day) => {
            const record = records[day.dateStr] || { morning: false, night: false };
            const isToday = day.dateStr === new Date().toISOString().split('T')[0];

            return (
              <div
                key={day.dateStr}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                  isToday
                    ? 'bg-sky-50/80 border-sky-300 ring-2 ring-sky-200'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                {/* Day Header */}
                <div className="text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    {day.dayName}
                  </span>
                  <span className="text-lg font-black text-slate-800 font-mono">
                    {day.dayNum}
                  </span>
                  {isToday && (
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-100 px-1.5 py-0.5 rounded-full block mt-0.5">
                      Hari ini
                    </span>
                  )}
                </div>

                {/* Morning Button */}
                <button
                  onClick={() => {
                    onToggleRecord(day.dateStr, 'morning');
                    soundManager.playPop();
                  }}
                  className={`w-full py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    record.morning
                      ? 'bg-amber-400 border-amber-500 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-500'
                  }`}
                  title="Sikat gigi pagi setelah sarapan"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{record.morning ? 'Pagi ✓' : 'Pagi'}</span>
                </button>

                {/* Night Button */}
                <button
                  onClick={() => {
                    onToggleRecord(day.dateStr, 'night');
                    soundManager.playPop();
                  }}
                  className={`w-full py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    record.night
                      ? 'bg-indigo-600 border-indigo-700 text-white shadow-xs'
                      : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500'
                  }`}
                  title="Sikat gigi malam sebelum tidur"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{record.night ? 'Malam ✓' : 'Malam'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unlockable Badges Gallery */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sky-100 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Koleksi Lencana Penghargaan</span>
          </h3>
          <p className="text-xs text-slate-500">
            Raih semua lencana gigi dengan rajin menyikat gigi dan menyelesaikan tantangan!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
                badge.unlocked
                  ? 'bg-sky-50/80 border-sky-200 shadow-xs'
                  : 'bg-slate-50 border-slate-100 opacity-60'
              }`}
            >
              <div
                className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                  badge.unlocked ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-400'
                }`}
              >
                {badge.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  {badge.name}
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-1">
                  {badge.description}
                </p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                  badge.unlocked
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {badge.unlocked ? '✓ Terbuka' : 'Terkunci'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
