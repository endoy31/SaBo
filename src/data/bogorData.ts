import { generateAnimatedSvg } from '../utils/animatedIllustration';
import {
  HeritageLocation,
  HistoricalFigure,
  CulinaryItem,
  ModernRestaurant,
  TourismDestination,
  GovernmentInstitution,
  UMKMCenter,
  Creator,
  YouTubeVideo,
} from '../types';

export const HERITAGE_LOCATIONS: HeritageLocation[] = [
  {
    id: 'istana_bogor',
    name: 'Istana Bogor (Buitenzorg Palace)',
    category: 'sejarah',
    builtOrFounded: 'Agustus 1744 - 1750',
    address: 'Jl. Ir. H. Juanda No.1, Paledang, Bogor Tengah',
    coordinates: { lat: -6.5976, lng: 106.7975 },
    operatingHours: 'Khusus rombongan dengan izin Sekretariat Negara',
    priceRange: 'Gratis (Izin Khusus)',
    overview:
      'Dibangun pada tahun 1744 pada masa kolonial Belanda oleh Gubernur Jenderal G.W. Baron van Imhoff. Kini menjadi salah satu istana kepresidenan Republik Indonesia dan kediaman presiden.',
    uniqueFacts: [
      'Arsitekturnya meniru Blenheim Palace di Inggris, tempat lahir Winston Churchill.',
      'Nama "Buitenzorg" berarti "Bebas dari Masalah" atau tanpa kesibukan.',
      'Presiden Soekarno menjadikannya kediaman presiden utama (1960-1967).',
      'Presiden Joko Widodo menetapkannya sebagai kantor dan kediaman utama sejak 2014.',
      'Di samping istana terdapat Museum Kepresidenan Balai Kirti untuk publik.',
    ],
    audioNarration:
      'Selamat datang di Istana Bogor. Dibangun pada tahun 1744 oleh Gubernur Jenderal Baron van Imhoff. Nama Buitenzorg bermakna tempat peristirahatan yang bebas dari masalah. Bangunan ini dikelilingi taman hijau seluas 28 hektar tempat berteduhnya ratusan rusa totol keturunan asli asal Nepal.',
    image: generateAnimatedSvg("Istana Bogor (Buitenzorg Palace)", "sejarah"),
    artsCultureUrl: 'https://artsandculture.google.com/search?q=Bogor%20Palace',
    googleMapsUrl: 'https://maps.google.com/?q=Istana+Bogor',
    xpReward: 200,
    creatorAssetId: 'maya_crafts',
    trivia: [
      {
        id: 'ib_1',
        question: 'Siapakah Gubernur Jenderal Belanda yang menggagas pembangunan Istana Bogor pada tahun 1744?',
        options: ['G.W. Baron van Imhoff', 'H.W. Daendels', 'Jan Pieterszoon Coen', 'Stamford Raffles'],
        correctAnswer: 0,
        explanation: 'Baron van Imhoff membangun istana ini pada tahun 1744 sebagai tempat rekreasi bebas dari hiruk-pikuk Batavia.',
      },
      {
        id: 'ib_2',
        question: 'Apa arti harfiah dari nama "Buitenzorg"?',
        options: ['Pusat Pemerintahan', 'Bebas dari Masalah', 'Kota Hujan', 'Taman Bunga'],
        correctAnswer: 1,
        explanation: 'Buitenzorg berasal dari bahasa Belanda yang berarti Sans Souci atau "Bebas dari Masalah/Kesibukan".',
      },
      {
        id: 'ib_3',
        question: 'Presiden Indonesia manakah yang menetapkan Istana Bogor sebagai kediaman & kantor presiden utama sejak 2014?',
        options: ['Presiden Soekarno', 'Presiden Susilo Bambang Yudhoyono', 'Presiden Joko Widodo', 'Presiden Megawati'],
        correctAnswer: 2,
        explanation: 'Presiden Joko Widodo menjadikan Istana Bogor sebagai kantor dan tempat tinggal presiden sehari-hari sejak 2014.',
      },
      {
        id: 'ib_4',
        question: 'Desain awal Istana Bogor terinspirasi dari arsitektur bangunan terkenal mana di Inggris?',
        options: ['Buckingham Palace', 'Blenheim Palace', 'Windsor Castle', 'Westminster Abbey'],
        correctAnswer: 1,
        explanation: 'G.W. Baron van Imhoff mengadopsi arsitektur Blenheim Palace di Inggris.',
      },
      {
        id: 'ib_5',
        question: 'Museum apa yang terletak tepat di samping Istana Bogor yang didedikasikan untuk sejarah kepresidenan?',
        options: ['Museum Zoologi', 'Balai Kirti', 'Museum PETA', 'Museum Perjuangan'],
        correctAnswer: 1,
        explanation: 'Museum Kepresidenan Balai Kirti diresmikan di kompleks Istana Bogor untuk menyimpan peninggalan para Presiden RI.',
      },
    ],
  },
  {
    id: 'kebun_raya_bogor',
    name: 'Kebun Raya Bogor',
    category: 'botani',
    builtOrFounded: '18 Mei 1817',
    address: 'Jl. Ir. H. Juanda No.13, Paledang, Bogor Tengah',
    coordinates: { lat: -6.5971, lng: 106.806 },
    operatingHours: 'Senin-Jumat 08.00-16.00 WIB | Sabtu-Minggu 07.00-16.00 WIB',
    priceRange: 'Rp 15.500 - Rp 25.500',
    phone: '(0251) 8311362',
    overview:
      'Didirikan pada tahun 1817 oleh Caspar Georg Carl Reinwardt. Pusat penelitian botani tropis tertua di Asia Tenggara dengan 15.000+ spesies tanaman.',
    uniqueFacts: [
      'Gagasan awal berasal dari hutan buatan "Samida" buatan Prabu Siliwangi pada abad ke-15.',
      'Memiliki Pohon Kelapa Sawit tertua di Asia Tenggara yang ditanam tahun 1848.',
      'Diakui UNESCO sebagai kontributor konservasi keanekaragaman hayati global.',
      'Dilengkapi Museum Zoologi dengan kerangka paus biru sepanjang 22 meter.',
      'Memiliki Taman Bunga Bangkai (Amorphophallus titanum) dan Bunga Rafflesia.',
    ],
    audioNarration:
      'Kebun Raya Bogor diresmikan pada 18 Mei 1817. Sebelum era kolonial, kawasan ini merupakan hutan lindung buatan Kerajaan Pajajaran yang disebut Samida untuk menjaga benih pohon langka.',
    image: generateAnimatedSvg("Kebun Raya Bogor", "botani"),
    artsCultureUrl: 'https://artsandculture.google.com/search?q=Bogor%20Botanical%20Gardens',
    googleMapsUrl: 'https://maps.google.com/?q=Kebun+Raya+Bogor',
    xpReward: 180,
    creatorAssetId: 'maya_crafts',
    trivia: [
      {
        id: 'krb_1',
        question: 'Pada tanggal, bulan, dan tahun berapakah Kebun Raya Bogor resmi didirikan?',
        options: ['18 Mei 1817', '17 Agustus 1945', '1 Juni 1901', '25 Oktober 1835'],
        correctAnswer: 0,
        explanation: 'Kebun Raya Bogor didirikan secara resmi pada 18 Mei 1817 oleh Prof. Caspar Georg Carl Reinwardt.',
      },
      {
        id: 'krb_2',
        question: 'Apa nama hutan/taman buatan Kerajaan Pajajaran abad ke-15 yang menjadi cikal bakal Kebun Raya Bogor?',
        options: ['Pakuan', 'Samida', 'Suryakencana', 'Ciaruteun'],
        correctAnswer: 1,
        explanation: 'Prabu Siliwangi mendirikan hutan buatan "Samida" pada 1474-1513 untuk menjaga kelestarian benih pohon langka.',
      },
      {
        id: 'krb_3',
        question: 'Tanaman industri penting apa yang pertama kali ditanam di Kebun Raya Bogor pada 1848 dan menjadi tertua di Asia Tenggara?',
        options: ['Kelapa Sawit', 'Karet', 'Kopi Arabika', 'Teh Hitam'],
        correctAnswer: 0,
        explanation: 'Induk Pohon Kelapa Sawit pertama di Asia Tenggara ditanam di Kebun Raya Bogor pada tahun 1848.',
      },
      {
        id: 'krb_4',
        question: 'Berapa perkiraan jumlah koleksi spesies tanaman yang dikonservasi di Kebun Raya Bogor?',
        options: ['Lebih dari 15.000 spesies', 'Sekitar 1.000 spesies', '500 spesies', '50.000 spesies'],
        correctAnswer: 0,
        explanation: 'Kebun Raya Bogor mengoleksi lebih dari 15.000 spesies flora tropis.',
      },
      {
        id: 'krb_5',
        question: 'Siapakah Gubernur Jenderal Inggris yang pernah tinggal di Bogor dan memprakarsai kebun tumbuhan bersama istrinya Olivia Mariamne?',
        options: ['Sir Thomas Stamford Raffles', 'Lord Minto', 'Van der Capellen', 'J.P. Coen'],
        correctAnswer: 0,
        explanation: 'Stamford Raffles bersama pakar botani merancang kebun bergaya Inggris di pekarangan Istana Bogor.',
      },
    ],
  },
  {
    id: 'museum_zoologi',
    name: 'Museum Zoologi Bogor',
    category: 'sejarah',
    builtOrFounded: '1894 (Laboratorium), 1901 (Publik)',
    address: 'Jl. Ir. H. Juanda No.9, Paledang, Bogor Tengah',
    coordinates: { lat: -6.601, lng: 106.796 },
    operatingHours: 'Termasuk tiket Kebun Raya Bogor',
    priceRange: 'Termasuk Tiket KRB',
    overview:
      'Didirikan pada tahun 1894 oleh Dr. J.C. Koningsberger. Menyimpan koleksi spesimen fauna terbesar di Asia Tenggara sebanyak 2.768.044 spesimen.',
    uniqueFacts: [
      'Menampilkan kerangka Paus Biru raksasa sepanjang 22 meter seberat 64 ton yang terdampar di Pameungpeuk tahun 1916.',
      'Memiliki 122 diorama display koleksi mamalia, reptil, burung, ikan, dan serangga.',
      'Pusat rujukan penelitian faunistik internasional.',
    ],
    audioNarration:
      'Museum Zoologi Bogor memamerkan keanekaragaman faunistik Indonesia. Ikon utamanya adalah fosil dan kerangka Paus Biru asli sepanjang 22 meter.',
    image: generateAnimatedSvg("Museum Zoologi Bogor", "sejarah"),
    artsCultureUrl: 'https://artsandculture.google.com/search?q=Bogor%20Zoology%20Museum',
    googleMapsUrl: 'https://maps.google.com/?q=Museum+Zoologi+Bogor',
    xpReward: 160,
    creatorAssetId: 'rian_illustration',
    trivia: [
      {
        id: 'mz_1',
        question: 'Fosil spesimen fauna raksasa apakah yang menjadi ikon utama di Museum Zoologi Bogor?',
        options: ['Paus Biru sepanjang 22 meter', 'Gajah Sumatra', 'Dinosaurus T-Rex', 'Komodo Raksasa'],
        correctAnswer: 0,
        explanation: 'Kerangka Paus Biru 22 meter seberat 64 ton menjadi spesimen paling legendaris di museum ini.',
      },
      {
        id: 'mz_2',
        question: 'Pada tahun berapakah laboratorium Zoologi ini pertama kali didirikan oleh Dr. J.C. Koningsberger?',
        options: ['1894', '1945', '1750', '1928'],
        correctAnswer: 0,
        explanation: 'Museum Zoologi berawal dari laboratorium Landbouw Zoologisch Museum pada tahun 1894.',
      },
      {
        id: 'mz_3',
        question: 'Di manakah lokasi terdamparnya Paus Biru yang kerangkanya kini dipajang di museum ini pada tahun 1916?',
        options: ['Pesisir Pameungpeuk, Garut', 'Pantai Pelabuhan Ratu', 'Ancol Jakarta', 'Pesisir Pangandaran'],
        correctAnswer: 0,
        explanation: 'Paus Biru tersebut terdampar di pantai Pameungpeuk Garut pada bulan Desember 1916.',
      },
      {
        id: 'mz_4',
        question: 'Berapa total estimasi jumlah spesimen fauna yang dikonservasi oleh spesialis museum zoologi ini?',
        options: ['2,7 Juta spesimen', '10.000 spesimen', '100.000 spesimen', '50.000 spesimen'],
        correctAnswer: 0,
        explanation: 'Museum ini menyimpan lebih dari 2.768.000 spesimen fauna dari seluruh pelosok Nusantara.',
      },
      {
        id: 'mz_5',
        question: 'Berapa jumlah ruang pameran diorama yang menyajikan keanekaragaman hayati hewan di museum ini?',
        options: ['122 Display Diorama', '10 Diorama', '500 Diorama', '5 Diorama'],
        correctAnswer: 0,
        explanation: 'Terdapat 122 ruang pameran diorama fauna bertema ekosistem alam.',
      },
    ],
  },
  {
    id: 'prasasti_batutulis',
    name: 'Prasasti Batutulis',
    category: 'sejarah',
    builtOrFounded: 'Tahun 1533 M (1455 Saka)',
    address: 'Jl. Batutulis No.54, Batutulis, Bogor Selatan',
    coordinates: { lat: -6.6133, lng: 106.8083 },
    operatingHours: 'Setiap Hari 08.00 - 17.00 WIB',
    priceRange: 'Donasi Sukarela',
    overview:
      'Prasasti batu peninggalan Kerajaan Sunda Pajajaran yang dibuat oleh Prabu Surawisesa pada tahun 1533 M untuk mengenang ayahandanya, Sri Baduga Maharaja (Prabu Siliwangi).',
    uniqueFacts: [
      'Ditulis menggunakan bahasa Sunda Kuno dengan aksara Sunda Kuno.',
      'Di dekatnya terdapat batu tapak kaki dan batu tempat berdirinya bendera kerajaan.',
      'Situs ini dikelilingi kompleks batu megalitikum Purwakali & Kidang Pinanjung.',
      'Menjadi bukti otentik pusat pemerintahan Pakuan Pajajaran berada di Kota Bogor.',
    ],
    audioNarration:
      'Prasasti Batutulis memuat 12 baris kalimat Sunda Kuno. Dibuat oleh Raja Surawisesa sebagai penghormatan atas kejayaan Prabu Siliwangi yang memakmurkan tanah Sunda Pakuan Pajajaran.',
    image: generateAnimatedSvg("Prasasti Batutulis", "sejarah"),
    artsCultureUrl: 'https://artsandculture.google.com/search?q=Batutulis%20Inscription',
    googleMapsUrl: 'https://maps.google.com/?q=Prasasti+Batutulis',
    xpReward: 200,
    creatorAssetId: 'dika_stone',
    trivia: [
      {
        id: 'pb_1',
        question: 'Raja Sunda Pajajaran siapakah yang memerintahkan pembuatan Prasasti Batutulis pada tahun 1533 M?',
        options: ['Prabu Surawisesa', 'Prabu Siliwangi', 'Raja Purnawarman', 'Tarusbawa'],
        correctAnswer: 0,
        explanation: 'Prabu Surawisesa membuat prasasti ini untuk mengenang keagungan ayahnya, Sri Baduga Maharaja.',
      },
      {
        id: 'pb_2',
        question: 'Siapakah nama Raja agung yang dikenang dalam tulisan inskripsi Prasasti Batutulis?',
        options: ['Sri Baduga Maharaja (Prabu Siliwangi)', 'Kertanegara', 'Sanjaya', 'Hayam Wuruk'],
        correctAnswer: 0,
        explanation: 'Inskripsi memuji karya besar Sri Baduga Maharaja Prabu Siliwangi.',
      },
      {
        id: 'pb_3',
        question: 'Aksara dan bahasa apakah yang dipahat pada batu Prasasti Batutulis?',
        options: ['Bahasa & Aksara Sunda Kuno', 'Bahasa Jawa Kuno & Aksara Hanacaraka', 'Bahasa Arab & Aksara Pegon', 'Bahasa Belanda'],
        correctAnswer: 0,
        explanation: 'Prasasti dipahat dalam 12 baris tulisan Sunda Kuno.',
      },
      {
        id: 'pb_4',
        question: 'Apa arti dari kata "Batutulis"?',
        options: ['Batu Bertulis', 'Batu Hitam', 'Batu Kerajaan', 'Batu Suci'],
        correctAnswer: 0,
        explanation: 'Secara etimologi bahasa Sunda, Batutulis berarti batu yang diberi inskripsi/tulisan.',
      },
      {
        id: 'pb_5',
        question: 'Situs megalitikum kuno Purwakali dan Kidang Pinanjung yang berada di area Batutulis berasal dari tradisi jaman apa?',
        options: ['Tradisi Polynesia / Megalitikum', 'Zaman Modern', 'Era Kolonial VOC', 'Masa Pendudukan Jepang'],
        correctAnswer: 0,
        explanation: 'Arca kuno Purwakali dan Kidang Pinanjung merupakan artefak masa pra-sejarah megalitikum.',
      },
    ],
  },
  {
    id: 'gereja_zebaoth',
    name: 'Gereja Zebaoth Bogor',
    category: 'sejarah',
    builtOrFounded: '30 Januari 1838 (Pondasi 1835)',
    address: 'Jl. Ir. H. Juanda No.3, Paledang, Bogor Tengah',
    coordinates: { lat: -6.598, lng: 106.7935 },
    operatingHours: 'Setiap Hari (Jam Ibadah)',
    priceRange: 'Gratis',
    overview:
      'Gereja Protestan tertua di Bogor yang dibangun pada masa pemerintahan Hindia Belanda. Terkenal dengan julukan "Gereja Ayam" karena ornamen penunjuk angin berbentuk ayam jago di puncak menaranya.',
    uniqueFacts: [
      'Dahulu dinamakan Koningin Wilhelmina Kerk untuk kalangan bangsawan Belanda.',
      'Kata "Zebaoth" berasal dari bahasa Ibrani yang berarti "Tuhan Semesta Alam / Balatentara".',
      'Arsitektur kolonial Eropa klasik yang masih sangat terawat di samping Kebun Raya.',
    ],
    audioNarration:
      'Gereja Zebaoth dibangun pada tahun 1835. Letaknya persis di samping Kebun Raya Bogor dengan menari klasik khas Eropa kolonial.',
    image: generateAnimatedSvg("Gereja Zebaoth Bogor", "sejarah"),
    googleMapsUrl: 'https://maps.google.com/?q=Gereja+Zebaoth+Bogor',
    xpReward: 150,
    trivia: [
      {
        id: 'gz_1',
        question: 'Apa julukan populer masyarakat Bogor untuk Gereja Zebaoth karena simbol penunjuk angin di menaranya?',
        options: ['Gereja Ayam', 'Gereja Merpati', 'Gereja Kujang', 'Gereja Merah'],
        correctAnswer: 0,
        explanation: 'Warga sering menyebutnya Gereja Ayam karena ornamen ayam jago besi di puncak menara.',
      },
      {
        id: 'gz_2',
        question: 'Apa arti kata "Zebaoth" yang berasal dari bahasa Ibrani?',
        options: ['Tuhan Semesta Alam / Balatentara', 'Tempat Damai', 'Rumah Doa', 'Kota Suci'],
        correctAnswer: 0,
        explanation: 'Zebaoth dalam Kitab Suci bermakna Yahweh Sebaoth: Lord of Hosts / Tuhan Balatentara.',
      },
      {
        id: 'gz_3',
        question: 'Siapakah Ratu Belanda yang namanya diabadikan sebagai nama awal gereja ini pada masa kolonial?',
        options: ['Ratu Wilhelmina', 'Ratu Juliana', 'Ratu Beatrix', 'Ratu Elizabeth'],
        correctAnswer: 0,
        explanation: 'Awalnya dinamai Koningin Wilhelmina Kerk untuk menghormati Ratu Wilhelmina.',
      },
      {
        id: 'gz_4',
        question: 'Pada abad berapakah bangunan gereja bernilai cagar budaya ini pertama kali didirikan?',
        options: ['Abad ke-19 (1835)', 'Abad ke-15', 'Abad ke-21', 'Abad ke-17'],
        correctAnswer: 0,
        explanation: 'Batu pertama diletakkan pada tahun 1835 di abad ke-19.',
      },
      {
        id: 'gz_5',
        question: 'Terletak di dekat landmark penting manakah Gereja Zebaoth berada di pusat Kota Bogor?',
        options: ['Di samping Kebun Raya Bogor', 'Di Stasiun Bogor', 'Di Puncak Cisarua', 'Di Gunung Salak'],
        correctAnswer: 0,
        explanation: 'Gereja ini berlokasi strategis di Jl. Ir. H. Juanda persis di samping Kebun Raya.',
      },
    ],
  },
  {
    id: 'monumen_kujang',
    name: 'Monumen Kujang',
    category: 'sejarah',
    builtOrFounded: '4 Mei 1982',
    address: 'Jl. Raya Pajajaran No.1A, Baranangsiang, Bogor Timur',
    coordinates: { lat: -6.6013, lng: 106.8055 },
    operatingHours: '24 Jam Akses Publik',
    priceRange: 'Gratis',
    overview:
      'Landmark dan simbol kebanggaan Kota Bogor setinggi 25 meter. Puncaknya dihiasi ornamen Kujang seberat 800 kg terbuat dari perunggu dan kuningan.',
    uniqueFacts: [
      'Kujang adalah senjata tradisional khas masyarakat Sunda bermakna filosofis tinggi.',
      'Diresmikan oleh Wali Kota Bogor Achmad Sobana pada 4 Mei 1982.',
      'Memiliki ornamen Kujang berlekuk 7 dengan lubang lambang keagungan.',
      'Di plaza monumen terdapat duplikat Prasasti Batutulis dan Prasasti Lingga.',
    ],
    audioNarration:
      'Monumen Kujang berdiri megah di persimpangan utama Kota Bogor. Senjata Kujang melambangkan keberanian, ketajaman pikiran, dan simbol kedaulatan rakyat Sunda Pakuan Pajajaran.',
    image: generateAnimatedSvg("Monumen Kujang", "sejarah"),
    googleMapsUrl: 'https://maps.google.com/?q=Monumen+Kujang+Bogor',
    xpReward: 150,
    creatorAssetId: 'batik_tradisiku',
    trivia: [
      {
        id: 'mk_1',
        question: 'Senjata tradisional khas suku apakah yang diabadikan menjadi bentuk utama Monumen Kujang?',
        options: ['Senjata Kujang khas Sunda', 'Keris Jawa', 'Rencong Aceh', 'Mandau Dayak'],
        correctAnswer: 0,
        explanation: 'Kujang adalah senjata sakral dan perkakas filosofis kebanggaan masyarakat Sunda.',
      },
      {
        id: 'mk_2',
        question: 'Berapakah tinggi total tugu beton penopang Monumen Kujang di persimpangan Baranangsiang?',
        options: ['25 meter (Senjata Kujang 6m)', '100 meter', '10 meter', '50 meter'],
        correctAnswer: 0,
        explanation: 'Tinggi tugu beton adalah 17m/25m dengan patung Kujang setinggi 6 meter di puncaknya.',
      },
      {
        id: 'mk_3',
        question: 'Pada tahun berapakah Monumen Kujang diresmikan sebagai ikon Kota Bogor?',
        options: ['1982', '1945', '2010', '1905'],
        correctAnswer: 0,
        explanation: 'Monumen Kujang diresmikan pada 4 Mei 1982 oleh Walikota Achmad Sobana.',
      },
      {
        id: 'mk_4',
        question: 'Bahan logam apakah yang melapis patung Kujang seberat 800 kg di puncak monumen?',
        options: ['Perunggu dan Kuningan', 'Emas Murni 24K', 'Besi Tua', 'Aluminium Foil'],
        correctAnswer: 0,
        explanation: 'Patung Kujang terbuat dari ornamen stainless steel berlapis perunggu dan kuningan.',
      },
      {
        id: 'mk_5',
        question: 'Prasasti apakah yang replikanya dibuat di area plaza Monumen Kujang?',
        options: ['Prasasti Batutulis dan Lingga', 'Prasasti Ciaruteun', 'Prasasti Yupa', 'Prasasti Kalasan'],
        correctAnswer: 0,
        explanation: 'Plaza monumen dilengkapi duplikat Prasasti Batutulis dan Prasasti Lingga.',
      },
    ],
  },
  {
    id: 'museum_peta',
    name: 'Museum PETA (Pembela Tanah Air)',
    category: 'sejarah',
    builtOrFounded: '18 Desember 1995 (Gedung sejak 1943)',
    address: 'Jl. Jenderal Sudirman No.35, Pabaton, Bogor Tengah',
    coordinates: { lat: -6.5891, lng: 106.7936 },
    operatingHours: 'Senin-Jumat 08.00 - 15.00 WIB',
    priceRange: 'Gratis / Donasi',
    overview:
      'Gedung bersejarah pusat pelatihan Tentara PETA pada masa pendudukan Jepang. Diresmikan sebagai museum tentara PETA oleh Presiden Soeharto pada tahun 1995.',
    uniqueFacts: [
      'Bogor dipilih Jepang sebagai pusat markas Daidanco/Perwira PETA seluruh Jawa dan Madura.',
      'Memiliki 14 diorama sejarah perjuangan perwira PETA melahirkan cikal bakal TNI.',
      'Pahlawan seperti Jenderal Soedirman dan Supriyadi pernah mengenyam pendidikan tentara di sini.',
    ],
    audioNarration:
      'Museum PETA memperingati sejarah berdirinya tentara Pembela Tanah Air tahun 1943. Di sinilah para pemuda gemblengan PETA dilatih hingga menjadi cikal bakal Tentara Nasional Indonesia.',
    image: generateAnimatedSvg("Museum PETA (Pembela Tanah Air)", "sejarah"),
    googleMapsUrl: 'https://maps.google.com/?q=Museum+PETA+Bogor',
    xpReward: 170,
    trivia: [
      {
        id: 'mp_1',
        question: 'Singkatan dari apakah "PETA" dalam sejarah perjuangan kemerdekaan Indonesia?',
        options: ['Pembela Tanah Air', 'Prajurit Terdepan Aman', 'Pasukan Tentara Asli', 'Pejuang Tanah Air'],
        correctAnswer: 0,
        explanation: 'PETA adalah singkatan dari Pembela Tanah Air yang dibentuk pada tahun 1943.',
      },
      {
        id: 'mp_2',
        question: 'Siapakah Panglima Besar TNI pertama yang pernah mengenyam pendidikan perwira PETA di gedung ini?',
        options: ['Jenderal Soedirman', 'Jenderal Oerip Soemohardjo', 'Jenderal Ahmad Yani', 'Jenderal Gatot Subroto'],
        correctAnswer: 0,
        explanation: 'Jenderal Soedirman merupakan alumni perwira PETA lulusan markas Bogor.',
      },
      {
        id: 'mp_3',
        question: 'Berapa jumlah diorama yang menceritakan peristiwa penting sejarah PETA di dalam museum ini?',
        options: ['14 Diorama', '5 Diorama', '50 Diorama', '1 Diorama'],
        correctAnswer: 0,
        explanation: 'Museum menampilkan 14 diorama kronologis sejarah pembentukan hingga pemberontakan PETA.',
      },
      {
        id: 'mp_4',
        question: 'Pada tahun berapakah museum ini diresmikan oleh Presiden Soeharto?',
        options: ['1995', '1945', '2020', '1965'],
        correctAnswer: 0,
        explanation: 'Diresmikan pada 18 Desember 1995 sebagai Monumen & Museum PETA.',
      },
      {
        id: 'mp_5',
        question: 'Tentara pendudukan negara manakah yang mendirikan pusat pendidikan PETA di Bogor pada tahun 1943?',
        options: ['Jepang', 'Belanda', 'Inggris', 'Portugal'],
        correctAnswer: 0,
        explanation: 'PETA dibentuk oleh pemerintah militer Jepang pada bulan Oktober 1943.',
      },
    ],
  },
  {
    id: 'museum_perjuangan',
    name: 'Museum Perjuangan Bogor',
    category: 'sejarah',
    builtOrFounded: '1957 (Diresmikan 15 Agustus 1958)',
    address: 'Jl. Merdeka No.56, Ciwaringin, Bogor Tengah',
    coordinates: { lat: -6.5925, lng: 106.7885 },
    operatingHours: 'Setiap Hari 08.00 - 16.00 WIB',
    priceRange: 'Rp 5.000 - Rp 10.000',
    overview:
      'Menyimpan artefak, senjata, seragam berdarah pejuang, dokumen, dan diorama pertempuran rakyat Bogor mempertahankan kemerdekaan periode 1945–1950.',
    uniqueFacts: [
      'Gedung museum merupakan peninggalan Belanda yang dibangun sekitar tahun 1879.',
      'Menyimpan pakaian asli berdarah milik Kapten Muslihat yang gugur di medan perang.',
      'Koleksi mata uang darurat (ORIDA) dan senjata rampasan perang.',
    ],
    audioNarration:
      'Museum Perjuangan Bogor merekam keberanian laskar rakyat dan tentara mempertahankan Kota Bogor dari agresi Belandapasca Proklamasi 1945.',
    image: generateAnimatedSvg("Museum Perjuangan Bogor", "sejarah"),
    googleMapsUrl: 'https://maps.google.com/?q=Museum+Perjuangan+Bogor',
    xpReward: 160,
    trivia: [
      {
        id: 'mpg_1',
        question: 'Benda peninggalan berjarah milik pahlawan Kapten Muslihat apakah yang dipajang di museum ini?',
        options: ['Seragam dinas asli berbecak darah', 'Sepeda tua', 'Kacamata hitam', 'Pedang Samurai'],
        correctAnswer: 0,
        explanation: 'Museum memajang seragam berdarah Kapten Muslihat saat beliau gugur di persimpangan stasiun.',
      },
      {
        id: 'mpg_2',
        question: 'Pada rentang periode tahun berapakah perjuangan rakyat Bogor yang secara khusus didokumentasikan di museum ini?',
        options: ['Periode 1945 – 1950', 'Periode 1500 – 1600', 'Periode 2000 – 2010', 'Periode Kuno'],
        correctAnswer: 0,
        explanation: 'Museum mendokumentasikan era perang revolusi fisik mempertahankan kemerdekaan 1945-1950.',
      },
      {
        id: 'mpg_3',
        question: 'Gedung museum dibangun sejak masa kolonial Belanda pada tahun sekitar berapa?',
        options: ['Tahun 1879', 'Tahun 1999', 'Tahun 1500', 'Tahun 1980'],
        correctAnswer: 0,
        explanation: 'Gedung peninggalan Belanda ini didirikan sekitar tahun 1879 sebagai kantor komersial.',
      },
      {
        id: 'mpg_4',
        question: 'Jenis mata uang lokal darurat apakah yang pernah dicetak di Bogor dan disimpan koleksinya di sini?',
        options: ['ORIDA (Oeang Republik Indonesia Daerah)', 'Rupiah Digital', 'Euro', 'Gulden VOC'],
        correctAnswer: 0,
        explanation: 'Museum menyimpan koleksi uang kertas ORIDA Bogor masa gerilya.',
      },
      {
        id: 'mpg_5',
        question: 'Pada bulan dan tahun berapakah museum ini diresmikan oleh para veteran pejuang Bogor?',
        options: ['15 Agustus 1958', '17 Agustus 1945', '10 November 1960', '1 Januari 2000'],
        correctAnswer: 0,
        explanation: 'Diresmikan para tokoh veteran Bogor pada 15 Agustus 1958.',
      },
    ],
  },
  {
    id: 'stasiun_bogor',
    name: 'Stasiun Bogor',
    category: 'sejarah',
    builtOrFounded: '1881',
    address: 'Jl. Nyi Raja Permas, Cibogor, Bogor Tengah',
    coordinates: { lat: -6.5947, lng: 106.7904 },
    operatingHours: '04.00 - 24.00 WIB',
    priceRange: 'Tarif KRL Commuterline',
    overview:
      'Stasiun kereta api cagar budaya peninggalan Hindia Belanda yang dibuka pada tahun 1881. Merupakan stasiun terminus tersibuk jalur KRL Jakarta-Bogor.',
    uniqueFacts: [
      'Gaya arsitektur Indische Neoclassic dengan prasasti peresmian tahun 1881.',
      'Melayani ratusan ribu komuter dan wisatawan setiap harinya.',
      'Gerbang utama menuju kawasan wisata Kebun Raya & Istana Bogor.',
    ],
    audioNarration:
      'Stasiun Bogor beroperasi sejak awal 1880-an. Arsitektur bergaya klasik neoklasik Eropa ini saksi bisu perkembangan transportasi perkeretaapian Pulau Jawa.',
    image: generateAnimatedSvg("Stasiun Bogor", "sejarah"),
    googleMapsUrl: 'https://maps.google.com/?q=Stasiun+Bogor',
    xpReward: 140,
    trivia: [
      {
        id: 'sb_1',
        question: 'Pada tahun berapakah Stasiun Bogor peninggalan Belanda ini pertama kali resmi dibuka?',
        options: ['1881', '1945', '1750', '1990'],
        correctAnswer: 0,
        explanation: 'Stasiun Bogor selesai dibangun dan diresmikan pada tahun 1881 oleh Nederlandsch-Indische Spoorweg Maatschappij.',
      },
      {
        id: 'sb_2',
        question: 'Gaya arsitektur apakah yang mendominasi façade bangunan cagar budaya Stasiun Bogor?',
        options: ['Indische Neoclassic', 'Modern Minimalis', 'Gothic', 'Traditional Joglo'],
        correctAnswer: 0,
        explanation: 'Gaya arsitektur neoklasik Hindia Belanda khas akhir abad ke-19.',
      },
      {
        id: 'sb_3',
        question: 'Jalur kereta Commuter Line siapakah yang menjadikan Stasiun Bogor sebagai stasiun tujuan akhir utama?',
        options: ['Lintas Jakarta Kota - Bogor', 'Lintas Bandung - Jogja', 'Lintas Surabaya - Malang', 'Lintas Merak - Serang'],
        correctAnswer: 0,
        explanation: 'Stasiun Bogor merupakan terminus selatan KRL Commuter Line Jabodetabek.',
      },
      {
        id: 'sb_4',
        question: 'Siapakah pahlawan perjuangan Bogor yang gugur dalam pertempuran sengit tepat di depan areal Stasiun Bogor pada 1945?',
        options: ['Kapten Muslihat', 'Raden Saleh', 'Ir. Djuanda', 'Moh. Natsir'],
        correctAnswer: 0,
        explanation: 'Kapten Muslihat gugur secara heroik di depan stasiun saat memimpin serangan ke markas Gurkha/Belanda.',
      },
      {
        id: 'sb_5',
        question: 'Terletak dekat dengan tempat wisata manakah Stasiun Bogor ini sehingga menjadi pintu gerbang wisatawan?',
        options: ['Kebun Raya Bogor & Taman Topi', 'Pantai Parangtritis', 'Taman Mini Indonesia Indah', 'Kawah Putih'],
        correctAnswer: 0,
        explanation: 'Hanya berjarak beberapa ratus meter dari pintu masuk Kebun Raya & Istana Bogor.',
      },
    ],
  },
  {
    id: 'prasasti_ciaruteun',
    name: 'Prasasti Ciaruteun',
    category: 'sejarah',
    builtOrFounded: 'Sekitar Abad ke-5 Masehi',
    address: 'Desa Ciaruteun Ilir, Cibungbulang, Kab. Bogor',
    coordinates: { lat: -6.5255, lng: 106.6922 },
    operatingHours: 'Setiap Hari 08.00 - 16.00 WIB',
    priceRange: 'Donasi Sukarela',
    overview:
      'Prasasti peninggalan Kerajaan Tarumanagara abad ke-5 M yang memuat pahatan telapak kaki Raja Purnawarman, lukisan laba-laba, serta puisi 4 baris beraksara Pallawa.',
    uniqueFacts: [
      'Pahatan telapak kaki melambangkan kekuasaan Raja Purnawarman disamakan dengan kaki Dewa Wisnu.',
      'Ditulis menggunakan Bahasa Sanskerta dan Aksara Pallawa.',
      'Ditetapkan sebagai Cagar Budaya Nasional saksi sejarah tertua Nusantara.',
    ],
    audioNarration:
      'Prasasti Ciaruteun merupakan salah satu prasasti batu tertua di Pulau Jawa. Dipahat pada masa Raja Purnawarman dari Kerajaan Tarumanagara pada abad ke-5 Masehi.',
    image: generateAnimatedSvg("Prasasti Ciaruteun", "sejarah"),
    artsCultureUrl: 'https://artsandculture.google.com/search?q=Ciaruteun%20Inscription',
    googleMapsUrl: 'https://maps.google.com/?q=Prasasti+Ciaruteun',
    xpReward: 200,
    trivia: [
      {
        id: 'pc_1',
        question: 'Kerajaan tertua manakah di Jawa Barat yang mengeluarkan Prasasti Ciaruteun pada abad ke-5 M?',
        options: ['Kerajaan Tarumanagara', 'Kerajaan Majapahit', 'Kerajaan Sriwijaya', 'Kerajaan Mataram Kuno'],
        correctAnswer: 0,
        explanation: 'Prasasti Ciaruteun dikeluarkan oleh Raja Purnawarman dari Kerajaan Tarumanagara.',
      },
      {
        id: 'pc_2',
        question: 'Telapak kaki siapakah yang dipahat pada permukaan batu Prasasti Ciaruteun dan disamakan dengan kaki Dewa Wisnu?',
        options: ['Raja Purnawarman', 'Prabu Siliwangi', 'Hayang Wuruk', 'Sanjaya'],
        correctAnswer: 0,
        explanation: 'Ukiran kaki milik Raja Purnawarman diibaratkan legak kaki Dewa Wisnu pemelihara alam.',
      },
      {
        id: 'pc_3',
        question: 'Aksara kuno dan bahasa apakah yang dipergunakan dalam inskripsi Prasasti Ciaruteun?',
        options: ['Aksara Pallawa & Bahasa Sanskerta', 'Aksara Latin & Bahasa Indonesia', 'Aksara Jawa & Bahasa Jawa', 'Aksara Katakana'],
        correctAnswer: 0,
        explanation: 'Menggunakan huruf Pallawa India Selatan dan Bahasa Sanskerta.',
      },
      {
        id: 'pc_4',
        question: 'Gambar fauna simbolis apakah yang terpahat di samping ukiran telapak kaki raja?',
        options: ['Lukisan Laba-Laba', 'Gambar Rusa', 'Gambar Gajah', 'Gambar Harimau'],
        correctAnswer: 0,
        explanation: 'Terdapat lukisan laba-laba unik di samping inskripsi prasasti.',
      },
      {
        id: 'pc_5',
        question: 'Di tepi aliran sungai manakah prasasti batu alam ini pertama kali ditemukan?',
        options: ['Sungai Ciaruteun & Cisadane', 'Sungai Citarum', 'Sungai Musi', 'Sungai Bengawan Solo'],
        correctAnswer: 0,
        explanation: 'Prasasti ditemukan di muara Sungai Ciaruteun dekat pertemuan Cisadane.',
      },
    ],
  },
];

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: 'prabu_siliwangi',
    name: 'Prabu Siliwangi (Sri Baduga Maharaja)',
    title: 'Raja Terbesar Kerajaan Sunda Pakuan Pajajaran',
    profile:
      'Raja paling legendaris yang membawa Kerajaan Sunda Pajajaran mencapai puncak kejayaan (1482-1521). Memindahkan pusat kerajaan ke Pakuan Bogor, membangun benteng pertahanan, telaga Mahawijaya, dan hutan lindung Samida.',
    uniqueFacts: [
      'Pusat pemerintahan Pakuan Pajajaran bertempat di wilayah Bogor.',
      'Namanya diabadikan menjadi Jalan Siliwangi dan Kodam III/Siliwangi.',
      'Prasasti Batutulis didirikan oleh putranya Prabu Surawisesa untuk mengabadikan keagungannya.',
    ],
    image: generateAnimatedSvg("Raja Terbesar Kerajaan Sunda Pakuan Pajajaran", "sejarah"),
    locationRef: 'prasasti_batutulis',
  },
  {
    id: 'raden_saleh',
    name: 'Raden Saleh Syarif Bustaman (1811–1880)',
    title: 'Sang Pelukis Raja & Perintis Seni Lukis Modern Indonesia',
    profile:
      'Pelukis internasional pertama Indonesia berdarah Arab-Jawa. Menempuh pendidikan seni di Belanda, Prancis, dan Jerman. Karya termahurnya "Penangkapan Pangeran Diponegoro" (1857). Menghabiskan masa tua dan dimakamkan di Bondongan, Bogor.',
    uniqueFacts: [
      'Bakatnya dikembangkan oleh Prof. C.G.C. Reinwardt pendiri Kebun Raya Bogor.',
      'Makamnya di Bondongan Bogor dilengkapi bangunan Joglo tradisional Jawa.',
      'Lukisannya menghiasi museum-museum ternama Eropa dan Istana Negara.',
    ],
    image: generateAnimatedSvg("Sang Pelukis Raja & Perintis Seni Lukis Modern Indonesia", "sejarah"),
    locationRef: 'kebun_raya_bogor',
  },
  {
    id: 'mohammad_natsir',
    name: 'Mohammad Natsir',
    title: 'Perdana Menteri RI (1950–1951) & Tokoh Mosi Integral',
    profile:
      'Pahlawan Nasional, cendekiawan Muslim, dan Perdana Menteri Indonesia. Pencetus "Mosi Integral Natsir" tahun 1950 yang berhasil menyatukan kembali Republik Indonesia Serikat (RIS) menjadi Negara Kesatuan Republik Indonesia (NKRI).',
    uniqueFacts: [
      'Mosi Integral Natsir mengembalikan keutuhan NKRI secara damai.',
      'Menghabiskan masa tua di Bogor dan dimakamkan di TPU Bantarjati Bogor.',
    ],
    image: generateAnimatedSvg("Perdana Menteri RI (1950–1951) & Tokoh Mosi Integral", "sejarah"),
  },
  {
    id: 'ir_djuanda',
    name: 'Ir. Djuanda Kartawidjaja',
    title: 'Pencetus Deklarasi Djuanda & Perdana Menteri RI',
    profile:
      'Pahlawan Nasional dan Perdana Menteri Indonesia (1957–1959). Mencetuskan Deklarasi Djuanda pada 13 Desember 1957 yang menyatukan seluruh wilayah perairan antarpulai Indonesia menjadi satu kesatuan kedaulatan maritim.',
    uniqueFacts: [
      'Deklarasi Djuanda menggandakan wilayah laut Indonesia dari 3 mil menjadi 12 mil & ZEE 200 mil.',
      'Diakui oleh hukum laut internasional Konvensi PBB (UNCLOS).',
      'Namanya diabadikan menjadi Jalan Ir. H. Juanda, jalan utama pusat Kota Bogor.',
    ],
    image: generateAnimatedSvg("Pencetus Deklarasi Djuanda & Perdana Menteri RI", "sejarah"),
    locationRef: 'istana_bogor',
  },
  {
    id: 'raja_purnawarman',
    name: 'Raja Purnawarman',
    title: 'Raja Agung Kerajaan Tarumanagara Abad ke-5 M',
    profile:
      'Raja terbesar Tarumanagara yang gagah berani. Memerintahkan penggalian terusan Sungai Gomati sepanjang 12 km untuk irigasi dan cegah banjir. Jejak telapak kakinya dipahat di Prasasti Ciaruteun.',
    uniqueFacts: [
      'Menguasai wilayah barat Pulau Jawa dari Bogor hingga pesisir utara.',
      'Meninggalkan banyak prasasti batu aksara Pallawa.',
    ],
    image: generateAnimatedSvg("Raja Agung Kerajaan Tarumanagara Abad ke-5 M", "sejarah"),
    locationRef: 'prasasti_ciaruteun',
  },
  {
    id: 'kapten_muslihat',
    name: 'Kapten Tubagus Muslihat',
    title: 'Pahlawan Muda Perjuangan Kemerdekaan Bogor',
    profile:
      'Komandan Kompi Laskar Rakyat Bogor yang memimpin pertempuran sengit melawan pasukan Gurkha & Belanda pada 25 Desember 1945. Gugur di usia muda 19 tahun demi mempertahankan kemerdekaan.',
    uniqueFacts: [
      'Namanya diabadikan menjadi Jalan Kapten Muslihat depan Stasiun Bogor.',
      'Patung monumen peringatannya berdiri tegak di Taman Kapten Muslihat.',
    ],
    image: generateAnimatedSvg("Pahlawan Muda Perjuangan Kemerdekaan Bogor", "sejarah"),
    locationRef: 'stasiun_bogor',
  },
];

