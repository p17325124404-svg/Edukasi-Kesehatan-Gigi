import React from 'react';
import { ActiveTab } from '../types/dental';
import { soundManager } from '../utils/audio';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-white border-t border-sky-100 py-10 mt-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-slate-100">
          
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                🦷
              </div>
              <span className="text-lg font-bold text-slate-900 font-heading">
                GigiPintar
              </span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Platform edukasi interaktif kesehatan gigi dan mulut ramah anak dan remaja. Membantu menumbuhkan kebiasaan sikat gigi 2 menit dengan gembira dan bebas rasa takut.
            </p>
            <p className="text-[11px] text-sky-700 bg-sky-50 p-2.5 rounded-xl border border-sky-100 max-w-md">
              ℹ️ Materi edukasi disesuaikan dengan rekomendasi promotif kesehatan gigi dan mulut Persatuan Dokter Gigi Indonesia (PDGI) & Kementerian Kesehatan RI.
            </p>
          </div>

          {/* Quick Nav (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm font-heading">Modul Pembelajaran</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { setActiveTab('timer'); soundManager.playPop(); }}
                className="text-left text-slate-600 hover:text-sky-600 transition-colors"
              >
                Sikat Gigi 2 Menit
              </button>
              <button
                onClick={() => { setActiveTab('game'); soundManager.playPop(); }}
                className="text-left text-slate-600 hover:text-sky-600 transition-colors"
              >
                Game Lawan Kuman
              </button>
              <button
                onClick={() => { setActiveTab('anatomy'); soundManager.playPop(); }}
                className="text-left text-slate-600 hover:text-sky-600 transition-colors"
              >
                Anatomi & Karies
              </button>
              <button
                onClick={() => { setActiveTab('guide'); soundManager.playPop(); }}
                className="text-left text-slate-600 hover:text-sky-600 transition-colors"
              >
                Tips & Behel Remaja
              </button>
              <button
                onClick={() => { setActiveTab('quiz'); soundManager.playPop(); }}
                className="text-left text-slate-600 hover:text-sky-600 transition-colors"
              >
                Kuis & Sertifikat
              </button>
              <button
                onClick={() => { setActiveTab('tracker'); soundManager.playPop(); }}
                className="text-left text-slate-600 hover:text-sky-600 transition-colors"
              >
                Jurnal Sikat Gigi
              </button>
            </div>
          </div>

          {/* Consultation Reminder (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm font-heading">Pemeriksaan Rutin</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Kunjungi dokter gigi di Puskesmas atau klinik terdekat setiap <span className="font-semibold text-slate-700">6 bulan sekali</span> untuk senyum yang sehat dan ceria!
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} GigiPintar. Semua hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-3">
            <span>Pedoman Gigi Sehat</span>
            <span aria-hidden="true">·</span>
            <span>Edukasi Anak & Remaja Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
