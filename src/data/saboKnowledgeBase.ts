// Sabo Local Knowledge Base - 100% Client-side, Zero Token Consumption
export interface KnowledgeItem {
  id: string;
  keywords: string[];
  category: 'sejarah' | 'kuliner' | 'transportasi' | 'tips' | 'budaya' | 'spot';
  title: string;
  titleEn: string;
  answer: string;
  answerEn: string;
  relatedLocationId?: string;
  flyToCoords?: { lat: number; lng: number; zoom?: number };
  quickFollowUps?: string[];
}

export const SABO_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'kb_istana_bogor',
    keywords: ['istana', 'istana bogor', 'buitenzorg', 'presiden', 'rusa', 'van imhoff'],
    category: 'sejarah',
    title: 'Istana Kepresidenan Bogor (Buitenzorg Palace)',
    titleEn: 'Bogor Presidential Palace',
    answer: 'Istana Bogor didirikan pada Agustus 1744 oleh Gubernur Jenderal Gustaaf Willem Baron van Imhoff. Terinspirasi dari Blenheim Palace di Inggris, istana ini diberi nama "Buitenzorg" yang bermakna "Bebas dari Rasa Cemas/Kesibukan". Sejak era kemerdekaan, Presiden Soekarno dan Presiden Joko Widodo menjadikannya kediaman utama. Di halaman rumputnya seluas 28 hektar berkeliaran ratusan rusa totol (Axis axis) asal Nepal yang didatangkan sejak 1814 oleh Sir Stamford Raffles.',
    answerEn: 'Bogor Palace was founded in 1744 by Governor General Baron van Imhoff. The name "Buitenzorg" means "Without Worry". It is renowned for its neoclassical architecture and hundreds of spotted deer roaming freely across its 28-hectare estate.',
    relatedLocationId: 'istana_bogor',
    flyToCoords: { lat: -6.5976, lng: 106.7975, zoom: 16.5 },
    quickFollowUps: ['Cara berkunjung ke Istana Bogor', 'Beri makan rusa istana', 'Museum Balai Kirti'],
  },
  {
    id: 'kb_kebun_raya',
    keywords: ['kebun raya', 'krb', 'botanical garden', 'pohon kelapa sawit', 'raflesia', 'danau gunting'],
    category: 'spot',
    title: 'Kebun Raya Bogor (Bogor Botanic Gardens)',
    titleEn: 'Bogor Botanic Gardens',
    answer: 'Kebun Raya Bogor didirikan pada 18 Mei 1817 oleh Prof. Caspar Georg Karl Reinwardt dengan luas 87 hektar dan menyimpan lebih dari 15.000 jenis pohon dan tumbuhan langka. Di sinilah kelapa sawit pertama kali dibudidayakan di Asia Tenggara (1848). Spot ikonik meliputi Danau Gunting, Jembatan Merah Gantung, Griya Anggrek, Taman Astrid, dan Monumen Lady Raffles.',
    answerEn: 'Founded in 1817, Bogor Botanic Gardens spans 87 hectares with over 15,000 botanical species. It is famous for historical oil palms, giant Victoria water lilies, and the iconic Gunting Lake.',
    relatedLocationId: 'kebun_raya_bogor',
    flyToCoords: { lat: -6.5985, lng: 106.7997, zoom: 16.0 },
    quickFollowUps: ['Tiket masuk Kebun Raya', 'Sewa sepeda listrik', 'Taman Astrid'],
  },
  {
    id: 'kb_batutulis',
    keywords: ['batutulis', 'prasasti', 'surawisesa', 'siliwangi', 'pakuan pajajaran', 'aksara kawi'],
    category: 'sejarah',
    title: 'Prasasti Batutulis Bogor (Tahun 1533 M)',
    titleEn: 'Batutulis Inscription',
    answer: 'Prasasti Batutulis terletak di Jl. Batutulis No. 54 Bogor Selatan. Dibuat pada tahun 1533 M (1455 Saka) oleh Raja Surawisesa untuk memuliakan ayahandanya, Sri Baduga Maharaja (Prabu Siliwangi), yang memimpin Kerajaan Sunda Pajajaran selama 39 tahun masa keemasan. Prasasti ini diukir dalam aksara Sunda Kuno (Kawi) berbahasa Sunda Kuno pada batu andesit alami.',
    answerEn: 'Carved in 1533 AD by King Surawisesa, the Batutulis Inscription honors Sri Baduga Maharaja (Prabu Siliwangi) who led the Golden Era of the Sunda Pakuan Pajajaran kingdom.',
    relatedLocationId: 'prasasti_batutulis',
    flyToCoords: { lat: -6.6215, lng: 106.8105, zoom: 17.0 },
    quickFollowUps: ['Isi teks Prasasti Batutulis', 'Raja Prabu Siliwangi', 'Rute angkot ke Batutulis'],
  },
  {
    id: 'kb_kuliner_soto_mie',
    keywords: ['soto mie', 'soto mie bogor', 'risol', 'kuliner legendaris', 'makanan khas'],
    category: 'kuliner',
    title: 'Soto Mie Khas Bogor',
    titleEn: 'Bogor Beef Noodle Soup',
    answer: 'Soto Mie Bogor adalah ikon kuliner legendaris berkuah merah gurih dari perpaduan kaldu sapi, cabai merah, dan rempah harum. Ciri khas utamanya adalah potongan daging sapi kenyal, kikil, mie kuning, bihun, lobak, kol, emping, serta irisan risol goreng renyah yang disiram kuah panas mendidih. Lokasi rekomendasi: Soto Mie Mang Ohim (Taman Kencana) dan Soto Mie Agih/Suryakencana.',
    answerEn: 'Soto Mie Bogor features tender beef, noodles, vermicelli, and signature crispy fried spring rolls doused in rich aromatic spiced beef broth.',
    relatedLocationId: 'soto_mie_bogor',
    flyToCoords: { lat: -6.5895, lng: 106.8045, zoom: 17.0 },
    quickFollowUps: ['Rekomendasi Doclang', 'Kuliner Suryakencana', 'Asinan Bogor Gedung Dalam'],
  },
  {
    id: 'kb_kuliner_doclang',
    keywords: ['doclang', 'doclang 405', 'bumbu kacang', 'pesor', 'makanan sarapan'],
    category: 'kuliner',
    title: 'Doclang Khas Bogor',
    titleEn: 'Bogor Doclang Rice Cake with Peanut Sauce',
    answer: 'Doclang adalah hidangan sarapan tradisional khas Bogor. Terdiri dari lontong pesor (beras dibungkus daun patat yang memberi aroma wangi alami), tahu kuning goreng, kentang rebus, dan telur rebus, disiram saus bumbu kacang kental bercita rasa manis gurih dengan taburan kerupuk dan kecap manis asli. Spot legendaris: Doclang 405 Jembatan Merah.',
    answerEn: 'Doclang consists of rice cakes wrapped in fragrant patat leaves, fried tofu, boiled potatoes, and hard-boiled egg covered in sweet savory peanut sauce.',
    relatedLocationId: 'doclang_405',
    flyToCoords: { lat: -6.5938, lng: 106.7915, zoom: 17.0 },
    quickFollowUps: ['Lokasi Jembatan Merah', 'Asinan Sedap', 'Roti Unyil Venus'],
  },
  {
    id: 'kb_suryakencana',
    keywords: ['suryakencana', 'surken', 'chinatown', 'vihara dhanagun', 'kuliner malam'],
    category: 'spot',
    title: 'Kawasan Wisata Pecinan & Kuliner Suryakencana',
    titleEn: 'Suryakencana Chinatown Heritage & Culinary Strip',
    answer: 'Jalan Suryakencana adalah koridor warisan budaya pembauran Sunda dan Tionghoa tertua di Bogor. Membentang sepanjang 1 kilometer, kawasan ini dipenuhi ratusan penjaja kuliner pusaka legendaris seperti Ngo Hiang, Lumpia Basah, Bir Kotjok Si Abah (sejak 1965), Laksa Gang Aut Mang Wahyu, serta Vihara Dhanagun (Hok Tek Bio) yang dibangun pada abad ke-17.',
    answerEn: 'Suryakencana street is the heart of Bogor heritage Chinatown, renowned for centuries of culinary traditions including Bir Kotjok, Laksa Gang Aut, and Dhanagun Temple.',
    relatedLocationId: 'vihara_dhanagun',
    flyToCoords: { lat: -6.6025, lng: 106.7995, zoom: 16.8 },
    quickFollowUps: ['Bir Kotjok Si Abah', 'Vihara Dhanagun', 'Laksa Gang Aut'],
  },
  {
    id: 'kb_transport_biskita',
    keywords: ['biskita', 'trans pakuan', 'angkot', 'transportasi', 'stasiun bogor', 'cara ke bogor'],
    category: 'transportasi',
    title: 'Panduan Biskita Trans Pakuan & Transportasi Kota Bogor',
    titleEn: 'Biskita Trans Pakuan Public Transit Guide',
    answer: 'Kota Bogor memiliki bus modern ber-AC "Biskita Trans Pakuan" dengan sistem Buy The Service (BTS). Pembayaran menggunakan kartu uang elektronik (Flazz, e-Money, TapCash, Brizzi). Koridor favorit wisatawan:\n- Koridor 1 & 2: Menghubungkan Terminal Bubulak dengan Ciawi via Suryakencana dan Kebun Raya.\n- Koridor 5 & 6: Menghubungkan Stasiun Bogor, Alun-Alun, dan kawasan perumahan utara.\nSelain itu, Stasiun KRL Bogor langsung terkoneksi dengan Alun-Alun Kota Bogor.',
    answerEn: 'Biskita Trans Pakuan is Bogor modern air-conditioned bus rapid system using contactless payment cards. Key corridors connect Bogor Railway Station, the Botanic Gardens, and Suryakencana.',
    quickFollowUps: ['Rute Biskita Koridor 1', 'Jalan kaki dari Stasiun', 'Tarif Biskita'],
  },
  {
    id: 'kb_tugu_kujang',
    keywords: ['tugu kujang', 'lawang salapan', 'simbol bogor', 'ikon bogor', 'pajajaran'],
    category: 'spot',
    title: 'Tugu Kujang & Lawang Salapan',
    titleEn: 'Tugu Kujang Monument & Nine Portals',
    answer: 'Tugu Kujang diresmikan pada 4 Mei 1982 oleh Walikota Achmad Sobana. Menara setinggi 25 meter ini di puncaknya memuat replika Kujang pusaka setinggi 7 meter berbobot 800 kg yang menghadap ke arah Istana Bogor. Di sampingnya berdiri megah "Lawang Salapan" (Sembilan Pintu Gerbang) berarsitektur klasik dengan semboyan Sunda "Di Nu Kiwari Ngancik Nu Bihari, Seja Ayeuna Sampeureun Jaga" (Apa yang kita nikmati hari ini adalah warisan masa lalu, apa yang kita perbuat hari ini adalah bekal masa depan).',
    answerEn: 'Tugu Kujang was erected in 1982 standing 25 meters tall topped with a 7-meter golden Kujang blade, accompanied by Lawang Salapan with 9 monumental archways.',
    relatedLocationId: 'tugu_kujang',
    flyToCoords: { lat: -6.6006, lng: 106.8049, zoom: 16.8 },
    quickFollowUps: ['Arti semboyan Lawang Salapan', 'Kujang pusaka Pajajaran', 'Spot foto malam'],
  },
  {
    id: 'kb_tips_cuaca',
    keywords: ['cuaca', 'kota hujan', 'musim hujan', 'waktu terbaik', 'tips wisata'],
    category: 'tips',
    title: 'Tips Wisata di "Kota Hujan" Bogor',
    titleEn: 'Weather Tips for the "City of Rain"',
    answer: '1. Selalu bawa payung lipat atau jas hujan ringan, karena hujan di Bogor sering turun pada siang menjelang sore hari.\n2. Waktu terbaik berjalan kaki di Kebun Raya adalah pukul 07.00 - 10.30 pagi saat udara masih sejuk dan berkabut tipis.\n3. Gunakan sepatu jalan yang nyaman dan anti-slip.\n4. Akhiri penjelajahan sore hari dengan menikmati sajian hangat seperti Sekoteng Bogor, Soto Mie, atau Kopi Liong Bulan.',
    answerEn: 'Always carry a compact umbrella as rain typically arrives in the afternoon. Early morning (7:00 - 10:30 AM) offers the freshest strolls through the Botanic Gardens.',
    quickFollowUps: ['Rekomendasi kuliner hangat', 'Sewa sepeda listrik', 'Wisata ramah anak'],
  },
  {
    id: 'kb_basa_sunda',
    keywords: ['bahasa sunda', 'sunda', 'kamus sunda', 'kata sunda', 'arti kata', 'sapaan'],
    category: 'budaya',
    title: 'Percakapan Basa Sunda Ramah Wisatawan',
    titleEn: 'Helpful Sundanese Phrases',
    answer: 'Beberapa frasa sopan yang disukai warga lokal Bogor:\n- "Punten" = Permisi / Maaf\n- "Mangga" = Silakan\n- "Hatur nuhun" = Terima kasih\n- "Sami-sami" = Sama-sama\n- "Kumaha damang?" = Bagaimana kabarnya?\n- "Sabaraha ieu, Mang?" = Berapa harganya ini, Paman?\n- "Raos pisan!" = Enak sekali!\n- "Bade ka mana?" = Mau pergi ke mana?',
    answerEn: 'Common friendly Sundanese greetings include: Punten (Excuse me), Mangga (Please proceed), Hatur nuhun (Thank you), and Raos pisan (Very delicious)!',
    quickFollowUps: ['Dengar audio basa Sunda', 'Kuis Aksara Sunda', 'Tradisi Sunda'],
  },
];