export const LEGENDARY_CUISINE: CulinaryItem[] = [
  {
    id: 'soto_mie_bogor',
    name: 'Soto Mie Bogor',
    category: 'legendaris',
    overview:
      'Mi kuning, risoles renyah, kikil/daging sapi, tomat, dan emping yang disiram kuah kaldu gurih berbumbu rempah khas.',
    uniqueFacts: [
      'Risoles renyah isi bihun merupakan pembeda utama Soto Mie Bogor dibanding soto daerah lain.',
      'Biasa disajikan hangat dengan perasan jeruk limau dan sambal cabai rawit.',
    ],
    image: generateAnimatedSvg("Soto Mie Bogor", "legendaris"),
    priceRange: 'Rp 18.000 - Rp 35.000',
    recommendedSpots: [
      { name: 'Soto Mie Bogor Mang Ohim', address: 'Jl. Taman Cimanggu No.22', rating: 4.7 },
      { name: 'Soto Mie Agih (Suryakencana)', address: 'Jl. Suryakencana No.311', rating: 4.6 },
    ],
  },
  {
    id: 'asinan_bogor',
    name: 'Asinan Bogor',
    category: 'legendaris',
    overview:
      'Olahan buah segar (mangga, kedondong, salak, ubi) atau sayuran (tauge, kol, sawi, lokio) disiram kuah cuka manis pedas gurih tabur kacang tanah goreng.',
    uniqueFacts: [
      'Ikon oleh-oleh paling terkenal dari Bogor sejak puluhan tahun lalu.',
      'Menggunakan cuka alami khas dan kacang goreng renyah.',
    ],
    image: generateAnimatedSvg("Asinan Bogor", "legendaris"),
    priceRange: 'Rp 25.000 - Rp 40.000',
    recommendedSpots: [
      { name: 'Asinan Gedung Dalam', address: 'Jl. Siliwangi No.27, Bogor Timur', rating: 4.6 },
      { name: 'Asinan Ahaw Suryakencana', address: 'Jl. Suryakencana No.303', rating: 4.7 },
    ],
  },
  {
    id: 'laksa_bogor',
    name: 'Laksa Bogor',
    category: 'legendaris',
    overview:
      'Bihun, ketupat, tauge, daun kemangi, tahu, dan telur disiram kuah santan kuning kaya rempah dengan ciri khas taburan oncom goreng.',
    uniqueFacts: [
      'Oncom merah goreng memberikan cita rasa umami khas Sunda Bogor.',
      'Kuah santan dimasak dengan racikan serundeng kelapa sangrai.',
    ],
    image: generateAnimatedSvg("Laksa Bogor", "legendaris"),
    priceRange: 'Rp 20.000 - Rp 30.000',
    recommendedSpots: [
      { name: 'Laksa Auto 1000 (Gang Aut)', address: 'Jl. Suryakencana Gang Aut', rating: 4.8 },
      { name: 'Laksa Mang Wahyu', address: 'Jl. Mahakam No. 1', rating: 4.6 },
    ],
  },
  {
    id: 'doclang',
    name: 'Doclang',
    category: 'legendaris',
    overview:
      'Pesor (lontong dibungkus daun patat), tahu goreng, kentang rebus, dan telur rebus yang disiram bumbu kacang kental renyah kerupuk.',
    uniqueFacts: [
      'Lontong dikukus menggunakan pembungkus daun patat alami memberi aroma harum.',
      'Nama "Doclang" berasal dari akronim bumbu "Medok Pake Kacang".',
    ],
    image: generateAnimatedSvg("Doclang", "legendaris"),
    priceRange: 'Rp 15.000 - Rp 25.000',
    recommendedSpots: [
      { name: 'Doclang Bapak Odik', address: 'Jl. Pasarkuta, Jembatan Merah', rating: 4.7 },
      { name: 'Doclang Pak Mantao', address: 'Jl. Veteran No.9', rating: 4.6 },
    ],
  },
  {
    id: 'toge_goreng',
    name: 'Toge Goreng',
    category: 'legendaris',
    overview:
      'Tauge segar, mie kuning, tahu, dan ketupat disiram kuah tauco gurih fermented dan bumbu oncom merah.',
    uniqueFacts: [
      'Meski dinamakan "goreng", tauge sebenarnya direbus di atas nampan tembaga khas.',
      'Menggunakan tauco khas Bogor yang menghasilkan rasa asam manis gurih alami.',
    ],
    image: generateAnimatedSvg("Toge Goreng", "legendaris"),
    priceRange: 'Rp 15.000 - Rp 22.000',
    recommendedSpots: [
      { name: 'Toge Goreng H. Gebro', address: 'Jl. Pengadilan No.29', rating: 4.7 },
      { name: 'Toge Goreng Ibu Evon', address: 'Jl. Mantarena No.19', rating: 4.5 },
    ],
  },
  {
    id: 'cungkring',
    name: 'Cungkring',
    category: 'legendaris',
    overview:
      'Kikil sapi, urat, bibir sapi, dan lontong yang disiram bumbu kacang khas manis gurih dilengkapi tempe goreng tepung renyah.',
    uniqueFacts: [
      'Cungkring berasal dari bahasa Sunda yang merujuk pada bahan kikil kulit sapi.',
      'Disajikan tradisional beralas daun pisang.',
    ],
    image: generateAnimatedSvg("Cungkring", "legendaris"),
    priceRange: 'Rp 18.000 - Rp 25.000',
    recommendedSpots: [
      { name: 'Cungkring Pak Friday', address: 'Jl. Suryakencana No.285', rating: 4.8 },
    ],
  },
  {
    id: 'roti_unyil',
    name: 'Roti Unyil Venus',
    category: 'legendaris',
    overview:
      'Roti mungil empuk berukuran sekali gigit dengan puluhan varian rasa favorit (cokelat, keju, sosis, jagung manis, abon).',
    uniqueFacts: [
      'Dipopulerkan oleh toko roti Venus Bakery sejak tahun 1992.',
      'Satu kotak biasa berisi 10 hingga 30 roti mini beraneka rasa.',
    ],
    image: generateAnimatedSvg("Roti Unyil Venus", "legendaris"),
    priceRange: 'Rp 3.500 / buah',
    recommendedSpots: [
      { name: 'Venus Bakery Roti Unyil', address: 'Jl. Pajajaran No.1', rating: 4.7 },
    ],
  },
  {
    id: 'lapis_talas',
    name: 'Lapis Talas Sangkuriang',
    category: 'legendaris',
    overview:
      'Bolu kukus berbahan komoditas talas lokal Bogor bernuansa warna ungu khas dengan parutan keju melimpah di atasnya.',
    uniqueFacts: [
      'Pelopor oleh-oleh bolu talas kukus modern Kota Bogor.',
      'Sangat lembut dan menjadi oleh-oleh wajib keluarga.',
    ],
    image: generateAnimatedSvg("Lapis Talas Sangkuriang", "legendaris"),
    priceRange: 'Rp 35.000 - Rp 45.000 / kotak',
    recommendedSpots: [
      { name: 'Lapis Bogor Sangkuriang', address: 'Jl. Pajajaran No.20', rating: 4.7 },
    ],
  },
  {
    id: 'pepes_sagu',
    name: 'Pepes Sagu Daniel',
    category: 'legendaris',
    overview:
      'Sagu manis kenyal dicampur parutan kelapa dan varian nangka/pisang/keju yang dibungkus daun pisang lalu dibakar aromatik.',
    uniqueFacts: [
      'Kuliner resep warisan kuno Sunda yang masih dipertahankan.',
      'Aroma daun pisang bakar yang khas dan menggugah selera.',
    ],
    image: generateAnimatedSvg("Pepes Sagu Daniel", "legendaris"),
    priceRange: 'Rp 10.000 - Rp 15.000',
    recommendedSpots: [
      { name: 'Pepes Sagu Daniel Suryakencana', address: 'Jl. Suryakencana No.325', rating: 4.8 },
    ],
  },
  {
    id: 'bika_bogor',
    name: 'Bika Bogor Talubi',
    category: 'legendaris',
    overview:
      'Kue bika bertekstur bersarang lembut berbahan olahan talas dan ubi madu pilihan khas Bogor.',
    uniqueFacts: ['Inovasi kue bika lokal bebas pengawet.', 'Varian rasa cocopandan, ubi ungu, dan keju.'],
    image: generateAnimatedSvg("Bika Bogor Talubi", "legendaris"),
    priceRange: 'Rp 38.000 - Rp 48.000',
    recommendedSpots: [{ name: 'Bika Bogor Talubi', address: 'Jl. Pajajaran No.20B', rating: 4.6 }],
  },
];

