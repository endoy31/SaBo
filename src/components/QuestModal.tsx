import React, { useState } from 'react';
import {
  Award,
  Volume2,
  VolumeX,
  ExternalLink,
  CheckCircle,
  XCircle,
  ChevronRight,
  RotateCcw,
  X,
  Share2,
  Navigation,
  BookOpen,
} from 'lucide-react';
import { HeritageLocation, UserProfile } from '../types';
import { audioSynthesizer } from '../utils/audioSynthesizer';
import { useLanguage } from '../utils/translations';

interface QuestModalProps {
  location: HeritageLocation;
  onClose: () => void;
  onCompleteQuest: (locationId: string, xpEarned: number, badgeName?: string) => void;
  user: UserProfile;
}

export const QuestModal: React.FC<QuestModalProps> = ({
  location: initialLocation,
  onClose,
  onCompleteQuest,
  user,
}) => {
  const { lang, t, getLocalizedHeritage } = useLanguage();
  const location = getLocalizedHeritage(initialLocation);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const triviaQuestions = location.trivia || [];
  const currentQ = triviaQuestions[currentQuestionIdx];

  const toggleAudioNarration = () => {
    if (isPlayingAudio) {
      audioSynthesizer.stop();
      setIsPlayingAudio(false);
    } else {
      audioSynthesizer.speak(
        location.audioNarration,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false),
        lang === 'en' ? 'en-US' : 'id-ID'
      );
      setIsPlayingAudio(true);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < triviaQuestions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);

      // Determine badge reward if score >= 3
      let badgeReward: string | undefined = undefined;
      if (location.category === 'botani' || location.category === 'Botany') badgeReward = lang === 'en' ? 'Botanical Master' : 'Botani Master';
      else if (location.category === 'sejarah' || location.category === 'History') badgeReward = lang === 'en' ? 'Pajajaran Explorer' : 'Penjelajah Pajajaran';
      else if (location.category === 'kuliner' || location.category === 'Culinary') badgeReward = lang === 'en' ? 'Legendary Foodie' : 'Foodie Legendaris';

      onCompleteQuest(location.id, location.xpReward, badgeReward);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  const handleShare = () => {
    const text = lang === 'en'
      ? `I just completed the "${location.name}" History Trivia Quest on Saba Bogor with a score of ${score}/${triviaQuestions.length}! 🎉 Explore Bogor's heritage!`
      : `Saya baru saja menyelesaikan Quest Trivia Sejarah "${location.name}" di SaBo (Saba Bogor) dengan skor ${score}/${triviaQuestions.length}! 🎉 Yuk belajar sejarah Bogor!`;

    if (navigator.share) {
      navigator.share({ title: 'SaBo Quest Clear', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(lang === 'en' ? 'Quest results copied to clipboard!' : 'Teks hasil quest berhasil disalin ke papan klip!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051710]/85 backdrop-blur-xl overflow-y-auto text-[#f7f4eb]">
      <div className="bg-[#071c14]/90 backdrop-blur-2xl border border-amber-800/40 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto text-amber-100">
        {/* Modal Header */}
        <div className="relative h-48 sm:h-56 w-full">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071c14] via-[#071c14]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => {
              audioSynthesizer.stop();
              onClose();
            }}
            className="absolute top-3.5 right-3.5 p-2 bg-[#051710]/80 hover:bg-white/15 text-amber-100 rounded-full border border-amber-800/40 transition backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Location Info Banner */}
          <div className="absolute bottom-3.5 left-4 right-4">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-gradient-to-r from-emerald-700 to-amber-700 text-amber-100 rounded-full border border-amber-600/30 backdrop-blur-md">
                {location.category}
              </span>
              <span className="text-xs text-amber-300 font-bold bg-amber-900/40 px-2.5 py-0.5 rounded-full border border-amber-600/30 backdrop-blur-md">
                +{location.xpReward} XP Reward
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-amber-100 leading-tight">
              {location.name}
            </h2>
            <p className="text-xs text-amber-200/70 truncate">{location.address}</p>
          </div>
        </div>

        {/* Audio Guide & Deep Link Bar */}
        <div className="p-3 bg-white/5 backdrop-blur-md border-y border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
          <button
            onClick={toggleAudioNarration}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-semibold transition border ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-sky-400 animate-pulse'
                : 'bg-white/10 text-sky-300 border-white/10 hover:bg-white/15'
            }`}
          >
            {isPlayingAudio ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            <span>
              {isPlayingAudio ? t('audio_stop') : `🎧 ${t('audio_guide')}`}
            </span>
          </button>

          <div className="flex items-center space-x-2">
            {location.artsCultureUrl && (
              <a
                href={location.artsCultureUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500/15 text-blue-300 border border-blue-400/30 hover:bg-blue-500/25 rounded-xl font-medium transition backdrop-blur-md"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Google Arts & Culture</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}

            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/25 rounded-xl font-medium transition backdrop-blur-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t('route_google_maps')}</span>
            </a>
          </div>
        </div>

        {/* Modal Body / Quiz Content */}
        <div className="p-4 sm:p-6 flex-1">
          {!isQuizFinished && currentQ ? (
            <div>
              {/* Question progress */}
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                <span>
                  {t('question')} {currentQuestionIdx + 1} {t('of')} {triviaQuestions.length}
                </span>
                <span className="text-sky-300 font-bold">{t('current_score')}: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800/60 h-1.5 rounded-full mb-4 overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIdx + 1) / triviaQuestions.length) * 100
                    }%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-sm sm:text-base font-bold text-white mb-4 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {currentQ.options.map((optionText, idx) => {
                  let btnStyle =
                    'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10';

                  if (isAnswered) {
                    if (idx === currentQ.correctAnswer) {
                      btnStyle =
                        'bg-emerald-600/90 text-white border-emerald-400 font-bold shadow-lg shadow-emerald-500/20';
                    } else if (idx === selectedOption) {
                      btnStyle =
                        'bg-rose-600/90 text-white border-rose-400 font-bold shadow-lg shadow-rose-500/20';
                    } else {
                      btnStyle = 'bg-white/5 text-slate-500 border-white/5';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition flex items-center justify-between backdrop-blur-md ${btnStyle}`}
                    >
                      <span className="flex-1">{optionText}</span>
                      {isAnswered && idx === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-white ml-2 flex-shrink-0" />
                      )}
                      {isAnswered &&
                        idx === selectedOption &&
                        idx !== currentQ.correctAnswer && (
                          <XCircle className="w-5 h-5 text-white ml-2 flex-shrink-0" />
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswered && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-4 text-xs backdrop-blur-md">
                  <span className="font-bold text-sky-300 block mb-1">
                    💡 {t('history_explanation')}:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 text-sm border border-sky-400/30"
                >
                  <span>
                    {currentQuestionIdx + 1 < triviaQuestions.length
                      ? t('next_question')
                      : t('view_results')}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            /* Quiz Completion Screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-sky-500/20 text-sky-300 rounded-2xl border border-sky-400/30 flex items-center justify-center mx-auto text-3xl backdrop-blur-md">
                🏆
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">
                  {t('quest_cleared')}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {t('completed_trivia_for')}{' '}
                  <span className="text-sky-300 font-bold">
                    {location.name}
                  </span>
                </p>
              </div>

              {/* Score card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-around text-center backdrop-blur-md">
                <div>
                  <span className="text-xs text-slate-400">{t('final_score')}</span>
                  <p className="text-2xl font-extrabold text-sky-300">
                    {score} / {triviaQuestions.length}
                  </p>
                </div>

                <div className="w-px h-10 bg-white/10" />

                <div>
                  <span className="text-xs text-slate-400">{t('bonus_xp')}</span>
                  <p className="text-2xl font-extrabold text-emerald-400">
                    +{location.xpReward} XP
                  </p>
                </div>
              </div>

              {/* Unique Facts List */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left text-xs space-y-1.5 backdrop-blur-md">
                <span className="font-bold text-sky-300 block mb-1">
                  🎯 {t('key_facts')}:
                </span>
                {location.uniqueFacts.map((fact, idx) => (
                  <p key={idx} className="text-slate-300 flex items-start gap-1.5">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{fact}</span>
                  </p>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={handleShare}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/15 text-sky-300 font-bold rounded-2xl border border-white/10 transition flex items-center justify-center space-x-2 text-xs backdrop-blur-md"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t('share_result')}</span>
                </button>

                <button
                  onClick={handleRestartQuiz}
                  className="py-2.5 px-4 bg-white/10 hover:bg-white/15 text-slate-300 font-semibold rounded-2xl border border-white/10 transition flex items-center justify-center space-x-1 text-xs backdrop-blur-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t('repeat')}</span>
                </button>

                <button
                  onClick={() => {
                    audioSynthesizer.stop();
                    onClose();
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-2xl transition text-xs shadow-lg border border-sky-400/30"
                >
                  {t('close_claim')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
