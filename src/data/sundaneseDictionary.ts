export interface SundanesePhrase {
  id: string;
  sunda: string;
  indonesia: string;
  english: string;
  category: 'sapaan' | 'belanja' | 'kuliner' | 'arah' | 'ungkapan';
  context: string;
  pronunciationTip: string;
}

export const SUNDANESE_DICTIONARY: SundanesePhrase[] = [
  {
    id: 'sd_1',
    sunda: 'Sampurasun!',
    indonesia: 'Salam hormat / Halo (Dijawab: Rampés!)',
    english: 'Traditional Sundanese greeting (Response: Rampes!)',
    category: 'sapaan',
    context: 'Ucapan salam pembuka penuh kehangatan khas budaya Sunda.',
    pronunciationTip: 'Sam-pu-ra-sun (tekanan di suku kata akhir)',
  },
  {
    id: 'sd_2',
    sunda: 'Punten, ngiring ngalangkung.',
    indonesia: 'Permisi, numpang lewat.',
    english: 'Excuse me, may I pass through.',
    category: 'sapaan',
    context: 'Digunakan saat berjalan di depan orang tua atau di jalan sempit dengan sedikit membungkukkan badan.',
    pronunciationTip: 'Pun-ten, ngi-ring nga-lang-kung',
  },
  {
    id: 'sd_3',
    sunda: 'Hatur nuhun pisan.',
    indonesia: 'Terima kasih banyak.',
    english: 'Thank you very much.',
    category: 'sapaan',
    context: 'Diucapkan kepada pedagang, supir, atau warga yang membantu.',
    pronunciationTip: 'Ha-tur nu-hun pi-san',
  },
  {
    id: 'sd_4',
    sunda: 'Sami-sami, mangga.',
    indonesia: 'Sama-sama, silakan.',
    english: 'You are welcome, please.',
    category: 'sapaan',
    context: 'Jawaban sopan saat orang lain berterima kasih.',
    pronunciationTip: 'Sa-mi sa-mi, mang-ga',
  },
  {
    id: 'sd_5',
    sunda: 'Sabaraha ieu hargana, Kang / Téh?',
    indonesia: 'Berapa harganya ini, Mas / Mbak?',
    english: 'How much is this, brother / sister?',
    category: 'belanja',
    context: 'Sangat berguna saat berbelanja di pasar tradisional atau UMKM kuliner.',
    pronunciationTip: 'Sa-ba-ra-ha i-eu har-ga-na',
  },
  {
    id: 'sd_6',
    sunda: 'Tiasa kirang sakedik?',
    indonesia: 'Bisa kurang sedikit harganya?',
    english: 'Could you give a little discount?',
    category: 'belanja',
    context: 'Menawar harga dengan nada ramah dan tersenyum.',
    pronunciationTip: 'Ti-a-sa ki-rang sa-ke-dik',
  },
  {
    id: 'sd_7',
    sunda: 'Raos pisan tuangeunana!',
    indonesia: 'Enak sekali makanannya!',
    english: 'The food is exceptionally delicious!',
    category: 'kuliner',
    context: 'Pujian hangat untuk penjual soto mie, doclang, atau asinan.',
    pronunciationTip: 'Ra-os pi-san tu-ang-eu-na-na',
  },
  {
    id: 'sd_8',
    sunda: 'Hoyong mesen sacangkir Kopi Liong panas.',
    indonesia: 'Mau pesan secangkir Kopi Liong panas.',
    english: 'I would like to order a cup of hot Liong coffee.',
    category: 'kuliner',
    context: 'Saat mampir di kedai kopi tradisional Suryakencana.',
    pronunciationTip: 'Ho-yong me-sen sa-cang-kir',
  },
  {
    id: 'sd_9',
    sunda: 'Bade tumaros, palebah mana Kebun Raya?',
    indonesia: 'Mau bertanya, sebelah mana Kebun Raya?',
    english: 'Excuse me, which direction is the Botanic Gardens?',
    category: 'arah',
    context: 'Menanyakan petunjuk jalan kepada warga sekitar.',
    pronunciationTip: 'Ba-de tu-ma-ros, pa-le-bah ma-na',
  },
  {
    id: 'sd_10',
    sunda: 'Kiri, Mang! Payun stopan.',
    indonesia: 'Kiri, Bang! Depan lampu merah.',
    english: 'Drop off on the left please, near the traffic light.',
    category: 'arah',
    context: 'Aba-aba saat hendak turun dari angkot di Kota Bogor.',
    pronunciationTip: 'Ki-ri Mang, pa-yun sto-pan',
  },
];
