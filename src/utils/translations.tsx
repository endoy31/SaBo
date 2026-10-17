import React, { createContext, useContext, useState, useEffect } from 'react';
import { HeritageLocation, HistoricalFigure, TriviaQuestion } from '../types';

export type Language = 'id' | 'en';

interface TranslationDictionary {
  [key: string]: {
    id: string;
    en: string;
  };
}

export const UI_TRANSLATIONS: TranslationDictionary = {
  // Navigation & Header
  app_tagline: {
    id: 'Eksplorasi Heritage & Gamifikasi Kota Bogor',
    en: 'Bogor City Heritage Exploration & Gamification',
  },
  theme_light: {
    id: 'Terang',
    en: 'Light',
  },
  theme_dark: {
    id: 'Gelap',
    en: 'Dark',
  },
  gps_active: {
    id: 'GPS Aktif',
    en: 'GPS Active',
  },
  gps_off: {
    id: 'GPS Mati',
    en: 'GPS Off',
  },
  mode_offline: {
    id: 'Mode Luring',
    en: 'Offline Mode',
  },
  mode_online: {
    id: 'Mode Daring',
    en: 'Online Mode',
  },
  nav_map: {
    id: 'Peta Interaktif & Quest',
    en: 'Interactive Map & Quests',
  },
  nav_challenges: {
    id: 'Tantangan Harian',
    en: 'Daily Challenges',
  },
  nav_creators: {
    id: 'Creator Hub & Direct Link',
    en: 'Creator & UMKM Hub',
  },
  nav_heritage: {
    id: 'Deep Heritage & Video Arsip',
    en: 'Heritage Archives & Audio',
  },
  nav_planner: {
    id: 'Tourism Planner & Kuliner',
    en: 'Tourism Planner & Culinary',
  },
  nav_community: {
    id: 'Ulasan Komunitas',
    en: 'Community Reviews',
  },
  nav_profile: {
    id: 'Profil Saya',
    en: 'My Profile',
  },
  lang_label: {
    id: 'Bahasa',
    en: 'Language',
  },

  // Map & Explorer
  map_title: {
    id: 'Peta Gamifikasi & Lokasi UMKM Bogor',
    en: 'Gamified Map & Bogor UMKM Explorer',
  },
  map_subtitle: {
    id: 'Jelajahi 64+ titik UMKM, cagar budaya, dan kreator lokal dengan navigasi rute dan quest interaktif.',
    en: 'Explore 64+ local businesses, heritage landmarks, and creators with live route navigation and trivia quests.',
  },
  search_map_placeholder: {
    id: 'Cari tempat, kedai kopi, kuliner, batik, museum...',
    en: 'Search places, cafes, culinary, batik, museums...',
  },
  cat_all: {
    id: 'Semua Titik',
    en: 'All Points',
  },
  cat_coffee: {
    id: '☕ Kopi & Kafe',
    en: '☕ Coffee & Cafes',
  },
  cat_culinary: {
    id: '🍲 Kuliner & Bakso',
    en: '🍲 Culinary & Food',
  },
  cat_bakery: {
    id: '🥖 Bakery & Roti',
    en: '🥖 Bakery & Pastry',
  },
  cat_history: {
    id: '🏛️ Cagar Budaya',
    en: '🏛️ Heritage Sites',
  },
  cat_crafts: {
    id: '🧵 Kriya & Batik',
    en: '🧵 Crafts & Batik',
  },
  cat_fashion: {
    id: '👗 Fashion & Gaya',
    en: '👗 Fashion & Style',
  },
  cat_creators: {
    id: '✨ Kreator Hub',
    en: '✨ Creator Hub',
  },
  cat_top_umkm: {
    id: '⭐ Rating 4.8+',
    en: '⭐ Top Rated 4.8+',
  },
  thematic_maps_title: {
    id: 'Peta Tematik Kota Bogor',
    en: 'Bogor Thematic Maps',
  },
  thematic_mode_label: {
    id: 'Mode Peta Tematik',
    en: 'Thematic Map Layers',
  },
  thematic_all: {
    id: 'Semua Layer',
    en: 'All Layers',
  },
  thematic_history: {
    id: 'Wisata Sejarah',
    en: 'Historical Heritage',
  },
  thematic_history_desc: {
    id: 'Cagar budaya, istana, museum, dan situs era Pajajaran & Kolonial',
    en: 'Heritage sites, palaces, museums, and colonial-era landmarks',
  },
  thematic_culinary: {
    id: 'Kuliner Legendaris',
    en: 'Legendary Culinary',
  },
  thematic_culinary_desc: {
    id: 'Cita rasa autentik turun-temurun, kuliner Suryakencana & jajanan khas',
    en: 'Generational iconic recipes, Suryakencana food corridor & legendary dishes',
  },
  thematic_creative: {
    id: 'Ruang Kreatif',
    en: 'Creative Hubs',
  },
  thematic_creative_desc: {
    id: 'Studio kriya & batik, galeri seni rupa, desainer lokal, dan maker space',
    en: 'Art studios, craft & batik workshops, local designers & creative spaces',
  },
  thematic_botany: {
    id: 'Taman & Botani',
    en: 'Botany & Parks',
  },
  thematic_route_toggle: {
    id: 'Rute Jalur Tematik',
    en: 'Thematic Trail Route',
  },
  thematic_layer_selector: {
    id: 'Pilihan Layer Tematik',
    en: 'Thematic Layer Selector',
  },
  btn_open_3d_bogor: {
    id: '🏙️ 3D Kota Bogor',
    en: '🏙️ 3D Bogor City',
  },
  bogor_3d_title: {
    id: 'Diorama 3D Kota Bogor',
    en: 'Kota Bogor 3D Experience',
  },
  bogor_3d_subtitle: {
    id: 'Ikon Monumen Kujang, Istana Buitenzorg & Panorama Gunung Salak',
    en: 'Iconic Kujang Monument, Buitenzorg Palace & Mount Salak Vista',
  },
  btn_enter_sabo: {
    id: '🚀 Masuk ke Aplikasi SaBo',
    en: '🚀 Enter SaBo Application',
  },
  btn_skip_intro: {
    id: 'Langsung Masuk',
    en: 'Direct Skip',
  },
  cam_monumen_kujang: {
    id: 'Monumen Kujang',
    en: 'Kujang Monument',
  },
  cam_lawang_salapan: {
    id: 'Lawang Salapan (9 Pintu)',
    en: 'Lawang Salapan (9 Arches)',
  },
  cam_istana_bogor: {
    id: 'Istana & Rusa Tutul',
    en: 'Palace & Deer Herd',
  },
  cam_kebun_raya: {
    id: 'Kebun Raya & Kenari Purba',
    en: 'Botanical Canopy',
  },
  cam_ciliwung: {
    id: 'Sungai Ciliwung & Jembatan',
    en: 'Ciliwung River & Bridge',
  },
  cam_skyline_salak: {
    id: 'Panorama Gunung Salak',
    en: 'Mount Salak Skyline',
  },
  cam_free_orbit: {
    id: 'Orbit 360° Bebas',
    en: 'Free Orbit 360°',
  },
  time_day: {
    id: 'Siang Tropis',
    en: 'Tropical Day',
  },
  time_morning: {
    id: 'Pagi Berkabut',
    en: 'Misty Morning',
  },
  time_sunset: {
    id: 'Senja Emas Baranangsiang',
    en: 'Golden Sunset',
  },
  time_night: {
    id: 'Malam Kota Pusaka',
    en: 'Starlit Heritage Night',
  },
  weather_rain: {
    id: 'Hujan Rintik Khas Bogor',
    en: 'Signature Bogor Drizzle',
  },
  weather_mist: {
    id: 'Kabut Lembah Salak',
    en: 'Salak Mountain Mist',
  },
  audio_ambience: {
    id: 'Suara Alam Bogor (Hujan & Burung)',
    en: 'Bogor Nature Ambience',
  },
  btn_angkot_horn: {
    id: 'Klakson Angkot Hijau',
    en: 'Angkot Horn',
  },
  // Daily Heritage Challenges
  daily_challenge_title: {
    id: 'Tantangan Warisan Harian',
    en: 'Daily Heritage Challenges',
  },
  daily_challenge_subtitle: {
    id: 'Dapatkan misi harian untuk mengunjungi 1 lokasi cagar budaya acak dari database SaBo demi bonus XP melimpah!',
    en: 'Get a daily mission to visit 1 random heritage location from our database every day for bonus XP!',
  },
  daily_today_mission: {
    id: 'Misi Heritage Hari Ini',
    en: "Today's Heritage Mission",
  },
  daily_streak_label: {
    id: 'Streak Berturut-turut',
    en: 'Consecutive Streak',
  },
  daily_time_left: {
    id: 'Sisa Waktu Hari Ini',
    en: 'Time Remaining Today',
  },
  daily_bonus_xp: {
    id: 'Bonus XP Harian',
    en: 'Daily Bonus XP',
  },
  daily_task_visit: {
    id: 'Kunjungi & Check-In Lokasi',
    en: 'Visit & Check-In Location',
  },
  daily_task_audio: {
    id: 'Dengarkan Ulasan Narasi Audio',
    en: 'Listen to Audio Narration',
  },
  daily_task_trivia: {
    id: 'Selesaikan Kuis Trivia Heritage',
    en: 'Complete Heritage Trivia Quiz',
  },
  daily_btn_checkin: {
    id: 'Check-In Sekarang',
    en: 'Check-In Now',
  },
  daily_btn_checked_in: {
    id: 'Sudah Check-In',
    en: 'Checked In',
  },
  daily_btn_claim: {
    id: 'Klaim Bonus XP Harian!',
    en: 'Claim Daily Bonus XP!',
  },
  daily_claimed: {
    id: 'Tantangan Selesai & XP Telah Diklaim!',
    en: 'Challenge Completed & XP Claimed!',
  },
  daily_reroll: {
    id: 'Acak Lokasi Lain',
    en: 'Roll Another Location',
  },
  daily_notif_banner_title: {
    id: 'Tantangan Warisan Hari Ini Siap!',
    en: "Today's Heritage Challenge is Ready!",
  },
  daily_notif_banner_desc: {
    id: 'Kunjungi satu lokasi terpilih hari ini untuk meraih bonus XP dan mempertahankan streak-mu!',
    en: 'Visit a selected location today to earn bonus XP and keep your daily streak alive!',
  },
  daily_btn_view_challenge: {
    id: 'Lihat Tantangan',
    en: 'View Challenge',
  },
  sim_gps_label: {
    id: 'Simulasi Lokasi GPS Pengguna',
    en: 'Simulate User GPS Location',
  },
  btn_my_location: {
    id: 'Lokasi Saya',
    en: 'My Location',
  },
  btn_route_gmaps: {
    id: 'Rute Nyata Google Maps',
    en: 'Real Google Maps Route',
  },
  btn_start_quest: {
    id: 'Mulai Quest Trivia & Audio (+XP)',
    en: 'Start Trivia Quest & Audio (+XP)',
  },
  btn_repeat_quest: {
    id: 'Ulangi Quest Trivia (+XP)',
    en: 'Repeat Trivia Quest (+XP)',
  },
  btn_quest_cleared: {
    id: 'Quest Terselesaikan',
    en: 'Quest Completed',
  },
  btn_wa_owner: {
    id: 'WhatsApp Pemilik',
    en: 'WhatsApp Owner',
  },
  btn_ig_profile: {
    id: 'Instagram Resmi',
    en: 'Official Instagram',
  },
  btn_call_phone: {
    id: 'Hubungi Telepon',
    en: 'Call Phone',
  },
  zero_fee_badge: {
    id: 'Zero Platform Fee • Dukung UMKM Lokal Langsung',
    en: 'Zero Platform Fee • Direct Local Business Support',
  },
  hours_label: {
    id: 'Jam Buka',
    en: 'Hours',
  },
  price_label: {
    id: 'Kisaran Harga',
    en: 'Price Range',
  },
  address_label: {
    id: 'Alamat',
    en: 'Address',
  },
  notes_label: {
    id: 'Catatan Keunggulan',
    en: 'Highlights & Notes',
  },
  facts_label: {
    id: 'Fakta Unik & Sejarah',
    en: 'Unique Historical Facts',
  },
  reviews_word: {
    id: 'ulasan',
    en: 'reviews',
  },

  // Creator & UMKM Hub
  creator_banner_tag: {
    id: 'Kreator Lokal & Direktori 64 UMKM Bogor',
    en: 'Local Creators & 64 Bogor UMKM Directory',
  },
  creator_banner_title: {
    id: 'Pusat Kolaborasi Kreator & UMKM Bogor',
    en: 'Bogor Local Creator & Business Hub',
  },
  creator_banner_desc: {
    id: 'Katalog terkurasi 64 UMKM Kota & Kabupaten Bogor dengan fitur Direct Link tanpa potongan biaya (Zero Platform Fee), menghubungkan wisatawan langsung ke pengrajin, kafe, dan seniman lokal.',
    en: 'Curated directory of 64 Bogor businesses and local artists with zero platform fee direct links, connecting tourists directly to artisans, cafes, and creative masters.',
  },
  tab_umkm_db: {
    id: 'Direktori 64 UMKM Bogor',
    en: '64 Bogor UMKM Directory',
  },
  tab_creators_list: {
    id: 'Showcase Seniman & Kreator',
    en: 'Artists & Creators Showcase',
  },
  btn_register_new: {
    id: 'Daftarkan Usaha / Karyamu',
    en: 'Register Your Business / Art',
  },
  search_umkm_placeholder: {
    id: 'Cari nama UMKM, produk unggulan, atau kata kunci...',
    en: 'Search business name, specialties, or keywords...',
  },
  district_all: {
    id: 'Semua Wilayah / Kecamatan',
    en: 'All Districts / Areas',
  },
  sort_rating: {
    id: 'Rating Tertinggi',
    en: 'Highest Rating',
  },
  sort_reviews: {
    id: 'Ulasan Terbanyak',
    en: 'Most Reviews',
  },
  sort_number: {
    id: 'Nomor Urut (#1 - #64)',
    en: 'Directory Order (#1 - #64)',
  },
  sort_name: {
    id: 'Nama (A - Z)',
    en: 'Name (A - Z)',
  },
  showing_umkm_label: {
    id: 'Menampilkan',
    en: 'Showing',
  },
  view_portfolio_btn: {
    id: 'Lihat Portofolio & Produk',
    en: 'View Portfolio & Products',
  },
  creator_modal_bio: {
    id: 'Biografi & Profil Kreator',
    en: 'Creator Biography & Profile',
  },
  creator_modal_gallery: {
    id: 'Galeri Karya Seni & Portofolio',
    en: 'Art Gallery & Portfolio',
  },
  creator_modal_products: {
    id: 'Produk & Karya Resmi (Direct Contact)',
    en: 'Official Products (Direct Contact)',
  },
  creator_modal_marketplace: {
    id: 'Toko Resmi & Media Sosial',
    en: 'Official Stores & Social Media',
  },
  reg_form_title: {
    id: 'Pendaftaran Komunitas Kreator & UMKM SaBo',
    en: 'SaBo Creator & UMKM Community Registration',
  },
  reg_form_desc: {
    id: 'Daftarkan usaha, brand kuliner, kriya, atau portofolio seni kamu ke dalam peta interaktif & direktori SaBo secara gratis tanpa biaya komisi!',
    en: 'Register your business, culinary brand, crafts, or art portfolio into the SaBo interactive map and directory for free with zero commission fees!',
  },
  reg_name_label: {
    id: 'Nama Usaha / Nama Seniman',
    en: 'Business / Artist Name',
  },
  reg_category_label: {
    id: 'Kategori Utama',
    en: 'Primary Category',
  },
  reg_address_label: {
    id: 'Alamat Lengkap & Wilayah/Kecamatan',
    en: 'Full Address & District/Area',
  },
  reg_notes_label: {
    id: 'Deskripsi Keunggulan & Produk Andalan',
    en: 'Highlights & Signature Products',
  },
  reg_wa_label: {
    id: 'Nomor WhatsApp Aktif',
    en: 'Active WhatsApp Number',
  },
  reg_submit_btn: {
    id: 'Kirim Pendaftaran Gratis',
    en: 'Submit Free Registration',
  },
  reg_success_msg: {
    id: 'Selamat! Pendaftaran usaha/karya kamu berhasil dikirim dan akan diverifikasi ke dalam direktori SaBo.',
    en: 'Congratulations! Your registration has been submitted and will be verified for the SaBo directory.',
  },

  // Heritage Center
  heritage_banner_tag: {
    id: 'Deep Heritage Learning Center • Google Arts & Culture',
    en: 'Deep Heritage Learning Center • Google Arts & Culture',
  },
  heritage_banner_title: {
    id: 'Arsip & Narasi Sejarah Kota Bogor',
    en: 'Bogor Heritage Archives & Historical Narratives',
  },
  heritage_banner_desc: {
    id: 'Eksplorasi dokumen sejarah autentik, koleksi video dokumenter Dinas Arsip Kota Bogor (@bogortempodulu), dan profil para tokoh pahlawan bangsa yang membentuk identitas Kota Hujan.',
    en: 'Explore authentic historical records, vintage documentary archives (@bogortempodulu), and profiles of historical leaders who shaped the City of Rain.',
  },
  sec_essay: {
    id: 'Sejarah Lengkap Bogor',
    en: 'Complete History of Bogor',
  },
  sec_videos: {
    id: 'Video Arsip Bogor Tempo Dulu',
    en: 'Vintage Video Archives',
  },
  sec_figures: {
    id: 'Profil Tokoh Sejarah',
    en: 'Historical Figures',
  },
  audio_listen_narration: {
    id: 'Dengarkan Narasi Audio (TTS)',
    en: 'Listen to Audio Guide (TTS)',
  },
  audio_stop_narration: {
    id: 'Hentikan Narasi Audio',
    en: 'Stop Audio Guide',
  },
  search_figures_placeholder: {
    id: 'Cari tokoh sejarah, peran, atau era masa lalu...',
    en: 'Search historical figures, roles, or past eras...',
  },
  btn_watch_video: {
    id: 'Tonton Video',
    en: 'Watch Video',
  },
  btn_open_arts_culture: {
    id: 'Koleksi Google Arts & Culture',
    en: 'Google Arts & Culture Collection',
  },

  // Tourism Planner
  planner_banner_tag: {
    id: 'Perencana Wisata & Rekomendasi Kuliner Bogor',
    en: 'Bogor Tourism Planner & Culinary Guide',
  },
  planner_banner_title: {
    id: 'Rencanakan Liburan & Wisata Kuliner Bogor',
    en: 'Plan Your Bogor Vacation & Culinary Tour',
  },
  planner_banner_desc: {
    id: 'Buat jadwal perjalanan mandiri (itinerary), hitung estimasi biaya, telusuri kuliner legendaris dan restoran modern, serta jelajahi hotel & penerbangan via Google Travel.',
    en: 'Create custom itineraries, estimate travel budgets, discover legendary dishes & modern dining, and explore hotels & flights via Google Travel.',
  },
  tab_gtravel: {
    id: 'Google Travel & Hotel',
    en: 'Google Travel & Hotels',
  },
  tab_legend_food: {
    id: 'Kuliner Legendaris',
    en: 'Legendary Culinary',
  },
  tab_modern_dining: {
    id: 'Restoran Modern',
    en: 'Modern Dining',
  },
  tab_destinations: {
    id: 'Destinasi Wisata',
    en: 'Tourist Attractions',
  },
  tab_gov_institutions: {
    id: 'Instansi Pemerintahan',
    en: 'Heritage Institutions',
  },
  tab_umkm_hubs: {
    id: 'Sentra UMKM',
    en: 'UMKM Centers',
  },
  itinerary_builder_title: {
    id: 'Susun Rencana Perjalanan (Itinerary)',
    en: 'Build Your Custom Travel Itinerary',
  },
  itinerary_title_placeholder: {
    id: 'Nama Itinerary (contoh: Wisata Akhir Pekan)',
    en: 'Itinerary Name (e.g. Weekend Heritage Tour)',
  },
  btn_add_to_itinerary: {
    id: '+ Tambah ke Itinerary',
    en: '+ Add to Itinerary',
  },
  btn_save_itinerary: {
    id: 'Simpan Itinerary Saya',
    en: 'Save My Itinerary',
  },
  total_est_budget: {
    id: 'Total Estimasi Anggaran',
    en: 'Total Estimated Budget',
  },
  empty_itinerary_msg: {
    id: 'Belum ada destinasi yang ditambahkan. Klik tombol "+ Tambah ke Itinerary" pada kartu di bawah.',
    en: 'No destinations added yet. Click "+ Add to Itinerary" on any card below.',
  },
  saved_itineraries_heading: {
    id: 'Itinerary Tersimpan',
    en: 'Saved Itineraries',
  },
  gtravel_embed_heading: {
    id: 'Eksplorasi Resmi Google Travel Bogor',
    en: 'Official Google Travel Bogor Exploration',
  },
  gtravel_embed_desc: {
    id: 'Cari perbandingan harga hotel terbaik, jadwal penerbangan, dan ulasan langsung dari Google Travel.',
    en: 'Search the best hotel prices, flight routes, and direct traveler insights from Google Travel.',
  },
  gtravel_open_new_tab: {
    id: 'Buka Google Travel Bogor di Tab Baru',
    en: 'Open Google Travel Bogor in New Tab',
  },

  // Community Reviews
  comm_banner_tag: {
    id: 'Ulasan Komunitas & Forum Pengalaman',
    en: 'Community Reviews & Experience Forum',
  },
  comm_banner_title: {
    id: 'Ulasan Komunitas Wisata Bogor',
    en: 'Bogor Tourism Community Reviews',
  },
  comm_banner_desc: {
    id: 'Bagikan cerita seru, tips kuliner, foto kenangan, dan ulasan jujur kamu tentang situs heritage dan destinasi wisata Kota Bogor kepada sesama penjelajah.',
    en: 'Share your travel stories, food tips, memories, and honest reviews about heritage sites and attractions in Bogor with fellow explorers.',
  },
  write_review_heading: {
    id: 'Tulis Ulasan Wisata Kamu',
    en: 'Write Your Travel Review',
  },
  select_place_label: {
    id: 'Pilih Destinasi / Tempat',
    en: 'Select Destination / Place',
  },
  rating_score_label: {
    id: 'Rating Pengalaman',
    en: 'Experience Rating',
  },
  review_input_placeholder: {
    id: 'Ceritakan pengalaman seru, tips berwisata, suasana tempat, atau keunikan kuliner yang kamu temui...',
    en: 'Describe your experience, travel tips, atmosphere, or unique culinary highlights you enjoyed...',
  },
  btn_submit_review: {
    id: 'Kirim Ulasan Komunitas',
    en: 'Submit Community Review',
  },
  filter_reviews_all: {
    id: 'Semua Destinasi',
    en: 'All Destinations',
  },
  btn_like_review: {
    id: 'Bermanfaat',
    en: 'Helpful',
  },

  // Quest Modal
  quest_modal_title: {
    id: 'Quest Trivia & Edukasi Warisan',
    en: 'Heritage Trivia Quest & Audio Guide',
  },
  quest_btn_audio: {
    id: 'Dengarkan Audio Narasi',
    en: 'Listen to Audio Narration',
  },
  quest_btn_stop_audio: {
    id: 'Hentikan Audio Narasi',
    en: 'Stop Audio Narration',
  },
  question_counter: {
    id: 'Pertanyaan',
    en: 'Question',
  },
  of_counter: {
    id: 'dari',
    en: 'of',
  },
  btn_next_question: {
    id: 'Pertanyaan Berikutnya',
    en: 'Next Question',
  },
  btn_finish_quest: {
    id: 'Selesaikan Quest & Klaim XP',
    en: 'Finish Quest & Claim XP',
  },
  quest_clear_title: {
    id: 'Selamat! Quest Berhasil Diselesaikan!',
    en: 'Congratulations! Quest Cleared!',
  },
  quest_clear_subtitle: {
    id: 'Kamu telah mempelajari sejarah dan menjawab kuis edukasi seputar lokasi bersejarah ini.',
    en: 'You have learned the history and completed the educational trivia for this historic landmark.',
  },
  score_achieved: {
    id: 'Skor Akhir Kamu',
    en: 'Your Final Score',
  },
  xp_gained: {
    id: 'XP Diperoleh',
    en: 'XP Earned',
  },
  badge_unlocked: {
    id: 'Lencana Baru Terbuka',
    en: 'New Badge Unlocked',
  },
  btn_share_quest: {
    id: 'Bagikan Pencapaian',
    en: 'Share Achievement',
  },
  btn_retry_quiz: {
    id: 'Ulangi Kuis Trivia',
    en: 'Retry Trivia Quiz',
  },
  btn_close_modal: {
    id: 'Tutup',
    en: 'Close',
  },
  explanation_title: {
    id: 'Penjelasan Sejarah',
    en: 'Historical Explanation',
  },

  // Profile Modal
  profile_modal_title: {
    id: 'Profil Pengguna SaBo',
    en: 'SaBo User Profile',
  },
  login_email_title: {
    id: 'Masuk Sederhana dengan Email',
    en: 'Simple Email Sign-In',
  },
  no_pw_badge: {
    id: 'Tanpa Kata Sandi',
    en: 'Passwordless',
  },
  login_info_text: {
    id: 'Gunakan email kamu untuk menyimpan atau memuat progress XP, level, dan lencana.',
    en: 'Use your email to save and restore your XP progress, level rank, and badges.',
  },
  btn_email_login: {
    id: 'Masuk / Muat Akun',
    en: 'Sign In / Load Account',
  },
  explorer_stats_title: {
    id: 'Statistik Penjelajah',
    en: 'Explorer Statistics',
  },
  btn_edit_profile: {
    id: 'Edit Profil',
    en: 'Edit Profile',
  },
  btn_save_profile: {
    id: 'Simpan Profil',
    en: 'Save Profile',
  },
  badges_heading: {
    id: 'Koleksi Lencana Penghargaan',
    en: 'Earned Badges & Achievements',
  },
  completed_quests_heading: {
    id: 'Quest Yang Telah Diselesaikan',
    en: 'Completed Heritage Quests',
  },
  saved_itin_heading: {
    id: 'Itinerary Tersimpan',
    en: 'Saved Itineraries',
  },

  // Proximity Geofencing Banner
  geo_alert_title: {
    id: 'Notifikasi Geofencing Lokasi!',
    en: 'Proximity Geofencing Alert!',
  },
  geo_alert_near: {
    id: 'Kamu berada dekat dengan',
    en: 'You are close to',
  },
  geo_alert_action: {
    id: 'Mulai Quest & Audio',
    en: 'Start Quest & Audio',
  },

  // Deep Heritage Alias Keys (Bugfix P0)
  heritage_archive_title: {
    id: 'Arsip & Narasi Sejarah Kota Bogor',
    en: 'Bogor Heritage Archives & Historical Narratives',
  },
  heritage_archive_subtitle: {
    id: 'Eksplorasi dokumen sejarah autentik, koleksi video dokumenter Dinas Arsip Kota Bogor (@bogortempodulu), dan profil para tokoh pahlawan bangsa yang membentuk identitas Kota Hujan.',
    en: 'Explore authentic historical records, vintage documentary archives (@bogortempodulu), and profiles of historical leaders who shaped the City of Rain.',
  },
  tab_history_essay: {
    id: 'Sejarah Lengkap Bogor',
    en: 'Complete History of Bogor',
  },
  tab_video_archive: {
    id: 'Video Arsip Bogor Tempo Dulu',
    en: 'Vintage Video Archives',
  },
  tab_historical_figures: {
    id: 'Profil Tokoh Sejarah',
    en: 'Historical Figures',
  },

  // Tourism Planner Alias Keys (Bugfix P0)
  travel_planner_badge: {
    id: 'Perencana Wisata & Rekomendasi Kuliner Bogor',
    en: 'Bogor Tourism Planner & Culinary Guide',
  },
  travel_planner_title: {
    id: 'Rencanakan Liburan & Wisata Kuliner Bogor',
    en: 'Plan Your Bogor Vacation & Culinary Tour',
  },
  travel_planner_desc: {
    id: 'Buat jadwal perjalanan mandiri (itinerary), hitung estimasi biaya, telusuri kuliner legendaris dan restoran modern, serta jelajahi hotel & penerbangan via Google Travel.',
    en: 'Create custom itineraries, estimate travel budgets, discover legendary dishes & modern dining, and explore hotels & flights via Google Travel.',
  },
  filter_kuliner: {
    id: 'Kuliner Legendaris',
    en: 'Legendary Culinary',
  },
  filter_restoran: {
    id: 'Restoran Modern',
    en: 'Modern Dining',
  },
  filter_wisata: {
    id: 'Destinasi Wisata',
    en: 'Tourist Attractions',
  },
  filter_umkm: {
    id: 'Sentra UMKM',
    en: 'UMKM Centers',
  },
  filter_instansi: {
    id: 'Instansi & Museum',
    en: 'Heritage Institutions',
  },
  itinerary_title_label: {
    id: 'Nama Itinerary Perjalanan:',
    en: 'Travel Itinerary Name:',
  },
  no_places_added: {
    id: 'Belum ada destinasi yang ditambahkan. Klik "+ Tambah ke Itinerary" pada kartu di samping.',
    en: 'No destinations added yet. Click "+ Add to Itinerary" on any card beside.',
  },
  save_itinerary_btn: {
    id: 'Simpan Itinerary Saya',
    en: 'Save My Itinerary',
  },
  my_itinerary: {
    id: 'Rencana Perjalanan Saya',
    en: 'My Travel Itinerary',
  },
  est_total_cost: {
    id: 'Estimasi Total Anggaran',
    en: 'Total Estimated Budget',
  },

  // Community Reviews Alias Keys (Bugfix P0)
  community_reviews_badge: {
    id: 'Ulasan Komunitas & Forum Pengalaman',
    en: 'Community Reviews & Experience Forum',
  },
  community_reviews_title: {
    id: 'Ulasan Komunitas Wisata Bogor',
    en: 'Bogor Tourism Community Reviews',
  },
  community_reviews_desc: {
    id: 'Bagikan cerita seru, tips kuliner, foto kenangan, dan ulasan jujur kamu tentang situs heritage dan destinasi wisata Kota Bogor kepada sesama penjelajah.',
    en: 'Share your travel stories, food tips, memories, and honest reviews about heritage sites and attractions in Bogor with fellow explorers.',
  },
  write_review_title: {
    id: 'Tulis Ulasan Wisata Kamu',
    en: 'Write Your Travel Review',
  },
  your_rating_label: {
    id: 'Rating Pengalaman',
    en: 'Experience Rating',
  },
  review_story_label: {
    id: 'Cerita & Kesan Kunjungan',
    en: 'Visit Story & Impressions',
  },
  submit_review_btn: {
    id: 'Kirim Ulasan Komunitas',
    en: 'Submit Community Review',
  },
  filter_reviews_label: {
    id: 'Filter Destinasi',
    en: 'Filter Destination',
  },
  all_places: {
    id: 'Semua Destinasi',
    en: 'All Destinations',
  },
  no_reviews_yet: {
    id: 'Belum ada ulasan untuk destinasi ini. Jadilah penjelajah pertama yang mengulas!',
    en: 'No reviews for this destination yet. Be the first explorer to review!',
  },
  like_review: {
    id: 'Bermanfaat',
    en: 'Helpful',
  },

  // User Profile & Gamification Alias Keys (Bugfix P0)
  user_profile_title: {
    id: 'Profil Pengguna SaBo',
    en: 'SaBo User Profile',
  },
  simple_login_email: {
    id: 'Masuk Sederhana dengan Email',
    en: 'Simple Email Sign-In',
  },
  login_email_desc: {
    id: 'Gunakan email kamu untuk menyimpan atau memuat progress XP, level, dan lencana petualangan.',
    en: 'Use your email to save and restore your XP progress, level rank, and adventure badges.',
  },
  login_button: {
    id: 'Masuk / Muat Akun',
    en: 'Sign In / Load Account',
  },
  profile_info_header: {
    id: 'Informasi Penjelajah',
    en: 'Explorer Information',
  },
  PROFILE_INFO_HEADER: {
    id: 'Informasi Penjelajah',
    en: 'Explorer Information',
  },
  edit_profile_btn: {
    id: 'Edit Profil',
    en: 'Edit Profile',
  },
  save_changes_btn: {
    id: 'Simpan Perubahan',
    en: 'Save Changes',
  },
  unlocked_badges: {
    id: 'Lencana Penghargaan Terbuka',
    en: 'Earned Badges',
  },
  UNLOCKED_BADGES: {
    id: 'Lencana Penghargaan Terbuka',
    en: 'Earned Badges',
  },
  next_level_progress: {
    id: 'Progress Menuju Level Berikutnya',
    en: 'Progress to Next Level',
  },
  passwordless: {
    id: 'Tanpa Kata Sandi',
    en: 'Passwordless',
  },
  saved_itineraries: {
    id: 'Itinerary Tersimpan',
    en: 'Saved Itineraries',
  },
  choose_avatar_btn: {
    id: 'Ganti Avatar Maskot',
    en: 'Change Mascot Avatar',
  },
  avatar_picker_title: {
    id: 'Pilih Avatar Karakter SaBo',
    en: 'Choose Your SaBo Character Avatar',
  },
  avatar_picker_desc: {
    id: 'Koleksi 10 avatar bertema maskot rusa totol, ksatria Pajajaran, ahli botani, dan ikat kepala batik khas Bogor.',
    en: 'Collection of 10 avatars featuring the spotted deer mascot, Pajajaran knights, botanists, and traditional Bogor batik headbands.',
  },
  avatar_locked_level: {
    id: 'Terkunci (Perlu Level {level})',
    en: 'Locked (Requires Level {level})',
  },
  use_this_avatar: {
    id: 'Gunakan Avatar Ini',
    en: 'Use This Avatar',
  },

  // Leaderboard Keys (New Feature §5)
  nav_leaderboard: {
    id: 'Papan Peringkat Real-Time',
    en: 'Real-Time Leaderboard',
  },
  leaderboard_title: {
    id: 'Papan Peringkat Penjelajah SaBo 2026',
    en: 'SaBo 2026 Explorer Leaderboard',
  },
  leaderboard_subtitle: {
    id: 'Panggung kompetisi real-time antar sekolah (SMA/SMK), kecamatan, dan kreator lokal Kota Bogor dalam menuntaskan misi budaya & UMKM.',
    en: 'Real-time competitive ranking across high schools, districts, and creators of Bogor in exploring cultural heritage and local businesses.',
  },
  leaderboard_live_pulse: {
    id: 'LIVE REAL-TIME',
    en: 'LIVE REAL-TIME',
  },
  filter_all_rank: {
    id: 'Semua Kategori',
    en: 'All Categories',
  },
  filter_schools: {
    id: 'Antar Sekolah (SMA/SMK)',
    en: 'Inter-School (High School)',
  },
  filter_districts: {
    id: 'Antar Kecamatan',
    en: 'Inter-District',
  },
  filter_creators: {
    id: 'Kreator & Komunitas',
    en: 'Creators & Communities',
  },
  your_rank_badge: {
    id: 'Peringkat Kamu',
    en: 'Your Live Rank',
  },
  podium_1st: {
    id: 'Juara 1 Pasundan',
    en: '1st Champion',
  },
  podium_2nd: {
    id: 'Peringkat 2',
    en: '2nd Place',
  },
  podium_3rd: {
    id: 'Peringkat 3',
    en: '3rd Place',
  },

  // Reward Animations & Modal Keys (New Feature §6)
  badge_unlocked_modal_title: {
    id: 'Lencana Baru Terbuka!',
    en: 'New Badge Unlocked!',
  },
  badge_unlocked_modal_desc: {
    id: 'Selamat! Kamu telah membuktikan wawasan dan kecintaanmu dalam menjelajahi warisan budaya Kota Bogor.',
    en: 'Congratulations! You have proven your knowledge and passion for exploring Bogor cultural heritage.',
  },
  continue_exploring: {
    id: 'Lanjutkan Eksplorasi',
    en: 'Continue Exploration',
  },
  history_explanation: {
    id: 'Penjelasan Sejarah',
    en: 'Historical Explanation',
  },
  next_question: {
    id: 'Pertanyaan Berikutnya',
    en: 'Next Question',
  },
  view_results: {
    id: 'Lihat Hasil Akhir',
    en: 'View Results',
  },
  quest_cleared: {
    id: 'Selamat! Quest Berhasil Diselesaikan!',
    en: 'Congratulations! Quest Cleared!',
  },
  completed_trivia_for: {
    id: 'Kamu telah menyelesaikan quest trivia sejarah untuk',
    en: 'You have completed the history trivia quest for',
  },
  final_score: {
    id: 'Skor Akhir Kamu',
    en: 'Your Final Score',
  },
  bonus_xp: {
    id: 'XP Diperoleh',
    en: 'XP Earned',
  },
  key_facts: {
    id: 'Fakta Menarik Lokasi Ini',
    en: 'Key Historic Facts',
  },
  share_result: {
    id: 'Bagikan Hasil',
    en: 'Share Result',
  },
  repeat: {
    id: 'Ulangi Kuis',
    en: 'Retry Quiz',
  },
  close_claim: {
    id: 'Klaim Hadiah & Selesai',
    en: 'Claim Reward & Finish',
  },

  // Footer
  footer_desc: {
    id: 'Aplikasi Gamifikasi Edukasi Warisan Budaya, Peta Interaktif, & Hub Kreator Lokal Kota Bogor.',
    en: 'Bogor City Cultural Heritage Gamification App, Interactive Map, & Local Creator Hub.',
  },
  footer_designed_by: {
    id: 'Dirancang oleh',
    en: 'Designed by',
  },
};

