import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Tag,
  MessageCircle,
  Instagram,
  Phone,
  Navigation,
  Star,
  Search,
  ExternalLink,
  PlusCircle,
  Eye,
  Sparkles,
  X,
  ShoppingBag,
  Filter,
  CheckCircle2,
  Coffee,
  Share2,
  Video,
} from 'lucide-react';
import { CREATORS } from '../data/bogorData';
import { BOGOR_UMKM_DATABASE } from '../data/umkmData';
import { Creator, UMKMItem } from '../types';
import { generateAnimatedSvg } from '../utils/animatedIllustration';
import { useLanguage } from '../utils/translations';

export const ModuleCreatorHub: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeView, setActiveView] = useState<'umkm' | 'creators'>('umkm');
  const [umkmSearchQuery, setUmkmSearchQuery] = useState<string>('');
  const [selectedUmkmCategory, setSelectedUmkmCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'number' | 'name'>('rating');

  // Creator state
  const [creatorsList, setCreatorsList] = useState<Creator[]>(CREATORS);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [selectedCreatorCategory, setSelectedCreatorCategory] = useState<string>('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  // New creator registration form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'ilustrasi' as Creator['category'],
    bio: '',
    address: '',
    productName: '',
    productPrice: '',
    productDesc: '',
    contactUrl: '',
    tokopedia: '',
    shopee: '',
    instagram: '',
    whatsapp: '',
  });

  // Extract unique districts from UMKM database
  const districts = ['all', ...Array.from(new Set(BOGOR_UMKM_DATABASE.map((u) => u.district))).sort()];

  // Filter & Sort UMKM
  const filteredUmkm = BOGOR_UMKM_DATABASE.filter((item) => {
    const matchesCategory =
      selectedUmkmCategory === 'all' ||
      item.generalCategory === selectedUmkmCategory ||
      (selectedUmkmCategory === 'top' && item.rating >= 4.8);

    const matchesDistrict =
      selectedDistrict === 'all' || item.district.toLowerCase() === selectedDistrict.toLowerCase();

    const q = umkmSearchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.district.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q) ||
      item.notes.toLowerCase().includes(q);

    return matchesCategory && matchesDistrict && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    if (sortBy === 'number') return a.number - b.number;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Filter Creators
  const filteredCreators = creatorsList.filter(
    (c) => selectedCreatorCategory === 'all' || c.category === selectedCreatorCategory
  );

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert(lang === 'en' ? 'Please fill in creator name and address!' : 'Mohon lengkapi nama dan alamat kreator!');
      return;
    }

    const newCreator: Creator = {
      id: `creator_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      bio: formData.bio || (lang === 'en' ? 'Local creator from Bogor.' : 'Kreator lokal Kota Bogor.'),
      avatar: generateAnimatedSvg(formData.name, 'avatar'),
      portfolio: [generateAnimatedSvg(formData.name, formData.category)],
      address: formData.address,
      products: formData.productName
        ? [
            {
              id: `p_${Date.now()}`,
              name: formData.productName,
              price: Number(formData.productPrice) || 50000,
              description: formData.productDesc || (lang === 'en' ? 'High quality local goods.' : 'Produk lokal berkualitas.'),
              contactUrl:
                formData.contactUrl ||
                formData.whatsapp ||
                formData.tokopedia ||
                formData.instagram,
            },
          ]
        : [],
      links: {
        tokopedia: formData.tokopedia,
        shopee: formData.shopee,
        instagram: formData.instagram,
        whatsapp: formData.whatsapp,
      },
      stats: { views: 10, clicks: 2 },
    };

    setCreatorsList([newCreator, ...creatorsList]);
    setIsRegisterModalOpen(false);
    alert(lang === 'en' ? 'Registration Successful! Your profile is now active on SaBo Creator Hub.' : 'Pendaftaran Kreator Berhasil! Profil kamu sudah aktif di SaBo Creator Hub.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-[#f7f4eb] light:text-[#0d2e22]">
      {/* Banner Header */}
      <div className="bg-[#071c14]/90 light:bg-[#f4efe4]/95 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-amber-900/30 light:border-amber-800/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/30 light:bg-emerald-800/15 text-emerald-300 light:text-emerald-900 border border-emerald-600/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t('zero_fee_badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-100 light:text-[#0d2e22]">
            {t('creator_banner_title')}
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/80 light:text-[#3b2818] leading-relaxed">
            {t('creator_banner_desc')}
          </p>

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveView('umkm')}
              className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs transition flex items-center space-x-2 ${
                activeView === 'umkm'
                  ? 'bg-gradient-to-r from-emerald-700 via-amber-800 to-amber-700 text-amber-100 shadow-lg shadow-amber-950/40 border border-amber-500/50'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{t('tab_umkm_db')} ({BOGOR_UMKM_DATABASE.length})</span>
            </button>

            <button
              onClick={() => setActiveView('creators')}
              className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs transition flex items-center space-x-2 ${
                activeView === 'creators'
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-950/40 border border-sky-400/50'
                  : 'bg-white/5 light:bg-amber-900/10 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('tab_creators_list')} ({creatorsList.length})</span>
            </button>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-200 light:text-emerald-900 font-bold rounded-2xl border border-emerald-500/40 transition flex items-center space-x-1.5 text-xs ml-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('btn_register_new')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: DATABASE UMKM BOGOR */}
      {activeView === 'umkm' && (
        <div className="space-y-5">
          {/* Controls: Search, Category, District, Sort */}
          <div className="bg-[#071c14]/80 light:bg-[#f4efe4]/90 backdrop-blur-xl p-4 rounded-3xl border border-amber-900/30 light:border-amber-800/20 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Search input */}
              <div className="relative md:col-span-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-amber-300/60 light:text-amber-800/60" />
                <input
                  type="text"
                  placeholder={t('search_umkm_placeholder')}
                  value={umkmSearchQuery}
                  onChange={(e) => setUmkmSearchQuery(e.target.value)}
                  className="w-full bg-[#051710] light:bg-white/90 border border-amber-900/30 light:border-amber-800/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-amber-100 light:text-[#0d2e22] placeholder-amber-200/40 light:placeholder-amber-900/40 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* District Filter */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 light:text-emerald-700 flex-shrink-0" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-[#051710] light:bg-white/90 border border-amber-900/30 light:border-amber-800/20 rounded-xl px-3 py-2.5 text-xs text-amber-100 light:text-[#0d2e22] focus:outline-none focus:border-amber-500"
                >
                  <option value="all">{t('district_all')} ({districts.length - 1} {lang === 'en' ? 'Districts' : 'Wilayah'})</option>
                  {districts
                    .filter((d) => d !== 'all')
                    .map((d) => (
                      <option key={d} value={d}>
                        {lang === 'en' ? `${d} District` : `Kec. ${d}`}
                      </option>
                    ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-400 light:text-amber-700 flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'rating' | 'reviews' | 'number' | 'name')
                  }
                  className="w-full bg-[#051710] light:bg-white/90 border border-amber-900/30 light:border-amber-800/20 rounded-xl px-3 py-2.5 text-xs text-amber-100 light:text-[#0d2e22] focus:outline-none focus:border-amber-500"
                >
                  <option value="rating">{t('sort_rating')} ⭐</option>
                  <option value="reviews">{t('sort_reviews')} 🔥</option>
                  <option value="number">{t('sort_number')}</option>
                  <option value="name">{t('sort_name')}</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none pt-1">
              <button
                onClick={() => setSelectedUmkmCategory('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                  selectedUmkmCategory === 'all'
                    ? 'bg-amber-800/50 light:bg-amber-800/20 text-amber-100 light:text-amber-900 border border-amber-500'
                    : 'bg-white/5 light:bg-amber-900/10 text-amber-200/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {t('cat_all')} ({BOGOR_UMKM_DATABASE.length})
              </button>
              <button
                onClick={() => setSelectedUmkmCategory('kopi')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedUmkmCategory === 'kopi'
                    ? 'bg-amber-900 text-amber-100 border border-amber-500'
                    : 'bg-white/5 light:bg-amber-900/10 text-amber-200/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {t('cat_coffee')}
              </button>
              <button
                onClick={() => setSelectedUmkmCategory('kuliner')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedUmkmCategory === 'kuliner'
                    ? 'bg-red-900 text-red-100 border border-red-500'
                    : 'bg-white/5 light:bg-amber-900/10 text-amber-200/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {t('cat_culinary')}
              </button>
              <button
                onClick={() => setSelectedUmkmCategory('bakery')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedUmkmCategory === 'bakery'
                    ? 'bg-amber-800 text-amber-100 border border-amber-400'
                    : 'bg-white/5 light:bg-amber-900/10 text-amber-200/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {t('cat_bakery')}
              </button>
              <button
                onClick={() => setSelectedUmkmCategory('kerajinan')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedUmkmCategory === 'kerajinan'
                    ? 'bg-purple-900 text-purple-100 border border-purple-500'
                    : 'bg-white/5 light:bg-amber-900/10 text-amber-200/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {t('cat_crafts')}
              </button>
              <button
                onClick={() => setSelectedUmkmCategory('fashion')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedUmkmCategory === 'fashion'
                    ? 'bg-pink-900 text-pink-100 border border-pink-500'
                    : 'bg-white/5 light:bg-amber-900/10 text-amber-200/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {t('cat_fashion')}
              </button>
              <button
                onClick={() => setSelectedUmkmCategory('kreatif')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedUmkmCategory === 'kreatif'
                    ? 'bg-sky-900 text-sky-100 border border-sky-500'
                    : 'bg-white/5 light:bg-amber-900/10 text-amber-200/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {t('cat_creators')}
              </button>
              <button
                onClick={() => setSelectedUmkmCategory('top')}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedUmkmCategory === 'top'
                    ? 'bg-yellow-900 text-yellow-100 border border-yellow-500'
                    : 'bg-white/5 light:bg-amber-900/10 text-amber-200/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {t('cat_top_umkm')}
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center text-xs text-amber-200/70 light:text-amber-900/70 px-1 font-medium">
            <span>
              {t('showing_umkm_label')} <strong className="text-amber-100 light:text-[#0d2e22]">{filteredUmkm.length}</strong> {lang === 'en' ? 'business places' : 'tempat usaha UMKM'}
            </span>
            {selectedDistrict !== 'all' && (
              <span>{lang === 'en' ? `Area: ${selectedDistrict}` : `Wilayah: Kec. ${selectedDistrict}`}</span>
            )}
          </div>

          {/* UMKM Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUmkm.map((umkm) => (
              <div
                key={umkm.id}
                className="bg-[#071c14]/80 light:bg-[#f4efe4]/90 backdrop-blur-xl border border-amber-900/30 light:border-amber-800/20 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex flex-col group justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-44 w-full overflow-hidden bg-[#04120c]">
                  <img
                    src={umkm.image}
                    alt={umkm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071c14] light:from-[#f4efe4] via-transparent to-black/30" />

                  {/* Badges */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
                    #{umkm.number} • {umkm.category}
                  </span>

                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-amber-500 text-amber-950 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-amber-950 text-amber-950" />
                    <span>{umkm.rating}</span>
                    <span className="text-[9px] font-semibold opacity-80">
                      ({umkm.reviewCount.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')})
                    </span>
                  </span>

                  <span className="absolute bottom-2 left-3 text-[11px] font-semibold text-emerald-300 light:text-emerald-800 bg-black/60 light:bg-white/80 px-2 py-0.5 rounded-md backdrop-blur">
                    📍 {lang === 'en' ? `${umkm.district}` : `Kec. ${umkm.district}`}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-amber-100 light:text-[#0d2e22] group-hover:text-amber-300 transition">
                      {umkm.name}
                    </h3>

                    <p className="text-xs text-amber-200/80 light:text-[#3b2818] line-clamp-2 leading-relaxed">
                      {umkm.address}
                    </p>

                    <div className="bg-[#051710]/80 light:bg-white/60 p-2.5 rounded-xl border border-amber-900/20 light:border-amber-800/10 text-[11px] text-amber-200/90 light:text-[#3b2818]">
                      <span className="font-bold text-amber-400 light:text-amber-800">{t('notes_label')}: </span>
                      {umkm.notes}
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="pt-3 border-t border-amber-900/20 light:border-amber-800/15 flex flex-wrap items-center gap-2">
                    {/* Google Maps Route */}
                    <a
                      href={umkm.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 px-3 bg-emerald-800/30 light:bg-emerald-800/15 hover:bg-emerald-800/50 text-emerald-200 light:text-emerald-900 font-bold rounded-xl border border-emerald-600/40 transition text-xs flex items-center justify-center space-x-1.5"
                      title={lang === 'en' ? 'Open Google Maps Navigation Route' : 'Buka Rute Navigasi Google Maps'}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{t('btn_route_gmaps')}</span>
                    </a>

                    {/* WhatsApp */}
                    {umkm.whatsapp && (
                      <a
                        href={umkm.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-xs flex items-center justify-center space-x-1 shadow"
                        title={t('btn_wa_owner')}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    )}

                    {/* Instagram */}
                    {umkm.instagram && (
                      <a
                        href={umkm.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl transition text-xs flex items-center justify-center shadow"
                        title={t('btn_ig_profile')}
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* TikTok */}
                    {umkm.tiktok && !umkm.instagram && (
                      <a
                        href={umkm.tiktok}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition text-xs flex items-center justify-center shadow"
                        title="TikTok"
                      >
                        <Video className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Phone */}
                    {umkm.phone && !umkm.whatsapp && (
                      <a
                        href={`tel:${umkm.phone}`}
                        className="py-2 px-3 bg-amber-800/40 hover:bg-amber-800/60 text-amber-200 font-bold rounded-xl border border-amber-600/30 transition text-xs flex items-center justify-center"
                        title={t('btn_call_phone')}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: CREATOR & KOMUNITAS SHOWCASE */}
      {activeView === 'creators' && (
        <div className="space-y-6">
          {/* Creator Category Filter */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex space-x-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedCreatorCategory('all')}
                className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
                  selectedCreatorCategory === 'all'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white/5 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                {lang === 'en' ? 'All Creators' : 'Semua Kreator'}
              </button>
              <button
                onClick={() => setSelectedCreatorCategory('komunitas')}
                className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
                  selectedCreatorCategory === 'komunitas'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white/5 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                👥 {lang === 'en' ? 'Communities' : 'Komunitas'}
              </button>
              <button
                onClick={() => setSelectedCreatorCategory('ilustrasi')}
                className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
                  selectedCreatorCategory === 'ilustrasi'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white/5 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                🎨 {lang === 'en' ? 'Illustration & Art' : 'Ilustrasi & Seni'}
              </button>
              <button
                onClick={() => setSelectedCreatorCategory('kriya')}
                className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
                  selectedCreatorCategory === 'kriya'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white/5 text-amber-100/80 light:text-[#0d2e22] hover:bg-white/10 border border-white/10'
                }`}
              >
                🧵 {lang === 'en' ? 'Crafts & Batik' : 'Kriya & Batik'}
              </button>
            </div>

            <span className="text-xs text-amber-200/70 light:text-amber-900/70 font-medium">
              {lang === 'en' ? `Showing ${filteredCreators.length} Creators & Communities` : `Menampilkan ${filteredCreators.length} Kreator & Komunitas`}
            </span>
          </div>

          {/* Creator Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCreators.map((creator) => (
              <div
                key={creator.id}
                className="bg-[#071c14]/80 light:bg-[#f4efe4]/90 backdrop-blur-xl border border-amber-900/30 light:border-amber-800/20 hover:border-sky-400/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex flex-col group justify-between"
              >
                {/* Cover Illustration */}
                <div className="relative h-44 w-full overflow-hidden bg-[#04120c]">
                  <img
                    src={creator.portfolio[0] || generateAnimatedSvg(creator.name, creator.category)}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071c14] light:from-[#f4efe4] via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-sky-300 px-2.5 py-1 rounded-full border border-sky-400/30">
                    {creator.category}
                  </span>

                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30 backdrop-blur-md">
                    Zero Fee
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-2xl bg-slate-800 border border-sky-400/40 object-cover flex-shrink-0 shadow"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-sm text-amber-100 light:text-[#0d2e22] truncate group-hover:text-sky-300 transition">
                          {creator.name}
                        </h3>
                        <p className="text-[11px] text-amber-200/70 light:text-[#3b2818] truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sky-400" />
                          <span>{creator.address}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-amber-200/80 light:text-[#3b2818] line-clamp-2 leading-relaxed">
                      {creator.bio}
                    </p>
                  </div>

                  {/* Product preview */}
                  {creator.products.length > 0 && (
                    <div className="bg-white/5 light:bg-white/60 p-3 rounded-2xl border border-white/10 light:border-amber-800/10 space-y-2 backdrop-blur-md">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 light:text-sky-800 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {lang === 'en' ? 'Featured Product:' : 'Produk Unggulan:'}
                      </span>
                      {creator.products.slice(0, 1).map((prod) => (
                        <div
                          key={prod.id}
                          className="flex justify-between items-center text-xs"
                        >
                          <span className="text-amber-100 light:text-[#0d2e22] truncate pr-2 font-medium">
                            {prod.name}
                          </span>
                          <span className="text-emerald-400 light:text-emerald-700 font-extrabold whitespace-nowrap">
                            Rp {prod.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-amber-900/20 light:border-amber-800/15 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCreator(creator)}
                      className="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-xl transition text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-sky-500/20"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t('view_portfolio_btn')}</span>
                    </button>

                    {creator.links.whatsapp && (
                      <a
                        href={creator.links.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-xs flex items-center justify-center shadow"
                        title={t('btn_wa_owner')}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Creator Detail Pop-Up Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl overflow-y-auto">
          <div className="bg-[#071c14]/95 light:bg-[#f8f5ed] backdrop-blur-2xl border border-amber-700/40 light:border-amber-800/30 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col text-amber-100 light:text-[#0d2e22] my-auto">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-[#0a271c] via-[#071c14] to-[#0d2e22] light:from-[#eee8da] light:to-[#f4efe4] border-b border-amber-900/30 flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedCreator.avatar}
                  alt={selectedCreator.name}
                  className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-sky-400 object-cover shadow"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 light:text-sky-800 px-2 py-0.5 rounded-full border border-sky-400/30">
                    {selectedCreator.category}
                  </span>
                  <h3 className="font-extrabold text-lg text-amber-100 light:text-[#0d2e22] mt-1">
                    {selectedCreator.name}
                  </h3>
                  <p className="text-xs text-amber-200/70 light:text-[#3b2818]">
                    {selectedCreator.address}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCreator(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-amber-200 light:text-[#0d2e22] border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase text-sky-400 light:text-sky-800 mb-1">
                  {t('creator_modal_bio')}
                </h4>
                <p className="text-xs sm:text-sm text-amber-200/90 light:text-[#3b2818] leading-relaxed">
                  {selectedCreator.bio}
                </p>
              </div>

              {/* Portfolio Gallery */}
              {selectedCreator.portfolio.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-sky-400 light:text-sky-800 mb-2">
                    {t('creator_modal_gallery')}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCreator.portfolio.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Portfolio ${idx}`}
                        className="w-full h-32 object-cover rounded-2xl border border-amber-900/30 bg-[#04120c]"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Products Catalog */}
              {selectedCreator.products.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-sky-400 light:text-sky-800 mb-2 flex items-center gap-1">
                    <Store className="w-4 h-4" /> {t('creator_modal_products')}
                  </h4>
                  <div className="space-y-2">
                    {selectedCreator.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white/5 light:bg-white/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 light:border-amber-800/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <h5 className="font-bold text-xs text-amber-100 light:text-[#0d2e22]">
                            {prod.name}
                          </h5>
                          <p className="text-[11px] text-amber-200/70 light:text-[#3b2818]">
                            {prod.description}
                          </p>
                          <span className="inline-block text-emerald-400 light:text-emerald-700 font-extrabold text-sm">
                            Rp {prod.price.toLocaleString('id-ID')}
                          </span>
                        </div>

                        <a
                          href={prod.contactUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition whitespace-nowrap flex items-center space-x-1 shadow"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? 'Direct Order' : 'Pesan Langsung'}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Links */}
              <div>
                <h4 className="text-xs font-bold uppercase text-sky-400 light:text-sky-800 mb-2">
                  {t('creator_modal_marketplace')} (Zero Fee)
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedCreator.links.whatsapp && (
                    <a
                      href={selectedCreator.links.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl border border-emerald-400/40 flex items-center space-x-1.5 transition shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('btn_wa_owner')}</span>
                    </a>
                  )}

                  {selectedCreator.links.instagram && (
                    <a
                      href={selectedCreator.links.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-pink-700 hover:bg-pink-600 text-white font-bold rounded-xl border border-pink-500/40 flex items-center space-x-1.5 transition shadow"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>{t('btn_ig_profile')}</span>
                    </a>
                  )}

                  {selectedCreator.links.tokopedia && (
                    <a
                      href={selectedCreator.links.tokopedia}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl border border-emerald-600/40 flex items-center space-x-1.5 transition shadow"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Tokopedia</span>
                    </a>
                  )}

                  {selectedCreator.links.shopee && (
                    <a
                      href={selectedCreator.links.shopee}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-orange-700 hover:bg-orange-600 text-white font-bold rounded-xl border border-orange-500/40 flex items-center space-x-1.5 transition shadow"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shopee</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creator Registration Modal Form */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl overflow-y-auto">
          <div className="bg-[#071c14]/95 light:bg-[#f8f5ed] backdrop-blur-2xl border border-amber-700/40 light:border-amber-800/30 w-full max-w-lg rounded-3xl shadow-2xl p-6 text-amber-100 light:text-[#0d2e22] my-auto space-y-4">
            <div className="flex justify-between items-center border-b border-amber-900/30 pb-3">
              <h3 className="font-extrabold text-base text-amber-100 light:text-[#0d2e22] flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                {t('reg_form_title')}
              </h3>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-amber-200/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-amber-200/90 light:text-[#3b2818] font-semibold mb-1">
                  {t('reg_name_label')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'en' ? 'e.g. Pakuan Coffee Shop / Pajajaran Art Studio' : 'Contoh: Kedai Kopi Pakuan / Sanggar Seni Pajajaran'}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#051710] light:bg-white border border-amber-900/30 light:border-amber-800/20 rounded-xl p-2.5 text-amber-100 light:text-[#0d2e22] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-200/90 light:text-[#3b2818] font-semibold mb-1">
                    {t('reg_category_label')} *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as Creator['category'],
                      })
                    }
                    className="w-full bg-[#051710] light:bg-white border border-amber-900/30 light:border-amber-800/20 rounded-xl p-2.5 text-amber-100 light:text-[#0d2e22] focus:outline-none focus:border-amber-500"
                  >
                    <option value="ilustrasi">{lang === 'en' ? 'Illustration & Art' : 'Ilustrasi & Seni'}</option>
                    <option value="kriya">{lang === 'en' ? 'Crafts & Batik' : 'Kriya & Batik'}</option>
                    <option value="desain">{lang === 'en' ? 'Graphic Design' : 'Desain Grafis'}</option>
                    <option value="komunitas">{lang === 'en' ? 'Community' : 'Komunitas'}</option>
                    <option value="fotografi">{lang === 'en' ? 'Photography & Video' : 'Fotografi & Video'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-amber-200/90 light:text-[#3b2818] font-semibold mb-1">
                    {t('reg_address_label')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'e.g. Jl. Pajajaran No. 12, East Bogor' : 'Contoh: Jl. Pajajaran No. 12, Bogor Timur'}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full bg-[#051710] light:bg-white border border-amber-900/30 light:border-amber-800/20 rounded-xl p-2.5 text-amber-100 light:text-[#0d2e22] focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-200/90 light:text-[#3b2818] font-semibold mb-1">
                  {t('reg_notes_label')}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'en' ? 'Tell us about your products, artworks, or specialties...' : 'Ceritakan tentang produk, karya, atau keunggulan usahamu...'}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full bg-[#051710] light:bg-white border border-amber-900/30 light:border-amber-800/20 rounded-xl p-2.5 text-amber-100 light:text-[#0d2e22] focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Product item details */}
              <div className="bg-white/5 light:bg-white/60 p-3 rounded-2xl border border-amber-900/20 light:border-amber-800/20 space-y-2">
                <span className="font-bold text-amber-300 light:text-amber-800 block">
                  🛍️ {lang === 'en' ? 'Add Featured Product / Service' : 'Tambahkan Produk / Layanan Utama'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder={lang === 'en' ? 'Product Name' : 'Nama Produk'}
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    className="bg-[#051710] light:bg-white border border-amber-900/30 rounded-xl p-2 text-amber-100 light:text-[#0d2e22]"
                  />
                  <input
                    type="number"
                    placeholder={lang === 'en' ? 'Price (Rp)' : 'Harga (Rp)'}
                    value={formData.productPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, productPrice: e.target.value })
                    }
                    className="bg-[#051710] light:bg-white border border-amber-900/30 rounded-xl p-2 text-amber-100 light:text-[#0d2e22]"
                  />
                </div>
                <input
                  type="text"
                  placeholder={lang === 'en' ? 'Short product description' : 'Deskripsi singkat produk'}
                  value={formData.productDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, productDesc: e.target.value })
                  }
                  className="w-full bg-[#051710] light:bg-white border border-amber-900/30 rounded-xl p-2 text-amber-100 light:text-[#0d2e22]"
                />
              </div>

              {/* Links */}
              <div className="space-y-2">
                <label className="block text-amber-200/90 light:text-[#3b2818] font-semibold">
                  {lang === 'en' ? 'Contact / Social Media Links' : 'Tautan Kontak / Media Sosial'}
                </label>
                <input
                  type="url"
                  placeholder="Link WhatsApp (https://wa.me/62812...)"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  className="w-full bg-[#051710] light:bg-white border border-amber-900/30 rounded-xl p-2 text-amber-100 light:text-[#0d2e22]"
                />
                <input
                  type="url"
                  placeholder="Link Instagram (https://instagram.com/...)"
                  value={formData.instagram}
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                  className="w-full bg-[#051710] light:bg-white border border-amber-900/30 rounded-xl p-2 text-amber-100 light:text-[#0d2e22]"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-amber-200 light:text-[#0d2e22] font-semibold rounded-xl border border-white/10"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-700 via-amber-800 to-amber-700 text-amber-100 font-extrabold rounded-xl shadow-lg"
                >
                  {t('reg_submit_btn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
