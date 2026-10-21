import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

// C Major Notes in Hz
const NOTES = {
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
};

// 3/4 waltz rhythm sequence:
// 1 beat = ~0.54s (~111 BPM, music-box tempo)
const BEAT_UNIT = 0.54;

const MELODY_SEQUENCE = [
  // Phrase 1: "Happy birthday to you" = G4 G4 A4 G4 C5 B4
  { note: 'G4', beats: 0.75 },
  { note: 'G4', beats: 0.25 },
  { note: 'A4', beats: 1.0 },
  { note: 'G4', beats: 1.0 },
  { note: 'C5', beats: 1.0 },
  { note: 'B4', beats: 2.0 },
  { rest: 0.6 },

  // Phrase 2: "Happy birthday to you" = G4 G4 A4 G4 D5 C5
  { note: 'G4', beats: 0.75 },
  { note: 'G4', beats: 0.25 },
  { note: 'A4', beats: 1.0 },
  { note: 'G4', beats: 1.0 },
  { note: 'D5', beats: 1.0 },
  { note: 'C5', beats: 2.0 },
  { rest: 0.6 },

  // Phrase 3: "Happy birthday dear Cuttu" = G4 G4 G5 E5 C5 B4 A4
  { note: 'G4', beats: 0.75 },
  { note: 'G4', beats: 0.25 },
  { note: 'G5', beats: 1.0 },
  { note: 'E5', beats: 1.0 },
  { note: 'C5', beats: 1.0 },
  { note: 'B4', beats: 1.0 },
  { note: 'A4', beats: 2.0 },
  { rest: 0.6 },

  // Phrase 4: "Happy birthday to you" = F5 F5 E5 C5 D5 C5
  { note: 'F5', beats: 0.75 },
  { note: 'F5', beats: 0.25 },
  { note: 'E5', beats: 1.0 },
  { note: 'C5', beats: 1.0 },
  { note: 'D5', beats: 1.0 },
  { note: 'C5', beats: 2.4 },
];