// Localized Heritage Data Dictionary for high quality English translation
export const HERITAGE_TRANSLATIONS_EN: Record<
  string,
  {
    name?: string;
    operatingHours?: string;
    priceRange?: string;
    overview: string;
    uniqueFacts: string[];
    audioNarration: string;
    trivia?: {
      question: string;
      options: string[];
      explanation: string;
    }[];
  }
> = {
  istana_bogor: {
    name: 'Bogor Presidential Palace (Buitenzorg Palace)',
    operatingHours: 'Group tours with special State Secretariat permit',
    priceRange: 'Free (Special Permit)',
    overview:
      'Constructed in 1744 during the Dutch colonial era by Governor-General G.W. Baron van Imhoff. It now serves as one of the official presidential palaces and residences of the Republic of Indonesia.',
    uniqueFacts: [
      'Its architecture was inspired by Blenheim Palace in Oxfordshire, England, the birthplace of Winston Churchill.',
      'The Dutch name "Buitenzorg" translates to "Sans Souci" or "Without a Care / Free of Worry".',
      'President Soekarno made it the primary presidential residence (1960–1967).',
      'President Joko Widodo designated it as his primary residence and workplace starting in 2014.',
      'Adjacent to the palace stands the Balai Kirti Presidential Museum open to the public.',
    ],
    audioNarration:
      'Welcome to the Bogor Presidential Palace. Built in 1744 by Governor-General Baron van Imhoff, its name Buitenzorg signifies a peaceful retreat without worry. The palace grounds are surrounded by 28 hectares of lush gardens sheltering hundreds of spotted deer originating from Nepal.',
    trivia: [
      {
        question: 'Who was the Dutch Governor-General who initiated the construction of Bogor Palace in 1744?',
        options: ['G.W. Baron van Imhoff', 'H.W. Daendels', 'Jan Pieterszoon Coen', 'Stamford Raffles'],
        explanation: 'Baron van Imhoff commissioned the palace in 1744 as a tranquil country retreat away from Batavia.',
      },
      {
        question: 'What is the literal meaning of the Dutch name "Buitenzorg"?',
        options: ['Capital Center', 'Without a Care / Free of Worry', 'City of Rain', 'Flower Garden'],
        explanation: 'Buitenzorg translates to "Without a Care" (Sans Souci) in Dutch.',
      },
      {
        question: 'Which Indonesian President established Bogor Palace as the primary daily presidential residence in 2014?',
        options: ['President Soekarno', 'President Susilo Bambang Yudhoyono', 'President Joko Widodo', 'President Megawati'],
        explanation: 'President Joko Widodo made Bogor Palace his primary daily home and working office since 2014.',
      },
      {
        question: 'Which famous British estate inspired the original architectural design of Bogor Palace?',
        options: ['Buckingham Palace', 'Blenheim Palace', 'Windsor Castle', 'Westminster Abbey'],
        explanation: 'G.W. Baron van Imhoff modeled the palace after Blenheim Palace in Oxfordshire, England.',
      },
      {
        question: 'What presidential museum is located right beside Bogor Palace?',
        options: ['Zoology Museum', 'Balai Kirti Museum', 'PETA Museum', 'Struggle Museum'],
        explanation: 'The Balai Kirti Presidential Museum displays historical memorabilia of Indonesia’s presidents.',
      },
    ],
  },
  kebun_raya_bogor: {
    name: 'Bogor Botanical Gardens',
    operatingHours: 'Mon-Fri 08:00-16:00 WIB | Sat-Sun 07:00-16:00 WIB',
    priceRange: 'IDR 15,500 - IDR 25,500',
    overview:
      'Founded on May 18, 1817 by Caspar Georg Carl Reinwardt. It is the oldest and premier tropical botanical research center in Southeast Asia, housing over 15,000 plant species.',
    uniqueFacts: [
      'Originated from the sacred man-made forest "Samida" created by King Siliwangi of the Sunda Pajajaran Kingdom in the 15th century.',
      'Houses the oldest oil palm tree in Southeast Asia, introduced and planted in 1848.',
      'Recognized by UNESCO for its monumental role in global biodiversity and botanical conservation.',
      'Includes the Museum of Zoology featuring a complete 22-meter-long blue whale skeleton.',
      'Features the rare Titan Arum (Amorphophallus titanum) and Rafflesia flowers.',
    ],
    audioNarration:
      'Bogor Botanical Gardens was officially inaugurated on May 18, 1817. Long before colonial times, this fertile land was part of the royal Samida forest reserve established by the Pajajaran Kingdom to preserve rare indigenous trees.',
    trivia: [
      {
        question: 'In what year was the Bogor Botanical Gardens officially founded?',
        options: ['1817', '1744', '1945', '1899'],
        explanation: 'Founded on May 18, 1817 by botanist Caspar Georg Carl Reinwardt.',
      },
      {
        question: 'What was the ancient Pajajaran Kingdom forest name that preceded the botanical gardens?',
        options: ['Tarumanegara', 'Samida', 'Salakanagara', 'Galuh'],
        explanation: 'King Siliwangi established the Samida forest in the 15th century to protect valuable flora.',
      },
      {
        question: 'Which important agricultural crop in Southeast Asia was first planted here in 1848?',
        options: ['Rubber Tree', 'Oil Palm Tree', 'Arabica Coffee', 'Clove Tree'],
        explanation: 'The four original oil palm seedlings brought from Amsterdam and Mauritius were planted in Bogor in 1848.',
      },
    ],
  },
  prasasti_batutulis: {
    name: 'Batutulis Inscription Complex',
    operatingHours: 'Daily 08:00 - 16:00 WIB',
    priceRange: 'Voluntary Donation (IDR 5,000 - 10,000)',
    overview:
      'Carved in 1533 AD by King Surawisesa in tribute to his father, Sri Baduga Maharaja (Prabu Siliwangi), ruler of the Sunda Pajajaran Kingdom. Written in Ancient Sundanese script.',
    uniqueFacts: [
      'Inscribed with 9 lines of Ancient Sundanese Kawi script commemorating King Siliwangi’s reign.',
      'Surrounded by holy megalithic stones and the footprint stone of Prabu Purana.',
      'Marks the historical heart of the fortified capital city Pakuan Pajajaran.',
    ],
    audioNarration:
      'You are standing at the Batutulis Inscription complex, carved in 1533 by King Surawisesa. The inscription honors the glorious reign of Sri Baduga Maharaja, King Siliwangi of the Pajajaran Kingdom.',
  },
  museum_peta: {
    name: 'PETA Struggle Museum (Defenders of the Homeland)',
    operatingHours: 'Mon-Sun 08:00 - 17:00 WIB (Closed on Friday)',
    priceRange: 'IDR 10,000',
    overview:
      'The historic training camp where the PETA military units were forged in 1943 during the Japanese occupation, giving birth to the foundational leaders of the Indonesian National Armed Forces (TNI), including General Soedirman.',
    uniqueFacts: [
      'Originally built in 1745 as Dutch military barracks before becoming the PETA Daidan training center in 1943.',
      'Showcases dioramas of General Soedirman, Supriyadi of the Blitar revolt, and authentic historical weapons.',
      'Features full-scale battlefield weapons, armored vehicles, and original troop memorabilia.',
    ],
    audioNarration:
      'Welcome to the PETA Museum. In this historic complex in 1943, Indonesian youths trained under the Defenders of the Homeland militia, which later became the backbone of the Indonesian National Armed Forces.',
  },
  surken_street: {
    name: 'Surya Kencana Heritage Corridor (Chinatown)',
    operatingHours: 'Open 24 Hours (Peak 07:00 - 22:00 WIB)',
    priceRange: 'IDR 15,000 - IDR 75,000',
    overview:
      'The legendary multicultural heritage corridor of Bogor, formerly known as Handelstraat. It is celebrated for its historic 17th-century Chinese temple (Vihara Dhanagun) and rich fusion culinary heritage.',
    uniqueFacts: [
      'Originally developed along the historic Great Post Road (Grote Postweg) constructed by Daendels in 1808.',
      'Home to Vihara Dhanagun (Hok Tek Bio), founded over 300 years ago in 1672.',
      'Famous for signature local specialties including Soto Kuning Bogor, Ngo Hiang, Combro, and Doclang.',
    ],
    audioNarration:
      'Surya Kencana Street, or Surken, has been the beating heart of Bogor’s culinary and multicultural heritage for centuries. Here, traditional Sundanese and Peranakan traditions unite harmoniously.',
  },
  vihara_dhanagun: {
    name: 'Dhanagun Temple (Hok Tek Bio)',
    operatingHours: 'Daily 06:00 - 21:00 WIB',
    priceRange: 'Free',
    overview:
      'Established in 1672, Dhanagun Temple is the oldest active Chinese temple in Bogor, serving as a designated cultural heritage landmark and the epicentre of the annual Bogor Street Festival Cap Go Meh.',
    uniqueFacts: [
      'Over 350 years old, preserving original Ming and Qing-style wood carvings and stone dragon pillars.',
      'The centerpiece of the nationally renowned Bogor Street Festival Cap Go Meh, celebrated by diverse communities.',
    ],
    audioNarration:
      'Welcome to Dhanagun Temple, Hok Tek Bio. Built in 1672, this sacred sanctuary stands as a living testament to multicultural harmony and rich heritage in the heart of Bogor.',
  },
};

