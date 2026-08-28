class AudioSynthesizer {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;

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
}

export const audioSynthesizer = new AudioSynthesizer();