// Smart Client-Side Matcher: returns high-fidelity response without token cost
export function querySaboKnowledge(userQuery: string): {
  answer: string;
  answerEn: string;
  sourceItem?: KnowledgeItem;
  matchedCategory?: string;
  followUps: string[];
} {
  const queryLower = userQuery.toLowerCase().trim();

  // Search through knowledge items
  let bestMatch: KnowledgeItem | null = null;
  let maxScore = 0;

  for (const item of SABO_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (queryLower.includes(kw)) {
        score += kw.length * 2;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 2) {
    return {
      answer: bestMatch.answer,
      answerEn: bestMatch.answerEn,
      sourceItem: bestMatch,
      matchedCategory: bestMatch.category,
      followUps: bestMatch.quickFollowUps || [
        'Rekomendasi kuliner legendaris',
        'Sejarah Istana Bogor',
        'Panduan Biskita Trans Pakuan',
      ],
    };
  }

  // Fallback intelligent responder based on broad categories
  if (queryLower.includes('kuliner') || queryLower.includes('makan') || queryLower.includes('jajan')) {
    return {
      answer: 'Bogor adalah surga kuliner legendaris! Beberapa yang wajib kamu cicipi: Soto Mie Mang Ohim, Doclang 405 Jembatan Merah, Asinan Sedap Gedung Dalam sejak 1978, Cungkring Pak Jumat Suryakencana, Bir Kotjok Si Abah, dan Roti Unyil Venus. Mau info detail kuliner yang mana?',
      answerEn: 'Bogor is a culinary paradise! Must-tries include Soto Mie Mang Ohim, Doclang 405, Asinan Gedung Dalam, and Roti Unyil Venus. Which one would you like to explore?',
      followUps: ['Soto Mie Bogor', 'Doclang 405', 'Kuliner Suryakencana'],
    };
  }

  if (queryLower.includes('sejarah') || queryLower.includes('kerajaan') || queryLower.includes('siliwangi')) {
    return {
      answer: 'Sejarah Bogor berakar kuat dari Kerajaan Sunda Pakuan Pajajaran yang dipimpin Prabu Siliwangi (Sri Baduga Maharaja) hingga abad ke-16. Jejaknya tersimpan di Prasasti Batutulis 1533, Museum Balai Kirti, dan kawasan Samida yang kini menjadi Kebun Raya Bogor.',
      answerEn: 'Bogor heritage traces back to the Sunda Pakuan Pajajaran kingdom under King Siliwangi, preserved at Batutulis Inscription and the historic royal grounds.',
      followUps: ['Prasasti Batutulis', 'Istana Bogor', 'Tugu Kujang'],
    };
  }

  if (queryLower.includes('rute') || queryLower.includes('jalan') || queryLower.includes('angkot') || queryLower.includes('kereta')) {
    return {
      answer: 'Untuk berkeliling Bogor dengan mudah: naik KRL Commuter Line turun di Stasiun Bogor. Dari stasiun, kamu bisa jalan kaki 5 menit ke Alun-Alun dan Jembatan Merah, atau naik bus modern Biskita Trans Pakuan Koridor 1, 2, atau 5 untuk menuju Kebun Raya dan Suryakencana.',
      answerEn: 'For easy transit: take KRL Commuter Line to Bogor Station. From there, hop on Biskita Trans Pakuan corridors 1, 2, or 5 to reach Botanic Gardens and Suryakencana.',
      followUps: ['Panduan Biskita', 'Peta Interaktif', 'Jalan kaki Stasiun'],
    };
  }

  // General welcoming response
  return {
    answer: `Sampurasun! Saya Ki Pemandu Saba Bogor, siap memandumu menjelajahi warisan sejarah, kekayaan alam botani, kuliner pusaka legendaris, dan rute wisata ramah di Kota Hujan. Tanyakan apa saja seputar tempat bersejarah, rekomendasi kuliner, panduan rute transportasi, atau frasa Basa Sunda!`,
    answerEn: `Welcome! I am Ki Pemandu Saba Bogor, your local heritage and travel companion. Ask me about historical landmarks, traditional culinary treasures, public transit routes, or friendly Sundanese phrases!`,
    followUps: [
      'Rekomendasi kuliner khas Bogor',
      'Sejarah Istana & Rusa Totol',
      'Panduan Biskita Trans Pakuan',
      'Tips cuaca Kota Hujan',
    ],
  };
}
