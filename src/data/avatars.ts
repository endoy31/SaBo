import { AvatarOption } from '../types';

function createSvgAvatar(
  bgGradient: [string, string],
  faceColor: string,
  eyesColor: string,
  accessorySvg: string,
  nameBadge: string,
  spotsColor?: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}" />
        <stop offset="100%" stop-color="${bgGradient[1]}" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.25" />
      </filter>
    </defs>
    
    <!-- Outer rounded background -->
    <rect width="160" height="160" rx="36" fill="url(#bgGrad)" />
    
    <!-- Subtle Inner Border -->
    <rect x="3" y="3" width="154" height="154" rx="33" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
    
    <!-- Antlers / Horns for Mascot Deer -->
    <g stroke="#F59E0B" stroke-width="4.5" stroke-linecap="round" fill="none" filter="url(#shadow)">
      <!-- Left Antler -->
      <path d="M 52 50 C 44 32, 36 22, 28 20 M 42 32 C 34 30, 30 35, 26 38 M 48 40 C 38 42, 34 48, 30 50" />
      <!-- Right Antler -->
      <path d="M 108 50 C 116 32, 124 22, 132 20 M 118 32 C 126 30, 130 35, 134 38 M 112 40 C 122 42, 126 48, 130 50" />
    </g>
    
    <!-- Deer Ears -->
    <ellipse cx="44" cy="62" rx="11" ry="18" fill="${faceColor}" transform="rotate(-32 44 62)" />
    <ellipse cx="44" cy="62" rx="6" ry="12" fill="#F472B6" opacity="0.6" transform="rotate(-32 44 62)" />
    
    <ellipse cx="116" cy="62" rx="11" ry="18" fill="${faceColor}" transform="rotate(32 116 62)" />
    <ellipse cx="116" cy="62" rx="6" ry="12" fill="#F472B6" opacity="0.6" transform="rotate(32 116 62)" />
    
    <!-- Mascot Head Base -->
    <circle cx="80" cy="86" r="38" fill="${faceColor}" filter="url(#shadow)" />
    
    <!-- White Spots (Rusa Totol Istana Bogor) -->
    <g fill="${spotsColor || 'rgba(255,255,255,0.7)'}">
      <circle cx="66" cy="74" r="2.5" />
      <circle cx="72" cy="68" r="2" />
      <circle cx="88" cy="68" r="2" />
      <circle cx="94" cy="74" r="2.5" />
      <circle cx="64" cy="84" r="2" />
      <circle cx="96" cy="84" r="2" />
    </g>
    
    <!-- Cheeks Blush -->
    <ellipse cx="58" cy="95" rx="6" ry="3.5" fill="#FB7185" opacity="0.5" />
    <ellipse cx="102" cy="95" rx="6" ry="3.5" fill="#FB7185" opacity="0.5" />
    
    <!-- Cute Eyes -->
    <ellipse cx="65" cy="86" rx="5" ry="6.5" fill="${eyesColor}" />
    <ellipse cx="95" cy="86" rx="5" ry="6.5" fill="${eyesColor}" />
    <circle cx="67" cy="84" r="2.2" fill="#FFFFFF" />
    <circle cx="97" cy="84" r="2.2" fill="#FFFFFF" />
    <circle cx="63" cy="88" r="1.1" fill="#FFFFFF" />
    <circle cx="93" cy="88" r="1.1" fill="#FFFFFF" />
    
    <!-- Deer Snout & Nose -->
    <ellipse cx="80" cy="98" rx="12" ry="8" fill="#FFF7ED" />
    <path d="M 76 96 C 78 94, 82 94, 84 96 C 84 98, 80 101, 76 96 Z" fill="#78350F" />
    <path d="M 80 99 L 80 102 M 77 102 C 78.5 104, 81.5 104, 83 102" stroke="#78350F" stroke-width="1.2" stroke-linecap="round" fill="none" />
    
    <!-- Custom Headband / Hat / Accessories -->
    ${accessorySvg}
    
    <!-- Bottom Badge -->
    <g transform="translate(80, 144)">
      <rect x="-46" y="-10" width="92" height="18" rx="9" fill="#0F2A21" stroke="#F59E0B" stroke-width="1.2" />
      <text x="0" y="3" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" fill="#F7F1E3" text-anchor="middle">${nameBadge}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const AVATAR_PRESETS: AvatarOption[] = [
  {
    id: 'rusa_batik_kujang',
    name: 'Rusa Totol Pajajaran',
    title: 'Penjelajah Pemula',
    description: 'Ikat kepala batik Kujang khas Bogor berwarna emas marun melambangkan keberanian dan kearifan lokal.',
    minLevel: 1,
    theme: 'Tradisional Bogor',
    accessory: 'Ikat Kepala Batik Kujang Emas',
    avatarUrl: createSvgAvatar(
      ['#0F2A21', '#1B4D3E'],
      '#D97706',
      '#1E293B',
      `<!-- Ikat Kepala Batik Kujang -->
       <path d="M 44 68 Q 80 60 116 68 L 118 76 Q 80 68 42 76 Z" fill="#991B1B" stroke="#F59E0B" stroke-width="1.5" />
       <circle cx="80" cy="67" r="5" fill="#F59E0B" />
       <path d="M 80 63 L 80 71 M 77 67 L 83 67" stroke="#78350F" stroke-width="1.5" />
       <!-- Kujang symbol on forehead -->
       <path d="M 79 52 Q 83 56 81 60 Q 77 56 79 52" fill="#F59E0B" />`,
      'RUSA PAJAJARAN'
    ),
  },
  {
    id: 'kujang_ranger_sunda',
    name: 'Kujang Ranger Sunda',
    title: 'Penjelajah Hutan',
    description: 'Bendo ikat Sunda motif megamendung hijau lumut dengan syal petualang hutan tropis.',
    minLevel: 1,
    theme: 'Pendekar Alam',
    accessory: 'Bendo Sunda & Syal Hijau',
    avatarUrl: createSvgAvatar(
      ['#064E3B', '#047857'],
      '#C2410C',
      '#0F172A',
      `<!-- Bendo Sunda -->
       <path d="M 46 66 C 60 54, 100 54, 114 66 L 116 75 C 100 64, 60 64, 44 75 Z" fill="#1E3A8A" stroke="#60A5FA" stroke-width="1.5" />
       <path d="M 80 50 C 76 56, 84 56, 80 62" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />
       <!-- Syal Petualang -->
       <path d="M 52 118 C 65 110, 95 110, 108 118 L 102 126 C 90 120, 70 120, 58 126 Z" fill="#059669" />`,
      'KUJANG RANGER'
    ),
  },
  {
    id: 'botani_samida',
    name: 'Ahli Botani Samida',
    title: 'Peneliti Samida',
    description: 'Topi rimba penjelajah Kebun Raya Bogor lengkap dengan semanggi keberuntungan dan teropong mini.',
    minLevel: 1,
    theme: 'Edukasi & Riset',
    accessory: 'Topi Rimba Peneliti & Daun Samida',
    avatarUrl: createSvgAvatar(
      ['#14532D', '#166534'],
      '#B45309',
      '#022C22',
      `<!-- Safari Explorer Hat -->
       <ellipse cx="80" cy="62" rx="46" ry="12" fill="#78350F" />
       <path d="M 52 62 C 52 46, 108 46, 108 62 Z" fill="#9A3412" />
       <rect x="52" y="58" width="56" height="5" fill="#F59E0B" />
       <!-- Green Leaf on Hat -->
       <path d="M 64 54 C 60 48, 70 48, 68 56 Z" fill="#22C55E" />`,
      'AHLI BOTANI'
    ),
  },
  {
    id: 'jawara_salak',
    name: 'Jawara Salak Wulung',
    title: 'Pendekar Pasundan',
    description: 'Iket wulung hitam khas pesilat Bogor dengan pin tembaga kujang kembar.',
    minLevel: 1,
    theme: 'Ksatria Tradisional',
    accessory: 'Iket Wulung Pasundan & Pin Kujang',
    avatarUrl: createSvgAvatar(
      ['#1E1B4B', '#312E81'],
      '#9A3412',
      '#0F172A',
      `<!-- Iket Wulung Hitam -->
       <path d="M 42 66 Q 80 52 118 66 L 115 76 Q 80 62 45 76 Z" fill="#0F172A" stroke="#E2E8F0" stroke-width="1.2" />
       <!-- Simpul Iket Belakang Atas -->
       <path d="M 72 50 L 80 40 L 88 50 Z" fill="#0F172A" stroke="#E2E8F0" stroke-width="1" />
       <circle cx="80" cy="65" r="4.5" fill="#EAB308" />`,
      'JAWARA SALAK'
    ),
  },
  {
    id: 'barongsai_surken',
    name: 'Pendekar Barongsai Surken',
    title: 'Pelestari Cap Go Meh',
    description: 'Ikat kepala merah sutra Suryakencana dengan lonceng emas keberuntungan dan ornamen naga.',
    minLevel: 2,
    theme: 'Pecinan & Akulturasi',
    accessory: 'Ikat Merah Emas Cap Go Meh',
    avatarUrl: createSvgAvatar(
      ['#7F1D1D', '#991B1B'],
      '#D97706',
      '#450A0A',
      `<!-- Headband Merah Emas -->
       <path d="M 44 68 Q 80 60 116 68 L 118 76 Q 80 68 42 76 Z" fill="#DC2626" stroke="#FDE047" stroke-width="2" />
       <!-- Dragon Pearl / Golden Bell -->
       <circle cx="80" cy="67" r="7" fill="#FACC15" stroke="#CA8A04" stroke-width="1" />
       <circle cx="80" cy="67" r="3" fill="#B91C1C" />
       <!-- Red Ribbon Tails -->
       <path d="M 44 72 Q 32 80 36 92 M 116 72 Q 128 80 124 92" stroke="#DC2626" stroke-width="3" fill="none" stroke-linecap="round" />`,
      'PENDEKAR SURKEN'
    ),
  },
  {
    id: 'maestro_batik',
    name: 'Maestro Batik Kujang',
    title: 'Seniman Kreator',
    description: 'Mahkota Helaran Budaya Bogor dengan selempang motif batik Kujang Rusa kreasi sanggar seni.',
    minLevel: 2,
    theme: 'Seni & Ekraf',
    accessory: 'Ikat Sutra Batik Pelangi',
    avatarUrl: createSvgAvatar(
      ['#3B0764', '#581C87'],
      '#CA8A04',
      '#1E1B4B',
      `<!-- Batik Bandana Multi-Color -->
       <path d="M 44 66 Q 80 56 116 66 L 118 76 Q 80 66 42 76 Z" fill="#9333EA" stroke="#F472B6" stroke-width="1.5" />
       <circle cx="65" cy="67" r="3" fill="#38BDF8" />
       <circle cx="80" cy="66" r="4.5" fill="#FACC15" />
       <circle cx="95" cy="67" r="3" fill="#4ADE80" />`,
      'MAESTRO BATIK'
    ),
  },
  {
    id: 'ksatria_buitenzorg',
    name: 'Ksatria Buitenzorg',
    title: 'Pelindung Cagar Budaya',
    description: 'Mahkota ksatria kerajaan Sunda dengan permata zamrud Gunung Gede dan ornamen emas murni.',
    minLevel: 3,
    theme: 'Heritage Kuno',
    accessory: 'Mahkota Emas Zamrud Sunda',
    avatarUrl: createSvgAvatar(
      ['#1B4D3E', '#0F2A21'],
      '#D97706',
      '#0F172A',
      `<!-- Golden Crown -->
       <path d="M 48 66 L 56 46 L 68 56 L 80 40 L 92 56 L 104 46 L 112 66 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
       <!-- Emerald Gem in Center -->
       <polygon points="80,48 85,54 80,60 75,54" fill="#10B981" stroke="#047857" stroke-width="1" />
       <circle cx="56" cy="54" r="2.5" fill="#EF4444" />
       <circle cx="104" cy="54" r="2.5" fill="#EF4444" />`,
      'KSATRIA BOGOR'
    ),
  },
  {
    id: 'ratu_kencana_cipaku',
    name: 'Ratu Kencana Cipaku',
    title: 'Bangsawan Sunda',
    description: 'Sumping bunga melati emas dan mahkota putri Pasundan dengan selendang sutra berkilau.',
    minLevel: 3,
    theme: 'Bangsawan & Putri',
    accessory: 'Sumping Emas & Bunga Melati',
    avatarUrl: createSvgAvatar(
      ['#831843', '#9D174D'],
      '#F59E0B',
      '#374151',
      `<!-- Golden Tiara with Jasmine -->
       <path d="M 50 64 C 65 52, 95 52, 110 64 L 108 72 C 95 62, 65 62, 52 72 Z" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5" />
       <!-- Jasmine Flowers -->
       <circle cx="80" cy="58" r="4.5" fill="#FFFFFF" stroke="#FDE047" stroke-width="1" />
       <circle cx="66" cy="62" r="3.5" fill="#FFFFFF" />
       <circle cx="94" cy="62" r="3.5" fill="#FFFFFF" />
       <circle cx="80" cy="58" r="1.5" fill="#F59E0B" />`,
      'RATU KENCANA'
    ),
  },
  {
    id: 'penjaga_batutulis',
    name: 'Penjaga Prasasti Kawi',
    title: 'Arkeolog Sejati',
    description: 'Kacamata riset arkeologi dan ikat kuno Kawi peninggalan era Prabu Surawisesa 1533 M.',
    minLevel: 4,
    theme: 'Arkeologi & Prasasti',
    accessory: 'Kacamata Riset & Ikat Kawi',
    avatarUrl: createSvgAvatar(
      ['#0F172A', '#1E293B'],
      '#D97706',
      '#0284C7',
      `<!-- Archaeologist Round Glasses -->
       <circle cx="65" cy="86" r="10" fill="none" stroke="#F59E0B" stroke-width="2" />
       <circle cx="95" cy="86" r="10" fill="none" stroke="#F59E0B" stroke-width="2" />
       <line x1="75" y1="86" x2="85" y2="86" stroke="#F59E0B" stroke-width="2" />
       <!-- Inscription Headband -->
       <path d="M 44 66 Q 80 58 116 66 L 118 74 Q 80 66 42 74 Z" fill="#475569" stroke="#94A3B8" stroke-width="1.2" />
       <text x="80" y="72" font-family="monospace" font-size="6" fill="#F8FAFC" text-anchor="middle">ᮞᮨᮛᮒ᮪ 9ᮔᮤ</text>`,
      'PENJAGA PRASASTI'
    ),
  },
  {
    id: 'pangeran_istana_emas',
    name: 'Pangeran Istana Rusa',
    title: 'Grand Legend SaBo',
    description: 'Tanduk emas bersinar murni dengan mahkota keagungan Buitenzorg bintang lima.',
    minLevel: 5,
    theme: 'Legenda Tertinggi',
    accessory: 'Tanduk Emas Mahkota Prabu',
    avatarUrl: createSvgAvatar(
      ['#78350F', '#451A03'],
      '#F59E0B',
      '#1C1917',
      `<!-- Pure Gold Antler Shimmer & Royal Diadem -->
       <path d="M 50 62 L 62 42 L 80 32 L 98 42 L 110 62 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2" />
       <circle cx="80" cy="46" r="6" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
       <circle cx="62" cy="52" r="3.5" fill="#3B82F6" />
       <circle cx="98" cy="52" r="3.5" fill="#3B82F6" />
       <!-- Sparkling Stars -->
       <path d="M 80 20 L 82 25 L 87 27 L 82 29 L 80 34 L 78 29 L 73 27 L 78 25 Z" fill="#FEF08A" />`,
      'MAHAKARYA SABO',
      'rgba(254, 240, 138, 0.9)'
    ),
  },
];
