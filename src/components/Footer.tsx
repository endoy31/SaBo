import React from 'react';
import { Sparkles, Youtube, ExternalLink, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#051810]/90 light:bg-[#f4efe4]/95 backdrop-blur-2xl border-t border-amber-900/30 light:border-amber-800/20 text-amber-100/70 light:text-[#0d2e22]/80 text-xs py-8 px-4 mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-900/20 light:border-amber-800/20 pb-6">
          <div className="space-y-1">
            <h3 className="text-amber-100 light:text-[#0d2e22] font-extrabold text-base flex items-center gap-2">
              SaBo <span className="text-amber-300 light:text-amber-800 font-normal text-xs">• Saba Bogor 2026</span>
            </h3>
            <p className="text-xs text-amber-100/80 light:text-[#3b2818] max-w-md">
              Aplikasi Gamifikasi Edukasi Warisan Budaya, Peta Interaktif, & Hub Kreator Lokal Kota Bogor.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.youtube/@bogortempodulu"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 bg-rose-900/30 light:bg-rose-800/10 hover:bg-rose-900/40 text-rose-200 light:text-rose-900 rounded-2xl border border-rose-700/40 light:border-rose-600/30 flex items-center space-x-1.5 transition font-semibold backdrop-blur-md"
            >
              <Youtube className="w-4 h-4 text-rose-400 light:text-rose-700" />
              <span>Arsip @bogortempodulu</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="https://artsandculture.google.com/search?q=Bogor"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 bg-amber-800/30 light:bg-amber-800/15 hover:bg-amber-800/40 text-amber-200 light:text-amber-900 rounded-2xl border border-amber-600/40 light:border-amber-600/30 flex items-center space-x-1.5 transition font-semibold backdrop-blur-md"
            >
              <span>Google Arts & Culture</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-amber-100/60 light:text-[#3b2818]/70">
          <p>© 2026 SaBo (Saba Bogor) • BIA 2026 & Komunitas Kreatif Bogor.</p>

          <p className="flex items-center gap-1">
            Dirancang oleh <span className="text-amber-300 light:text-amber-900 font-bold">Ihza Fauzan Hamizan & Zahirah Firdaus</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
