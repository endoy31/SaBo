import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  Send,
  ThumbsUp,
  User,
  Sparkles,
  MapPin,
  Filter,
} from 'lucide-react';
import { CommunityReview, UserProfile } from '../types';
import { HERITAGE_LOCATIONS } from '../data/bogorData';

interface ModuleCommunityReviewsProps {
  user: UserProfile;
  reviews: CommunityReview[];
  onAddReview: (review: CommunityReview) => void;
  onLikeReview: (reviewId: string) => void;
}

export const ModuleCommunityReviews: React.FC<ModuleCommunityReviewsProps> = ({
  user,
  reviews,
  onAddReview,
  onLikeReview,
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(
    HERITAGE_LOCATIONS[0].id
  );
  const [rating, setRating] = useState<number>(5);
  const [commentText, setCommentText] = useState<string>('');
  const [filterPlaceId, setFilterPlaceId] = useState<string>('all');

  const filteredReviews = reviews.filter(
    (r) => filterPlaceId === 'all' || r.placeId === filterPlaceId
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert('Tulis ulasan kunjungan kamu terlebih dahulu!');
      return;
    }

    const matchedLoc = HERITAGE_LOCATIONS.find((l) => l.id === selectedPlaceId);

    const newRev: CommunityReview = {
      id: `rev_${Date.now()}`,
      placeId: selectedPlaceId,
      placeName: matchedLoc?.name || 'Destinasi Bogor',
      userEmail: user.email,
      userName: user.username,
      userAvatar: user.avatar,
      rating,
      comment: commentText,
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      likes: 0,
    };

    onAddReview(newRev);
    setCommentText('');
    alert('Ulasan kamu berhasil dikirim!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-slate-100">
      {/* Banner */}
      <div className="bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-500/15 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Ulasan Komunitas & Forum Pengalaman</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-300">
            Ulasan Komunitas Wisata Bogor
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Bagikan cerita seru, tips kuliner, foto kenangan, dan ulasan jujur kamu tentang situs heritage dan destinasi wisata Kota Bogor kepada sesama penjelajah.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Post New Review Form */}
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4 h-fit">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h3 className="font-extrabold text-base text-white">
              Tulis Ulasan Wisata Kamu
            </h3>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Pilih Lokasi Wisata / Culinary:
              </label>
              <select
                value={selectedPlaceId}
                onChange={(e) => setSelectedPlaceId(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-2.5 text-white font-bold focus:outline-none focus:border-sky-400 backdrop-blur-md"
              >
                {HERITAGE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-slate-900 text-white">
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Bintang Rating Kamu:
              </label>
              <div className="flex space-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none transition hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Cerita / Ulasan Pengalaman:
              </label>
              <textarea
                rows={4}
                required
                placeholder="Bagikan kesan, rekomendasi waktu kunjungan, atau tips kuliner khas yang kamu temukan..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-3 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 backdrop-blur-md"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 text-xs border border-sky-400/30"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Ulasan Komunitas</span>
            </button>
          </form>
        </div>

        {/* Right Column: Reviews Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Reviews Header */}
          <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-2xl p-3.5 rounded-2xl border border-white/10 text-xs shadow-xl">
            <div className="flex items-center space-x-2 text-slate-300 font-semibold">
              <Filter className="w-4 h-4 text-sky-400" />
              <span>Filter Ulasan Tempat:</span>
            </div>

            <select
              value={filterPlaceId}
              onChange={(e) => setFilterPlaceId(e.target.value)}
              className="bg-slate-900/60 border border-white/10 rounded-xl px-3 py-1.5 text-white font-bold focus:outline-none focus:border-sky-400 backdrop-blur-md"
            >
              <option value="all" className="bg-slate-900 text-white">Semua Tempat ({reviews.length})</option>
              {HERITAGE_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-white">
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-3">
            {filteredReviews.length === 0 ? (
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center text-slate-400 text-xs">
                Belum ada ulasan untuk tempat ini. Jadilah yang pertama memberikan ulasan!
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-sky-400/40 rounded-3xl p-4 shadow-xl space-y-3 transition"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/15 object-cover shadow"
                      />
                      <div>
                        <h4 className="font-extrabold text-xs text-white">
                          {rev.userName}
                        </h4>
                        <span className="text-[10px] text-sky-300 font-bold block">
                          📍 {rev.placeName}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex text-amber-400 space-x-0.5 justify-end">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {rev.timestamp}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    "{rev.comment}"
                  </p>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <button
                      onClick={() => onLikeReview(rev.id)}
                      className="flex items-center space-x-1.5 text-slate-300 hover:text-sky-300 font-semibold bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/10 transition backdrop-blur-md"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-sky-400" />
                      <span>Suka ({rev.likes})</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
