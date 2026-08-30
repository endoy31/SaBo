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
import { useLanguage } from '../utils/translations';

export const ModuleHeritageCenter: React.FC = () => {
  const { lang, t, getLocalizedFigure } = useLanguage();
  const [activeSection, setActiveSection] = useState<'essay' | 'videos' | 'figures'>('essay');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo>(YOUTUBE_VIDEOS[0]);
  const [playingFigureId, setPlayingFigureId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const localizedFigures = HISTORICAL_FIGURES.map((f) => getLocalizedFigure(f));

  const filteredFigures = localizedFigures.filter(
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
        () => setPlayingFigureId(null),
        lang === 'en' ? 'en-US' : 'id-ID'
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
            {t('heritage_archive_title')}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('heritage_archive_subtitle')}
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
              <span>{t('tab_history_essay')}</span>
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
              <span>{t('tab_video_archive')}</span>
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
              <span>{t('tab_historical_figures')} ({HISTORICAL_FIGURES.length})</span>
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
                  {lang === 'en' ? 'Official Reference • Bogor City Archives' : BOGOR_HISTORY_ESSAY.source}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2">
                  {lang === 'en'
                    ? 'Comprehensive History and Cultural Development of Bogor City'
                    : BOGOR_HISTORY_ESSAY.title}
                </h3>
              </div>

              <a
                href="https://artsandculture.google.com/search?q=Bogor"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 rounded-2xl border border-blue-400/30 font-semibold text-xs transition backdrop-blur-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'en' ? 'Google Arts & Culture Archive' : 'Koleksi Google Arts & Culture'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Essay Content Render */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 font-normal">
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-slate-300 space-y-3">
                {lang === 'en' ? (
                  <>
                    <p className="font-medium text-white">
                      Bogor City serves as the natural gateway to West Java, nestled beneath the majestic Mount Salak and Mount Gede Pangrango. Over the centuries, it has played a vital role in the civilizational, scientific, and geopolitical tapestry of the Indonesian archipelago.
                    </p>

                    <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                      1. Pre-Historic Era & Ancient Maritime Trade
                    </h4>
                    <p>
                      Early human settlements flourished along the fertile banks of the Cisadane and Ciliwung rivers. Ancient megalithic megaliths such as "Purwakali" and "Kidang Pinanjung", along with ancient coinage discovered in Pasir Angin Cibungbulang, demonstrate active prehistoric trade connections spanning Korea, Japan, India, and China across the Indian Ocean.
                    </p>

                    <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                      2. Era of Tarumanagara & Pakuan Pajajaran
                    </h4>
                    <p>
                      In the 5th century CE, the great King Purnawarman ruled Tarumanagara, commemorating his feats upon the Ciaruteun and Kebon Kopi stone inscriptions. In 1482 CE, Sri Baduga Maharaja (Prabu Siliwangi) coronated Pakuan Pajajaran as the capital of the Sunda Kingdom. He constructed stone moats, Mahawijaya reservoir, and the sacred botanical sanctuary "Samida" — the direct botanical precursor to Bogor Botanical Gardens.
                    </p>

                    <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                      3. Revival as "Buitenzorg" in Colonial Era
                    </h4>
                    <p>
                      In 1744, Governor-General G.W. Baron van Imhoff was captivated by the cool, invigorating climate and founded the retreat estate "Buitenzorg" (meaning "Without Worries"). On May 18, 1817, botanist Prof. C.G.C. Reinwardt inaugurated the world-renowned 's Lands Plantentuin (Bogor Botanical Gardens).
                    </p>

                    <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                      4. Multicultural Harmony & Ethnic Fusion
                    </h4>
                    <p>
                      Modern Bogor thrives on peaceful coexistence among ethnic Sundanese, Javanese, Chinese, Arab, and Indo-European communities, celebrated in bustling heritage streets like Suryakencana and festive Cap Go Meh cultural carnivals.
                    </p>

                    <h4 className="font-extrabold text-sky-300 text-sm mt-3">
                      5. City Emblem & Tugu Kujang Monument
                    </h4>
                    <p>
                      Erected on May 4, 1982, the Tugu Kujang monument stands 25 meters tall facing Mount Salak, crowned with a 7-curved golden Kujang blade honoring Sundanese bravery, wisdom, and sovereign spirit.
                    </p>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: BOGOR TEMPO DULU YOUTUBE VIDEOS */}
      {activeSection === 'videos' && (
        <div className="space-y-6">
          {/* Channel Spotlight Header Banner */}
          <div className="bg-gradient-to-r from-rose-950/60 via-slate-900/60 to-slate-900/60 backdrop-blur-2xl border border-rose-500/20 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-600 flex items-center justify-center shadow-xl shadow-rose-950/50 border border-rose-400/40 flex-shrink-0">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold text-rose-300 uppercase tracking-wider bg-rose-500/20 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                      YouTube Official Archive
                    </span>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-400/30">
                      1000+ Video
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-white mt-1">
                    Dinas Kearsipan & Perpustakaan Kota Bogor (@bogortempodulu)
                  </h3>
                  <p className="text-xs text-slate-300">
                    {lang === 'en'
                      ? 'Official channel documenting centuries of Bogor history, royal eras, colonial archives, and vintage community life.'
                      : 'Koleksi resmi ribuan video dokumenter sejarah Kota Bogor, era kerajaan, rekaman kolonial, dan denyut kehidupan tempo dulu.'}
                  </p>
                </div>
              </div>

              <a
                href="https://www.youtube.com/@bogortempodulu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold rounded-2xl text-xs transition shadow-xl shadow-rose-950/40 border border-rose-400/40 flex-shrink-0 cursor-pointer"
              >
                <Youtube className="w-4 h-4" />
                <span>{lang === 'en' ? 'Explore Channel @bogortempodulu' : 'Kunjungi Channel YouTube @bogortempodulu'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
            {/* Embedded Active Video Player */}
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 space-y-4">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-1">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider bg-rose-500/20 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                      {selectedVideo.category}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      Dinas Kearsipan Kota Bogor
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-white">
                    {selectedVideo.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>

                <a
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-bold rounded-xl text-xs transition border border-rose-500/30 flex-shrink-0 cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-rose-400" />
                  <span>{lang === 'en' ? 'Watch on YouTube' : 'Buka di YouTube'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Video List Selector / Grid Preview */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-white flex items-center space-x-2">
                  <Film className="w-4 h-4 text-sky-400" />
                  <span>
                    {lang === 'en'
                      ? 'Featured Video Previews with Thumbnails'
                      : 'Pilihan Video Rekomendasi & Preview Thumbnail'}
                  </span>
                </h4>
                <span className="text-xs text-slate-400">
                  {YOUTUBE_VIDEOS.length} {lang === 'en' ? 'videos' : 'video'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {YOUTUBE_VIDEOS.map((vid) => {
                  const isSelected = vid.id === selectedVideo.id;
                  return (
                    <div
                      key={vid.id}
                      onClick={() => setSelectedVideo(vid)}
                      className={`group p-3 rounded-2xl transition cursor-pointer border flex flex-col justify-between space-y-3 relative overflow-hidden ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500/80 shadow-xl shadow-rose-950/40 ring-1 ring-rose-500/40'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-rose-500/30'
                      }`}
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                        <img
                          src={vid.thumbnail}
                          alt={vid.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          onError={(e) => {
                            // Fallback to high quality or standard thumbnail
                            const target = e.target as HTMLImageElement;
                            if (target.src.includes('hqdefault')) {
                              target.src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition transform group-hover:scale-110 ${
                            isSelected ? 'bg-rose-600 text-white shadow-rose-600/50' : 'bg-black/70 text-white hover:bg-rose-600'
                          }`}>
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow border border-rose-400/40">
                            {lang === 'en' ? 'Now Playing' : 'Sedang Diputar'}
                          </div>
                        )}

                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10">
                          HD
                        </div>
                      </div>

                      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider bg-rose-500/15 px-2 py-0.5 rounded-md border border-rose-400/20">
                            {vid.category}
                          </span>
                          <h5 className="font-extrabold text-xs sm:text-sm text-white line-clamp-2 mt-1.5 group-hover:text-rose-300 transition">
                            {vid.title}
                          </h5>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                            {vid.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-slate-400 font-medium">
                            {isSelected ? (lang === 'en' ? 'Active' : 'Aktif') : (lang === 'en' ? 'Click to play' : 'Klik untuk putar')}
                          </span>
                          <a
                            href={vid.youtubeUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center space-x-1 text-rose-400 hover:text-rose-300 font-bold text-[11px]"
                          >
                            <span>YouTube</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explore Thousands More Banner */}
            <div className="bg-gradient-to-r from-sky-950/40 to-slate-900/60 p-5 rounded-2xl border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h5 className="font-extrabold text-sm text-white">
                  {lang === 'en'
                    ? 'Want to explore thousands more historical archives?'
                    : 'Ingin menjelajahi ribuan arsip dan rekaman sejarah lainnya?'}
                </h5>
                <p className="text-xs text-slate-300">
                  {lang === 'en'
                    ? 'Visit the official channel @bogortempodulu for continuous documentaries on old Bogor markets, trains, palaces, and cultural heritage.'
                    : 'Kunjungi channel resmi @bogortempodulu untuk dokumentasi lengkap pasar tua, stasiun kereta api, istana, dan cagar budaya Kota Bogor.'}
                </p>
              </div>

              <a
                href="https://www.youtube.com/@bogortempodulu/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs transition shadow-lg border border-sky-400/30 flex-shrink-0 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Open Video Catalog (1000+)' : 'Buka Ribuan Video Arsip'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
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
              placeholder={lang === 'en' ? 'Search heroes (Siliwangi, Raden Saleh, Djuanda...)' : 'Cari tokoh pahlawan (Siliwangi, Raden Saleh, Djuanda...)'}
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
                        {lang === 'en' ? 'Historical Figure' : 'Tokoh Bersejarah'}
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
                      🎯 {lang === 'en' ? 'Key Historical Facts:' : 'Fakta Penting Tokoh:'}
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
                        {isSpeakingThis
                          ? t('audio_stop')
                          : t('audio_listen_bio')}
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