export const MODERN_RESTAURANTS: ModernRestaurant[] = [
  {
    id: 'medja_restaurant',
    name: 'Medja Restaurant',
    profile:
      'Restoran bernuansa taman tropis dengan area indoor & outdoor asri air mancur. Menyajikan menu khas Nusantara dan Western premium.',
    address: 'Jl. Pajajaran Indah V No.6, Baranangsiang, Bogor Timur',
    rating: 4.6,
    image: generateAnimatedSvg("Medja Restaurant", "legendaris"),
  },
  {
    id: 'two_stories',
    name: 'Two Stories',
    profile:
      'Restoran dan kafe rooftop berkonsep industrial modern dengan tagline Tell Your Story. Menjadi tempat favorit anak muda Bogor berkumpul.',
    address: 'Jl. Pajajaran Indah V No.7, Baranangsiang, Bogor Timur',
    rating: 4.5,
    image: generateAnimatedSvg("Two Stories", "legendaris"),
  },
  {
    id: 'gurih_7',
    name: 'Gurih 7 Bogor',
    profile:
      'Restoran khas Sunda berkonsep saung lesehan di atas kolam ikan dengan latar belakang air terjun buatan alami yang segar.',
    address: 'Jl. Raya Pajajaran No.102, Bantarjati, Bogor Utara',
    rating: 4.7,
    image: generateAnimatedSvg("Gurih 7 Bogor", "legendaris"),
  },
  {
    id: 'de_leuit',
    name: 'De’Leuit Restaurant',
    profile:
      'Restoran kuliner Sunda autentik dengan Nasi Jambal Khas De Leuit dan suasana saung keluarga modern.',
    address: 'Jl. Pakuan No.3, Baranangsiang, Bogor Timur',
    rating: 4.5,
    image: generateAnimatedSvg("De’Leuit Restaurant", "legendaris"),
  },
  {
    id: 'bumi_aki',
    name: 'Bumi Aki Bogor',
    profile:
      'Restoran Sunda favorit dengan sajian Gurame Bakar, Sate Kambing empuk, dan Nasi Liwet hangat khas pergunungan.',
    address: 'Jl. Raya Pajajaran No.51, Bantarjati, Bogor Utara',
    rating: 4.7,
    image: generateAnimatedSvg("Bumi Aki Bogor", "legendaris"),
  },
  {
    id: 'barcelona_glasshouse',
    name: 'Barcelona The Glass House',
    profile:
      'Restoran bergaya rumah kaca estetis dengan pemandangan hijau dan desain interior Eropa modern yang instagramable.',
    address: 'Jl. Pajajaran Indah V, Baranangsiang, Bogor Timur',
    rating: 4.5,
    image: generateAnimatedSvg("Barcelona The Glass House", "legendaris"),
  },
  {
    id: 'kedai_kita',
    name: 'Kedai Kita Taman Kencana',
    profile:
      'Restoran legendaris terkenal dengan Pizza Kayu Bakar renyah khas dan aneka hidangan hotplate nikmat.',
    address: 'Jl. Pangrango No.21, Babakan, Bogor Tengah',
    rating: 4.6,
    image: generateAnimatedSvg("Kedai Kita Taman Kencana", "legendaris"),
  },
  {
    id: 'macaroni_panggang',
    name: 'Macaroni Panggang (MP)',
    profile:
      'Restoran cagar budaya rumah tua kolonial yang menyajikan Macaroni Panggang keju panggang keemasan legendaris khas Bogor.',
    address: 'Jl. Salak No.24, Babakan, Bogor Tengah',
    rating: 4.6,
    image: generateAnimatedSvg("Macaroni Panggang (MP)", "legendaris"),
  },
];

