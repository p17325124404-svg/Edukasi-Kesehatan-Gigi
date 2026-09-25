import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../utils/audio';
import { Heart, Trophy, RotateCcw, Play, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FallingItem {
  id: number;
  x: number; // percentage 5 - 90
  y: number; // percentage 0 - 100
  speed: number;
  type: 'good' | 'bad';
  name: string;
  emoji: string;
  tip: string;
  points: number;
}

const GOOD_ITEMS = [
  { name: 'Apel Renyah', emoji: '🍎', tip: 'Mengunyah apel membersihkan gigi secara alami!', points: 10 },
  { name: 'Susu Berkalsium', emoji: '🥛', tip: 'Kalsium dan fosfat memperkuat enamel gigi!', points: 15 },
  { name: 'Wortel Sehat', emoji: '🥕', tip: 'Sayur kaya serat memicu air liur pelindung!', points: 10 },
  { name: 'Keju Menetralkan Asam', emoji: '🧀', tip: 'Keju mengembalikan mineral kalsium ke gigi!', points: 15 },
  { name: 'Air Putih Segar', emoji: '💧', tip: 'Membilas sisa gula dan asam dari mulut!', points: 10 },
];

const BAD_ITEMS = [
  { name: 'Monster Kuman Plak', emoji: '👾', tip: 'Kuman memakan gula dan menghasilkan asam perusak gigi!', points: -1 },
  { name: 'Permen Manis Lengket', emoji: '🍭', tip: 'Gula lengket bertahan berjam-jam di celah gigi!', points: -1 },
  { name: 'Soda Bersoda Tinggi Asam', emoji: '🥤', tip: 'Asam fosfat dalam soda mengikis lapisan email gigi!', points: -1 },
];

export const ToothGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('gigipintar_high_score') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [toothX, setToothX] = useState<number>(50); // percentage 5 - 95
  const [items, setItems] = useState<FallingItem[]>([]);
  const [educationalTip, setEducationalTip] = useState<string>('Tangkap makanan sehat bergizi, dan hindari monster kuman serta permen manis!');
  const [gameOver, setGameOver] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setToothX((prev) => Math.max(8, prev - 6));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setToothX((prev) => Math.min(92, prev + 6));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Touch and Mouse control
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlaying || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const relX = ((clientX - rect.left) / rect.width) * 100;
    setToothX(Math.max(8, Math.min(92, relX)));
  };

  const startGame = () => {
    soundManager.playPop();
    setScore(0);
    setLives(3);
    setItems([]);
    setToothX(50);
    setGameOver(false);
    setIsPlaying(true);
    setEducationalTip('Siaga! Tangkap makanan pahlawan gigi dan hindari monster plak!');
    lastSpawnRef.current = Date.now();
  };

  const endGame = useCallback((finalScore: number) => {
    setIsPlaying(false);
    setGameOver(true);
    soundManager.playOops();

    if (finalScore > highScore) {
      setHighScore(finalScore);
      try {
        localStorage.setItem('gigipintar_high_score', finalScore.toString());
      } catch {}
      soundManager.playSuccessFanfare();
    }
  }, [highScore]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    let localItems = items;
    let localLives = lives;
    let localScore = score;

    const loop = () => {
      const now = Date.now();

      // Spawn items every 900ms - 1400ms based on score
      const spawnInterval = Math.max(700, 1300 - Math.floor(localScore / 50) * 80);
      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now;
        const isGood = Math.random() > 0.38; // 62% good items, 38% bad
        const template = isGood
          ? GOOD_ITEMS[Math.floor(Math.random() * GOOD_ITEMS.length)]
          : BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)] ;

        const newItem: FallingItem = {
          id: Math.random(),
          x: Math.random() * 80 + 10,
          y: -5,
          speed: Math.random() * 0.4 + 0.6 + Math.min(0.6, localScore / 300),
          type: isGood ? 'good' : 'bad',
          name: template.name,
          emoji: template.emoji,
          tip: template.tip,
          points: template.points,
        };
        localItems = [...localItems, newItem];
      }

      // Update positions & check collisions
      const nextItems: FallingItem[] = [];
      const toothY = 86; // Tooth basket position

      for (const item of localItems) {
        const newY = item.y + item.speed;

        // Check collision with tooth mascot
        const distanceX = Math.abs(item.x - toothX);
        const distanceY = Math.abs(newY - toothY);

        if (distanceY < 7 && distanceX < 11) {
          // Collided!
          if (item.type === 'good') {
            localScore += item.points;
            setScore(localScore);
            setEducationalTip(`Bagus! ${item.name}: ${item.tip}`);
            soundManager.playPop();
          } else {
            // Hit bad item!
            localLives -= 1;
            setLives(localLives);
            setEducationalTip(`Awas! ${item.name}: ${item.tip}`);
            soundManager.playOops();

            if (localLives <= 0) {
              endGame(localScore);
              return;
            }
          }
          // Do not retain collided item
          continue;
        }

        // Missed check (fell off bottom)
        if (newY < 102) {
          nextItems.push({ ...item, y: newY });
        }
      }

      localItems = nextItems;
      setItems(nextItems);

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, toothX, endGame]);

  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mini Game Edukasi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Petualangan Menjaga Si Gigi
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Geser Si Gigi ke kiri dan kanan untuk menangkap makanan bergizi dan hindari monster plak serta permen manis!
        </p>
      </div>

      {/* Game Board Container */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-sky-100">
        
        {/* Score & Lives Status Bar */}
        <div className="flex items-center justify-between bg-sky-50 rounded-2xl p-3 sm:p-4 mb-4 border border-sky-100">
          {/* Lives */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600 mr-1 hidden sm:inline">Kekuatan Gigi:</span>
            {[1, 2, 3].map((heartIndex) => (
              <Heart
                key={heartIndex}
                className={`w-6 h-6 transition-transform ${
                  heartIndex <= lives
                    ? 'text-rose-500 fill-rose-500 scale-100'
                    : 'text-slate-300 scale-90'
                }`}
              />
            ))}
          </div>

          {/* Current Score */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-500 block">Skor Kamu</span>
              <span className="text-xl sm:text-2xl font-black text-sky-800 tabular-nums font-mono">
                {score}
              </span>
            </div>
          </div>

          {/* High Score */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-sky-200">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-700 tabular-nums">
              Rekor: {highScore}
            </span>
          </div>
        </div>

        {/* Game Canvas Area */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          className="relative w-full h-96 sm:h-[420px] bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white rounded-2xl border-2 border-sky-200 overflow-hidden select-none cursor-pointer touch-none"
        >
          {/* Cloud & Bubbles background aesthetics */}
          <div className="absolute top-4 left-6 text-3xl opacity-40 pointer-events-none">☁️</div>
          <div className="absolute top-10 right-10 text-2xl opacity-40 pointer-events-none">☁️</div>
          <div className="absolute bottom-16 left-12 text-xl opacity-30 pointer-events-none">✨</div>

          {/* Falling Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform pointer-events-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              <div
                className={`flex flex-col items-center justify-center p-2 rounded-2xl shadow-sm ${
                  item.type === 'good'
                    ? 'bg-white/90 border border-emerald-200'
                    : 'bg-rose-50/90 border border-rose-300'
                }`}
              >
                <span className="text-2xl sm:text-3xl filter drop-shadow-xs">{item.emoji}</span>
              </div>
            </div>
          ))}

          {/* Player: Cartoon Tooth with Basket */}
          <div
            className="absolute bottom-3 transform -translate-x-1/2 pointer-events-none transition-all duration-75"
            style={{ left: `${toothX}%` }}
          >
            <div className="relative flex flex-col items-center">
              {/* Cute Tooth Mascot SVG */}
              <svg viewBox="0 0 100 100" className="w-18 h-18 sm:w-22 sm:h-22 drop-shadow-md">
                <path
                  d="M 28,15 C 38,12 45,18 50,20 C 55,18 62,12 72,15 C 84,18 88,32 86,48 C 84,62 78,85 70,88 C 65,90 60,82 56,66 C 54,58 46,58 44,66 C 40,82 35,90 30,88 C 22,85 16,62 14,48 C 12,32 16,18 28,15 Z"
                  fill="#ffffff"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                />
                <ellipse cx="38" cy="38" rx="4" ry="5" fill="#0f172a" />
                <ellipse cx="62" cy="38" rx="4" ry="5" fill="#0f172a" />
                <circle cx="39" cy="36" r="1.5" fill="#ffffff" />
                <circle cx="63" cy="36" r="1.5" fill="#ffffff" />
                <circle cx="30" cy="46" r="4" fill="#fbcfe8" />
                <circle cx="70" cy="46" r="4" fill="#fbcfe8" />
                <path d="M 40,48 Q 50,58 60,48" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              </svg>

              {/* Catch Tray / Toothbrush Platform */}
              <div className="w-24 sm:w-28 h-3.5 bg-sky-500 rounded-full border-2 border-white shadow-md flex items-center justify-center -mt-2">
                <div className="w-6 h-1 bg-sky-200 rounded-full" />
              </div>
            </div>
          </div>

          {/* Start Screen Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-sky-900/30 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-3xl mb-3">
                🦷
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading drop-shadow-md">
                Siap Melindungi Si Gigi?
              </h3>
              <p className="text-white/90 text-xs sm:text-sm max-w-sm my-2">
                Geser ke kiri dan kanan menggunakan mouse, sentuhan jari, atau tombol panah keyboard!
              </p>
              <button
                onClick={startGame}
                className="mt-3 px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-base shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Mulai Bermain</span>
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-sky-100">
                <span className="text-4xl block mb-2" role="img" aria-label="Game Over Trophy">
                  {score >= 100 ? '🎉' : '💪'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  {score >= 100 ? 'Luar Biasa, Pahlawan Gigi!' : 'Permainan Selesai!'}
                </h3>
                <p className="text-slate-600 text-xs mt-1">
                  Skor akhirmu: <span className="font-bold text-sky-600 font-mono text-base">{score}</span>
                </p>

                <div className="my-4 p-3 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-slate-700 text-left">
                  <span className="font-bold text-sky-900 block mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    Pesan Kesehatan Gigi:
                  </span>
                  Ingat untuk selalu berkumur dengan air putih setelah makan manis dan sikat gigimu 2 kali sehari!
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Lagi</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Educational Tip Bar */}
        <div className="mt-4 p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500 text-white shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-tight">
            <span className="font-bold text-sky-900">Catatan Gigi: </span>
            {educationalTip}
          </div>
        </div>

      </div>
    </div>
  );
};
