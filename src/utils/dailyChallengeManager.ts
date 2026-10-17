import { DailyHeritageChallenge, DailyChallengeHistoryItem } from '../types';
import { HERITAGE_LOCATIONS } from '../data/bogorData';
import { calculateDistanceMeters } from './geolocationManager';

const STORAGE_KEY = 'sabo_daily_challenge';
export const BASE_DAILY_BONUS_XP = 150;

/**
 * Get current date string in YYYY-MM-DD format based on local time
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get yesterday date string in YYYY-MM-DD format
 */
export function getYesterdayDateString(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate a consistent pseudo-random index based on a string seed (e.g. date)
 */
function hashStringToIndex(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % max;
}

/**
 * Pick a random location from HERITAGE_LOCATIONS for a given date
 */
export function pickLocationForDate(dateStr: string, excludeId?: string): string {
  const eligible = HERITAGE_LOCATIONS.filter((loc) => loc.id !== excludeId);
  if (eligible.length === 0) return HERITAGE_LOCATIONS[0].id;
  const index = hashStringToIndex(dateStr + '_bogor_heritage_seed', eligible.length);
  return eligible[index].id;
}

/**
 * Load or initialize the daily heritage challenge state
 */
export function loadDailyChallengeState(): DailyHeritageChallenge {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  let savedState: DailyHeritageChallenge | null = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      savedState = JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to parse daily challenge state from localStorage', err);
  }

  // If saved state is for today, return it
  if (savedState && savedState.date === today) {
    return savedState;
  }

  // Calculate streak continuity
  let newStreak = 0;
  let history: DailyChallengeHistoryItem[] = [];
  let notificationsEnabled = false;

  if (savedState) {
    history = savedState.completedHistory || [];
    notificationsEnabled = !!savedState.notificationsEnabled;

    if (savedState.lastCompletedDate === yesterday) {
      newStreak = savedState.streak;
    } else if (savedState.lastCompletedDate === today) {
      newStreak = savedState.streak;
    } else {
      // Streak broken, reset to 0
      newStreak = 0;
    }
  }

  // Pick deterministic location for today
  const locationId = pickLocationForDate(today);

  // Calculate bonus XP including streak bonus (+25 XP per streak day, max 200 extra)
  const streakBonus = Math.min(newStreak * 25, 200);
  const bonusXp = BASE_DAILY_BONUS_XP + streakBonus;

  const freshState: DailyHeritageChallenge = {
    date: today,
    locationId,
    bonusXp,
    completed: false,
    checkedIn: false,
    audioListened: false,
    triviaCompleted: false,
    streak: newStreak,
    lastCompletedDate: savedState?.lastCompletedDate,
    completedHistory: history,
    notificationsEnabled,
  };

  saveDailyChallengeState(freshState);
  return freshState;
}

/**
 * Save daily challenge state to localStorage
 */
export function saveDailyChallengeState(state: DailyHeritageChallenge): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save daily challenge to localStorage', err);
  }
}

/**
 * Re-roll today's challenge to a different random location from the database
 */
export function rerollDailyLocation(currentState: DailyHeritageChallenge): DailyHeritageChallenge {
  const eligible = HERITAGE_LOCATIONS.filter((loc) => loc.id !== currentState.locationId);
  const randomIndex = Math.floor(Math.random() * eligible.length);
  const newLocation = eligible[randomIndex] || HERITAGE_LOCATIONS[0];

  const updated: DailyHeritageChallenge = {
    ...currentState,
    locationId: newLocation.id,
    checkedIn: false,
    audioListened: false,
    triviaCompleted: false,
    completed: false,
  };

  saveDailyChallengeState(updated);
  return updated;
}

/**
 * Check if user coordinates are within check-in range (<= 500 meters)
 */
export function isUserNearTarget(
  userPos: { lat: number; lng: number },
  targetCoords: { lat: number; lng: number },
  maxMeters: number = 500
): { isNear: boolean; distanceMeters: number } {
  const distance = calculateDistanceMeters(
    userPos.lat,
    userPos.lng,
    targetCoords.lat,
    targetCoords.lng
  );
  return {
    isNear: distance <= maxMeters,
    distanceMeters: Math.round(distance),
  };
}

/**
 * Calculate time remaining until midnight in seconds
 */
export function getSecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

/**
 * Format seconds into HH:MM:SS
 */
export function formatCountdown(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Request browser push notification permission and dispatch welcome/challenge notification
 */
export async function setupDailyBrowserNotification(
  locationName: string,
  bonusXp: number,
  lang: 'id' | 'en'
): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  try {
    let permission = Notification.permission;
    if (permission !== 'granted' && permission !== 'denied') {
      permission = await Notification.requestPermission();
    }

    if (permission === 'granted') {
      const title =
        lang === 'en'
          ? `🏛️ Today's Daily Heritage Challenge!`
          : `🏛️ Tantangan Warisan Hari Ini SaBo!`;
      const body =
        lang === 'en'
          ? `Visit "${locationName}" today to earn +${bonusXp} bonus XP and maintain your streak!`
          : `Kunjungi "${locationName}" hari ini untuk meraih bonus +${bonusXp} XP dan jaga streak harianmu!`;

      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
      return true;
    }
  } catch (err) {
    console.warn('Notification permission error:', err);
  }

  return false;
}
