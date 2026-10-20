import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Search,
  Sparkles,
  Check,
  Copy,
  MessageCircle,
} from 'lucide-react';
import { SUNDANESE_DICTIONARY, SundanesePhrase } from '../data/sundaneseDictionary';
import { useLanguage } from '../utils/translations';

export const ModuleSundaneseDictionary: React.FC = () => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPhrases = SUNDANESE_DICTIONARY.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesQuery =
      p.sunda.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.indonesia.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.english.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSpeak = (phrase: SundanesePhrase) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (speakingId === phrase.id) {
      setSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(phrase.sunda);
    utterance.lang = 'id-ID';
    utterance.rate = 0.9; // Slightly slower for clear pronunciation learning
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(phrase.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (phrase: SundanesePhrase) => {
    navigator.clipboard.writeText(`${phrase.sunda} (${phrase.indonesia})`);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F2A21] via-[#173D30] to-[#0A1F18] border border-[#3F7D64]/50 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Kamus Saku Basa Sunda Ramah Wisatawan (100% Luring)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Ungkapan & Percakapan Khas Bogor
        </h2>
        <p className="text-xs sm:text-sm text-[#8FBC94] max-w-2xl leading-relaxed">
          Pelajari kosakata dan sapaan sopan khas Sunda saat berbelanja di UMKM, memesan soto mie, atau menyapa warga Kota Bogor. Dilengkapi fitur pelafalan audio!
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0F2A21]/90 p-3 rounded-2xl border border-[#3F7D64]/30">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'Semua Kategori' },
            { id: 'sapaan', label: '👋 Sapaan & Sopan' },
            { id: 'belanja', label: '🛒 Belanja & Nawar' },
            { id: 'kuliner', label: '🍜 Pesan Makanan' },
            { id: 'arah', label: '🧭 Petunjuk Arah' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow'
                  : 'bg-white/5 text-[#8FBC94] border-transparent hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8FBC94]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kata atau arti..."
            className="w-full bg-[#173D30]/80 border border-[#3F7D64]/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8FBC94]/60 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Phrase Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-[#0F2A21]/95 border border-[#3F7D64]/40 rounded-2xl p-4 shadow-md space-y-2.5 hover:border-amber-400/50 transition group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {phrase.category}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-amber-300 mt-1 leading-snug">
                  {phrase.sunda}
                </h3>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleSpeak(phrase)}
                  className={`p-2 rounded-xl transition ${
                    speakingId === phrase.id
                      ? 'bg-emerald-500 text-slate-950 animate-pulse'
                      : 'bg-white/5 hover:bg-white/10 text-emerald-400'
                  }`}
                  title="Dengarkan Pelafalan"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCopy(phrase)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                  title="Salin Ungkapan"
                >
                  {copiedId === phrase.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-white/90 font-medium">
              🇮🇩 {phrase.indonesia}
            </p>
            <p className="text-[11px] text-white/60 italic">
              🇬🇧 {phrase.english}
            </p>

            <div className="pt-2 border-t border-white/5 text-[11px] space-y-1">
              <p className="text-[#8FBC94] text-[10px]">
                <span className="text-amber-400 font-bold">🗣️ Pelafalan:</span>{' '}
                {phrase.pronunciationTip}
              </p>
              <p className="text-emerald-200/70 text-[10px]">
                <span className="text-emerald-400 font-bold">💡 Konteks:</span> {phrase.context}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
