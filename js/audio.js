/**
 * Web Audio API Sound Synthesizer for HCM Ideology Scenario Game
 * Provides procedural sound effects and background ambient music
 */
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmInterval = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.bgmPlaying) {
      this.stopBgm();
    }
    return this.isMuted;
  }

  playTypeSound() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450 + Math.random() * 80, this.audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playHoverSound() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.audioCtx.currentTime + 0.06);
      
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playClickSound() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playCorrectSound() {
    if (this.isMuted) return;
    this.init();
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Triumphant Chord)
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.09);
        
        const startTime = this.audioCtx.currentTime + idx * 0.09;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playWrongSound() {
    if (this.isMuted) return;
    this.init();
    try {
      const notes = [311.13, 277.18]; // D#4 -> C#4
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.12);
        
        const startTime = this.audioCtx.currentTime + idx * 0.12;
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  startAmbientBgm() {
    if (this.isMuted || this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;
    
    // Soothing pentatonic chord progression
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C Major
      [220.00, 261.63, 329.63, 440.00], // A Minor
      [174.61, 220.00, 261.63, 349.23], // F Major
      [196.00, 246.94, 293.66, 392.00]  // G Major
    ];
    let chordIndex = 0;

    const playChord = () => {
      if (!this.bgmPlaying || this.isMuted) return;
      const currentChord = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;

      currentChord.forEach((freq, i) => {
        try {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
          
          const now = this.audioCtx.currentTime;
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.015, now + 1.5 + (i * 0.2));
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);
          
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          
          osc.start(now);
          osc.stop(now + 5.0);
        } catch(e) {}
      });
    };

    playChord();
    this.bgmInterval = setInterval(playChord, 5000);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

window.soundEngine = new SoundEngine();
