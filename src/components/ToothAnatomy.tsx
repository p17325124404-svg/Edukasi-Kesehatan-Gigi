import React, { useState } from 'react';
import { ANATOMY_PARTS, DECAY_STAGES } from '../data/dentalData';
import { AgeMode } from '../types/dental';
import { soundManager } from '../utils/audio';
import { Info, AlertCircle, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface ToothAnatomyProps {
  ageMode: AgeMode;
}

export const ToothAnatomy: React.FC<ToothAnatomyProps> = ({ ageMode }) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('enamel');
  const [decayStage, setDecayStage] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<'layer' | 'decay' | 'teethType'>('layer');

  const selectedPart = ANATOMY_PARTS.find((p) => p.id === selectedPartId) || ANATOMY_PARTS[0];
  const currentDecay = DECAY_STAGES.find((d) => d.stage === decayStage) || DECAY_STAGES[0];

  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Laboratorium Anatomi Interaktif</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Rahasia Di Dalam Gigimu
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Gigi bukan hanya benda putih keras biasa, tapi memiliki lapisan-lapisan istimewa dan saraf yang hidup!
        </p>

        {/* Sub-tab navigation */}
        <div className="flex items-center justify-center gap-2 mt-5 p-1.5 bg-sky-100/70 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => { setActiveSubTab('layer'); soundManager.playPop(); }}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeSubTab === 'layer' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-sky-900'
            }`}
          >
            Lapisan Gigi
          </button>
          <button
            onClick={() => { setActiveSubTab('decay'); soundManager.playPop(); }}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeSubTab === 'decay' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-sky-900'
            }`}
          >
            Tahap Karies Gigi
          </button>
          <button
            onClick={() => { setActiveSubTab('teethType'); soundManager.playPop(); }}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeSubTab === 'teethType' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-sky-900'
            }`}
          >
            Susu vs Permanen
          </button>
        </div>
      </div>

      {/* Subtab 1: Interactive Layers */}
      {activeSubTab === 'layer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Cross-Section SVG Diagram (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-sky-100 flex flex-col items-center">
            <span className="text-xs font-bold text-sky-600 mb-2">
              Klik pada tombol atau diagram untuk melihat penjelasannya
            </span>

            {/* SVG Cross-Section Illustration of Molar Tooth */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 my-2">
              <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-md">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="enamelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e0f2fe" />
                  </linearGradient>
                  <linearGradient id="dentinGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#fde047" />
                  </linearGradient>
                  <linearGradient id="pulpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fda4af" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                  <linearGradient id="gumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                  <linearGradient id="boneGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </linearGradient>
                </defs>

                {/* Jaw Bone Foundation */}
                <rect x="10" y="145" width="180" height="110" rx="16" fill="url(#boneGrad)" stroke="#cbd5e1" strokeWidth="2" />
                <text x="100" y="248" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="600">Tulang Alveolar (Rahang)</text>

                {/* Pink Gums */}
                <path
                  d="M 10,140 Q 60,118 80,122 Q 100,128 120,122 Q 140,118 190,140 L 190,165 L 10,165 Z"
                  fill="url(#gumGrad)"
                  stroke="#e11d48"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => { setSelectedPartId('gusi'); soundManager.playPop(); }}
                />

                {/* Tooth Roots (Akar Gigi) */}
                <g
                  className="cursor-pointer"
                  onClick={() => { setSelectedPartId('akar'); soundManager.playPop(); }}
                >
                  {/* Left Root */}
                  <path
                    d="M 50,125 C 48,150 52,195 62,225 C 65,225 72,215 76,190 C 82,160 85,135 88,125 Z"
                    fill="#fef9c3"
                    stroke="#ca8a04"
                    strokeWidth="2"
                  />
                  {/* Right Root */}
                  <path
                    d="M 112,125 C 115,135 118,160 124,190 C 128,215 135,225 138,225 C 148,195 152,150 150,125 Z"
                    fill="#fef9c3"
                    stroke="#ca8a04"
                    strokeWidth="2"
                  />
                </g>

                {/* Crown Enamel (Outer layer) */}
                <path
                  d="M 40,125 C 32,80 34,42 62,28 C 80,20 90,30 100,32 C 110,30 120,20 138,28 C 166,42 168,80 160,125 C 145,125 130,125 100,125 C 70,125 55,125 40,125 Z"
                  fill="url(#enamelGrad)"
                  stroke={selectedPartId === 'enamel' ? '#0284c7' : '#94a3b8'}
                  strokeWidth={selectedPartId === 'enamel' ? '4' : '2'}
                  className="cursor-pointer hover:opacity-95 transition-all"
                  onClick={() => { setSelectedPartId('enamel'); soundManager.playPop(); }}
                />

                {/* Dentin Layer (Middle yellow layer) */}
                <path
                  d="M 52,125 C 46,90 48,60 70,48 C 85,42 92,48 100,50 C 108,48 115,42 130,48 C 152,60 154,90 148,125 Z"
                  fill="url(#dentinGrad)"
                  stroke={selectedPartId === 'dentin' ? '#ca8a04' : '#eab308'}
                  strokeWidth={selectedPartId === 'dentin' ? '3.5' : '1.5'}
                  className="cursor-pointer hover:opacity-95 transition-all"
                  onClick={() => { setSelectedPartId('dentin'); soundManager.playPop(); }}
                />

                {/* Dental Pulp Chamber (Innermost Pink/Red with nerves) */}
                <path
                  d="M 72,125 C 70,105 70,85 82,75 C 88,70 94,76 100,78 C 106,76 112,70 118,75 C 130,85 130,105 128,125 C 122,140 126,170 130,210 C 127,210 124,180 118,155 C 110,135 90,135 82,155 C 76,180 73,210 70,210 C 74,170 78,140 72,125 Z"
                  fill="url(#pulpGrad)"
                  stroke={selectedPartId === 'pulpa' ? '#e11d48' : '#be123c'}
                  strokeWidth={selectedPartId === 'pulpa' ? '3.5' : '1.5'}
                  className="cursor-pointer hover:opacity-95 transition-all"
                  onClick={() => { setSelectedPartId('pulpa'); soundManager.playPop(); }}
                />

                {/* Nerve Branch Lines */}
                <path d="M 100,82 Q 102,110 100,135" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2,2" />
                <path d="M 98,140 Q 86,170 72,210" stroke="#fbbf24" strokeWidth="1.5" />
                <path d="M 102,140 Q 114,170 128,210" stroke="#fbbf24" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Quick selector buttons */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {ANATOMY_PARTS.map((part) => (
                <button
                  key={part.id}
                  onClick={() => { setSelectedPartId(part.id); soundManager.playPop(); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    selectedPartId === part.id
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-sky-50'
                  }`}
                >
                  {part.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Right Explanation Card (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-sky-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div>
                <span className="text-xs font-mono font-semibold text-sky-600 block">
                  {selectedPart.latinName}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  {selectedPart.name}
                </h3>
              </div>
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm"
                style={{ backgroundColor: selectedPart.color }}
              >
                🔬
              </div>
            </div>

            {/* Description adapted to Child vs Teen */}
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100">
              <span className="text-xs font-bold text-sky-800 block mb-1">
                {ageMode === 'anak' ? '🌟 Penjelasan Si Gigi:' : '📖 Kajian Medis Gigi:'}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {ageMode === 'anak' ? selectedPart.descriptionChild : selectedPart.descriptionTeen}
              </p>
            </div>

            {/* Function */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Fungsi Utama:
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {selectedPart.function}
              </p>
            </div>

            {/* Vulnerability & Danger */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-900 leading-tight">
                <span className="font-bold block mb-0.5">Titik Rawan Kuman:</span>
                {selectedPart.vulnerability}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-emerald-900 leading-tight">
                <span className="font-bold block mb-0.5">Fakta Menarik:</span>
                {selectedPart.funFact}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Subtab 2: Decay Simulator */}
      {activeSubTab === 'decay' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sky-100 space-y-6">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              Bagaimana Gigi Bisa Berlubang?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Gigi tidak langsung berlubang dalam semalam. Geser tahapan di bawah ini untuk melihat apa yang terjadi di dalam gigi:
            </p>
          </div>

          {/* Stepper / Slider */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
              <span>Tahap Awal (Bintik)</span>
              <span>Tahap Parah (Abses)</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => { setDecayStage(s); soundManager.playPop(); }}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                    decayStage === s
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-200 scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-rose-50'
                  }`}
                >
                  Tahap {s}
                </button>
              ))}
            </div>
          </div>

          {/* Active Decay Stage Detail Card */}
          <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-rose-50/60 border border-rose-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-bold text-xs">
                Tingkat Kerusakan {currentDecay.stage} dari 4
              </span>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {currentDecay.stage <= 2 ? 'Kategori Ringan' : 'Kategori Berat'}
              </span>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                {currentDecay.title}
              </h4>
              <p className="text-xs font-semibold text-rose-600">
                {currentDecay.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentDecay.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-rose-100">
                <span className="text-xs font-bold text-slate-800 block mb-1">Gejala yang Dirasakan:</span>
                <p className="text-xs text-slate-600">{currentDecay.symptoms}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 block mb-1">Tindakan & Solusi:</span>
                <p className="text-xs text-slate-600">{currentDecay.treatment}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Primary vs Permanent Teeth */}
      {activeSubTab === 'teethType' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sky-100 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              Gigi Susu vs Gigi Dewasa (Permanen)
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Tahukah kamu bahwa manusia mengalami dua kali pertumbuhan gigi dalam hidupnya?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Teeth */}
            <div className="p-6 rounded-3xl bg-sky-50/70 border border-sky-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-xl font-bold font-mono">
                  20
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">Gigi Susu (Deciduous)</h4>
                  <span className="text-xs text-sky-700 font-medium">Masa Kanak-Kanak</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mulai tumbuh sejak bayi berusia sekitar 6 bulan dan lengkap berjumlah 20 gigi pada usia 2,5 - 3 tahun.
              </p>

              <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>8 Gigi Seri (memotong makanan)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>4 Gigi Taring (merobek makanan)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>8 Gigi Geraham Susu (melumat makanan)</span>
                </li>
              </ul>

              <div className="p-3 bg-white rounded-xl border border-sky-200 text-xs text-sky-900">
                <span className="font-bold">Fungsi penting:</span> Menjaga ruang agar gigi permanen tumbuh lurus dan rapi di masa depan!
              </div>
            </div>

            {/* Permanent Teeth */}
            <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold font-mono">
                  32
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">Gigi Permanen (Dewasa)</h4>
                  <span className="text-xs text-indigo-700 font-medium">Masa Remaja & Dewasa</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mulai menggantikan gigi susu sejak usia 6 tahun dan bertahan seumur hidup kita jika dirawat dengan baik.
              </p>

              <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>8 Gigi Seri + 4 Gigi Taring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>8 Gigi Premolar (geraham kecil)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>12 Gigi Molar (termasuk 4 gigi bungsu)</span>
                </li>
              </ul>

              <div className="p-3 bg-white rounded-xl border border-indigo-200 text-xs text-indigo-900">
                <span className="font-bold">Catatan Remaja:</span> Gigi bungsu (geraham ketiga) umumnya tumbuh pada rentang usia 17–21 tahun.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
