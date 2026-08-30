import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Flame,
  Search,
  Sparkles,
  School,
  MapPin,
  Palette,
  Users,
  Compass,
  ArrowUp,
  Activity,
  Award,
} from 'lucide-react';
import { UserProfile, LeaderboardEntry } from '../types';
import { useLanguage } from '../utils/translations';
import { AVATAR_PRESETS } from '../data/avatars';

interface ModuleLeaderboardProps {
  user: UserProfile;
  onNavigateToMap: () => void;
}

const INITIAL_LEADERBOARD_DATA: Omit<LeaderboardEntry, 'rank' | 'isCurrentUser'>[] = [
  {
    id: 'lb_1',
    username: 'Prabu Arya Suryakencana',
    avatar: AVATAR_PRESETS[6]?.avatarUrl || AVATAR_PRESETS[0].avatarUrl,
    schoolOrInst: 'SMA Negeri 1 Bogor',
    district: 'Bogor Tengah',
    category: 'sekolah',
    xp: 2850,
    level: 5,
    badgeCount: 7,
    questsCompleted: 18,
    recentActivity: 'Menyelesaikan Quest Prasasti Batutulis (+150 XP)',
  },
  {
    id: 'lb_2',
    username: 'Nadhira Kirana Putri',
    avatar: AVATAR_PRESETS[7]?.avatarUrl || AVATAR_PRESETS[1].avatarUrl,
    schoolOrInst: 'SMA Regina Pacis Bogor',
    district: 'Bogor Timur',
    category: 'sekolah',
    xp: 2420,
    level: 4,
    badgeCount: 6,
    questsCompleted: 15,
    recentActivity: 'Mendapatkan Lencana Botani Master (+200 XP)',
  },
  {
    id: 'lb_3',
    username: 'Bagas Wira Pasundan',
    avatar: AVATAR_PRESETS[3]?.avatarUrl || AVATAR_PRESETS[2].avatarUrl,
    schoolOrInst: 'SMK Negeri 1 Bogor',
    district: 'Bogor Selatan',
    category: 'sekolah',
    xp: 1980,
    level: 3,
    badgeCount: 5,
    questsCompleted: 12,
    recentActivity: 'Menjelajahi Klenteng Pan Kho Bio (+100 XP)',
  },
  {
    id: 'lb_4',
    username: 'Sanggar Seni Sunda Kujang',
    avatar: AVATAR_PRESETS[5]?.avatarUrl || AVATAR_PRESETS[0].avatarUrl,
    schoolOrInst: 'Komunitas Budaya Helaran',
    district: 'Bogor Tengah',
    category: 'kreator',
    xp: 1750,
    level: 3,
    badgeCount: 4,
    questsCompleted: 11,
    recentActivity: 'Menulis 8 Ulasan Destinasi Terverifikasi',
  },
  {
    id: 'lb_5',
    username: 'Rafi Al-Fathir',
    avatar: AVATAR_PRESETS[1]?.avatarUrl || AVATAR_PRESETS[0].avatarUrl,
    schoolOrInst: 'SMA Negeri 3 Bogor',
    district: 'Tanah Sareal',
    category: 'sekolah',
    xp: 1540,
    level: 3,
    badgeCount: 4,
    questsCompleted: 9,
    recentActivity: 'Menyelesaikan Rute Wisata Kopi Suryakencana',
  },
  {
    id: 'lb_6',
    username: 'Kecamatan Bogor Barat Squad',
    avatar: AVATAR_PRESETS[2]?.avatarUrl || AVATAR_PRESETS[0].avatarUrl,
    schoolOrInst: 'Pemuda Pelopor Bogor Barat',
    district: 'Bogor Barat',
    category: 'kecamatan',
    xp: 1320,
    level: 2,
    badgeCount: 3,
    questsCompleted: 8,
    recentActivity: 'Misi Heritage Cagar Budaya Jembatan Merah',
  },
  {
    id: 'lb_7',
    username: 'Siti Sarah Botani',
    avatar: AVATAR_PRESETS[2]?.avatarUrl || AVATAR_PRESETS[0].avatarUrl,
    schoolOrInst: 'IPB University',
    district: 'Bogor Utara',
    category: 'sekolah',
    xp: 1180,
    level: 2,
    badgeCount: 3,
    questsCompleted: 7,
    recentActivity: 'Menuntaskan Trivia Kebun Raya Bogor',
  },
  {
    id: 'lb_8',
    username: 'Batik Handayani Lovers',
    avatar: AVATAR_PRESETS[5]?.avatarUrl || AVATAR_PRESETS[0].avatarUrl,
    schoolOrInst: 'Komunitas Ekraf Bogor',
    district: 'Bogor Timur',
    category: 'kreator',
    xp: 950,
    level: 2,
    badgeCount: 2,
    questsCompleted: 6,
    recentActivity: 'Kunjungan Galeri Batik Tradisional',
  },
];

