import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Compass,
  MapPin,
  Sparkles,
  Award,
  Navigation,
  CheckCircle2,
  ChevronRight,
  Search,
  MessageCircle,
  Instagram,
  Phone,
  Store,
  Star,
  ExternalLink,
  Coffee,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { HERITAGE_LOCATIONS, CREATORS } from '../data/bogorData';
import { BOGOR_UMKM_DATABASE } from '../data/umkmData';
import { HeritageLocation, UMKMItem, Creator } from '../types';
import { DEFAULT_BOGOR_CENTER, UserCoordinates } from '../utils/geolocationManager';
import { useLanguage } from '../utils/translations';

// Combined map item union type
export type MapDisplayItem =
  | { type: 'heritage'; data: HeritageLocation }
  | { type: 'umkm'; data: UMKMItem }
  | { type: 'creator'; data: Creator & { coordinates: { lat: number; lng: number } } };

interface ModuleMapProps {
  onSelectQuestLocation: (loc: HeritageLocation) => void;
  completedQuestIds: string[];
  userPos: UserCoordinates;
  setUserPos: (pos: UserCoordinates) => void;
  isOffline: boolean;
  isGpsActive: boolean;
}

export const ModuleMap: React.FC<ModuleMapProps> = ({
  onSelectQuestLocation,
  completedQuestIds,
  userPos,
  setUserPos,
  isOffline,
  isGpsActive,
}) => {
  const { lang, t, getLocalizedHeritage } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const playerMarkerRef = useRef<L.Marker | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MapDisplayItem>({
    type: 'heritage',
    data: getLocalizedHeritage(HERITAGE_LOCATIONS[0]),
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Prepare unified list of map items
  const creatorCoordinatesMap: Record<string, { lat: number; lng: number }> = {
    bogor_sketchers: { lat: -6.6025, lng: 106.8015 },
    maya_crafts: { lat: -6.6080, lng: 106.8125 },
    rian_illustration: { lat: -6.5925, lng: 106.7905 },
    dika_stone: { lat: -6.6133, lng: 106.8083 },
    batik_tradisiku: { lat: -6.5785, lng: 106.7924 },
  };

  const localizedHeritageLocations = HERITAGE_LOCATIONS.map((h) =>
    getLocalizedHeritage(h)
  );

  const allMapItems: MapDisplayItem[] = [
    ...localizedHeritageLocations.map(
      (h) => ({ type: 'heritage', data: h } as MapDisplayItem)
    ),
    ...BOGOR_UMKM_DATABASE.map(
      (u) => ({ type: 'umkm', data: u } as MapDisplayItem)
    ),
    ...CREATORS.map((c) => ({
      type: 'creator',
      data: {
        ...c,
        coordinates: creatorCoordinatesMap[c.id] || {
          lat: -6.5971 + (Math.random() - 0.5) * 0.03,
          lng: 106.806 + (Math.random() - 0.5) * 0.03,
        },
      },
    } as MapDisplayItem)),
  ];

  // Filter map items
  const filteredMapItems = allMapItems.filter((item) => {
    let categoryMatch = false;

    if (selectedCategory === 'all') {
      categoryMatch = true;
    } else if (selectedCategory === 'sejarah') {
      categoryMatch = item.type === 'heritage' && item.data.category === 'sejarah';
    } else if (selectedCategory === 'botani') {
      categoryMatch = item.type === 'heritage' && item.data.category === 'botani';
    } else if (selectedCategory === 'kopi') {
      categoryMatch = item.type === 'umkm' && item.data.generalCategory === 'kopi';
    } else if (selectedCategory === 'kuliner') {
      categoryMatch =
        (item.type === 'heritage' && item.data.category === 'kuliner') ||
        (item.type === 'umkm' && item.data.generalCategory === 'kuliner');
    } else if (selectedCategory === 'bakery') {
      categoryMatch = item.type === 'umkm' && item.data.generalCategory === 'bakery';
    } else if (selectedCategory === 'kerajinan') {
      categoryMatch =
        (item.type === 'umkm' && item.data.generalCategory === 'kerajinan') ||
        (item.type === 'creator' && item.data.category === 'kriya');
    } else if (selectedCategory === 'fashion') {
      categoryMatch = item.type === 'umkm' && item.data.generalCategory === 'fashion';
    } else if (selectedCategory === 'kreatif') {
      categoryMatch =
        item.type === 'creator' ||
        (item.type === 'umkm' && item.data.generalCategory === 'kreatif');
    } else if (selectedCategory === 'top_umkm') {
      categoryMatch = item.type === 'umkm' && item.data.rating >= 4.8;
    }

    if (!categoryMatch) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    if (item.type === 'heritage') {
      return (
        item.data.name.toLowerCase().includes(q) ||
        item.data.address.toLowerCase().includes(q) ||
        item.data.overview.toLowerCase().includes(q)
      );
    } else if (item.type === 'umkm') {
      return (
        item.data.name.toLowerCase().includes(q) ||
        item.data.category.toLowerCase().includes(q) ||
        item.data.district.toLowerCase().includes(q) ||
        item.data.address.toLowerCase().includes(q) ||
        item.data.notes.toLowerCase().includes(q)
      );
    } else {
      return (
        item.data.name.toLowerCase().includes(q) ||
        item.data.category.toLowerCase().includes(q) ||
        item.data.address.toLowerCase().includes(q) ||
        item.data.bio.toLowerCase().includes(q)
      );
    }
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [DEFAULT_BOGOR_CENTER.lat, DEFAULT_BOGOR_CENTER.lng],
        zoom: 14,
        zoomControl: false,
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      const tileUrl = isOffline
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        attribution: '&copy; OpenStreetMap contributors & CartoDB',
        maxZoom: 19,
      }).addTo(map);

      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOffline]);

  // Render markers on the map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    filteredMapItems.forEach((item) => {
      let categoryColor = '#3b82f6';
      let iconEmoji = '📍';
      let lat = 0;
      let lng = 0;
      let title = '';

      if (item.type === 'heritage') {
        lat = item.data.coordinates.lat;
        lng = item.data.coordinates.lng;
        title = item.data.name;

        if (item.data.category === 'botani') {
          categoryColor = '#10b981';
          iconEmoji = '🌿';
        } else if (item.data.category === 'kuliner') {
          categoryColor = '#f59e0b';
          iconEmoji = '🍜';
        } else {
          categoryColor = '#3b82f6';
          iconEmoji = '🏛️';
        }

        if (completedQuestIds.includes(item.data.id)) {
          categoryColor = '#8b5cf6';
        }
      } else if (item.type === 'umkm') {
        lat = item.data.coordinates.lat;
        lng = item.data.coordinates.lng;
        title = item.data.name;

        switch (item.data.generalCategory) {
          case 'kopi':
            categoryColor = '#78350f';
            iconEmoji = '☕';
            break;
          case 'kuliner':
            categoryColor = '#dc2626';
            iconEmoji = '🍲';
            break;
          case 'bakery':
            categoryColor = '#d97706';
            iconEmoji = '🥖';
            break;
          case 'kerajinan':
            categoryColor = '#7c3aed';
            iconEmoji = '🧵';
            break;
          case 'fashion':
            categoryColor = '#db2777';
            iconEmoji = '👗';
            break;
          case 'kreatif':
          default:
            categoryColor = '#0284c7';
            iconEmoji = '✨';
            break;
        }
      } else if (item.type === 'creator') {
        lat = item.data.coordinates.lat;
        lng = item.data.coordinates.lng;
        title = item.data.name;
        categoryColor = '#06b6d4';
        iconEmoji = '🎨';
      }

      const customHtml = `
        <div style="
          background-color: ${categoryColor};
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2.5px solid #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          font-size: 16px;
          cursor: pointer;
          position: relative;
          transition: transform 0.2s ease;
        " title="${title}">
          ${iconEmoji}
          ${
            item.type === 'heritage' && completedQuestIds.includes(item.data.id)
              ? '<span style="position: absolute; top: -4px; right: -4px; background: #22c55e; color: white; border-radius: 50%; width: 15px; height: 15px; font-size: 9px; display: flex; align-items: center; justify-content: center; border: 1.5px solid white;">✓</span>'
              : ''
          }
          ${
            item.type === 'umkm' && item.data.rating >= 4.8
              ? '<span style="position: absolute; top: -4px; right: -4px; background: #eab308; color: #713f12; border-radius: 50%; width: 14px; height: 14px; font-size: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 1.5px solid white;">★</span>'
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        html: customHtml,
        className: 'custom-map-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([lat, lng], {
        icon: customIcon,
      });

      marker.on('click', () => {
        setSelectedItem(item);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([lat, lng]);
        }
      });

      markersGroupRef.current?.addLayer(marker);
    });
  }, [filteredMapItems, completedQuestIds]);

  // Update Player Position Marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (playerMarkerRef.current) {
      playerMarkerRef.current.remove();
    }

    if (isGpsActive) {
      const playerHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 32px; height: 32px; background: rgba(245, 158, 11, 0.3); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 22px; height: 22px; background: #f59e0b; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 0 12px rgba(245, 158, 11, 0.8);"></div>
        </div>
      `;

      const playerIcon = L.divIcon({
        html: playerHtml,
        className: 'player-position-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      playerMarkerRef.current = L.marker([userPos.lat, userPos.lng], {
        icon: playerIcon,
        zIndexOffset: 1000,
      }).addTo(mapInstanceRef.current);
    }
  }, [userPos, isGpsActive]);

  const handleCenterUser = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([userPos.lat, userPos.lng], 16);
    }
  };

  const handleSimulateLocation = (lat: number, lng: number) => {
    setUserPos({ lat, lng });
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 16);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-115px)] flex flex-col md:flex-row bg-[#061a12] light:bg-[#f8f5ed] overflow-hidden text-[#f7f4eb] light:text-[#0d2e22]">
      {/* Sidebar Controls (Mobile & Desktop) */}
      <div className="w-full md:w-96 bg-[#071c14]/90 light:bg-[#f4efe4]/95 backdrop-blur-2xl border-r border-amber-900/30 light:border-amber-800/20 flex flex-col z-20 shadow-2xl max-h-[45vh] md:max-h-full overflow-y-auto">
        {/* Search & Header */}
        <div className="p-4 border-b border-amber-900/20 light:border-amber-800/20 space-y-3 bg-[#071c14]/95 light:bg-[#f4efe4]/95 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="font-extrabold text-sm sm:text-base text-amber-100 light:text-[#0d2e22] flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400 light:text-emerald-700" />
              <span>{t('map_title')}</span>
            </h2>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-800/30 light:bg-emerald-800/15 text-amber-200 light:text-amber-900 border border-amber-600/30 font-semibold">
              {filteredMapItems.length} {lang === 'en' ? 'Points' : 'Titik'}
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-amber-300/60 light:text-amber-800/60" />
            <input
              type="text"
              placeholder={t('search_map_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#051710] light:bg-white/90 border border-amber-900/30 light:border-amber-800/20 rounded-xl pl-9 pr-3 py-2 text-xs text-amber-100 light:text-[#0d2e22] placeholder-amber-200/40 light:placeholder-amber-900/40 focus:outline-none focus:border-amber-500/60 transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md ${
                selectedCategory === 'all'
                  ? 'bg-amber-800/40 light:bg-amber-800/20 text-amber-200 light:text-amber-900 border border-amber-600/60 font-bold shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              {t('cat_all')} ({allMapItems.length})
            </button>
            <button
              onClick={() => setSelectedCategory('kopi')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'kopi'
                  ? 'bg-amber-900 text-amber-100 font-bold border border-amber-500 shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('cat_coffee')}
            </button>
            <button
              onClick={() => setSelectedCategory('kuliner')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'kuliner'
                  ? 'bg-red-900 text-red-100 font-bold border border-red-500 shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('cat_culinary')}
            </button>
            <button
              onClick={() => setSelectedCategory('bakery')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'bakery'
                  ? 'bg-amber-800 text-amber-100 font-bold border border-amber-400 shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('cat_bakery')}
            </button>
            <button
              onClick={() => setSelectedCategory('sejarah')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'sejarah'
                  ? 'bg-blue-900 text-blue-100 font-bold border border-blue-500 shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('cat_history')}
            </button>
            <button
              onClick={() => setSelectedCategory('kerajinan')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'kerajinan'
                  ? 'bg-purple-900 text-purple-100 font-bold border border-purple-500 shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('cat_crafts')}
            </button>
            <button
              onClick={() => setSelectedCategory('fashion')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'fashion'
                  ? 'bg-pink-900 text-pink-100 font-bold border border-pink-500 shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('cat_fashion')}
            </button>
            <button
              onClick={() => setSelectedCategory('kreatif')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'kreatif'
                  ? 'bg-sky-900 text-sky-100 font-bold border border-sky-500 shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('cat_creators')}
            </button>
            <button
              onClick={() => setSelectedCategory('top_umkm')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'top_umkm'
                  ? 'bg-yellow-900 text-yellow-100 font-bold border border-yellow-500 shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              {t('cat_top_umkm')}
            </button>
          </div>
        </div>

        {/* Location List in Sidebar */}
        <div className="flex-1 divide-y divide-white/5 light:divide-amber-900/10 overflow-y-auto">
          {filteredMapItems.map((item) => {
            const isSelected =
              selectedItem?.type === item.type && selectedItem?.data.id === item.data.id;

            let image = '';
            let name = '';
            let subtitle = '';
            let tag = '';
            let ratingBadge: React.ReactNode = null;
            let lat = 0;
            let lng = 0;

            if (item.type === 'heritage') {
              image = item.data.image;
              name = item.data.name;
              subtitle = item.data.address;
              tag = item.data.category;
              lat = item.data.coordinates.lat;
              lng = item.data.coordinates.lng;
              const isCompleted = completedQuestIds.includes(item.data.id);
              ratingBadge = isCompleted ? (
                <span className="text-[10px] bg-emerald-700/30 text-emerald-200 px-2 py-0.5 rounded-md font-bold flex items-center gap-1 border border-emerald-600/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {t('quest_completed')}
                </span>
              ) : (
                <span className="text-[10px] text-amber-300 font-bold bg-amber-900/40 px-2 py-0.5 rounded-md border border-amber-600/30">
                  +{item.data.xpReward} XP
                </span>
              );
            } else if (item.type === 'umkm') {
              image = item.data.image;
              name = item.data.name;
              subtitle = `${item.data.district} • ${item.data.notes}`;
              tag = item.data.category;
              lat = item.data.coordinates.lat;
              lng = item.data.coordinates.lng;
              ratingBadge = (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-500/30">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{item.data.rating}</span>
                  <span className="text-[9px] opacity-75">({item.data.reviewCount})</span>
                </span>
              );
            } else if (item.type === 'creator') {
              image = item.data.avatar;
              name = item.data.name;
              subtitle = item.data.address;
              tag = `${lang === 'en' ? 'Creator' : 'Kreator'} • ${item.data.category}`;
              lat = item.data.coordinates.lat;
              lng = item.data.coordinates.lng;
              ratingBadge = (
                <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-2 py-0.5 rounded-md border border-sky-400/30">
                  Zero Fee
                </span>
              );
            }

            return (
              <div
                key={`${item.type}_${item.data.id}`}
                onClick={() => {
                  setSelectedItem(item);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo([lat, lng], 16);
                  }
                }}
                className={`p-3.5 transition cursor-pointer flex gap-3 ${
                  isSelected
                    ? 'bg-amber-900/30 light:bg-amber-800/15 border-l-4 border-amber-500 backdrop-blur'
                    : 'hover:bg-amber-950/20 light:hover:bg-amber-900/5'
                }`}
              >
                <img
                  src={image}
                  alt={name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-amber-800/30 bg-emerald-950 shadow"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-amber-300 light:text-amber-900 bg-amber-900/30 light:bg-amber-800/10 px-2 py-0.5 rounded-md border border-amber-700/30">
                      {tag}
                    </span>
                    {ratingBadge}
                  </div>

                  <h3 className="font-bold text-xs text-amber-100 light:text-[#0d2e22] truncate">
                    {name}
                  </h3>
                  <p className="text-[11px] text-amber-200/60 light:text-amber-900/70 truncate mt-0.5">
                    {subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick GPS Location Simulator Bar */}
        <div className="p-3 bg-[#051710] light:bg-[#ede7d8] border-t border-amber-900/20 text-xs backdrop-blur-md">
          <div className="flex justify-between items-center mb-1.5 text-amber-200/70 light:text-amber-900/70 font-medium">
            <span>{t('sim_gps_label')}:</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleSimulateLocation(-6.6013, 106.8055)}
              className="px-2 py-1.5 bg-amber-950/40 light:bg-white/60 hover:bg-amber-900/40 text-amber-100 light:text-[#0d2e22] rounded-lg text-[10px] truncate border border-amber-800/30 transition"
            >
              📍 Tugu Kujang
            </button>
            <button
              onClick={() => handleSimulateLocation(-6.6045, 106.8012)}
              className="px-2 py-1.5 bg-amber-950/40 light:bg-white/60 hover:bg-amber-900/40 text-amber-100 light:text-[#0d2e22] rounded-lg text-[10px] truncate border border-amber-800/30 transition"
            >
              🍲 Suryakencana
            </button>
            <button
              onClick={() => handleSimulateLocation(-6.6074, 106.8115)}
              className="px-2 py-1.5 bg-amber-950/40 light:bg-white/60 hover:bg-amber-900/40 text-amber-100 light:text-[#0d2e22] rounded-lg text-[10px] truncate border border-amber-800/30 transition"
            >
              ☕ Baranangsiang
            </button>
          </div>
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="flex-1 relative h-full">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Quick Action Buttons on Map */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
          <button
            onClick={handleCenterUser}
            className="p-2.5 bg-[#071c14]/90 light:bg-[#f4efe4]/95 hover:bg-[#071c14] text-amber-300 light:text-amber-900 rounded-2xl shadow-xl border border-amber-800/40 light:border-amber-800/20 flex items-center space-x-2 text-xs font-semibold backdrop-blur-xl transition"
            title={lang === 'en' ? 'Center My Location' : 'Pusatkan Lokasi Saya'}
          >
            <Navigation className="w-4 h-4 text-emerald-400 light:text-emerald-700" />
            <span className="hidden sm:inline text-amber-100 light:text-[#0d2e22]">{t('btn_my_location')}</span>
          </button>
        </div>

        {/* Selected Item Bottom Overlay Banner */}
        {selectedItem && (
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-[500px] z-20 bg-[#071c14]/95 light:bg-[#f8f5ed]/95 backdrop-blur-2xl border border-amber-700/40 light:border-amber-800/30 rounded-3xl p-4 shadow-2xl text-amber-100 light:text-[#0d2e22]">
            {selectedItem.type === 'heritage' && (
              <>
                <div className="flex gap-3">
                  <img
                    src={selectedItem.data.image}
                    alt={selectedItem.data.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-amber-800/40 bg-emerald-950 flex-shrink-0 shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-800/30 light:bg-emerald-800/15 text-emerald-200 light:text-emerald-900 border border-emerald-600/30">
                        {selectedItem.data.category} • {selectedItem.data.builtOrFounded || 'Kota Bogor'}
                      </span>
                      <span className="text-xs font-bold text-amber-300 light:text-amber-900 bg-amber-900/40 light:bg-amber-800/15 px-2 py-0.5 rounded-full border border-amber-600/30">
                        +{selectedItem.data.xpReward} XP
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-amber-100 light:text-[#0d2e22] mt-1.5 leading-snug">
                      {selectedItem.data.name}
                    </h3>
                    <p className="text-[11px] text-amber-200/70 light:text-[#3b2818] line-clamp-2 mt-1 leading-relaxed">
                      {selectedItem.data.overview}
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-amber-900/20 flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={selectedItem.data.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-emerald-200 light:text-emerald-900 hover:text-emerald-100 font-semibold bg-emerald-800/30 light:bg-emerald-800/15 hover:bg-emerald-800/40 px-3 py-1.5 rounded-xl border border-emerald-600/40 transition backdrop-blur-md"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t('btn_route_gmaps')}</span>
                  </a>

                  <button
                    onClick={() => onSelectQuestLocation(selectedItem.data)}
                    className="inline-flex items-center space-x-1.5 text-xs bg-gradient-to-r from-emerald-700 via-amber-800 to-amber-700 hover:from-emerald-600 hover:to-amber-600 text-amber-100 font-extrabold px-4 py-2 rounded-xl shadow-lg shadow-amber-950/40 transition transform hover:scale-105 border border-amber-600/30"
                  >
                    <Award className="w-4 h-4 text-amber-200" />
                    <span>
                      {completedQuestIds.includes(selectedItem.data.id)
                        ? t('btn_repeat_quest')
                        : t('btn_start_quest')}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {selectedItem.type === 'umkm' && (
              <>
                <div className="flex gap-3">
                  <img
                    src={selectedItem.data.image}
                    alt={selectedItem.data.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-amber-800/40 bg-emerald-950 flex-shrink-0 shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-800/30 light:bg-amber-800/15 text-amber-300 light:text-amber-900 border border-amber-600/30">
                        #{selectedItem.data.number} {selectedItem.data.category}
                      </span>
                      <span className="text-xs font-bold text-amber-300 light:text-amber-900 bg-amber-900/40 light:bg-amber-800/15 px-2 py-0.5 rounded-full border border-amber-600/30 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {selectedItem.data.rating} ({selectedItem.data.reviewCount.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')} {lang === 'en' ? 'reviews' : 'ulasan'})
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-amber-100 light:text-[#0d2e22] mt-1.5 leading-snug">
                      {selectedItem.data.name}
                    </h3>
                    <p className="text-[11px] text-amber-200/80 light:text-[#3b2818] mt-1">
                      📍 {selectedItem.data.address}
                    </p>
                    <p className="text-[11px] text-amber-300/80 light:text-amber-900/80 mt-0.5 font-medium italic">
                      "{selectedItem.data.notes}"
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-amber-900/20 flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={selectedItem.data.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-emerald-200 light:text-emerald-900 hover:text-emerald-100 font-semibold bg-emerald-800/30 light:bg-emerald-800/15 hover:bg-emerald-800/40 px-3 py-1.5 rounded-xl border border-emerald-600/40 transition backdrop-blur-md"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t('route_google_maps')}</span>
                  </a>

                  <div className="flex items-center gap-1.5">
                    {selectedItem.data.whatsapp && (
                      <a
                        href={selectedItem.data.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl transition shadow"
                        title="Chat WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    {selectedItem.data.instagram && (
                      <a
                        href={selectedItem.data.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold px-2.5 py-1.5 rounded-xl transition shadow"
                        title="Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {selectedItem.data.phone && !selectedItem.data.whatsapp && (
                      <a
                        href={`tel:${selectedItem.data.phone}`}
                        className="inline-flex items-center space-x-1 text-xs bg-amber-800/40 hover:bg-amber-800/60 text-amber-200 font-bold px-2.5 py-1.5 rounded-xl border border-amber-600/30 transition shadow"
                        title={lang === 'en' ? 'Phone' : 'Telepon'}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}

            {selectedItem.type === 'creator' && (
              <>
                <div className="flex gap-3">
                  <img
                    src={selectedItem.data.avatar}
                    alt={selectedItem.data.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-sky-400/40 bg-slate-900 flex-shrink-0 shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        {lang === 'en' ? 'Creator' : 'Kreator'} • {selectedItem.data.category}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                        Zero Fee
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-amber-100 light:text-[#0d2e22] mt-1.5 leading-snug">
                      {selectedItem.data.name}
                    </h3>
                    <p className="text-[11px] text-amber-200/80 light:text-[#3b2818] mt-1 line-clamp-2">
                      {selectedItem.data.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-amber-900/20 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-amber-200/70 light:text-[#3b2818] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    {selectedItem.data.address}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {selectedItem.data.links.whatsapp && (
                      <a
                        href={selectedItem.data.links.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl transition shadow"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    {selectedItem.data.links.instagram && (
                      <a
                        href={selectedItem.data.links.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs bg-pink-600 hover:bg-pink-500 text-white font-bold px-2.5 py-1.5 rounded-xl transition shadow"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
