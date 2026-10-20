import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Compass,
  Sparkles,
  Award,
  RefreshCw,
  Eye,
  ShieldCheck,
  CheckCircle2,
  X,
  Volume2,
  VolumeX,
  Zap,
  Info,
  Maximize2,
  MapPin,
  Flame,
  Download,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, VirtualArtifact } from '../types';
import { VIRTUAL_ARTIFACTS } from '../data/arArtifactsData';
import { useLanguage } from '../utils/translations';

interface ModuleARScannerProps {
  user: UserProfile;
  userPos: { lat: number; lng: number };
  onCollectArtifact: (artifact: VirtualArtifact) => void;
  onClose?: () => void;
  initialLocationId?: string;
}

// Simple Web Audio API Synthesizer for immersive sci-fi AR sounds
class ARSoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public playScanPing() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  public playLockOn() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.16); // G5

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch (e) {}
  }

  public playCollectSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.25);
      });
    } catch (e) {}
  }
}

const sfx = new ARSoundEffects();

export const ModuleARScanner: React.FC<ModuleARScannerProps> = ({
  user,
  userPos,
  onCollectArtifact,
  onClose,
  initialLocationId,
}) => {
  const { lang, t } = useLanguage();

  // Camera stream state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<'requesting' | 'active' | 'denied' | 'simulated'>('requesting');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [hasTorch, setHasTorch] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Selected Location for AR hunting
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    initialLocationId || 'all'
  );

  // Orientation & Compass Simulation / Gyro
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [pitchAngle, setPitchAngle] = useState<number>(0); // vertical tilt
  const [simulatedHeadingOffset, setSimulatedHeadingOffset] = useState<number>(0);

  // AR Artifacts & Target Selection
  const [activeArtifact, setActiveArtifact] = useState<VirtualArtifact | null>(null);
  const [analyzingArtifact, setAnalyzingArtifact] = useState<VirtualArtifact | null>(null);
  const [scanningProgress, setScanningProgress] = useState<number>(0);
  const [collectedPopup, setCollectedPopup] = useState<VirtualArtifact | null>(null);
  const [showArtifactBook, setShowArtifactBook] = useState<boolean>(false);
  const [snapshotTaken, setSnapshotTaken] = useState<string | null>(null);

  // Drag-to-look for simulated mode or manual rotation
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sound muting sync
  useEffect(() => {
    sfx.setMuted(isMuted);
  }, [isMuted]);

  // Start real camera with fallback to simulated viewfinder
  useEffect(() => {
    let isCancelled = false;

    const startCamera = async () => {
      setCameraState('requesting');

      // Stop existing tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (!isCancelled) setCameraState('simulated');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (isCancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }

        // Check torch capability
        const track = stream.getVideoTracks()[0];
        const capabilities = (track.getCapabilities && track.getCapabilities()) as { torch?: boolean };
        setHasTorch(Boolean(capabilities?.torch));

        setCameraState('active');
      } catch (err) {
        console.warn('Real camera not available or permission denied, using simulated AR camera:', err);
        if (!isCancelled) {
          setCameraState('simulated');
        }
      }
    };

    startCamera();

    return () => {
      isCancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Toggle torch/flashlight if supported
  const handleToggleTorch = async () => {
    if (!streamRef.current || !hasTorch) return;
    try {
      const track = streamRef.current.getVideoTracks()[0];
      const nextTorch = !torchOn;
      await (track as unknown as { applyConstraints: (c: unknown) => Promise<void> }).applyConstraints({
        advanced: [{ torch: nextTorch }],
      });
      setTorchOn(nextTorch);
    } catch (e) {
      console.warn('Torch not supported', e);
    }
  };

  // Flip camera
  const handleFlipCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Gyroscope / DeviceOrientation Listener
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setDeviceHeading(e.alpha);
      }
      if (e.beta !== null) {
        setPitchAngle(e.beta);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Filter artifacts according to location selector
  const visibleArtifacts = VIRTUAL_ARTIFACTS.filter((art) => {
    if (selectedLocationId === 'all') return true;
    return art.locationId === selectedLocationId;
  });

  // Calculate synthetic screen positions for artifacts based on heading angle
  const totalHeading = (deviceHeading + simulatedHeadingOffset) % 360;

  // Periodic sonar ping & auto-focus nearest artifact in field of view
  useEffect(() => {
    const interval = setInterval(() => {
      sfx.playScanPing();
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Drag interaction for simulated look-around
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setSimulatedHeadingOffset((prev) => (prev - dx * 0.4 + 360) % 360);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setSimulatedHeadingOffset((prev) => (prev - dx * 0.4 + 360) % 360);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Scanning / Analyzing an artifact
  const handleStartScan = (art: VirtualArtifact) => {
    sfx.playLockOn();
    setAnalyzingArtifact(art);
    setScanningProgress(0);

    let progress = 0;
    const step = () => {
      progress += 5;
      setScanningProgress(Math.min(100, progress));
      if (progress < 100) {
        setTimeout(step, 45);
      } else {
        sfx.playLockOn();
      }
    };
    step();
  };

  // Collect artifact
  const handleConfirmCollect = (art: VirtualArtifact) => {
    sfx.playCollectSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#FBBF24'],
    });

    onCollectArtifact(art);
    setCollectedPopup(art);
    setAnalyzingArtifact(null);
    setActiveArtifact(null);
  };

  // Snap photo with AR HUD
  const handleTakeSnapshot = () => {
    try {
      const canvas = document.createElement('canvas');
      const width = 800;
      const height = 1200;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background: camera feed or simulated dusk Bogor landscape
      if (videoRef.current && cameraState === 'active') {
        ctx.drawImage(videoRef.current, 0, 0, width, height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#041c14');
        grad.addColorStop(0.5, '#0c382b');
        grad.addColorStop(1, '#051811');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, height);
          ctx.stroke();
        }
      }

      // Draw AR watermark and brand
      ctx.fillStyle = 'rgba(15, 42, 33, 0.85)';
      ctx.fillRect(20, 20, width - 40, 100);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, width - 40, 100);

      ctx.font = 'bold 26px sans-serif';
      ctx.fillStyle = '#F59E0B';
      ctx.fillText('SaBo • SABA BOGOR AR SCANNER', 40, 60);

      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#E5E7EB';
      ctx.fillText(
        `Lokasi: ${activeArtifact?.locationName || 'Kota Bogor'} • ${new Date().toLocaleDateString('id-ID')}`,
        40,
        95
      );

      // Draw artifact stamp if active
      if (activeArtifact) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
        ctx.fillRect(width / 2 - 120, height / 2 - 120, 240, 240);
        ctx.font = '72px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(activeArtifact.icon, width / 2, height / 2);
        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = '#062419';
        ctx.fillText(activeArtifact.name, width / 2, height / 2 + 60);
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSnapshotTaken(dataUrl);
      sfx.playCollectSuccess();
    } catch (e) {
      console.warn('Snapshot failed', e);
    }
  };

  const isCollected = (id: string) => {
    return user.collectedArtifacts?.includes(id);
  };

  const collectedCount = user.collectedArtifacts?.length || 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col select-none overflow-hidden touch-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Camera Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {cameraState === 'active' ? (
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              facingMode === 'user' ? 'scale-x-[-1]' : ''
            }`}
          />
        ) : (
          /* Simulated Realistic Viewfinder for Dev Iframe / Laptops without back camera */
          <div className="relative w-full h-full bg-gradient-to-b from-[#061812] via-[#0d2b22] to-[#04120e] overflow-hidden">
            {/* Ambient camera sensor grain and grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Simulated Bogor Landscape Silhouette */}
            <div className="absolute bottom-0 inset-x-0 h-72 opacity-25 pointer-events-none bg-gradient-to-t from-emerald-950 via-teal-950 to-transparent flex items-end justify-center">
              <svg viewBox="0 0 1000 300" className="w-full h-48 text-emerald-900 fill-current opacity-40">
                {/* Silhouette of Salak & Palace Dome */}
                <path d="M 0 300 L 0 220 Q 200 120 400 180 T 600 240 Q 750 90 850 160 L 1000 210 L 1000 300 Z" />
                <path d="M 350 240 L 400 190 L 450 240 Z" fill="#F59E0B" opacity="0.3" />
              </svg>
            </div>

            {/* Scanning Laser Beam */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60 animate-scanner-beam shadow-[0_0_15px_#34d399]" />

            {/* Simulation Banner Notice */}
            <div className="absolute top-20 inset-x-0 flex justify-center pointer-events-none px-4">
              <div className="bg-emerald-950/70 backdrop-blur-md border border-emerald-500/40 text-emerald-200 text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>
                  {lang === 'en'
                    ? 'AR Simulated Viewfinder Active • Drag to Pan Compass 360°'
                    : 'Viewfinder Simulasi AR Aktif • Geser Layar untuk Putar Kompas 360°'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Futuristic AR Optical Vignette & Scanner Grid Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Corner HUD Brackets */}
        <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-emerald-400 shadow-[0_0_10px_#10b981]" />
        <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-emerald-400 shadow-[0_0_10px_#10b981]" />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-emerald-400 shadow-[0_0_10px_#10b981]" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-emerald-400 shadow-[0_0_10px_#10b981]" />

        {/* Center Target Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-emerald-500/30 flex items-center justify-center">
          <div className="w-36 h-36 rounded-full border border-dashed border-amber-400/40 animate-spin-slow" />
          <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="absolute -top-3 text-[10px] text-emerald-300 font-mono tracking-widest">
            SCAN RETICLE 0.1°
          </div>
          <div className="absolute -bottom-3 text-[10px] text-amber-300/80 font-mono">
            {Math.round(totalHeading)}° N
          </div>
        </div>
      </div>

      {/* Top Controls Header HUD */}
      <div className="relative z-20 p-3 sm:p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between gap-2">
        {/* Brand / Mode Indicator */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shadow-md">
            <Camera className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-white font-black text-sm tracking-wide">
                SaBo AR Lens
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80">
              {visibleArtifacts.length} {lang === 'en' ? 'signals in radar' : 'sinyal di radar'}
            </p>
          </div>
        </div>

        {/* Action Tool Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Mute Audio */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-white transition active:scale-95"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Torch if available */}
          {hasTorch && (
            <button
              onClick={handleToggleTorch}
              className={`p-2.5 rounded-xl border transition active:scale-95 ${
                torchOn
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/50'
                  : 'bg-black/60 border-white/20 text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
            </button>
          )}

          {/* Flip camera */}
          <button
            onClick={handleFlipCamera}
            className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-white transition active:scale-95"
            title="Ganti Kamera Depan/Belakang"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Artifact Collection Book */}
          <button
            onClick={() => setShowArtifactBook(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold text-xs transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {collectedCount}/{VIRTUAL_ARTIFACTS.length}
            </span>
          </button>

          {/* Close */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-white transition active:scale-95 ml-1"
              title="Tutup AR Scanner"
            >
              <X className="w-4 h-4 text-red-300" />
            </button>
          )}
        </div>
      </div>

      {/* Location Filter Selector Bar */}
      <div className="relative z-20 px-4 py-1.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-emerald-300/80 flex items-center gap-1 flex-shrink-0">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'en' ? 'Target Area:' : 'Area Buruan:'}</span>
        </span>

        <button
          onClick={() => setSelectedLocationId('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            selectedLocationId === 'all'
              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow'
              : 'bg-black/50 text-emerald-100 hover:bg-emerald-950/60 border-emerald-500/30'
          }`}
        >
          {lang === 'en' ? '🌐 All Bogor' : '🌐 Seluruh Bogor'}
        </button>

        {[
          { id: 'istana_bogor', name: 'Istana Bogor' },
          { id: 'kebun_raya_bogor', name: 'Kebun Raya' },
          { id: 'tugu_kujang', name: 'Tugu Kujang' },
          { id: 'prasasti_batutulis', name: 'Prasasti Batutulis' },
          { id: 'kopi_liong_bulan', name: 'Suryakencana' },
          { id: 'sanggar_seni_katulampa', name: 'Katulampa' },
        ].map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelectedLocationId(loc.id)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition border ${
              selectedLocationId === loc.id
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow'
                : 'bg-black/50 text-emerald-100 hover:bg-emerald-950/60 border-emerald-500/30'
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* AR Interactive Field with Floating Digital Markers */}
      <div className="relative flex-1 z-20 overflow-hidden pointer-events-auto">
        {visibleArtifacts.map((art, idx) => {
          // Calculate an angular bearing for this artifact
          const artifactBearing = (idx * 55 + 30) % 360;
          let diff = (artifactBearing - totalHeading + 540) % 360 - 180; // range -180 to 180

          // Horizontal position on screen (FOV ~ 90 degrees)
          const fov = 90;
          const isVisibleInFov = Math.abs(diff) <= fov / 2;

          const screenPercentX = 50 + (diff / (fov / 2)) * 45; // 5% to 95%
          const screenPercentY = 38 + ((idx % 3) - 1) * 14; // staggered height

          const collected = isCollected(art.id);
          const isLockedOn = Math.abs(diff) < 14;

          return (
            <div
              key={art.id}
              onClick={() => {
                setActiveArtifact(art);
                handleStartScan(art);
              }}
              style={{
                left: `${screenPercentX}%`,
                top: `${screenPercentY}%`,
                transform: `translate(-50%, -50%) scale(${isLockedOn ? 1.15 : 0.95})`,
                opacity: isVisibleInFov ? 1 : 0.25,
                transition: 'transform 0.2s ease, opacity 0.3s ease',
              }}
              className={`absolute cursor-pointer flex flex-col items-center group pointer-events-auto z-30 ${
                !isVisibleInFov ? 'pointer-events-none' : ''
              }`}
            >
              {/* Distance & Tag */}
              <div className="mb-1.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md border border-emerald-400 text-emerald-300 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{(12.4 + idx * 3.8).toFixed(1)}m</span>
                {collected && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5" />
                )}
              </div>

              {/* 3D Floating Hologram Object */}
              <div className="relative">
                {/* Pulsing outer aura ring */}
                <div
                  className={`w-20 h-20 rounded-full absolute -inset-1 border-2 animate-ping opacity-30 ${
                    art.rarity === 'legendary'
                      ? 'border-amber-400'
                      : art.rarity === 'epic'
                      ? 'border-purple-400'
                      : 'border-emerald-400'
                  }`}
                />

                {/* Rotating AR Hologram Base */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl backdrop-blur-md border-2 transition-all transform group-hover:scale-110 active:scale-95 ${
                    art.rarity === 'legendary'
                      ? 'bg-gradient-to-tr from-amber-600/40 via-yellow-500/30 to-amber-300/40 border-amber-400 shadow-amber-500/50'
                      : art.rarity === 'epic'
                      ? 'bg-gradient-to-tr from-purple-700/40 via-pink-600/30 to-purple-400/40 border-purple-400 shadow-purple-500/50'
                      : 'bg-gradient-to-tr from-emerald-800/40 via-teal-600/30 to-emerald-400/40 border-emerald-400 shadow-emerald-500/50'
                  } ${isLockedOn ? 'ring-4 ring-emerald-300/70 animate-bounce' : ''}`}
                >
                  <span className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
                    {art.icon}
                  </span>
                </div>

                {/* Scan Crosshair Indicator if locked on */}
                {isLockedOn && (
                  <div className="absolute -inset-3 border border-dashed border-emerald-300 rounded-full animate-spin-slow pointer-events-none" />
                )}
              </div>

              {/* Label */}
              <div className="mt-2 text-center">
                <span className="font-extrabold text-xs text-white bg-black/75 px-2.5 py-1 rounded-xl border border-white/20 shadow-md block max-w-[140px] truncate">
                  {lang === 'en' ? art.nameEn : art.name}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-600/50 mt-0.5 inline-block">
                  +{art.xpReward} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sonar Compass & Radar HUD Widget (Bottom Left) */}
      <div className="absolute bottom-28 left-4 z-20 pointer-events-auto">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black/80 backdrop-blur-md border-2 border-emerald-500/50 p-1 relative shadow-2xl overflow-hidden">
          {/* Radar Sweep Line */}
          <div className="absolute inset-0 rounded-full origin-center animate-radar-sweep bg-gradient-to-tr from-emerald-500/30 via-transparent to-transparent pointer-events-none" />

          {/* Compass Rings */}
          <div className="w-full h-full rounded-full border border-emerald-500/20 flex items-center justify-center relative">
            <div className="w-2/3 h-2/3 rounded-full border border-emerald-500/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Radar Artifact Blips */}
            {visibleArtifacts.map((art, idx) => {
              const blipAngle = ((idx * 55 + 30 - totalHeading) * Math.PI) / 180;
              const radius = 30 + (idx % 3) * 10;
              const bx = 45 + Math.sin(blipAngle) * radius;
              const by = 45 - Math.cos(blipAngle) * radius;
              return (
                <div
                  key={art.id}
                  style={{ left: `${bx}%`, top: `${by}%` }}
                  className={`absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${
                    isCollected(art.id) ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                  }`}
                />
              );
            })}

            {/* Cardinal Directions */}
            <span className="absolute top-0.5 text-[8px] font-black text-amber-400">N</span>
            <span className="absolute bottom-0.5 text-[8px] font-black text-emerald-400/70">S</span>
            <span className="absolute left-0.5 text-[8px] font-black text-emerald-400/70">W</span>
            <span className="absolute right-0.5 text-[8px] font-black text-emerald-400/70">E</span>
          </div>
        </div>
      </div>

      {/* Bottom Main Action Deck */}
      <div className="relative z-30 p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center gap-3">
        {/* Signal Strength & Nearest Artifact Bar */}
        <div className="w-full max-w-md bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-2.5 px-3 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2 min-w-0">
            <Compass className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-spin-slow" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400/80 block">
                {lang === 'en' ? 'Signal Radar Status' : 'Status Radar Artefak'}
              </span>
              <p className="text-xs font-bold text-white truncate">
                {visibleArtifacts[0]?.name || 'Memindai area sekitar...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] font-mono font-black text-amber-300">
              92% LOCK
            </span>
            <div className="w-16 bg-black/60 rounded-full h-2 overflow-hidden border border-emerald-500/40">
              <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full w-[92%] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Central Trigger Controls */}
        <div className="flex items-center justify-center gap-4 w-full max-w-sm">
          {/* Quick Snapshot Memory */}
          <button
            onClick={handleTakeSnapshot}
            className="p-3.5 rounded-2xl bg-black/60 hover:bg-black/80 border border-white/20 text-white transition active:scale-90 shadow-lg"
            title="Ambil Foto AR"
          >
            <Camera className="w-5 h-5 text-emerald-300" />
          </button>

          {/* Main Shutter / Target Scan Button */}
          <button
            onClick={() => {
              const target = visibleArtifacts[0];
              if (target) {
                setActiveArtifact(target);
                handleStartScan(target);
              }
            }}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-black text-sm tracking-wide shadow-xl shadow-emerald-950/80 border border-emerald-300/40 transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>
              {lang === 'en' ? 'SCAN SURROUNDINGS' : 'PINDAI SEKITAR'}
            </span>
          </button>

          {/* Collection Codex */}
          <button
            onClick={() => setShowArtifactBook(true)}
            className="p-3.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 transition active:scale-90 shadow-lg"
            title="Koleksi Artefak"
          >
            <Award className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Artifact Analysis / Collection Modal */}
      {analyzingArtifact && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="w-full max-w-md bg-gradient-to-b from-[#0F2A21] via-[#13382c] to-[#0A1F18] border-2 border-amber-400/60 rounded-3xl p-5 shadow-2xl relative text-white space-y-4">
            {/* Holographic Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-3xl shadow-lg border-2 border-white/40">
                  {analyzingArtifact.icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {analyzingArtifact.rarity.toUpperCase()} RELIC
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1">
                    {lang === 'en' ? analyzingArtifact.nameEn : analyzingArtifact.name}
                  </h3>
                  <p className="text-xs text-emerald-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{analyzingArtifact.locationName}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAnalyzingArtifact(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scanning Progress Bar */}
            {scanningProgress < 100 ? (
              <div className="space-y-1.5 py-2">
                <div className="flex justify-between text-xs font-mono text-emerald-300">
                  <span>{lang === 'en' ? 'Decompiling Hologram...' : 'Mendekomposisi Hologram...'}</span>
                  <span>{scanningProgress}%</span>
                </div>
                <div className="w-full bg-black/60 rounded-full h-2.5 overflow-hidden border border-emerald-500/40">
                  <div
                    className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 h-full transition-all duration-75"
                    style={{ width: `${scanningProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              /* Discovered Lore & Details */
              <div className="space-y-3 animate-fade-in">
                <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/30 text-xs text-emerald-100 leading-relaxed">
                  <p className="font-semibold text-amber-200 mb-1">
                    📖 {lang === 'en' ? 'Historical Lore:' : 'Kisah Sejarah:'}
                  </p>
                  <p>{lang === 'en' ? analyzingArtifact.loreEn : analyzingArtifact.lore}</p>
                </div>

                <div className="flex items-center justify-between text-xs bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-500/30">
                  <span className="text-emerald-200">
                    {lang === 'en' ? 'Discovery Reward:' : 'Hadiah Penemuan:'}
                  </span>
                  <span className="font-black text-amber-300 flex items-center gap-1 text-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    +{analyzingArtifact.xpReward} XP
                  </span>
                </div>
              </div>
            )}

            {/* Confirmation Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setAnalyzingArtifact(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
              >
                {lang === 'en' ? 'Cancel' : 'Batal'}
              </button>

              <button
                disabled={scanningProgress < 100}
                onClick={() => handleConfirmCollect(analyzingArtifact)}
                className={`flex-1 py-2.5 rounded-xl font-black text-xs transition flex items-center justify-center gap-1.5 shadow-lg ${
                  scanningProgress >= 100
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 hover:brightness-110 active:scale-95 cursor-pointer'
                    : 'bg-white/20 text-white/40 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isCollected(analyzingArtifact.id)
                    ? lang === 'en'
                      ? 'Re-Collect (+Half XP)'
                      : 'Koleksi Ulang (+Half XP)'
                    : lang === 'en'
                    ? 'Collect Artifact'
                    : 'Simpan ke Koleksi'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snapshot Preview Modal */}
      {snapshotTaken && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-[#0F2A21] border border-amber-400 rounded-3xl p-4 shadow-2xl space-y-3 text-white text-center">
            <h4 className="font-extrabold text-sm text-amber-300 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'AR Photo Memory Saved!' : 'Foto Kenangan AR Disimpan!'}</span>
            </h4>

            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-md">
              <img src={snapshotTaken} alt="AR Snapshot" className="w-full max-h-80 object-cover" />
            </div>

            <div className="flex gap-2">
              <a
                href={snapshotTaken}
                download={`SaBo_AR_${Date.now()}.jpg`}
                className="flex-1 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Download' : 'Unduh'}</span>
              </a>

              <button
                onClick={() => setSnapshotTaken(null)}
                className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
              >
                {lang === 'en' ? 'Close' : 'Tutup'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Artifact Book / Collection Drawer Modal */}
      {showArtifactBook && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="w-full max-w-xl max-h-[85vh] bg-[#0F2A21] border border-[#3F7D64] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#173D30]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    {lang === 'en' ? 'Digital Artifact Codex' : 'Buku Relik & Artefak AR'}
                  </h3>
                  <p className="text-[11px] text-[#8FBC94]">
                    {collectedCount} {lang === 'en' ? 'of' : 'dari'} {VIRTUAL_ARTIFACTS.length}{' '}
                    {lang === 'en' ? 'artifacts collected' : 'artefak berhasil dikoleksi'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowArtifactBook(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Artifacts Grid */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VIRTUAL_ARTIFACTS.map((art) => {
                  const unlocked = isCollected(art.id);
                  return (
                    <div
                      key={art.id}
                      className={`p-3 rounded-2xl border transition flex items-start gap-3 ${
                        unlocked
                          ? 'bg-gradient-to-br from-[#173D30] to-[#0F2A21] border-amber-400/60 shadow-md'
                          : 'bg-black/30 border-white/10 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                          unlocked
                            ? 'bg-amber-500/20 border-amber-400 text-white'
                            : 'bg-white/5 border-white/10 text-white/30'
                        }`}
                      >
                        {unlocked ? art.icon : '❓'}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-amber-300">
                            {art.rarity}
                          </span>
                          {unlocked && (
                            <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              {lang === 'en' ? 'Found' : 'Ditemukan'}
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-white truncate mt-0.5">
                          {unlocked ? (lang === 'en' ? art.nameEn : art.name) : 'Artefak Tersembunyi'}
                        </h4>

                        <p className="text-[10px] text-emerald-200/70 truncate mt-0.5">
                          📍 {art.locationName}
                        </p>

                        <p className="text-[10px] text-white/70 line-clamp-2 mt-1 leading-relaxed">
                          {unlocked
                            ? lang === 'en'
                              ? art.descriptionEn
                              : art.description
                            : lang === 'en'
                            ? 'Scan in this location to discover!'
                            : 'Pindai kamera di lokasi ini untuk menemukan!'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-black/40 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowArtifactBook(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
              >
                {lang === 'en' ? 'Back to Camera' : 'Kembali ke Kamera'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
