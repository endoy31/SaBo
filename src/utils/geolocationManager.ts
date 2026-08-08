import { HERITAGE_LOCATIONS, TOURISM_DESTINATIONS } from '../data/bogorData';

export interface UserCoordinates {
  lat: number;
  lng: number;
  accuracy?: number;
}

// Calculate distance in meters using Haversine formula
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

// Check nearby places within radius (default 500m)
export function findNearbyPlaces(
  userPos: UserCoordinates,
  radiusMeters: number = 500
) {
  const allPlaces = [
    ...HERITAGE_LOCATIONS.map((h) => ({
      id: h.id,
      name: h.name,
      category: h.category,
      lat: h.coordinates.lat,
      lng: h.coordinates.lng,
      image: h.image,
      xpReward: h.xpReward,
      type: 'heritage' as const,
    })),
    ...TOURISM_DESTINATIONS.map((t) => ({
      id: t.id,
      name: t.name,
      category: 'wisata' as const,
      lat: t.coordinates.lat,
      lng: t.coordinates.lng,
      image: t.image,
      xpReward: 150,
      type: 'tourism' as const,
    })),
  ];

  const nearby = allPlaces
    .map((place) => {
      const dist = calculateDistanceMeters(
        userPos.lat,
        userPos.lng,
        place.lat,
        place.lng
      );
      return { ...place, distanceMeters: dist };
    })
    .filter((place) => place.distanceMeters <= radiusMeters)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);

  return nearby;
}

// Default initial location: Tugu Kujang Bogor
export const DEFAULT_BOGOR_CENTER: UserCoordinates = {
  lat: -6.6013,
  lng: 106.8055,
};
