import React, { useState } from 'react';
import {
  Bus,
  Train,
  Navigation,
  MapPin,
  Clock,
  CreditCard,
  ExternalLink,
  ChevronRight,
  Info,
  Footprints,
  Compass,
} from 'lucide-react';
import { BISKITA_CORRIDORS, TransitLine } from '../data/transitData';
import { useLanguage } from '../utils/translations';

interface ModuleTransitGuideProps {
  onNavigateToMap?: () => void;
}

export const ModuleTransitGuide: React.FC<ModuleTransitGuideProps> = ({
  onNavigateToMap,
}) => {
  const { lang } = useLanguage();
  const [selectedCorridor, setSelectedCorridor] = useState<TransitLine>(BISKITA_CORRIDORS[0]);
  const [activeTab, setActiveTab] = useState<'biskita' | 'walking' | 'krl'>('biskita');

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0F2A21] via-[#173D30] to-[#0A1F18] border border-[#3F7D64]/50 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
              <Bus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'Public Transit & Walking Guide' : 'Panduan Transportasi Publik & Pejalan Kaki'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F7F1E3] tracking-tight">
              Biskita Trans Pakuan & Akses Wisata Bogor
            </h1>
            <p className="text-xs sm:text-sm text-[#8FBC94] max-w-2xl leading-relaxed">
              {lang === 'en'
                ? 'Hop on modern air-conditioned buses and pedestrian trails connecting Bogor Railway Station, the Botanic Gardens, and Suryakencana without getting stuck in traffic.'
                : 'Jelajahi Kota Hujan bebas macet dengan armada bus modern ber-AC Biskita Trans Pakuan, rute ramah jalan kaki dari Stasiun Kereta Bogor, dan panduan halte terdekat.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('biskita')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'biskita'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>Biskita Trans Pakuan</span>
            </button>

            <button
              onClick={() => setActiveTab('walking')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'walking'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <Footprints className="w-4 h-4" />
              <span>Rute Jalan Kaki Stasiun</span>
            </button>

            <button
              onClick={() => setActiveTab('krl')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'krl'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>KRL Commuter Line</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Biskita Trans Pakuan */}
      {activeTab === 'biskita' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Corridor Selection List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Pilih Koridor Biskita
            </h3>
            {BISKITA_CORRIDORS.map((corridor) => (
              <div
                key={corridor.id}
                onClick={() => setSelectedCorridor(corridor)}
                className={`p-4 rounded-2xl border transition cursor-pointer relative ${
                  selectedCorridor.id === corridor.id
                    ? 'bg-[#173D30] border-amber-400 shadow-lg ring-1 ring-amber-400/50'
                    : 'bg-[#0F2A21]/70 border-[#3F7D64]/30 hover:bg-[#173D30]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ backgroundColor: `${corridor.color}25`, borderColor: corridor.color }}
                    className="text-xs font-black px-2.5 py-0.5 rounded-lg border text-white font-mono"
                  >
                    {corridor.code}
                  </span>
                  <span className="text-[11px] text-amber-300 font-bold">{corridor.fare}</span>
                </div>
                <h4 className="font-bold text-sm text-[#F7F1E3] mt-2 leading-snug">
                  {corridor.name}
                </h4>
                <p className="text-[11px] text-[#8FBC94] mt-1 line-clamp-2">
                  {corridor.overview}
                </p>
              </div>
            ))}

            {/* Fare & Payment Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#173D30] to-[#0A1F18] border border-[#3F7D64]/40 text-xs text-white space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <CreditCard className="w-4 h-4" />
                <span>Metode Pembayaran Non-Tunai</span>
              </div>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                Wajib tap kartu e-Money, Flazz BCA, TapCash BNI, Brizzi BRI, atau scan QRIS Biskita saat naik di pintu depan.
              </p>
            </div>
          </div>

          {/* Corridor Details & Halte Stops Timeline */}
          <div className="lg:col-span-2 space-y-4 bg-[#0F2A21]/90 border border-[#3F7D64]/40 rounded-3xl p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div>
                <span
                  style={{ backgroundColor: `${selectedCorridor.color}30`, borderColor: selectedCorridor.color }}
                  className="text-xs font-black px-2.5 py-0.5 rounded-md border text-amber-300 font-mono"
                >
                  {selectedCorridor.code}
                </span>
                <h3 className="font-black text-base text-[#F7F1E3] mt-1">
                  {selectedCorridor.name}
                </h3>
              </div>

              <div className="flex items-center space-x-3 text-xs text-emerald-300">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedCorridor.operatingHours}</span>
                </div>
                <div className="flex items-center space-x-1 text-amber-300">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{selectedCorridor.headway}</span>
                </div>
              </div>
            </div>

            {/* Halte List Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase text-[#8FBC94] tracking-wider">
                Daftar Halte & Cagar Budaya Terdekat
              </h4>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-500/40">
                {selectedCorridor.stops.map((stop, index) => (
                  <div key={stop.id} className="relative group">
                    {/* Circle Node */}
                    <div
                      style={{ backgroundColor: selectedCorridor.color }}
                      className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-[#0F2A21] shadow"
                    />

                    <div className="bg-[#173D30]/60 p-3 rounded-2xl border border-white/10 hover:border-amber-400/50 transition">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs sm:text-sm text-white">
                          {index + 1}. {stop.name}
                        </h5>
                        <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-600/30">
                          📍 {stop.nearbyLandmark}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pedestrian Walking Routes from Bogor Station */}
      {activeTab === 'walking' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Rute 1: Stasiun Bogor ➔ Alun-Alun & Masjid Agung',
              time: '2 - 4 Menit Jalan Kaki',
              distance: '200 Meter',
              steps: [
                'Keluar lewat Pintu Timur Stasiun Bogor.',
                'Langsung terhubung dengan jembatan layang pejalan kaki ke Alun-Alun Kota Bogor.',
                'Nikmati jogging track, area bermain ramah anak, dan kemegahan Masjid Agung Bogor.',
              ],
            },
            {
              title: 'Rute 2: Stasiun Bogor ➔ Pintu Utama Kebun Raya & Istana',
              time: '12 - 15 Menit Jalan Kaki',
              distance: '1.1 KM',
              steps: [
                'Keluar Pintu Timur menyusuri pedestrian Jl. Kapten Muslihat.',
                'Lewati Jembatan Merah dan Taman Topi kuno.',
                'Tiba di Gerbang Utama Istana Bogor & Pintu 1 Kebun Raya Bogor (Jl. Ir. H. Juanda).',
              ],
            },
            {
              title: 'Rute 3: Stasiun Bogor ➔ Kawasan Pecinan Suryakencana',
              time: '15 - 18 Menit Jalan Kaki / 5 Menit Biskita K2',
              distance: '1.4 KM',
              steps: [
                'Berjalan ke arah selatan melewati Jl. Djuanda dan Lawang Salapan.',
                'Masuki gerbang merah megah Suryakencana (Lawang Suryakencana).',
                'Surga jajanan kaki lima: Bir Kotjok, Lumpia Basah, Doclang, dan Laksa Bogor.',
              ],
            },
            {
              title: 'Rute 4: Jalur Hijau SSA (Sistem Satu Arah Ring Kebun Raya)',
              time: '45 - 60 Menit Keliling Penuh',
              distance: '4.2 KM Lingkar Penuh',
              steps: [
                'Trotoar lebar 3-4 meter beratap pepohonan rindang mengelilingi Kebun Raya.',
                'Tersedia jalur khusus sepeda dan penyewaan sepeda listrik Beam/Gowes.',
                'Melewati Tugu Kujang, Mall Botani Square, Kampus IPB Baranangsiang, dan Istana.',
              ],
            },
          ].map((route, i) => (
            <div
              key={i}
              className="bg-[#0F2A21]/90 border border-[#3F7D64]/40 rounded-3xl p-5 shadow-xl space-y-3"
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-black text-sm text-amber-300 leading-snug">
                  {route.title}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 whitespace-nowrap">
                  {route.distance}
                </span>
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-[#8FBC94]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{route.time}</span>
              </div>

              <ol className="space-y-1.5 text-xs text-white/90 list-decimal pl-4 leading-relaxed">
                {route.steps.map((st, sIdx) => (
                  <li key={sIdx}>{st}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: KRL Commuter Line Tips */}
      {activeTab === 'krl' && (
        <div className="bg-[#0F2A21]/90 border border-[#3F7D64]/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">
                KRL Commuter Line Red Line (Jakarta Kota - Bogor)
              </h3>
              <p className="text-xs text-[#8FBC94]">
                Transportasi paling hemat, cepat, dan anti macet menuju Kota Bogor dari Jabodetabek.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#173D30]/60 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-amber-300 block">⏱️ Waktu Tempuh Rata-Rata</span>
              <p className="text-white/80 leading-relaxed">
                Dari Stasiun Manggarai ke Stasiun Bogor sekitar 50-60 menit. Kereta berangkat setiap 5-10 menit.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#173D30]/60 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-amber-300 block">💳 Tiket & Kartu Akses</span>
              <p className="text-white/80 leading-relaxed">
                Gunakan Kartu Multi Trip (KMT), e-Money, Flazz, TapCash, atau scan QR GoTransit di aplikasi Gojek.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#173D30]/60 border border-white/10 space-y-1.5 text-xs">
              <span className="font-bold text-amber-300 block">🏛️ Nilai Sejarah Stasiun</span>
              <p className="text-white/80 leading-relaxed">
                Dibangun pada tahun 1881 bergaya arsitektur Indische Empire, menjadi salah satu stasiun tertua di Pulau Jawa.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
