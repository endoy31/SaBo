import React, { useState } from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  Droplets,
  Wind,
  Thermometer,
  Sparkles,
  RefreshCw,
  X,
  Compass,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Plane,
  ChevronRight,
  Info,
} from 'lucide-react';
import { BogorWeatherData, HeritageLocation } from '../types';
import { HERITAGE_LOCATIONS } from '../data/bogorData';
import { useLanguage } from '../utils/translations';

interface WeatherMoodModalProps {
  weather: BogorWeatherData;
  onRefreshWeather: () => Promise<void>;
  onSimulateWeatherPreset: (preset?: string) => void;
  onClose: () => void;
  onNavigateToMapWithCoords?: (lat: number, lng: number, zoom?: number) => void;
}

export const WeatherMoodModal: React.FC<WeatherMoodModalProps> = ({
  weather,
  onRefreshWeather,
  onSimulateWeatherPreset,
  onClose,
  onNavigateToMapWithCoords,
}) => {
  const { lang } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshWeather();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Find locations corresponding to recommendation
  const recommendedLocations = HERITAGE_LOCATIONS.filter((loc) =>
    weather.heritageMood.recommendedHeritageIds.includes(loc.id)
  );

  const cautionLocations = HERITAGE_LOCATIONS.filter((loc) =>
    weather.heritageMood.cautionHeritageIds.includes(loc.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in select-none">
      <div className="w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-[#0F2A21] via-[#14392E] to-[#0A1F18] border border-[#3F7D64]/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#173D30]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/40 flex items-center justify-center text-xl shadow">
              {weather.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-base sm:text-lg text-white">
                  {lang === 'en' ? 'Bogor Weather & Heritage Mood' : 'Cuaca Real-Time & Mood Kunjungan Cagar Budaya'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  {weather.isLiveApi ? '● Open-Meteo Live' : '● Climate Simulator'}
                </span>
              </div>
              <p className="text-[11px] text-[#8FBC94]">
                Koordinat Kota Bogor (-6.5950°, 106.8166°) • Update: {weather.lastUpdated}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95 disabled:opacity-50 cursor-pointer"
              title="Perbarui Cuaca"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Scroll */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          {/* Main Weather Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#173D30] to-[#0D261E] border border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-5xl sm:text-6xl drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                {weather.icon}
              </span>
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {weather.temperature}°C
                  </span>
                  <span className="text-xs text-[#8FBC94] font-medium">
                    (Terasa {weather.apparentTemperature}°C)
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-amber-300 mt-0.5">
                  {lang === 'en' ? weather.conditionLabelEn : weather.conditionLabel}
                </h4>
              </div>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-2 w-full sm:w-auto text-center">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-center text-emerald-400 mb-0.5">
                  <Droplets className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-[#8FBC94] block">Kelembapan</span>
                <span className="font-black text-xs text-white">{weather.humidity}%</span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-center text-cyan-400 mb-0.5">
                  <CloudRain className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-[#8FBC94] block">Peluang Hujan</span>
                <span className="font-black text-xs text-white">{weather.precipitationProbability}%</span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-center text-amber-400 mb-0.5">
                  <Wind className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-[#8FBC94] block">Angin</span>
                <span className="font-black text-xs text-white">{weather.windSpeed} km/h</span>
              </div>
            </div>
          </div>

          {/* Interactive Preset Climate Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulasi Iklim Khas Kota Bogor</span>
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: undefined, label: '📡 Live Real-Time' },
                { id: 'rain', label: '🌧️ Hujan Khas' },
                { id: 'storm', label: '⛈️ Hujan Petir' },
                { id: 'cloudy', label: '⛅ Berawan Sejuk' },
                { id: 'sunny', label: '☀️ Cerah Pagi' },
                { id: 'mist', label: '🌫️ Kabut Salak' },
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => onSimulateWeatherPreset(p.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-white/5 hover:bg-white/15 text-white/90 border border-white/10 transition active:scale-95 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Heritage Mood Assessment Box */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#173D30]/80 border-2 border-amber-400/70 space-y-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">
                {weather.heritageMood.status === 'rain_sheltered'
                  ? '☔'
                  : weather.heritageMood.status === 'storm_caution'
                  ? '⛈️'
                  : weather.heritageMood.status === 'sunny_energetic'
                  ? '☀️'
                  : '🌿'}
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  {lang === 'en' ? 'Heritage Visit Recommendation Index' : 'Indeks Rekomendasi Kunjungan Cagar Budaya'}
                </span>
                <h4 className="font-black text-sm sm:text-base text-white">
                  {lang === 'en' ? weather.heritageMood.titleEn : weather.heritageMood.title}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed bg-black/30 p-3 rounded-2xl border border-white/10">
              {lang === 'en' ? weather.heritageMood.adviceEn : weather.heritageMood.advice}
            </p>

            {/* Recommended Spots */}
            {recommendedLocations.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Destinasi Sangat Dianjurkan Sesuai Cuaca Ini:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendedLocations.map((loc) => (
                    <div
                      key={loc.id}
                      className="p-3 rounded-2xl bg-black/40 border border-emerald-500/40 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <h5 className="font-bold text-xs text-white truncate">{loc.name}</h5>
                        <span className="text-[10px] text-[#8FBC94] block truncate">
                          📍 {loc.address}
                        </span>
                      </div>
                      {onNavigateToMapWithCoords && (
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateToMapWithCoords(loc.coordinates.lat, loc.coordinates.lng, 16.8);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[11px] border border-amber-500/40 flex items-center gap-1 flex-shrink-0 cursor-pointer"
                        >
                          <Plane className="w-3 h-3 text-amber-400" />
                          <span>Fokus</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Caution Spots */}
            {cautionLocations.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-extrabold text-red-300 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Perhatian / Waspada Cuaca:</span>
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {cautionLocations.map((loc) => (
                    <div
                      key={loc.id}
                      className="p-3 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <h5 className="font-bold text-red-200">{loc.name}</h5>
                        <p className="text-[11px] text-red-300/80 mt-0.5">
                          Jalur taman basah dan licin saat hujan deras. Wajib membawa payung lipat atau sepatu anti-slip.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 12-Hour Hourly Forecast Strip */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8FBC94] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Prakiraan Cuaca Bogor 12 Jam ke Depan</span>
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {weather.hourlyForecast.map((hour, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-2xl bg-black/40 border border-white/10 text-center space-y-1"
                >
                  <span className="text-[10px] font-mono text-[#8FBC94] block">{hour.time}</span>
                  <span className="font-black text-sm text-white block">{hour.temp}°C</span>
                  <div className="flex items-center justify-center space-x-0.5 text-[10px] text-cyan-300">
                    <CloudRain className="w-3 h-3" />
                    <span>{hour.pop}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-black/40 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
