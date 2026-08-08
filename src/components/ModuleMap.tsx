import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Compass,
  MapPin,
  Layers,
  Sparkles,
  Award,
  BookOpen,
  Navigation,
  CheckCircle2,
  ChevronRight,
  Wifi,
  WifiOff,
  Search,
} from 'lucide-react';
import { HERITAGE_LOCATIONS, TOURISM_DESTINATIONS } from '../data/bogorData';
import { HeritageLocation, CategoryType } from '../types';
import { DEFAULT_BOGOR_CENTER, UserCoordinates } from '../utils/geolocationManager';

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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const playerMarkerRef = useRef<L.Marker | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<HeritageLocation | null>(
    HERITAGE_LOCATIONS[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter locations
  const filteredLocations = HERITAGE_LOCATIONS.filter((loc) => {
    const matchesCategory =
      selectedCategory === 'all' || loc.category === selectedCategory;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [DEFAULT_BOGOR_CENTER.lat, DEFAULT_BOGOR_CENTER.lng],
        zoom: 14,
        zoomControl: false,
      });

      // Add zoom control to top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Tile layer
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

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    filteredLocations.forEach((loc) => {
      const isCompleted = completedQuestIds.includes(loc.id);

      let categoryColor = '#3b82f6'; // blue for sejarah
      let iconEmoji = '🏛️';

      if (loc.category === 'botani') {
        categoryColor = '#10b981'; // green
        iconEmoji = '🌿';
      } else if (loc.category === 'kuliner') {
        categoryColor = '#f59e0b'; // amber
        iconEmoji = '🍜';
      }

      if (isCompleted) {
        categoryColor = '#a855f7'; // purple for done
      }

      const customHtml = `
        <div style="
          background-color: ${categoryColor};
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
          font-size: 18px;
          cursor: pointer;
          position: relative;
        ">
          ${iconEmoji}
          ${
            isCompleted
              ? '<span style="position: absolute; top: -4px; right: -4px; background: #22c55e; color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; display: flex; align-items: center; justify-content: center; border: 1px solid white;">✓</span>'
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        html: customHtml,
        className: 'custom-map-pin',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const marker = L.marker([loc.coordinates.lat, loc.coordinates.lng], {
        icon: customIcon,
      });

      marker.on('click', () => {
        setSelectedLocation(loc);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([loc.coordinates.lat, loc.coordinates.lng]);
        }
      });

      markersGroupRef.current?.addLayer(marker);
    });
  }, [filteredLocations, completedQuestIds]);

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

  const handleSimulateLocation = (lat: number, lng: number, name: string) => {
    setUserPos({ lat, lng });
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 16);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-115px)] flex flex-col md:flex-row bg-[#061a12] light:bg-[#f8f5ed] overflow-hidden text-[#f7f4eb] light:text-[#0d2e22]">
      {/* Sidebar Controls (Mobile & Desktop) */}
      <div className="w-full md:w-96 bg-[#071c14]/85 light:bg-[#f4efe4]/95 backdrop-blur-2xl border-r border-amber-900/30 light:border-amber-800/20 flex flex-col z-20 shadow-2xl max-h-[45vh] md:max-h-full overflow-y-auto">
        {/* Search & Header */}
        <div className="p-4 border-b border-amber-900/20 light:border-amber-800/20 space-y-3 bg-[#071c14]/90 light:bg-[#f4efe4]/95 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="font-extrabold text-base text-amber-100 light:text-[#0d2e22] flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400 light:text-emerald-700" /> Gamified Map
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-800/30 light:bg-emerald-800/15 text-amber-200 light:text-amber-900 border border-amber-600/30 font-semibold">
              {HERITAGE_LOCATIONS.length} Titik Heritage
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-amber-300/60 light:text-amber-800/60" />
            <input
              type="text"
              placeholder="Cari lokasi heritage, prasasti, museum..."
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
              Semua Titik
            </button>
            <button
              onClick={() => setSelectedCategory('sejarah')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'sejarah'
                  ? 'bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 font-bold shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              🏛️ Sejarah
            </button>
            <button
              onClick={() => setSelectedCategory('botani')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'botani'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-amber-100 font-bold shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              🌿 Botani
            </button>
            <button
              onClick={() => setSelectedCategory('kuliner')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md flex items-center gap-1 ${
                selectedCategory === 'kuliner'
                  ? 'bg-gradient-to-r from-amber-700 to-amber-900 text-amber-100 font-bold shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              🍜 Kuliner
            </button>
          </div>
        </div>

        {/* Location List */}
        <div className="flex-1 divide-y divide-white/5 overflow-y-auto">
          {filteredLocations.map((loc) => {
            const isCompleted = completedQuestIds.includes(loc.id);
            const isSelected = selectedLocation?.id === loc.id;

            return (
              <div
                key={loc.id}
                onClick={() => {
                  setSelectedLocation(loc);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo(
                      [loc.coordinates.lat, loc.coordinates.lng],
                      16
                    );
                  }
                }}
                className={`p-3.5 transition cursor-pointer flex gap-3 ${
                  isSelected
                    ? 'bg-amber-900/30 border-l-4 border-amber-500 backdrop-blur'
                    : 'hover:bg-amber-950/20'
                }`}
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-amber-800/30 bg-emerald-950 shadow"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded-md border border-amber-700/30">
                      {loc.category}
                    </span>
                    {isCompleted ? (
                      <span className="text-[10px] bg-emerald-700/30 text-emerald-200 px-2 py-0.5 rounded-md font-bold flex items-center gap-1 border border-emerald-600/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Quest Selesai
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-300 font-bold bg-amber-900/40 px-2 py-0.5 rounded-md border border-amber-600/30">
                        +{loc.xpReward} XP
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xs text-amber-100 truncate group-hover:text-amber-300">
                    {loc.name}
                  </h3>
                  <p className="text-[11px] text-amber-200/60 truncate mt-0.5">
                    {loc.address}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick GPS Location Simulator Bar */}
        <div className="p-3 bg-[#051710] border-t border-amber-900/20 text-xs backdrop-blur-md">
          <div className="flex justify-between items-center mb-1.5 text-amber-200/70 font-medium">
            <span>Simulasi Lokasi Pemain GPS:</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() =>
                handleSimulateLocation(-6.6013, 106.8055, 'Tugu Kujang')
              }
              className="px-2 py-1.5 bg-amber-950/40 hover:bg-amber-900/40 text-amber-100 rounded-lg text-[10px] truncate border border-amber-800/30 transition"
            >
              📍 Tugu Kujang
            </button>
            <button
              onClick={() =>
                handleSimulateLocation(-6.5971, 106.806, 'Kebun Raya')
              }
              className="px-2 py-1.5 bg-amber-950/40 hover:bg-amber-900/40 text-amber-100 rounded-lg text-[10px] truncate border border-amber-800/30 transition"
            >
              🌿 Kebun Raya
            </button>
            <button
              onClick={() =>
                handleSimulateLocation(-6.6133, 106.8083, 'Batutulis')
              }
              className="px-2 py-1.5 bg-amber-950/40 hover:bg-amber-900/40 text-amber-100 rounded-lg text-[10px] truncate border border-amber-800/30 transition"
            >
              🏛️ Batutulis
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
            title="Pusatkan Lokasi Saya"
          >
            <Navigation className="w-4 h-4 text-emerald-400 light:text-emerald-700" />
            <span className="hidden sm:inline text-amber-100 light:text-[#0d2e22]">Lokasi Saya</span>
          </button>
        </div>

        {/* Selected Location Quest Banner (Bottom Overlay) */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-[480px] z-20 bg-[#071c14]/95 light:bg-[#f8f5ed]/95 backdrop-blur-2xl border border-amber-700/40 light:border-amber-800/30 rounded-3xl p-4 shadow-2xl text-amber-100 light:text-[#0d2e22]">
            <div className="flex gap-3">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                className="w-20 h-20 rounded-2xl object-cover border border-amber-800/40 bg-emerald-950 flex-shrink-0 shadow"
              />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-800/30 light:bg-emerald-800/15 text-emerald-200 light:text-emerald-900 border border-emerald-600/30">
                    {selectedLocation.category} • {selectedLocation.builtOrFounded || 'Kota Bogor'}
                  </span>
                  <span className="text-xs font-bold text-amber-300 light:text-amber-900 bg-amber-900/40 light:bg-amber-800/15 px-2 py-0.5 rounded-full border border-amber-600/30">
                    +{selectedLocation.xpReward} XP
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-amber-100 light:text-[#0d2e22] mt-1.5 leading-snug">
                  {selectedLocation.name}
                </h3>
                <p className="text-[11px] text-amber-200/70 light:text-[#3b2818] line-clamp-2 mt-1 leading-relaxed">
                  {selectedLocation.overview}
                </p>
              </div>
            </div>

            {/* Quest Card Actions */}
            <div className="mt-3.5 pt-3 border-t border-amber-900/20 flex flex-wrap items-center justify-between gap-2">
              <a
                href={selectedLocation.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-emerald-200 hover:text-emerald-100 font-semibold bg-emerald-800/30 hover:bg-emerald-800/40 px-3 py-1.5 rounded-xl border border-emerald-600/40 transition backdrop-blur-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Rute Nyata Google Maps</span>
              </a>

              <button
                onClick={() => onSelectQuestLocation(selectedLocation)}
                className="inline-flex items-center space-x-1.5 text-xs bg-gradient-to-r from-emerald-700 via-amber-800 to-amber-700 hover:from-emerald-600 hover:to-amber-600 text-amber-100 font-extrabold px-4 py-2 rounded-xl shadow-lg shadow-amber-950/40 transition transform hover:scale-105 border border-amber-600/30"
              >
                <Award className="w-4 h-4 text-amber-200" />
                <span>{completedQuestIds.includes(selectedLocation.id) ? 'Ulangi Quest Trivia' : 'Mulai Quest Trivia (5 Soal)'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