// Historical Figures English Translations
export const HISTORICAL_FIGURES_TRANSLATIONS_EN: Record<
  string,
  {
    title: string;
    profile: string;
    uniqueFacts: string[];
  }
> = {
  prabu_siliwangi: {
    title: 'Great Ruler of the Sunda Pajajaran Kingdom (1482–1521)',
    profile:
      'Sri Baduga Maharaja, popularly known as Prabu Siliwangi, unified the kingdoms of Sunda and Galuh. Under his visionary reign, Pakuan Pajajaran reached its golden era of prosperity, environmental conservation, and social justice.',
    uniqueFacts: [
      'Established the sacred Samida forest reserve to safeguard rare botanical species.',
      'Built extensive stone dams, fortified roads, and granaries across the kingdom.',
      'Immortalized in the Batutulis Inscription for his wisdom and benevolence.',
    ],
  },
  raden_saleh: {
    title: 'Pioneer of Modern Indonesian Painting & Naturalist (1811–1880)',
    profile:
      'The world-renowned Javanese master painter who trained in Europe and served as the royal court painter for European royalty. He spent his later years residing in Bogor, painting lush natural landscapes.',
    uniqueFacts: [
      'Masterpiece "The Arrest of Prince Diponegoro" (1857) is a National Cultural Treasure.',
      'His former estate and studio in Bogor remains a revered heritage landmark.',
      'Buried with honor in Bondongan, South Bogor.',
    ],
  },
  ir_soekarno: {
    title: 'Proclaimer of Independence & 1st President of Indonesia',
    profile:
      'Bung Karno held a profound personal love for Bogor. During the 1960s, he made Bogor Palace his primary residence, curating world-class art collections and hosting international peace summits.',
    uniqueFacts: [
      'Authored pivotal state decrees and political doctrines from Bogor Palace.',
      'Introduced hundreds of spotted deer to roam freely across the palace gardens.',
      'Amassed one of the largest presidential fine art collections in Asia.',
    ],
  },
  melchior_treub: {
    title: 'Dutch Botanist & Director of Bogor Botanical Gardens (1880–1909)',
    profile:
      'A pioneering botanist who transformed the Bogor Botanical Gardens into an internationally acclaimed center for tropical agricultural sciences and established the Treub Laboratory.',
    uniqueFacts: [
      'Established the Treub Laboratory, attracting prominent scientists from around the globe.',
      'Founded the predecessor of Indonesia’s Department of Agriculture in 1905.',
      'Extensively documented the botanical recolonization of Krakatoa after its 1883 eruption.',
    ],
  },
  kapitan_tubagus: {
    title: 'Warrior Commander of Bogor & Islamic Scholar',
    profile:
      'A revered Bantenese warrior commander who led regional defense and spread education across Bogor during the anti-colonial resistance of the 18th century.',
    uniqueFacts: [
      'His historic tomb in Empang Bogor is a celebrated pilgrimage destination.',
      'Known for his mastery of traditional Sundanese strategy and diplomacy.',
    ],
  },
};

