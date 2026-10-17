import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Compass,
  Volume2,
  VolumeX,
  CloudRain,
  Sun,
  Sunset,
  Moon,
  Cloud,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Info,
  X,
  HelpCircle,
  Radio,
} from 'lucide-react';
import { useLanguage } from '../utils/translations';

interface Bogor3DOpeningProps {
  onEnterApp: () => void;
  isInitialOpening?: boolean;
}

type CameraPreset = 'kujang' | 'salapan' | 'istana' | 'kebun' | 'ciliwung' | 'salak' | 'free';
type TimeOfDay = 'day' | 'morning' | 'sunset' | 'night';

// Pre-allocated math objects to guarantee 60fps zero-GC animation loop
const _colorTemp = new THREE.Color();
const _colorTemp2 = new THREE.Color();

export const Bogor3DOpening: React.FC<Bogor3DOpeningProps> = ({
  onEnterApp,
  isInitialOpening = true,
}) => {
  const { lang, t } = useLanguage();
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // UI state
  const [activePreset, setActivePreset] = useState<CameraPreset>('kujang');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [isRaining, setIsRaining] = useState<boolean>(true); // Signature Kota Hujan default!
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [showTouchHint, setShowTouchHint] = useState<boolean>(true);
  const [landmarkInfo, setLandmarkInfo] = useState<{
    id: CameraPreset;
    title: string;
    subtitle: string;
    desc: string;
    year: string;
    funFact: string;
  } | null>(null);

  // Audio Context and gain nodes refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);

  // Three.js mutable state refs
  const stateRef = useRef({
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    controls: {
      isPointerDown: false,
      pointerStartX: 0,
      pointerStartY: 0,
      orbitTheta: Math.PI * 0.28,
      orbitPhi: Math.PI * 0.35,
      orbitRadius: 42,
      targetRadius: 42,
      targetTheta: Math.PI * 0.28,
      targetPhi: Math.PI * 0.35,
      lookAt: new THREE.Vector3(0, 11, 0),
      targetLookAt: new THREE.Vector3(0, 11, 0),
      // Multi-touch pinch zoom support
      touchPointers: new Map<number, { x: number; y: number }>(),
      initialPinchDist: 0,
      initialRadius: 42,
    },
    carGroups: [] as { group: THREE.Group; speed: number; angle: number; radius: number }[],
    deerGroups: [] as {
      group: THREE.Group;
      neck: THREE.Group;
      head: THREE.Mesh;
      baseRotX: number;
      isGrazing: boolean;
      speed: number;
    }[],
    rainPoints: null as THREE.Points | null,
    riverMesh: null as THREE.Mesh | null,
    cloudGroups: [] as THREE.Group[],
    fireflyPoints: null as THREE.Points | null,
    dirLight: null as THREE.DirectionalLight | null,
    hemiLight: null as THREE.HemisphereLight | null,
    kujangSpotLight: null as THREE.SpotLight | null,
    salapanLights: [] as THREE.PointLight[],
    palaceLights: [] as THREE.PointLight[],
    streetLights: [] as THREE.PointLight[],
    groundMaterial: null as THREE.MeshStandardMaterial | null,
    roadMaterial: null as THREE.MeshStandardMaterial | null,
    timeOfDay: 'day' as TimeOfDay,
    isRaining: true,
    activePreset: 'kujang' as CameraPreset,
  });

  // Keep stateRef synced with React state for animation loop
  useEffect(() => {
    stateRef.current.timeOfDay = timeOfDay;
    stateRef.current.isRaining = isRaining;
    stateRef.current.activePreset = activePreset;

    // Update landmark info card
    if (activePreset === 'kujang') {
      setLandmarkInfo({
        id: 'kujang',
        title: lang === 'en' ? 'Kujang Monument (Monumen Kujang)' : 'Monumen Kujang Bogor',
        subtitle: lang === 'en' ? 'Sacred West Java Heirloom' : 'Pusaka Luhur Pajajaran',
        desc:
          lang === 'en'
            ? 'Erected in 1982, standing 25 meters tall in honor of the ancestral Sunda Kingdom and the sacred Kujang heirloom blade of King Prabu Siliwangi.'
            : 'Dibangun tahun 1982 setinggi 25 meter sebagai simbol pusaka Prabu Siliwangi dan kejayaan Kerajaan Sunda Pajajaran.',
        year: '1982',
        funFact:
          lang === 'en'
            ? 'Features 3 sacred perforations (Mata Kujang) representing Trimurti & Tri Tangtu Sunda.'
            : 'Bilah memiliki 3 lubang pusaka (Mata Kujang) bermakna filosofis Tri Tangtu Sunda.',
      });
    } else if (activePreset === 'salapan') {
      setLandmarkInfo({
        id: 'salapan',
        title: lang === 'en' ? 'Lawang Salapan (9 Heritage Arches)' : 'Lawang Salapan (Tepas Salapan Lawang)',
        subtitle: lang === 'en' ? 'Pajajaran Motto Heritage Gateway' : 'Gerbang Pusaka Sembilan Pintu',
        desc:
          lang === 'en'
            ? 'A majestic neoclassical gateway with 9 colonnaded arches right next to Tugu Kujang, bearing the sacred ancient Sundanese inscription: "Di Nu Kiwari Ngancik Nu Bihari".'
            : 'Gerbang 9 pilar megah di samping Tugu Kujang berhiaskan prasasti Sunda: "Di Nu Kiwari Ngancik Nu Bihari, Seja Ayeuna Sampeureun Jaga" (Di masa kini ada masa lalu, mari berbuat baik untuk masa depan).',
        year: '2016',
        funFact:
          lang === 'en'
            ? 'The 9 pillars symbolize the 9 human senses and 9 kingdom administrative gates.'
            : 'Sembilan pintu melambangkan 9 gerbang spiritual dan babak sejarah Pajajaran.',
      });
    } else if (activePreset === 'istana') {
      setLandmarkInfo({
        id: 'istana',
        title: lang === 'en' ? 'Buitenzorg Presidential Palace' : 'Istana Kepresidenan Bogor',
        subtitle: lang === 'en' ? 'Historic Axis Deer Sanctuary' : 'Kediaman Resmi & Kawanan Rusa Tutul',
        desc:
          lang === 'en'
            ? 'Commissioned in 1744 by Governor-General Van Imhoff with classical white Corinthian porticos, reflecting pools, and hundreds of spotted axis deer grazing peacefully.'
            : 'Dibangun tahun 1744 bergaya neoklasik anggun oleh Van Imhoff. Dikelilingi halaman rumput luas dengan ratusan Rusa Tutul (Axis axis) hadiah Gubernur Madras 1814.',
        year: '1744',
        funFact:
          lang === 'en'
            ? 'The first 6 axis deer were imported from the Coromandel coast of India in 1814.'
            : 'Enam rusa pertama didatangkan langsung dari perbatasan India pada tahun 1814.',
      });
    } else if (activePreset === 'kebun') {
      setLandmarkInfo({
        id: 'kebun',
        title: lang === 'en' ? 'Bogor Botanical Gardens (Samida)' : 'Kebun Raya Bogor & Hutan Kenari',
        subtitle: lang === 'en' ? 'Oldest Tropical Botanical Garden in Asia' : 'Hutan Lindung Sejak Era Sri Baduga 1474 M',
        desc:
          lang === 'en'
            ? 'Spanning 87 hectares with over 15,000 species of tropical trees. Roots trace back to the royal sacred conservation forest "Samida" initiated by Pajajaran in 1474 M.'
            : 'Didirikan C.G.C. Reinwardt 1817 di atas tanah hutan lindung buatan Sri Baduga Maharaja Pajajaran (1474 M) dengan puluhan ribu pohon kanopi raksasa.',
        year: '1817 / 1474 M',
        funFact:
          lang === 'en'
            ? 'Home to 150-year-old giant Kenari trees that provide cooling shade across Bogor.'
            : 'Terdapat Pohon Kenari purba berusia lebih dari 150 tahun yang memberi kesejukan kota.',
      });
    } else if (activePreset === 'ciliwung') {
      setLandmarkInfo({
        id: 'ciliwung',
        title: lang === 'en' ? 'Ciliwung River & Heritage Bridges' : 'Sungai Ciliwung & Jembatan Pusaka',
        subtitle: lang === 'en' ? 'The Lifeline of Ancient Pajajaran' : 'Urat Nadi Kerajaan Sunda & Kota Bogor',
        desc:
          lang === 'en'
            ? 'The historic river flowing through the heart of Bogor from the volcanic springs of Mount Pangrango, flanked by tropical foliage and heritage stone bridges.'
            : 'Sungai bersejarah yang mengalir membelah Kota Bogor dari lereng Gunung Gede-Pangrango, menjadi jalur transportasi air utama era Kerajaan Sunda Pajajaran.',
        year: 'Alami / Abad 15',
        funFact:
          lang === 'en'
            ? 'Ciliwung was the main river route connecting Pakuan Pajajaran capital to Sunda Kelapa port.'
            : 'Jalur sungai ini menghubungkan ibu kota Pakuan Pajajaran langsung ke pelabuhan Sunda Kelapa.',
      });
    } else if (activePreset === 'salak') {
      setLandmarkInfo({
        id: 'salak',
        title: lang === 'en' ? 'Mount Salak Skyline & Rain Clouds' : 'Panorama Gunung Salak & Awan Hujan',
        subtitle: lang === 'en' ? 'Source of Bogor’s Famed Orographic Rain' : 'Puncak Kembar Penjaga Kota Hujan',
        desc:
          lang === 'en'
            ? 'The legendary volcanic twin-peak of West Java (2,211 m), causing warm moisture from the Java Sea to rise, cool, and produce Bogor’s signature cooling afternoon drizzle.'
            : 'Gunung berapi legendaris Jawa Barat (2.211 mdpl) berkabut abadi. Memicu hujan orografis khas yang menjadikan Bogor dijuluki Kota Hujan dengan udara sejuk alami.',
        year: 'Geologi Purba',
        funFact:
          lang === 'en'
            ? 'Bogor experiences an average of 322 thunderstorm days annually—among the highest in the world!'
            : 'Bogor tercatat memiliki rata-rata 322 hari guruh per tahun, salah satu tertinggi di dunia!',
      });
    } else {
      setLandmarkInfo(null);
    }
  }, [timeOfDay, isRaining, activePreset, lang]);

  // Audio ambience using Web Audio API (rain drizzle, thunder rumble, bird chirps, crickets)
  useEffect(() => {
    if (!isAudioActive) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new AudioCtxClass();
        audioCtxRef.current = ctx;

        // 1. Procedural Pink Noise Rain
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 1.1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const rainFilter = ctx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(850, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.09, ctx.currentTime);
        rainGainRef.current = gainNode;

        whiteNoise.connect(rainFilter);
        rainFilter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start(0);

        // 2. Periodic gentle tropical bird chirping in morning/day
        const birdInterval = setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
          try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const birdGain = ctx.createGain();
            osc.type = 'sine';
            const baseFreq = 2300 + Math.random() * 700;
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.07);
            osc.frequency.exponentialRampToValueAtTime(baseFreq - 150, now + 0.16);

            birdGain.gain.setValueAtTime(0.001, now);
            birdGain.gain.linearRampToValueAtTime(0.016, now + 0.03);
            birdGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

            osc.connect(birdGain);
            birdGain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.22);
          } catch (_) {}
        }, 3400);

        // 3. Distant soft thunder rumble characteristic of Kota Hujan (every 14s when raining)
        const thunderInterval = setInterval(() => {
          if (
            !audioCtxRef.current ||
            audioCtxRef.current.state !== 'running' ||
            !stateRef.current.isRaining
          )
            return;
          try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const thGain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(65, now);
            osc.frequency.exponentialRampToValueAtTime(35, now + 1.8);

            thGain.gain.setValueAtTime(0.001, now);
            thGain.gain.linearRampToValueAtTime(0.025, now + 0.4);
            thGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

            osc.connect(thGain);
            thGain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 2.4);
          } catch (_) {}
        }, 14000);

        return () => {
          clearInterval(birdInterval);
          clearInterval(thunderInterval);
        };
      } else {
        audioCtxRef.current.resume().catch(() => {});
      }
    } catch (e) {
      console.warn('Audio context init prevented by browser policy', e);
    }
  }, [isAudioActive]);

  // Playful Angkot Horn function ("Tett-Tett!")
  const playAngkotHorn = () => {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtxClass();
      if (!audioCtxRef.current) audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      // Dual-tone classic minivan horn
      [
        { f: 430, tStart: 0, tEnd: 0.12 },
        { f: 430, tStart: 0.18, tEnd: 0.32 },
        { f: 540, tStart: 0, tEnd: 0.12 },
        { f: 540, tStart: 0.18, tEnd: 0.32 },
      ].forEach(({ f, tStart, tEnd }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + tStart);

        g.gain.setValueAtTime(0.001, now + tStart);
        g.gain.linearRampToValueAtTime(0.06, now + tStart + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, now + tEnd);

        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + tStart);
        osc.stop(now + tEnd + 0.02);
      });
    } catch (e) {
      console.warn('Horn audio failed', e);
    }
  };

  // Adjust rain gain node if rain state changes
  useEffect(() => {
    if (rainGainRef.current && audioCtxRef.current) {
      rainGainRef.current.gain.setTargetAtTime(
        isRaining ? 0.08 : 0.005,
        audioCtxRef.current.currentTime,
        0.5
      );
    }
  }, [isRaining]);

  // Three.js Scene Setup & Animation Loop
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x132a24);
    scene.fog = new THREE.FogExp2(0x132a24, 0.0058);
    stateRef.current.scene = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(28, 22, 35);
    stateRef.current.camera = camera;

    // Renderer
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // Environment map using RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // Procedural Textures
    const createGrassTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 512;
      const ctx = cvs.getContext('2d')!;
      ctx.fillStyle = '#265038';
      ctx.fillRect(0, 0, 512, 512);

      // Rainforest tropical speckles
      for (let i = 0; i < 20000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const col = Math.random() > 0.5 ? '#1f432e' : '#336c49';
        ctx.fillStyle = col;
        ctx.fillRect(x, y, 2, 2);
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(16, 16);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      return tex;
    };

    const createStoneTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 256;
      cvs.height = 256;
      const ctx = cvs.getContext('2d')!;
      ctx.fillStyle = '#4a5350';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 7000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        ctx.fillStyle = Math.random() > 0.5 ? '#363d3b' : '#5e6865';
        ctx.fillRect(x, y, 1.5, 1.5);
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      return tex;
    };

    const createCobbleTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 256;
      cvs.height = 256;
      const ctx = cvs.getContext('2d')!;
      ctx.fillStyle = '#6d7570';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#3d4440';
      ctx.lineWidth = 3;
      for (let y = 0; y < 256; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y);
        ctx.stroke();
        const offset = (y / 32) % 2 === 0 ? 0 : 16;
        for (let x = offset; x < 256; x += 32) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 32);
          ctx.stroke();
        }
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(12, 12);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      return tex;
    };

    const grassTex = createGrassTexture();
    const stoneTex = createStoneTexture();
    const cobbleTex = createCobbleTexture();

    // ==========================================
    // 1. LIGHTING RIG
    // ==========================================
    const hemiLight = new THREE.HemisphereLight(0xbadcf2, 0x1f3b2b, 0.95);
    scene.add(hemiLight);
    stateRef.current.hemiLight = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfff1dc, 2.0);
    dirLight.position.set(45, 60, 30);
    dirLight.castShadow = !isHeadless;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 180;
    const shadowD = 55;
    dirLight.shadow.camera.left = -shadowD;
    dirLight.shadow.camera.right = shadowD;
    dirLight.shadow.camera.top = shadowD;
    dirLight.shadow.camera.bottom = -shadowD;
    dirLight.shadow.bias = -0.0003;
    dirLight.shadow.normalBias = 0.02;
    scene.add(dirLight);
    stateRef.current.dirLight = dirLight;

    // Rim light from behind Gunung Salak
    const rimLight = new THREE.DirectionalLight(0x8cd6ff, 0.7);
    rimLight.position.set(-50, 30, -50);
    scene.add(rimLight);

    // Kujang Dramatic Spotlight
    const kujangSpot = new THREE.SpotLight(0xffd578, 4, 38, Math.PI / 4, 0.4, 1.2);
    kujangSpot.position.set(0, 0.5, 6);
    kujangSpot.target.position.set(0, 18, 0);
    scene.add(kujangSpot);
    scene.add(kujangSpot.target);
    stateRef.current.kujangSpotLight = kujangSpot;

    // ==========================================
    // 2. TERRAIN & NATURAL PERIMETERS
    // ==========================================
    const groundGeo = new THREE.PlaneGeometry(240, 240, 48, 48);
    groundGeo.rotateX(-Math.PI / 2);
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      let y = Math.sin(x * 0.04) * 0.3 + Math.cos(z * 0.03) * 0.4;
      if (z < -30) {
        y += Math.abs(z + 30) * 0.12;
      }
      // Carve natural depression for Sungai Ciliwung flowing from z=50 to z=-60 around x=12..18
      const riverDist = Math.abs(x - (14 + Math.sin(z * 0.06) * 6));
      if (riverDist < 7) {
        y -= (7 - riverDist) * 0.45;
      }
      const distFromCenter = Math.sqrt(x * x + z * z);
      if (distFromCenter < 35 && riverDist >= 7) {
        y *= distFromCenter / 35;
      }
      posAttr.setY(i, y);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.85,
      metalness: 0.05,
    });
    stateRef.current.groundMaterial = groundMat;
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // ==========================================
    // 3. SUNGAI CILIWUNG & HERITAGE BRIDGE
    // ==========================================
    // Curved river water body
    const riverGeo = new THREE.PlaneGeometry(12, 130, 24, 60);
    riverGeo.rotateX(-Math.PI / 2);
    const riverPos = riverGeo.attributes.position;
    for (let i = 0; i < riverPos.count; i++) {
      const z = riverPos.getZ(i);
      const curX = riverPos.getX(i);
      riverPos.setX(i, curX + 14 + Math.sin(z * 0.06) * 6);
      riverPos.setY(i, -0.65 + Math.sin(curX * 0.4 + z * 0.1) * 0.08);
    }
    riverGeo.computeVertexNormals();

    const riverMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f5654,
      transmission: 0.7,
      roughness: 0.12,
      metalness: 0.3,
      reflectivity: 0.8,
      clearcoat: 0.9,
    });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    riverMesh.receiveShadow = true;
    scene.add(riverMesh);
    stateRef.current.riverMesh = riverMesh;

    // Heritage Stone Arch Bridge (Jembatan Pusaka) spanning Ciliwung at z = -4
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(14, 0, -4);

    const bridgeDeck = new THREE.Mesh(
      new THREE.BoxGeometry(16, 0.7, 6),
      new THREE.MeshStandardMaterial({ map: stoneTex, roughness: 0.6 })
    );
    bridgeDeck.position.y = 0.25;
    bridgeDeck.castShadow = true;
    bridgeDeck.receiveShadow = true;
    bridgeGroup.add(bridgeDeck);

    // Bridge parapets (stone railings)
    const parapetMat = new THREE.MeshStandardMaterial({ color: 0x8a918e, roughness: 0.5 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(16, 0.9, 0.4), parapetMat);
    p1.position.set(0, 0.8, 2.8);
    p1.castShadow = true;
    bridgeGroup.add(p1);

    const p2 = new THREE.Mesh(new THREE.BoxGeometry(16, 0.9, 0.4), parapetMat);
    p2.position.set(0, 0.8, -2.8);
    p2.castShadow = true;
    bridgeGroup.add(p2);

    scene.add(bridgeGroup);

    // ==========================================
    // 4. GUNUNG SALAK SILHOUETTE & DRIFTING MIST CLOUDS
    // ==========================================
    const salakGroup = new THREE.Group();
    salakGroup.position.set(-10, 0, -110);

    // Puncak Salak I (2,211 m)
    const salakCone1 = new THREE.Mesh(
      new THREE.ConeGeometry(55, 65, 12, 4),
      new THREE.MeshStandardMaterial({
        color: 0x224638,
        roughness: 0.95,
        flatShading: true,
      })
    );
    salakCone1.position.set(-25, 32.5, 0);
    salakCone1.rotation.y = 0.4;
    salakGroup.add(salakCone1);

    // Puncak Salak II
    const salakCone2 = new THREE.Mesh(
      new THREE.ConeGeometry(48, 56, 12, 4),
      new THREE.MeshStandardMaterial({
        color: 0x1b3c30,
        roughness: 0.95,
        flatShading: true,
      })
    );
    salakCone2.position.set(22, 28, -5);
    salakCone2.rotation.y = -0.2;
    salakGroup.add(salakCone2);

    // Foothill ridge
    const foothill = new THREE.Mesh(
      new THREE.CylinderGeometry(40, 60, 20, 16),
      new THREE.MeshStandardMaterial({
        color: 0x19362a,
        roughness: 0.9,
      })
    );
    foothill.position.set(0, 10, 15);
    salakGroup.add(foothill);

    scene.add(salakGroup);

    // Procedural Mist / Cloud Clusters floating around Gunung Salak
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xddeef5,
      transparent: true,
      opacity: 0.45,
      roughness: 0.9,
      depthWrite: false,
    });

    const createCloudCluster = (x: number, y: number, z: number, scale = 1.0) => {
      const cg = new THREE.Group();
      cg.position.set(x, y, z);
      cg.scale.set(scale, scale * 0.5, scale);
      const puffOffsets = [
        [0, 0, 0, 6],
        [-4, -0.5, 1, 4.5],
        [4, -0.8, -1, 5],
        [1.5, 1.2, 0.5, 4],
        [-2.5, 0.6, -1.5, 3.8],
      ];
      puffOffsets.forEach(([px, py, pz, pr]) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(pr, 8, 6), cloudMat);
        puff.position.set(px, py, pz);
        cg.add(puff);
      });
      return cg;
    };

    const c1 = createCloudCluster(-30, 24, -80, 1.3);
    const c2 = createCloudCluster(15, 30, -95, 1.6);
    const c3 = createCloudCluster(-5, 18, -65, 1.1);
    scene.add(c1);
    scene.add(c2);
    scene.add(c3);
    stateRef.current.cloudGroups = [c1, c2, c3];

    // ==========================================
    // 5. MONUMEN KUJANG (Hero Monument)
    // ==========================================
    const kujangGroup = new THREE.Group();
    kujangGroup.position.set(0, 0, 0);

    // Stepped Octagonal Plaza (Level 1)
    const plaza1 = new THREE.Mesh(
      new THREE.CylinderGeometry(10, 10.5, 0.6, 8),
      new THREE.MeshStandardMaterial({
        map: cobbleTex,
        roughness: 0.7,
        metalness: 0.1,
      })
    );
    plaza1.position.y = 0.3;
    plaza1.receiveShadow = true;
    kujangGroup.add(plaza1);

    // Stepped Plaza (Level 2)
    const plaza2 = new THREE.Mesh(
      new THREE.CylinderGeometry(7.5, 8.2, 0.8, 8),
      new THREE.MeshStandardMaterial({
        map: stoneTex,
        roughness: 0.65,
        metalness: 0.15,
      })
    );
    plaza2.position.y = 1.0;
    plaza2.castShadow = true;
    plaza2.receiveShadow = true;
    kujangGroup.add(plaza2);

    // Andesite Pedestal (Level 3)
    const pedestal = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 2.2, 4.2),
      new THREE.MeshStandardMaterial({
        map: stoneTex,
        roughness: 0.6,
        metalness: 0.2,
      })
    );
    pedestal.position.y = 2.5;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    kujangGroup.add(pedestal);

    // Main Tall Obelisk Pillar
    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 2.4, 18, 8),
      new THREE.MeshStandardMaterial({
        color: 0xdfded8,
        roughness: 0.5,
        metalness: 0.1,
      })
    );
    pillar.position.y = 12.6;
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    kujangGroup.add(pillar);

    // Brass Decorative Rings around pillar
    for (let r = 0; r < 3; r++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.9 - r * 0.1, 0.1, 8, 16),
        new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          roughness: 0.25,
          metalness: 0.9,
        })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 6 + r * 5;
      kujangGroup.add(ring);
    }

    // Capital atop Pillar
    const capital = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 1.6, 0.8, 8),
      new THREE.MeshStandardMaterial({
        color: 0x4a4f4d,
        roughness: 0.4,
        metalness: 0.5,
      })
    );
    capital.position.y = 22.0;
    capital.castShadow = true;
    kujangGroup.add(capital);

    // THE SACRED GOLDEN KUJANG BLADE
    const kujangBladeGroup = new THREE.Group();
    kujangBladeGroup.position.set(0, 22.4, 0);

    const goldKujangMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd700,
      emissive: 0x996515,
      emissiveIntensity: 0.22,
      roughness: 0.18,
      metalness: 0.95,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    });

    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, 0);
    bladeShape.lineTo(0.6, 0.4);
    bladeShape.quadraticCurveTo(1.6, 2.2, 1.2, 4.2);
    bladeShape.quadraticCurveTo(1.5, 5.2, 0.4, 6.2);
    bladeShape.lineTo(0.2, 6.4);
    bladeShape.quadraticCurveTo(0.1, 4.6, -0.4, 3.5);
    bladeShape.quadraticCurveTo(-0.6, 2.0, -0.3, 0.6);
    bladeShape.lineTo(0, 0);

    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    });
    bladeGeo.center();
    const bladeMesh = new THREE.Mesh(bladeGeo, goldKujangMat);
    bladeMesh.position.y = 3.4;
    bladeMesh.castShadow = true;
    kujangBladeGroup.add(bladeMesh);

    // Three sacred perforations (Mata Kujang)
    for (let h = 0; h < 3; h++) {
      const holeMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.18, 0.05, 8, 16),
        new THREE.MeshStandardMaterial({
          color: 0x111111,
          metalness: 0.9,
          roughness: 0.2,
        })
      );
      holeMesh.position.set(0.2, 2.2 + h * 0.85, 0.18);
      kujangBladeGroup.add(holeMesh);
    }

    // Handle
    const handleMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.3, 1.4, 12),
      new THREE.MeshStandardMaterial({
        color: 0x5c2c16,
        roughness: 0.4,
        metalness: 0.3,
      })
    );
    handleMesh.position.set(-0.1, 0.6, 0);
    handleMesh.rotation.z = 0.12;
    kujangBladeGroup.add(handleMesh);

    kujangGroup.add(kujangBladeGroup);

    // Contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(24, 24);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x05120c,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.position.y = 0.03;
    kujangGroup.add(contactShadow);

    scene.add(kujangGroup);

    // ==========================================
    // 6. LAWANG SALAPAN (9 HERITAGE ARCHES)
    // ==========================================
    // Real Bogor landmark facing Tugu Kujang across the Otista roundabout
    const salapanGroup = new THREE.Group();
    salapanGroup.position.set(0, 0, 16);

    const salapanWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf6f6f2,
      roughness: 0.35,
      metalness: 0.05,
    });
    const salapanBaseMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.6,
    });

    // Elevated terrace base
    const salapanPlaza = new THREE.Mesh(
      new THREE.BoxGeometry(28, 0.8, 6),
      salapanBaseMat
    );
    salapanPlaza.position.y = 0.4;
    salapanPlaza.receiveShadow = true;
    salapanGroup.add(salapanPlaza);

    // 10 Pillars creating 9 Arches
    const pillarCount = 10;
    const archSpacing = 2.7;
    const pillarGeo = new THREE.CylinderGeometry(0.32, 0.38, 5.5, 12);

    for (let p = 0; p < pillarCount; p++) {
      const px = -((pillarCount - 1) * archSpacing) / 2 + p * archSpacing;
      const pil = new THREE.Mesh(pillarGeo, salapanWhiteMat);
      pil.position.set(px, 3.55, 0);
      pil.castShadow = true;
      salapanGroup.add(pil);

      // Arch connector between adjacent pillars
      if (p < pillarCount - 1) {
        const nextPx = px + archSpacing;
        const midX = (px + nextPx) / 2;
        const archTop = new THREE.Mesh(
          new THREE.TorusGeometry(archSpacing / 2, 0.22, 8, 16, Math.PI),
          salapanWhiteMat
        );
        archTop.position.set(midX, 6.3, 0);
        salapanGroup.add(archTop);
      }
    }

    // Grand Top Architrave / Cornice Beam
    const architrave = new THREE.Mesh(
      new THREE.BoxGeometry(27.5, 0.9, 2.2),
      salapanWhiteMat
    );
    architrave.position.set(0, 7.3, 0);
    architrave.castShadow = true;
    salapanGroup.add(architrave);

    // Central Heritage Inscription Plaque (Di Nu Kiwari Ngancik Nu Bihari)
    const plaque = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.65, 0.2),
      new THREE.MeshStandardMaterial({
        color: 0x996515,
        roughness: 0.2,
        metalness: 0.9,
      })
    );
    plaque.position.set(0, 7.3, 1.15);
    salapanGroup.add(plaque);

    // Warm illumination point lights for Lawang Salapan arches
    for (let l = 0; l < 3; l++) {
      const archLight = new THREE.PointLight(0xffe29a, 0, 14);
      archLight.position.set(-8 + l * 8, 4.5, 1.2);
      salapanGroup.add(archLight);
      stateRef.current.salapanLights.push(archLight);
    }

    scene.add(salapanGroup);

    // ==========================================
    // 7. ISTANA BOGOR (Buitenzorg Presidential Palace)
    // ==========================================
    const istanaGroup = new THREE.Group();
    istanaGroup.position.set(-42, 0, 18);

    const palaceWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ed,
      roughness: 0.35,
      metalness: 0.08,
    });
    const palaceRoofMat = new THREE.MeshStandardMaterial({
      color: 0x933a28,
      roughness: 0.7,
      metalness: 0.1,
    });
    const pillarMatIstana = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05,
    });

    // Central Grand Corps de Logis
    const centralHall = new THREE.Mesh(new THREE.BoxGeometry(16, 7.5, 10), palaceWhiteMat);
    centralHall.position.y = 4.0;
    centralHall.castShadow = true;
    centralHall.receiveShadow = true;
    istanaGroup.add(centralHall);

    // Classical Portico with 6 Corinthian Pillars
    for (let c = 0; c < 6; c++) {
      const colMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 7.0, 12), pillarMatIstana);
      colMesh.position.set(-5 + c * 2, 3.8, 5.8);
      colMesh.castShadow = true;
      istanaGroup.add(colMesh);
    }

    // Triangular Pediment
    const pedimentShape = new THREE.Shape();
    pedimentShape.moveTo(-6, 0);
    pedimentShape.lineTo(6, 0);
    pedimentShape.lineTo(0, 3.2);
    pedimentShape.closePath();
    const pediment = new THREE.Mesh(
      new THREE.ExtrudeGeometry(pedimentShape, { depth: 1.8, bevelEnabled: true, bevelSize: 0.1 }),
      palaceWhiteMat
    );
    pediment.position.set(0, 7.5, 4.4);
    pediment.castShadow = true;
    istanaGroup.add(pediment);

    // Central Palace Dome & Spire
    const domeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2.4, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x4a7360, roughness: 0.3, metalness: 0.6 })
    );
    domeMesh.position.set(0, 7.8, 0);
    istanaGroup.add(domeMesh);

    const spire = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 2.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 })
    );
    spire.position.set(0, 10.8, 0);
    istanaGroup.add(spire);

    // Left & Right Wings
    const leftWing = new THREE.Mesh(new THREE.BoxGeometry(11, 5.5, 7.5), palaceWhiteMat);
    leftWing.position.set(-13, 3.0, -1);
    leftWing.castShadow = true;
    istanaGroup.add(leftWing);

    const leftRoof = new THREE.Mesh(new THREE.ConeGeometry(7, 3.5, 4), palaceRoofMat);
    leftRoof.rotation.y = Math.PI / 4;
    leftRoof.position.set(-13, 7.2, -1);
    istanaGroup.add(leftRoof);

    const rightWing = new THREE.Mesh(new THREE.BoxGeometry(11, 5.5, 7.5), palaceWhiteMat);
    rightWing.position.set(13, 3.0, -1);
    rightWing.castShadow = true;
    istanaGroup.add(rightWing);

    const rightRoof = new THREE.Mesh(new THREE.ConeGeometry(7, 3.5, 4), palaceRoofMat);
    rightRoof.rotation.y = Math.PI / 4;
    rightRoof.position.set(13, 7.2, -1);
    istanaGroup.add(rightRoof);

    // Palace Front Pond (Reflecting Pool with Water Lilies)
    const pondMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(7, 7, 0.2, 24),
      new THREE.MeshStandardMaterial({ color: 0x1b433e, roughness: 0.1, metalness: 0.8 })
    );
    pondMesh.position.set(0, 0.15, 17);
    istanaGroup.add(pondMesh);

    // Water lilies on pond (Victoria amazonica)
    for (let l = 0; l < 4; l++) {
      const lily = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 0.9, 0.04, 12),
        new THREE.MeshStandardMaterial({ color: 0x2e6644, roughness: 0.4 })
      );
      const angle = (l / 4) * Math.PI * 2 + 0.3;
      lily.position.set(Math.cos(angle) * 3.8, 0.27, 17 + Math.sin(angle) * 3.8);
      istanaGroup.add(lily);
    }

    // Palace Point Lights for Night Mode
    const pLight1 = new THREE.PointLight(0xfff0c4, 0, 20);
    pLight1.position.set(0, 5, 7);
    istanaGroup.add(pLight1);
    stateRef.current.palaceLights.push(pLight1);

    scene.add(istanaGroup);

    // ==========================================
    // 8. RUSA TUTUL ISTANA BOGOR (Axis Deer Herd with Baby Fawn)
    // ==========================================
    const deerBrownMat = new THREE.MeshStandardMaterial({
      color: 0xb56c38,
      roughness: 0.75,
      metalness: 0.05,
    });
    const deerAntlerMat = new THREE.MeshStandardMaterial({ color: 0xd9cca9, roughness: 0.5 });
    const deerSpotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const createDeer = (
      x: number,
      z: number,
      rotY: number,
      hasAntlers: boolean,
      isGrazing: boolean,
      scale = 1.0
    ) => {
      const deer = new THREE.Group();
      deer.position.set(x, 0, z);
      deer.rotation.y = rotY;
      deer.scale.set(scale, scale, scale);

      // Torso
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 1.1, 4, 8), deerBrownMat);
      body.rotation.x = Math.PI / 2;
      body.position.y = 1.05;
      body.castShadow = true;
      deer.add(body);

      // White spots along back (Axis deer spots)
      for (let s = 0; s < 6; s++) {
        const spot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), deerSpotMat);
        const zOff = -0.35 + (s % 3) * 0.35;
        const side = s < 3 ? -0.28 : 0.28;
        spot.position.set(side, 1.35, zOff);
        deer.add(spot);
      }

      // Neck & Head Group
      const neckGroup = new THREE.Group();
      neckGroup.position.set(0, 1.2, 0.5);
      const baseRotX = isGrazing ? 0.75 : -0.25;
      neckGroup.rotation.x = baseRotX;

      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 0.8, 8), deerBrownMat);
      neck.position.y = 0.35;
      neckGroup.add(neck);

      const head = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.55, 6), deerBrownMat);
      head.rotation.x = -Math.PI / 3;
      head.position.set(0, 0.75, 0.15);
      neckGroup.add(head);

      // Antlers if adult stag
      if (hasAntlers) {
        const leftAntler = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.06, 0.75, 6),
          deerAntlerMat
        );
        leftAntler.rotation.z = 0.35;
        leftAntler.position.set(-0.2, 1.05, 0);
        neckGroup.add(leftAntler);

        const rightAntler = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.06, 0.75, 6),
          deerAntlerMat
        );
        rightAntler.rotation.z = -0.35;
        rightAntler.position.set(0.2, 1.05, 0);
        neckGroup.add(rightAntler);
      }

      deer.add(neckGroup);

      // 4 Slender Legs
      const legGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.95, 6);
      const legPositions = [
        [-0.24, 0.48, -0.4],
        [0.24, 0.48, -0.4],
        [-0.24, 0.48, 0.35],
        [0.24, 0.48, 0.35],
      ];
      legPositions.forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeo, deerBrownMat);
        leg.position.set(lx, ly, lz);
        leg.castShadow = true;
        deer.add(leg);
      });

      return {
        group: deer,
        neck: neckGroup,
        head,
        baseRotX,
        isGrazing,
        speed: 1.0 + Math.random() * 0.8,
      };
    };

    const d1 = createDeer(-38, 27, 0.4, true, false, 1.05); // Stag
    const d2 = createDeer(-34, 29, -0.6, false, true, 0.95); // Hind grazing
    const d3 = createDeer(-44, 30, 1.2, false, true, 1.0); // Hind grazing
    const d4 = createDeer(-40, 32, -1.8, true, false, 1.1); // Stag proud
    const d5 = createDeer(-33, 27.5, -0.4, false, false, 0.6); // Cute Baby Fawn!

    [d1, d2, d3, d4, d5].forEach((d) => scene.add(d.group));
    stateRef.current.deerGroups = [d1, d2, d3, d4, d5];

    // ==========================================
    // 9. KEBUN RAYA BOGOR (Ancient Giant Kenari & Tropical Trees)
    // ==========================================
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x483526, roughness: 0.9 });
    const leafMats = [
      new THREE.MeshStandardMaterial({ color: 0x1d4d31, roughness: 0.82 }),
      new THREE.MeshStandardMaterial({ color: 0x27633e, roughness: 0.78 }),
      new THREE.MeshStandardMaterial({ color: 0x367c4d, roughness: 0.85 }),
    ];

    const createBanyanTree = (x: number, z: number, scale = 1.0) => {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      tree.scale.set(scale, scale, scale);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 2.2, 8, 10), treeTrunkMat);
      trunk.position.y = 4;
      trunk.castShadow = true;
      tree.add(trunk);

      const canopyPositions = [
        [0, 8.5, 0, 4.2],
        [-2.2, 7.8, 1.2, 3.2],
        [2.2, 7.5, -1.0, 3.4],
        [0.8, 8.2, -2.0, 3.0],
        [-1.2, 9.2, -0.8, 2.8],
      ];
      canopyPositions.forEach(([cx, cy, cz, cr], idx) => {
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(cr, 10, 8),
          leafMats[idx % leafMats.length]
        );
        sphere.position.set(cx, cy, cz);
        sphere.castShadow = true;
        tree.add(sphere);
      });

      return tree;
    };

    const treeCoords = [
      [24, 10, 1.3],
      [34, 18, 1.4],
      [28, -14, 1.1],
      [38, -6, 1.5],
      [20, -26, 1.2],
      [-25, -28, 1.0],
      [-52, -15, 1.2],
      [-15, 34, 0.9],
      [14, 30, 1.0],
    ];
    treeCoords.forEach(([tx, tz, s]) => {
      scene.add(createBanyanTree(tx, tz, s));
    });

    // ==========================================
    // 10. BOGOR RING ROAD & MULTIPLE ANGKOT HIJAU (SSA LOOP)
    // ==========================================
    // Ring Road around landmark perimeter
    const roadGeo = new THREE.RingGeometry(26, 32, 64);
    roadGeo.rotateX(-Math.PI / 2);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x2b302f,
      roughness: 0.65,
      metalness: 0.1,
    });
    stateRef.current.roadMaterial = roadMat;
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.y = 0.05;
    road.receiveShadow = true;
    scene.add(road);

    // White dashed road markings
    const markGeo = new THREE.RingGeometry(28.8, 29.2, 48);
    markGeo.rotateX(-Math.PI / 2);
    const markMat = new THREE.MeshBasicMaterial({ color: 0xdedede });
    const mark = new THREE.Mesh(markGeo, markMat);
    mark.position.y = 0.06;
    scene.add(mark);

    // Function to build authentic Kota Bogor Angkot
    const buildAngkot = (
      code: string,
      stripeColor: number,
      initialAngle: number,
      speed: number,
      radius: number
    ) => {
      const angkot = new THREE.Group();
      const greenBodyMat = new THREE.MeshStandardMaterial({
        color: 0x008f39, // Signature Kota Bogor Emerald Green
        roughness: 0.25,
        metalness: 0.35,
      });
      const whiteRoofMat = new THREE.MeshStandardMaterial({ color: 0xf4f4f4, roughness: 0.3 });
      const stripeMat = new THREE.MeshStandardMaterial({ color: stripeColor, roughness: 0.3 });
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x112233,
        transmission: 0.8,
        roughness: 0.1,
        metalness: 0.1,
      });
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.8 });

      // Lower Van Body
      const carLower = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.0, 4.4), greenBodyMat);
      carLower.position.y = 0.85;
      carLower.castShadow = true;
      angkot.add(carLower);

      // Distinctive Route Stripe along side
      const stripeMesh = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.2, 4.42), stripeMat);
      stripeMesh.position.y = 0.9;
      angkot.add(stripeMesh);

      // Cabin with Windows
      const carUpper = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.95, 3.4), glassMat);
      carUpper.position.set(0, 1.75, -0.2);
      angkot.add(carUpper);

      // White Roof
      const carRoof = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.18, 3.6), whiteRoofMat);
      carRoof.position.set(0, 2.3, -0.2);
      angkot.add(carRoof);

      // Route Sign Board atop roof
      const signBoard = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.35, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
      );
      signBoard.position.set(0, 2.55, 0.8);
      angkot.add(signBoard);

      // 4 Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 12);
      wheelGeo.rotateZ(Math.PI / 2);
      [
        [-1.05, 0.4, 1.4],
        [1.05, 0.4, 1.4],
        [-1.05, 0.4, -1.4],
        [1.05, 0.4, -1.4],
      ].forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(wheelGeo, tireMat);
        w.position.set(wx, wy, wz);
        angkot.add(w);
      });

      // Headlights & Light Beam Cone
      const hl1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xfffae0 })
      );
      hl1.position.set(-0.7, 0.9, 2.22);
      angkot.add(hl1);
      const hl2 = hl1.clone();
      hl2.position.set(0.7, 0.9, 2.22);
      angkot.add(hl2);

      // Red Taillights
      const tl1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xff2222 })
      );
      tl1.position.set(-0.7, 0.9, -2.22);
      angkot.add(tl1);
      const tl2 = tl1.clone();
      tl2.position.set(0.7, 0.9, -2.22);
      angkot.add(tl2);

      scene.add(angkot);
      return { group: angkot, speed, angle: initialAngle, radius };
    };

    // Angkot 02 (Bubulak - Baranangsiang with orange stripe)
    const angkot1 = buildAngkot('02', 0xf59e0b, 0, 0.38, 28);
    // Angkot 03 (Baranangsiang - Sukasari with bright yellow stripe)
    const angkot2 = buildAngkot('03', 0xfacc15, Math.PI * 0.85, 0.35, 30);
    // Angkot 08 (Ciawi - Pasar Anyar)
    const angkot3 = buildAngkot('08', 0xffffff, Math.PI * 1.5, 0.4, 28.5);

    stateRef.current.carGroups = [angkot1, angkot2, angkot3];

    // ==========================================
    // 11. KOTA HUJAN WEATHER PARTICLES (3,200 Rain Droplets)
    // ==========================================
    const rainCount = 3200;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);

    for (let r = 0; r < rainCount; r++) {
      rainPos[r * 3] = (Math.random() - 0.5) * 160;
      rainPos[r * 3 + 1] = Math.random() * 60;
      rainPos[r * 3 + 2] = (Math.random() - 0.5) * 160;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));

    const rainMat = new THREE.PointsMaterial({
      color: 0xa4d4e8,
      size: 0.38,
      transparent: true,
      opacity: 0.7,
    });
    const rainPoints = new THREE.Points(rainGeo, rainMat);
    scene.add(rainPoints);
    stateRef.current.rainPoints = rainPoints;

    // Glowing Fireflies (*kunang-kunang*) pulsing at sunset & night
    const fireflyCount = 70;
    const fireflyGeo = new THREE.BufferGeometry();
    const fireflyPos = new Float32Array(fireflyCount * 3);
    for (let f = 0; f < fireflyCount; f++) {
      fireflyPos[f * 3] = 15 + (Math.random() - 0.5) * 35;
      fireflyPos[f * 3 + 1] = 0.5 + Math.random() * 4.5;
      fireflyPos[f * 3 + 2] = 5 + (Math.random() - 0.5) * 35;
    }
    fireflyGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPos, 3));
    const fireflyMat = new THREE.PointsMaterial({
      color: 0xfacc15,
      size: 0.45,
      transparent: true,
      opacity: 0.85,
    });
    const fireflies = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflies);
    stateRef.current.fireflyPoints = fireflies;

    // Street Lights around ring road
    const streetLightCoords = [
      [18, 18],
      [-18, 18],
      [18, -18],
      [-18, -18],
      [0, 26],
      [0, -26],
    ];
    streetLightCoords.forEach(([lx, lz]) => {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.16, 5, 8),
        new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 })
      );
      pole.position.set(lx, 2.5, lz);
      scene.add(pole);

      const lampHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffe6a3 })
      );
      lampHead.position.set(lx, 5.1, lz);
      scene.add(lampHead);

      const pLight = new THREE.PointLight(0xffd57e, 0, 16);
      pLight.position.set(lx, 4.8, lz);
      scene.add(pLight);
      stateRef.current.streetLights.push(pLight);
    });

    // Pre-warm shaders
    renderer.compile(scene, camera);

    // ==========================================
    // 12. FULL TOUCH & MOUSE INTERACTION SYSTEM
    // ==========================================
    const getTouchDistance = (t1: { x: number; y: number }, t2: { x: number; y: number }) => {
      const dx = t1.x - t2.x;
      const dy = t1.y - t2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onPointerDown = (e: PointerEvent) => {
      const { controls } = stateRef.current;
      controls.isPointerDown = true;
      controls.touchPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (controls.touchPointers.size === 1) {
        controls.pointerStartX = e.clientX;
        controls.pointerStartY = e.clientY;
      } else if (controls.touchPointers.size === 2) {
        // Pinch start
        const pts = Array.from(controls.touchPointers.values()) as { x: number; y: number }[];
        controls.initialPinchDist = getTouchDistance(pts[0], pts[1]);
        controls.initialRadius = controls.targetRadius;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const { controls } = stateRef.current;
      if (!controls.isPointerDown) return;

      controls.touchPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      // Handle 2-finger pinch zoom
      if (controls.touchPointers.size === 2) {
        const pts = Array.from(controls.touchPointers.values()) as { x: number; y: number }[];
        const curDist = getTouchDistance(pts[0], pts[1]);
        if (controls.initialPinchDist > 0) {
          const ratio = controls.initialPinchDist / curDist;
          controls.targetRadius = Math.max(14, Math.min(95, controls.initialRadius * ratio));
        }
        return;
      }

      // Handle 1-finger orbit rotate
      const dx = e.clientX - controls.pointerStartX;
      const dy = e.clientY - controls.pointerStartY;
      controls.pointerStartX = e.clientX;
      controls.pointerStartY = e.clientY;

      controls.targetTheta -= dx * 0.006;
      controls.targetPhi = Math.max(
        0.08,
        Math.min(Math.PI / 2.05, controls.targetPhi - dy * 0.005)
      );

      if (stateRef.current.activePreset !== 'free') {
        setActivePreset('free');
      }
      setShowTouchHint(false);
    };

    const onPointerUp = (e: PointerEvent) => {
      const { controls } = stateRef.current;
      controls.touchPointers.delete(e.pointerId);
      if (controls.touchPointers.size === 0) {
        controls.isPointerDown = false;
      } else if (controls.touchPointers.size === 1) {
        const pts = Array.from(controls.touchPointers.values()) as { x: number; y: number }[];
        const remaining = pts[0];
        if (remaining) {
          controls.pointerStartX = remaining.x;
          controls.pointerStartY = remaining.y;
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stateRef.current.controls.targetRadius = Math.max(
        14,
        Math.min(95, stateRef.current.controls.targetRadius + e.deltaY * 0.035)
      );
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });

    // Handle Window Resize
    const onResize = () => {
      if (!container || !stateRef.current.camera || !stateRef.current.renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      stateRef.current.camera.aspect = w / h;
      stateRef.current.camera.updateProjectionMatrix();
      stateRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ==========================================
    // 13. SILKY ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const state = stateRef.current;
      const { controls } = state;

      // Animate Multiple Angkots along SSA Ring Road
      state.carGroups.forEach((car) => {
        car.angle += delta * car.speed;
        const cx = Math.cos(car.angle) * car.radius;
        const cz = Math.sin(car.angle) * car.radius;
        car.group.position.set(cx, 0, cz);
        car.group.rotation.y = -car.angle + Math.PI / 2;
      });

      // Animate Drifting Mountain Mist Clouds
      state.cloudGroups.forEach((cg, idx) => {
        cg.position.x += Math.sin(now * 0.0003 + idx) * 0.02;
      });

      // Animate Rain
      if (state.rainPoints) {
        state.rainPoints.visible = state.isRaining;
        if (state.isRaining) {
          const positions = state.rainPoints.geometry.attributes.position.array as Float32Array;
          for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= delta * 42;
            positions[i - 1] += delta * 4; // Wind drift angle
            if (positions[i] < 0) {
              positions[i] = 60;
              positions[i - 1] = (Math.random() - 0.5) * 160;
            }
          }
          state.rainPoints.geometry.attributes.position.needsUpdate = true;
        }
      }

      // Animate Fireflies pulsing
      if (state.fireflyPoints) {
        state.fireflyPoints.visible = state.timeOfDay === 'sunset' || state.timeOfDay === 'night';
        const fp = state.fireflyPoints.geometry.attributes.position.array as Float32Array;
        for (let f = 1; f < fp.length; f += 3) {
          fp[f] += Math.sin(now * 0.002 + f) * 0.015;
        }
        state.fireflyPoints.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Deer Grazing & Idle Head Movements
      const timeSec = now * 0.001;
      state.deerGroups.forEach((deer, idx) => {
        deer.group.position.y = Math.sin(timeSec * 2.2 + idx) * 0.02;
        if (deer.isGrazing) {
          deer.neck.rotation.x = deer.baseRotX + Math.sin(timeSec * 1.5 * deer.speed + idx) * 0.18;
        } else {
          deer.neck.rotation.y = Math.sin(timeSec * 1.0 * deer.speed + idx) * 0.15;
        }
      });

      // Dynamic wet pavement gloss when raining
      if (state.roadMaterial && state.groundMaterial) {
        const targetRoughness = state.isRaining ? 0.28 : 0.65;
        const targetMetalness = state.isRaining ? 0.35 : 0.08;
        state.roadMaterial.roughness = THREE.MathUtils.damp(
          state.roadMaterial.roughness,
          targetRoughness,
          3,
          delta
        );
        state.roadMaterial.metalness = THREE.MathUtils.damp(
          state.roadMaterial.metalness,
          targetMetalness,
          3,
          delta
        );
      }

      // Lighting & Atmosphere interpolation based on timeOfDay & rain
      let targetSky = 0x132a24;
      let targetHemiSky = 0xbadcf2;
      let targetHemiGround = 0x1f3b2b;
      let targetDirIntensity = 2.0;
      let kujangIntensity = 0.5;
      let salapanIntensity = 0;
      let streetIntensity = 0;
      let palaceIntensity = 0;

      if (state.timeOfDay === 'day') {
        targetSky = state.isRaining ? 0x223630 : 0x3d6e5a;
        targetHemiSky = 0xdcf0ff;
        targetHemiGround = 0x294a37;
        targetDirIntensity = state.isRaining ? 1.35 : 2.2;
        kujangIntensity = 0.5;
        salapanIntensity = 0.2;
        streetIntensity = 0;
        palaceIntensity = 0;
      } else if (state.timeOfDay === 'morning') {
        targetSky = 0x28473c; // Misty cool morning
        targetHemiSky = 0xcfe8ff;
        targetHemiGround = 0x1f3d2b;
        targetDirIntensity = 1.7;
        kujangIntensity = 0.8;
        salapanIntensity = 0.4;
        streetIntensity = 0.2;
        palaceIntensity = 0.2;
      } else if (state.timeOfDay === 'sunset') {
        targetSky = 0x472822; // Sunset glow over Salak
        targetHemiSky = 0xfcb065;
        targetHemiGround = 0x211b15;
        targetDirIntensity = 1.3;
        kujangIntensity = 2.4;
        salapanIntensity = 1.8;
        streetIntensity = 1.2;
        palaceIntensity = 1.0;
      } else {
        // Night
        targetSky = 0x050c0a;
        targetHemiSky = 0x1a2b38;
        targetHemiGround = 0x07110c;
        targetDirIntensity = 0.25;
        kujangIntensity = 4.5; // Golden illuminated heirloom
        salapanIntensity = 3.2; // Glowing heritage arches
        streetIntensity = 2.5;
        palaceIntensity = 2.4;
      }

      if (scene.fog) {
        scene.fog.color.lerp(_colorTemp.setHex(targetSky), delta * 3);
      }
      scene.background = _colorTemp.setHex(targetSky);

      if (state.hemiLight) {
        state.hemiLight.color.lerp(_colorTemp.setHex(targetHemiSky), delta * 3);
        state.hemiLight.groundColor.lerp(_colorTemp2.setHex(targetHemiGround), delta * 3);
      }
      if (state.dirLight) {
        state.dirLight.intensity = THREE.MathUtils.damp(
          state.dirLight.intensity,
          targetDirIntensity,
          3,
          delta
        );
      }
      if (state.kujangSpotLight) {
        state.kujangSpotLight.intensity = THREE.MathUtils.damp(
          state.kujangSpotLight.intensity,
          kujangIntensity,
          4,
          delta
        );
      }
      state.salapanLights.forEach((sl) => {
        sl.intensity = THREE.MathUtils.damp(sl.intensity, salapanIntensity, 4, delta);
      });
      state.streetLights.forEach((sl) => {
        sl.intensity = THREE.MathUtils.damp(sl.intensity, streetIntensity, 4, delta);
      });
      state.palaceLights.forEach((pl) => {
        pl.intensity = THREE.MathUtils.damp(pl.intensity, palaceIntensity, 4, delta);
      });

      // Camera preset positioning with exponential damping
      if (state.activePreset === 'kujang') {
        controls.targetLookAt.set(0, 13, 0);
        controls.targetRadius = 38;
        controls.targetTheta = Math.PI * 0.28;
        controls.targetPhi = Math.PI * 0.36;
      } else if (state.activePreset === 'salapan') {
        controls.targetLookAt.set(0, 4.5, 16);
        controls.targetRadius = 26;
        controls.targetTheta = Math.PI * 0.98;
        controls.targetPhi = Math.PI * 0.42;
      } else if (state.activePreset === 'istana') {
        controls.targetLookAt.set(-42, 5, 18);
        controls.targetRadius = 32;
        controls.targetTheta = -Math.PI * 0.2;
        controls.targetPhi = Math.PI * 0.38;
      } else if (state.activePreset === 'kebun') {
        controls.targetLookAt.set(24, 7, 5);
        controls.targetRadius = 38;
        controls.targetTheta = Math.PI * 0.7;
        controls.targetPhi = Math.PI * 0.35;
      } else if (state.activePreset === 'ciliwung') {
        controls.targetLookAt.set(14, 1.5, -4);
        controls.targetRadius = 25;
        controls.targetTheta = Math.PI * 0.3;
        controls.targetPhi = Math.PI * 0.39;
      } else if (state.activePreset === 'salak') {
        controls.targetLookAt.set(0, 16, -60);
        controls.targetRadius = 78;
        controls.targetTheta = Math.PI * 0.5;
        controls.targetPhi = Math.PI * 0.42;
      }

      // Smooth camera interpolation
      controls.orbitTheta = THREE.MathUtils.damp(
        controls.orbitTheta,
        controls.targetTheta,
        4.5,
        delta
      );
      controls.orbitPhi = THREE.MathUtils.damp(controls.orbitPhi, controls.targetPhi, 4.5, delta);
      controls.orbitRadius = THREE.MathUtils.damp(
        controls.orbitRadius,
        controls.targetRadius,
        4.5,
        delta
      );

      controls.lookAt.lerp(controls.targetLookAt, delta * 4);

      // Compute camera position from spherical coords
      const camX =
        controls.lookAt.x +
        controls.orbitRadius * Math.sin(controls.orbitPhi) * Math.sin(controls.orbitTheta);
      const camY = controls.lookAt.y + controls.orbitRadius * Math.cos(controls.orbitPhi);
      const camZ =
        controls.lookAt.z +
        controls.orbitRadius * Math.sin(controls.orbitPhi) * Math.cos(controls.orbitTheta);

      if (camera) {
        camera.position.set(camX, camY, camZ);
        camera.lookAt(controls.lookAt);
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      domEl.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      grassTex.dispose();
      stoneTex.dispose();
      cobbleTex.dispose();
      renderer.dispose();
      if (domEl.parentNode) {
        domEl.parentNode.removeChild(domEl);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0a1612] select-none touch-none">
      {/* 1. Canvas Mount (Interactive 3D Viewport) */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* 2. Top Header Bar: 100% Mobile Phone Responsive & Safe Area Aware */}
      <header className="fixed top-0 inset-x-0 z-30 pt-[max(0.6rem,env(safe-area-inset-top))] px-2.5 sm:px-4 pb-2 bg-gradient-to-b from-[#071914]/95 via-[#071914]/70 to-transparent pointer-events-none">
        <div className="flex items-center justify-between gap-1.5 sm:gap-3 max-w-7xl mx-auto w-full">
          {/* Brand & City Badge (Left) */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 bg-[#071914]/90 border border-[#3F7D64]/60 rounded-xl sm:rounded-2xl px-2 sm:px-3 py-1 sm:py-1.5 shadow-xl backdrop-blur-md min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#1B4D3E] via-[#C17817] to-[#F59E0B] p-0.5 shadow-md flex items-center justify-center font-black text-amber-300 text-xs flex-shrink-0">
              3D
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-black text-xs sm:text-sm text-[#F7F1E3] tracking-wide truncate">
                  SaBo 3D
                </span>
                <span className="text-[9px] bg-[#C17817]/25 text-amber-300 px-1.5 py-0.2 rounded-full border border-amber-500/30 font-bold whitespace-nowrap">
                  🌧️ Bogor
                </span>
              </div>
              <p className="text-[10px] text-[#8FBC94] truncate hidden sm:block">
                {t('bogor_3d_subtitle')}
              </p>
            </div>
          </div>

          {/* Action Controls: Klakson Angkot + Audio Toggle + Enter SaBo Button (Right) */}
          <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Angkot Horn Beep Button ("Tett-Tett!") */}
            <button
              onClick={playAngkotHorn}
              className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-bold text-xs shadow-lg cursor-pointer transition active:scale-95 flex-shrink-0"
              title="Bunyikan Klakson Angkot Hijau (Tett-Tett!)"
              aria-label="Bunyikan Klakson Angkot"
            >
              <span className="text-sm">📢</span>
              <span className="hidden md:inline text-[11px]">Klakson</span>
            </button>

            {/* Audio Ambience Toggle */}
            <button
              onClick={() => setIsAudioActive(!isAudioActive)}
              className={`p-1.5 sm:p-2 rounded-xl border transition shadow-lg cursor-pointer flex items-center justify-center flex-shrink-0 ${
                isAudioActive
                  ? 'bg-emerald-900/90 text-emerald-300 border-emerald-500/60 ring-1 ring-emerald-400/40'
                  : 'bg-[#071914]/90 text-stone-400 border-[#3F7D64]/40 hover:text-white'
              }`}
              title={lang === 'en' ? 'Toggle Audio Ambience' : 'Suara Alam Bogor'}
              aria-label="Toggle Audio"
            >
              {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Enter App Button */}
            <button
              onClick={onEnterApp}
              className="flex items-center gap-1 bg-gradient-to-r from-[#C17817] via-[#D97706] to-[#F59E0B] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-xl border border-amber-300/60 cursor-pointer transition active:scale-95 whitespace-nowrap flex-shrink-0"
            >
              <span className="inline sm:hidden">{lang === 'en' ? 'Enter' : 'Masuk'}</span>
              <span className="hidden sm:inline">{t('btn_enter_sabo')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Floating Mobile Touch Gesture Helper Pill */}
      {showTouchHint && (
        <div className="fixed top-[max(3.8rem,calc(env(safe-area-inset-top)+3rem))] left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500 px-2 max-w-[95%]">
          <div className="bg-[#071914]/90 border border-[#3F7D64]/50 rounded-full px-3 py-1 text-[10px] sm:text-[11px] text-[#8FBC94] shadow-xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>
              {lang === 'en'
                ? 'Swipe 1 finger to rotate • Pinch 2 fingers to zoom'
                : 'Geser 1 jari untuk putar 360° • Cubit 2 jari untuk zoom'}
            </span>
          </div>
        </div>
      )}

      {/* 4. Landmark Information Floating Card / Mobile Safe Sheet */}
      {landmarkInfo && (
        <div className="fixed top-[max(3.8rem,calc(env(safe-area-inset-top)+3rem))] left-2 sm:left-4 right-2 sm:right-auto z-20 max-w-full sm:max-w-sm max-h-[44vh] overflow-y-auto bg-[#071914]/95 border border-[#3F7D64]/60 rounded-2xl p-3 shadow-2xl backdrop-blur-md transition-all duration-300">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <h3 className="font-black text-xs sm:text-sm text-amber-300 leading-tight">
                  {landmarkInfo.title}
                </h3>
              </div>
              <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                {landmarkInfo.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-[9px] text-amber-200 font-mono bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold">
                {landmarkInfo.year}
              </span>
              <button
                onClick={() => setLandmarkInfo(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
                aria-label="Tutup info"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-stone-200 leading-relaxed">{landmarkInfo.desc}</p>

          {landmarkInfo.funFact && (
            <div className="mt-2 pt-2 border-t border-white/10 flex items-start gap-1.5 text-[10px] text-[#B8D5BC]">
              <span className="text-amber-400 font-bold">💡 Fakta:</span>
              <span>{landmarkInfo.funFact}</span>
            </div>
          )}

          <div className="mt-2.5 flex items-center justify-between">
            <button
              onClick={onEnterApp}
              className="text-[10px] font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 underline underline-offset-2 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Explore in App Quests' : 'Buka & Kerjakan Quest Lokasi'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Thumb-Friendly Ergonomic Bottom Dock (100% Mobile Safe, Never Cut Off) */}
      <div className="fixed bottom-0 inset-x-0 z-30 pb-[max(0.5rem,env(safe-area-inset-bottom))] px-2 sm:px-4 pointer-events-none flex flex-col items-center">
        {/* Dock Collapse Toggle Handle (Always Visible & Safely Elevated) */}
        <div className="pointer-events-auto flex justify-center mb-0.5">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1 px-3 py-1 bg-[#071914]/95 hover:bg-[#102a22] text-amber-300 text-[11px] font-bold rounded-t-xl border-t border-x border-[#3F7D64]/60 shadow-xl cursor-pointer transition active:scale-95 backdrop-blur-md"
            aria-label="Toggle Control Panel"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'en' ? 'Show Controls' : 'Panel Kontrol 3D'}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'en' ? 'Minimize' : 'Kecilkan'}</span>
              </>
            )}
          </button>
        </div>

        {/* Main Control Panel (Predictable Height, Zero-Wrap, Zero-Cutoff) */}
        {!isDockCollapsed && (
          <div className="pointer-events-auto w-full max-w-3xl bg-[#071914]/95 border border-[#3F7D64]/60 rounded-2xl p-2 sm:p-2.5 shadow-2xl backdrop-blur-md">
            {/* Shelf 1: Landmark Focus Selector (Horizontal Swipe Carousel) */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-nowrap pb-1.5 touch-pan-x">
              <span className="text-[10px] text-[#8FBC94] uppercase font-bold tracking-wider mr-1 hidden sm:inline whitespace-nowrap flex-shrink-0">
                {lang === 'en' ? 'Landmark:' : 'Pusaka:'}
              </span>

              <button
                onClick={() => setActivePreset('kujang')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 min-h-[34px] flex-shrink-0 active:scale-95 ${
                  activePreset === 'kujang'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'bg-[#143328] text-stone-200 hover:bg-[#1a4033]'
                }`}
              >
                <span>🗡️</span>
                <span>{t('cam_monumen_kujang')}</span>
              </button>

              <button
                onClick={() => setActivePreset('salapan')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 min-h-[34px] flex-shrink-0 active:scale-95 ${
                  activePreset === 'salapan'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'bg-[#143328] text-stone-200 hover:bg-[#1a4033]'
                }`}
              >
                <span>🏛️</span>
                <span>{t('cam_lawang_salapan')}</span>
              </button>

              <button
                onClick={() => setActivePreset('istana')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 min-h-[34px] flex-shrink-0 active:scale-95 ${
                  activePreset === 'istana'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'bg-[#143328] text-stone-200 hover:bg-[#1a4033]'
                }`}
              >
                <span>🦌</span>
                <span>{t('cam_istana_bogor')}</span>
              </button>

              <button
                onClick={() => setActivePreset('kebun')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 min-h-[34px] flex-shrink-0 active:scale-95 ${
                  activePreset === 'kebun'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'bg-[#143328] text-stone-200 hover:bg-[#1a4033]'
                }`}
              >
                <span>🌳</span>
                <span>{t('cam_kebun_raya')}</span>
              </button>

              <button
                onClick={() => setActivePreset('ciliwung')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 min-h-[34px] flex-shrink-0 active:scale-95 ${
                  activePreset === 'ciliwung'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'bg-[#143328] text-stone-200 hover:bg-[#1a4033]'
                }`}
              >
                <span>🌊</span>
                <span>{t('cam_ciliwung')}</span>
              </button>

              <button
                onClick={() => setActivePreset('salak')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 min-h-[34px] flex-shrink-0 active:scale-95 ${
                  activePreset === 'salak'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'bg-[#143328] text-stone-200 hover:bg-[#1a4033]'
                }`}
              >
                <span>🌋</span>
                <span>{t('cam_skyline_salak')}</span>
              </button>

              <button
                onClick={() => setActivePreset('free')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 min-h-[34px] flex-shrink-0 active:scale-95 ${
                  activePreset === 'free'
                    ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-300'
                    : 'bg-[#143328] text-stone-200 hover:bg-[#1a4033]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t('cam_free_orbit')}</span>
              </button>
            </div>

            {/* Shelf 2: Atmosphere & Weather & Skip (Horizontal Swipe Row, Never Wrapping) */}
            <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-white/10 overflow-x-auto scrollbar-none flex-nowrap touch-pan-x">
              {/* Atmosphere / Time-of-Day Segmented Control */}
              <div className="flex items-center gap-1 bg-[#0f2a21] p-0.5 rounded-xl border border-[#3F7D64]/50 flex-shrink-0">
                <button
                  onClick={() => setTimeOfDay('morning')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer min-h-[30px] active:scale-95 ${
                    timeOfDay === 'morning'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title="Pagi Berkabut Lembah Salak"
                >
                  <Cloud className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t('time_morning')}</span>
                </button>

                <button
                  onClick={() => setTimeOfDay('day')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer min-h-[30px] active:scale-95 ${
                    timeOfDay === 'day'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title={t('time_day')}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t('time_day')}</span>
                </button>

                <button
                  onClick={() => setTimeOfDay('sunset')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer min-h-[30px] active:scale-95 ${
                    timeOfDay === 'sunset'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title={t('time_sunset')}
                >
                  <Sunset className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t('time_sunset')}</span>
                </button>

                <button
                  onClick={() => setTimeOfDay('night')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer min-h-[30px] active:scale-95 ${
                    timeOfDay === 'night'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title={t('time_night')}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t('time_night')}</span>
                </button>
              </div>

              {/* Signature Rain Toggle Button */}
              <button
                onClick={() => setIsRaining(!isRaining)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition cursor-pointer min-h-[30px] flex-shrink-0 active:scale-95 ${
                  isRaining
                    ? 'bg-cyan-950/90 text-cyan-200 border-cyan-400 shadow-lg ring-1 ring-cyan-400/50'
                    : 'bg-[#143328] text-stone-300 border-[#3F7D64]/40 hover:text-white'
                }`}
                title="Aktifkan Simulasi Hujan Rintik Khas Kota Bogor"
              >
                <CloudRain className={`w-3.5 h-3.5 ${isRaining ? 'text-cyan-300 animate-bounce' : 'text-stone-400'}`} />
                <span>{isRaining ? '🌧️ Hujan: ON' : 'Cerah (Hujan: OFF)'}</span>
              </button>

              {/* Enter App Shortcut */}
              <button
                onClick={onEnterApp}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-xl transition cursor-pointer shadow-md flex items-center gap-1 min-h-[30px] flex-shrink-0 active:scale-95 whitespace-nowrap"
              >
                <span>{lang === 'en' ? 'Skip 3D' : 'Lewati 3D'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
