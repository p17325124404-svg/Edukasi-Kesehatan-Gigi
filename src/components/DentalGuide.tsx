import React, { useState } from 'react';
import { GUIDE_ARTICLES } from '../data/dentalData';
import { AgeMode } from '../types/dental';
import { soundManager } from '../utils/audio';
import { BookOpen, Search, Sparkles, CheckCircle2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface DentalGuideProps {
  ageMode: AgeMode;
}

export const DentalGuide: React.FC<DentalGuideProps> = ({ ageMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedArticleId, setExpandedArticleId] = useState<string>(GUIDE_ARTICLES[0].id);

  // Filter articles based on mode, category, and search query
  const filteredArticles = GUIDE_ARTICLES.filter((article) => {
    // Mode match
    const modeMatch = article.mode === 'all' || article.mode === ageMode;
    // Category match
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    // Search match
    const query = searchQuery.toLowerCase();
    const searchMatch =
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.tags.some((t) => t.toLowerCase().includes(query));

    return modeMatch && categoryMatch && searchMatch;
  });

  const categories = [
    { id: 'all', label: 'Semua Topik' },
    { id: 'kebiasaan', label: 'Teknik & Kebiasaan' },
    { id: 'makanan', label: 'Makanan & Gigi' },
    { id: 'behel', label: 'Kawat Gigi (Behel)' },
    { id: 'masalah', label: 'Solusi Masalah Gigi' },
    { id: 'fakta', label: 'Dokter Gigi & Fakta' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Klinik Edukasi Gigi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Tips & Panduan Perawatan Gigi
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Pengetahuan terpercaya dan mudah dipahami seputar kebersihan mulut, cara mengatasi bau mulut, dan perawatan behel.
        </p>
      </div>

      {/* Featured Artwork Cards: Healthy Food (Kids) & Teen Dental Care (Teens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Child Nutrition Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-sky-100 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-full sm:w-44 h-40 shrink-0 rounded-2xl overflow-hidden bg-sky-50">
            <img
              src="/src/assets/images/healthy_food_tooth_1790349385060.jpg"
              alt="Kartun Gigi Memegang Makanan Sehat"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Pahlawan Makanan
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              Gigi Kuat Dari Makanan Bergizi
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apel, wortel, keju, dan susu menguatkan email gigimu. Hindari permen lengket sebelum tidur!
            </p>
          </div>
        </div>

        {/* Teen Smile & Braces Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-sky-100 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-full sm:w-44 h-40 shrink-0 rounded-2xl overflow-hidden bg-sky-50">
            <img
              src="/src/assets/images/teen_dental_care_1790349398628.jpg"
              alt="Kartun Remaja Senyum Percaya Diri dengan Behel"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
              Percaya Diri Remaja
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              Senyum Sehat Bebas Bau Mulut
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gunakan benang gigi (flossing) dan sikat lidah agar napas segar saat kumpul bersama teman-teman.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-sky-100 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari artikel atau tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-sky-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Clean Unboxed Metadata Counter */}
          <div className="text-xs text-slate-500 flex items-center gap-1.5 self-end sm:self-center">
            <span>Ditemukan: {filteredArticles.length} Panduan</span>
            <span aria-hidden="true">·</span>
            <span>Target: {ageMode === 'anak' ? 'Anak-Anak' : 'Remaja'}</span>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelectedCategory(c.id); soundManager.playPop(); }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Article Accordion List */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-sky-100">
            <p className="text-slate-500 text-sm">Tidak ada artikel yang cocok dengan pencarianmu.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs font-bold text-sky-600 hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          filteredArticles.map((article) => {
            const isExpanded = expandedArticleId === article.id;

            return (
              <div
                key={article.id}
                className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-xs transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => {
                    setExpandedArticleId(isExpanded ? '' : article.id);
                    soundManager.playPop();
                  }}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus-visible:outline-sky-500"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold">
                      <span>{article.category.toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">
                        {article.mode === 'all' ? 'Semua Usia' : article.mode === 'anak' ? 'Anak-Anak' : 'Remaja'}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-700 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-sky-50 space-y-4">
                    {/* Content paragraphs */}
                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {article.content.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* Practical Tips Box */}
                    {article.tips && article.tips.length > 0 && (
                      <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100">
                        <span className="text-xs font-bold text-sky-950 block mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-sky-600" />
                          Tips Praktis Dokter Gigi:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {article.tips.map((t, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Unboxed Tags at bottom */}
                    <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-400">Topik Terkait:</span>
                      {article.tags.map((tag, idx) => (
                        <React.Fragment key={idx}>
                          <span>#{tag}</span>
                          {idx < article.tags.length - 1 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
