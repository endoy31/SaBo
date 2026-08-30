class AudioSynthesizer {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(
    text: string,
    onEnd?: () => void,
    onError?: () => void,
    langCode: string = 'id-ID'
  ) {
    if (!this.synth) {
      alert(
        langCode.startsWith('en')
          ? 'Audio narration (Text-to-Speech) is not supported in this browser.'
          : 'Fitur Narasi Audio (Text-to-Speech) tidak didukung di peramban ini.'
      );
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.95; // slightly slower for clean narration
    utterance.pitch = 1.0;

    // Try finding a matching language voice if available
    const voices = this.synth.getVoices();
    const isEn = langCode.startsWith('en');
    const matchedVoice = voices.find((v) =>
      isEn
        ? v.lang.includes('en') || v.lang.includes('EN')
        : v.lang.includes('id') || v.lang.includes('ID')
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (onError) onError();
    };

    this.currentUtterance = utterance;
    this.isSpeakingState = true;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking && !this.synth.paused : false;
  }

  /**
   * Synthesize celebratory fanfare / quest completion chime using Web Audio API
   */
  public playQuestComplete() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }
      const ctx = this.audioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Major Arpeggio)
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.3, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.45);
      });
    } catch (e) {
      console.warn('Web Audio playback error:', e);
    }
  }

  public playFanfare() {
    this.playQuestComplete();
  }
}

export const audioSynthesizer = new AudioSynthesizer();
