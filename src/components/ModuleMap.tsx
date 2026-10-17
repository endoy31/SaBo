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
  Layers,
  Route,
  Landmark,
  UtensilsCrossed,
  Palette,
  Maximize2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { HERITAGE_LOCATIONS, CREATORS } from '../data/bogorData';
import { BOGOR_UMKM_DATABASE } from '../data/umkmData';
import { HeritageLocation, UMKMItem, Creator } from '../types';
import { DEFAULT_BOGOR_CENTER, UserCoordinates } from '../utils/geolocationManager';
import { useLanguage } from '../utils/translations';

// Combined map item union type
export type MapDisplayItem =
  | { type: 'heritage'; data: HeritageLocation; thematicCategory: 'history' | 'culinary' | 'botany' }
  | { type: 'umkm'; data: UMKMItem; thematicCategory: 'history' | 'culinary' | 'creative' }
  | { type: 'creator'; data: Creator & { coordinates: { lat: number; lng: number } }; thematicCategory: 'creative' };

export type ThematicLayerType = 'all' | 'history' | 'culinary' | 'creative';

export type BasemapTileId = 'osm' | 'voyager' | 'dark' | 'topo';

interface BasemapConfig {
  id: BasemapTileId;
  name: string;
  nameEn: string;
  url: string;
  attribution: string;
}

const BASEMAP_CONFIGS: BasemapConfig[] = [
  {
    id: 'osm',
    name: 'OpenStreetMap (Publik)',
    nameEn: 'OpenStreetMap (Public)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    id: 'voyager',
    name: 'Carto Voyager (Cerah)',
    nameEn: 'Carto Voyager (Clean)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors & CartoDB',
  },
  {
    id: 'dark',
    name: 'Carto Dark (Elegan)',
    nameEn: 'Carto Dark (Night)',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors & CartoDB',
  },
  {
    id: 'topo',
    name: 'OpenTopo (Topografi)',
    nameEn: 'OpenTopo (Terrain)',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap & OpenTopoMap',
  },
];

interface ThematicRouteWaypoint {
  name: string;
  nameEn: string;
  desc: string;
  lat: number;
  lng: number;
}

interface ThematicRouteDefinition {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  badge: string;
  badgeEn: string;
  color: string;
  accentBg: string;
  borderAccent: string;
  waypoints: ThematicRouteWaypoint[];
}

