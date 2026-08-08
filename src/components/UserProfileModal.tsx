import React, { useState } from 'react';
import {
  User,
  Award,
  BookOpen,
  Calendar,
  X,
  Mail,
  MapPin,
  Building,
  CheckCircle2,
  LogOut,
  Edit2,
  Save,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSimpleEmailLogin: (email: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  onClose,
  onUpdateProfile,
  onSimpleEmailLogin,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loginEmailInput, setLoginEmailInput] = useState<string>('');
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    address: user.address,
    schoolOrInst: user.schoolOrInst,
    avatar: user.avatar,
  });

  const nextLevelXp = user.level * 250;
  const xpPercent = Math.min(100, Math.round((user.xp / nextLevelXp) * 100));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmailInput || !loginEmailInput.includes('@')) {
      alert('Masukkan alamat email yang valid!');
      return;
    }
    onSimpleEmailLogin(loginEmailInput);
    setLoginEmailInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051710]/85 backdrop-blur-xl overflow-y-auto text-[#f7f4eb]">
      <div className="bg-[#071c14]/90 backdrop-blur-2xl border border-amber-800/40 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col text-amber-100 my-auto">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800/30 via-amber-900/30 to-amber-800/30 border-b border-amber-900/20 flex justify-between items-center backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-amber-300" />
            <h3 className="font-extrabold text-base text-amber-100">
              Profil Pengguna SaBo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-amber-950/40 hover:bg-amber-900/40 rounded-full text-amber-200 border border-amber-800/30 transition backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Simple Email Login Box */}
          <div className="bg-amber-950/20 backdrop-blur-md p-4 rounded-2xl border border-amber-800/30 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <Mail className="w-4 h-4 text-emerald-400" /> Masuk Sederhana dengan Email
              </span>
              <span className="text-[10px] text-amber-200/60">Tanpa Kata Sandi</span>
            </div>
            <p className="text-amber-100/80 text-[11px]">
              Gunakan email kamu untuk menyimpan atau memuat progress XP, level, dan badge.
            </p>

            <form onSubmit={handleLoginSubmit} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={loginEmailInput}
                onChange={(e) => setLoginEmailInput(e.target.value)}
                className="flex-1 bg-slate-900/60 border border-white/10 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-sky-400 backdrop-blur-md"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs transition border border-sky-400/30 shadow-lg"
              >
                Masuk / Load
              </button>
            </form>
          </div>

          {/* User Stats Overview Card */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={formData.avatar}
                alt={formData.username}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-400/60 bg-slate-800 shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-base text-white truncate">
                    {user.username}
                  </h4>
                  <span className="text-xs font-bold text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-400/30 backdrop-blur-md">
                    Level {user.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {user.schoolOrInst || 'Siswa / Penjelajah Kota Bogor'} • {user.address}
                </p>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Progress XP Level Berikutnya</span>
                <span className="text-sky-300 font-bold">
                  {user.xp} / {nextLevelXp} XP
                </span>
              </div>
              <div className="w-full bg-slate-900/60 h-2.5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Edit Profile Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase text-sky-300 tracking-wider">
                Informasi & Profil Diri
              </h4>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-sky-300 hover:underline flex items-center gap-1 font-semibold"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Batal Edit' : 'Edit Profil'}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    Username:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-2.5 text-white backdrop-blur-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      Sekolah / Instansi:
                    </label>
                    <input
                      type="text"
                      value={formData.schoolOrInst}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          schoolOrInst: e.target.value,
                        })
                      }
                      className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-2.5 text-white backdrop-blur-md"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      Alamat di Bogor:
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-2.5 text-white backdrop-blur-md"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-2xl transition flex items-center justify-center space-x-1 shadow-lg border border-sky-400/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </form>
            ) : (
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 text-xs space-y-2 backdrop-blur-md">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Sekolah / Komunitas:</span>
                  <span className="font-semibold text-white">
                    {user.schoolOrInst || 'Siswa SMA/SMK Bogor'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Alamat Tempat Tinggal:</span>
                  <span className="font-semibold text-white">{user.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tanggal Bergabung:</span>
                  <span className="font-semibold text-white">{user.joinDate}</span>
                </div>
              </div>
            )}
          </div>

          {/* Unlocked Badges Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-sky-300 tracking-wider flex items-center gap-1">
              <Award className="w-4 h-4 text-sky-400" /> Lencana Achievement Terbuka ({user.badges.length})
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {user.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-sky-400/30 flex items-center space-x-2 text-xs shadow"
                >
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-extrabold flex-shrink-0">
                    🏆
                  </div>
                  <span className="font-extrabold text-sky-200 truncate text-[11px]">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Itineraries */}
          {user.savedItineraries.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-sky-300 tracking-wider flex items-center gap-1">
                <Calendar className="w-4 h-4 text-sky-400" /> Saved Itineraries ({user.savedItineraries.length})
              </h4>
              <div className="space-y-2">
                {user.savedItineraries.map((it) => (
                  <div
                    key={it.id}
                    className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs flex justify-between items-center"
                  >
                    <div>
                      <h5 className="font-extrabold text-white">{it.title}</h5>
                      <span className="text-[10px] text-slate-400">
                        {it.items.length} Destinasi • {it.date}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-extrabold">
                      Rp {it.totalCost.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