export const TOURISM_DESTINATIONS: TourismDestination[] = [
  {
    id: 'curug_leuwi_hejo',
    name: 'Curug Leuwi Hejo (Green Canyon Sentul)',
    overview:
      'Air terjun dengan kolam alami berwarna hijau toska bening jernih di kawasan Babakan Madang Sentul. Destinasi favorit trekking dan berenang alami.',
    address: 'Desa Karang Tengah, Babakan Madang, Kab. Bogor',
    hours: 'Setiap Hari 08.00 - 17.00 WIB',
    ticketPrice: 'Rp 15.000',
    uniqueFacts: [
      'Dijuluki "Green Canyon Bogor" karena tebing batu dan air hijau toska bening.',
      'Satu lokasi dengan trekking Curug Barong, Cibaliung, dan Lieuk.',
    ],
    rating: 4.8,
    image: generateAnimatedSvg("Curug Leuwi Hejo (Green Canyon Sentul)", "legendaris"),
    coordinates: { lat: -6.592, lng: 106.915 },
  },
  {
    id: 'puncak_agrowisata_teh',
    name: 'Puncak Bogor & Agrowisata Teh Gunung Mas',
    overview:
      'Kawasan wisata pegunungan berudara sejuk dengan hamparan kebun teh hijau luas di ketinggian 800–1.200 mdpl. Dilengkapi wahana tea bridge dan berkuda.',
    address: 'Jl. Raya Puncak Gadog Km.87, Cisarua, Kab. Bogor',
    hours: 'Setiap Hari 06.00 - 18.00 WIB',
    ticketPrice: 'Rp 15.000 - Rp 25.000',
    uniqueFacts: [
      'Menyajikan jalur jalan di atas kebun teh "Tea Bridge" terpanjang.',
      'Pemandangan Gunung Gede Pangrango yang memesona.',
    ],
    rating: 4.7,
    image: generateAnimatedSvg("Puncak Bogor & Agrowisata Teh Gunung Mas", "legendaris"),
    coordinates: { lat: -6.702, lng: 106.992 },
  },
  {
    id: 'rustic_market_explore',
    name: 'Rustic Market Explore The Museum',
    overview:
      'Destinasi wisata bergaya pedesaan Eropa klasik dengan bangunan kayu rustic, taman Bunga, museum vintage, dan kafe estetik.',
    address: 'Kawasan Babakan Madang, Kab. Bogor',
    hours: 'Setiap Hari 10.00 - 20.00 WIB',
    ticketPrice: 'Minimum Spend Resto Rp 100.000',
    uniqueFacts: [
      'Arsitektur ala pedesaan pedalaman Swiss / Belanda.',
      'Banyak spot foto outdoor instagramable.',
    ],
    rating: 4.6,
    image: generateAnimatedSvg("Rustic Market Explore The Museum", "legendaris"),
    coordinates: { lat: -6.58, lng: 106.87 },
  },
  {
    id: 'lembah_embun',
    name: 'Lembah Embun Gunung Pancar',
    overview:
      'Lembah hijau tersembunyi di kawasan Hutan Pinus Gunung Pancar yang sering diselimuti kabut embun pagi tenang dan asri.',
    address: 'Lereng Gunung Pancar, Karang Tengah, Babakan Madang',
    hours: '24 Jam (Camping Area)',
    ticketPrice: 'Rp 20.000',
    uniqueFacts: [
      'Spot kontemplasi dan meditasi hutan pinus alami.',
      'Suhu udara dingin kabut tipis alami sepanjang hari.',
    ],
    rating: 4.8,
    image: generateAnimatedSvg("Lembah Embun Gunung Pancar", "legendaris"),
    coordinates: { lat: -6.591, lng: 106.902 },
  },
  {
    id: 'kebun_raya_dest',
    name: 'Kebun Raya Bogor Taman Botani',
    overview:
      'Kebun botani seluas 87 hektar dengan 15.000 spesies tumbuhan, Taman Meksiko, Taman Astrid, dan Griya Anggrek.',
    address: 'Jl. Ir. H. Juanda No.13, Paledang, Bogor Tengah',
    hours: 'Setiap Hari 07.00 - 16.00 WIB',
    ticketPrice: 'Rp 15.500 - Rp 25.500',
    uniqueFacts: ['Pusat riset flora tropis terbesar Asia Tenggara.', 'Danau Gunting dengan bunga teratai raksasa.'],
    rating: 4.8,
    image: generateAnimatedSvg("Kebun Raya Bogor Taman Botani", "legendaris"),
    coordinates: { lat: -6.5971, lng: 106.806 },
  },
  {
    id: 'devoyage_bogor',
    name: 'DeVoyage Bogor',
    overview:
      'Taman wisata miniatur Eropa dengan 150+ replika ikon dunia seperti Menara Eiffel, Kincir Angin Belanda, dan gondola Venesia.',
    address: 'Jl. Boulevard Bogor Nirwana Residence (BNR), Mulyaharja',
    hours: 'Setiap Hari 09.00 - 18.00 WIB',
    ticketPrice: 'Rp 35.000 - Rp 45.000',
    uniqueFacts: ['Penyewaan pakaian tradisional Eropa.', 'Kanal air buatan dengan perahu gondola.'],
    rating: 4.5,
    image: generateAnimatedSvg("DeVoyage Bogor", "legendaris"),
    coordinates: { lat: -6.621, lng: 106.795 },
  },
  {
    id: 'the_jungle',
    name: 'The Jungle Waterpark BNR',
    overview:
      'Taman rekreasi air keluarga terbesar di Bogor berlatar pemandangan Gunung Salak dengan wahana Kolam Ombak, Racer Slide, dan Lazy River.',
    address: 'Kawasan BNR, Jl. Dreded, Mulyaharja, Bogor Selatan',
    hours: 'Setiap Hari 09.00 - 17.00 WIB',
    ticketPrice: 'Rp 55.000 - Rp 85.000',
    uniqueFacts: ['Menggunakan konsep taman air ramah lingkungan.', 'Fasilitas Giant Aquarium dan Bird Park.'],
    rating: 4.6,
    image: generateAnimatedSvg("The Jungle Waterpark BNR", "legendaris"),
    coordinates: { lat: -6.623, lng: 106.798 },
  },
  {
    id: 'kuntum_farmfield',
    name: 'Kuntum Farmfield Tajur',
    overview:
      'Wisata edukasi agrowisata peternakan dan pertanian ramah anak. Pengunjung dapat memberi makan kambing, kelinci, sapi, dan memetik sayur organik.',
    address: 'Jl. Raya Tajur No.291, Sindangrasa, Bogor Timur',
    hours: 'Setiap Hari 08.00 - 18.00 WIB',
    ticketPrice: 'Rp 65.000',
    uniqueFacts: ['Edukasi bercocok tanam hidroponik & organik.', 'Area memberi makan ternak secara langsung.'],
    rating: 4.7,
    image: generateAnimatedSvg("Kuntum Farmfield Tajur", "legendaris"),
    coordinates: { lat: -6.632, lng: 106.835 },
  },
  {
    id: 'the_bucketlist',
    name: 'The Bucketlist Indonesia',
    overview:
      'Galeri museum memorabilia olahraga basket pertama dan terbesar di Indonesia dengan lapangan basket standar FIBA dan kafe sport.',
    address: 'Jl. R.H. Moh. Tohir No.1, Tanah Baru, Bogor Utara',
    hours: 'Rabu-Minggu 10.00 - 18.00 WIB',
    ticketPrice: 'Rp 50.000',
    uniqueFacts: ['Koleksi jersey & sepatu basket original bintang NBA dan IBL.', 'Lapangan basket indoor standar FIBA.'],
    rating: 4.8,
    image: generateAnimatedSvg("The Bucketlist Indonesia", "legendaris"),
    coordinates: { lat: -6.575, lng: 106.812 },
  },
  {
    id: 'kampung_batik_cibuluh',
    name: 'Kampung Batik Cibuluh',
    overview:
      'Sentra pengrajin batik khas Kota Bogor dengan motif unik Hujan Gerimis, Kujang, Talas, dan Rusa Istana. Menyediakan workshop edukasi membatik.',
    address: 'Kelurahan Cibuluh, Bogor Utara',
    hours: 'Setiap Hari 08.00 - 16.00 WIB',
    ticketPrice: 'Gratis Masuk (Workshop Rp 50k)',
    uniqueFacts: ['Kampung wisata batik resmi yang memberdayakan UMKM ibu-ibu lokal.', 'Motif batik terinspirasi kekayaan alam Bogor.'],
    rating: 4.8,
    image: generateAnimatedSvg("Kampung Batik Cibuluh", "legendaris"),
    coordinates: { lat: -6.56, lng: 106.81 },
  },
];