// History Essay in English
export const BOGOR_HISTORY_ESSAY_EN = `### The Chronological History of Bogor: From Pakuan Pajajaran to the City of Heritage & Innovation

#### 1. The Classical Era & Pakuan Pajajaran (1482–1579)
Long before modern administrative boundaries, the lush highlands nestled between Mount Salak and Mount Gede served as the capital of the **Kingdom of Sunda Pajajaran**, known as **Pakuan Pajajaran**. Founded under the sovereign rule of **Sri Baduga Maharaja (Prabu Siliwangi)** in 1482, the city was engineered with sophisticated moats, stone palisades, and sacred botanical reserves known as *Samida*.

The **Batutulis Inscription**, carved in 1533 by King Surawisesa, still stands today near the heart of the city as enduring physical testimony to the wisdom, civil engineering achievements, and agricultural prosperity of this golden era.

---

#### 2. The Colonial Era & The Birth of "Buitenzorg" (1744–1942)
In the mid-18th century, Governor-General **G.W. Baron van Imhoff** was captivated by the cool mountain climate and fertile soil of the area. In August 1744, he commissioned a grand country residence which he christened **Buitenzorg**—a Dutch expression meaning *"Sans Souci"* or *"Without a Care"*.

In 1817, renowned German-Dutch botanist **Caspar Georg Carl Reinwardt** officially inaugurated the **Bogor Botanical Gardens (s Lands Plantentuin)**. This institution quickly evolved into the leading tropical agricultural research hub in Asia, pioneering the introduction of key economic crops including oil palm, rubber, tea, and cinchona.

---

#### 3. The National Awakening & The Birth of the Military (1942–1945)
During the Japanese occupation, Bogor became the birthplace of modern Indonesian armed defense. In 1943, the **PETA (Defenders of the Homeland)** training academy was established in the former military barracks on Jalan Jenderal Sudirman. Legendary military leaders, including **General Soedirman**, **Supriyadi**, and **Gatot Soebroto**, developed their foundational strategic military doctrines right here.

---

#### 4. The Republic Era to the Present Day
Following Indonesian Independence, President **Ir. Soekarno** embraced Bogor as a sanctuary for contemplation and international diplomacy. In recent decades, **President Joko Widodo** re-established Bogor Palace as his primary daily residence and working office from 2014 to 2024.

Today, Bogor stands proudly as the **"City of Rain"**, a thriving center of higher education and agricultural science centered around IPB University, and a vibrant creative hub celebrating heritage conservation, artisan crafts, and culinary excellence.`;

