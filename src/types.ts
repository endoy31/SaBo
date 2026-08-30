export type CategoryType = 'sejarah' | 'botani' | 'kuliner' | 'wisata' | 'instansi' | 'umkm' | 'kreator';

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
}

export interface HeritageLocation {
  id: string;
  name: string;
  category: CategoryType;
  builtOrFounded?: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  operatingHours?: string;
  priceRange?: string;
  phone?: string;
  overview: string;
  uniqueFacts: string[];
  audioNarration: string;
  image: string;
  artsCultureUrl?: string;
  googleMapsUrl: string;
  xpReward: number;
  trivia: TriviaQuestion[];
  creatorAssetId?: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  title: string;
  profile: string;
  uniqueFacts: string[];
  image: string;
  locationRef?: string;
}

export interface CulinaryItem {
  id: string;
  name: string;
  category: 'legendaris' | 'modern';
  overview: string;
  uniqueFacts: string[];
  image: string;
  priceRange: string;
  recommendedSpots: {
    name: string;
    address: string;
    rating?: number;
  }[];
}

export interface ModernRestaurant {
  id: string;
  name: string;
  profile: string;
  address: string;
  rating: number;
  image: string;
}

export interface TourismDestination {
  id: string;
  name: string;
  overview: string;
  address: string;
  hours: string;
  ticketPrice: string;
  uniqueFacts: string[];
  rating: number;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface GovernmentInstitution {
  id: string;
  name: string;
  overview: string;
  address: string;
  image: string;
}

export interface UMKMCenter {
  id: string;
  name: string;
  overview: string;
  address: string;
  uniqueFacts: string[];
  image: string;
}

export interface UMKMItem {
  id: string;
  number: number;
  name: string;
  category: string;
  generalCategory: 'kopi' | 'kuliner' | 'bakery' | 'kerajinan' | 'fashion' | 'kreatif';
  district: string;
  address: string;
  rating: number;
  reviewCount: number;
  googleMapsUrl: string;
  instagram?: string;
  tiktok?: string;
  whatsapp?: string;
  phone?: string;
  notes: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CreatorProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  contactUrl: string;
  image?: string;
}

export interface Creator {
  id: string;
  name: string;
  category: 'ilustrasi' | 'kriya' | 'kuliner' | 'fotografi' | 'desain' | 'komunitas';
  bio: string;
  avatar: string;
  portfolio: string[];
  address: string;
  products: CreatorProduct[];
  links: {
    tokopedia?: string;
    shopee?: string;
    instagram?: string;
    behance?: string;
    whatsapp?: string;
  };
  stats: {
    views: number;
    clicks: number;
  };
}

export interface YouTubeVideo {
  id: string;
  title: string;
  youtubeId: string;
  embedUrl: string;
  youtubeUrl: string;
  thumbnail: string;
  category: string;
  description: string;
}

export interface CommunityReview {
  id: string;
  placeId: string;
  placeName: string;
  userEmail: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  timestamp: string;
  likes: number;
}

export interface ItineraryItem {
  placeId: string;
  placeName: string;
  category: string;
  estCost: number;
  notes?: string;
}

export interface Itinerary {
  id: string;
  title: string;
  items: ItineraryItem[];
  date: string;
  totalCost: number;
}

export interface UserProfile {
  email: string;
  username: string;
  avatar: string;
  address: string;
  schoolOrInst: string;
  xp: number;
  level: number;
  badges: string[];
  completedQuests: string[];
  favoriteCreators: string[];
  savedItineraries: Itinerary[];
  joinDate: string;
}

export interface AvatarOption {
  id: string;
  name: string;
  title: string;
  description: string;
  avatarUrl: string;
  minLevel: number;
  theme: string;
  accessory: string;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  schoolOrInst: string;
  district: string;
  category: 'sekolah' | 'kecamatan' | 'kreator' | 'umum';
  xp: number;
  level: number;
  badgeCount: number;
  questsCompleted: number;
  isCurrentUser?: boolean;
  recentActivity?: string;
}