export default function CakePage({ onNext, onPrev }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [melodyFinished, setMelodyFinished] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // Audio & Timer Refs for proper cleanup and idempotency
  const audioCtxRef = useRef(null);
  const activeNodesRef = useRef([]);
  const timersRef = useRef([]);
  const isStartedRef = useRef(false);

  // Cleanup on unmount: stop oscillators, clear timers, close AudioContext
  useEffect(() => {
    // Create the audio graph while the cake page is loading so the click only
    // needs to resume it and start the first note.
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) audioCtxRef.current = new AudioCtxClass();
    } catch {
      // Playback will show the existing fallback if Web Audio is unavailable.
    }

    return () => {
      // 1. Clear timers
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];

      // 2. Stop and disconnect oscillators
      activeNodesRef.current.forEach(({ osc, gain }) => {
        try {
          osc.stop();
        } catch {
          // ignore already stopped
        }
        try {
          osc.disconnect();
        } catch {
          // ignore
        }
        try {
          gain.disconnect();
        } catch {
          // ignore
        }
      });
      activeNodesRef.current = [];

      // 3. Close AudioContext
      if (audioCtxRef.current) {
        try {
          if (audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        } catch {
          // ignore
        }
        audioCtxRef.current = null;
      }
    };
  }, []);

  const handleBlowCandles = async () => {
    if (candlesBlown || isStartedRef.current) return;
    isStartedRef.current = true;

    // 1. Flames extinguish permanently
    setCandlesBlown(true);

    // 2. Celebratory sparkles & confetti burst
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#f8bbd0', '#f48fb1', '#ffc107', '#ff80ab', '#ffffff', '#e91e63'],
      });
    } catch {
      // Confetti fallback
    }

    // 3. Play Traditional Happy Birthday melody via Web Audio API
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) {
        throw new Error('Web Audio API not supported');
      }

      const ctx = audioCtxRef.current || new AudioCtxClass();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      setIsPlayingMelody(true);

      // Master output gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.28, ctx.currentTime);
      masterGain.connect(ctx.destination);

      let scheduleCursor = ctx.currentTime + 0.02;
      let lastOscillator = null;

      MELODY_SEQUENCE.forEach((item, index) => {
        if (item.rest) {
          scheduleCursor += item.rest * BEAT_UNIT;
          return;
        }

        const noteFreq = NOTES[item.note];
        const noteDuration = item.beats * BEAT_UNIT;

        if (noteFreq) {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          // Gentle music box tone using triangle oscillator
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(noteFreq, scheduleCursor);

          // Attack & Decay Envelope to prevent clicking and create sweet chime
          const attackTime = 0.02;
          noteGain.gain.setValueAtTime(0.0001, scheduleCursor);
          noteGain.gain.linearRampToValueAtTime(0.25, scheduleCursor + attackTime);
          noteGain.gain.exponentialRampToValueAtTime(
            0.0001,
            scheduleCursor + noteDuration
          );

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(scheduleCursor);
          osc.stop(scheduleCursor + noteDuration);

          activeNodesRef.current.push({ osc, gain: noteGain });
          lastOscillator = osc;
        }

        scheduleCursor += noteDuration;
      });

      const totalMusicDurationMs = (scheduleCursor - ctx.currentTime) * 1000;

      // Completion detection using last oscillator onended and safety timeout
      let hasEnded = false;
      const onMelodyDone = () => {
        if (hasEnded) return;
        hasEnded = true;
        setIsPlayingMelody(false);
        setMelodyFinished(true);
      };

      if (lastOscillator) {
        lastOscillator.onended = onMelodyDone;
      }

      // Safety timeout in case onended fires late or gets interrupted
      const timerId = setTimeout(onMelodyDone, totalMusicDurationMs + 350);
      timersRef.current.push(timerId);

    } catch (err) {
      console.warn('Audio playback error:', err);
      setAudioError(true);
      setIsPlayingMelody(false);
      // Fallback: immediately allow continuing so user is never stuck
      setMelodyFinished(true);
    }
  };


  return (
    <div className="cake-card">
      {/* Header */}
      <header className="cake-header">
        <h1 className="cake-title">Make a Wish &amp; Cut the Cake 🎂</h1>
        <p className="cake-subtitle">
          {candlesBlown
            ? 'All your wishes are soaring into the stars... ✨'
            : 'Close your eyes, make a secret wish, and blow out the candles!'}
        </p>
      </header>

      {/* ── Cuttu's birthday photo — small, below subtitle, above button ── */}
      <div className="cake-photo-wrapper">
        <img
          src={`${import.meta.env.BASE_URL}images/cake.jpeg`}
          alt="Cuttu with his birthday cake"
          className="cake-real-photo"
          onError={e => {
            // Try .jpg fallback if .jpeg fails
            if (e.currentTarget.src.includes('.jpeg')) {
              e.currentTarget.src = `${import.meta.env.BASE_URL}images/cake.jpg`;
            } else {
              e.currentTarget.style.display = 'none';
            }
          }}
        />
      </div>

      {/* Message After Blowing */}
      {candlesBlown && (
        <div className="wish-message-box" role="status" aria-live="polite">
          <p className="wish-message-text">Make a wish, my love! 💗</p>
        </div>
      )}

      {/* Playing Tune Feedback */}
      {isPlayingMelody && (
        <div className="melody-status-box" aria-live="polite">
          <span>Playing your birthday song</span>
          <span className="melody-notes-anim">
            <span>🎵</span>
            <span>🎶</span>
            <span>✨</span>
          </span>
        </div>
      )}

      {/* Audio Error Fallback */}
      {audioError && (
        <p className="cake-audio-error-msg">
          Couldn't play the music, but the wish still counts 💗
        </p>
      )}

      {/* Buttons */}
      <div className="navigation-buttons-row" style={{ marginTop: '0.8rem' }}>
        {!candlesBlown && (
          <button
            type="button"
            onClick={handleBlowCandles}
            className="btn-primary"
            style={{ width: '100%', maxWidth: '320px' }}
            id="btn-blow-candles"
          >
            BLOW THE CANDLES 🕯️
          </button>
        )}

        {melodyFinished && (
          <button
            type="button"
            onClick={onNext}
            className="btn-primary btn-continue-entrance"
            style={{ width: '100%', maxWidth: '300px' }}
            id="btn-cake-continue"
          >
            CONTINUE ❤️
          </button>
        )}
      </div>
    </div>
  );
}
