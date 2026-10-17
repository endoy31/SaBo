import React from 'react';
import { Bell, Flame, ChevronRight, X, Sparkles, MapPin } from 'lucide-react';
import { HeritageLocation } from '../types';
import { useLanguage } from '../utils/translations';
import { formatDistance } from '../utils/geolocationManager';

interface DailyChallengeNotificationBannerProps {
  location: HeritageLocation;
  bonusXp: number;
  streak: number;
  distanceMeters?: number;
  onOpenChallenge: () => void;
  onDismiss: () => void;
}

export const DailyChallengeNotificationBanner: React.FC<DailyChallengeNotificationBannerProps> = ({
  location,
  bonusXp,
  streak,
  distanceMeters,
  onOpenChallenge,
  onDismiss,
}) => {
  const { lang, t } = useLanguage();

  return (
    <div className="fixed top-16 sm:top-20 right-3 left-3 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-slide-in">
      <div className="bg-gradient-to-r from-[#0F2A21]/95 via-[#173D30]/95 to-[#1B4D3E]/95 backdrop-blur-xl border-2 border-amber-500/60 rounded-2xl p-3.5 shadow-2xl text-[#F7F1E3] ring-1 ring-amber-400/30">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2.5">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-xs">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('daily_notif_banner_title')}</span>
            </div>
            {streak > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>Streak {streak}d</span>
              </span>
            )}
          </div>
          <button
            onClick={onDismiss}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={location.image}
            alt={location.name}
            className="w-13 h-13 rounded-xl object-cover border border-amber-500/50 flex-shrink-0 bg-emerald-950 shadow"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-sm text-[#F7F1E3] truncate">
                {location.name}
              </span>
            </div>
            <p className="text-[11px] text-[#B8D5BC] line-clamp-1 mt-0.5">
              {location.address}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px]">
              <span className="font-extrabold text-amber-400 flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/40">
                <Sparkles className="w-3 h-3" />
                +{bonusXp} Bonus XP
              </span>
              {distanceMeters !== undefined && (
                <span className="text-[#8FBC94] flex items-center gap-0.5 text-[10px]">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {formatDistance(distanceMeters)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
          <button
            onClick={onOpenChallenge}
            className="flex-1 py-1.5 px-3 bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>{t('daily_btn_view_challenge')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDismiss}
            className="py-1.5 px-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            {lang === 'en' ? 'Later' : 'Nanti Saja'}
          </button>
        </div>
      </div>
    </div>
  );
};
