import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Volume2,
  Timer,
  Flame,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { useLanguage } from '../utils/translations';

interface ModuleMiniGamesProps {
  user: UserProfile;
  onAwardXp: (amount: number, reason: string) => void;
}

// 1. Trivia Questions Pool
const TRIVIA_QUESTIONS = [
  {
    q: 'Buitenzorg, nama lama Kota Bogor peninggalan Gubernur Jenderal Baron van Imhoff, memiliki arti harfiah...',
    options: ['Kota Hujan Abadi', 'Bebas dari Masalah/Cemas', 'Pusat Kebun Raya', 'Taman Bunga Salak'],
    correct: 1,
    fact: 'Buitenzorg berasal dari bahasa Belanda yang berarti "Sans Souci" atau "Bebas dari Masalah/Kesibukan Duniawi".',
  },
  {
    q: 'Prasasti Batutulis dibuat pada tahun 1533 M oleh Raja Surawisesa untuk mengenang kejayaan...',
    options: ['Prabu Siliwangi (Sri Baduga Maharaja)', 'Sultan Hasanuddin', 'Rangga Gading', 'Raden Saleh'],
    correct: 0,
    fact: 'Sri Baduga Maharaja memimpin Kerajaan Sunda Pakuan Pajajaran selama 39 tahun masa keemasan.',
  },
  {
    q: 'Pohon kelapa sawit pertama yang diperkenalkan ke Asia Tenggara ditanam di Kebun Raya Bogor pada tahun...',
    options: ['1744', '1817', '1848', '1945'],
    correct: 2,
    fact: 'Empat biji kelapa sawit asal Mauritius & Amsterdam ditanam di Kebun Raya Bogor pada 1848.',
  },
  {
    q: 'Bahan pembungkus beras alami yang memberikan aroma harum khas pada lontong Doclang Bogor adalah daun...',
    options: ['Daun Pisang', 'Daun Patat', 'Daun Jati', 'Daun Pandan'],
    correct: 1,
    fact: 'Daun patat (Phrynium pubinerve) adalah tanaman herba khas hutan Bogor yang memberi wangi khas.',
  },
  {
    q: 'Rusa totol yang berkeliaran di pelataran Istana Bogor didatangkan dari perbatasan Nepal oleh...',
    options: ['G.W. Baron van Imhoff', 'Sir Stamford Raffles', 'Caspar Reinwardt', 'Presiden Soekarno'],
    correct: 1,
    fact: 'Sir Stamford Raffles mendatangkan sepasang rusa totol (Axis axis) dari Nepal pada tahun 1814.',
  },
  {
    q: 'Simbol senjata pusaka khas masyarakat Sunda yang berdiri kokoh di tugu utama Kota Bogor bernama...',
    options: ['Keris', 'Kujang', 'Rencong', 'Mandau'],
    correct: 1,
    fact: 'Kujang melambangkan keberanian, ketajaman akal budi, dan perlindungan tanah Pajajaran.',
  },
];

// 2. Aksara Sunda Kuno (Kaganga) Flashcard Pool
const AKSARA_SUNDA_CARDS = [
  { glyph: 'ᮊ', sound: 'Ka', meaning: 'Aksara Ngalagena Ka', hint: 'Huruf K dalam aksara Sunda' },
  { glyph: 'ᮌ', sound: 'Ga', meaning: 'Aksara Ngalagena Ga', hint: 'Huruf G dalam aksara Sunda' },
  { glyph: 'ᮎ', sound: 'Ca', meaning: 'Aksara Ngalagena Ca', hint: 'Huruf C dalam aksara Sunda' },
  { glyph: 'ᮏ', sound: 'Ja', meaning: 'Aksara Ngalagena Ja', hint: 'Huruf J dalam aksara Sunda' },
  { glyph: 'ᮒ', sound: 'Ta', meaning: 'Aksara Ngalagena Ta', hint: 'Huruf T dalam aksara Sunda' },
  { glyph: 'ᮓ', sound: 'Da', meaning: 'Aksara Ngalagena Da', hint: 'Huruf D dalam aksara Sunda' },
  { glyph: 'ᮔ', sound: 'Na', meaning: 'Aksara Ngalagena Na', hint: 'Huruf N dalam aksara Sunda' },
  { glyph: 'ᮘ', sound: 'Ba', meaning: 'Aksara Ngalagena Ba', hint: 'Huruf B dalam aksara Sunda' },
  { glyph: 'ᮙ', sound: 'Ma', meaning: 'Aksara Ngalagena Ma', hint: 'Huruf M dalam aksara Sunda' },
  { glyph: 'ᮛ', sound: 'Ra', meaning: 'Aksara Ngalagena Ra', hint: 'Huruf R dalam aksara Sunda' },
];