export const GOVERNMENT_INSTITUTIONS: GovernmentInstitution[] = [
  {
    id: 'balai_kota',
    name: 'Balai Kota Bogor',
    overview:
      'Pusat kantor pemerintahan Wali Kota dan Wakil Wali Kota Bogor tempat penyusunan kebijakan publik dan pelayanan masyarakat.',
    address: 'Jl. Ir. H. Juanda No.10, Pabaton, Bogor Tengah',
    image: generateAnimatedSvg("Balai Kota Bogor", "legendaris"),
  },
  {
    id: 'dprd_bogor',
    name: 'DPRD Kota Bogor',
    overview:
      'Lembaga legislatif daerah tempat penyusunan Peraturan Daerah (Perda) dan penampungan aspirasi masyarakat Kota Bogor.',
    address: 'Jl. Pemuda No.25, Tanah Sareal, Kota Bogor',
    image: generateAnimatedSvg("DPRD Kota Bogor", "legendaris"),
  },
  {
    id: 'rsud_bogor',
    name: 'RSUD Kota Bogor',
    overview: 'Rumah Sakit Umum Daerah milik Pemkot Bogor sebagai pusat pelayanan dan rujukan medis utama masyarakat.',
    address: 'Jl. Dr. Sumeru No.120, Menteng, Bogor Barat',
    image: generateAnimatedSvg("RSUD Kota Bogor", "legendaris"),
  },
  {
    id: 'polresta_bogor',
    name: 'Polresta Bogor Kota',
    overview: 'Institusi kepolisian yang menjaga keamanan, ketertiban, dan penegakan hukum di seluruh wilayah Kota Bogor.',
    address: 'Jl. Kapten Muslihat No.18, Pabaton, Bogor Tengah',
    image: generateAnimatedSvg("Polresta Bogor Kota", "legendaris"),
  },
  {
    id: 'imigrasi_bogor',
    name: 'Kantor Imigrasi Kelas I Non TPI Bogor',
    overview: 'Kantor pelayanan paspor RI, visa, dan izin tinggal keimigrasian warga negara asing di wilayah Bogor.',
    address: 'Jl. Ahmad Yani No.68, Tanah Sareal, Kota Bogor',
    image: generateAnimatedSvg("Kantor Imigrasi Kelas I Non TPI Bogor", "legendaris"),
  },
  {
    id: 'bapperida_bogor',
    name: 'BAPPERIDA Kota Bogor',
    overview: 'Badan Perencanaan Pembangunan, Riset, dan Inovasi Daerah yang menyusun arah pembangunan jangka panjang Kota Bogor.',
    address: 'Jl. Kapten Muslihat No.21, Pabaton, Bogor Tengah',
    image: generateAnimatedSvg("BAPPERIDA Kota Bogor", "legendaris"),
  },
];

