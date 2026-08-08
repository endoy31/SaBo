import React from 'react';
import { MapPin, Sparkles, ChevronRight, X, Award } from 'lucide-react';
import { HeritageLocation } from '../types';
import { formatDistance } from '../utils/geolocationManager';

interface ProximityAlertBannerProps {
  nearbyPlace: {
    id: string;
    name: string;
    distanceMeters: number;
    image: string;
    xpReward: number;
  };
  onOpenQuest: () => void;
  onDismiss: () => void;
}

export const ProximityAlertBanner: React.FC<ProximityAlertBannerProps> = ({
  nearbyPlace,
  onOpenQuest,
  onDismiss,
}) => {
  return (
    <div className="fixed top-20 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 bg-[#0a271c]/90 backdrop-blur-2xl border border-amber-600/50 rounded-3xl p-4 shadow-2xl text-amber-100 animate-bounce-short">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-1.5 text-amber-300 font-extrabold text-xs">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>Notifikasi Geofencing Lokasi!</span>
        </div>
        <button
          onClick={onDismiss}
          className="text-amber-200/60 hover:text-amber-100 p-1 rounded-full hover:bg-amber-900/30 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-3 mt-2.5">
        <img
          src={nearbyPlace.image}
          alt={nearbyPlace.name}
          className="w-14 h-14 rounded-2xl object-cover border border-amber-500/50 flex-shrink-0 shadow-md bg-emerald-950"
        />

        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-amber-100/90 leading-snug">
            Kamu berada dekat dengan{' '}
            <span className="font-extrabold text-amber-300">
              {nearbyPlace.name}
            </span>{' '}
            (<span className="text-emerald-300 font-bold">{formatDistance(nearbyPlace.distanceMeters)}</span>)!
          </p>

          <button
            onClick={onOpenQuest}
            className="mt-2.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 via-amber-700 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-amber-100 font-extrabold text-xs rounded-xl transition flex items-center space-x-1 shadow-lg border border-amber-500/30"
          >
            <Award className="w-3.5 h-3.5 text-amber-200" />
            <span>Mulai Quest & Audio</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
