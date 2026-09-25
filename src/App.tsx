import React, { useState, useEffect } from 'react';
import { ActiveTab, AgeMode, BrushingRecord, Badge } from './types/dental';
import { INITIAL_BADGES } from './data/dentalData';
import { soundManager } from './utils/audio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrushingTimer } from './components/BrushingTimer';
import { ToothGame } from './components/ToothGame';
import { ToothAnatomy } from './components/ToothAnatomy';
import { DentalGuide } from './components/DentalGuide';
import { DentalQuiz } from './components/DentalQuiz';
import { HabitTracker } from './components/HabitTracker';
import { Footer } from './components/Footer';
import { Sparkles, Play, Gamepad2, Award, Calendar, ChevronRight, BookOpen, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [ageMode, setAgeMode] = useState<AgeMode>('anak');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Persistent Habit Records
  const [records, setRecords] = useState<Record<string, BrushingRecord>>(() => {
    try {
      const saved = localStorage.getItem('gigipintar_brushing_records');
      if (saved) return JSON.parse(saved);
    } catch {}
    
    // Seed initial mock records for immediate user satisfaction & engagement
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];

    return {
      [twoDaysAgo]: { date: twoDaysAgo, morning: true, night: true, durationSeconds: 120 },
      [yesterday]: { date: yesterday, morning: true, night: true, durationSeconds: 120 },
      [today]: { date: today, morning: true, night: false, durationSeconds: 120 },
    };
  });

  // Persistent Badges
  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('gigipintar_badges');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_BADGES;
  });

  // Calculate Current Streak
  const calculateStreak = (currentRecords: Record<string, BrushingRecord>): number => {
    let streak = 0;
    const now = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date();
      checkDate.setDate(now.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      const r = currentRecords[dateStr];

      if (r && (r.morning || r.night)) {
        streak++;
      } else {
        // If today has not been brushed yet, don't break streak immediately if yesterday was brushed
        if (i === 0) continue;
        break;
      }
    }
    return Math.max(1, streak);
  };

  const streakDays = calculateStreak(records);

  // Sync records to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gigipintar_brushing_records', JSON.stringify(records));
    } catch {}
  }, [records]);

  // Sync badges to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gigipintar_badges', JSON.stringify(badges));
    } catch {}
  }, [badges]);

  // Handle toggling brushing record
  const handleToggleRecord = (dateStr: string, time: 'morning' | 'night') => {
    setRecords((prev) => {
      const existing = prev[dateStr] || {
        date: dateStr,
        morning: false,
        night: false,
        durationSeconds: 0,
      };
      const updated = {
        ...existing,
        [time]: !existing[time],
      };
      const nextRecords = { ...prev, [dateStr]: updated };

      // Check badges
      const newStreak = calculateStreak(nextRecords);
      setBadges((currentBadges) =>
        currentBadges.map((b) => {
          if (b.id === 'streak_3' && newStreak >= 3) return { ...b, unlocked: true };
          if (b.id === 'streak_7' && newStreak >= 7) return { ...b, unlocked: true };
          return b;
        })
      );

      return nextRecords;
    });
  };

  // Called when 2-minute brushing timer finishes
  const handleCompleteBrushing = () => {
    const today = new Date().toISOString().split('T')[0];
    const currentHour = new Date().getHours();
    const period: 'morning' | 'night' = currentHour < 15 ? 'morning' : 'night';

    setRecords((prev) => {
      const existing = prev[today] || {
        date: today,
        morning: false,
        night: false,
        durationSeconds: 0,
      };
      return {
        ...prev,
        [today]: {
          ...existing,
          [period]: true,
          durationSeconds: existing.durationSeconds + 120,
        },
      };
    });

    // Unlock first_brush badge
    setBadges((currentBadges) =>
      currentBadges.map((b) =>
        b.id === 'first_brush' ? { ...b, unlocked: true } : b
      )
    );
  };

  return (
    <div className="min-h-screen bg-sky-50/40 text-slate-800 flex flex-col font-sans">
      {/* Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ageMode={ageMode}
        setAgeMode={setAgeMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <HeroSection
              ageMode={ageMode}
              setActiveTab={setActiveTab}
              streakDays={streakDays}
            />

            {/* Quick Feature Modules Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
                    Jelajahi Modul Interaktif
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Pilihan Aktivitas Hari Ini
                  </h2>
                </div>
                <div className="text-xs text-slate-500">
                  <span>Mode Aktif: {ageMode === 'anak' ? 'Anak-Anak Ceria' : 'Remaja Edukatif'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Card 1: Timer 2 Menit */}
                <div
                  onClick={() => { setActiveTab('timer'); soundManager.playPop(); }}
                  className="group bg-white rounded-3xl p-6 border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-sky-200 group-hover:scale-105 transition-transform">
                      🪥
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-sky-600 transition-colors">
                        Sikat Gigi 2 Menit
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Panduan langkah demi langkah menyikat 7 zona gigi dengan musik dan animasi busa sikat.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-sky-600">
                    <span>Mulai Sekarang</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Card 2: Mini Game */}
                <div
                  onClick={() => { setActiveTab('game'); soundManager.playPop(); }}
                  className="group bg-white rounded-3xl p-6 border border-sky-100 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-2xl shadow-sm shadow-amber-200 group-hover:scale-105 transition-transform">
                      🎮
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-amber-600 transition-colors">
                        Game Lawan Kuman
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Tangkap makanan bergizi dan hindari monster plak kuman dalam petualangan gigi sehat!
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-600">
                    <span>Mainkan Game</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Card 3: Anatomi Gigi */}
                <div
                  onClick={() => { setActiveTab('anatomy'); soundManager.playPop(); }}
                  className="group bg-white rounded-3xl p-6 border border-sky-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-emerald-200 group-hover:scale-105 transition-transform">
                      🔬
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-emerald-600 transition-colors">
                        Anatomi Gigi & Karies
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Pelajari lapisan email, dentin, dan saraf gigi serta simulasi bertahap gigi berlubang.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span>Buka Laboratorium</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Card 4: Kuis & Sertifikat */}
                <div
                  onClick={() => { setActiveTab('quiz'); soundManager.playPop(); }}
                  className="group bg-white rounded-3xl p-6 border border-sky-100 shadow-xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-purple-200 group-hover:scale-105 transition-transform">
                      🏆
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-purple-600 transition-colors">
                        Kuis & Sertifikat
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Uji wawasanmu tentang kesehatan mulut dan dapatkan sertifikat digital dengan namamu!
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-purple-600">
                    <span>Ikuti Kuis</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </section>

            {/* Daily "Tahukah Kamu?" Dental Fun Fact Box */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl shrink-0">
                    💡
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                      Fakta Menakjubkan Gigi Hari Ini
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                      Air Liur (Saliva) Adalah Perisai Alami Mulutmu!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      Saat kamu mengunyah makanan berserat seperti apel atau wortel, mulut memproduksi lebih banyak air liur. Air liur mengandung enzim pembersih alami yang menetralkan asam dan membilas sisa makanan agar kuman tidak bisa merusak gigi!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveTab('guide'); soundManager.playPop(); }}
                  className="px-5 py-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
                >
                  Baca Tips Lainnya
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: 2-Minute Timer Simulation */}
        {activeTab === 'timer' && (
          <BrushingTimer onCompleteBrushing={handleCompleteBrushing} />
        )}

        {/* Tab 3: Tooth Game */}
        {activeTab === 'game' && <ToothGame />}

        {/* Tab 4: Tooth Anatomy */}
        {activeTab === 'anatomy' && <ToothAnatomy ageMode={ageMode} />}

        {/* Tab 5: Tips & Guide */}
        {activeTab === 'guide' && <DentalGuide ageMode={ageMode} />}

        {/* Tab 6: Quiz & Certificate */}
        {activeTab === 'quiz' && <DentalQuiz ageMode={ageMode} />}

        {/* Tab 7: Habit Tracker */}
        {activeTab === 'tracker' && (
          <HabitTracker
            records={records}
            onToggleRecord={handleToggleRecord}
            streakDays={streakDays}
            badges={badges}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
