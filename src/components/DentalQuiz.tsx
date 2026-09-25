import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/dentalData';
import { AgeMode } from '../types/dental';
import { soundManager } from '../utils/audio';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Printer, User, Star } from 'lucide-react';

interface DentalQuizProps {
  ageMode: AgeMode;
}

export const DentalQuiz: React.FC<DentalQuizProps> = ({ ageMode }) => {
  const [selectedFilter, setSelectedFilter] = useState<AgeMode | 'all'>(ageMode);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('Sahabat Gigi Pintar');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  // Filter questions based on selected quiz mode
  const questions = QUIZ_QUESTIONS.filter(
    (q) => selectedFilter === 'all' || q.mode === 'all' || q.mode === selectedFilter
  );

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      soundManager.playPop();
    } else {
      soundManager.playOops();
    }
  };

  const handleNext = () => {
    soundManager.playPop();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundManager.playSuccessFanfare();
    }
  };

  const handleRestart = () => {
    soundManager.playPop();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleFilterChange = (mode: AgeMode | 'all') => {
    setSelectedFilter(mode);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    soundManager.playPop();
  };

  const scorePercentage = Math.round((score / questions.length) * 100);

  return (
    <div className="py-8 px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Kuis & Sertifikat Digital</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Uji Pengetahuan Gigi Pintar
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Jawab pertanyaan seru seputar gigi, raih nilai sempurna, dan cetak sertifikat penghargaanmu!
        </p>

        {/* Level Switcher */}
        {!isFinished && (
          <div className="flex items-center justify-center gap-2 mt-5 p-1 bg-sky-100/70 rounded-2xl max-w-xs mx-auto">
            <button
              onClick={() => handleFilterChange('all')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl transition-all ${
                selectedFilter === 'all' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => handleFilterChange('anak')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl transition-all ${
                selectedFilter === 'anak' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              Anak
            </button>
            <button
              onClick={() => handleFilterChange('remaja')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl transition-all ${
                selectedFilter === 'remaja' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              Remaja
            </button>
          </div>
        )}
      </div>

      {/* Main Quiz Flow */}
      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sky-100 space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-lg border border-sky-100">
              Pertanyaan {currentIndex + 1} dari {questions.length}
            </span>
            <span className="font-mono text-sky-600 font-semibold tabular-nums">
              Skor: {score} Poin
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-heading">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  btnStyle = 'bg-slate-50 text-slate-400 opacity-60 border-slate-100';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
                selectedAnswer === currentQ.correctIndex
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}
            >
              <span className="font-bold block mb-1">
                {selectedAnswer === currentQ.correctIndex ? '🎉 Jawaban Tepat Sekali!' : '💡 Penjelasan Dokter Gigi:'}
              </span>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>{currentIndex < questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil & Sertifikat'}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result & Digital Certificate View */
        <div className="space-y-6">
          
          {/* Certificate Card */}
          <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50/40 rounded-3xl p-6 sm:p-10 shadow-lg border-4 border-sky-300 relative overflow-hidden">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 text-2xl opacity-60">✨</div>
            <div className="absolute top-3 right-3 text-2xl opacity-60">⭐</div>
            <div className="absolute bottom-3 left-3 text-2xl opacity-60">🦷</div>
            <div className="absolute bottom-3 right-3 text-2xl opacity-60">🏆</div>

            <div className="text-center space-y-4 max-w-lg mx-auto">
              {/* Emblem */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 text-white flex items-center justify-center shadow-lg shadow-amber-200">
                <Award className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-black text-sky-600">
                  SERTIFIKAT PENGHARGAAN
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
                  Pahlawan Senyum Sehat
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                Sertifikat ini secara bangga diberikan kepada:
              </p>

              {/* Editable Recipient Name */}
              <div className="py-2">
                {isEditingName ? (
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="px-4 py-1.5 text-lg sm:text-xl font-bold text-center border-b-2 border-sky-500 focus:outline-hidden"
                      autoFocus
                      onBlur={() => setIsEditingName(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setIsEditingName(true)}
                    className="group cursor-pointer inline-flex items-center gap-2 px-4 py-1.5 rounded-xl hover:bg-sky-50 transition-colors"
                  >
                    <span className="text-xl sm:text-2xl font-black text-sky-900 font-heading underline decoration-sky-300 underline-offset-4">
                      {userName}
                    </span>
                    <span className="text-xs text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      (Klik untuk ubah nama)
                    </span>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-4">
                Telah berhasil menyelesaikan kuis edukasi kesehatan gigi dan mulut dengan nilai memuaskan{' '}
                <span className="font-bold text-sky-600 font-mono">
                  {score} dari {questions.length} Benar ({scorePercentage}%)
                </span>
                , serta berkomitmen merawat giginya tetap bersih, kuat, dan berkilau!
              </p>

              {/* Stars Rating */}
              <div className="flex items-center justify-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round((score / questions.length) * 5)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Seal Stamp */}
              <div className="pt-4 border-t border-sky-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <div className="text-left">
                  <span className="block font-bold text-slate-700">GigiPintar Edu</span>
                  <span>Edukasi Gigi Indonesia</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-700">Tanggal:</span>
                  <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-sky-600" />
              <span>Cetak / Simpan Sertifikat</span>
            </button>

            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