const THEMATIC_ROUTE_DEFINITIONS: Record<'history' | 'culinary' | 'creative', ThematicRouteDefinition> = {
  history: {
    title: 'Jalur Wisata Cagar Budaya & Sejarah Bogor',
    titleEn: 'Bogor Historic Heritage Walking Trail',
    subtitle: 'Napak tilas dari Istana Buitenzorg (1744), Kebun Raya (1817), Museum Zoologi (1894), hingga Prasasti Batutulis (1533 M).',
    subtitleEn: 'Heritage journey through Buitenzorg Palace (1744), Botanical Gardens (1817), Zoology Museum (1894), to Batutulis Inscription (1533 CE).',
    badge: '14+ Cagar Budaya & Museum',
    badgeEn: '14+ Heritage Sites & Museums',
    color: '#3b82f6',
    accentBg: 'rgba(59, 130, 246, 0.15)',
    borderAccent: '#3b82f6',
    waypoints: [
      {
        name: 'Istana Bogor (Buitenzorg 1744)',
        nameEn: 'Bogor Palace (Buitenzorg 1744)',
        desc: 'Kediaman Presiden RI & Istana Bersejarah Van Imhoff',
        lat: -6.5976,
        lng: 106.7975,
      },
      {
        name: 'Kebun Raya Bogor (1817)',
        nameEn: 'Bogor Botanical Gardens (1817)',
        desc: 'Pusat Botani Tertua Se-Asia Tenggara & Taman Samida',
        lat: -6.5971,
        lng: 106.806,
      },
      {
        name: 'Museum Zoologi (1894)',
        nameEn: 'Zoology Museum (1894)',
        desc: 'Koleksi Fauna Nusantara & Kerangka Paus Biru 22m',
        lat: -6.6028,
        lng: 106.799,
      },
      {
        name: 'Gereja Zebaoth / Gereja Ayam (1838)',
        nameEn: 'Zebaoth Church (1838)',
        desc: 'Gereja Kolonial Tertua di Dekat Istana',
        lat: -6.598,
        lng: 106.7935,
      },
      {
        name: 'Monumen Kujang (1982)',
        nameEn: 'Kujang Monument (1982)',
        desc: 'Simbol Kedaulatan & Filosofi Pakuan Pajajaran',
        lat: -6.6013,
        lng: 106.8055,
      },
      {
        name: 'Prasasti Batutulis (1533 M)',
        nameEn: 'Batutulis Inscription (1533 CE)',
        desc: 'Inskripsi Kerajaan Sunda Pajajaran Prabu Surawisesa',
        lat: -6.6133,
        lng: 106.8083,
      },
    ],
  },
  culinary: {
    title: 'Koridor Kuliner Legendaris Suryakencana & Pajajaran',
    titleEn: 'Suryakencana & Pajajaran Legendary Culinary Corridor',
    subtitle: 'Sensasi rasa otentik turun-temurun: Martabak Encek 1972, Kopi Bah Sipit 1925, Roti Unyil Venus, hingga Bogor Permai.',
    subtitleEn: 'Authentic generational tastes: 1972 Encek charcoal martabak, 1925 Bah Sipit coffee, Roti Unyil Venus, & Bogor Permai.',
    badge: '30+ Kuliner Ikonik & Rasa Asli',
    badgeEn: '30+ Iconic Culinary Spots',
    color: '#ef4444',
    accentBg: 'rgba(239, 68, 68, 0.15)',
    borderAccent: '#ef4444',
    waypoints: [
      {
        name: 'Martabak Bangka Encek (1972)',
        nameEn: 'Encek Charcoal Martabak (1972)',
        desc: 'Dimasak dengan Arang Tradisional, Resep Sejak 1972',
        lat: -6.6045,
        lng: 106.8012,
      },
      {
        name: 'Martabak Bangka AFO Suryakencana',
        nameEn: 'AFO Martabak Suryakencana',
        desc: 'Pusat Jajanan Pecinan Suryakencana Bogor',
        lat: -6.6052,
        lng: 106.8018,
      },
      {
        name: 'Kopi Bah Sipit Cap Kacamata (1925)',
        nameEn: 'Bah Sipit Coffee (1925)',
        desc: 'Kopi Tertua di Bogor Berusia 100 Tahun di Empang',
        lat: -6.6085,
        lng: 106.7932,
      },
      {
        name: 'Roti Unyil Venus Sukasari',
        nameEn: 'Roti Unyil Venus Sukasari',
        desc: 'Ikon Oleh-Oleh Roti Mini Terpopuler Sejak Dulu',
        lat: -6.6195,
        lng: 106.8165,
      },
      {
        name: 'Michelle Bakery Baranangsiang',
        nameEn: 'Michelle Bakery Baranangsiang',
        desc: 'Bakery Legendaris & Jajanan Pasar Tradisional',
        lat: -6.608,
        lng: 106.8118,
      },
      {
        name: 'Bogor Permai Bakery Sudirman',
        nameEn: 'Bogor Permai Bakery Sudirman',
        desc: 'Resto & Bakery Klasik Ikon Kota Sejak Puluhan Tahun',
        lat: -6.5885,
        lng: 106.7935,
      },
    ],
  },
  creative: {
    title: 'Jelajah Ruang Kreatif, Studio Kriya & Komunitas Seni',
    titleEn: 'Creative Hubs, Craft Studios & Art Collective Trail',
    subtitle: 'Pusat kolaborasi perupa Bogor Sketchers, atelier kriya, studio ilustrasi, hingga sanggar batik kearifan lokal.',
    subtitleEn: 'Urban sketching community, craft ateliers, illustration studios, and local heritage batik workshops.',
    badge: '12+ Studio Kreatif & Sanggar',
    badgeEn: '12+ Creative Studios & Hubs',
    color: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.15)',
    borderAccent: '#06b6d4',
    waypoints: [
      {
        name: 'Bogor Sketchers Creative Hub',
        nameEn: 'Bogor Sketchers Creative Hub',
        desc: 'Komunitas Sketsa Arsitektur & Budaya Kota Bogor',
        lat: -6.6025,
        lng: 106.8015,
      },
      {
        name: 'Maya Crafts Studio',
        nameEn: 'Maya Crafts Studio',
        desc: 'Atelier Kriya Daur Ulang & Anyaman Serat Alami',
        lat: -6.608,
        lng: 106.8125,
      },
      {
        name: 'Dika Stone & Wood Sculptures',
        nameEn: 'Dika Stone & Wood Sculptures',
        desc: 'Pahatan Karakter Sunda & Replika Megalitikum',
        lat: -6.6133,
        lng: 106.8083,
      },
      {
        name: 'Rian Illustration Atelier',
        nameEn: 'Rian Illustration Atelier',
        desc: 'Ilustrasi Botani & Cerita Rakyat Nusantara',
        lat: -6.5925,
        lng: 106.7905,
      },
      {
        name: 'Batik Bogor Tradisiku Sentra',
        nameEn: 'Batik Bogor Tradisiku Center',
        desc: 'Pionir Motif Hujan, Kujang & Rusa Kebun Raya',
        lat: -6.5785,
        lng: 106.7924,
      },
      {
        name: 'Batikayudewi Workshop & Ceramic',
        nameEn: 'Batikayudewi Workshop & Ceramic',
        desc: 'Kelas Workshop Batik Tulis & Keramik Interaktif',
        lat: -6.554,
        lng: 106.8155,
      },
    ],
  },
};

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
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const routeGroupRef = useRef<L.LayerGroup | null>(null);
  const playerMarkerRef = useRef<L.Marker | null>(null);

  // Thematic Map States
  const [thematicLayer, setThematicLayer] = useState<ThematicLayerType>('history');
  const [showThematicRoute, setShowThematicRoute] = useState<boolean>(true);
  const [activeBasemap, setActiveBasemap] = useState<BasemapTileId>(isOffline ? 'osm' : 'osm');
  const [isBasemapMenuOpen, setIsBasemapMenuOpen] = useState<boolean>(false);
  const [showThematicGuide, setShowThematicGuide] = useState<boolean>(true);

  // Multi-layer toggle states (allows combining layers)
  const [enabledThematicLayers, setEnabledThematicLayers] = useState<Record<'history' | 'culinary' | 'creative', boolean>>({
    history: true,
    culinary: false,
    creative: false,
  });

  // Standard category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MapDisplayItem | null>(null);
  const [isItemCardMinimized, setIsItemCardMinimized] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobilePanelCollapsed, setIsMobilePanelCollapsed] = useState<boolean>(false);

  const handleCloseCard = () => {
    setSelectedItem(null);
    try {
      sessionStorage.setItem('sabo_map_card_dismissed', 'true');
    } catch (e) {}
  };

  // Fixed coordinates for creators
  const creatorCoordinatesMap: Record<string, { lat: number; lng: number }> = {
    bogor_sketchers: { lat: -6.6025, lng: 106.8015 },
    maya_crafts: { lat: -6.608, lng: 106.8125 },
    rian_illustration: { lat: -6.5925, lng: 106.7905 },
    dika_stone: { lat: -6.6133, lng: 106.8083 },
    batik_tradisiku: { lat: -6.5785, lng: 106.7924 },
  };

  const localizedHeritageLocations = HERITAGE_LOCATIONS.map((h) =>
    getLocalizedHeritage(h)
  );

  // Prepare unified list with explicit thematic category categorization
  const allMapItems: MapDisplayItem[] = [
    ...localizedHeritageLocations.map((h) => {
      let cat: 'history' | 'culinary' | 'botany' = 'history';
      if (h.category === 'kuliner') cat = 'culinary';
      else if (h.category === 'botani') cat = 'botany';
      return {
        type: 'heritage',
        data: h,
        thematicCategory: cat,
      } as MapDisplayItem;
    }),
    ...BOGOR_UMKM_DATABASE.map((u) => {
      let cat: 'history' | 'culinary' | 'creative' = 'culinary';
      const notesLower = u.notes.toLowerCase();
      const catLower = u.category.toLowerCase();
      if (
        catLower.includes('legendaris') ||
        notesLower.includes('sejak') ||
        notesLower.includes('tertua') ||
        notesLower.includes('klasik') ||
        u.number === 4 ||
        u.number === 23
      ) {
        cat = 'history';
      } else if (
        u.generalCategory === 'kreatif' ||
        u.generalCategory === 'kerajinan' ||
        u.generalCategory === 'fashion'
      ) {
        cat = 'creative';
      }
      return {
        type: 'umkm',
        data: u,
        thematicCategory: cat,
      } as MapDisplayItem;
    }),
    ...CREATORS.map((c) => ({
      type: 'creator',
      data: {
        ...c,
        coordinates: creatorCoordinatesMap[c.id] || {
          lat: -6.5971 + (Math.random() - 0.5) * 0.03,
          lng: 106.806 + (Math.random() - 0.5) * 0.03,
        },
      },
      thematicCategory: 'creative',
    } as MapDisplayItem)),
  ];

  // Set initial selected item on mount (only if user hasn't closed it in this session)
  useEffect(() => {
    let wasDismissed = false;
    try {
      wasDismissed = sessionStorage.getItem('sabo_map_card_dismissed') === 'true';
    } catch (e) {}
    if (!selectedItem && allMapItems.length > 0 && !wasDismissed) {
      setSelectedItem(allMapItems[0]);
    }
  }, []);

  // Filter map items according to selected Thematic Layer and multi-layer toggles
  const filteredMapItems = allMapItems.filter((item) => {
    // Thematic Filter Check
    let thematicMatch = false;

    if (thematicLayer === 'all') {
      // Check multi-layer checkboxes
      const matchesHistory = enabledThematicLayers.history && (
        item.thematicCategory === 'history' ||
        (item.type === 'heritage' && (item.data.category === 'sejarah' || item.data.category === 'botani'))
      );
      const matchesCulinary = enabledThematicLayers.culinary && (
        item.thematicCategory === 'culinary' ||
        (item.type === 'umkm' && (item.data.generalCategory === 'kuliner' || item.data.generalCategory === 'bakery' || item.data.generalCategory === 'kopi'))
      );
      const matchesCreative = enabledThematicLayers.creative && (
        item.thematicCategory === 'creative' ||
        (item.type === 'umkm' && (item.data.generalCategory === 'kerajinan' || item.data.generalCategory === 'fashion' || item.data.generalCategory === 'kreatif'))
      );

      // If at least one layer is enabled, match those. If none are enabled, show all
      if (enabledThematicLayers.history || enabledThematicLayers.culinary || enabledThematicLayers.creative) {
        thematicMatch = Boolean(matchesHistory || matchesCulinary || matchesCreative);
      } else {
        thematicMatch = true;
      }
    } else if (thematicLayer === 'history') {
      // Wisata Sejarah: Cagar budaya, museum, istana, prasasti, dan kuliner legendaris bersejarah
      thematicMatch =
        (item.type === 'heritage' && (item.data.category === 'sejarah' || item.data.category === 'botani')) ||
        (item.type === 'umkm' && (item.thematicCategory === 'history' || item.data.notes.toLowerCase().includes('sejak') || item.data.category.toLowerCase().includes('legendaris')));
    } else if (thematicLayer === 'culinary') {
      // Kuliner Legendaris: Warisan kuliner, kedai kopi tua, bakery ikonik, jajanan legendaris
      thematicMatch =
        (item.type === 'heritage' && item.data.category === 'kuliner') ||
        (item.type === 'umkm' && (item.data.generalCategory === 'kuliner' || item.data.generalCategory === 'bakery' || item.data.generalCategory === 'kopi'));
    } else if (thematicLayer === 'creative') {
      // Ruang Kreatif: Creator hub, studio kriya, galeri batik, co-working & atelier
      thematicMatch =
        item.type === 'creator' ||
        (item.type === 'umkm' && (item.data.generalCategory === 'kerajinan' || item.data.generalCategory === 'fashion' || item.data.generalCategory === 'kreatif'));
    }

    if (!thematicMatch) return false;

    // Subcategory Filter (when in 'all' mode or subcategory is actively specified)
    if (selectedCategory !== 'all') {
      let subCategoryMatch = false;
      if (selectedCategory === 'sejarah') {
        subCategoryMatch = item.type === 'heritage' && item.data.category === 'sejarah';
      } else if (selectedCategory === 'botani') {
        subCategoryMatch = item.type === 'heritage' && item.data.category === 'botani';
      } else if (selectedCategory === 'kopi') {
        subCategoryMatch = item.type === 'umkm' && item.data.generalCategory === 'kopi';
      } else if (selectedCategory === 'kuliner') {
        subCategoryMatch =
          (item.type === 'heritage' && item.data.category === 'kuliner') ||
          (item.type === 'umkm' && item.data.generalCategory === 'kuliner');
      } else if (selectedCategory === 'bakery') {
        subCategoryMatch = item.type === 'umkm' && item.data.generalCategory === 'bakery';
      } else if (selectedCategory === 'kerajinan') {
        subCategoryMatch =
          (item.type === 'umkm' && item.data.generalCategory === 'kerajinan') ||
          (item.type === 'creator' && item.data.category === 'kriya');
      } else if (selectedCategory === 'fashion') {
        subCategoryMatch = item.type === 'umkm' && item.data.generalCategory === 'fashion';
      } else if (selectedCategory === 'kreatif') {
        subCategoryMatch =
          item.type === 'creator' ||
          (item.type === 'umkm' && item.data.generalCategory === 'kreatif');
      } else if (selectedCategory === 'top_umkm') {
        subCategoryMatch = item.type === 'umkm' && item.data.rating >= 4.8;
      }
      if (!subCategoryMatch) return false;
    }

    // Text search query filter
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

  // Calculate thematic stats
  const historyCount = allMapItems.filter(
    (i) =>
      (i.type === 'heritage' && (i.data.category === 'sejarah' || i.data.category === 'botani')) ||
      (i.type === 'umkm' && (i.thematicCategory === 'history' || i.data.notes.toLowerCase().includes('sejak')))
  ).length;

  const culinaryCount = allMapItems.filter(
    (i) =>
      (i.type === 'heritage' && i.data.category === 'kuliner') ||
      (i.type === 'umkm' && (i.data.generalCategory === 'kuliner' || i.data.generalCategory === 'bakery' || i.data.generalCategory === 'kopi'))
  ).length;

  const creativeCount = allMapItems.filter(
    (i) =>
      i.type === 'creator' ||
      (i.type === 'umkm' && (i.data.generalCategory === 'kerajinan' || i.data.generalCategory === 'fashion' || i.data.generalCategory === 'kreatif'))
  ).length;

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

      // Determine initial tile
      const initialConfig = BASEMAP_CONFIGS.find((b) => b.id === activeBasemap) || BASEMAP_CONFIGS[0];
      const tileLayer = L.tileLayer(initialConfig.url, {
        attribution: initialConfig.attribution,
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      routeGroupRef.current = L.layerGroup().addTo(map);
      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Basemap Switcher
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const config = BASEMAP_CONFIGS.find((b) => b.id === activeBasemap) || BASEMAP_CONFIGS[0];

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newTileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    newTileLayer.bringToBack();
    tileLayerRef.current = newTileLayer;
  }, [activeBasemap]);

  // Render Thematic Route Polylines and Waypoint Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !routeGroupRef.current) return;

    routeGroupRef.current.clearLayers();

    if (!showThematicRoute || thematicLayer === 'all') return;

    const routeDef = THEMATIC_ROUTE_DEFINITIONS[thematicLayer];
    if (!routeDef || !routeDef.waypoints || routeDef.waypoints.length === 0) return;

    const latLngs = routeDef.waypoints.map((wp) => [wp.lat, wp.lng] as [number, number]);

    // Outer Glow / Route Halo
    const glowLine = L.polyline(latLngs, {
      color: routeDef.color,
      weight: 9,
      opacity: 0.35,
      lineCap: 'round',
      lineJoin: 'round',
    });

    // Inner Dashed Tour Line
    const coreLine = L.polyline(latLngs, {
      color: '#ffffff',
      weight: 3.5,
      opacity: 0.95,
      dashArray: '8, 8',
      lineCap: 'round',
      lineJoin: 'round',
    });

    routeGroupRef.current.addLayer(glowLine);
    routeGroupRef.current.addLayer(coreLine);

    // Add Numbered Waypoint Badges along the route
    routeDef.waypoints.forEach((wp, idx) => {
      const stopHtml = `
        <div style="
          background: ${routeDef.color};
          color: #ffffff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 11px;
          border: 2.5px solid #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          cursor: pointer;
          transition: transform 0.2s ease;
        " title="${wp.name}">
          ${idx + 1}
        </div>
      `;

      const stopIcon = L.divIcon({
        html: stopHtml,
        className: 'thematic-stop-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const stopMarker = L.marker([wp.lat, wp.lng], {
        icon: stopIcon,
        zIndexOffset: 500,
      });

      stopMarker.bindTooltip(
        `<div style="font-family: inherit; font-size: 11px; line-height: 1.3;">
          <div style="font-weight: 800; color: ${routeDef.color};">#${idx + 1} ${lang === 'en' ? wp.nameEn : wp.name}</div>
          <div style="color: #64748b; font-size: 10px;">${wp.desc}</div>
        </div>`,
        {
          direction: 'top',
          offset: [0, -14],
          opacity: 0.98,
        }
      );

      stopMarker.on('click', () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([wp.lat, wp.lng], 16);
        }
      });

      routeGroupRef.current?.addLayer(stopMarker);
    });
  }, [thematicLayer, showThematicRoute, lang]);

  // Render Markers on Map
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

        // Highlight legendary items
        if (item.thematicCategory === 'history') {
          categoryColor = '#2563eb';
          iconEmoji = '📜';
        }
      } else if (item.type === 'creator') {
        lat = item.data.coordinates.lat;
        lng = item.data.coordinates.lng;
        title = item.data.name;
        categoryColor = '#06b6d4';
        iconEmoji = '🎨';
      }

      // Special active badge highlight for thematic layer
      const isThematicActive =
        (thematicLayer === 'history' && (item.thematicCategory === 'history' || (item.type === 'heritage' && item.data.category === 'sejarah'))) ||
        (thematicLayer === 'culinary' && (item.thematicCategory === 'culinary' || (item.type === 'umkm' && item.data.generalCategory === 'kuliner'))) ||
        (thematicLayer === 'creative' && item.thematicCategory === 'creative');

      const pinSize = isThematicActive ? 38 : 34;

      const customHtml = `
        <div style="
          background-color: ${categoryColor};
          width: ${pinSize}px;
          height: ${pinSize}px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2.5px solid #ffffff;
          box-shadow: 0 4px 14px ${isThematicActive ? categoryColor + '88' : 'rgba(0,0,0,0.4)'};
          font-size: ${isThematicActive ? '17px' : '15px'};
          cursor: pointer;
          position: relative;
          transition: transform 0.2s ease;
          ${isThematicActive ? 'transform: scale(1.08); ring: 2px solid #ffffff;' : ''}
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
        iconSize: [pinSize, pinSize],
        iconAnchor: [pinSize / 2, pinSize / 2],
      });

      const marker = L.marker([lat, lng], {
        icon: customIcon,
      });

      marker.on('click', () => {
        setSelectedItem(item);
        setIsItemCardMinimized(false);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([lat, lng]);
        }
      });

      markersGroupRef.current?.addLayer(marker);
    });
  }, [filteredMapItems, completedQuestIds, thematicLayer]);

  // Update Player Position Marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (playerMarkerRef.current) {
      playerMarkerRef.current.remove();
    }

    if (isGpsActive) {
      const playerHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 34px; height: 34px; background: rgba(245, 158, 11, 0.35); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 22px; height: 22px; background: #f59e0b; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 0 14px rgba(245, 158, 11, 0.9);"></div>
        </div>
      `;

      const playerIcon = L.divIcon({
        html: playerHtml,
        className: 'player-position-pin',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
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

  const handleFitThematicBounds = () => {
    if (!mapInstanceRef.current || filteredMapItems.length === 0) return;

    const coordinates = filteredMapItems.map((item) => [
      item.data.coordinates.lat,
      item.data.coordinates.lng,
    ] as [number, number]);

    const bounds = L.latLngBounds(coordinates);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
  };

  const handleSelectThematicPreset = (theme: ThematicLayerType) => {
    setThematicLayer(theme);
    setSelectedCategory('all');

    if (theme === 'history') {
      setEnabledThematicLayers({ history: true, culinary: false, creative: false });
    } else if (theme === 'culinary') {
      setEnabledThematicLayers({ history: false, culinary: true, creative: false });
    } else if (theme === 'creative') {
      setEnabledThematicLayers({ history: false, culinary: false, creative: true });
    } else {
      setEnabledThematicLayers({ history: true, culinary: true, creative: true });
    }

    // Auto-fit bounds on preset selection after a tick
    setTimeout(() => {
      handleFitThematicBounds();
    }, 150);
  };

  const toggleLayerCheckbox = (layer: 'history' | 'culinary' | 'creative') => {
    setEnabledThematicLayers((prev) => {
      const next = { ...prev, [layer]: !prev[layer] };
      // Switch thematic tab to 'all' if user uses manual multi-toggle
      setThematicLayer('all');
      return next;
    });
  };

  return (
    <div className="relative w-full h-[calc(100vh-115px)] flex flex-col md:flex-row bg-[#061a12] light:bg-[#f8f5ed] overflow-hidden text-[#f7f4eb] light:text-[#0d2e22]">
      {/* Sidebar Controls (Mobile & Desktop) */}
      <div
        className={`w-full md:w-96 bg-[#071c14]/95 light:bg-[#f4efe4]/95 backdrop-blur-2xl border-r border-amber-900/30 light:border-amber-800/20 flex flex-col z-20 shadow-2xl transition-all duration-300 ${
          isMobilePanelCollapsed
            ? 'max-h-[56px] overflow-hidden'
            : 'max-h-[46vh] md:max-h-full overflow-y-auto'
        }`}
      >
        {/* Header & Thematic Mode Selector */}
        <div className="p-3 sm:p-4 border-b border-amber-900/20 light:border-amber-800/20 space-y-2.5 sm:space-y-3 bg-[#071c14]/98 light:bg-[#f4efe4]/98 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 bg-gradient-to-br from-amber-600 to-emerald-600 rounded-xl shadow-md text-white flex-shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 className="font-extrabold text-sm sm:text-base text-amber-100 light:text-[#0d2e22] leading-tight flex items-center gap-1.5 truncate">
                  <span>{lang === 'en' ? 'Thematic Maps' : 'Peta Tematik Bogor'}</span>
                </h2>
                <p className="text-[10px] text-amber-200/60 light:text-amber-900/60 hidden sm:block truncate">
                  {lang === 'en' ? 'Curated layers & walking trails' : 'Layer tematik & rute interaktif'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-800/30 light:bg-emerald-800/15 text-amber-200 light:text-amber-900 border border-amber-600/30 font-bold whitespace-nowrap">
                {filteredMapItems.length} {lang === 'en' ? 'Pts' : 'Titik'}
              </span>

              {/* Mobile collapse / expand toggle */}
              <button
                onClick={() => setIsMobilePanelCollapsed(!isMobilePanelCollapsed)}
                className="md:hidden p-1 sm:p-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-1 cursor-pointer active:scale-95"
                title={isMobilePanelCollapsed ? 'Buka Panel Filter' : 'Tutup Panel (Lihat Peta Penuh)'}
                aria-label="Toggle Mobile Panel"
              >
                {isMobilePanelCollapsed ? (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px]">Filter</span>
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px]">Peta</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* THEMATIC LAYER PRESET TABS */}
          <div className="bg-[#051710] light:bg-white/80 p-1.5 rounded-2xl border border-amber-900/30 light:border-amber-800/20 shadow-inner">
            <div className="text-[10px] font-bold tracking-wider uppercase text-amber-300/80 light:text-amber-800/80 px-2 py-1 flex items-center justify-between">
              <span>{t('thematic_mode_label')}</span>
              <span className="text-[9px] lowercase font-normal opacity-70">
                {thematicLayer === 'all' ? (lang === 'en' ? 'custom' : 'kombinasi') : (lang === 'en' ? 'active' : 'aktif')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mt-1">
              {/* Wisata Sejarah */}
              <button
                onClick={() => handleSelectThematicPreset('history')}
                className={`p-2 rounded-xl text-left transition flex items-center space-x-2 border ${
                  thematicLayer === 'history'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200 light:text-blue-900 font-extrabold shadow-md'
                    : 'bg-white/5 light:bg-amber-900/5 hover:bg-white/10 text-amber-100/80 light:text-[#0d2e22] border-white/10 light:border-amber-800/20'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 flex-shrink-0">
                  <Landmark className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">
                    {lang === 'en' ? 'Heritage' : 'Wisata Sejarah'}
                  </div>
                  <div className="text-[9px] opacity-70 truncate">
                    {historyCount} {lang === 'en' ? 'sites' : 'lokasi'}
                  </div>
                </div>
              </button>

              {/* Kuliner Legendaris */}
              <button
                onClick={() => handleSelectThematicPreset('culinary')}
                className={`p-2 rounded-xl text-left transition flex items-center space-x-2 border ${
                  thematicLayer === 'culinary'
                    ? 'bg-red-600/30 border-red-500 text-red-200 light:text-red-900 font-extrabold shadow-md'
                    : 'bg-white/5 light:bg-amber-900/5 hover:bg-white/10 text-amber-100/80 light:text-[#0d2e22] border-white/10 light:border-amber-800/20'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-red-500/20 text-red-300 flex-shrink-0">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">
                    {lang === 'en' ? 'Legendary Food' : 'Kuliner Legendaris'}
                  </div>
                  <div className="text-[9px] opacity-70 truncate">
                    {culinaryCount} {lang === 'en' ? 'spots' : 'kuliner'}
                  </div>
                </div>
              </button>

              {/* Ruang Kreatif */}
              <button
                onClick={() => handleSelectThematicPreset('creative')}
                className={`p-2 rounded-xl text-left transition flex items-center space-x-2 border ${
                  thematicLayer === 'creative'
                    ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200 light:text-cyan-900 font-extrabold shadow-md'
                    : 'bg-white/5 light:bg-amber-900/5 hover:bg-white/10 text-amber-100/80 light:text-[#0d2e22] border-white/10 light:border-amber-800/20'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 flex-shrink-0">
                  <Palette className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">
                    {lang === 'en' ? 'Creative Spaces' : 'Ruang Kreatif'}
                  </div>
                  <div className="text-[9px] opacity-70 truncate">
                    {creativeCount} {lang === 'en' ? 'studios' : 'studio & seni'}
                  </div>
                </div>
              </button>

              {/* Semua Layer (Eksplorasi Lengkap) */}
              <button
                onClick={() => handleSelectThematicPreset('all')}
                className={`p-2 rounded-xl text-left transition flex items-center space-x-2 border ${
                  thematicLayer === 'all'
                    ? 'bg-amber-600/30 border-amber-500 text-amber-200 light:text-amber-900 font-extrabold shadow-md'
                    : 'bg-white/5 light:bg-amber-900/5 hover:bg-white/10 text-amber-100/80 light:text-[#0d2e22] border-white/10 light:border-amber-800/20'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 flex-shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">
                    {lang === 'en' ? 'All Points' : 'Semua Titik'}
                  </div>
                  <div className="text-[9px] opacity-70 truncate">
                    {allMapItems.length} {lang === 'en' ? 'total' : 'titik'}
                  </div>
                </div>
              </button>
            </div>

            {/* Multi-layer manual checkboxes when in 'all' mode */}
            {thematicLayer === 'all' && (
              <div className="mt-2.5 pt-2 border-t border-amber-900/30 flex items-center justify-between gap-1 text-[11px]">
                <span className="text-[10px] text-amber-200/70 light:text-amber-900/70 font-semibold">
                  {lang === 'en' ? 'Layer Check:' : 'Pilih Layer:'}
                </span>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabledThematicLayers.history}
                    onChange={() => toggleLayerCheckbox('history')}
                    className="accent-blue-500 rounded"
                  />
                  <span className="text-[10px] text-blue-300 light:text-blue-900 font-medium">Sejarah</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabledThematicLayers.culinary}
                    onChange={() => toggleLayerCheckbox('culinary')}
                    className="accent-red-500 rounded"
                  />
                  <span className="text-[10px] text-red-300 light:text-red-900 font-medium">Kuliner</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabledThematicLayers.creative}
                    onChange={() => toggleLayerCheckbox('creative')}
                    className="accent-cyan-500 rounded"
                  />
                  <span className="text-[10px] text-cyan-300 light:text-cyan-900 font-medium">Kreatif</span>
                </label>
              </div>
            )}
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

          {/* Sub-Category Filter Pills */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition backdrop-blur-md ${
                selectedCategory === 'all'
                  ? 'bg-amber-800/40 light:bg-amber-800/20 text-amber-200 light:text-amber-900 border border-amber-600/60 font-bold shadow-md'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              {t('cat_all')} ({filteredMapItems.length})
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
                  setIsItemCardMinimized(false);
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

        {/* TOP FLOATING THEMATIC CONTROLS BAR (OVER MAP) */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Left Actions: Center GPS & Fit Bounds */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={handleCenterUser}
              className="px-3 py-2 bg-[#071c14]/90 light:bg-[#f4efe4]/95 hover:bg-[#071c14] text-amber-300 light:text-amber-900 rounded-2xl shadow-xl border border-amber-800/40 light:border-amber-800/20 flex items-center space-x-2 text-xs font-semibold backdrop-blur-xl transition"
              title={lang === 'en' ? 'Center My Location' : 'Pusatkan Lokasi Saya'}
            >
              <Navigation className="w-4 h-4 text-emerald-400 light:text-emerald-700" />
              <span className="hidden sm:inline text-amber-100 light:text-[#0d2e22]">
                {t('btn_my_location')}
              </span>
            </button>

            <button
              onClick={handleFitThematicBounds}
              className="px-3 py-2 bg-[#071c14]/90 light:bg-[#f4efe4]/95 hover:bg-[#071c14] text-amber-300 light:text-amber-900 rounded-2xl shadow-xl border border-amber-800/40 light:border-amber-800/20 flex items-center space-x-1.5 text-xs font-semibold backdrop-blur-xl transition"
              title={lang === 'en' ? 'Fit all points on screen' : 'Fokuskan semua titik tema'}
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-amber-100 light:text-[#0d2e22]">
                {lang === 'en' ? 'Fit View' : 'Fokus Area'}
              </span>
            </button>
          </div>

          {/* Right Actions: Thematic Route Switch & Basemap Tile Selector */}
          <div className="flex items-center space-x-2 pointer-events-auto relative">
            {/* Thematic Route Toggle (when a specific theme is active) */}
            {thematicLayer !== 'all' && (
              <button
                onClick={() => setShowThematicRoute(!showThematicRoute)}
                className={`px-3 py-2 rounded-2xl shadow-xl border text-xs font-bold backdrop-blur-xl transition flex items-center space-x-1.5 ${
                  showThematicRoute
                    ? 'bg-amber-600/90 text-white border-amber-400'
                    : 'bg-[#071c14]/90 light:bg-[#f4efe4]/95 text-amber-200 light:text-amber-900 border-amber-800/40'
                }`}
                title={lang === 'en' ? 'Toggle Thematic Walking Trail' : 'Aktifkan/Matikan Garis Rute Tematik'}
              >
                <Route className="w-3.5 h-3.5 text-amber-200" />
                <span>
                  {showThematicRoute
                    ? (lang === 'en' ? 'Trail: ON' : 'Rute: Aktif')
                    : (lang === 'en' ? 'Trail: OFF' : 'Rute: Mati')}
                </span>
              </button>
            )}

            {/* Basemap Tile Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setIsBasemapMenuOpen(!isBasemapMenuOpen)}
                className="px-3 py-2 bg-[#071c14]/90 light:bg-[#f4efe4]/95 hover:bg-[#071c14] text-amber-100 light:text-[#0d2e22] rounded-2xl shadow-xl border border-amber-800/40 light:border-amber-800/20 flex items-center space-x-1.5 text-xs font-semibold backdrop-blur-xl transition"
                title={lang === 'en' ? 'Choose Basemap Tile' : 'Ganti Tampilan Peta Tile'}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">
                  {BASEMAP_CONFIGS.find((b) => b.id === activeBasemap)?.name.split(' ')[0]}
                </span>
              </button>

              {/* Basemap Tile Dropdown */}
              {isBasemapMenuOpen && (
                <div className="absolute right-0 top-11 w-52 bg-[#071c14]/98 light:bg-[#f8f5ed]/98 backdrop-blur-2xl border border-amber-800/40 rounded-2xl p-2 shadow-2xl z-30 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-amber-300/70 light:text-amber-900/70 px-2 py-1 border-b border-amber-900/30">
                    {lang === 'en' ? 'Public Basemap Tile' : 'Pilihan Tile Peta Publik'}
                  </div>
                  {BASEMAP_CONFIGS.map((config) => (
                    <button
                      key={config.id}
                      onClick={() => {
                        setActiveBasemap(config.id);
                        setIsBasemapMenuOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs transition flex items-center justify-between ${
                        activeBasemap === config.id
                          ? 'bg-amber-600/30 text-amber-200 font-bold border border-amber-500/50'
                          : 'hover:bg-white/10 text-amber-100/80 light:text-[#0d2e22]'
                      }`}
                    >
                      <span>{lang === 'en' ? config.nameEn : config.name}</span>
                      {activeBasemap === config.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                  <div className="text-[9px] text-amber-200/50 light:text-amber-900/50 px-2 pt-1">
                    Leaflet.js + OpenStreetMap Tile
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ACTIVE THEMATIC GUIDE / BANNER (Floating below top controls) */}
        {showThematicGuide && thematicLayer !== 'all' && THEMATIC_ROUTE_DEFINITIONS[thematicLayer] && (
          <div className="absolute top-16 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-20 pointer-events-auto">
            <div
              className="bg-[#071c14]/95 light:bg-[#f8f5ed]/95 backdrop-blur-2xl border rounded-2xl p-3 shadow-2xl transition"
              style={{ borderColor: THEMATIC_ROUTE_DEFINITIONS[thematicLayer].borderAccent }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div
                    className="p-1.5 rounded-xl text-white font-bold text-xs"
                    style={{ backgroundColor: THEMATIC_ROUTE_DEFINITIONS[thematicLayer].color }}
                  >
                    {thematicLayer === 'history' && <Landmark className="w-4 h-4" />}
                    {thematicLayer === 'culinary' && <UtensilsCrossed className="w-4 h-4" />}
                    {thematicLayer === 'creative' && <Palette className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-black text-amber-100 light:text-[#0d2e22]">
                      {lang === 'en'
                        ? THEMATIC_ROUTE_DEFINITIONS[thematicLayer].titleEn
                        : THEMATIC_ROUTE_DEFINITIONS[thematicLayer].title}
                    </div>
                    <span
                      className="inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-0.5 text-white"
                      style={{ backgroundColor: THEMATIC_ROUTE_DEFINITIONS[thematicLayer].color }}
                    >
                      {lang === 'en'
                        ? THEMATIC_ROUTE_DEFINITIONS[thematicLayer].badgeEn
                        : THEMATIC_ROUTE_DEFINITIONS[thematicLayer].badge}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowThematicGuide(false)}
                  className="text-amber-200/60 hover:text-amber-100 text-xs p-1"
                  title={lang === 'en' ? 'Hide guide' : 'Sembunyikan'}
                >
                  ✕
                </button>
              </div>

              <p className="text-[11px] text-amber-200/80 light:text-[#3b2818] mt-2 leading-relaxed">
                {lang === 'en'
                  ? THEMATIC_ROUTE_DEFINITIONS[thematicLayer].subtitleEn
                  : THEMATIC_ROUTE_DEFINITIONS[thematicLayer].subtitle}
              </p>

              <div className="mt-2.5 pt-2 border-t border-amber-900/30 flex items-center justify-between text-[10px]">
                <span className="text-amber-300 light:text-amber-900 font-bold flex items-center gap-1">
                  <Route className="w-3 h-3 text-emerald-400" />
                  {THEMATIC_ROUTE_DEFINITIONS[thematicLayer].waypoints.length} {lang === 'en' ? 'curated stops' : 'titik perhentian'}
                </span>
                <button
                  onClick={handleFitThematicBounds}
                  className="text-emerald-300 light:text-emerald-800 font-bold hover:underline"
                >
                  {lang === 'en' ? 'Fit all points →' : 'Tampilkan semua titik →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Item Bottom Overlay Banner with Close (X) & Minimize (Perkecil) Controls */}
        {selectedItem && (
          isItemCardMinimized ? (
            /* 1. Minimized Compact Bar (Non-spammy, unblocks the map) */
            <div className="absolute bottom-4 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-20 bg-[#071c14]/95 light:bg-[#f8f5ed]/95 backdrop-blur-2xl border border-amber-600/50 light:border-amber-800/40 rounded-2xl p-2 sm:p-2.5 shadow-2xl text-amber-100 light:text-[#0d2e22] flex items-center justify-between gap-2.5 animate-fadeIn transition-all">
              <div
                onClick={() => setIsItemCardMinimized(false)}
                className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer group"
                title={lang === 'en' ? 'Click to expand details' : 'Klik untuk perbesar detail'}
              >
                <img
                  src={
                    selectedItem.type === 'heritage'
                      ? selectedItem.data.image
                      : selectedItem.type === 'umkm'
                      ? selectedItem.data.image
                      : selectedItem.data.avatar
                  }
                  alt={selectedItem.data.name}
                  className="w-10 h-10 rounded-xl object-cover border border-amber-700/50 flex-shrink-0 shadow group-hover:scale-105 transition"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-800/40 text-emerald-300 light:text-emerald-900 border border-emerald-600/30 truncate max-w-[140px]">
                      {selectedItem.type === 'heritage'
                        ? `${selectedItem.data.category}`
                        : selectedItem.type === 'umkm'
                        ? `#${selectedItem.data.number} ${selectedItem.data.category}`
                        : selectedItem.data.category}
                    </span>
                    {selectedItem.type === 'heritage' && (
                      <span className="text-[10px] font-bold text-amber-300 light:text-amber-900">
                        +{selectedItem.data.xpReward} XP
                      </span>
                    )}
                    {selectedItem.type === 'umkm' && (
                      <span className="text-[10px] font-bold text-amber-300 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        {selectedItem.data.rating}
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-xs text-amber-100 light:text-[#0d2e22] truncate mt-0.5 group-hover:text-amber-300 transition">
                    {selectedItem.data.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setIsItemCardMinimized(false)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-800/40 hover:bg-amber-700/50 light:bg-amber-800/20 text-amber-200 hover:text-white light:text-amber-900 border border-amber-600/40 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shadow-sm active:scale-95"
                  title={lang === 'en' ? 'Expand details' : 'Perbesar detail'}
                  aria-label="Perbesar detail"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-300 light:text-amber-800" />
                  <span className="text-[10px] hidden xs:inline">{lang === 'en' ? 'Expand' : 'Perbesar'}</span>
                </button>
                <button
                  onClick={handleCloseCard}
                  className="p-1.5 rounded-xl bg-red-950/50 hover:bg-red-900/80 light:bg-stone-200 text-amber-200/80 hover:text-white light:text-stone-700 border border-red-500/40 hover:border-red-400 transition cursor-pointer shadow-sm active:scale-95"
                  title={lang === 'en' ? 'Close card (X)' : 'Tutup (X)'}
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* 2. Full Expanded Spotlight Card with Clear Perkecil & Cross (X) buttons */
            <div className="absolute bottom-4 left-3 right-3 sm:left-4 sm:right-auto md:w-[500px] z-20 bg-[#071c14]/95 light:bg-[#f8f5ed]/95 backdrop-blur-2xl border border-amber-700/40 light:border-amber-800/30 rounded-3xl p-3.5 sm:p-4 shadow-2xl text-amber-100 light:text-[#0d2e22] transition-all max-h-[80vh] overflow-y-auto">
              {/* Header Action Strip: Spotlight Indicator + Perkecil (Minimize) + Close (X) */}
              <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-amber-900/30 light:border-amber-800/20">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 animate-pulse" />
                  <span className="text-[11px] font-bold text-amber-300/90 light:text-amber-900 truncate">
                    {selectedItem.type === 'heritage'
                      ? (lang === 'en' ? 'Heritage Spotlight & Trivia' : 'Trivia & Info Destinasi')
                      : selectedItem.type === 'umkm'
                      ? (lang === 'en' ? 'Curated Local UMKM' : 'UMKM Warisan & Kuliner')
                      : (lang === 'en' ? 'Local Creator Studio' : 'Studio Kreator Lokal')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setIsItemCardMinimized(true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 light:bg-amber-800/15 text-amber-200 hover:text-white light:text-amber-900 border border-amber-700/40 text-[10px] font-bold transition cursor-pointer active:scale-95"
                    title={lang === 'en' ? 'Minimize card' : 'Perkecil kartu'}
                    aria-label="Perkecil kartu"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-amber-300 light:text-amber-800" />
                    <span>{lang === 'en' ? 'Minimize' : 'Perkecil'}</span>
                  </button>
                  <button
                    onClick={handleCloseCard}
                    className="p-1 rounded-xl bg-red-950/40 hover:bg-red-900/70 light:bg-stone-200 text-amber-200/80 hover:text-white light:text-stone-700 border border-red-500/30 hover:border-red-400 transition cursor-pointer active:scale-95"
                    title={lang === 'en' ? 'Close card (X)' : 'Tutup kartu (X)'}
                    aria-label="Tutup kartu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

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
                      className="inline-flex items-center space-x-1.5 text-xs bg-gradient-to-r from-emerald-700 via-amber-800 to-amber-700 hover:from-emerald-600 hover:to-amber-600 text-amber-100 font-extrabold px-4 py-2 rounded-xl shadow-lg shadow-amber-950/40 transition transform hover:scale-105 border border-amber-600/30 cursor-pointer"
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
          )
        )}
      </div>
    </div>
  );
};
