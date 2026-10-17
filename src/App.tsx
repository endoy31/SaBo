import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ModuleMap } from './components/ModuleMap';
import { ModuleLeaderboard } from './components/ModuleLeaderboard';
import { ModuleCreatorHub } from './components/ModuleCreatorHub';
import { ModuleHeritageCenter } from './components/ModuleHeritageCenter';
import { ModuleTourismPlanner } from './components/ModuleTourismPlanner';
import { ModuleCommunityReviews } from './components/ModuleCommunityReviews';
import { QuestModal } from './components/QuestModal';
import { UserProfileModal } from './components/UserProfileModal';
import { BadgeUnlockModal } from './components/BadgeUnlockModal';
import { ProximityAlertBanner } from './components/ProximityAlertBanner';
import { Footer } from './components/Footer';
import { Bogor3DOpening } from './components/Bogor3DOpening';
import { ModuleDailyChallenges } from './components/ModuleDailyChallenges';
import { DailyChallengeNotificationBanner } from './components/DailyChallengeNotificationBanner';

import {
  UserProfile,
  HeritageLocation,
  CommunityReview,
  Itinerary,
  DailyHeritageChallenge,
} from './types';
import { HERITAGE_LOCATIONS } from './data/bogorData';
import { AVATAR_PRESETS } from './data/avatars';
import {
  DEFAULT_BOGOR_CENTER,
  UserCoordinates,
  findNearbyPlaces,
} from './utils/geolocationManager';
import { LanguageProvider, useLanguage } from './utils/translations';
import {
  loadDailyChallengeState,
  saveDailyChallengeState,
  getTodayDateString,
  isUserNearTarget,
} from './utils/dailyChallengeManager';

