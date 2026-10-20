import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Compass,
  MapPin,
  ExternalLink,
  Volume2,
  VolumeX,
  RotateCcw,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Lightbulb,
} from 'lucide-react';
import { querySaboKnowledge } from '../data/saboKnowledgeBase';
import { useLanguage } from '../utils/translations';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  relatedLocationId?: string;
  flyToCoords?: { lat: number; lng: number; zoom?: number };
  followUps?: string[];
}

interface ModuleChatbotGuideProps {
  onNavigateToMapWithCoords?: (lat: number, lng: number, zoom?: number) => void;
  onNavigateToLocation?: (locationId: string) => void;
}

export const ModuleChatbotGuide: React.FC<ModuleChatbotGuideProps> = ({
  onNavigateToMapWithCoords,
  onNavigateToLocation,
}) => {
  const { lang, t } = useLanguage();
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from Ki Pemandu
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg_initial',
        sender: 'assistant',
        text:
          lang === 'en'
            ? 'Sampurasun! I am Ki Pemandu Saba Bogor, your local digital travel guide. Ask me about royal Pajajaran history, iconic Bogor culinary gems, Biskita transit corridors, or secret photo spots in the Botanic Gardens!'
            : 'Sampurasun! Saya Ki Pemandu Saba Bogor, pemandu wisata budaya digitalmu. Tanyakan apa saja seputar sejarah Pakuan Pajajaran, kuliner legendaris khas Bogor, rute Biskita Trans Pakuan, atau spot foto terbaik di Kebun Raya!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: [
          'Sejarah Istana Bogor & Rusa',
          'Rekomendasi Kuliner Legendaris',
          'Rute Biskita Trans Pakuan',
          'Prasasti Batutulis 1533',
        ],
      },
    ];
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Realistic typing delay (350ms) for pleasant conversational pacing
    setTimeout(() => {
      const result = querySaboKnowledge(text);

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: lang === 'en' ? result.answerEn : result.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedLocationId: result.sourceItem?.relatedLocationId,
        flyToCoords: result.sourceItem?.flyToCoords,
        followUps: result.followUps,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'id-ID';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        id: 'msg_initial_reset',
        sender: 'assistant',
        text:
          lang === 'en'
            ? 'Chat reset! What would you like to explore next in Bogor?'
            : 'Percakapan direset! Apa yang ingin kamu jelajahi selanjutnya di Kota Bogor?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: [
          'Sejarah Istana Bogor & Rusa',
          'Rekomendasi Kuliner Legendaris',
          'Rute Biskita Trans Pakuan',
          'Prasasti Batutulis 1533',
        ],
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-4">
      {/* Header Banner with 0 Token Badge */}
      <div className="bg-gradient-to-r from-[#0F2A21] via-[#173D30] to-[#0A1F18] border border-[#3F7D64]/60 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C17817] via-[#F59E0B] to-[#34D399] p-0.5 shadow-lg flex-shrink-0">
            <div className="w-full h-full bg-[#0F2A21] rounded-[14px] flex items-center justify-center text-2xl">
              🧙‍♂️
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-[#F7F1E3] tracking-tight">
                Ki Pemandu Saba Bogor
              </h2>
              {/* ZERO TOKEN ECO BADGE */}
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>0 Token Digunakan • 100% Bebas Biaya</span>
              </span>
            </div>
            <p className="text-xs text-[#8FBC94] mt-0.5">
              {lang === 'en'
                ? 'High-speed offline semantic knowledge engine for Bogor heritage & transit'
                : 'Enjin pengetahuan semantik luring super cepat untuk cagar budaya & rute wisata Bogor'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-center">
          <button
            onClick={handleResetChat}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8FBC94] hover:text-[#F7F1E3] text-xs font-semibold border border-white/10 transition cursor-pointer"
            title="Reset Percakapan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Chat Thread Window */}
      <div className="bg-[#0F2A21]/95 border border-[#3F7D64]/40 rounded-3xl shadow-xl flex flex-col h-[580px] overflow-hidden backdrop-blur-xl">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`flex items-start gap-2.5 max-w-[90%] sm:max-w-[80%] ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Sender Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold border shadow ${
                    msg.sender === 'user'
                      ? 'bg-[#C17817] text-white border-amber-300'
                      : 'bg-[#173D30] text-[#34D399] border-[#3F7D64]'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-tr-none border border-emerald-600/40'
                      : 'bg-[#173D30]/90 text-[#F7F1E3] rounded-tl-none border border-[#3F7D64]/50'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Interactive Grounding Card if location attached */}
                  {msg.flyToCoords && onNavigateToMapWithCoords && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap bg-black/25 -mx-1 p-2 rounded-xl">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lang === 'en' ? 'Interactive Map Coordinates' : 'Koordinat Peta Tersedia'}</span>
                      </div>

                      <button
                        onClick={() =>
                          onNavigateToMapWithCoords(
                            msg.flyToCoords!.lat,
                            msg.flyToCoords!.lng,
                            msg.flyToCoords!.zoom
                          )
                        }
                        className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs rounded-lg border border-amber-500/40 transition active:scale-95 cursor-pointer shadow-sm"
                      >
                        <Plane className="w-3 h-3 text-amber-400" />
                        <span>{lang === 'en' ? 'Fly-To Map' : 'Fokus Peta ✈️'}</span>
                      </button>
                    </div>
                  )}

                  {/* Bubble Footer Actions */}
                  {msg.sender === 'assistant' && (
                    <div className="mt-2 pt-1 flex items-center justify-between text-[10px] text-[#8FBC94] border-t border-white/5">
                      <span>{msg.timestamp}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="hover:text-white transition flex items-center space-x-0.5 cursor-pointer"
                          title="Salin Teks"
                        >
                          {copiedId === msg.id ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedId === msg.id ? 'Tersalin' : 'Salin'}</span>
                        </button>

                        <button
                          onClick={() => handleSpeakText(msg.text)}
                          className="hover:text-white transition flex items-center space-x-0.5 cursor-pointer"
                          title="Dengar Suara"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Dengar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Follow-up Chips for Assistant */}
              {msg.followUps && msg.followUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-11 max-w-[85%]">
                  {msg.followUps.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="text-[11px] font-semibold bg-[#173D30]/70 hover:bg-[#1B4D3E] text-amber-300 hover:text-white px-2.5 py-1 rounded-full border border-amber-600/30 transition shadow-sm cursor-pointer"
                    >
                      💡 {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 text-[#8FBC94] text-xs pl-2">
              <Bot className="w-4 h-4 text-[#34D399] animate-bounce" />
              <span>Ki Pemandu sedang merangkai narasi...</span>
              <span className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-ping" />
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0A1F18] border-t border-[#3F7D64]/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'Ask anything about Bogor history, food, transport... (0 Tokens)'
                  : 'Tanya apa saja seputar sejarah, kuliner, angkot Bogor... (0 Token)'
              }
              className="flex-1 bg-[#173D30]/80 border border-[#3F7D64]/50 focus:border-[#F59E0B] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[#F7F1E3] placeholder-[#8FBC94]/60 focus:outline-none transition shadow-inner"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#C17817] via-[#F59E0B] to-[#34D399] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm transition transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1 shadow-lg cursor-pointer"
            >
              <span>Kirim</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Bottom quick suggestions bar */}
          <div className="flex items-center space-x-2 mt-2 pt-1 text-[11px] text-[#8FBC94] overflow-x-auto scrollbar-none">
            <span className="font-bold flex items-center gap-1 flex-shrink-0 text-amber-400">
              <Lightbulb className="w-3 h-3" />
              {lang === 'en' ? 'Popular:' : 'Topik Cepat:'}
            </span>
            {[
              'Soto Mie vs Doclang',
              'Rusa Istana Bogor',
              'Biskita Koridor 1',
              'Prasasti Batutulis',
              'Kuliner Halal Suryakencana',
            ].map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(topic)}
                className="whitespace-nowrap px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-amber-200/90 hover:text-white transition cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
