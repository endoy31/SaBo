import React, { useState } from 'react';
import {
  Calendar,
  Compass,
  MapPin,
  Star,
  Plus,
  Trash2,
  DollarSign,
  Search,
  ExternalLink,
  Utensils,
  Building2,
  ShoppingBag,
  Sparkles,
  Share2,
  CheckCircle2,
  Globe,
  Hotel,
  Plane,
  Navigation,
} from 'lucide-react';
import {
  LEGENDARY_CUISINE,
  MODERN_RESTAURANTS,
  TOURISM_DESTINATIONS,
  GOVERNMENT_INSTITUTIONS,
  UMKM_CENTERS,
} from '../data/bogorData';
import { Itinerary, ItineraryItem } from '../types';
import { formatDistance, calculateDistanceMeters, UserCoordinates } from '../utils/geolocationManager';

interface ModuleTourismPlannerProps {
  userPos: UserCoordinates;
  savedItineraries: Itinerary[];
  onSaveItinerary: (itinerary: Itinerary) => void;
}

const BOGOR_GOOGLE_TRAVEL_EXPLORE_URL =
  'https://www.google.com/travel/explore?tfs=CBwQAxoOagwIAhIIL20vMDQ0cnYaDnIMCAISCC9tLzA0NHJ2QAFIAXACggELCP___________wGYAQGyARMqEQgDEg0vZy8xMWJfMGRfa214&tfu=GgA&authuser=0&tcfs=UgRgAXgB';

