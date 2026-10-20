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
  Camera,
  Download,
  FileCheck,
} from 'lucide-react';
import { UserProfile, AvatarOption } from '../types';
import { useLanguage } from '../utils/translations';
import { AVATAR_PRESETS } from '../data/avatars';
import { VIRTUAL_ARTIFACTS } from '../data/arArtifactsData';

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

  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

  const handleGenerateCertificate = () => {
    try {
      const canvas = document.createElement('canvas');
      const w = 1200;
      const h = 850;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark Royal Forest Background
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#071A14');
      bgGrad.addColorStop(0.5, '#0E3327');
      bgGrad.addColorStop(1, '#05140F');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Ornate Outer Gold Border
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 10;
      ctx.strokeRect(30, 30, w - 60, h - 60);

      // Inner Gold Border
      ctx.strokeStyle = '#C17817';
      ctx.lineWidth = 2;
      ctx.strokeRect(45, 45, w - 90, h - 90);

      // Header Brand
      ctx.textAlign = 'center';
      ctx.font = 'bold 24px serif';
      ctx.fillStyle = '#8FBC94';
      ctx.fillText('PEMERINTAH KOTA BOGOR • DINAS PARIWISATA & KEBUDAYAAN', w / 2, 110);

      ctx.font = 'bold 44px serif';
      ctx.fillStyle = '#F59E0B';
      ctx.fillText('SERTIFIKAT PENGHARGAAN', w / 2, 180);

      ctx.font = 'italic 20px serif';
      ctx.fillStyle = '#E5E7EB';
      ctx.fillText('Diberikan dengan kehormatan atas dedikasi pelestarian warisan budaya kepada:', w / 2, 230);

      // Recipient Name
      ctx.font = 'bold 52px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(user.username.toUpperCase(), w / 2, 320);

      // School / Institution
      ctx.font = '22px sans-serif';
      ctx.fillStyle = '#34D399';
      ctx.fillText(user.schoolOrInst, w / 2, 370);

      // Line separator
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.beginPath();
      ctx.moveTo(w / 2 - 250, 400);
      ctx.lineTo(w / 2 + 250, 400);
      ctx.stroke();

      // Achievement Stats
      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = '#F59E0B';
      ctx.fillText(`Gelar Penjelajah: LEVEL ${user.level} (${user.xp.toLocaleString()} XP)`, w / 2, 450);

      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#D1D5DB';
      ctx.fillText(
        `Menyelesaikan ${user.completedQuests.length} Quest Cagar Budaya • Mengoleksi ${user.badges.length} Lencana Pajajaran • ${user.collectedArtifacts?.length || 0} Artefak AR`,
        w / 2,
        490
      );

      // Official Stamp Seal Graphic
      const sealX = w / 2;
      const sealY = 620;
      ctx.beginPath();
      ctx.arc(sealX, sealY, 55, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(193, 120, 23, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = '#F59E0B';
      ctx.fillText('SABA BOGOR', sealX, sealY - 10);
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('OFFICIAL STAMP', sealX, sealY + 12);
      ctx.fillText('★ 2026 ★', sealX, sealY + 28);

      // Signatures
      ctx.textAlign = 'left';
      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#9CA3AF';
      ctx.fillText(`Diterbitkan pada: ${new Date().toLocaleDateString('id-ID')}`, 100, 750);
      ctx.fillText('Kota Bogor, Jawa Barat', 100, 775);

      ctx.textAlign = 'right';
      ctx.fillText('Ki Pemandu Saba Bogor', w - 100, 750);
      ctx.font = 'italic 14px sans-serif';
      ctx.fillText('Kurator Warisan Budaya Kota Bogor', w - 100, 775);

      const url = canvas.toDataURL('image/jpeg', 0.95);
      setCertificateUrl(url);
    } catch (e) {
      console.warn('Certificate generation failed', e);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0F2A21]/80 backdrop-blur-xl overflow-y-auto text-[#F7F1E3]">
      <div className="bg-[#0F2A21] border border-[#3F7D64]/50 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#F7F1E3] my-auto max-h-[92vh]">
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

          {/* Collected Virtual AR Artifacts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#34D399]" />
                <span>
                  {lang === 'en' ? 'Discovered AR Artifacts' : 'Artefak Digital AR Dikoleksi'} (
                  {user.collectedArtifacts?.length || 0}/{VIRTUAL_ARTIFACTS.length})
                </span>
              </h4>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">
                +{((user.collectedArtifacts?.length || 0) * 110).toLocaleString()} XP Total
              </span>
            </div>

            {(!user.collectedArtifacts || user.collectedArtifacts.length === 0) ? (
              <div className="p-3.5 rounded-2xl bg-[#0F2A21]/60 border border-white/10 text-center space-y-1">
                <p className="text-xs text-[#8FBC94]">
                  {lang === 'en'
                    ? 'No digital artifacts scanned yet. Launch AR Lens to discover hidden relics!'
                    : 'Belum ada artefak digital yang dikoleksi. Buka AR Lens untuk memindai relik tersembunyi!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                {user.collectedArtifacts.map((artId) => {
                  const art = VIRTUAL_ARTIFACTS.find((a) => a.id === artId);
                  if (!art) return null;
                  return (
                    <div
                      key={art.id}
                      className="bg-[#173D30]/70 p-2.5 rounded-2xl border border-amber-400/40 flex items-center space-x-2.5 text-xs shadow-md"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-white flex items-center justify-center text-xl flex-shrink-0 border border-amber-400/50">
                        {art.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] uppercase font-bold text-amber-300 block truncate">
                          {art.rarity}
                        </span>
                        <h5 className="font-bold text-[#F7F1E3] truncate text-[11px]">
                          {lang === 'en' ? art.nameEn : art.name}
                        </h5>
                        <span className="text-[10px] text-[#8FBC94] block truncate">
                          📍 {art.locationName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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

          {/* Official Explorer Certificate Generator */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#173D30] to-emerald-950/40 border border-amber-500/40 text-center space-y-2.5">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-extrabold text-sm">
              <FileCheck className="w-5 h-5 text-amber-400" />
              <span>{lang === 'en' ? 'Official Explorer Certificate' : 'Sertifikat Resmi Penjelajah Bogor'}</span>
            </div>
            <p className="text-xs text-[#8FBC94] max-w-sm mx-auto leading-relaxed">
              {lang === 'en'
                ? 'Generate and download your personalized high-resolution Certificate of Heritage Exploration with official SaBo seal (Free & Zero Tokens)!'
                : 'Cetak dan unduh Sertifikat Penghargaan Penjelajah Budaya resmi Kota Bogor beresolusi tinggi dengan stempel keemasan SaBo (Gratis & Bebas Token)!'}
            </p>
            <button
              onClick={handleGenerateCertificate}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'en' ? 'Generate Certificate (JPG)' : 'Buat & Unduh Sertifikat'}</span>
            </button>
          </div>
        </div>

        {/* Certificate Preview Popup Modal */}
        {certificateUrl && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
            <div className="w-full max-w-2xl bg-[#0F2A21] border border-amber-400 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3 text-white text-center">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-amber-300 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  <span>Sertifikat Penjelajah Budaya Berhasil Dibuat</span>
                </h4>
                <button
                  onClick={() => setCertificateUrl(null)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-xl max-h-[70vh] overflow-y-auto">
                <img src={certificateUrl} alt="Sertifikat Penjelajah" className="w-full h-auto object-contain" />
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <a
                  href={certificateUrl}
                  download={`Sertifikat_SabaBogor_${user.username.replace(/\s+/g, '_')}.jpg`}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Gambar Sertifikat</span>
                </a>

                <button
                  onClick={() => setCertificateUrl(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