export const UMKM_CENTERS: UMKMCenter[] = [
  {
    id: 'suryakencana',
    name: 'Kawasan Pecinan Suryakencana',
    overview:
      'Pusat perdagangan tertua di Kota Bogor tempat berkumpulnya ratusan UMKM kuliner legendaris, herbal tradisional, dan pernak-pernik khas.',
    address: 'Jl. Suryakencana, Bogor Tengah',
    uniqueFacts: ['Kawasan heritage akulturasi budaya Sunda & Tionghoa.', 'Pusat festival tahunan Cap Go Meh Bogor.'],
    image: generateAnimatedSvg("Kawasan Pecinan Suryakencana", "legendaris"),
  },
  {
    id: 'pasar_anyar',
    name: 'Pasar Anyar Bogor',
    overview: 'Pasar tradisional terbesar pusat grosir fesyen, kerajinan tangan, sembako, dan aneka bahan makanan UMKM.',
    address: 'Jl. MA Salmun, Cibogor, Bogor Tengah',
    uniqueFacts: ['Pusat denyut ekonomi ribuan pedagang kecil Bogor.', 'Sudah beroperasi sejak era kolonial.'],
    image: generateAnimatedSvg("Pasar Anyar Bogor", "legendaris"),
  },
  {
    id: 'pasar_bogor',
    name: 'Pasar Bogor',
    overview: 'Pasar bersejarah di dekat pintu Kebun Raya yang menjajakan bumbu tradisional, sayuran segar, dan oleh-oleh khas.',
    address: 'Jl. Roda, Babakan Pasar, Bogor Tengah',
    uniqueFacts: ['Pasar bersejarah tertua penghubung Suryakencana.'],
    image: generateAnimatedSvg("Pasar Bogor", "legendaris"),
  },
  {
    id: 'bcc_bogor',
    name: 'Bogor Creative Center (BCC)',
    overview:
      'Gedung pusat inkubasi kreatif dan pameran produk UMKM lokal persembahan komite ekonomi kreatif Kota Bogor.',
    address: 'Jl. Ir. H. Juanda No.4, Paledang, Bogor Tengah',
    uniqueFacts: ['Ruang kerja bersama desainer dan perajin muda.', 'Rutin menggelar expo & workshop UMKM gratis.'],
    image: generateAnimatedSvg("Bogor Creative Center (BCC)", "legendaris"),
  },
  {
    id: 'sentra_cibuluh',
    name: 'Sentra Batik Cibuluh',
    overview: 'Sentra UMKM pengrajin batik tulis dan cap bertema flora, fauna, dan ikon sejarah Bogor.',
    address: 'Kelurahan Cibuluh, Bogor Utara',
    uniqueFacts: ['Memberdayakan kelompok usaha bersama ibu-ibu warga lokal.'],
    image: generateAnimatedSvg("Sentra Batik Cibuluh", "legendaris"),
  },
  {
    id: 'mulyaharja_umkm',
    name: 'Kampung Wisata Mulyaharja',
    overview: 'Sentra UMKM berbasis desa wisata organik yang menjual beras organik, olahan pertanian, dan kerajinan bambu.',
    address: 'Mulyaharja, Bogor Selatan',
    uniqueFacts: ['Pemandangan persawahan latar Gunung Salak yang instagramable.'],
    image: generateAnimatedSvg("Kampung Wisata Mulyaharja", "legendaris"),
  },
  {
    id: 'taman_kencana',
    name: 'Sentra Kuliner Taman Kencana',
    overview: 'Kawasan Rindang tempat berkumpulnya belasan kafe UMKM dan resto kuliner favorit anak muda.',
    address: 'Kelurahan Babakan, Bogor Tengah',
    uniqueFacts: ['Dikelilingi taman kota rindang peninggalan era Karsten.'],
    image: generateAnimatedSvg("Sentra Kuliner Taman Kencana", "legendaris"),
  },
  {
    id: 'jembatan_merah',
    name: 'Pusat Kuliner Malam Jembatan Merah',
    overview: 'Pusat jajanan malam jalanan terkenal yang menyajikan Doclang, Martabak, dan Soto Kuning hangat.',
    address: 'Jl. Veteran / Otto Iskandardinata, Bogor Tengah',
    uniqueFacts: ['Pasar kuliner malam legendaris yang selalu ramai hingga dini hari.'],
    image: generateAnimatedSvg("Pusat Kuliner Malam Jembatan Merah", "legendaris"),
  },
  {
    id: 'btm_bogor',
    name: 'Bogor Trade Mall (BTM)',
    overview: 'Pusat perbelanjaan ramah kantong yang menampung ratusan kios UMKM fesyen, gadget, dan souvenir.',
    address: 'Jl. Ir. H. Juanda No.68, Paledang, Bogor Tengah',
    uniqueFacts: ['Lokasi di jantung kota persis menghadap Istana Bogor.'],
    image: generateAnimatedSvg("Bogor Trade Mall (BTM)", "legendaris"),
  },
  {
    id: 'pasar_jambu_dua',
    name: 'Pasar Jambu Dua',
    overview: 'Sentra perbelanjaan grosir, perlengkapan elektronik, dan pasar buah buahan khas Bogor.',
    address: 'Jl. Ahmad Yani, Tanah Sareal, Kota Bogor',
    uniqueFacts: ['Pusat bursa gadget & ponsel terbesar di Kota Bogor.'],
    image: generateAnimatedSvg("Pasar Jambu Dua", "legendaris"),
  },
];

