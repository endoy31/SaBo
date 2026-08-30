import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Compass,
  Palette,
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  User,
  Wifi,
  WifiOff,
  Sparkles,
  Sun,
  Moon,
  Globe,
  Trophy,
  Flame,
} from 'lucide-react';
import { UserProfile } from '../types';
import { useLanguage } from '../utils/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  onOpenProfile: () => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  isGpsActive: boolean;
  setIsGpsActive: (val: boolean) => void;
  theme?: 'dark' | 'light';
  setTheme?: (theme: 'dark' | 'light') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenProfile,
  isOffline,
  setIsOffline,
  isGpsActive,
  setIsGpsActive,
  theme = 'dark',
  setTheme,
}) => {
  const { lang, setLang, t } = useLanguage();
  const nextLevelXp = user.level * 250;
  const xpPercent = Math.min(100, Math.round((user.xp / nextLevelXp) * 100));

  // XP Animation Count-Up
  const [displayedXp, setDisplayedXp] = useState<number>(user.xp);
  const [xpGainedFloating, setXpGainedFloating] = useState<number | null>(null);
  const prevXpRef = useRef<number>(user.xp);

  useEffect(() => {
    const prev = prevXpRef.current;
    if (user.xp > prev) {
      const diff = user.xp - prev;
      setXpGainedFloating(diff);

      const startTime = performance.now();
      const duration = 1200; // ms

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const current = Math.round(prev + diff * progress);
        setDisplayedXp(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayedXp(user.xp);
          setTimeout(() => setXpGainedFloating(null), 1200);
        }
      };
      requestAnimationFrame(step);
    } else {
      setDisplayedXp(user.xp);
    }
    prevXpRef.current = user.xp;
  }, [user.xp]);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-2xl transition-colors duration-300 shadow-xl ${
        theme === 'light'
          ? 'bg-[#F7F1E3]/95 text-[#0F2A21] border-b border-[#8FBC94]/40'
          : 'bg-[#0F2A21]/90 text-[#F7F1E3] border-b border-[#3F7D64]/40'
      }`}
    >
      {/* Top Strip Info */}
      <div
        className={`border-b text-xs px-4 py-1.5 flex flex-wrap justify-between items-center transition-colors ${
          theme === 'light'
            ? 'bg-[#FFFFFF]/70 border-[#8FBC94]/30 text-[#173D30]'
            : 'bg-[#071914]/80 border-[#3F7D64]/25 text-[#B8D5BC]'
        }`}
      >
        <div className="flex items-center space-x-3">
          <span className="font-bold text-[#C17817] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> SaBo • Saba Bogor 2026
          </span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span className="hidden sm:inline text-xs opacity-90">
            {t('app_tagline')}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              lang === 'en'
                ? 'bg-[#C17817]/25 text-[#F59E0B] border-[#F59E0B]/50 hover:bg-[#C17817]/35'
                : 'bg-[#1B4D3E] text-[#8FBC94] border-[#3F7D64]/50 hover:bg-[#1B4D3E]/80'
            }`}
            title={lang === 'id' ? 'Switch to English (Tourist Mode)' : 'Ganti ke Bahasa Indonesia'}
          >
            <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
            <span className="text-[9px] opacity-75 font-normal ml-0.5">
              ({lang === 'id' ? 'English' : 'Indonesia'})
            </span>
          </button>

          {/* Theme Switcher Toggle */}
          {setTheme && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition border border-white/10 hover:bg-white/10 cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Ganti ke Mode Gelap'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{t('theme_light')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#1B4D3E]" />
                  <span>{t('theme_dark')}</span>
                </>
              )}
            </button>
          )}

          {/* GPS Toggle */}
          <button
            onClick={() => setIsGpsActive(!isGpsActive)}
            className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
              isGpsActive
                ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                : 'bg-stone-500/10 text-stone-400 border border-stone-400/20'
            }`}
            title="GPS Location Simulator"
          >
            <MapPin className="w-3 h-3" />
            <span>{isGpsActive ? t('gps_active') : t('gps_off')}</span>
          </button>

          {/* Offline Map Mode Toggle */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
              isOffline
                ? 'bg-[#C17817]/25 text-[#F59E0B] border border-[#C17817]/40'
                : 'bg-[#1B4D3E]/60 text-[#8FBC94] border border-[#3F7D64]/40'
            }`}
            title="Offline Map Mode"
          >
            {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            <span>{isOffline ? t('mode_offline') : t('mode_online')}</span>
          </button>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('map')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1B4D3E] via-[#C17817] to-[#F59E0B] p-0.5 shadow-lg group-hover:scale-105 transition transform">
            <div className="w-full h-full bg-[#0F2A21] rounded-[14px] flex items-center justify-center font-black text-[#F59E0B] text-lg tracking-wider">
              SB
            </div>
          </div>
          <div>
            <h1 className="font-black text-lg leading-tight tracking-tight flex items-center gap-2">
              <span>SaBo</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#C17817]/20 text-[#F59E0B] border border-[#C17817]/40 rounded-full font-bold">
                Saba Bogor
              </span>
            </h1>
            <p className="text-[11px] text-[#8FBC94]">
              Heritage Gamification & Local Tourism
            </p>
          </div>
        </div>

        {/* User XP & Level Widget with Animated Count-Up */}
        <div
          onClick={onOpenProfile}
          className="relative flex items-center space-x-3 bg-[#173D30]/80 hover:bg-[#1B4D3E] border border-[#3F7D64]/50 rounded-2xl p-1.5 px-3 cursor-pointer transition shadow-md group"
        >
          {/* Floating XP badge animation */}
          {xpGainedFloating !== null && (
            <div className="absolute -top-7 right-4 z-50 animate-float-xp bg-gradient-to-r from-[#F59E0B] to-[#FDE047] text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full border border-white shadow-xl pointer-events-none flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>+{xpGainedFloating} XP</span>
            </div>
          )}

          <div className="relative">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-9 h-9 rounded-xl object-cover border-2 border-[#F59E0B] bg-[#0F2A21]"
            />
            <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#C17817] to-[#F59E0B] text-white font-black text-[9px] px-1.5 rounded-full border border-[#0F2A21] shadow">
              Lvl {user.level}
            </span>
          </div>

          <div className="hidden md:block text-left w-32">
            <div className="flex justify-between items-center text-xs mb-1 font-medium">
              <span className="text-[#F7F1E3] truncate max-w-[80px] font-bold">
                {user.username}
              </span>
              <span className="text-[#F59E0B] text-[10px] font-black">
                {displayedXp.toLocaleString()} XP
              </span>
            </div>
            <div className="w-full bg-[#0F2A21] rounded-full h-1.5 overflow-hidden border border-[#3F7D64]/30">
              <div
                className="bg-gradient-to-r from-[#C17817] via-[#F59E0B] to-[#34D399] h-full rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center text-[#F59E0B] pl-1">
            <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </div>
        </div>
      </div>

      {/* Navigation Module Tabs */}
      <nav className="bg-[#071914]/80 border-t border-[#3F7D64]/25 px-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex space-x-1.5 py-1.5 text-xs">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'map'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] border border-[#8FBC94]/50 shadow-md'
                : 'text-[#8FBC94] hover:bg-[#1B4D3E]/40 hover:text-[#F7F1E3] border border-transparent'
            }`}
          >
            <Compass className="w-4 h-4 text-[#34D399]" />
            <span>{t('nav_map')}</span>
          </button>

          {/* New Leaderboard Tab (§5) */}
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-[#C17817]/25 text-[#F59E0B] border border-[#F59E0B] shadow-md ring-1 ring-[#F59E0B]/40'
                : 'text-[#8FBC94] hover:bg-[#1B4D3E]/40 hover:text-[#F7F1E3] border border-transparent'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#F59E0B]" />
            <span>{t('nav_leaderboard')}</span>
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse ml-0.5" />
          </button>

          <button
            onClick={() => setActiveTab('creators')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'creators'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] border border-[#8FBC94]/50 shadow-md'
                : 'text-[#8FBC94] hover:bg-[#1B4D3E]/40 hover:text-[#F7F1E3] border border-transparent'
            }`}
          >
            <Palette className="w-4 h-4 text-[#F59E0B]" />
            <span>{t('nav_creators')}</span>
          </button>

          <button
            onClick={() => setActiveTab('heritage')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'heritage'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] border border-[#8FBC94]/50 shadow-md'
                : 'text-[#8FBC94] hover:bg-[#1B4D3E]/40 hover:text-[#F7F1E3] border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#34D399]" />
            <span>{t('nav_heritage')}</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] border border-[#8FBC94]/50 shadow-md'
                : 'text-[#8FBC94] hover:bg-[#1B4D3E]/40 hover:text-[#F7F1E3] border border-transparent'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#34D399]" />
            <span>{t('nav_planner')}</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'community'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] border border-[#8FBC94]/50 shadow-md'
                : 'text-[#8FBC94] hover:bg-[#1B4D3E]/40 hover:text-[#F7F1E3] border border-transparent'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#F59E0B]" />
            <span>{t('nav_community')}</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold text-[#8FBC94] hover:bg-[#1B4D3E]/40 hover:text-[#F7F1E3] whitespace-nowrap ml-auto border border-transparent cursor-pointer"
          >
            <User className="w-4 h-4 text-[#F59E0B]" />
            <span>{t('nav_profile')}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
