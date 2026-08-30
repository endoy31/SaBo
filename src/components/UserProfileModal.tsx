import React, { useState } from 'react';
import {
  User,
  Award,
  Calendar,
  X,
  Mail,
  Edit2,
  Save,
  Sparkles,
  Lock,
  Check,
  Palette,
  Shield,
} from 'lucide-react';
import { UserProfile, AvatarOption } from '../types';
import { useLanguage } from '../utils/translations';
import { AVATAR_PRESETS } from '../data/avatars';

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
  const { lang, t } = useLanguage();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isChoosingAvatar, setIsChoosingAvatar] = useState<boolean>(false);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(
    AVATAR_PRESETS.find((a) => a.avatarUrl === user.avatar)?.id || AVATAR_PRESETS[0].id
  );
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
  };

  const handleSelectAvatar = (preset: AvatarOption) => {
    if (user.level < preset.minLevel) {
      alert(
        lang === 'en'
          ? `This mascot avatar unlocks at Explorer Level ${preset.minLevel}!`
          : `Avatar maskot ini terbuka saat mencapai Level Penjelajah ${preset.minLevel}!`
      );
      return;
    }
    setSelectedAvatarId(preset.id);
    setFormData((prev) => ({ ...prev, avatar: preset.avatarUrl }));
    onUpdateProfile({ avatar: preset.avatarUrl });
    setIsChoosingAvatar(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmailInput || !loginEmailInput.includes('@')) {
      alert(
        lang === 'en'
          ? 'Please enter a valid email address!'
          : 'Masukkan alamat email yang valid!'
      );
      return;
    }
    onSimpleEmailLogin(loginEmailInput);
    setLoginEmailInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A21]/80 backdrop-blur-xl overflow-y-auto text-[#F7F1E3]">
      <div className="bg-[#0F2A21] border border-[#3F7D64]/50 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#F7F1E3] my-auto">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#1B4D3E] via-[#0F2A21] to-[#1B4D3E] border-b border-[#3F7D64]/40 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#C17817]/20 border border-[#C17817]/40 flex items-center justify-center">
              <User className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <h3 className="font-extrabold text-base text-[#F7F1E3]">
              {t('user_profile_title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-[#8FBC94] hover:text-[#F7F1E3] border border-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Avatar Picker Modal Trigger & Panel */}
          {isChoosingAvatar ? (
            <div className="bg-[#173D30]/90 p-5 rounded-3xl border border-[#C17817]/50 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm text-[#F7F1E3] flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-[#F59E0B]" />
                    <span>{t('avatar_picker_title')}</span>
                  </h4>
                  <p className="text-xs text-[#8FBC94] mt-0.5">
                    {t('avatar_picker_desc')}
                  </p>
                </div>
                <button
                  onClick={() => setIsChoosingAvatar(false)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-[#F7F1E3] hover:bg-white/20"
                >
                  {lang === 'en' ? 'Close' : 'Tutup'}
                </button>
              </div>

              {/* Grid of Avatars */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {AVATAR_PRESETS.map((preset) => {
                  const isLocked = user.level < preset.minLevel;
                  const isSelected =
                    formData.avatar === preset.avatarUrl || selectedAvatarId === preset.id;

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectAvatar(preset)}
                      className={`relative p-3 rounded-2xl border transition text-left cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#C17817]/20 border-[#F59E0B] shadow-md ring-2 ring-[#F59E0B]/50'
                          : isLocked
                          ? 'bg-black/30 border-white/5 opacity-60'
                          : 'bg-[#0F2A21]/70 border-white/10 hover:border-[#8FBC94]/50 hover:bg-[#1B4D3E]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={preset.avatarUrl}
                          alt={preset.name}
                          className="w-12 h-12 rounded-xl bg-[#0F2A21] object-cover flex-shrink-0 border border-white/20"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-xs text-[#F7F1E3] truncate">
                            {preset.name}
                          </h5>
                          <span className="text-[10px] text-[#F59E0B] block font-medium">
                            {preset.theme}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                        {isLocked ? (
                          <span className="text-rose-300 font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Level {preset.minLevel}
                          </span>
                        ) : isSelected ? (
                          <span className="text-[#34D399] font-black flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            {lang === 'en' ? 'Active Avatar' : 'Sedang Dipakai'}
                          </span>
                        ) : (
                          <span className="text-[#8FBC94]">
                            {lang === 'en' ? 'Click to select' : 'Klik untuk pakai'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* User Stats Overview Card */
            <div className="bg-[#173D30]/80 p-4 sm:p-5 rounded-3xl border border-[#3F7D64]/40 space-y-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <img
                      src={formData.avatar}
                      alt={formData.username}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-[#F59E0B] bg-[#0F2A21] shadow-xl"
                    />
                    <button
                      onClick={() => setIsChoosingAvatar(true)}
                      className="absolute -bottom-2 -right-2 p-1.5 bg-[#C17817] hover:bg-[#D48B28] text-white rounded-full border border-white/30 shadow-md cursor-pointer transition"
                      title={t('choose_avatar_btn')}
                    >
                      <Palette className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-lg text-[#F7F1E3] truncate">
                        {user.username}
                      </h4>
                      <span className="text-xs font-black text-[#F59E0B] bg-[#C17817]/20 px-2.5 py-0.5 rounded-full border border-[#C17817]/40">
                        Level {user.level}
                      </span>
                    </div>
                    <p className="text-xs text-[#8FBC94] truncate">{user.email}</p>
                    <p className="text-[11px] text-[#B8D5BC] mt-0.5">
                      {user.schoolOrInst || (lang === 'en' ? 'Student / Bogor Explorer' : 'Siswa / Penjelajah Kota Bogor')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsChoosingAvatar(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-[#F59E0B] border border-[#C17817]/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>{t('choose_avatar_btn')}</span>
                </button>
              </div>

              {/* Level Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-[#B8D5BC]">
                  <span>{t('next_level_progress')}</span>
                  <span className="text-[#F59E0B] font-bold">
                    {user.xp} / {nextLevelXp} XP ({xpPercent}%)
                  </span>
                </div>
                <div className="w-full bg-[#0F2A21] h-3 rounded-full overflow-hidden border border-[#3F7D64]/30 p-0.5">
                  <div
                    className="bg-gradient-to-r from-[#C17817] via-[#F59E0B] to-[#34D399] h-full rounded-full transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Simple Email Login Box */}
          <div className="bg-[#173D30]/60 p-4 rounded-2xl border border-[#3F7D64]/30 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#F59E0B] flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#34D399]" /> {t('simple_login_email')}
              </span>
              <span className="text-[10px] text-[#8FBC94] bg-[#0F2A21] px-2 py-0.5 rounded-full border border-white/10">
                {t('passwordless')}
              </span>
            </div>
            <p className="text-[#B8D5BC] text-[11px]">
              {t('login_email_desc')}
            </p>

            <form onSubmit={handleLoginSubmit} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={loginEmailInput}
                onChange={(e) => setLoginEmailInput(e.target.value)}
                className="flex-1 glass-input rounded-xl p-2.5 text-[#F7F1E3] text-xs focus:outline-none focus:ring-1 focus:ring-[#C17817]"
              />
              <button
                type="submit"
                className="btn-gold-reward px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                {t('login_button')}
              </button>
            </form>
          </div>

          {/* Edit Profile Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase text-[#F59E0B] tracking-wider">
                {t('profile_info_header')}
              </h4>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-[#8FBC94] hover:text-[#F7F1E3] flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? (lang === 'en' ? 'Cancel' : 'Batal Edit') : t('edit_profile_btn')}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs bg-[#173D30]/60 p-4 rounded-2xl border border-[#3F7D64]/30">
                <div>
                  <label className="block text-[#B8D5BC] mb-1 font-semibold">
                    Username:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full glass-input rounded-xl p-2.5 text-[#F7F1E3]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#B8D5BC] mb-1 font-semibold">
                      {lang === 'en' ? 'School / Institution:' : 'Sekolah / Instansi:'}
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
                      className="w-full glass-input rounded-xl p-2.5 text-[#F7F1E3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B8D5BC] mb-1 font-semibold">
                      {lang === 'en' ? 'Address in Bogor:' : 'Alamat di Bogor:'}
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full glass-input rounded-xl p-2.5 text-[#F7F1E3]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 btn-gold-reward rounded-xl text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{t('save_changes_btn')}</span>
                </button>
              </form>
            ) : (
              <div className="bg-[#173D30]/40 p-4 rounded-2xl border border-[#3F7D64]/30 text-xs space-y-2.5">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#8FBC94]">{lang === 'en' ? 'School / Community:' : 'Sekolah / Komunitas:'}</span>
                  <span className="font-semibold text-[#F7F1E3]">
                    {user.schoolOrInst || (lang === 'en' ? 'High School / Explorer' : 'Siswa SMA/SMK Bogor')}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#8FBC94]">{lang === 'en' ? 'Residential Address:' : 'Alamat Tempat Tinggal:'}</span>
                  <span className="font-semibold text-[#F7F1E3]">{user.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8FBC94]">{lang === 'en' ? 'Joined Date:' : 'Tanggal Bergabung:'}</span>
                  <span className="font-semibold text-[#F7F1E3]">{user.joinDate}</span>
                </div>
              </div>
            )}
          </div>

          {/* Unlocked Badges Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#F59E0B]" /> {t('unlocked_badges')} ({user.badges.length})
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {user.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-[#173D30]/60 p-2.5 rounded-2xl border border-[#C17817]/40 flex items-center space-x-2 text-xs shadow"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#C17817]/20 text-[#F59E0B] flex items-center justify-center font-extrabold flex-shrink-0">
                    <Award className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <span className="font-bold text-[#F7F1E3] truncate text-[11px]">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Itineraries */}
          {user.savedItineraries.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#F59E0B]" /> {t('saved_itineraries')} ({user.savedItineraries.length})
              </h4>
              <div className="space-y-2">
                {user.savedItineraries.map((it) => (
                  <div
                    key={it.id}
                    className="bg-[#173D30]/40 p-3 rounded-2xl border border-[#3F7D64]/30 text-xs flex justify-between items-center"
                  >
                    <div>
                      <h5 className="font-bold text-[#F7F1E3]">{it.title}</h5>
                      <span className="text-[10px] text-[#8FBC94]">
                        {it.items.length} {lang === 'en' ? 'Destinations' : 'Destinasi'} • {it.date}
                      </span>
                    </div>
                    <span className="text-[#34D399] font-black">
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
