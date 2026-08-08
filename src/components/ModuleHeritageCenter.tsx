import React, { useState } from 'react';
import {
  BookOpen,
  Youtube,
  Volume2,
  VolumeX,
  ExternalLink,
  History,
  Users,
  Search,
  Sparkles,
  Bookmark,
  Play,
  Film,
} from 'lucide-react';
import {
  BOGOR_HISTORY_ESSAY,
  HISTORICAL_FIGURES,
  YOUTUBE_VIDEOS,
  HERITAGE_LOCATIONS,
} from '../data/bogorData';
import { HistoricalFigure, YouTubeVideo } from '../types';
import { audioSynthesizer } from '../utils/audioSynthesizer';

export const ModuleHeritageCenter: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'essay' | 'videos' | 'figures'>('essay');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo>(YOUTUBE_VIDEOS[0]);
  const [playingFigureId, setPlayingFigureId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFigures = HISTORICAL_FIGURES.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.profile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFigureAudio = (figure: HistoricalFigure) => {
    if (playingFigureId === figure.id) {
      audioSynthesizer.stop();
      setPlayingFigureId(null);
    } else {
      const textToRead = `${figure.name}. ${figure.title}. ${figure.profile}`;
      audioSynthesizer.speak(
        textToRead,
        () => setPlayingFigureId(null),
        () => setPlayingFigureId(null)
      );
      setPlayingFigureId(figure.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100">
      {/* Banner */}
      <div className="bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-500/15 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Deep Heritage Learning Center • Google Arts & Culture</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-300">
            Arsip & Narasi Sejarah Kota Bogor
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eksplorasi dokumen sejarah autentik, koleksi video dokumenter Dinas Arsip Kota Bogor (<span className="text-sky-300 font-bold">@bogortempodulu</span>), dan profil para tokoh pahlawan bangsa yang membentuk identitas Kota Hujan.
          </p>

          {/* Section Selector Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-bold">
            <button
              onClick={() => setActiveSection('essay')}
              className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeSection === 'essay'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <History className="w-4 h-4 text-sky-400" />
              <span>Sejarah Lengkap Bogor</span>
            </button>

            <button
              onClick={() => setActiveSection('videos')}
              className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeSection === 'videos'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <Youtube className="w-4 h-4 text-rose-400" />
              <span>Video Arsip Bogor Tempo Dulu</span>
            </button>

            <button
              onClick={() => setActiveSection('figures')}
              className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 backdrop-blur-md ${
                activeSection === 'figures'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Tokoh Bersejarah ({HISTORICAL_FIGURES.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: ESSAY SEJARAH LENGKAP */}
      {activeSection === 'essay' && (
        <div className="space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 flex-wrap gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-sky-300 bg-sky-500/15 px-2.5 py-1 rounded-full border border-sky-400/30">
                  {BOGOR_HISTORY_ESSAY.source}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2">
                  {BOGOR_HISTORY_ESSAY.title}
                </h3>
              </div>

              <a
                href="https://artsandculture.google.com/search?q=Bogor"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 rounded-2xl border border-blue-400/30 font-semibold text-xs transition backdrop-blur-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Koleksi Google Arts & Culture</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Essay Content Render */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 font-normal">
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-slate-300 space-y-3">
                <p className="font-medium text-white">
                  Kota Bogor secara geografis adalah pintu gerbang Jawa Barat yang berdampingan dengan Ibu Kota Negara, serta memiliki peran amat dinamis dalam perjalanan sejarah Indonesia.
                </p>

                <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                  1. Masa Pra-Sejarah & Komunitas Nusantara Kuno
                </h4>
                <p>
                  Kehidupan masyarakat pra-sejarah di wilayah Bogor bermula dari pemukiman di sepanjang aliran sungai besar seperti Cisadane dan Ciliwung. Peninggalan arca kuno seperti "Purwakali" dan "Kidang Pinanjung" serta artefak keping mata uang kuno di Pasir Angin Cibungbulang menjadi bukti adanya interaksi perdagangan kuno lintas Samudra Hindia dan Laut Jawa dengan para pendatang dari Korea, Jepang, India, hingga etnis Cina.
                </p>

                <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                  2. Era Kerajaan Tarumanagara & Pakuan Pajajaran
                </h4>
                <p>
                  Abad ke-5 Masehi menjadi saksi kejayaan Kerajaan Tarumanagara di bawah pimpinan Raja Purnawarman, sebagaimana dipahat pada Prasasti Ciaruteun. Selanjutnya pada abad ke-15 (1474-1513 M), Sri Baduga Maharaja (Prabu Siliwangi) mendirikan ibu kota Kerajaan Sunda di Pakuan Pajajaran (Bogor). Beliau membangun benteng pertahanan, telaga Mahawijaya, serta hutan buatan "Samida" yang menjadi cikal bakal Kebun Raya Bogor untuk menjaga kelestarian benih flora langka.
                </p>

                <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                  3. Kebangkitan "Buitenzorg" Era Kolonial
                </h4>
                <p>
                  Setelah masa surut paska 1578, kawasan ini bangkit kembali pada pertengahan abad ke-18. Gubernur Jenderal G.W. Baron van Imhoff terpesona oleh keindahan alam Bogor dan membangun peristirahatan pada tahun 1744 yang diberi nama "Buitenzorg" (Bebas dari Masalah/Tanpa Kesibukan). Pada 18 Mei 1817, Prof. C.G.C. Reinwardt meresmikan Kebun Botani "S Lands Plantentuin" (Kebun Raya Bogor).
                </p>

                <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                  4. Akulturasi Etnis & Keberagaman Budaya
                </h4>
                <p>
                  Masyarakat Kota Bogor bertumbuh menjadi heterogen namun tetap mengakar pada kebudayaan Sunda. Berbagai etnis hidup harmonis: Etnis Sunda sebagai penduduk asli pemeluk tradisi, Etnis Melayu/Jakarta, Etnis Jawa keturunan prajurit Mataram (seperti daerah Jabaru / Jawa Baru di Ciomas), Etnis India, Etnis Belanda (seperti komunitas Depok Ch. Chastelein), dan Etnis Tionghoa yang membangun pusat niaga Suryakencana.
                </p>

                <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                  5. Lambang Kota & Tugu Kujang
                </h4>
                <p>
                  Monumen Tugu Kujang didirikan pada 4 Mei 1982 untuk menghormati ibu kota Pakuan Pajajaran. Senjata Kujang merupakan pusaka rakyat Sunda berlekuk 7 yang melambangkan keberanian, ketajaman akal budi, serta kedaulatan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: BOGOR TEMPO DULU YOUTUBE VIDEOS */}
      {activeSection === 'videos' && (
        <div className="space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 flex-wrap gap-2">
              <div className="flex items-center space-x-3">
                <Youtube className="w-6 h-6 text-rose-500" />
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Pusat Arsip Video Bogor Tempo Dulu
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sumber Resmi: YouTube Channel Dinas Arsip Kota Bogor (@bogortempodulu)
                  </p>
                </div>
              </div>

              <a
                href="https://www.youtube/@bogortempodulu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-600/80 hover:bg-rose-600 text-white font-extrabold rounded-2xl text-xs transition shadow-lg border border-rose-500/40"
              >
                <Youtube className="w-4 h-4" />
                <span>Kunjungi Channel YouTube @bogortempodulu</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Active Video Player */}
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 space-y-3">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex justify-between items-start gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                    {selectedVideo.category}
                  </span>
                  <h4 className="font-extrabold text-base text-white mt-1.5">
                    {selectedVideo.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {selectedVideo.description}
                  </p>
                </div>

                <a
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl text-xs font-semibold whitespace-nowrap border border-white/10 flex items-center space-x-1 transition backdrop-blur-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka di YouTube</span>
                </a>
              </div>
            </div>

            {/* Video List Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {YOUTUBE_VIDEOS.map((vid) => {
                const isSelected = selectedVideo.id === vid.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className={`bg-slate-900/40 backdrop-blur-xl p-3 rounded-2xl border cursor-pointer transition flex flex-col gap-2 ${
                      isSelected
                        ? 'border-sky-400 ring-1 ring-sky-400 bg-sky-500/10 shadow-lg shadow-sky-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>
                    </div>

                    <h5 className="font-bold text-xs text-white line-clamp-2">
                      {vid.title}
                    </h5>
                    <span className="text-[10px] text-slate-400">
                      {vid.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TOKOH BERSEJARAH */}
      {activeSection === 'figures' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari tokoh pahlawan (Siliwangi, Raden Saleh, Djuanda...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredFigures.map((fig) => {
              const isSpeakingThis = playingFigureId === fig.id;

              return (
                <div
                  key={fig.id}
                  className="bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-sky-400/40 rounded-3xl p-5 shadow-xl transition flex flex-col justify-between space-y-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={fig.image}
                      alt={fig.name}
                      className="w-20 h-24 rounded-2xl object-cover border border-white/15 bg-slate-800 flex-shrink-0 shadow"
                    />

                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                        Tokoh Bersejarah
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-white">
                        {fig.name}
                      </h3>
                      <p className="text-xs text-amber-300 font-semibold leading-tight">
                        {fig.title}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {fig.profile}
                  </p>

                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1 text-xs backdrop-blur-md">
                    <span className="font-bold text-sky-300 block">
                      🎯 Fakta Penting Tokoh:
                    </span>
                    {fig.uniqueFacts.map((fact, idx) => (
                      <p key={idx} className="text-slate-300 text-[11px]">
                        • {fact}
                      </p>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => toggleFigureAudio(fig)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center space-x-1.5 border shadow ${
                        isSpeakingThis
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-sky-400 animate-pulse'
                          : 'bg-white/10 text-sky-300 border-white/10 hover:bg-white/15'
                      }`}
                    >
                      {isSpeakingThis ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                      <span>
                        {isSpeakingThis ? 'Hentikan Audio' : 'Dengarkan Biografi'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
