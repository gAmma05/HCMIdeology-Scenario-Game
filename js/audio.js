/**
 * Audio Engine for HCM Ideology Scenario Game
 * Supports:
 * 1. HTML5 Audio for high-fidelity song playback (MP3/OGG) per stage
 * 2. Web Audio API procedural melodic synthesizer fallback for famous songs about Uncle Ho
 * 3. Interactive sound effects (Typewriter, Hover, Click, Correct, Incorrect)
 * 4. Autoplay policy management & seamless volume fading
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.currentMusicData = null;
    this.bgmAudioElement = null;
    this.synthBgmPlaying = false;
    this.synthTimeouts = [];
    this.isUserInteracted = false;
    this.masterBgmVolume = 0.38;

    // Built-in song melodies about Uncle Ho (Note, Duration in beats, Octave)
    this.songMelodies = {
      "bac_dang_cung_chung_chau_hanh_quan": {
        bpm: 112,
        notes: [
          // "Đêm nay trên đường hành quân ra mặt trận"
          { note: "C4", d: 1 }, { note: "E4", d: 1 }, { note: "G4", d: 1 }, { note: "A4", d: 1 },
          { note: "C5", d: 1.5 }, { note: "B4", d: 0.5 }, { note: "A4", d: 1 }, { note: "G4", d: 2 },
          // "Trùng trùng đoàn quân tiến bước theo con đường của Bác"
          { note: "E4", d: 1 }, { note: "G4", d: 1 }, { note: "A4", d: 1 }, { note: "C5", d: 1 },
          { note: "D5", d: 1 }, { note: "E5", d: 1 }, { note: "D5", d: 1 }, { note: "C5", d: 2 },
          // "Nở hoa ngàn hương đưa bầy chim tung cánh"
          { note: "A4", d: 1 }, { note: "C5", d: 1 }, { note: "G4", d: 1 }, { note: "E4", d: 1 },
          { note: "G4", d: 1.5 }, { note: "A4", d: 0.5 }, { note: "G4", d: 1 }, { note: "E4", d: 2 },
          // "Bác vẫn cùng chúng cháu hành quân"
          { note: "D4", d: 1 }, { note: "E4", d: 1 }, { note: "G4", d: 1.5 }, { note: "A4", d: 0.5 },
          { note: "C5", d: 2 }, { note: "C5", d: 2 },
          { note: "REST", d: 2 }
        ],
        chords: [
          ["C3", "G3", "C4"], ["A2", "E3", "A3"], ["F2", "C3", "F3"], ["G2", "D3", "G3"]
        ]
      },
      "nhu_co_bac_trong_ngay_dai_thang": {
        bpm: 132,
        notes: [
          // "Như có Bác Hồ trong ngày vui đại thắng"
          { note: "G4", d: 0.75 }, { note: "C5", d: 0.75 }, { note: "C5", d: 0.5 }, { note: "B4", d: 0.5 }, { note: "A4", d: 0.5 },
          { note: "G4", d: 0.75 }, { note: "A4", d: 0.5 }, { note: "G4", d: 0.5 }, { note: "E4", d: 1.5 },
          // "Lời Bác nay đã thành chiến thắng vẻ vang"
          { note: "G4", d: 0.75 }, { note: "A4", d: 0.5 }, { note: "G4", d: 0.5 }, { note: "E4", d: 0.75 }, { note: "D4", d: 0.5 }, { note: "E4", d: 0.5 },
          { note: "G4", d: 0.75 }, { note: "C4", d: 0.75 }, { note: "D4", d: 1.5 },
          // "Ba mươi năm đấu tranh giành toàn vẹn non sông"
          { note: "C4", d: 0.75 }, { note: "D4", d: 0.5 }, { note: "E4", d: 0.75 }, { note: "G4", d: 0.75 }, { note: "A4", d: 0.5 },
          { note: "G4", d: 0.75 }, { note: "E4", d: 0.5 }, { note: "D4", d: 0.5 }, { note: "E4", d: 1.5 },
          // "Ba mươi năm dân chủ cộng hòa kháng chiến đã thành công"
          { note: "G4", d: 0.75 }, { note: "A4", d: 0.5 }, { note: "G4", d: 0.5 }, { note: "E4", d: 0.75 }, { note: "D4", d: 0.75 },
          { note: "C4", d: 0.75 }, { note: "D4", d: 0.5 }, { note: "E4", d: 0.5 }, { note: "D4", d: 0.75 }, { note: "C4", d: 1.5 },
          // "Việt Nam - Hồ Chí Minh! Việt Nam - Hồ Chí Minh!"
          { note: "G4", d: 0.75 }, { note: "C5", d: 1.25 }, { note: "A4", d: 0.5 }, { note: "G4", d: 0.75 }, { note: "E4", d: 1.25 },
          { note: "G4", d: 0.75 }, { note: "C5", d: 1.25 }, { note: "A4", d: 0.5 }, { note: "G4", d: 0.75 }, { note: "E4", d: 1.25 },
          // "Việt Nam - Hồ Chí Minh! Việt Nam - Hồ Chí Minh!"
          { note: "G4", d: 0.5 }, { note: "A4", d: 0.5 }, { note: "C5", d: 0.5 }, { note: "D5", d: 1.25 }, { note: "C5", d: 1.5 },
          { note: "G4", d: 0.5 }, { note: "A4", d: 0.5 }, { note: "C5", d: 0.5 }, { note: "D5", d: 1.25 }, { note: "C5", d: 2.5 },
          { note: "REST", d: 1.5 }
        ],
        chords: [
          ["C3", "G3", "C4"], ["F2", "C3", "F3"], ["G2", "D3", "G3"], ["C3", "G3", "C4"],
          ["A2", "E3", "A3"], ["F2", "C3", "A3"], ["G2", "D3", "B3"], ["C3", "G3", "C4"]
        ]
      },
      "ho_chi_minh_dep_nhat_ten_nguoi": {
        bpm: 88,
        notes: [
          // "Tôi hát ngàn lời ca, bao la hơn những cánh đồng"
          { note: "G4", d: 1.5 }, { note: "A4", d: 0.5 }, { note: "C5", d: 1.5 }, { note: "D5", d: 0.5 },
          { note: "E5", d: 2 }, { note: "D5", d: 1 }, { note: "C5", d: 1 },
          // "Hồ Chí Minh, đẹp nhất tên Người"
          { note: "A4", d: 1 }, { note: "C5", d: 1 }, { note: "G4", d: 2 },
          { note: "E4", d: 1 }, { note: "G4", d: 1 }, { note: "C5", d: 3 },
          { note: "REST", d: 2 }
        ],
        chords: [
          ["C3", "E3", "G3"], ["A2", "C3", "E3"], ["F2", "A2", "C3"], ["G2", "B2", "D3"]
        ]
      }
    };

    // Frequency note map (A4 = 440Hz)
    this.noteFreqs = {
      "C3": 130.81, "D3": 146.83, "E3": 164.81, "F3": 174.61, "G3": 196.00, "A2": 110.00, "A3": 220.00, "B2": 123.47, "B3": 246.94,
      "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23, "G4": 392.00, "A4": 440.00, "B4": 493.88,
      "C5": 523.25, "D5": 587.33, "E5": 659.25, "F5": 698.46, "G5": 783.99, "A5": 880.00, "B5": 987.77,
      "C6": 1046.50
    };

    this.setupUserInteractionListener();
  }

  setupUserInteractionListener() {
    const unlockAndPlay = () => {
      this.resumeMusicIfPaused();
    };

    ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart'].forEach(evt => {
      document.addEventListener(evt, unlockAndPlay, { passive: true });
      window.addEventListener(evt, unlockAndPlay, { passive: true });
    });
  }

  resumeMusicIfPaused() {
    if (this.isMuted) return;
    this.init();
    if (this.bgmAudioElement) {
      if (this.bgmAudioElement.paused) {
        const p = this.bgmAudioElement.play();
        if (p !== undefined) {
          p.then(() => {
            this.setMusicPlayingVisual(true);
          }).catch((err) => {
            console.debug("Audio play gesture pending:", err.message);
          });
        }
      }
    } else if (this.currentMusicData && !this.synthBgmPlaying) {
      this.playStageMusic(this.currentMusicData);
    }
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

  /* ==========================================================================
     MUSIC PLAYBACK PER STAGE
     ========================================================================== */
  playStageMusic(musicData) {
    if (!musicData) return;
    this.currentMusicData = musicData;

    // Update UI music widget if present
    this.updateMusicInfoUI(musicData);

    if (this.isMuted) return;
    this.init();

    // Stop any existing synth or audio
    this.stopBgm();

    // Try HTML5 Audio file first
    if (musicData.src) {
      this.bgmAudioElement = new Audio();
      this.bgmAudioElement.src = musicData.src;
      this.bgmAudioElement.loop = true;
      this.bgmAudioElement.volume = this.masterBgmVolume;

      this.bgmAudioElement.addEventListener('playing', () => {
        this.setMusicPlayingVisual(true);
      });

      this.bgmAudioElement.addEventListener('pause', () => {
        if (!this.synthBgmPlaying) {
          this.setMusicPlayingVisual(false);
        }
      });

      this.bgmAudioElement.addEventListener('error', (e) => {
        console.warn("Audio file error, falling back to melodic synth:", e);
        this.startMelodicSynthBgm(musicData.melodyKey || "nhu_co_bac_trong_ngay_dai_thang");
      });

      const playPromise = this.bgmAudioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.setMusicPlayingVisual(true);
          })
          .catch((err) => {
            console.info("Autoplay requires first user interaction on page:", err.message);
          });
      }
    } else {
      this.startMelodicSynthBgm(musicData.melodyKey || "nhu_co_bac_trong_ngay_dai_thang");
    }
  }

  startMelodicSynthBgm(melodyKey) {
    if (this.isMuted) return;
    this.init();
    this.synthBgmPlaying = true;
    this.setMusicPlayingVisual(true);

    const song = this.songMelodies[melodyKey] || this.songMelodies["bac_dang_cung_chung_chau_hanh_quan"];
    const beatDuration = 60 / song.bpm; // Seconds per beat

    const playSequence = () => {
      if (!this.synthBgmPlaying || this.isMuted) return;

      let currentTime = this.audioCtx.currentTime + 0.1;
      let totalDuration = 0;

      // Play Background Harmony Chords
      if (song.chords) {
        let chordTime = currentTime;
        const chordDuration = 3.5;
        song.chords.forEach((chord) => {
          chord.forEach((noteName) => {
            const freq = this.noteFreqs[noteName];
            if (freq) this.playSoftPad(freq, chordTime, chordDuration);
          });
          chordTime += chordDuration;
        });
      }

      // Play Melody Line with warm flute/bell timbre
      song.notes.forEach((item) => {
        const noteDuration = item.d * beatDuration;
        if (item.note !== 'REST') {
          const freq = this.noteFreqs[item.note];
          if (freq) {
            this.playMelodyNote(freq, currentTime, noteDuration * 0.9);
          }
        }
        currentTime += noteDuration;
        totalDuration += noteDuration;
      });

      // Loop after complete song sequence
      const loopTimeout = setTimeout(() => {
        if (this.synthBgmPlaying && !this.isMuted) {
          playSequence();
        }
      }, totalDuration * 1000);

      this.synthTimeouts.push(loopTimeout);
    };

    playSequence();
  }

  playMelodyNote(freq, startTime, duration) {
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Subtle vibrato
      const vibrato = this.audioCtx.createOscillator();
      const vibratoGain = this.audioCtx.createGain();
      vibrato.frequency.setValueAtTime(5.5, startTime); // 5.5 Hz vibrato
      vibratoGain.gain.setValueAtTime(2.5, startTime);
      vibrato.connect(osc.frequency);
      vibrato.start(startTime + 0.15);
      vibrato.stop(startTime + duration);

      // Smooth bell/flute envelope
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.065, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {}
  }

  playSoftPad(freq, startTime, duration) {
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.015, startTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {}
  }

  stopBgm() {
    this.synthBgmPlaying = false;
    this.synthTimeouts.forEach(t => clearTimeout(t));
    this.synthTimeouts = [];

    if (this.bgmAudioElement) {
      try {
        this.bgmAudioElement.pause();
        this.bgmAudioElement.currentTime = 0;
      } catch (e) {}
      this.bgmAudioElement = null;
    }
    this.setMusicPlayingVisual(false);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    } else {
      if (this.currentMusicData) {
        this.playStageMusic(this.currentMusicData);
      }
    }
    return this.isMuted;
  }

  updateMusicInfoUI(musicData) {
    const musicTitleElem = document.getElementById('hudMusicTitle');
    const musicAuthorElem = document.getElementById('hudMusicAuthor');
    if (musicTitleElem) {
      musicTitleElem.textContent = musicData.title || "Bài ca về Bác";
    }
    if (musicAuthorElem && musicData.author) {
      musicAuthorElem.textContent = musicData.author;
    }
  }

  setMusicPlayingVisual(isPlaying) {
    const musicPill = document.getElementById('hudMusicPill');
    if (musicPill) {
      if (isPlaying && !this.isMuted) {
        musicPill.classList.add('playing');
        musicPill.title = 'Đang phát nhạc - Nhấp để tạm dừng';
      } else {
        musicPill.classList.remove('playing');
        musicPill.title = 'Nhạc đang tạm dừng - Nhấp để tiếp tục phát';
      }
    }
  }

  /* ==========================================================================
     SOUND EFFECTS
     ========================================================================== */
  playTypeSound() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450 + Math.random() * 80, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.025, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {}
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

      gain.gain.setValueAtTime(0.035, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {}
  }

  playClickSound() {
    this.resumeMusicIfPaused();
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {}
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
        gain.gain.linearRampToValueAtTime(0.14, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch (e) {}
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
        gain.gain.setValueAtTime(0.07, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch (e) {}
  }
}

window.soundEngine = new SoundEngine();