export const CREATORS: Creator[] = [
  {
    id: 'reka_bogor',
    name: 'REKA Bogor (Forum Ekonomi Kreatif)',
    category: 'komunitas',
    bio: 'Wadah kolaborasi lintas subsektor ekonomi kreatif Kota Bogor yang menghimpun kreator, UMKM, akademisi, dan pemerintah daerah.',
    avatar: generateAnimatedSvg("REKA Bogor (Forum Ekonomi Kreatif)", 'avatar'),
    portfolio: [
      generateAnimatedSvg("REKA Bogor (Forum Ekonomi Kreatif)", 'ilustrasi'),
      generateAnimatedSvg("REKA Bogor (Forum Ekonomi Kreatif)", 'ilustrasi'),
    ],
    address: 'Bogor Creative Center, Jl. Ir. H. Juanda No.4',
    products: [
      {
        id: 'p_reka_1',
        name: 'Katalog Industri Kreatif Bogor 2026',
        price: 75000,
        description: 'Buku direktori fisik dan digital berisi 100+ kreator & UMKM binaan REKA Bogor.',
        contactUrl: 'https://instagram.com/rekabogor',
      },
    ],
    links: {
      instagram: 'https://instagram.com/rekabogor',
      whatsapp: 'https://wa.me/6281234567890',
    },
    stats: { views: 1250, clicks: 420 },
  },
  {
    id: 'bogrades',
    name: 'Bogrades (Bogor Graphic Designers)',
    category: 'desain',
    bio: 'Komunitas desainer grafis & desainer komunikasi visual Kota Bogor. Berbagi karya, edukasi visual, dan proyek branding warisan budaya lokal.',
    avatar: generateAnimatedSvg("Bogrades (Bogor Graphic Designers)", 'avatar'),
    portfolio: [
      generateAnimatedSvg("Bogrades (Bogor Graphic Designers)", 'ilustrasi'),
      generateAnimatedSvg("Bogrades (Bogor Graphic Designers)", 'ilustrasi'),
    ],
    address: 'Taman Kencana, Bogor Tengah',
    products: [
      {
        id: 'p_bog_1',
        name: 'Sticker Pack Visual Heritage Bogor',
        price: 25000,
        description: 'Set stiker vinyl anti air karakter Tugu Kujang, Rusa Istana, & Soto Mie.',
        contactUrl: 'https://tokopedia.com',
      },
    ],
    links: {
      instagram: 'https://instagram.com/bogrades.id',
      tokopedia: 'https://tokopedia.com',
    },
    stats: { views: 890, clicks: 310 },
  },
  {
    id: 'bogor_cinema',
    name: 'Bogor Cinema',
    category: 'fotografi',
    bio: 'Komunitas sineas muda & videografer dokumenter Bogor yang aktif mengarsipkan sejarah visual kota melalui film pendek dan video sinematik.',
    avatar: generateAnimatedSvg("Bogor Cinema", 'avatar'),
    portfolio: [
      generateAnimatedSvg("Bogor Cinema", 'ilustrasi'),
    ],
    address: 'Jl. Pemuda, Tanah Sareal, Kota Bogor',
    products: [
      {
        id: 'p_cin_1',
        name: 'Kaset Video Dokumenter Buitenzorg Tempo Dulu',
        price: 120000,
        description: 'DVD/Flashdisk dokumenter sejarah Kebun Raya dan Istana Bogor resolusi HD.',
        contactUrl: 'https://shopee.co.id',
      },
    ],
    links: {
      instagram: 'https://instagram.com/bogorcinema',
      shopee: 'https://shopee.co.id',
    },
    stats: { views: 640, clicks: 180 },
  },
  {
    id: 'bogor_sketchers',
    name: 'Bogor Sketchers',
    category: 'ilustrasi',
    bio: 'Komunitas urban sketcher yang rutin membuat sketsa arsitektur cagar budaya & sudut-sudut eksotis Kota Bogor secara langsung di lokasi (on location).',
    avatar: generateAnimatedSvg("Bogor Sketchers", 'avatar'),
    portfolio: [
      generateAnimatedSvg("Bogor Sketchers", 'ilustrasi'),
    ],
    address: 'Kawasan Suryakencana, Bogor Tengah',
    products: [
      {
        id: 'p_ske_1',
        name: 'Art Print Sketsa Tangan Istana Bogor A3',
        price: 85000,
        description: 'Cetakan karya sketsa lukisan tinta hitam asli arsitektur Istana Buitenzorg.',
        contactUrl: 'https://tokopedia.com',
      },
    ],
    links: {
      instagram: 'https://instagram.com/bogor_sketchers',
      behance: 'https://behance.net',
      tokopedia: 'https://tokopedia.com',
    },
    stats: { views: 1100, clicks: 530 },
  },
  {
    id: 'maya_crafts',
    name: 'Maya Crafts & Illustration',
    category: 'ilustrasi',
    bio: 'Maya adalah ilustrator lokal Bogor yang berfokus menciptakan merchandise estetis bertema fauna Kebun Raya dan legenda Kerajaan Pajajaran.',
    avatar: generateAnimatedSvg("Maya Crafts & Illustration", 'avatar'),
    portfolio: [
      generateAnimatedSvg("Maya Crafts & Illustration", 'ilustrasi'),
    ],
    address: 'Baranangsiang, Bogor Timur',
    products: [
      {
        id: 'p_maya_1',
        name: 'Tote Bag Kanvas Ilustrasi Bunga Rafflesia',
        price: 65000,
        description: 'Tote bag kanvas tebal dengan sablon ilustrasi cat air Kebun Raya Bogor.',
        contactUrl: 'https://tokopedia.com',
      },
      {
        id: 'p_maya_2',
        name: 'Gantungan Kunci Kayu Rusa Totol',
        price: 15000,
        description: 'Gantungan kunci ukiran kayu rusa Istana Bogor.',
        contactUrl: 'https://shopee.co.id',
      },
    ],
    links: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      instagram: 'https://instagram.com',
    },
    stats: { views: 1450, clicks: 620 },
  },
  {
    id: 'rian_illustration',
    name: 'Rian Illustration Studio',
    category: 'ilustrasi',
    bio: 'Studio desain digital spesialis karakter komik dan animasi mitologi Sunda, Prabu Siliwangi, serta satwa khas Museum Zoologi.',
    avatar: generateAnimatedSvg("Rian Illustration Studio", 'avatar'),
    portfolio: [
      generateAnimatedSvg("Rian Illustration Studio", 'ilustrasi'),
    ],
    address: 'Ciwaringin, Bogor Tengah',
    products: [
      {
        id: 'p_rian_1',
        name: 'Komik Digital "Petualangan Kujang Emas"',
        price: 35000,
        description: 'E-book komik penuh warna epik sejarah Pakuan Pajajaran.',
        contactUrl: 'https://tokopedia.com',
      },
    ],
    links: {
      tokopedia: 'https://tokopedia.com',
      instagram: 'https://instagram.com',
    },
    stats: { views: 920, clicks: 380 },
  },
  {
    id: 'dika_stone',
    name: 'Dika Stone Art & Craft',
    category: 'kriya',
    bio: 'Dika memproduksi replika pahatan miniatur Prasasti Batutulis dan suvenir kriya batu alam sungai Ciliwung khas Bogor.',
    avatar: generateAnimatedSvg("Dika Stone Art & Craft", 'avatar'),
    portfolio: [
      generateAnimatedSvg("Dika Stone Art & Craft", 'ilustrasi'),
    ],
    address: 'Batutulis, Bogor Selatan',
    products: [
      {
        id: 'p_dika_1',
        name: 'Miniatur Prasasti Batutulis Batu Alam',
        price: 150000,
        description: 'Pahatan batu asli presisi dengan ukiran aksara Sunda Kuno.',
        contactUrl: 'https://shopee.co.id',
      },
    ],
    links: {
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6289988776655',
    },
    stats: { views: 780, clicks: 290 },
  },
  {
    id: 'batik_tradisiku',
    name: 'Batik Tradisiku Bogor',
    category: 'kriya',
    bio: 'Rumah batik kreasi khas Bogor yang mempopulerkan motif Kujang, Hujan Gerimis, dan Talas dengan pewarnaan bahan alami.',
    avatar: generateAnimatedSvg("Batik Tradisiku Bogor", 'avatar'),
    portfolio: [
      generateAnimatedSvg("Batik Tradisiku Bogor", 'ilustrasi'),
    ],
    address: 'Jl. Malabar Ujung No. 8, Bogor Tengah',
    products: [
      {
        id: 'p_batik_1',
        name: 'Kain Batik Tulis Motif Hujan Kujang (2 Meter)',
        price: 350000,
        description: 'Kain katun primissima batik tulis asli bertema identitas Kota Bogor.',
        contactUrl: 'https://tokopedia.com',
      },
    ],
    links: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      instagram: 'https://instagram.com',
    },
    stats: { views: 2100, clicks: 890 },
  },
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'yt_1',
    title: 'Bogor Tempo Dulu (Arsip Sejarah)',
    youtubeId: 'U3Ks7uAcvy8',
    embedUrl: 'https://www.youtube.com/embed/U3Ks7uAcvy8',
    youtubeUrl: 'https://youtu.be/U3Ks7uAcvy8?si=Thq2pvYCC5bmRWPP',
    thumbnail: 'https://img.youtube.com/vi/U3Ks7uAcvy8/hqdefault.jpg',
    category: 'Arsip Kota',
    description: 'Dokumentasi arsip visual sejarah perkembangan suasana Kota Bogor, Kebun Raya, dan Istana Buitenzorg masa lalu.',
  },
  {
    id: 'yt_2',
    title: 'Jejak Kerajaan di Bogor (Pakuan Pajajaran & Tarumanagara)',
    youtubeId: 'F3k8BKpfKWQ',
    embedUrl: 'https://www.youtube.com/embed/F3k8BKpfKWQ',
    youtubeUrl: 'https://youtu.be/F3k8BKpfKWQ?si=eEUQMBwYBe9J0k2V',
    thumbnail: 'https://img.youtube.com/vi/F3k8BKpfKWQ/hqdefault.jpg',
    category: 'Kerajaan',
    description: 'Kisah mendalam kejayaan Kerajaan Tarumanagara abad ke-5 M hingga Pakuan Pajajaran Prabu Siliwangi.',
  },
  {
    id: 'yt_3',
    title: 'Sejarah Pasar Bogor & Suryakencana',
    youtubeId: 'qjr6PDRp3Yo',
    embedUrl: 'https://www.youtube.com/embed/qjr6PDRp3Yo',
    youtubeUrl: 'https://youtu.be/qjr6PDRp3Yo?si=Zmtk1TwdHGfBs-eD',
    thumbnail: 'https://img.youtube.com/vi/qjr6PDRp3Yo/hqdefault.jpg',
    category: 'Perdagangan & Kuliner',
    description: 'Penelusuran sejarah denyut nadi perdagangan tertua di Pasar Bogor dan kawasan Pecinan Suryakencana.',
  },
];