export const ModuleLeaderboard: React.FC<ModuleLeaderboardProps> = ({
  user,
  onNavigateToMap,
}) => {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sekolah' | 'kecamatan' | 'kreator'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Combine static contenders with current user profile
  const allEntries: LeaderboardEntry[] = useMemo(() => {
    const userEntry: Omit<LeaderboardEntry, 'rank' | 'isCurrentUser'> = {
      id: 'current_user',
      username: user.username || 'Penjelajah SaBo (Kamu)',
      avatar: user.avatar || AVATAR_PRESETS[0].avatarUrl,
      schoolOrInst: user.schoolOrInst || 'Pelajar Kota Bogor',
      district: 'Bogor Tengah',
      category: 'sekolah',
      xp: user.xp,
      level: user.level,
      badgeCount: user.badges.length,
      questsCompleted: user.completedQuests.length,
      recentActivity: 'Aktif Menjelajah Warisan Budaya',
    };

    const combined = [...INITIAL_LEADERBOARD_DATA, userEntry];
    // Sort descending by XP
    combined.sort((a, b) => b.xp - a.xp);

    return combined.map((item, index) => ({
      ...item,
      rank: index + 1,
      isCurrentUser: item.id === 'current_user',
    }));
  }, [user]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return allEntries.filter((entry) => {
      const matchesCategory =
        selectedCategory === 'all' || entry.category === selectedCategory;
      const matchesSearch =
        entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.schoolOrInst.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allEntries, selectedCategory, searchQuery]);

  // Current user rank
  const currentUserRank = useMemo(() => {
    return allEntries.find((e) => e.isCurrentUser);
  }, [allEntries]);

  // Next contender above user
  const nextContender = useMemo(() => {
    if (!currentUserRank || currentUserRank.rank === 1) return null;
    return allEntries[currentUserRank.rank - 2];
  }, [allEntries, currentUserRank]);

  // Top 3 for podium
  const top1 = filteredEntries[0];
  const top2 = filteredEntries[1];
  const top3 = filteredEntries[2];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0F2A21] via-[#1B4D3E] to-[#0F2A21] border border-[#3F7D64]/40 shadow-2xl text-[#F7F1E3]">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C17817]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C17817]/25 border border-[#C17817]/50 rounded-full text-xs font-bold text-[#F59E0B]">
                <Flame className="w-3.5 h-3.5" />
                <span>BIA 2026 COMPETITIVE GAMIFICATION</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/20 border border-[#10B981]/40 rounded-full text-xs font-bold text-[#34D399]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span>{t('leaderboard_live_pulse')}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#F7F1E3]">
              {t('leaderboard_title')}
            </h1>
            <p className="text-sm text-[#B8D5BC] leading-relaxed">
              {t('leaderboard_subtitle')}
            </p>
          </div>

          {/* Quick Action to Gain XP */}
          <div className="flex-shrink-0 bg-[#0F2A21]/80 border border-[#C17817]/50 rounded-2xl p-4 text-center sm:text-right backdrop-blur-md">
            <div className="text-xs text-[#8FBC94] font-medium mb-1">
              {lang === 'en' ? 'Want to climb the ranks?' : 'Ingin naik ke posisi #1?'}
            </div>
            <button
              onClick={onNavigateToMap}
              className="btn-gold-reward px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>{lang === 'en' ? 'Start Quests on Map (+XP)' : 'Mulai Quest di Peta (+XP)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Live Rank Floating Banner */}
      {currentUserRank && (
        <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C17817]/50 shadow-lg">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative">
              <img
                src={currentUserRank.avatar}
                alt={currentUserRank.username}
                className="w-14 h-14 rounded-2xl border-2 border-[#F59E0B] bg-[#0F2A21] object-cover shadow"
              />
              <div className="absolute -bottom-1.5 -right-1.5 bg-[#C17817] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white/40">
                #{currentUserRank.rank}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-[#F59E0B] tracking-wider">
                  {t('your_rank_badge')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B4D3E] text-[#8FBC94] font-semibold border border-[#3F7D64]/30">
                  Level {currentUserRank.level}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#F7F1E3] truncate">
                {currentUserRank.username}
              </h3>
              <p className="text-xs text-[#8FBC94]">
                {currentUserRank.schoolOrInst} • {currentUserRank.questsCompleted} Quest Selesai
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
            <div className="text-center sm:text-right">
              <span className="text-[11px] text-[#8FBC94] block">Total XP</span>
              <span className="text-xl font-black text-[#F59E0B]">
                {currentUserRank.xp.toLocaleString()} XP
              </span>
            </div>

            {nextContender && (
              <div className="text-left bg-[#0F2A21]/60 px-3.5 py-2 rounded-xl border border-white/10 text-xs">
                <span className="text-[#8FBC94] block text-[10px]">
                  {lang === 'en' ? 'To pass #' + (currentUserRank.rank - 1) : `Salip #${currentUserRank.rank - 1} (${nextContender.username.split(' ')[0]})`}
                </span>
                <span className="font-bold text-[#34D399] flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +{(nextContender.xp - currentUserRank.xp + 10).toLocaleString()} XP lagi
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0F2A21]/70 border border-[#3F7D64]/40 rounded-2xl w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] shadow-md border border-[#8FBC94]/40'
                : 'text-[#8FBC94] hover:text-[#F7F1E3]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t('filter_all_rank')}</span>
          </button>

          <button
            onClick={() => setSelectedCategory('sekolah')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              selectedCategory === 'sekolah'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] shadow-md border border-[#8FBC94]/40'
                : 'text-[#8FBC94] hover:text-[#F7F1E3]'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>{t('filter_schools')}</span>
          </button>

          <button
            onClick={() => setSelectedCategory('kecamatan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              selectedCategory === 'kecamatan'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] shadow-md border border-[#8FBC94]/40'
                : 'text-[#8FBC94] hover:text-[#F7F1E3]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('filter_districts')}</span>
          </button>

          <button
            onClick={() => setSelectedCategory('kreator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              selectedCategory === 'kreator'
                ? 'bg-[#1B4D3E] text-[#F7F1E3] shadow-md border border-[#8FBC94]/40'
                : 'text-[#8FBC94] hover:text-[#F7F1E3]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{t('filter_creators')}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FBC94]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search school or explorer...' : 'Cari penjelajah atau sekolah...'}
            className="w-full pl-10 pr-4 py-2.5 glass-input rounded-2xl text-xs placeholder-[#8FBC94]/60 focus:outline-none focus:ring-1 focus:ring-[#C17817]"
          />
        </div>
      </div>

      {/* TOP 3 PODIUM (Visible if at least 3 entries in view) */}
      {filteredEntries.length >= 3 && !searchQuery && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-8 pb-4 max-w-3xl mx-auto">
          {/* 2nd Place Podium */}
          {top2 && (
            <div className="flex flex-col items-center text-center order-1">
              <div className="relative mb-2">
                <img
                  src={top2.avatar}
                  alt={top2.username}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-300 bg-[#0F2A21] object-cover shadow-lg"
                />
                <div className="absolute -top-3 -right-2 bg-slate-200 text-slate-900 rounded-full p-1 border border-white shadow">
                  <Medal className="w-4 h-4 text-slate-700" />
                </div>
              </div>
              <span className="text-xs font-bold text-[#F7F1E3] truncate max-w-[100px] sm:max-w-[140px]">
                {top2.username}
              </span>
              <span className="text-[10px] text-[#8FBC94] truncate max-w-[100px] sm:max-w-[140px]">
                {top2.schoolOrInst}
              </span>
              <span className="text-xs font-black text-slate-300 mt-1">
                {top2.xp.toLocaleString()} XP
              </span>

              {/* Podium Bar #2 */}
              <div className="w-full h-24 sm:h-32 bg-gradient-to-t from-[#1B4D3E] to-slate-700/60 rounded-t-2xl border-t-2 border-slate-300 flex items-center justify-center mt-3 shadow">
                <span className="text-2xl sm:text-3xl font-black text-slate-200">#2</span>
              </div>
            </div>
          )}

          {/* 1st Place Podium (Center Champion) */}
          {top1 && (
            <div className="flex flex-col items-center text-center order-2">
              <div className="relative mb-2">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FDE047] blur opacity-75 animate-pulse" />
                <img
                  src={top1.avatar}
                  alt={top1.username}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-[#F59E0B] bg-[#0F2A21] object-cover shadow-2xl"
                />
                <div className="absolute -top-4 -right-2 bg-gradient-to-r from-[#F59E0B] to-[#FDE047] text-slate-900 rounded-full p-1.5 border border-white shadow-xl">
                  <Crown className="w-5 h-5 text-amber-900" />
                </div>
              </div>
              <span className="text-sm font-black text-[#F7F1E3] truncate max-w-[120px] sm:max-w-[160px]">
                {top1.username}
              </span>
              <span className="text-[10px] text-[#F59E0B] font-semibold truncate max-w-[120px] sm:max-w-[160px]">
                {top1.schoolOrInst}
              </span>
              <span className="text-sm font-black text-[#F59E0B] mt-1">
                {top1.xp.toLocaleString()} XP
              </span>

              {/* Podium Bar #1 */}
              <div className="w-full h-32 sm:h-44 bg-gradient-to-t from-[#C17817] to-[#F59E0B] rounded-t-2xl border-t-2 border-yellow-200 flex flex-col items-center justify-center mt-3 shadow-2xl">
                <Crown className="w-6 h-6 text-amber-950 mb-1" />
                <span className="text-3xl sm:text-4xl font-black text-amber-950">#1</span>
              </div>
            </div>
          )}

          {/* 3rd Place Podium */}
          {top3 && (
            <div className="flex flex-col items-center text-center order-3">
              <div className="relative mb-2">
                <img
                  src={top3.avatar}
                  alt={top3.username}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-700 bg-[#0F2A21] object-cover shadow-lg"
                />
                <div className="absolute -top-3 -right-2 bg-amber-800 text-amber-100 rounded-full p-1 border border-white shadow">
                  <Trophy className="w-4 h-4 text-amber-300" />
                </div>
              </div>
              <span className="text-xs font-bold text-[#F7F1E3] truncate max-w-[100px] sm:max-w-[140px]">
                {top3.username}
              </span>
              <span className="text-[10px] text-[#8FBC94] truncate max-w-[100px] sm:max-w-[140px]">
                {top3.schoolOrInst}
              </span>
              <span className="text-xs font-black text-amber-400 mt-1">
                {top3.xp.toLocaleString()} XP
              </span>

              {/* Podium Bar #3 */}
              <div className="w-full h-20 sm:h-24 bg-gradient-to-t from-[#1B4D3E] to-amber-900/60 rounded-t-2xl border-t-2 border-amber-600 flex items-center justify-center mt-3 shadow">
                <span className="text-2xl sm:text-3xl font-black text-amber-200">#3</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Table List */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-xl border border-[#3F7D64]/30">
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-base font-bold text-[#F7F1E3]">
              {lang === 'en' ? 'Leaderboard Standings' : 'Daftar Peringkat Lengkap'}
            </h2>
          </div>
          <span className="text-xs text-[#8FBC94]">
            {filteredEntries.length} {lang === 'en' ? 'Explorers Active' : 'Penjelajah Terdaftar'}
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {filteredEntries.map((entry) => {
            const isTop3 = entry.rank <= 3;

            return (
              <div
                key={entry.id}
                className={`p-3.5 sm:p-4.5 flex items-center justify-between gap-3 sm:gap-4 transition ${
                  entry.isCurrentUser
                    ? 'bg-[#C17817]/15 border-l-4 border-[#F59E0B]'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Rank Number & Avatar */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-8 sm:w-10 text-center flex-shrink-0">
                    {entry.rank === 1 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F59E0B] text-slate-900 font-black text-xs">
                        1
                      </span>
                    ) : entry.rank === 2 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black text-xs">
                        2
                      </span>
                    ) : entry.rank === 3 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-amber-100 font-black text-xs">
                        3
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-[#8FBC94]">
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  <img
                    src={entry.avatar}
                    alt={entry.username}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0F2A21] object-cover flex-shrink-0 ${
                      isTop3 ? 'border-2 border-[#F59E0B]' : 'border border-white/10'
                    }`}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#F7F1E3] truncate">
                        {entry.username}
                      </h4>
                      {entry.isCurrentUser && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F59E0B] text-slate-900 flex-shrink-0">
                          {lang === 'en' ? 'YOU' : 'KAMU'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8FBC94] truncate">
                      {entry.schoolOrInst} • <span className="text-[#3F7D64]">{entry.district}</span>
                    </p>
                    {entry.recentActivity && (
                      <p className="text-[11px] text-[#F59E0B]/80 truncate mt-0.5 flex items-center gap-1">
                        <Activity className="w-3 h-3 flex-shrink-0" />
                        <span>{entry.recentActivity}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Badges & XP */}
                <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 text-right">
                  <div className="hidden sm:block text-center">
                    <span className="text-[10px] text-[#8FBC94] block">Lencana</span>
                    <span className="text-xs font-bold text-[#F7F1E3] flex items-center justify-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {entry.badgeCount}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8FBC94] block">Skor XP</span>
                    <span className="text-sm sm:text-base font-black text-[#F59E0B]">
                      {entry.xp.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