export const ModuleMiniGames: React.FC<ModuleMiniGamesProps> = ({
  user,
  onAwardXp,
}) => {
  const { lang } = useLanguage();
  const [activeGame, setActiveGame] = useState<'trivia' | 'aksara'>('trivia');

  // Trivia State
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [triviaScore, setTriviaScore] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [triviaFinished, setTriviaFinished] = useState<boolean>(false);

  // Aksara Sunda State
  const [aksaraIndex, setAksaraIndex] = useState<number>(0);
  const [aksaraOptions, setAksaraOptions] = useState<string[]>([]);
  const [aksaraSelected, setAksaraSelected] = useState<string | null>(null);
  const [aksaraScore, setAksaraScore] = useState<number>(0);
  const [aksaraAnswered, setAksaraAnswered] = useState<boolean>(false);

  // Generate options for Aksara game
  useEffect(() => {
    const current = AKSARA_SUNDA_CARDS[aksaraIndex];
    const pool = AKSARA_SUNDA_CARDS.map((c) => c.sound).filter((s) => s !== current.sound);
    // Shuffle pool and pick 3 wrong answers
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [current.sound, ...shuffled].sort(() => 0.5 - Math.random());
    setAksaraOptions(combined);
    setAksaraSelected(null);
    setAksaraAnswered(false);
  }, [aksaraIndex]);

  // Handle Trivia Option Click
  const handleSelectTriviaOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === TRIVIA_QUESTIONS[currentQIndex].correct;
    if (isCorrect) {
      const addedScore = 20 + streakCount * 5;
      setTriviaScore((prev) => prev + addedScore);
      setStreakCount((prev) => prev + 1);
      onAwardXp(addedScore, 'Jawaban Kuis Pintar Benar');
    } else {
      setStreakCount(0);
    }
  };

  const handleNextTrivia = () => {
    if (currentQIndex < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setTriviaFinished(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleResetTrivia = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTriviaScore(0);
    setStreakCount(0);
    setTriviaFinished(false);
  };

  // Handle Aksara Option Click
  const handleSelectAksaraOption = (sound: string) => {
    if (aksaraAnswered) return;
    setAksaraSelected(sound);
    setAksaraAnswered(true);

    const current = AKSARA_SUNDA_CARDS[aksaraIndex];
    if (sound === current.sound) {
      setAksaraScore((prev) => prev + 25);
      onAwardXp(25, 'Tebak Aksara Sunda Benar');
    }
  };

  const handleNextAksara = () => {
    if (aksaraIndex < AKSARA_SUNDA_CARDS.length - 1) {
      setAksaraIndex((prev) => prev + 1);
    } else {
      setAksaraIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Mini-Games Header */}
      <div className="bg-gradient-to-r from-[#0F2A21] via-[#173D30] to-[#0A1F18] border border-[#3F7D64]/50 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>Pusat Mini-Game Edukasi Budaya (100% Luring & Bebas Biaya)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Tantangan Pintar Pajajaran
          </h2>
          <p className="text-xs sm:text-sm text-[#8FBC94] mt-1">
            Uji pengetahuan sejarah, aksara kuno, dan kuliner khas Bogor sambil menambah XP penjelajahmu!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveGame('trivia')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeGame === 'trivia'
                ? 'bg-amber-500 text-slate-950 font-black shadow'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Kuis Cepat</span>
          </button>

          <button
            onClick={() => setActiveGame('aksara')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeGame === 'aksara'
                ? 'bg-amber-500 text-slate-950 font-black shadow'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tebak Aksara Sunda</span>
          </button>
        </div>
      </div>

      {/* GAME 1: Trivia Challenge */}
      {activeGame === 'trivia' && (
        <div className="bg-[#0F2A21]/90 border border-[#3F7D64]/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
          {!triviaFinished ? (
            <>
              {/* Question Meta Bar */}
              <div className="flex items-center justify-between text-xs text-[#8FBC94] pb-3 border-b border-white/10">
                <span className="font-bold text-white">
                  Pertanyaan {currentQIndex + 1} dari {TRIVIA_QUESTIONS.length}
                </span>

                <div className="flex items-center space-x-3">
                  {streakCount > 1 && (
                    <span className="flex items-center space-x-1 text-amber-400 font-bold animate-pulse">
                      <Flame className="w-4 h-4 fill-amber-400" />
                      <span>{streakCount}x Streak!</span>
                    </span>
                  )}
                  <span className="font-mono text-amber-300 font-black text-sm">
                    Skor: {triviaScore} XP
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-2xl bg-[#173D30]/60 border border-white/10">
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-relaxed">
                  {TRIVIA_QUESTIONS[currentQIndex].q}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRIVIA_QUESTIONS[currentQIndex].options.map((option, idx) => {
                  const isCorrect = idx === TRIVIA_QUESTIONS[currentQIndex].correct;
                  const isChosen = selectedOption === idx;

                  let btnStyle = 'bg-[#173D30]/80 border-white/10 text-white hover:bg-[#1B4D3E]';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600/40 border-emerald-400 text-emerald-200 font-bold';
                    } else if (isChosen) {
                      btnStyle = 'bg-red-600/40 border-red-400 text-red-200';
                    } else {
                      btnStyle = 'opacity-50 border-transparent';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectTriviaOption(idx)}
                      disabled={isAnswered}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                      )}
                      {isAnswered && isChosen && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-2 animate-fade-in">
                  <p className="font-semibold text-amber-300">💡 Tahukah Kamu?</p>
                  <p className="leading-relaxed">{TRIVIA_QUESTIONS[currentQIndex].fact}</p>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextTrivia}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow active:scale-95 cursor-pointer"
                    >
                      <span>Lanjut</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Trivia Finished Summary */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-3xl border border-amber-400 shadow-xl">
                🏆
              </div>
              <h3 className="font-black text-xl text-white">Kuis Selesai! Luar Biasa!</h3>
              <p className="text-xs text-[#8FBC94] max-w-md mx-auto">
                Kamu telah menyelesaikan semua pertanyaan seputar sejarah Kota Hujan. Total perolehan:
              </p>
              <div className="inline-block p-4 rounded-2xl bg-black/40 border border-amber-500/40 text-amber-300 font-mono font-black text-2xl">
                +{triviaScore} XP Diperoleh
              </div>
              <div>
                <button
                  onClick={handleResetTrivia}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-bold text-xs shadow-lg active:scale-95 cursor-pointer"
                >
                  Mainkan Ulang Kuis
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: Aksara Sunda Kuno (Kaganga) */}
      {activeGame === 'aksara' && (
        <div className="bg-[#0F2A21]/90 border border-[#3F7D64]/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-[#8FBC94]">
            <span className="font-bold text-white">
              Kartu {aksaraIndex + 1} dari {AKSARA_SUNDA_CARDS.length}
            </span>
            <span className="font-mono text-amber-300 font-black">
              Skor Aksara: {aksaraScore} XP
            </span>
          </div>

          {/* Flashcard Display */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#173D30] to-[#0A1F18] border-2 border-amber-400/60 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mb-2">
              Aksara Ngalagena Sunda Kuno
            </span>
            <span className="text-7xl sm:text-8xl font-serif text-white py-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              {AKSARA_SUNDA_CARDS[aksaraIndex].glyph}
            </span>
            <p className="text-xs text-[#8FBC94] mt-2 italic">
              "Bagaimana pelafalan aksara Kawi/Sunda di atas?"
            </p>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {aksaraOptions.map((sound, idx) => {
              const current = AKSARA_SUNDA_CARDS[aksaraIndex];
              const isCorrect = sound === current.sound;
              const isChosen = aksaraSelected === sound;

              let btnClass = 'bg-[#173D30] border-white/10 text-white hover:bg-[#1B4D3E]';
              if (aksaraAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-600/50 border-emerald-400 text-emerald-200 font-black';
                } else if (isChosen) {
                  btnClass = 'bg-red-600/50 border-red-400 text-red-200';
                } else {
                  btnClass = 'opacity-40 border-transparent';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAksaraOption(sound)}
                  disabled={aksaraAnswered}
                  className={`p-4 rounded-2xl border text-center font-black text-lg transition shadow cursor-pointer ${btnClass}`}
                >
                  <span>{sound}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {aksaraAnswered && (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-emerald-500/30 text-xs">
              <span className="text-emerald-300 font-semibold">
                {aksaraSelected === AKSARA_SUNDA_CARDS[aksaraIndex].sound
                  ? '🎉 Tepat sekali! Pelafalannya adalah "' + AKSARA_SUNDA_CARDS[aksaraIndex].sound + '" (+25 XP)'
                  : 'Jawaban yang tepat: "' + AKSARA_SUNDA_CARDS[aksaraIndex].sound + '"'}
              </span>

              <button
                onClick={handleNextAksara}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center space-x-1 shadow active:scale-95 cursor-pointer"
              >
                <span>Aksara Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
