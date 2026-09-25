import React, { useState, useEffect, useRef } from 'react';
import { BRUSHING_ZONES } from '../data/dentalData';
import { soundManager } from '../utils/audio';
import { Play, Pause, RotateCcw, SkipForward, CheckCircle2, Sparkles, Smile, Award } from 'lucide-react';

interface BrushingTimerProps {
  onCompleteBrushing: () => void;
}

export const BrushingTimer: React.FC<BrushingTimerProps> = ({ onCompleteBrushing }) => {
  const [currentZoneIdx, setCurrentZoneIdx] = useState<number>(0);
  const [zoneTimeRemaining, setZoneTimeRemaining] = useState<number>(BRUSHING_ZONES[0].duration);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState<number>(120);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; left: number; top: number; size: number }>>([]);

  const currentZone = BRUSHING_ZONES[currentZoneIdx];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Bubble animation generation
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setBubbles((prev) => {
          const next = [
            ...prev.slice(-12),
            {
              id: Date.now() + Math.random(),
              left: Math.random() * 80 + 10,
              top: Math.random() * 80 + 10,
              size: Math.random() * 20 + 12,
            },
          ];
          return next;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Main countdown loop
  useEffect(() => {
    if (isActive && totalSecondsLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTotalSecondsLeft((prev) => prev - 1);

        if (zoneTimeRemaining > 1) {
          setZoneTimeRemaining((prev) => prev - 1);
          soundManager.playTick();
        } else {
          // Switch to next zone
          if (currentZoneIdx < BRUSHING_ZONES.length - 1) {
            const nextIdx = currentZoneIdx + 1;
            setCurrentZoneIdx(nextIdx);
            setZoneTimeRemaining(BRUSHING_ZONES[nextIdx].duration);
            soundManager.playZoneChange();
          } else {
            // Completed all zones!
            setIsActive(false);
            setIsCompleted(true);
            soundManager.playSuccessFanfare();
            onCompleteBrushing();
          }
        }
      }, 1000);
    } else if (totalSecondsLeft === 0 && !isCompleted) {
      setIsActive(false);
      setIsCompleted(true);
      soundManager.playSuccessFanfare();
      onCompleteBrushing();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, totalSecondsLeft, zoneTimeRemaining, currentZoneIdx, isCompleted, onCompleteBrushing]);

  const toggleStartPause = () => {
    soundManager.playPop();
    setIsActive(!isActive);
  };

  const handleReset = () => {
    soundManager.playPop();
    setIsActive(false);
    setIsCompleted(false);
    setCurrentZoneIdx(0);
    setZoneTimeRemaining(BRUSHING_ZONES[0].duration);
    setTotalSecondsLeft(120);
    setBubbles([]);
  };

  const handleNextZone = () => {
    soundManager.playZoneChange();
    if (currentZoneIdx < BRUSHING_ZONES.length - 1) {
      const nextIdx = currentZoneIdx + 1;
      const secondsDeducted = zoneTimeRemaining;
      setCurrentZoneIdx(nextIdx);
      setZoneTimeRemaining(BRUSHING_ZONES[nextIdx].duration);
      setTotalSecondsLeft((prev) => Math.max(0, prev - secondsDeducted));
    } else {
      setIsActive(false);
      setIsCompleted(true);
      soundManager.playSuccessFanfare();
      onCompleteBrushing();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalProgressPercent = Math.min(100, Math.round(((120 - totalSecondsLeft) / 120) * 100));
  const zoneProgressPercent = Math.round(
    ((currentZone.duration - zoneTimeRemaining) / currentZone.duration) * 100
  );

  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Title & Guidance Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulasi 120 Detik (2 Menit)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Panduan Sikat Gigi Interaktif
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Ikuti langkah demi langkah zona gigi di bawah ini. Sikat dengan lembut, jangan buru-buru, dan biarkan gigimu berkilau sehat!
        </p>
      </div>

      {/* Main Interactive Stage & Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Stage (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sky-100 relative overflow-hidden flex flex-col items-center">
          
          {/* Animated lathering bubbles overlay when active */}
          {isActive && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {bubbles.map((b) => (
                <div
                  key={b.id}
                  className="absolute rounded-full bg-sky-200/50 backdrop-blur-xs border border-white animate-bounce-soft"
                  style={{
                    left: `${b.left}%`,
                    top: `${b.top}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    transition: 'all 0.8s ease-out',
                  }}
                />
              ))}
            </div>
          )}

          {/* Current Step Tracker Badge */}
          <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-4">
            <span className="px-3 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-100">
              Langkah {currentZoneIdx + 1} dari {BRUSHING_ZONES.length}
            </span>
            <span className="text-sky-600 font-semibold">{currentZone.section}</span>
          </div>

          {/* Cartoon Tooth Visual Representation */}
          <div className="relative my-4 flex justify-center items-center">
            {/* Pulsing glow background */}
            <div
              className={`w-52 h-52 sm:w-60 sm:h-60 rounded-full flex items-center justify-center transition-colors duration-700 ${
                isActive ? 'bg-sky-100 animate-glow' : 'bg-slate-100'
              }`}
            >
              {/* Tooth SVG Graphic */}
              <div className="relative flex flex-col items-center">
                <svg
                  viewBox="0 0 100 100"
                  className={`w-36 h-36 sm:w-44 sm:h-44 drop-shadow-md transition-transform duration-300 ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                >
                  {/* Clean white tooth shape with smooth roots */}
                  <path
                    d="M 28,15 C 38,12 45,18 50,20 C 55,18 62,12 72,15 C 84,18 88,32 86,48 C 84,62 78,85 70,88 C 65,90 60,82 56,66 C 54,58 46,58 44,66 C 40,82 35,90 30,88 C 22,85 16,62 14,48 C 12,32 16,18 28,15 Z"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  {/* Tooth Enamel Shine Accent */}
                  <path
                    d="M 24,25 C 22,35 24,42 26,48"
                    fill="none"
                    stroke="#bae6fd"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Cartoon Happy Eyes */}
                  <ellipse cx="38" cy="38" rx="4" ry="5.5" fill="#0f172a" />
                  <ellipse cx="62" cy="38" rx="4" ry="5.5" fill="#0f172a" />
                  {/* Eye light reflections */}
                  <circle cx="39.5" cy="36" r="1.5" fill="#ffffff" />
                  <circle cx="63.5" cy="36" r="1.5" fill="#ffffff" />
                  {/* Cheerful Rosy Cheeks */}
                  <circle cx="31" cy="46" r="4.5" fill="#fbcfe8" opacity="0.8" />
                  <circle cx="69" cy="46" r="4.5" fill="#fbcfe8" opacity="0.8" />
                  {/* Smiling Mouth */}
                  <path
                    d="M 40,46 Q 50,56 60,46"
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Brushing Action Brush Graphic (visible while active) */}
                {isActive && (
                  <div className="absolute -right-4 top-10 animate-bounce-soft transform rotate-12">
                    <div className="w-14 h-4 bg-sky-500 rounded-r-md border border-sky-600 shadow-sm flex items-center justify-end px-1">
                      <div className="w-3 h-3 bg-white rounded-xs" />
                    </div>
                    <div className="w-3 h-10 bg-amber-400 rounded-b-md mx-auto" />
                  </div>
                )}
              </div>
            </div>

            {/* Sparkles icon if finished */}
            {isCompleted && (
              <div className="absolute -top-3 right-6 bg-amber-400 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Award className="w-8 h-8" />
              </div>
            )}
          </div>

          {/* Big Digital Countdown */}
          <div className="text-center my-3">
            <span className="text-5xl sm:text-6xl font-black text-slate-800 font-mono tracking-tight tabular-nums">
              {formatTime(totalSecondsLeft)}
            </span>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Sisa Waktu Sesi (Total 2 Menit)
            </div>
          </div>

          {/* Current Zone Timer & Progress Bar */}
          <div className="w-full bg-sky-50 rounded-2xl p-4 border border-sky-100 my-2">
            <div className="flex items-center justify-between text-xs font-bold text-sky-800 mb-1.5">
              <span>Zona Ini: {currentZone.name}</span>
              <span className="tabular-nums font-mono text-sky-600 text-sm">
                {zoneTimeRemaining}s tersisa
              </span>
            </div>
            {/* Zone bar */}
            <div className="w-full h-2.5 bg-sky-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${zoneProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Total 2-min Progress Bar */}
          <div className="w-full mt-2">
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
              <span>Total Progres:</span>
              <span className="tabular-nums">{totalProgressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${totalProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Step Instruction Card */}
          <div className="w-full mt-5 p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-left">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span className="text-base" role="img" aria-label="Arah sikat">👉</span>
              <span>Instruksi Gerakan:</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
              {currentZone.instruction}
            </p>
            <p className="text-xs text-sky-700 font-medium mt-2 bg-white/70 p-2 rounded-lg border border-sky-100">
              💡 <span className="font-semibold">Tips Dokter Gigi:</span> {currentZone.tip}
            </p>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 w-full">
            <button
              onClick={handleReset}
              className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Reset Ulang"
              aria-label="Reset Ulang"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={toggleStartPause}
              className={`px-8 py-3.5 rounded-2xl font-bold text-base flex items-center gap-2 shadow-md transition-all transform active:scale-95 ${
                isActive
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
                  : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-200'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Jeda Sebentar</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>{totalSecondsLeft < 120 ? 'Lanjutkan Sikat' : 'Mulai Sikat Gigi'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleNextZone}
              disabled={isCompleted}
              className="p-3.5 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-700 transition-colors disabled:opacity-40"
              title="Lanjut ke Zona Berikutnya"
              aria-label="Lanjut ke Zona Berikutnya"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Right Guided Checklist & Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-sky-100">
            <h3 className="text-lg font-bold text-slate-900 font-heading mb-4 flex items-center justify-between">
              <span>Urutan 7 Zona Gigi</span>
              <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                {currentZoneIdx + 1} / {BRUSHING_ZONES.length}
              </span>
            </h3>

            <div className="space-y-2.5">
              {BRUSHING_ZONES.map((zone, idx) => {
                const isDone = idx < currentZoneIdx || isCompleted;
                const isCurrent = idx === currentZoneIdx && !isCompleted;

                return (
                  <div
                    key={zone.id}
                    onClick={() => {
                      if (!isActive) {
                        setCurrentZoneIdx(idx);
                        setZoneTimeRemaining(zone.duration);
                        soundManager.playPop();
                      }
                    }}
                    className={`p-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-sky-500 text-white shadow-sm shadow-sky-200 font-medium'
                        : isDone
                        ? 'bg-emerald-50/70 border border-emerald-100 text-emerald-900'
                        : 'bg-slate-50 hover:bg-slate-100/80 text-slate-700 border border-slate-100'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCurrent
                              ? 'bg-white text-sky-700'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold leading-tight">
                          {zone.name}
                        </span>
                        <span
                          className={`text-xs tabular-nums ml-2 font-mono ${
                            isCurrent ? 'text-sky-100' : 'text-slate-400'
                          }`}
                        >
                          {zone.duration}d
                        </span>
                      </div>
                      <span
                        className={`text-[11px] block mt-0.5 ${
                          isCurrent ? 'text-sky-100' : 'text-slate-500'
                        }`}
                      >
                        {zone.section}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Doctor Dental Rule Callout */}
          <div className="bg-sky-50/80 rounded-2xl p-5 border border-sky-100 flex items-start gap-3.5">
            <span className="text-2xl" role="img" aria-label="Pasta Gigi">🪥</span>
            <div className="text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-sky-950 block">Aturan Kumur yang Tepat:</span>
              <p className="leading-relaxed">
                Setelah sikat gigi selesai, cukup buang busa odol lalu berkumur ringan 1 kali saja. Ini agar kandungan fluoride pelindung tetap melapisi gigimu semalaman!
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Completion Modal Celebration */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-sky-100 text-center animate-bounce-soft">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-500 mx-auto flex items-center justify-center text-4xl mb-4 shadow-inner">
              ✨
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
              Hebat! Gigimu Bersih Kinclong!
            </h3>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Kamu berhasil menyelesaikan sikat gigi selama 2 menit penuh. Pasukan kuman plak sudah terusir dan napasmu kini segar!
            </p>

            <div className="my-5 p-3 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-around text-xs font-bold text-sky-800">
              <div>
                <span className="block text-lg text-sky-600 font-black">120s</span>
                <span>Durasi Sikat</span>
              </div>
              <div className="h-8 w-px bg-sky-200" />
              <div>
                <span className="block text-lg text-emerald-600 font-black">7 Zona</span>
                <span>Tersikat Bersih</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCompleted(false);
                soundManager.playPop();
              }}
              className="w-full py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-colors"
            >
              Simpan & Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
