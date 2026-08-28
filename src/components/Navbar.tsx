import React from 'react';
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

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-2xl transition-colors duration-300 shadow-2xl ${
        theme === 'light'
          ? 'bg-[#f4efe4]/90 text-[#0d2e22] border-b border-amber-800/20'
          : 'bg-[#071c14]/85 text-[#f7f4eb] border-b border-amber-900/30'
      }`}
    >
      {/* Top Strip info */}
      <div
        className={`backdrop-blur-md border-b text-xs px-4 py-1.5 flex flex-wrap justify-between items-center transition-colors ${
          theme === 'light'
            ? 'bg-amber-800/10 border-amber-800/15 text-[#1a4030]'
            : 'bg-amber-950/25 border-amber-900/20 text-amber-100/90'
        }`}
      >
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-amber-600 dark:text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" /> SaBo • Saba Bogor 2026
          </span>
          <span className="hidden sm:inline text-emerald-800">|</span>
          <span className="hidden sm:inline opacity-80">
            {t('app_tagline')}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Bilingual Language Switcher Toggle */}
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition backdrop-blur-md shadow-sm border ${
              lang === 'en'
                ? 'bg-amber-500/25 text-amber-300 border-amber-400/50 hover:bg-amber-500/35'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
            title={lang === 'id' ? 'Switch to English (Tourist Mode)' : 'Ganti ke Bahasa Indonesia'}
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
            <span className="text-[9px] opacity-75 font-normal ml-0.5">
              ({lang === 'id' ? 'English' : 'Indonesia'})
            </span>
          </button>

          {/* Theme Switcher Toggle (Light vs Dark Mode) */}
          {setTheme && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition backdrop-blur-md shadow-sm border ${
                theme === 'light'
                  ? 'bg-amber-800/15 hover:bg-amber-800/25 text-amber-900 border-amber-800/30'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-amber-200 border-emerald-500/40'
              }`}
              title={
                theme === 'dark'
                  ? lang === 'en'
                    ? 'Switch to Light Mode'
                    : 'Ganti ke Mode Terang'
                  : lang === 'en'
                  ? 'Switch to Dark Mode'
                  : 'Ganti ke Mode Gelap'
              }
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('theme_light')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{t('theme_dark')}</span>
                </>
              )}
            </button>
          )}

          {/* GPS Toggle */}
          <button
            onClick={() => setIsGpsActive(!isGpsActive)}
            className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition backdrop-blur-md ${
              isGpsActive
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                : 'bg-stone-500/10 text-stone-500 border border-stone-400/20'
            }`}
            title="GPS Location System"
          >
            <MapPin className="w-3 h-3" />
            <span>{isGpsActive ? t('gps_active') : t('gps_off')}</span>
          </button>

          {/* Offline Map Mode Toggle */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition backdrop-blur-md ${
              isOffline
                ? 'bg-amber-700/30 text-amber-800 dark:text-amber-200 border border-amber-600/40'
                : 'bg-emerald-600/30 text-emerald-800 dark:text-emerald-200 border border-emerald-500/40'
            }`}
            title="Offline Map Mode"
          >
            {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            <span>{isOffline ? t('mode_offline') : t('mode_online')}</span>
          </button>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('map')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-amber-700 to-amber-600 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition transform">
            <div className="w-full h-full bg-[#051710] rounded-[14px] flex items-center justify-center font-bold text-amber-300 text-xl tracking-wider">
              SB
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-stone-100 to-amber-300 flex items-center gap-2">
              SaBo{' '}
              <span className="text-[10px] px-2 py-0.5 bg-emerald-700/30 text-amber-200 border border-amber-600/30 rounded-full font-medium">
                Saba Bogor
              </span>
            </h1>
            <p className="text-[11px] text-amber-200/70">
              Heritage Gamification & Local Tourism
            </p>
          </div>
        </div>

        {/* User XP & Level Widget */}
        <div
          onClick={onOpenProfile}
          className="flex items-center space-x-3 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-800/30 rounded-2xl p-1.5 px-3 cursor-pointer transition backdrop-blur-md shadow-md"
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-9 h-9 rounded-xl object-cover border border-amber-500/50 bg-emerald-950"
            />
            <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 font-extrabold text-[10px] px-1.5 rounded-full border border-[#051710] shadow">
              Lvl {user.level}
            </span>
          </div>

          <div className="hidden md:block text-left w-32">
            <div className="flex justify-between items-center text-xs mb-1 font-medium">
              <span className="text-amber-100 truncate max-w-[80px] font-semibold">
                {user.username}
              </span>
              <span className="text-amber-300 text-[10px] font-bold">{user.xp} XP</span>
            </div>
            <div className="w-full bg-[#051710] rounded-full h-1.5 overflow-hidden border border-amber-900/30">
              <div
                className="bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center text-amber-400 pl-1">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Navigation Module Tabs */}
      <nav className="bg-[#051810]/60 backdrop-blur-md border-t border-amber-900/20 px-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex space-x-1.5 py-1.5 text-xs">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition backdrop-blur-md ${
              activeTab === 'map'
                ? 'bg-amber-800/35 text-amber-200 border border-amber-600/50 font-bold shadow-lg shadow-amber-950/20'
                : 'text-amber-100/80 hover:bg-amber-900/30 hover:text-amber-100 border border-transparent'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>{t('nav_map')}</span>
          </button>

          <button
            onClick={() => setActiveTab('creators')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition backdrop-blur-md ${
              activeTab === 'creators'
                ? 'bg-amber-800/35 text-amber-200 border border-amber-600/50 font-bold shadow-lg shadow-amber-950/20'
                : 'text-amber-100/80 hover:bg-amber-900/30 hover:text-amber-100 border border-transparent'
            }`}
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span>{t('nav_creators')}</span>
          </button>

          <button
            onClick={() => setActiveTab('heritage')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition backdrop-blur-md ${
              activeTab === 'heritage'
                ? 'bg-amber-800/35 text-amber-200 border border-amber-600/50 font-bold shadow-lg shadow-amber-950/20'
                : 'text-amber-100/80 hover:bg-amber-900/30 hover:text-amber-100 border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>{t('nav_heritage')}</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition backdrop-blur-md ${
              activeTab === 'planner'
                ? 'bg-amber-800/35 text-amber-200 border border-amber-600/50 font-bold shadow-lg shadow-amber-950/20'
                : 'text-amber-100/80 hover:bg-amber-900/30 hover:text-amber-100 border border-transparent'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{t('nav_planner')}</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition backdrop-blur-md ${
              activeTab === 'community'
                ? 'bg-amber-800/35 text-amber-200 border border-amber-600/50 font-bold shadow-lg shadow-amber-950/20'
                : 'text-amber-100/80 hover:bg-amber-900/30 hover:text-amber-100 border border-transparent'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            <span>{t('nav_community')}</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl font-medium text-amber-100/80 hover:bg-amber-900/30 hover:text-amber-100 whitespace-nowrap ml-auto border border-transparent"
          >
            <User className="w-4 h-4 text-amber-300/80" />
            <span>{t('nav_profile')}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