function AppInner() {
  const { lang } = useLanguage();
  const [show3DOpening, setShow3DOpening] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('map');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [selectedQuestLocation, setSelectedQuestLocation] =
    useState<HeritageLocation | null>(null);
  const [unlockedBadgeModal, setUnlockedBadgeModal] = useState<string | null>(null);

  // Daily Heritage Challenge State
  const [dailyChallenge, setDailyChallenge] = useState<DailyHeritageChallenge>(() =>
    loadDailyChallengeState()
  );
  const [dismissedDailyBanner, setDismissedDailyBanner] = useState<boolean>(false);

  // Theme Mode Preference (Dark / Light Mode)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('sabo_theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('sabo_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // GPS & Offline States
  const [userPos, setUserPos] = useState<UserCoordinates>(DEFAULT_BOGOR_CENTER);
  const [isGpsActive, setIsGpsActive] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Proximity Alert state
  const [dismissedNearbyId, setDismissedNearbyId] = useState<string | null>(null);

  // User Profile State with LocalStorage sync
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sabo_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Guarantee an avatar preset if older svg was used
        if (!parsed.avatar || parsed.avatar.includes('dicebear')) {
          parsed.avatar = AVATAR_PRESETS[0].avatarUrl;
        }
        return parsed;
      } catch (e) {
        console.error('Failed parsing saved profile', e);
      }
    }
    return {
      email: 'rafi.explorer@bogor.sch.id',
      username: 'Rafi The Explorer',
      avatar: AVATAR_PRESETS[0].avatarUrl,
      address: 'Bogor Timur, Kota Bogor',
      schoolOrInst: 'SMAN 1 Kota Bogor (Kelas XI)',
      xp: 650,
      level: 3,
      badges: ['Penjelajah Pajajaran', 'Botani Master'],
      completedQuests: ['kebun_raya_bogor'],
      favoriteCreators: ['maya_crafts'],
      savedItineraries: [],
      joinDate: '15 Maret 2026',
    };
  });

  // Initial Community Reviews
  const [reviews, setReviews] = useState<CommunityReview[]>(() => {
    const saved = localStorage.getItem('sabo_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'rev_1',
        placeId: 'kebun_raya_bogor',
        placeName: 'Kebun Raya Bogor',
        userEmail: 'dimas@gmail.com',
        userName: 'Dimas Weekend Explorer',
        userAvatar: AVATAR_PRESETS[1].avatarUrl,
        rating: 5,
        comment:
          'Sangat asri! Pohon kelapa sawit tertua di Asia Tenggara masih gagah berdiri. Narasi Audio Guide SaBo juga sangat membantu paham sejarah Samida buatan Prabu Siliwangi!',
        timestamp: '25 Juli 2026',
        likes: 12,
      },
      {
        id: 'rev_2',
        placeId: 'istana_bogor',
        placeName: 'Istana Bogor (Buitenzorg Palace)',
        userEmail: 'maya@art.id',
        userName: 'Maya Crafts',
        userAvatar: AVATAR_PRESETS[7].avatarUrl,
        rating: 5,
        comment:
          'Pemandangan ratusan rusa totol keturunan Nepal yang berkejaran di pelataran rumput Istana selalu menginspirasi karya kriya batik saya.',
        timestamp: '20 Juli 2026',
        likes: 18,
      },
      {
        id: 'rev_3',
        placeId: 'soto_mie_bogor',
        placeName: 'Soto Mie Bogor',
        userEmail: 'siti@sch.id',
        userName: 'Siti Pelajar Bogor',
        userAvatar: AVATAR_PRESETS[2].avatarUrl,
        rating: 5,
        comment:
          'Risoles isi bihunnya renyah banget saat disiram kuah soto mie panas! Kuliner wajib tiap sabtu usai keliling museum!',
        timestamp: '18 Juli 2026',
        likes: 9,
      },
    ];
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('sabo_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sabo_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // HTML5 Geolocation Watch
  useEffect(() => {
    if (!isGpsActive || !('geolocation' in navigator)) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        console.warn('Geolocation warning:', err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isGpsActive]);

  // Check Nearby Geofencing Alert (within 500 meters)
  const nearbyPlaces = findNearbyPlaces(userPos, 500);
  const activeNearby = nearbyPlaces.find((p) => p.id !== dismissedNearbyId);

  // Complete Quest Handler with XP & Badge Unlock Celebration
  const handleCompleteQuest = (
    locationId: string,
    xpEarned: number,
    badgeName?: string
  ) => {
    const isFirstTime = !user.completedQuests.includes(locationId);
    const newQuests = isFirstTime
      ? [...user.completedQuests, locationId]
      : user.completedQuests;

    const newXp = user.xp + (isFirstTime ? xpEarned : Math.round(xpEarned / 2));
    const newLevel = Math.floor(newXp / 250) + 1;

    let newBadges = [...user.badges];
    let justUnlockedBadge: string | null = null;

    if (badgeName && !newBadges.includes(badgeName)) {
      newBadges.push(badgeName);
      justUnlockedBadge = badgeName;
    }

    if (newQuests.length >= 5 && !newBadges.includes('Saba Bogor Hero')) {
      newBadges.push('Saba Bogor Hero');
      if (!justUnlockedBadge) justUnlockedBadge = 'Saba Bogor Hero';
    }

    // If this quest corresponds to today's daily challenge, mark trivia as completed
    if (locationId === dailyChallenge.locationId && !dailyChallenge.triviaCompleted) {
      const updated = { ...dailyChallenge, triviaCompleted: true };
      setDailyChallenge(updated);
      saveDailyChallengeState(updated);
    }

    setUser({
      ...user,
      xp: newXp,
      level: newLevel,
      completedQuests: newQuests,
      badges: newBadges,
    });

    if (justUnlockedBadge) {
      setUnlockedBadgeModal(justUnlockedBadge);
    }
  };

  // Daily Challenge Bonus XP Claim Handler
  const handleClaimDailyXp = (totalXp: number, locationName: string) => {
    const today = getTodayDateString();
    const newXp = user.xp + totalXp;
    const newLevel = Math.floor(newXp / 250) + 1;
    const newStreak = dailyChallenge.streak + 1;
    const newHistory = [
      {
        date: today,
        locationId: dailyChallenge.locationId,
        locationName,
        xpEarned: totalXp,
      },
      ...(dailyChallenge.completedHistory || []).filter((h) => h.date !== today),
    ];

    let newBadges = [...user.badges];
    let justUnlockedBadge: string | null = null;
    if (newStreak >= 3 && !newBadges.includes('Peminat Sejarah Harian')) {
      newBadges.push('Peminat Sejarah Harian');
      justUnlockedBadge = 'Peminat Sejarah Harian';
    }
    if (newStreak >= 7 && !newBadges.includes('Pejuang 7 Hari Saba Bogor')) {
      newBadges.push('Pejuang 7 Hari Saba Bogor');
      justUnlockedBadge = 'Pejuang 7 Hari Saba Bogor';
    }

    const updatedChallenge: DailyHeritageChallenge = {
      ...dailyChallenge,
      completed: true,
      streak: newStreak,
      lastCompletedDate: today,
      completedHistory: newHistory,
    };

    setDailyChallenge(updatedChallenge);
    saveDailyChallengeState(updatedChallenge);

    setUser({
      ...user,
      xp: newXp,
      level: newLevel,
      badges: newBadges,
    });

    if (justUnlockedBadge) {
      setUnlockedBadgeModal(justUnlockedBadge);
    }
  };

  // Simple Email Login Handler
  const handleSimpleEmailLogin = (email: string) => {
    const usernameFromEmail = email.split('@')[0];
    setUser({
      ...user,
      email,
      username: usernameFromEmail || 'Penjelajah Bogor',
      avatar: user.avatar || AVATAR_PRESETS[0].avatarUrl,
    });
    alert(
      lang === 'en'
        ? `Welcome back, ${usernameFromEmail}! Profile data synchronized.`
        : `Selamat datang kembali, ${usernameFromEmail}! Data profil tersinkronisasi.`
    );
  };

  // Update Profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Save Itinerary
  const handleSaveItinerary = (newItinerary: Itinerary) => {
    setUser((prev) => ({
      ...prev,
      savedItineraries: [newItinerary, ...prev.savedItineraries],
    }));
  };

  // Add Community Review
  const handleAddReview = (newReview: CommunityReview) => {
    setReviews([newReview, ...reviews]);
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans relative overflow-x-hidden transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-[#F7F1E3] text-[#0F2A21] light'
          : 'bg-[#0F2A21] text-[#F7F1E3] dark'
      }`}
    >
      {/* Frosted Glass Ambient Light Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-[#1B4D3E]/10' : 'bg-[#1B4D3E]/20'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl ${
            theme === 'light' ? 'bg-[#C17817]/10' : 'bg-[#C17817]/15'
          }`}
        />
        <div
          className={`absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl ${
            theme === 'light' ? 'bg-[#3F7D64]/10' : 'bg-[#1B4D3E]/25'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(63,125,100,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          isOffline={isOffline}
          setIsOffline={setIsOffline}
          isGpsActive={isGpsActive}
          setIsGpsActive={setIsGpsActive}
          theme={theme}
          setTheme={setTheme}
          onOpen3DOpening={() => setShow3DOpening(true)}
          dailyChallengePending={!dailyChallenge.completed}
          dailyStreak={dailyChallenge.streak}
        />

        {/* Daily Heritage Challenge In-App Notification Banner */}
        {!dailyChallenge.completed && !dismissedDailyBanner && activeTab !== 'challenges' && (
          <DailyChallengeNotificationBanner
            location={
              HERITAGE_LOCATIONS.find((l) => l.id === dailyChallenge.locationId) ||
              HERITAGE_LOCATIONS[0]
            }
            bonusXp={dailyChallenge.bonusXp}
            streak={dailyChallenge.streak}
            distanceMeters={
              isUserNearTarget(
                userPos,
                (
                  HERITAGE_LOCATIONS.find((l) => l.id === dailyChallenge.locationId) ||
                  HERITAGE_LOCATIONS[0]
                ).coordinates
              ).distanceMeters
            }
            onOpenChallenge={() => {
              setActiveTab('challenges');
              setDismissedDailyBanner(true);
            }}
            onDismiss={() => setDismissedDailyBanner(true)}
          />
        )}

        {/* Proximity Geofencing Banner */}
        {activeNearby && (
          <ProximityAlertBanner
            nearbyPlace={activeNearby}
            onOpenQuest={() => {
              const loc = HERITAGE_LOCATIONS.find((l) => l.id === activeNearby.id);
              if (loc) setSelectedQuestLocation(loc);
            }}
            onDismiss={() => setDismissedNearbyId(activeNearby.id)}
          />
        )}

        {/* Main Module Content Views */}
        <main className="flex-1">
          {activeTab === 'challenges' && (
            <ModuleDailyChallenges
              challengeState={dailyChallenge}
              setChallengeState={setDailyChallenge}
              user={user}
              userPos={userPos}
              onClaimDailyXp={handleClaimDailyXp}
              onOpenQuestModal={(loc) => setSelectedQuestLocation(loc)}
              onNavigateToMap={() => setActiveTab('map')}
              onNavigateToHeritage={() => setActiveTab('heritage')}
            />
          )}

          {activeTab === 'map' && (
            <ModuleMap
              onSelectQuestLocation={(loc) => setSelectedQuestLocation(loc)}
              completedQuestIds={user.completedQuests}
              userPos={userPos}
              setUserPos={setUserPos}
              isOffline={isOffline}
              isGpsActive={isGpsActive}
            />
          )}

          {activeTab === 'leaderboard' && (
            <ModuleLeaderboard
              user={user}
              onNavigateToMap={() => setActiveTab('map')}
            />
          )}

          {activeTab === 'creators' && <ModuleCreatorHub />}

          {activeTab === 'heritage' && <ModuleHeritageCenter />}

          {activeTab === 'planner' && (
            <ModuleTourismPlanner
              userPos={userPos}
              savedItineraries={user.savedItineraries}
              onSaveItinerary={handleSaveItinerary}
            />
          )}

          {activeTab === 'community' && (
            <ModuleCommunityReviews
              user={user}
              reviews={reviews}
              onAddReview={handleAddReview}
              onLikeReview={handleLikeReview}
            />
          )}
        </main>

        {/* Quest Trivia Modal */}
        {selectedQuestLocation && (
          <QuestModal
            location={selectedQuestLocation}
            onClose={() => setSelectedQuestLocation(null)}
            onCompleteQuest={handleCompleteQuest}
            user={user}
          />
        )}

        {/* User Profile Modal */}
        {isProfileModalOpen && (
          <UserProfileModal
            user={user}
            onClose={() => setIsProfileModalOpen(false)}
            onUpdateProfile={handleUpdateProfile}
            onSimpleEmailLogin={handleSimpleEmailLogin}
          />
        )}

        {/* Badge Unlock Celebration Modal with Confetti */}
        {unlockedBadgeModal && (
          <BadgeUnlockModal
            badgeName={unlockedBadgeModal}
            onClose={() => setUnlockedBadgeModal(null)}
          />
        )}

        {/* Footer */}
        <Footer />
      </div>

      {/* Three.js 3D Kota Bogor Opening Experience */}
      {show3DOpening && (
        <Bogor3DOpening
          onEnterApp={() => setShow3DOpening(false)}
          isInitialOpening={true}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
