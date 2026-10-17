import React, { useState, useEffect } from 'react';
import {
  Flame,
  Calendar,
  Clock,
  Sparkles,
  MapPin,
  Volume2,
  VolumeX,
  Award,
  CheckCircle2,
  Circle,
  RefreshCw,
  Bell,
  BellRing,
  ExternalLink,
  Compass,
  BookOpen,
  Trophy,
  Navigation,
  Check,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react';
import { HeritageLocation, UserProfile, DailyHeritageChallenge } from '../types';
import { HERITAGE_LOCATIONS } from '../data/bogorData';
import { useLanguage } from '../utils/translations';
import { audioSynthesizer } from '../utils/audioSynthesizer';
import { formatDistance, UserCoordinates } from '../utils/geolocationManager';
import {
  getSecondsUntilMidnight,
  formatCountdown,
  rerollDailyLocation,
  saveDailyChallengeState,
  setupDailyBrowserNotification,
  isUserNearTarget,
} from '../utils/dailyChallengeManager';

interface ModuleDailyChallengesProps {
  challengeState: DailyHeritageChallenge;
  setChallengeState: React.Dispatch<React.SetStateAction<DailyHeritageChallenge>>;
  user: UserProfile;
  userPos: UserCoordinates;
  onClaimDailyXp: (totalXp: number, locationName: string) => void;
  onOpenQuestModal: (location: HeritageLocation) => void;
  onNavigateToMap: () => void;
  onNavigateToHeritage: () => void;
}

export const ModuleDailyChallenges: React.FC<ModuleDailyChallengesProps> = ({
  challengeState,
  setChallengeState,
  user,
  userPos,
  onClaimDailyXp,
  onOpenQuestModal,
  onNavigateToMap,
  onNavigateToHeritage,
}) => {
  const { lang, t, getLocalizedHeritage } = useLanguage();

  // Find the current daily challenge location
  const rawLocation =
    HERITAGE_LOCATIONS.find((l) => l.id === challengeState.locationId) ||
    HERITAGE_LOCATIONS[0];
  const location = getLocalizedHeritage(rawLocation);

  // Countdown timer to midnight
  const [secondsLeft, setSecondsLeft] = useState<number>(getSecondsUntilMidnight());
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [checkInSuccessToast, setCheckInSuccessToast] = useState<string | null>(null);
  const [notificationTestSuccess, setNotificationTestSuccess] = useState<boolean>(false);

  // Live countdown update
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(getSecondsUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check proximity to target location
  const proximity = isUserNearTarget(userPos, location.coordinates, 600);

  // Check if near enough to auto-checkin or trigger visit task
  useEffect(() => {
    if (proximity.isNear && !challengeState.checkedIn && !challengeState.completed) {
      const updated: DailyHeritageChallenge = {
        ...challengeState,
        checkedIn: true,
      };
      setChallengeState(updated);
      saveDailyChallengeState(updated);
      setCheckInSuccessToast(
        lang === 'en'
          ? `📍 Proximity Check-In Successful at ${location.name}!`
          : `📍 Check-In Otomatis Berhasil di ${location.name}!`
      );
      setTimeout(() => setCheckInSuccessToast(null), 4000);
    }
  }, [proximity.isNear, challengeState, location.name, lang, setChallengeState]);

  // Audio narration toggle
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioSynthesizer.stop();
      setIsPlayingAudio(false);
    } else {
      audioSynthesizer.speak(
        location.audioNarration,
        () => {
          setIsPlayingAudio(false);
          if (!challengeState.audioListened) {
            const updated = { ...challengeState, audioListened: true };
            setChallengeState(updated);
            saveDailyChallengeState(updated);
          }
        },
        () => setIsPlayingAudio(false),
        lang === 'en' ? 'en-US' : 'id-ID'
      );
      setIsPlayingAudio(true);
      // Mark as listened once started
      if (!challengeState.audioListened) {
        const updated = { ...challengeState, audioListened: true };
        setChallengeState(updated);
        saveDailyChallengeState(updated);
      }
    }
  };

  // Manual check-in button (for users visiting or simulating attendance)
  const handleManualCheckIn = () => {
    const updated: DailyHeritageChallenge = {
      ...challengeState,
      checkedIn: true,
    };
    setChallengeState(updated);
    saveDailyChallengeState(updated);
    audioSynthesizer.playQuestComplete();
    setCheckInSuccessToast(
      lang === 'en'
        ? `📍 Check-In Verified for ${location.name}! +50 XP bonus ready.`
        : `📍 Check-In Terverifikasi di ${location.name}! Bonus kunjungan siap diklaim.`
    );
    setTimeout(() => setCheckInSuccessToast(null), 4000);
  };

  // Handle re-rolling the daily location
  const handleReroll = () => {
    if (challengeState.completed) {
      alert(
        lang === 'en'
          ? 'You have already completed today’s daily challenge!'
          : 'Kamu sudah menyelesaikan tantangan harian hari ini!'
      );
      return;
    }
    const newChallenge = rerollDailyLocation(challengeState);
    setChallengeState(newChallenge);
    if (isPlayingAudio) {
      audioSynthesizer.stop();
      setIsPlayingAudio(false);
    }
  };

  // Trigger test notification
  const handleTestNotification = async () => {
    const ok = await setupDailyBrowserNotification(
      location.name,
      challengeState.bonusXp,
      lang
    );
    if (ok) {
      const updated = { ...challengeState, notificationsEnabled: true };
      setChallengeState(updated);
      saveDailyChallengeState(updated);
      setNotificationTestSuccess(true);
      setTimeout(() => setNotificationTestSuccess(false), 3000);
    } else {
      alert(
        lang === 'en'
          ? 'Notification permission is required or not supported in this browser. In-app alerts remain active!'
          : 'Izin notifikasi peramban diperlukan atau belum diaktifkan. Notifikasi banner dalam aplikasi tetap aktif!'
      );
    }
  };

  // Calculate task completions
  const completedTaskCount =
    (challengeState.checkedIn ? 1 : 0) +
    (challengeState.audioListened ? 1 : 0) +
    (challengeState.triviaCompleted ? 1 : 0);

  // Can claim when at least check-in is done or any 2 tasks
  const canClaim =
    !challengeState.completed && (challengeState.checkedIn || completedTaskCount >= 1);

  // Total XP awarded: Base Location XP + Daily Bonus XP + Streak Bonus
  const streakBonus = Math.min(challengeState.streak * 20, 150);
  const totalAwardXp = location.xpReward + challengeState.bonusXp + streakBonus;

  // Claim handler
  const handleClaim = () => {
    if (!canClaim) return;

    audioSynthesizer.playQuestComplete();
    onClaimDailyXp(totalAwardXp, location.name);
  };

  // 7-day streak visual circles
  const daysOfWeek = [
    { label: 'Sen', full: 'Senin' },
    { label: 'Sel', full: 'Selasa' },
    { label: 'Rab', full: 'Rabu' },
    { label: 'Kam', full: 'Kamis' },
    { label: 'Jum', full: 'Jumat' },
    { label: 'Sab', full: 'Sabtu' },
    { label: 'Min', full: 'Minggu' },
  ];
  const todayDayIdx = (new Date().getDay() + 6) % 7; // 0 is Monday

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Toast Notification for Check-in */}
      {checkInSuccessToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#173D30] text-[#34D399] border-2 border-[#34D399] px-5 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-2 animate-bounce-short">
          <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
          <span>{checkInSuccessToast}</span>
        </div>
      )}

      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a271c] via-[#173D30] to-[#1B4D3E] border border-[#3F7D64]/50 p-6 md:p-8 text-[#F7F1E3] shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SaBo Daily Quest System</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#F7F1E3] tracking-tight">
              {t('daily_challenge_title')}
            </h1>

            <p className="text-sm md:text-base text-[#B8D5BC]">
              {t('daily_challenge_subtitle')}
            </p>
          </div>

          {/* Quick Stats: Streak & Live Countdown */}
          <div className="flex flex-wrap md:flex-col gap-3 min-w-[200px]">
            {/* Daily Streak Counter */}
            <div className="flex-1 bg-[#0F2A21]/80 backdrop-blur border border-amber-500/40 rounded-2xl p-3 flex items-center gap-3 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                <Flame className="w-7 h-7 text-slate-950 fill-slate-950 animate-pulse" />
              </div>
              <div>
                <p className="text-[11px] text-[#8FBC94] font-semibold uppercase tracking-wider">
                  {t('daily_streak_label')}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-amber-400">
                    {challengeState.streak} {lang === 'en' ? 'Days' : 'Hari'}
                  </span>
                  {challengeState.streak > 0 && (
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      +{Math.min(challengeState.streak * 10, 50)}% XP
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Countdown to Midnight */}
            <div className="flex-1 bg-[#0F2A21]/80 backdrop-blur border border-[#3F7D64]/50 rounded-2xl p-3 flex items-center gap-3 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                <Clock className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <p className="text-[11px] text-[#8FBC94] font-semibold uppercase tracking-wider">
                  {t('daily_time_left')}
                </p>
                <p className="text-xl font-black font-mono text-emerald-300">
                  {formatCountdown(secondsLeft)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Alert Prompt Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#B8D5BC]">
            <BellRing className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              {lang === 'en'
                ? 'Get notified every morning with a random heritage location for bonus XP.'
                : 'Dapatkan pengingat notifikasi setiap pagi dengan satu lokasi cagar budaya acak untuk bonus XP.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestNotification}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                notificationTestSuccess
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>
                {notificationTestSuccess
                  ? lang === 'en'
                    ? '✓ Notification Sent'
                    : '✓ Notifikasi Terkirim'
                  : lang === 'en'
                  ? 'Enable / Test Daily Notification'
                  : 'Aktifkan / Uji Notifikasi Harian'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Challenge Card Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Featured Location Card (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F2A21]/90 backdrop-blur-xl border-2 border-amber-500/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider flex items-center gap-1 shadow">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('daily_today_mission')}</span>
                </span>
                <span className="text-xs font-semibold text-[#8FBC94]">
                  {challengeState.date}
                </span>
              </div>

              {/* Re-roll Location Button */}
              {!challengeState.completed && (
                <button
                  onClick={handleReroll}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-[#8FBC94] hover:text-[#F7F1E3] border border-white/10 rounded-xl text-xs font-bold transition cursor-pointer"
                  title="Ganti ke lokasi acak lainnya dari database"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t('daily_reroll')}</span>
                </button>
              )}
            </div>

            {/* Location Image & Details */}
            <div className="flex flex-col md:flex-row gap-5 items-start">
              <div className="relative w-full md:w-56 h-48 md:h-48 rounded-2xl overflow-hidden border-2 border-amber-500/40 flex-shrink-0 group shadow-lg bg-emerald-950">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-[#0F2A21]/90 backdrop-blur px-2.5 py-0.5 rounded-lg border border-[#3F7D64]/50 text-[10px] font-bold text-amber-300 capitalize">
                  {location.category}
                </div>
                {proximity.isNear && (
                  <div className="absolute bottom-2 left-2 bg-emerald-600/95 text-white font-black text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Di Dekat Lokasi!</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2.5">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-[#F7F1E3] leading-snug">
                    {location.name}
                  </h2>
                  <p className="text-xs text-[#8FBC94] flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{location.address}</span>
                  </p>
                </div>

                {/* Distance & Year Founded */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <div className="px-2.5 py-1 rounded-lg bg-[#173D30] border border-[#3F7D64]/40 text-[#B8D5BC] flex items-center gap-1 font-semibold">
                    <Navigation className="w-3 h-3 text-emerald-400" />
                    <span>Jarak: {formatDistance(proximity.distanceMeters)}</span>
                  </div>

                  {location.builtOrFounded && (
                    <div className="px-2.5 py-1 rounded-lg bg-[#173D30] border border-[#3F7D64]/40 text-[#B8D5BC]">
                      Didirikan: <span className="font-bold text-[#F7F1E3]">{location.builtOrFounded}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#B8D5BC] leading-relaxed line-clamp-2">
                  {location.overview}
                </p>

                {/* Bonus XP Box */}
                <div className="p-3 bg-gradient-to-r from-amber-500/20 via-emerald-500/10 to-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-300">
                      <Zap className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#8FBC94] font-bold uppercase">
                        {t('daily_bonus_xp')}
                      </p>
                      <p className="text-sm font-black text-amber-300">
                        +{challengeState.bonusXp} XP (Tantangan Harian)
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#8FBC94]">Total Hadiah:</span>
                    <p className="text-base font-black text-emerald-300 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      +{totalAwardXp} XP
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist of 3 Daily Tasks */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#F7F1E3] uppercase tracking-wider">
                  Misi Harian ({completedTaskCount}/3 Selesai)
                </span>
                <span className="text-[#8FBC94]">
                  {challengeState.completed
                    ? '🎉 Selesai!'
                    : 'Selesaikan minimal 1 misi untuk klaim bonus'}
                </span>
              </div>

              {/* Task 1: Check-in / Visit Location */}
              <div
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                  challengeState.checkedIn
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-[#F7F1E3]'
                    : 'bg-[#173D30]/60 border-[#3F7D64]/30 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      challengeState.checkedIn
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {challengeState.checkedIn ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-[#F7F1E3] flex items-center gap-1.5">
                      <span>{t('daily_task_visit')}</span>
                      <span className="text-[10px] text-amber-400 font-extrabold bg-amber-500/20 px-1.5 py-0.2 rounded">
                        +50 XP
                      </span>
                    </h4>
                    <p className="text-[11px] text-[#8FBC94]">
                      {proximity.isNear
                        ? 'Lokasi terdeteksi dalam jangkauan (500m)!'
                        : `Jarak kamu: ${formatDistance(proximity.distanceMeters)}. Tekan Check-In saat tiba atau konfirmasi.`}
                    </p>
                  </div>
                </div>

                <div>
                  {challengeState.checkedIn ? (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{t('daily_btn_checked_in')}</span>
                    </span>
                  ) : (
                    <button
                      onClick={handleManualCheckIn}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-200" />
                      <span>{t('daily_btn_checkin')}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Task 2: Listen to Audio Narration */}
              <div
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                  challengeState.audioListened
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-[#F7F1E3]'
                    : 'bg-[#173D30]/60 border-[#3F7D64]/30 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      challengeState.audioListened
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {challengeState.audioListened ? <Check className="w-4 h-4" /> : '2'}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-[#F7F1E3] flex items-center gap-1.5">
                      <span>{t('daily_task_audio')}</span>
                      <span className="text-[10px] text-amber-400 font-extrabold bg-amber-500/20 px-1.5 py-0.2 rounded">
                        +50 XP
                      </span>
                    </h4>
                    <p className="text-[11px] text-[#8FBC94]">
                      {isPlayingAudio
                        ? 'Sedang memutar narasi ulasan cagar budaya...'
                        : 'Dengarkan panduan suara resmi berbasis Web Speech Synthesizer.'}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleToggleAudio}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border ${
                      isPlayingAudio
                        ? 'bg-amber-500 text-slate-950 border-amber-300 animate-pulse'
                        : challengeState.audioListened
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-[#1B4D3E] hover:bg-[#1B4D3E]/80 text-[#F7F1E3] border-[#3F7D64]'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Jeda Narasi</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>{challengeState.audioListened ? 'Putar Ulang' : 'Dengarkan (+XP)'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Task 3: Trivia Quest */}
              <div
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                  challengeState.triviaCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-[#F7F1E3]'
                    : 'bg-[#173D30]/60 border-[#3F7D64]/30 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      challengeState.triviaCompleted
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {challengeState.triviaCompleted ? <Check className="w-4 h-4" /> : '3'}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-[#F7F1E3] flex items-center gap-1.5">
                      <span>{t('daily_task_trivia')}</span>
                      <span className="text-[10px] text-amber-400 font-extrabold bg-amber-500/20 px-1.5 py-0.2 rounded">
                        +{location.xpReward} XP
                      </span>
                    </h4>
                    <p className="text-[11px] text-[#8FBC94]">
                      {challengeState.triviaCompleted
                        ? 'Kuis trivia telah selesai ditaklukkan!'
                        : 'Jawab kuis fakta sejarah seputar lokasi ini.'}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onOpenQuestModal(rawLocation)}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-[#1B4D3E] to-[#0a271c] hover:bg-[#1B4D3E]/80 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{challengeState.triviaCompleted ? 'Buka Quest' : 'Mulai Kuis'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Claim Reward Action Strip */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#8FBC94]">
                  {challengeState.completed
                    ? 'Status: Hadiah XP Harian sudah masuk ke profil akunmu.'
                    : canClaim
                    ? '🎯 Siap klaim bonus harian!'
                    : 'Lakukan check-in atau selesaikan salah satu misi di atas untuk membuka klaim.'}
                </p>
              </div>

              {challengeState.completed ? (
                <div className="px-5 py-2.5 bg-emerald-500/20 border border-emerald-400/60 rounded-2xl text-emerald-300 font-black text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{t('daily_claimed')}</span>
                </div>
              ) : (
                <button
                  onClick={handleClaim}
                  disabled={!canClaim}
                  className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer ${
                    canClaim
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-slate-950 scale-100 hover:scale-[1.02]'
                      : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>
                    {t('daily_btn_claim')} (+{totalAwardXp} XP)
                  </span>
                </button>
              )}
            </div>

            {/* Quick Navigation Links */}
            <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <button
                onClick={onNavigateToMap}
                className="px-3 py-1.5 rounded-xl bg-[#173D30] hover:bg-[#1B4D3E] text-xs font-bold text-[#F7F1E3] flex items-center gap-1.5 transition cursor-pointer border border-[#3F7D64]/40"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lihat di Peta Interaktif</span>
              </button>

              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#173D30] hover:bg-[#1B4D3E] text-xs font-bold text-amber-300 flex items-center gap-1.5 transition border border-amber-500/30"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Rute Google Maps</span>
              </a>

              <button
                onClick={onNavigateToHeritage}
                className="px-3 py-1.5 rounded-xl bg-[#173D30] hover:bg-[#1B4D3E] text-xs font-bold text-[#8FBC94] hover:text-[#F7F1E3] flex items-center gap-1.5 transition cursor-pointer border border-[#3F7D64]/30"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Arsip & Video Sejarah</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Streak Tracker & Milestones */}
        <div className="space-y-6">
          {/* Weekly Streak Card */}
          <div className="bg-[#0F2A21]/90 backdrop-blur-xl border border-[#3F7D64]/40 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-[#F7F1E3] flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Kalender Streak Mingguan</span>
              </h3>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                {challengeState.streak} Hari
              </span>
            </div>

            <p className="text-xs text-[#8FBC94]">
              Kunjungi lokasi cagar budaya setiap hari tanpa putus untuk melipatgandakan perolehan XP dan membuka lencana eksklusif!
            </p>

            {/* 7-Day Visual Tracker */}
            <div className="grid grid-cols-7 gap-1.5 pt-2">
              {daysOfWeek.map((day, idx) => {
                const isToday = idx === todayDayIdx;
                const isPassed = idx < todayDayIdx;
                // If user has streak, mark previous days as checked
                const isCompleted =
                  (isToday && challengeState.completed) ||
                  (isPassed && challengeState.streak > todayDayIdx - idx);

                return (
                  <div
                    key={day.label}
                    className={`flex flex-col items-center p-2 rounded-xl text-center border transition ${
                      isToday
                        ? 'border-amber-400 bg-amber-500/20 font-black shadow-md'
                        : isCompleted
                        ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-bold'
                        : 'border-white/5 bg-white/5 text-white/40'
                    }`}
                  >
                    <span className="text-[10px] uppercase">{day.label}</span>
                    <div className="mt-1.5 w-6 h-6 rounded-full flex items-center justify-center">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isToday ? (
                        <Flame className="w-4 h-4 text-amber-400 animate-pulse fill-amber-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-white/20" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Streak Milestones */}
            <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs">
              <span className="font-bold text-[#F7F1E3] uppercase tracking-wider text-[11px] block">
                Target Lencana Streak:
              </span>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#173D30]/60 border border-[#3F7D64]/30">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-bold text-[#F7F1E3]">3 Hari Berturut-turut</span>
                    <p className="text-[10px] text-[#8FBC94]">+10% XP Multiplier</p>
                  </div>
                </div>
                {challengeState.streak >= 3 ? (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                    Aktif
                  </span>
                ) : (
                  <span className="text-[10px] text-white/40">
                    {3 - challengeState.streak} hari lagi
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#173D30]/60 border border-[#3F7D64]/30">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-bold text-[#F7F1E3]">7 Hari Penjelajah Saba</span>
                    <p className="text-[10px] text-[#8FBC94]">+25% XP & Lencana Khusus</p>
                  </div>
                </div>
                {challengeState.streak >= 7 ? (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                    Tercapai
                  </span>
                ) : (
                  <span className="text-[10px] text-white/40">
                    {7 - challengeState.streak} hari lagi
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Past Daily Challenges Completed History */}
          <div className="bg-[#0F2A21]/90 backdrop-blur-xl border border-[#3F7D64]/40 rounded-3xl p-5 shadow-xl space-y-3">
            <h3 className="font-black text-sm text-[#F7F1E3] flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Riwayat Misi Terselesaikan</span>
            </h3>

            {challengeState.completedHistory && challengeState.completedHistory.length > 0 ? (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {challengeState.completedHistory.map((item, idx) => (
                  <div
                    key={`${item.date}_${idx}`}
                    className="p-2.5 rounded-xl bg-[#173D30]/60 border border-[#3F7D64]/30 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#F7F1E3] block truncate max-w-[150px]">
                        {item.locationName}
                      </span>
                      <span className="text-[10px] text-[#8FBC94]">{item.date}</span>
                    </div>
                    <span className="font-black text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      +{item.xpEarned} XP
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8FBC94] py-4 text-center italic">
                Belum ada riwayat tantangan yang diselesaikan. Selesaikan misi hari ini untuk mencatat sejarah pertamamu!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
