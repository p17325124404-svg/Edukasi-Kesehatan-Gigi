import React from 'react';
import { ActiveTab, AgeMode } from '../types/dental';
import { Sparkles, Play, Gamepad2, Award, ChevronRight, ShieldCheck, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  ageMode: AgeMode;
  setActiveTab: (tab: ActiveTab) => void;
  streakDays: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  ageMode,
  setActiveTab,
  streakDays,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 md:py-14 bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white">
      {/* Decorative cheerful background bubbles */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-40 right-12 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text & CTA Area (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Contextual eyebrow indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-sky-700 text-xs font-bold border border-sky-200/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span>
                {ageMode === 'anak'
                  ? '🌟 Dunia Seru Gigi Sehat Bersama Si Gigi!'
                  : '💡 Panduan Lengkap Senyum Keren & Gigi Sehat Remaja'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-heading">
              {ageMode === 'anak' ? (
                <>
                  Yuk Sikat Gigi <span className="text-sky-600">2 Menit</span>, Lawan Kuman & Buat Gigimu <span className="text-amber-500">Kinclong!</span>
                </>
              ) : (
                <>
                  Rahasia Senyum Percaya Diri: <span className="text-sky-600">Gigi Kuat</span>, Napas Segar & Bebas Karang.
                </>
              )}
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {ageMode === 'anak'
                ? 'Belajar cara menyikat gigi yang asyik dengan musik timer, main game seru mengalahkan monster plak, dan kumpulkan bintang pahlawan gigi setiap hari!'
                : 'Pahami anatomi gigimu, kuasai teknik sikat gigi yang tidak merusak gusi, tips perawatan behel/kawat gigi, dan hilangkan bau mulut untuk penampilan maksimal.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab('timer');
                  soundManager.playPop();
                }}
                className="px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-base shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Mulai Sikat 2 Menit</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('game');
                  soundManager.playPop();
                }}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-800 font-bold text-base border-2 border-sky-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Gamepad2 className="w-5 h-5 text-sky-500" />
                <span>Main Game Kuman</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('quiz');
                  soundManager.playPop();
                }}
                className="px-5 py-3.5 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-semibold text-sm transition-colors flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-sky-600" />
                <span>Uji Kuis</span>
              </button>
            </div>

            {/* Metric / Stat strip adhering to Anti-slop claim-to-proof */}
            <div className="pt-4 border-t border-sky-200/50 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Standar 2 Menit</span>
                  <span className="text-slate-500">Rekomendasi PDGI & WHO</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">2x Sehari</span>
                  <span className="text-slate-500">Setelah Sarapan & Sebelum Tidur</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold tabular-nums">
                  {streakDays}
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Hari Beruntun</span>
                  <span className="text-slate-500">Streak Kebiasaanmu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mascot Artwork Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative halo ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-300/40 via-cyan-200/30 to-blue-200/20 rounded-3xl blur-xl" />
              
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-white">
                <img
                  src="/src/assets/images/hero_cartoon_tooth_1790349371930.jpg"
                  alt="Ilustrasi Si Gigi Sehat - Maskot Edukasi Kesehatan Gigi dan Mulut"
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Floating cheerful sticker badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label="Sparkle Tooth">✨</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">Si Gigi Berkilau</h4>
                      <p className="text-xs text-sky-600 font-medium">Bebas kuman, siap temani sikat gigi!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('timer');
                      soundManager.playPop();
                    }}
                    className="p-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                    aria-label="Mulai sikat gigi sekarang"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