// Helper Hook and Context
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  getLocalizedHeritage: (item: HeritageLocation) => HeritageLocation;
  getLocalizedFigure: (figure: HistoricalFigure) => HistoricalFigure;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  t: (key: string) => key,
  getLocalizedHeritage: (item: HeritageLocation) => item,
  getLocalizedFigure: (figure: HistoricalFigure) => figure,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('sabo_language');
    return saved === 'en' || saved === 'id' ? saved : 'id';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('sabo_language', newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (key: string): string => {
    if (!key) return '';
    // 1. Direct match
    let entry = UI_TRANSLATIONS[key];
    // 2. Lowercase match
    if (!entry) {
      entry = UI_TRANSLATIONS[key.toLowerCase()];
    }
    // 3. Normalized snake_case match
    if (!entry) {
      const normalized = key.toLowerCase().replace(/[\s-]+/g, '_');
      entry = UI_TRANSLATIONS[normalized];
    }
    if (entry) {
      return entry[lang] || entry['id'] || entry['en'] || key;
    }
    // 4. Safe humanized fallback if completely missing (never show raw_snake_case_key)
    if (key.includes('_')) {
      return key
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
    return key;
  };

  const getLocalizedHeritage = (item: HeritageLocation): HeritageLocation => {
    if (lang === 'id') return item;
    const trans = HERITAGE_TRANSLATIONS_EN[item.id];
    if (!trans) return item;

    return {
      ...item,
      name: trans.name || item.name,
      operatingHours: trans.operatingHours || item.operatingHours,
      priceRange: trans.priceRange || item.priceRange,
      overview: trans.overview || item.overview,
      uniqueFacts: trans.uniqueFacts || item.uniqueFacts,
      audioNarration: trans.audioNarration || item.audioNarration,
      trivia: trans.trivia
        ? trans.trivia.map((t, idx) => ({
            id: item.trivia[idx]?.id || `tr_${idx}`,
            question: t.question,
            options: t.options,
            correctAnswer: item.trivia[idx]?.correctAnswer ?? 0,
            explanation: t.explanation,
          }))
        : item.trivia,
    };
  };

  const getLocalizedFigure = (figure: HistoricalFigure): HistoricalFigure => {
    if (lang === 'id') return figure;
    const trans = HISTORICAL_FIGURES_TRANSLATIONS_EN[figure.id];
    if (!trans) return figure;

    return {
      ...figure,
      title: trans.title || figure.title,
      profile: trans.profile || figure.profile,
      uniqueFacts: trans.uniqueFacts || figure.uniqueFacts,
    };
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        getLocalizedHeritage,
        getLocalizedFigure,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
