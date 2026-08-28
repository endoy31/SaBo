/**
 * Utility to generate animated vector SVG illustrations representing words, concepts, locations, figures, and items in Kota Bogor.
 * Replaces static photo stock images with vibrant, animated, vector SVG illustrations.
 */

export function generateAnimatedSvg(
  title: string,
  category: string = 'general',
  subText: string = ''
): string {
  const cleanTitle = title.trim();
  const lower = cleanTitle.toLowerCase();

  // Color theme generator based on subject
  let bgGradient = ['#062319', '#0d3829', '#154e3a']; // default dark forest green
  let primaryColor = '#34d399';
  let accentColor = '#f59e0b';
  let illustrationSvg = '';

  // 1. ISTANA BOGOR / PALACE
  if (lower.includes('istana') || lower.includes('buitenzorg')) {
    bgGradient = ['#022c22', '#065f46', '#0f172a']; // Emerald royal garden
    primaryColor = '#34d399';
    accentColor = '#fbbf24';
    illustrationSvg = `
      <!-- Palace Building -->
      <g transform="translate(200, 220)">
        <!-- Main Dome -->
        <path d="M 180 80 Q 200 30 220 80 Z" fill="#fef08a" opacity="0.9" />
        <rect x="185" y="80" width="30" height="20" fill="#fef08a" />
        <!-- Palace Facade -->
        <rect x="50" y="100" width="300" height="120" rx="6" fill="#f8fafc" />
        <rect x="130" y="70" width="140" height="150" rx="8" fill="#ffffff" />
        <!-- Triangular Pediment -->
        <polygon points="130,70 200,25 270,70" fill="#e2e8f0" />
        <!-- Columns -->
        <rect x="150" y="100" width="12" height="120" fill="#cbd5e1" />
        <rect x="175" y="100" width="12" height="120" fill="#cbd5e1" />
        <rect x="213" y="100" width="12" height="120" fill="#cbd5e1" />
        <rect x="238" y="100" width="12" height="120" fill="#cbd5e1" />
        <!-- Doors & Windows -->
        <rect x="185" y="150" width="30" height="70" rx="15" fill="#1e293b" />
        <rect x="75" y="130" width="28" height="45" rx="14" fill="#0284c7" opacity="0.8" />
        <rect x="297" y="130" width="28" height="45" rx="14" fill="#0284c7" opacity="0.8" />
      </g>
      <!-- Roaming Deer Animations -->
      <g class="anim-bounce" style="transform-origin: 150px 390px;">
        <!-- Deer Body -->
        <ellipse cx="150" cy="380" rx="22" ry="14" fill="#d97706" />
        <circle cx="170" cy="365" r="10" fill="#d97706" />
        <path d="M 168 358 Q 175 342 182 340" stroke="#fef08a" stroke-width="3" stroke-linecap="round" />
        <!-- Spots -->
        <circle cx="145" cy="376" r="2" fill="#ffffff" />
        <circle cx="153" cy="382" r="2" fill="#ffffff" />
        <circle cx="140" cy="382" r="2" fill="#ffffff" />
      </g>
      <g class="anim-bounce-delayed" style="transform-origin: 620px 410px;">
        <ellipse cx="620" cy="400" rx="26" ry="16" fill="#b45309" />
        <circle cx="600" cy="382" r="11" fill="#b45309" />
        <path d="M 602 375 Q 595 358 588 356" stroke="#fef08a" stroke-width="3" stroke-linecap="round" />
        <circle cx="625" cy="396" r="2.5" fill="#ffffff" />
        <circle cx="615" cy="402" r="2.5" fill="#ffffff" />
      </g>
      <!-- Floating Clouds -->
      <g class="anim-float">
        <path d="M 80 100 Q 100 80 130 90 Q 160 80 180 100 Q 190 120 160 130 Q 130 135 100 130 Q 70 120 80 100 Z" fill="#ffffff" opacity="0.2" />
        <path d="M 580 90 Q 600 70 630 80 Q 660 70 680 90 Q 690 110 660 120 Q 630 125 600 120 Q 570 110 580 90 Z" fill="#ffffff" opacity="0.25" />
      </g>
    `;
  }
  // 2. KEBUN RAYA / BOTANICAL GARDEN / BOTANI
  else if (lower.includes('kebun raya') || lower.includes('botani') || lower.includes('taman')) {
    bgGradient = ['#022c22', '#064e3b', '#047857'];
    primaryColor = '#10b981';
    accentColor = '#facc15';
    illustrationSvg = `
      <!-- Giant Botanical Banyan Trees -->
      <g class="anim-pulse-slow">
        <!-- Tree Trunks & Canopy -->
        <path d="M 120 450 L 140 280 Q 180 200 240 280 L 260 450 Z" fill="#78350f" />
        <circle cx="200" cy="220" r="120" fill="#15803d" opacity="0.9" />
        <circle cx="150" cy="200" r="90" fill="#16a34a" opacity="0.95" />
        <circle cx="250" cy="190" r="95" fill="#22c55e" opacity="0.9" />
        
        <path d="M 540 450 L 560 300 Q 600 230 640 300 L 660 450 Z" fill="#78350f" />
        <circle cx="600" cy="240" r="110" fill="#15803d" opacity="0.9" />
        <circle cx="650" cy="210" r="85" fill="#22c55e" opacity="0.9" />
      </g>
      <!-- Rafflesia Flower Core -->
      <g class="anim-float" transform="translate(360, 310)">
        <ellipse cx="40" cy="60" rx="45" ry="20" fill="#dc2626" />
        <!-- Petals -->
        <circle cx="40" cy="20" r="28" fill="#b91c1c" />
        <circle cx="80" cy="50" r="28" fill="#b91c1c" />
        <circle cx="65" cy="90" r="28" fill="#b91c1c" />
        <circle cx="15" cy="90" r="28" fill="#b91c1c" />
        <circle cx="0" cy="50" r="28" fill="#b91c1c" />
        <!-- Center Cup -->
        <circle cx="40" cy="55" r="22" fill="#7f1d1d" />
        <circle cx="40" cy="55" r="12" fill="#fef08a" />
      </g>
      <!-- Animated Butterflies -->
      <g class="anim-flutter" style="transform-origin: 300px 180px;">
        <path d="M 300 180 Q 280 160 295 145 Q 310 160 300 180 Z" fill="#ec4899" />
        <path d="M 300 180 Q 320 160 305 145 Q 290 160 300 180 Z" fill="#38bdf8" />
        <circle cx="300" cy="180" r="3" fill="#ffffff" />
      </g>
    `;
  }
  // 3. MUSEUM ZOOLOGI / FAUNA / PAUS BIRU
  else if (lower.includes('zoologi') || lower.includes('paus') || lower.includes('museum zoologi')) {
    bgGradient = ['#0f172a', '#1e1b4b', '#0284c7'];
    primaryColor = '#38bdf8';
    accentColor = '#e0f2fe';
    illustrationSvg = `
      <!-- Giant Blue Whale Skeleton & Swimming Silhouette -->
      <g class="anim-float" transform="translate(150, 160)">
        <!-- Whale Body Contour -->
        <path d="M 50 140 Q 200 40 420 100 Q 480 120 520 80 L 500 140 L 530 180 Q 460 170 410 180 Q 200 240 50 140 Z" fill="#0284c7" opacity="0.35" />
        <!-- Ribs & Bones (Skeleton Effect) -->
        <path d="M 100 140 Q 220 70 400 120" stroke="#f8fafc" stroke-width="8" stroke-linecap="round" fill="none" />
        <line x1="160" y1="110" x2="160" y2="180" stroke="#f8fafc" stroke-width="5" stroke-linecap="round" />
        <line x1="200" y1="100" x2="200" y2="190" stroke="#f8fafc" stroke-width="5" stroke-linecap="round" />
        <line x1="240" y1="95" x2="240" y2="195" stroke="#f8fafc" stroke-width="5" stroke-linecap="round" />
        <line x1="280" y1="95" x2="280" y2="190" stroke="#f8fafc" stroke-width="5" stroke-linecap="round" />
        <line x1="320" y1="100" x2="320" y2="180" stroke="#f8fafc" stroke-width="5" stroke-linecap="round" />
        <line x1="360" y1="108" x2="360" y2="170" stroke="#f8fafc" stroke-width="5" stroke-linecap="round" />
      </g>
      <!-- Bubbles Floating -->
      <circle cx="180" cy="380" r="10" fill="#ffffff" opacity="0.4" class="anim-float" />
      <circle cx="220" cy="320" r="16" fill="#ffffff" opacity="0.3" class="anim-float-delayed" />
      <circle cx="620" cy="220" r="12" fill="#ffffff" opacity="0.5" class="anim-float" />
    `;
  }
  // 4. PRASASTI BATUTULIS / CIARUTEUN / INSCRIPTION / STONE
  else if (lower.includes('prasasti') || lower.includes('batutulis') || lower.includes('ciaruteun') || lower.includes('batu')) {
    bgGradient = ['#18181b', '#27272a', '#71717a'];
    primaryColor = '#f59e0b';
    accentColor = '#38bdf8';
    illustrationSvg = `
      <!-- Ancient Megalithic Inscribed Stone -->
      <g class="anim-pulse-slow" transform="translate(250, 140)">
        <path d="M 60 40 Q 150 10 240 40 Q 290 120 280 280 Q 250 330 150 340 Q 40 330 20 270 Q 10 140 60 40 Z" fill="#3f3f46" stroke="#fbbf24" stroke-width="4" />
        <!-- Ancient Sundanese Runes/Inscriptions -->
        <path d="M 70 90 Q 150 75 230 90" stroke="#fef08a" stroke-width="4" stroke-linecap="round" fill="none" class="anim-glow" />
        <path d="M 65 130 Q 150 120 235 130" stroke="#fef08a" stroke-width="4" stroke-linecap="round" fill="none" class="anim-glow" />
        <path d="M 75 170 Q 150 160 225 170" stroke="#fef08a" stroke-width="4" stroke-linecap="round" fill="none" class="anim-glow" />
        <path d="M 80 210 Q 150 200 220 210" stroke="#fef08a" stroke-width="4" stroke-linecap="round" fill="none" class="anim-glow" />
        <!-- Royal Footprints (Dewa Wisnu Footprint for Ciaruteun) -->
        <g opacity="0.85" transform="translate(100, 230)">
          <ellipse cx="30" cy="40" rx="14" ry="24" fill="#38bdf8" />
          <circle cx="20" cy="10" r="4" fill="#38bdf8" />
          <circle cx="28" cy="8" r="4" fill="#38bdf8" />
          <circle cx="36" cy="10" r="4" fill="#38bdf8" />
          
          <ellipse cx="70" cy="40" rx="14" ry="24" fill="#38bdf8" />
          <circle cx="60" cy="10" r="4" fill="#38bdf8" />
          <circle cx="68" cy="8" r="4" fill="#38bdf8" />
          <circle cx="76" cy="10" r="4" fill="#38bdf8" />
        </g>
      </g>
      <!-- Magical Glowing Aura Rays -->
      <circle cx="400" cy="300" r="220" fill="url(#stoneAura)" opacity="0.3" class="anim-spin" />
    `;
  }
  // 5. MONUMEN KUJANG / KUJANG / TUGU
  else if (lower.includes('kujang') || lower.includes('monumen') || lower.includes('tugu')) {
    bgGradient = ['#1e1b4b', '#312e81', '#4338ca'];
    primaryColor = '#fbbf24';
    accentColor = '#38bdf8';
    illustrationSvg = `
      <!-- Monumen Kujang Pillar & Blade -->
      <g transform="translate(320, 100)">
        <!-- Pedestal Base -->
        <polygon points="40,360 120,360 100,280 60,280" fill="#cbd5e1" />
        <!-- Concrete Column Pillar -->
        <rect x="68" y="100" width="24" height="180" fill="#f8fafc" />
        <rect x="76" y="100" width="8" height="180" fill="#cbd5e1" />
        
        <!-- Sacred Kujang Blade (6m top ornament) -->
        <g class="anim-glow" transform="translate(20, -10)">
          <path d="M 60 110 C 20 80 30 20 70 0 C 80 40 100 50 110 30 C 110 70 90 90 75 110 Z" fill="#fbbf24" stroke="#d97706" stroke-width="3" />
          <!-- Kujang Holes (Lubang Kujang) -->
          <circle cx="65" cy="35" r="4" fill="#1e1b4b" />
          <circle cx="72" cy="52" r="4" fill="#1e1b4b" />
          <circle cx="78" cy="70" r="4" fill="#1e1b4b" />
        </g>
      </g>
      <!-- Radiant Light Beams -->
      <g class="anim-pulse-slow">
        <line x1="400" y1="100" x2="250" y2="20" stroke="#fef08a" stroke-width="3" opacity="0.6" />
        <line x1="400" y1="100" x2="550" y2="20" stroke="#fef08a" stroke-width="3" opacity="0.6" />
        <line x1="400" y1="100" x2="180" y2="100" stroke="#fef08a" stroke-width="3" opacity="0.4" />
        <line x1="400" y1="100" x2="620" y2="100" stroke="#fef08a" stroke-width="3" opacity="0.4" />
      </g>
    `;
  }
  // 6. GEREJA ZEBAOTH / CHURCH
  else if (lower.includes('gereja') || lower.includes('zebaoth')) {
    bgGradient = ['#0f172a', '#1e293b', '#334155'];
    primaryColor = '#38bdf8';
    accentColor = '#f59e0b';
    illustrationSvg = `
      <!-- Neoclassic Church Architecture -->
      <g transform="translate(220, 140)">
        <rect x="80" y="120" width="200" height="180" fill="#f8fafc" />
        <!-- Spire Tower -->
        <polygon points="150,120 180,10 210,120" fill="#e2e8f0" />
        <!-- Rooster Weathervane (Gereja Ayam) -->
        <g class="anim-spin" style="transform-origin: 180px 10px;">
          <circle cx="180" cy="10" r="3" fill="#fbbf24" />
          <path d="M 180 5 Q 185 -5 190 0 Q 185 8 180 5 Z" fill="#ef4444" />
        </g>
        <!-- Arched Windows & Doors -->
        <rect x="155" y="210" width="50" height="90" rx="25" fill="#1e293b" />
        <rect x="100" y="150" width="30" height="60" rx="15" fill="#38bdf8" opacity="0.8" />
        <rect x="230" y="150" width="30" height="60" rx="15" fill="#38bdf8" opacity="0.8" />
      </g>
    `;
  }
  // 7. MUSEUM PETA / MILITARY / FORTRESS
  else if (lower.includes('peta') || lower.includes('militer') || lower.includes('tentara')) {
    bgGradient = ['#14532d', '#166534', '#15803d']; // Army Green
    primaryColor = '#fbbf24';
    accentColor = '#ef4444';
    illustrationSvg = `
      <!-- Military Heritage Fortress & Red White Waving Flag -->
      <g transform="translate(200, 160)">
        <!-- Fortress Wall -->
        <rect x="50" y="100" width="300" height="150" fill="#334155" />
        <polygon points="40,100 70,60 100,100" fill="#475569" />
        <polygon points="300,100 330,60 360,100" fill="#475569" />
        <!-- Flagpole & Waving Red-White Indonesian Flag -->
        <line x1="200" y1="100" x2="200" y2="10" stroke="#e2e8f0" stroke-width="6" />
        <g class="anim-wave" style="transform-origin: 200px 10px;">
          <rect x="200" y="10" width="80" height="25" fill="#ef4444" />
          <rect x="200" y="35" width="80" height="25" fill="#ffffff" />
        </g>
        <!-- Crossed Swords Emblem -->
        <g class="anim-pulse-slow" transform="translate(180, 130)">
          <line x1="-30" y1="-30" x2="70" y2="70" stroke="#fbbf24" stroke-width="6" stroke-linecap="round" />
          <line x1="70" y1="-30" x2="-30" y2="70" stroke="#fbbf24" stroke-width="6" stroke-linecap="round" />
        </g>
      </g>
    `;
  }
  // 8. MUSEUM PERJUANGAN / HERO / TORCH
  else if (lower.includes('perjuangan') || lower.includes('obor') || lower.includes('kapten muslihat')) {
    bgGradient = ['#7f1d1d', '#991b1b', '#b91c1c']; // Revolution Red
    primaryColor = '#f59e0b';
    accentColor = '#ffffff';
    illustrationSvg = `
      <!-- Eternal Independence Torch & Flame -->
      <g transform="translate(330, 120)">
        <path d="M 50 180 L 30 320 L 110 320 L 90 180 Z" fill="#d97706" />
        <ellipse cx="70" cy="180" rx="25" ry="10" fill="#b45309" />
        <!-- Animated Burning Flame -->
        <g class="anim-flame" style="transform-origin: 70px 170px;">
          <path d="M 70 170 C 20 120 40 40 70 0 C 100 40 120 120 70 170 Z" fill="#ef4444" />
          <path d="M 70 170 C 40 130 50 70 70 30 C 90 70 100 130 70 170 Z" fill="#f97316" />
          <path d="M 70 170 C 50 140 60 100 70 60 C 80 100 90 140 70 170 Z" fill="#fef08a" />
        </g>
      </g>
    `;
  }
  // 9. STASIUN BOGOR / TRAIN
  else if (lower.includes('stasiun') || lower.includes('kereta') || lower.includes('commuter')) {
    bgGradient = ['#0c4a6e', '#075985', '#0284c7'];
    primaryColor = '#38bdf8';
    accentColor = '#f59e0b';
    illustrationSvg = `
      <!-- Neoclassic Station Facade & Moving Train -->
      <g transform="translate(180, 120)">
        <rect x="60" y="80" width="280" height="160" fill="#f8fafc" />
        <path d="M 50 80 Q 200 20 350 80 Z" fill="#cbd5e1" />
        <!-- Clock Tower -->
        <circle cx="200" cy="60" r="22" fill="#1e293b" stroke="#fbbf24" stroke-width="3" />
        <line x1="200" y1="60" x2="200" y2="48" stroke="#ffffff" stroke-width="3" />
        <line x1="200" y1="60" x2="210" y2="60" stroke="#ffffff" stroke-width="3" />
        <!-- Moving Electric Commuter Train -->
        <g class="anim-drive" transform="translate(0, 210)">
          <rect x="-100" y="0" width="220" height="60" rx="12" fill="#ef4444" />
          <rect x="-100" y="25" width="220" height="35" fill="#ffffff" />
          <rect x="-80" y="10" width="35" height="20" rx="4" fill="#38bdf8" />
          <rect x="-30" y="10" width="35" height="20" rx="4" fill="#38bdf8" />
          <rect x="20" y="10" width="35" height="20" rx="4" fill="#38bdf8" />
          <rect x="70" y="10" width="35" height="20" rx="4" fill="#38bdf8" />
        </g>
      </g>
    `;
  }
  // 10. SOTO MIE BOGOR / NOODLES / CULINARY
  else if (lower.includes('soto mie') || lower.includes('soto') || lower.includes('mie')) {
    bgGradient = ['#78350f', '#92400e', '#b45309'];
    primaryColor = '#fbbf24';
    accentColor = '#ef4444';
    illustrationSvg = `
      <!-- Steaming Bowl of Soto Mie Bogor -->
      <g transform="translate(250, 180)">
        <!-- Bowl -->
        <path d="M 30 100 Q 150 240 270 100 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="6" />
        <ellipse cx="150" cy="100" rx="120" ry="30" fill="#fef08a" />
        <!-- Yellow Noodles & Beef Chunk & Risoles -->
        <path d="M 60 95 Q 90 115 120 95 Q 150 115 180 95 Q 210 115 240 95" stroke="#f59e0b" stroke-width="12" fill="none" stroke-linecap="round" />
        <rect x="110" y="80" width="35" height="25" rx="6" fill="#78350f" />
        <rect x="155" y="85" width="40" height="20" rx="8" fill="#d97706" stroke="#fef08a" stroke-width="2" />
        <!-- Rising Steam Lines -->
        <path d="M 90 60 Q 80 30 100 0" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" class="anim-steam" />
        <path d="M 150 50 Q 170 20 140 -10" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.8" class="anim-steam-delayed" />
        <path d="M 210 60 Q 200 30 220 0" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" class="anim-steam" />
      </g>
    `;
  }
  // 11. ASINAN BOGOR / TROPICAL FRUITS
  else if (lower.includes('asinan')) {
    bgGradient = ['#831843', '#9d174d', '#be185d'];
    primaryColor = '#f43f5e';
    accentColor = '#fef08a';
    illustrationSvg = `
      <!-- Jar / Bowl of Asinan Fruit & Veggie -->
      <g transform="translate(260, 160)">
        <ellipse cx="140" cy="120" rx="110" ry="30" fill="#fda4af" />
        <path d="M 30 120 Q 140 240 250 120 Z" fill="#f43f5e" opacity="0.9" />
        <!-- Fruit Slices (Mango, Pineapple, Salak, Ubi) -->
        <circle cx="100" cy="115" r="22" fill="#facc15" />
        <circle cx="150" cy="110" r="25" fill="#f97316" />
        <circle cx="185" cy="120" r="20" fill="#a855f7" />
        <!-- Chili & Peanut toppings -->
        <ellipse cx="140" cy="125" rx="60" ry="15" fill="#e11d48" opacity="0.6" />
        <circle cx="130" cy="120" r="4" fill="#78350f" />
        <circle cx="145" cy="115" r="4" fill="#78350f" />
        <circle cx="160" cy="122" r="4" fill="#78350f" />
      </g>
      <!-- Sparkles -->
      <circle cx="220" cy="180" r="6" fill="#fef08a" class="anim-glow" />
      <circle cx="580" cy="220" r="8" fill="#fef08a" class="anim-glow" />
    `;
  }
  // 12. LAKSA BOGOR / CURRY / ONCOM
  else if (lower.includes('laksa')) {
    bgGradient = ['#713f12', '#854d0e', '#a16207'];
    primaryColor = '#facc15';
    accentColor = '#16a34a';
    illustrationSvg = `
      <!-- Yellow Coconut Curry Laksa Bowl -->
      <g transform="translate(250, 180)">
        <path d="M 30 100 Q 150 240 270 100 Z" fill="#1e293b" />
        <ellipse cx="150" cy="100" rx="115" ry="30" fill="#facc15" />
        <!-- Oncom & Basil leaves -->
        <rect x="110" y="85" width="45" height="25" rx="4" fill="#dc2626" />
        <ellipse cx="175" cy="95" rx="18" ry="10" fill="#16a34a" />
        <!-- Steam -->
        <path d="M 150 50 Q 130 20 160 -10" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" class="anim-steam" />
      </g>
    `;
  }
  // 13. LAPIS TALAS BOGOR / TARO CAKE
  else if (lower.includes('lapis') || lower.includes('talas') || lower.includes('roti unyil') || lower.includes('bika')) {
    bgGradient = ['#4c1d95', '#5b21b6', '#6d28d9']; // Purple Taro
    primaryColor = '#c084fc';
    accentColor = '#fef08a';
    illustrationSvg = `
      <!-- Purple Taro Layer Cake with Shredded Cheese Top -->
      <g transform="translate(220, 180)">
        <path d="M 30 120 L 150 40 L 330 100 L 210 180 Z" fill="#fef08a" /> <!-- Cheese top -->
        <!-- Layer 1 Purple -->
        <path d="M 30 120 L 210 180 L 210 220 L 30 160 Z" fill="#7e22ce" />
        <!-- Layer 2 Yellow -->
        <path d="M 30 160 L 210 220 L 210 240 L 30 180 Z" fill="#facc15" />
        <!-- Layer 3 Purple -->
        <path d="M 30 180 L 210 240 L 210 280 L 30 220 Z" fill="#6b21a8" />
        <!-- Side depth -->
        <path d="M 210 180 L 330 100 L 330 200 L 210 280 Z" fill="#581c87" />
      </g>
      <!-- Sparkle stars -->
      <g class="anim-glow">
        <polygon points="180,120 185,130 195,135 185,140 180,150 175,140 165,135 175,130" fill="#fef08a" />
        <polygon points="620,180 625,190 635,195 625,200 620,210 615,200 605,195 615,190" fill="#fef08a" />
      </g>
    `;
  }
  // 14. HISTORICAL FIGURES & AVATARS
  else if (category === 'avatar' || category === 'figures' || lower.includes('prabu') || lower.includes('siliwangi') || lower.includes('raden saleh') || lower.includes('djuanda') || lower.includes('natsir') || lower.includes('purnawarman') || lower.includes('tokoh') || lower.includes('pahlawan')) {
    bgGradient = ['#1e1b4b', '#312e81', '#4338ca'];
    primaryColor = '#fbbf24';
    accentColor = '#38bdf8';
    illustrationSvg = `
      <!-- Royal / Creative Avatar Silhouette with Golden Crown & Orbiting Shield -->
      <g transform="translate(280, 100)">
        <circle cx="120" cy="120" r="110" fill="url(#heroAura)" class="anim-pulse-slow" />
        <!-- Head & Shoulders -->
        <circle cx="120" cy="85" r="42" fill="#f8fafc" />
        <path d="M 50 210 Q 120 140 190 210 Z" fill="#f8fafc" />
        <!-- Golden Crown / Headpiece -->
        <polygon points="85,50 100,20 120,40 140,20 155,50" fill="#fbbf24" stroke="#d97706" stroke-width="3" />
        <circle cx="120" cy="40" r="5" fill="#ef4444" />
      </g>
      <circle cx="400" cy="220" r="170" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8 8" class="anim-spin" />
    `;
  }
  // 15. COFFEE & KOPITIAM (KOPI NAKO, RAINDEAR, KEMENADY, BAH SIPIT, KOBA)
  else if (lower.includes('kopi') || lower.includes('coffee') || lower.includes('kopitiam')) {
    bgGradient = ['#291406', '#451a03', '#78350f']; // Deep Roast Amber
    primaryColor = '#fbbf24';
    accentColor = '#f59e0b';
    illustrationSvg = `
      <!-- Artisan Coffee Cup with Latte Art & Floating Coffee Beans -->
      <g transform="translate(240, 130)">
        <!-- Saucer -->
        <ellipse cx="160" cy="240" rx="140" ry="25" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4" />
        <!-- Ceramic Cup -->
        <path d="M 60 120 L 80 220 Q 160 250 240 220 L 260 120 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4" />
        <!-- Cup Handle -->
        <path d="M 250 140 C 290 140 290 200 240 200" stroke="#f8fafc" stroke-width="16" fill="none" stroke-linecap="round" />
        <!-- Coffee Surface with Heart Latte Art -->
        <ellipse cx="160" cy="120" rx="100" ry="26" fill="#78350f" />
        <ellipse cx="160" cy="120" rx="60" ry="16" fill="#fbbf24" opacity="0.9" />
        <!-- Steam rising -->
        <path d="M 130 90 Q 120 60 140 30" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" class="anim-steam" />
        <path d="M 170 80 Q 180 50 160 20" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" class="anim-steam-delayed" />
        <!-- Floating Coffee Beans -->
        <g class="anim-float" transform="translate(40, 40)">
          <ellipse cx="0" cy="0" rx="12" ry="18" fill="#451a03" stroke="#fbbf24" stroke-width="2" />
          <path d="M 0 -15 Q 4 0 0 15" stroke="#fbbf24" stroke-width="2" fill="none" />
        </g>
        <g class="anim-float" transform="translate(270, 60)">
          <ellipse cx="0" cy="0" rx="10" ry="15" fill="#451a03" stroke="#fbbf24" stroke-width="2" />
          <path d="M 0 -12 Q 3 0 0 12" stroke="#fbbf24" stroke-width="2" fill="none" />
        </g>
      </g>
    `;
  }
  // 15b. BAKSO & MIE AYAM & BATAGOR (TITOTI, SEUSEUPAN, REOG, BRAGI)
  else if (lower.includes('bakso') || lower.includes("ba'so") || lower.includes('mie ayam') || lower.includes('batagor') || lower.includes('siomay')) {
    bgGradient = ['#7c2d12', '#991b1b', '#b91c1c']; // Hot Chili Broth
    primaryColor = '#fbbf24';
    accentColor = '#22c55e';
    illustrationSvg = `
      <!-- Steaming Bowl of Meatballs, Noodles & Crisp Wonton -->
      <g transform="translate(240, 130)">
        <!-- Ceramic Bowl -->
        <path d="M 30 130 Q 160 280 290 130 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="6" />
        <!-- Golden Broth Surface -->
        <ellipse cx="160" cy="130" rx="130" ry="32" fill="#f59e0b" />
        <!-- Round Meatballs (Bakso) -->
        <circle cx="110" cy="120" r="28" fill="#78350f" stroke="#92400e" stroke-width="3" />
        <circle cx="170" cy="110" r="32" fill="#78350f" stroke="#92400e" stroke-width="3" />
        <circle cx="220" cy="125" r="26" fill="#78350f" stroke="#92400e" stroke-width="3" />
        <!-- Yellow Noodles & Green Scallions -->
        <path d="M 70 125 Q 100 145 130 125 Q 160 145 190 125" stroke="#facc15" stroke-width="8" fill="none" stroke-linecap="round" />
        <circle cx="140" cy="115" r="5" fill="#22c55e" />
        <circle cx="195" cy="130" r="5" fill="#22c55e" />
        <circle cx="165" cy="138" r="5" fill="#22c55e" />
        <!-- Steam -->
        <path d="M 120 80 Q 110 50 130 20" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" class="anim-steam" />
        <path d="M 180 70 Q 190 40 170 10" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" class="anim-steam-delayed" />
      </g>
    `;
  }
  // 15c. MARTABAK & BAKERY & KUE (MARTABAK ENCEK, AFO, MICHELLE, VENUS, RAFITA)
  else if (lower.includes('martabak') || lower.includes('bakery') || lower.includes('cake') || lower.includes('roti') || lower.includes('kue') || lower.includes('brownies') || lower.includes('dodol')) {
    bgGradient = ['#451a03', '#78350f', '#b45309']; // Warm Pastry Amber
    primaryColor = '#facc15';
    accentColor = '#ec4899';
    illustrationSvg = `
      <!-- Fresh Bakery Pan, Golden Sweet Martabak & Croissant / Roti -->
      <g transform="translate(230, 140)">
        <!-- Golden Baked Base / Cake -->
        <ellipse cx="170" cy="220" rx="140" ry="40" fill="#d97706" stroke="#fbbf24" stroke-width="4" />
        <ellipse cx="170" cy="200" rx="140" ry="40" fill="#fbbf24" />
        <!-- Melted Butter & Chocolate Toppings -->
        <ellipse cx="170" cy="195" rx="110" ry="30" fill="#78350f" opacity="0.85" />
        <circle cx="120" cy="190" r="8" fill="#fef08a" />
        <circle cx="160" cy="195" r="9" fill="#fef08a" />
        <circle cx="210" cy="190" r="8" fill="#fef08a" />
        <!-- Fluffy Roti & Pastry Swirl -->
        <g class="anim-float" transform="translate(170, 90)">
          <ellipse cx="0" cy="0" rx="40" ry="30" fill="#f59e0b" stroke="#ffffff" stroke-width="3" />
          <path d="M -25 -5 Q 0 -20 25 -5" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" />
        </g>
      </g>
      <circle cx="200" cy="140" r="6" fill="#fef08a" class="anim-glow" />
      <circle cx="600" cy="180" r="8" fill="#fef08a" class="anim-glow" />
    `;
  }
  // 15d. RESTORAN HYPE & KAFE (MEDJA, BUMI AKI, DE LEUIT, KEDAI KITA, SEAFOOD)
  else if (lower.includes('restoran') || lower.includes('resto') || lower.includes('cafe') || lower.includes('kedai') || lower.includes('medja') || lower.includes('de’leuit') || lower.includes('bumi aki') || lower.includes('macaroni') || lower.includes('glass house') || lower.includes('gurih 7') || lower.includes('seafood') || lower.includes('kerang') || lower.includes('ikan')) {
    bgGradient = ['#451a03', '#78350f', '#92400e']; // Warm Bistro Mahogany
    primaryColor = '#fbbf24';
    accentColor = '#f97316';
    illustrationSvg = `
      <!-- Cozy Bistro Dining Table, Steaming Coffee Cup & Hanging Vintage Lamp -->
      <g transform="translate(220, 120)">
        <!-- Hanging Warm Pendant Lamp -->
        <line x1="180" y1="0" x2="180" y2="70" stroke="#fbbf24" stroke-width="4" />
        <polygon points="150,110 210,110 190,70 170,70" fill="#f59e0b" />
        <circle cx="180" cy="115" r="20" fill="#fef08a" class="anim-pulse-slow" />
        <!-- Dining Table -->
        <ellipse cx="180" cy="270" rx="150" ry="35" fill="#78350f" stroke="#fbbf24" stroke-width="3" />
        <!-- Steaming Cup & Dish -->
        <ellipse cx="180" cy="255" rx="30" ry="10" fill="#ffffff" />
        <path d="M 160 255 Q 180 220 200 255 Z" fill="#d97706" />
        <!-- Rising Aroma Steam -->
        <path d="M 170 210 Q 160 180 180 150" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" class="anim-steam" />
        <path d="M 190 200 Q 200 170 180 140" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" class="anim-steam-delayed" />
      </g>
    `;
  }
  // 16. INSTANSI PEMERINTAHAN (BALAI KOTA, DPRD, RSUD, POLRESTA, IMIGRASI)
  else if (lower.includes('balai kota') || lower.includes('dprd') || lower.includes('rsud') || lower.includes('polresta') || lower.includes('imigrasi') || lower.includes('bapperida') || lower.includes('instansi')) {
    bgGradient = ['#062c43', '#05445e', '#189ab4']; // Civic Navy Blue
    primaryColor = '#64dfdf';
    accentColor = '#fbbf24';
    illustrationSvg = `
      <!-- Government Civic Building Columns & Dome -->
      <g transform="translate(200, 140)">
        <!-- Dome -->
        <path d="M 140 100 Q 200 30 260 100 Z" fill="#fbbf24" opacity="0.9" />
        <rect x="145" y="100" width="110" height="20" fill="#fbbf24" />
        <!-- Facade Base -->
        <rect x="50" y="120" width="300" height="150" fill="#f8fafc" />
        <!-- Columns -->
        <rect x="80" y="140" width="16" height="130" fill="#cbd5e1" />
        <rect x="130" y="140" width="16" height="130" fill="#cbd5e1" />
        <rect x="180" y="140" width="16" height="130" fill="#cbd5e1" />
        <rect x="230" y="140" width="16" height="130" fill="#cbd5e1" />
        <rect x="280" y="140" width="16" height="130" fill="#cbd5e1" />
        <rect x="30" y="270" width="340" height="20" fill="#94a3b8" />
      </g>
      <circle cx="400" cy="180" r="160" fill="none" stroke="#64dfdf" stroke-width="2" stroke-dasharray="6 6" class="anim-spin" />
    `;
  }
  // 17. VIDEO ARCHIVE & YOUTUBE DOKUMENTER
  else if (category === 'video' || lower.includes('arsip') || lower.includes('youtube') || lower.includes('film') || lower.includes('video') || lower.includes('dokumenter')) {
    bgGradient = ['#881337', '#9f1239', '#be123c']; // Cinema Burgundy Red
    primaryColor = '#f43f5e';
    accentColor = '#fbbf24';
    illustrationSvg = `
      <!-- Vintage Cinema Film Reel & Glowing Play Button -->
      <g transform="translate(250, 120)">
        <!-- Rotating Film Reel -->
        <g class="anim-spin" style="transform-origin: 150px 140px;">
          <circle cx="150" cy="140" r="110" fill="#1e293b" stroke="#f43f5e" stroke-width="8" />
          <circle cx="150" cy="140" r="30" fill="#f43f5e" />
          <!-- Reel Spokes -->
          <circle cx="150" cy="70" r="22" fill="#0f172a" />
          <circle cx="210" cy="110" r="22" fill="#0f172a" />
          <circle cx="210" cy="170" r="22" fill="#0f172a" />
          <circle cx="150" cy="210" r="22" fill="#0f172a" />
          <circle cx="90" cy="170" r="22" fill="#0f172a" />
          <circle cx="90" cy="110" r="22" fill="#0f172a" />
        </g>
        <!-- Overlay Golden Play Triangle -->
        <polygon points="140,110 180,140 140,170" fill="#fbbf24" class="anim-pulse-slow" />
      </g>
    `;
  }
  // 18. CREATIVE STUDIO & ILUSTRASI / SKETSA
  else if (category === 'ilustrasi' || lower.includes('sketsa') || lower.includes('desain') || lower.includes('kreatif') || lower.includes('studio') || lower.includes('lukis')) {
    bgGradient = ['#312e81', '#4338ca', '#6366f1']; // Creative Indigo
    primaryColor = '#818cf8';
    accentColor = '#f43f5e';
    illustrationSvg = `
      <!-- Artist Canvas Easel, Color Palette & Magic Paintbrush -->
      <g transform="translate(240, 120)">
        <!-- Wooden Easel Legs -->
        <line x1="160" y1="20" x2="80" y2="290" stroke="#78350f" stroke-width="10" stroke-linecap="round" />
        <line x1="160" y1="20" x2="240" y2="290" stroke="#78350f" stroke-width="10" stroke-linecap="round" />
        <line x1="160" y1="20" x2="160" y2="290" stroke="#92400e" stroke-width="8" stroke-linecap="round" />
        <!-- Canvas Board -->
        <rect x="70" y="60" width="180" height="140" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4" />
        <!-- Artwork on Canvas -->
        <circle cx="160" cy="120" r="35" fill="#f43f5e" opacity="0.8" />
        <path d="M 100 170 Q 160 110 220 170 Z" fill="#38bdf8" />
        <!-- Floating Color Palette -->
        <g class="anim-float" transform="translate(190, 150)">
          <path d="M 0 30 C 0 0 60 0 80 30 C 100 60 60 90 20 80 C -10 70 0 50 0 30 Z" fill="#fbbf24" />
          <circle cx="20" cy="25" r="6" fill="#ef4444" />
          <circle cx="40" cy="20" r="6" fill="#3b82f6" />
          <circle cx="60" cy="30" r="6" fill="#22c55e" />
          <circle cx="55" cy="55" r="6" fill="#a855f7" />
        </g>
      </g>
    `;
  }
  // 19. TOURISM / TEH / SAFARI / WATERFALL
  else if (lower.includes('safari') || lower.includes('puncak') || lower.includes('curug') || lower.includes('wisata') || lower.includes('gunung') || lower.includes('lembah')) {
    bgGradient = ['#064e3b', '#047857', '#0d9488'];
    primaryColor = '#2dd4bf';
    accentColor = '#fef08a';
    illustrationSvg = `
      <!-- Mountains, Rolling Hills & Cascading Waterfall -->
      <g transform="translate(100, 120)">
        <polygon points="50,280 200,80 350,280" fill="#065f46" />
        <polygon points="250,280 400,100 550,280" fill="#047857" />
        <!-- Waterfall Stream -->
        <path d="M 395 100 Q 405 200 390 280" stroke="#38bdf8" stroke-width="24" fill="none" class="anim-steam" />
        <!-- Sun Beams -->
        <circle cx="100" cy="60" r="45" fill="#fef08a" class="anim-pulse-slow" />
      </g>
    `;
  }
  // 20. SHOPPING / UMKM / CHINATOWN / BATIK / CRAFT
  else if (lower.includes('umkm') || lower.includes('batik') || lower.includes('suryakencana') || lower.includes('kriya') || lower.includes('tas') || lower.includes('craft') || lower.includes('pasar') || lower.includes('pecinan')) {
    bgGradient = ['#7c2d12', '#9a3412', '#c2410c'];
    primaryColor = '#f97316';
    accentColor = '#fef08a';
    illustrationSvg = `
      <!-- Chinatown Archway (Paifang) / Batik Pattern Roll -->
      <g transform="translate(220, 140)">
        <!-- Red Lanterns Swinging -->
        <g class="anim-wave" style="transform-origin: 80px 40px;">
          <line x1="80" y1="0" x2="80" y2="40" stroke="#fef08a" stroke-width="3" />
          <ellipse cx="80" cy="60" rx="25" ry="20" fill="#ef4444" />
        </g>
        <g class="anim-wave" style="transform-origin: 280px 40px;">
          <line x1="280" y1="0" x2="280" y2="40" stroke="#fef08a" stroke-width="3" />
          <ellipse cx="280" cy="60" rx="25" ry="20" fill="#ef4444" />
        </g>
        <!-- Paifang Roof -->
        <path d="M 20 90 Q 180 30 340 90 L 320 120 Q 180 70 40 120 Z" fill="#dc2626" />
        <rect x="60" y="120" width="24" height="150" fill="#ef4444" />
        <rect x="276" y="120" width="24" height="150" fill="#ef4444" />
      </g>
    `;
  }
  // 21. DEFAULT VECTOR ILLUSTRATION FOR ANY WORD/CONCEPT

  else {
    bgGradient = ['#0f172a', '#1e293b', '#0369a1'];
    primaryColor = '#38bdf8';
    accentColor = '#f59e0b';
    illustrationSvg = `
      <!-- Creative Vector Badge & Compass Emblem -->
      <g transform="translate(280, 140)">
        <circle cx="120" cy="120" r="100" fill="#0284c7" opacity="0.4" class="anim-pulse-slow" />
        <circle cx="120" cy="120" r="80" stroke="#38bdf8" stroke-width="6" fill="none" stroke-dasharray="12 6" class="anim-spin" />
        <!-- Centered Emblem -->
        <polygon points="120,50 135,105 190,120 135,135 120,190 105,135 50,120 105,105" fill="#fbbf24" />
      </g>
    `;
  }

  // Sanitize label for SVG rendering
  const displayTitle = cleanTitle.length > 32 ? cleanTitle.substring(0, 30) + '...' : cleanTitle;
  const displaySub = subText ? (subText.length > 40 ? subText.substring(0, 38) + '...' : subText) : category.toUpperCase();

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradient[0]}" />
      <stop offset="50%" stop-color="${bgGradient[1]}" />
      <stop offset="100%" stop-color="${bgGradient[2]}" />
    </linearGradient>
    <radialGradient id="heroAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="stoneAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
  </defs>

  <style>
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
    @keyframes floatDelayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
    @keyframes pulseSlow { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.04); opacity: 1; } }
    @keyframes spinSlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes steamRise { 0% { transform: translateY(0) scaleX(1); opacity: 0.2; } 50% { opacity: 0.9; } 100% { transform: translateY(-30px) scaleX(1.4); opacity: 0; } }
    @keyframes waveMotion { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
    @keyframes bounceAnim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes flutterWing { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.3); } }
    @keyframes glowPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
    @keyframes driveTrain { 0% { transform: translate(-120px, 210px); } 100% { transform: translate(320px, 210px); } }

    .anim-float { animation: float 4s ease-in-out infinite; }
    .anim-float-delayed { animation: floatDelayed 5s ease-in-out infinite 1s; }
    .anim-pulse-slow { animation: pulseSlow 3.5s ease-in-out infinite; }
    .anim-spin { animation: spinSlow 20s linear infinite; transform-origin: center; }
    .anim-steam { animation: steamRise 2.5s linear infinite; }
    .anim-steam-delayed { animation: steamRise 2.5s linear infinite 1.2s; }
    .anim-wave { animation: waveMotion 3s ease-in-out infinite; }
    .anim-bounce { animation: bounceAnim 2s ease-in-out infinite; }
    .anim-bounce-delayed { animation: bounceAnim 2s ease-in-out infinite 0.8s; }
    .anim-flutter { animation: flutterWing 0.4s ease-in-out infinite; }
    .anim-glow { animation: glowPulse 2s ease-in-out infinite; }
    .anim-drive { animation: driveTrain 6s linear infinite; }

    .title-text { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 900; fill: #ffffff; font-size: 26px; letter-spacing: 0.5px; }
    .sub-text { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; fill: ${primaryColor}; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; }
  </style>

  <!-- Canvas Background -->
  <rect width="800" height="500" fill="url(#bgGrad)" />

  <!-- Decorative Grid Gridlines -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="100" x2="800" y2="100" />
    <line x1="0" y1="200" x2="800" y2="200" />
    <line x1="0" y1="300" x2="800" y2="300" />
    <line x1="0" y1="400" x2="800" y2="400" />
    <line x1="200" y1="0" x2="200" y2="500" />
    <line x1="400" y1="0" x2="400" y2="500" />
    <line x1="600" y1="0" x2="600" y2="500" />
  </g>

  <!-- Vector Illustration Layer -->
  ${illustrationSvg}

  <!-- Lower Overlay Banner with Word/Title Representation -->
  <rect x="0" y="390" width="800" height="110" fill="#020617" opacity="0.82" />
  <line x1="0" y1="390" x2="800" y2="390" stroke="${primaryColor}" stroke-width="2" opacity="0.6" />

  <!-- Title & Category Badge Text inside SVG -->
  <g transform="translate(40, 428)">
    <!-- Subtitle / Category Badge -->
    <rect x="0" y="-18" width="${Math.min(displaySub.length * 9 + 20, 300)}" height="22" rx="11" fill="${primaryColor}" opacity="0.25" />
    <text x="10" y="-3" class="sub-text">${displaySub}</text>
    <!-- Main Concept Word/Title -->
    <text x="0" y="32" class="title-text">${displayTitle}</text>
  </g>

  <!-- Vector Illustration Icon Tag -->
  <g transform="translate(730, 435)" class="anim-pulse-slow">
    <circle cx="0" cy="0" r="22" fill="${accentColor}" opacity="0.2" />
    <circle cx="0" cy="0" r="16" fill="${accentColor}" />
    <text x="0" y="5" text-anchor="middle" font-size="14" fill="#0f172a" font-weight="bold">✨</text>
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}
