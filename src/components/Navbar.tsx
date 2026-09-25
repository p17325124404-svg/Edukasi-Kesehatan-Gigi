import React from 'react';
import { ActiveTab, AgeMode } from '../types/dental';
import { Sparkles, Volume2, VolumeX, Smile, GraduationCap } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  ageMode: AgeMode;
  setAgeMode: (mode: AgeMode) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  ageMode,
  setAgeMode,
  soundEnabled,
  setSoundEnabled,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
    if (next) soundManager.playPop();
  };

  const handleModeChange = (mode: AgeMode) => {
    setAgeMode(mode);
    soundManager.playPop();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single brand title */}
        <button
          onClick={() => {
            setActiveTab('home');
            soundManager.playPop();
          }}
          className="flex items-center gap-2.5 text-left shrink-0 focus-visible:outline-sky-500 rounded-lg"
        >
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-200">
            <span className="text-2xl select-none" role="img" aria-label="Gigi Sehat">🦷</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-sky-900 font-heading leading-tight">
              GigiPintar
            </span>
            <span className="text-[11px] font-medium text-sky-600 tracking-wide">
              Edukasi Gigi Sehat
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => { setActiveTab('home'); soundManager.playPop(); }}
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-sky-100 text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => { setActiveTab('timer'); soundManager.playPop(); }}
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'timer'
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-200'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Sikat 2 Menit
          </button>
          <button
            onClick={() => { setActiveTab('game'); soundManager.playPop(); }}
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'game'
                ? 'bg-sky-100 text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80'
            }`}
          >
            Game Gigi
          </button>
          <button
            onClick={() => { setActiveTab('anatomy'); soundManager.playPop(); }}
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'anatomy'
                ? 'bg-sky-100 text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80'
            }`}
          >
            Anatomi Gigi
          </button>
          <button
            onClick={() => { setActiveTab('guide'); soundManager.playPop(); }}
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-sky-100 text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80'
            }`}
          >
            Tips & Edukasi
          </button>
          <button
            onClick={() => { setActiveTab('quiz'); soundManager.playPop(); }}
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-sky-100 text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80'
            }`}
          >
            Kuis Pintar
          </button>
          <button
            onClick={() => { setActiveTab('tracker'); soundManager.playPop(); }}
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'tracker'
                ? 'bg-sky-100 text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/80'
            }`}
          >
            Jurnal Sikat
          </button>
        </nav>

        {/* Zone 3: Mode & Sound Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Segmented Mode Control */}
          <div className="flex items-center p-1 bg-sky-100/80 rounded-2xl border border-sky-200/60">
            <button
              onClick={() => handleModeChange('anak')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                ageMode === 'anak'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-800'
              }`}
            >
              <Smile className="w-3.5 h-3.5 text-amber-500" />
              <span>Anak-Anak</span>
            </button>
            <button
              onClick={() => handleModeChange('remaja')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                ageMode === 'remaja'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
              <span>Remaja</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
            className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors"
            title={soundEnabled ? 'Suara Aktif' : 'Suara Bisu'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 bg-sky-50/70 border-t border-sky-100 no-scrollbar">
        <button
          onClick={() => { setActiveTab('home'); soundManager.playPop(); }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap ${
            activeTab === 'home' ? 'bg-sky-500 text-white' : 'text-slate-600 bg-white/70'
          }`}
        >
          Beranda
        </button>
        <button
          onClick={() => { setActiveTab('timer'); soundManager.playPop(); }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap ${
            activeTab === 'timer' ? 'bg-sky-500 text-white' : 'text-slate-600 bg-white/70'
          }`}
        >
          Sikat 2 Menit
        </button>
        <button
          onClick={() => { setActiveTab('game'); soundManager.playPop(); }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap ${
            activeTab === 'game' ? 'bg-sky-500 text-white' : 'text-slate-600 bg-white/70'
          }`}
        >
          Game Gigi
        </button>
        <button
          onClick={() => { setActiveTab('anatomy'); soundManager.playPop(); }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap ${
            activeTab === 'anatomy' ? 'bg-sky-500 text-white' : 'text-slate-600 bg-white/70'
          }`}
        >
          Anatomi
        </button>
        <button
          onClick={() => { setActiveTab('guide'); soundManager.playPop(); }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap ${
            activeTab === 'guide' ? 'bg-sky-500 text-white' : 'text-slate-600 bg-white/70'
          }`}
        >
          Tips
        </button>
        <button
          onClick={() => { setActiveTab('quiz'); soundManager.playPop(); }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap ${
            activeTab === 'quiz' ? 'bg-sky-500 text-white' : 'text-slate-600 bg-white/70'
          }`}
        >
          Kuis
        </button>
        <button
          onClick={() => { setActiveTab('tracker'); soundManager.playPop(); }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap ${
            activeTab === 'tracker' ? 'bg-sky-500 text-white' : 'text-slate-600 bg-white/70'
          }`}
        >
          Jurnal
        </button>
      </div>
    </header>
  );
};