export const BOGOR_HISTORY_ESSAY = {
  title: 'Sejarah Lengkap & Perkembangan Kota Bogor',
  source: 'Dinas Arsip Kota Bogor & Citra Kota Bogor Dalam Arsip',
  content: `
Kota Bogor secara geografis adalah pintu gerbang Jawa Barat yang berdampingan dengan Ibu Kota Negara, serta memiliki peran amat dinamis dalam perjalanan sejarah Indonesia. 

### 1. Masa Pra-Sejarah & Komunitas Nusantara Kuno
Kehidupan masyarakat pra-sejarah di wilayah Bogor bermula dari pemukiman di sepanjang aliran sungai besar seperti Cisadane dan Ciliwung. Peninggalan arca kuno seperti "Purwakali" dan "Kidang Pinanjung" serta artefak keping mata uang kuno di Pasir Angin Cibungbulang menjadi bukti adanya interaksi perdagangan kuno lintas Samudra Hindia dan Laut Jawa dengan para pendatang dari Korea, Jepang, India, hingga etnis Cina.

### 2. Era Kerajaan Tarumanagara & Pakuan Pajajaran
Abad ke-5 Masehi menjadi saksi kejayaan Kerajaan Tarumanagara di bawah pimpinan Raja Purnawarman, sebagaimana dipahat pada Prasasti Ciaruteun. Selanjutnya pada abad ke-15 (1474-1513 M), Sri Baduga Maharaja (Prabu Siliwangi) mendirikan ibu kota Kerajaan Sunda di Pakuan Pajajaran (Bogor). Beliau membangun benteng pertahanan, telaga Mahawijaya, serta hutan buatan "Samida" yang menjadi cikal bakal Kebun Raya Bogor untuk menjaga kelestarian benih flora langka.

### 3. Kebangkitan "Buitenzorg" Era Kolonial
Setelah masa surut paska 1578, kawasan ini bangkit kembali pada pertengahan abad ke-18. Gubernur Jenderal G.W. Baron van Imhoff terpesona oleh keindahan alam Bogor dan membangun peristirahatan pada tahun 1744 yang diberi nama "Buitenzorg" (Bebas dari Masalah/Tanpa Kesibukan). Pada 18 Mei 1817, Prof. C.G.C. Reinwardt meresmikan Kebun Botani "S Lands Plantentuin" (Kebun Raya Bogor).

### 4. Akulturasi Etnis & Keberagaman Budaya
Masyarakat Kota Bogor bertumbuh menjadi heterogen namun tetap mengakar pada kebudayaan Sunda. Berbagai etnis hidup harmonis: Etnis Sunda sebagai penduduk asli pemeluk tradisi, Etnis Melayu/Jakarta, Etnis Jawa keturunan prajurit Mataram (seperti daerah Jabaru / Jawa Baru di Ciomas), Etnis India, Etnis Belanda (seperti komunitas Depok Ch. Chastelein), dan Etnis Tionghoa yang membangun pusat niaga Suryakencana.

### 5. Lambang Kota & Tugu Kujang
Monumen Tugu Kujang didirikan pada 4 Mei 1982 untuk menghormati ibu kota Pakuan Pajajaran. Senjata Kujang merupakan pusaka rakyat Sunda berlekuk 7 yang melambangkan keberanian, ketajaman akal budi, serta kedaulatan.
  `,
};

export { BOGOR_UMKM_DATABASE } from './umkmData';

