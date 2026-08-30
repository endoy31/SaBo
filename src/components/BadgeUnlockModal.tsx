import React, { useEffect } from 'react';
import { Award, Sparkles, Check, ChevronRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../utils/translations';
import { audioSynthesizer } from '../utils/audioSynthesizer';

interface BadgeUnlockModalProps {
  badgeName: string;
  onClose: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badgeName, onClose }) => {
  const { t, lang } = useLanguage();

  useEffect(() => {
    // Play celebratory harp sound
    try {
      audioSynthesizer.playQuestComplete();
    } catch {
      // Audio synth optional
    }

    // Trigger dual cannon celebratory confetti
    try {
      const end = Date.now() + 1500;
      const colors = ['#C17817', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (e) {
      console.warn('Confetti effect error:', e);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A21]/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0F2A21] border-2 border-[#C17817]/70 rounded-3xl p-6 sm:p-8 text-center text-[#F7F1E3] shadow-2xl overflow-hidden animate-scale-up">
        {/* Sunburst background glow */}
        <div className="absolute inset-0 bg-radial from-[#C17817]/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8FBC94] hover:text-[#F7F1E3] bg-white/5 hover:bg-white/10 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Badge Icon Shield */}
        <div className="relative mx-auto w-24 h-24 mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C17817] via-[#F59E0B] to-[#FDE047] animate-pulse blur-md opacity-70" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1B4D3E] to-[#0F2A21] border-2 border-[#F59E0B] flex items-center justify-center shadow-inner">
            <Award className="w-10 h-10 text-[#F59E0B] animate-bounce" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-[#FDE047] animate-spin" />
        </div>

        {/* Text Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C17817]/20 border border-[#C17817]/40 rounded-full text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('badge_unlocked_modal_title')}</span>
        </div>

        <h3 className="text-2xl font-black text-[#F7F1E3] tracking-wide mb-2">
          {badgeName}
        </h3>

        <p className="text-sm text-[#8FBC94] leading-relaxed mb-6">
          {t('badge_unlocked_modal_desc')}
        </p>

        {/* Badge Perks Card */}
        <div className="bg-[#173D30]/80 border border-[#3F7D64]/40 rounded-2xl p-4 mb-6 text-left text-xs space-y-2">
          <div className="flex items-center gap-2 text-[#F7F1E3]">
            <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
            <span>
              {lang === 'en'
                ? 'Permanent badge displayed on your profile & leaderboard'
                : 'Lencana permanen terpasang di profil & papan peringkat'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#F7F1E3]">
            <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
            <span>
              {lang === 'en'
                ? 'Bonus multiplier unlocked for future community reviews'
                : 'Peluang apresiasi lebih tinggi di komunitas penjelajah'}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 btn-gold-reward rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <span>{t('continue_exploring')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