export const ModuleTourismPlanner: React.FC<ModuleTourismPlannerProps> = ({
  userPos,
  savedItineraries,
  onSaveItinerary,
}) => {
  const [activeTab, setActiveTab] = useState<
    'googletravel' | 'kuliner' | 'restoran' | 'wisata' | 'instansi' | 'umkm'
  >('googletravel');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [googleTravelQuery, setGoogleTravelQuery] = useState<string>('Hotel & Tempat Wisata di Bogor');

  // Itinerary Planner state
  const [currentItineraryItems, setCurrentItineraryItems] = useState<ItineraryItem[]>([]);
  const [itineraryTitle, setItineraryTitle] = useState<string>('Wisata Seharian Bogor 2026');

  // Add place to itinerary
  const handleAddToItinerary = (
    placeId: string,
    placeName: string,
    category: string,
    estCost: number
  ) => {
    if (currentItineraryItems.some((item) => item.placeId === placeId)) {
      alert('Destinasi ini sudah ada di daftar Itinerary kamu!');
      return;
    }

    const newItem: ItineraryItem = {
      placeId,
      placeName,
      category,
      estCost,
    };

    setCurrentItineraryItems([...currentItineraryItems, newItem]);
  };

  const handleRemoveFromItinerary = (placeId: string) => {
    setCurrentItineraryItems(
      currentItineraryItems.filter((item) => item.placeId !== placeId)
    );
  };

  const handleSaveItinerary = () => {
    if (currentItineraryItems.length === 0) {
      alert('Pilih minimal 1 tempat wisata/kuliner sebelum menyimpan itinerary!');
      return;
    }

    const totalCost = currentItineraryItems.reduce(
      (sum, item) => sum + item.estCost,
      0
    );

    const newItinerary: Itinerary = {
      id: `itinerary_${Date.now()}`,
      title: itineraryTitle,
      items: currentItineraryItems,
      date: new Date().toISOString().split('T')[0],
      totalCost,
    };

    onSaveItinerary(newItinerary);
    alert('Itinerary Berhasil Disimpan ke Profil Kamu!');
  };

  const handleOpenGoogleTravelSearch = () => {
    const query = encodeURIComponent(googleTravelQuery || 'Wisata Bogor');
    window.open(`https://www.google.com/travel/search?q=${query}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100 light:text-[#0d2e22] transition-colors duration-300">
      {/* Banner */}
      <div className="bg-slate-900/40 light:bg-[#f4efe4]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 light:border-amber-800/20 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/15 light:bg-emerald-800/10 text-emerald-300 light:text-emerald-900 border border-emerald-400/30 light:border-emerald-600/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <Globe className="w-4 h-4 text-emerald-400 light:text-emerald-700" />
            <span>Smart Tourism Planner • Terintegrasi Google Travel</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white light:text-[#0d2e22]">
            Panduan Wisata & Integrasi Google Travel Bogor 2026
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 light:text-[#3b2818] leading-relaxed">
            Eksplorasi destinasi unggulan Kota Bogor dengan integrasi data real-time Google Travel, peta hotel, estimasi harga tiket, tempat kuliner legendaris, serta pembuat susunan itinerary perjalanan.
          </p>

          {/* Tab Selection */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('googletravel')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeTab === 'googletravel'
                  ? 'bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 shadow-lg shadow-amber-950/20'
                  : 'bg-white/5 light:bg-amber-900/10 text-slate-300 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Google Travel Explore</span>
            </button>

            <button
              onClick={() => setActiveTab('kuliner')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeTab === 'kuliner'
                  ? 'bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 shadow-lg shadow-amber-950/20'
                  : 'bg-white/5 light:bg-amber-900/10 text-slate-300 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              <span>🍜 Kuliner Legendaris ({LEGENDARY_CUISINE.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('restoran')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeTab === 'restoran'
                  ? 'bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 shadow-lg shadow-amber-950/20'
                  : 'bg-white/5 light:bg-amber-900/10 text-slate-300 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              <span>🍽️ Restoran Hype ({MODERN_RESTAURANTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wisata')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeTab === 'wisata'
                  ? 'bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 shadow-lg shadow-amber-950/20'
                  : 'bg-white/5 light:bg-amber-900/10 text-slate-300 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              <span>🎡 Destinasi Wisata ({TOURISM_DESTINATIONS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('umkm')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeTab === 'umkm'
                  ? 'bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 shadow-lg shadow-amber-950/20'
                  : 'bg-white/5 light:bg-amber-900/10 text-slate-300 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              <span>🛍️ Sentra UMKM ({UMKM_CENTERS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('instansi')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeTab === 'instansi'
                  ? 'bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 shadow-lg shadow-amber-950/20'
                  : 'bg-white/5 light:bg-amber-900/10 text-slate-300 light:text-[#0d2e22] hover:bg-white/10 border border-white/10 light:border-amber-800/20'
              }`}
            >
              <span>🏢 Instansi ({GOVERNMENT_INSTITUTIONS.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid + Itinerary Planner Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Category Content List */}
        <div className="lg:col-span-2 space-y-4">

          {/* 0. GOOGLE TRAVEL INTEGRATION TAB */}
          {activeTab === 'googletravel' && (
            <div className="space-y-5">
              {/* Featured Google Travel Card */}
              <div className="bg-gradient-to-br from-emerald-950/80 via-[#071c14] to-amber-950/60 light:from-[#fdfbf7] light:via-[#f4efe4] light:to-[#e9e2d0] p-6 rounded-3xl border border-amber-700/40 light:border-amber-800/30 shadow-2xl space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 light:text-amber-900">
                      <Globe className="w-4 h-4 text-emerald-400 light:text-emerald-700" />
                      <span>Google Travel Explore • Bogor & Sekitarnya</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white light:text-[#0d2e22]">
                      Jelajah Rute & Penerbangan Google Travel
                    </h3>
                    <p className="text-xs text-slate-300 light:text-[#3b2818] max-w-xl">
                      Akses langsung peta interaktif Google Travel untuk mengecek harga akomodasi, hotel, rute perjalanan, dan tempat wisata populer Kota Bogor secara realtime.
                    </p>
                  </div>

                  <a
                    href={BOGOR_GOOGLE_TRAVEL_EXPLORE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 bg-gradient-to-r from-emerald-700 to-amber-700 hover:from-emerald-600 hover:to-amber-600 text-amber-100 font-extrabold text-xs rounded-2xl shadow-xl border border-amber-500/40 flex items-center space-x-2 transition transform hover:scale-105 whitespace-nowrap"
                  >
                    <ExternalLink className="w-4 h-4 text-amber-200" />
                    <span>Buka Google Travel Explore</span>
                  </a>
                </div>

                {/* Google Travel Search Interactive Input */}
                <div className="bg-slate-900/60 light:bg-white/90 p-4 rounded-2xl border border-white/10 light:border-amber-800/20 space-y-3">
                  <label className="block text-xs font-bold text-amber-200 light:text-[#0d2e22]">
                    🔍 Cari Langsung di Google Travel:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={googleTravelQuery}
                      onChange={(e) => setGoogleTravelQuery(e.target.value)}
                      placeholder="Contoh: Hotel Murah Dekat Kebun Raya Bogor"
                      className="flex-1 bg-slate-950 light:bg-[#f8f5ed] border border-white/15 light:border-amber-800/20 rounded-xl px-3.5 py-2 text-xs text-white light:text-[#0d2e22] focus:outline-none focus:border-amber-500 font-medium"
                    />
                    <button
                      onClick={handleOpenGoogleTravelSearch}
                      className="px-4 py-2 bg-emerald-800/40 hover:bg-emerald-800/60 light:bg-emerald-800/20 light:hover:bg-emerald-800/30 text-emerald-200 light:text-emerald-900 border border-emerald-600/40 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Cari di Google Travel</span>
                    </button>
                  </div>
                </div>

                {/* Direct Shortcut Modules */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <a
                    href="https://www.google.com/travel/hotels/Bogor"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 light:bg-white/80 hover:bg-white/10 light:hover:bg-white rounded-2xl border border-white/10 light:border-amber-800/20 transition flex items-start space-x-3 group"
                  >
                    <div className="p-2.5 bg-amber-900/30 light:bg-amber-800/10 rounded-xl text-amber-300 light:text-amber-800 group-hover:scale-110 transition">
                      <Hotel className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white light:text-[#0d2e22] group-hover:text-amber-300 light:group-hover:text-amber-800 flex items-center gap-1">
                        Hotel Bogor <ExternalLink className="w-3 h-3 opacity-60" />
                      </h4>
                      <p className="text-[11px] text-slate-300 light:text-[#3b2818]/70 mt-0.5">
                        Cek penginapan, resor & vila terbaik di Google Travel
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.google.com/travel/things-to-do?q=Bogor"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 light:bg-white/80 hover:bg-white/10 light:hover:bg-white rounded-2xl border border-white/10 light:border-amber-800/20 transition flex items-start space-x-3 group"
                  >
                    <div className="p-2.5 bg-emerald-900/30 light:bg-emerald-800/10 rounded-xl text-emerald-300 light:text-emerald-800 group-hover:scale-110 transition">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white light:text-[#0d2e22] group-hover:text-emerald-300 light:group-hover:text-emerald-800 flex items-center gap-1">
                        Aktivitas & Wisata <ExternalLink className="w-3 h-3 opacity-60" />
                      </h4>
                      <p className="text-[11px] text-slate-300 light:text-[#3b2818]/70 mt-0.5">
                        Rekomendasi atraksi dan aktivitas seru versi Google
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.google.com/travel/flights?q=Jakarta+Bogor"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 light:bg-white/80 hover:bg-white/10 light:hover:bg-white rounded-2xl border border-white/10 light:border-amber-800/20 transition flex items-start space-x-3 group"
                  >
                    <div className="p-2.5 bg-sky-900/30 light:bg-sky-800/10 rounded-xl text-sky-300 light:text-sky-800 group-hover:scale-110 transition">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white light:text-[#0d2e22] group-hover:text-sky-300 light:group-hover:text-sky-800 flex items-center gap-1">
                        Tiket Transportasi <ExternalLink className="w-3 h-3 opacity-60" />
                      </h4>
                      <p className="text-[11px] text-slate-300 light:text-[#3b2818]/70 mt-0.5">
                        Penerbangan & rute kereta ke area Bogor
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Recommended Tourism Locations Quick Grid from Google Travel */}
              <div className="bg-slate-900/40 light:bg-[#f4efe4]/90 p-5 rounded-3xl border border-white/10 light:border-amber-800/20 space-y-4">
                <h3 className="font-extrabold text-sm text-amber-200 light:text-[#0d2e22] flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-current" /> Top Google Travel Rated Destinations di Bogor
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOURISM_DESTINATIONS.slice(0, 4).map((dest) => (
                    <div
                      key={dest.id}
                      className="p-3 bg-slate-950/70 light:bg-white/90 border border-white/10 light:border-amber-800/20 rounded-2xl flex gap-3 items-center"
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-800 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-white light:text-[#0d2e22] truncate">
                          {dest.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 light:text-[#3b2818]/70 truncate">
                          {dest.address}
                        </p>
                        <div className="flex items-center justify-between mt-1.5">
                          <a
                            href={`https://www.google.com/travel/search?q=${encodeURIComponent(dest.name + ' Bogor')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-emerald-400 light:text-emerald-700 hover:underline font-semibold flex items-center gap-0.5"
                          >
                            <span>Google Travel</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          <button
                            onClick={() =>
                              handleAddToItinerary(
                                dest.id,
                                dest.name,
                                'Destinasi Google Travel',
                                30000
                              )
                            }
                            className="px-2 py-0.5 bg-amber-900/40 hover:bg-amber-900/60 light:bg-amber-800/20 text-amber-200 light:text-amber-900 border border-amber-600/30 rounded-lg text-[10px] font-bold"
                          >
                            + Itinerary
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search & Filter Bar (Shown when activeTab is not Google Travel) */}
          {activeTab !== 'googletravel' && (
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/40 light:bg-[#f4efe4]/90 backdrop-blur-2xl p-3.5 rounded-2xl border border-white/10 light:border-amber-800/20 shadow-xl">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 light:text-amber-900/60" />
                <input
                  type="text"
                  placeholder="Cari tempat, makanan, resto, atau area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/60 light:bg-white/90 backdrop-blur-md border border-white/10 light:border-amber-800/20 rounded-xl pl-10 pr-3 py-2 text-xs text-white light:text-[#0d2e22] placeholder-slate-400 light:placeholder-amber-900/40 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* 1. KULINER LEGENDARIS TAB */}
          {activeTab === 'kuliner' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LEGENDARY_CUISINE.filter((c) =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/40 light:bg-[#f4efe4]/90 backdrop-blur-xl border border-white/10 light:border-amber-800/20 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl transition flex flex-col justify-between"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 text-[10px] font-extrabold bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 px-2.5 py-1 rounded-full shadow border border-amber-500/30 backdrop-blur-md">
                      {item.priceRange}
                    </span>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm text-white light:text-[#0d2e22]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-300 light:text-[#3b2818] mt-1 leading-relaxed">
                        {item.overview}
                      </p>
                    </div>

                    <div className="bg-white/5 light:bg-white/80 p-3 rounded-2xl border border-white/10 light:border-amber-800/20 text-[11px] space-y-1 backdrop-blur-md">
                      <span className="font-bold text-amber-300 light:text-amber-800 block">
                        📍 Rekomendasi Warung Legendaris:
                      </span>
                      {item.recommendedSpots.map((spot, idx) => (
                        <div key={idx} className="text-slate-300 light:text-[#3b2818] flex justify-between">
                          <span className="truncate pr-1">• {spot.name}</span>
                          <span className="text-emerald-400 light:text-emerald-700 font-bold">
                            ★ {spot.rating}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleAddToItinerary(
                            item.id,
                            item.name,
                            'Kuliner Legendaris',
                            25000
                          )
                        }
                        className="flex-1 py-2.5 bg-white/10 light:bg-amber-800/10 hover:bg-white/15 light:hover:bg-amber-800/20 text-amber-300 light:text-amber-900 font-bold text-xs rounded-xl border border-white/10 light:border-amber-800/20 transition flex items-center justify-center space-x-1 shadow backdrop-blur-md"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Itinerary (Rp 25k)</span>
                      </button>

                      <a
                        href={`https://www.google.com/travel/search?q=${encodeURIComponent(item.name + ' Bogor')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-emerald-900/30 light:bg-emerald-800/15 text-emerald-300 light:text-emerald-800 rounded-xl border border-emerald-600/30 flex items-center justify-center hover:scale-105 transition"
                        title="Lihat di Google Travel"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. RESTORAN HYPE TAB */}
          {activeTab === 'restoran' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MODERN_RESTAURANTS.filter((r) =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((resto) => (
                <div
                  key={resto.id}
                  className="bg-slate-900/40 light:bg-[#f4efe4]/90 backdrop-blur-xl border border-white/10 light:border-amber-800/20 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl p-4 space-y-3 flex flex-col justify-between transition"
                >
                  <div className="flex gap-3">
                    <img
                      src={resto.image}
                      alt={resto.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-white/15 light:border-amber-800/20 bg-slate-800 flex-shrink-0 shadow"
                    />

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-300 light:text-emerald-800 bg-emerald-500/15 light:bg-emerald-800/15 px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1 backdrop-blur-md">
                          <Star className="w-3 h-3 fill-current text-emerald-400 light:text-emerald-700" /> {resto.rating} / 5
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm text-white light:text-[#0d2e22]">
                        {resto.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 light:text-[#3b2818]/70 truncate">
                        {resto.address}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 light:text-[#3b2818] leading-relaxed">
                    {resto.profile}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleAddToItinerary(
                          resto.id,
                          resto.name,
                          'Restoran Modern',
                          75000
                        )
                      }
                      className="flex-1 py-2.5 bg-white/10 light:bg-amber-800/10 hover:bg-white/15 light:hover:bg-amber-800/20 text-amber-300 light:text-amber-900 font-bold text-xs rounded-xl border border-white/10 light:border-amber-800/20 transition flex items-center justify-center space-x-1 shadow backdrop-blur-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Itinerary (Rp 75k)</span>
                    </button>

                    <a
                      href={`https://www.google.com/travel/search?q=${encodeURIComponent(resto.name + ' Bogor')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 bg-emerald-900/30 light:bg-emerald-800/15 text-emerald-300 light:text-emerald-800 rounded-xl border border-emerald-600/30 flex items-center justify-center hover:scale-105 transition"
                      title="Lihat di Google Travel"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. DESTINASI WISATA TAB */}
          {activeTab === 'wisata' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOURISM_DESTINATIONS.filter((d) =>
                d.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((dest) => (
                <div
                  key={dest.id}
                  className="bg-slate-900/40 light:bg-[#f4efe4]/90 backdrop-blur-xl border border-white/10 light:border-amber-800/20 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl p-4 space-y-3 flex flex-col justify-between transition"
                >
                  <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-slate-800">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 px-2.5 py-0.5 rounded-full shadow border border-amber-500/30 backdrop-blur-md">
                      Tiket: {dest.ticketPrice}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-white light:text-[#0d2e22]">
                      {dest.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 light:text-[#3b2818]/70 mt-0.5">
                      {dest.address} • {dest.hours}
                    </p>
                    <p className="text-xs text-slate-300 light:text-[#3b2818] mt-2 leading-relaxed">
                      {dest.overview}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleAddToItinerary(
                          dest.id,
                          dest.name,
                          'Destinasi Wisata',
                          30000
                        )
                      }
                      className="flex-1 py-2.5 bg-white/10 light:bg-amber-800/10 hover:bg-white/15 light:hover:bg-amber-800/20 text-amber-300 light:text-amber-900 font-bold text-xs rounded-xl border border-white/10 light:border-amber-800/20 transition flex items-center justify-center space-x-1 shadow backdrop-blur-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Itinerary (Rp 30k)</span>
                    </button>

                    <a
                      href={`https://www.google.com/travel/search?q=${encodeURIComponent(dest.name + ' Bogor')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 bg-emerald-900/30 light:bg-emerald-800/15 text-emerald-300 light:text-emerald-800 rounded-xl border border-emerald-600/30 flex items-center justify-center hover:scale-105 transition"
                      title="Cek di Google Travel"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. SENTRA UMKM TAB */}
          {activeTab === 'umkm' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UMKM_CENTERS.filter((u) =>
                u.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((u) => (
                <div
                  key={u.id}
                  className="bg-slate-900/40 light:bg-[#f4efe4]/90 backdrop-blur-xl border border-white/10 light:border-amber-800/20 hover:border-amber-500/40 rounded-3xl p-4 space-y-3 shadow-xl transition"
                >
                  <div className="flex gap-3">
                    <img
                      src={u.image}
                      alt={u.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-white/15 light:border-amber-800/20 bg-slate-800 flex-shrink-0 shadow"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-300 light:text-amber-800 bg-amber-900/30 light:bg-amber-800/15 px-2.5 py-0.5 rounded-full border border-amber-600/30">
                        Sentra UMKM Kota
                      </span>
                      <h3 className="font-extrabold text-sm text-white light:text-[#0d2e22] mt-1.5">
                        {u.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 light:text-[#3b2818]/70">{u.address}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 light:text-[#3b2818]">{u.overview}</p>
                </div>
              ))}
            </div>
          )}

          {/* 5. INSTANSI TAB */}
          {activeTab === 'instansi' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOVERNMENT_INSTITUTIONS.filter((ins) =>
                ins.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((ins) => (
                <div
                  key={ins.id}
                  className="bg-slate-900/40 light:bg-[#f4efe4]/90 backdrop-blur-xl border border-white/10 light:border-amber-800/20 hover:border-amber-500/40 rounded-3xl p-4 space-y-2 flex items-center gap-3 shadow-xl transition"
                >
                  <img
                    src={ins.image}
                    alt={ins.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-white/15 light:border-amber-800/20 bg-slate-800 flex-shrink-0 shadow"
                  />
                  <div>
                    <h3 className="font-extrabold text-xs text-white light:text-[#0d2e22]">
                      {ins.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 light:text-[#3b2818]/70">{ins.address}</p>
                    <p className="text-[11px] text-slate-300 light:text-[#3b2818] line-clamp-2 mt-1">
                      {ins.overview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Custom Itinerary Builder Widget */}
        <div className="bg-slate-900/40 light:bg-[#f4efe4]/90 backdrop-blur-2xl border border-white/10 light:border-amber-800/20 rounded-3xl p-5 shadow-2xl h-fit space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 light:border-amber-800/20 pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-300 light:text-amber-800" />
              <h3 className="font-extrabold text-sm text-white light:text-[#0d2e22]">
                Itinerary Perjalanan Saya
              </h3>
            </div>
            <span className="text-xs text-amber-300 light:text-amber-900 font-bold bg-amber-900/30 light:bg-amber-800/15 border border-amber-600/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
              {currentItineraryItems.length} Tempat
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 light:text-[#3b2818]/80 mb-1">
              Judul Itinerary:
            </label>
            <input
              type="text"
              value={itineraryTitle}
              onChange={(e) => setItineraryTitle(e.target.value)}
              className="w-full bg-slate-900/60 light:bg-white/90 border border-white/10 light:border-amber-800/20 rounded-2xl p-2.5 text-xs text-white light:text-[#0d2e22] focus:outline-none focus:border-amber-500 font-bold backdrop-blur-md"
            />
          </div>

          {/* Itinerary Items List */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {currentItineraryItems.length === 0 ? (
              <div className="text-center py-8 text-slate-400 light:text-[#3b2818]/70 text-xs">
                Belum ada lokasi ditambahkan. Klik tombol <span className="text-amber-300 light:text-amber-800 font-bold">+ Itinerary</span> pada pilihan kuliner / destinasi.
              </div>
            ) : (
              currentItineraryItems.map((item, idx) => (
                <div
                  key={item.placeId}
                  className="bg-white/5 light:bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 light:border-amber-800/20 flex justify-between items-center text-xs"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="text-[10px] text-amber-300 light:text-amber-800 font-bold block">
                      #{idx + 1} {item.category}
                    </span>
                    <h5 className="font-bold text-white light:text-[#0d2e22] truncate">
                      {item.placeName}
                    </h5>
                    <span className="text-emerald-400 light:text-emerald-700 text-[10px]">
                      Est. Rp {item.estCost.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemoveFromItinerary(item.placeId)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/15 rounded-xl transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Summary Calculation */}
          <div className="bg-white/5 light:bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 light:border-amber-800/20 text-xs space-y-1">
            <div className="flex justify-between text-slate-300 light:text-[#0d2e22]">
              <span>Total Estimasi Biaya (2026):</span>
              <span className="text-emerald-400 light:text-emerald-700 font-extrabold text-sm">
                Rp{' '}
                {currentItineraryItems
                  .reduce((s, i) => s + i.estCost, 0)
                  .toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <button
            onClick={handleSaveItinerary}
            className="w-full py-3 bg-gradient-to-r from-emerald-700 to-amber-700 hover:from-emerald-600 hover:to-amber-600 text-amber-100 font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 text-xs border border-amber-500/30"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simpan Itinerary ke Profil Saya</span>
          </button>
        </div>
      </div>
    </div>
  );
};

