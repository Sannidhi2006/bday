import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CORRECT_PASSCODE = '235006';

export default function PasscodePage({ onUnlock }) {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const triggerShake = (message) => {
    setIsShaking(true);
    setFeedback({
      text: message,
      type: 'error',
    });
    setTimeout(() => {
      setIsShaking(false);
    }, 550);
  };

  const handleChange = (e) => {
    const rawVal = e.target.value;
    // Allow digits only and max 6
    const cleanDigits = rawVal.replace(/\D/g, '').slice(0, 6);
    setCode(cleanDigits);

    if (feedback.text) {
      setFeedback({ text: '', type: '' });
    }
  };

  const handleSlotClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // 1. Empty submit check
    if (!code || code.trim() === '') {
      triggerShake('Please enter our secret code first, sweetheart 💌');
      return;
    }

    // 2. Incomplete code check
    if (code.length < 6) {
      triggerShake('Please enter all 6 digits to unlock your surprise 🌸');
      return;
    }

    // 3. Exact passcode verification
    if (code === CORRECT_PASSCODE) {
      setIsUnlocking(true);
      setFeedback({
        text: 'Unlocked with love! Taking you inside... 💖',
        type: 'success',
      });

      // Romantic confetti burst
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f8bbd0', '#f48fb1', '#ec407a', '#ad1457', '#ffffff'],
        });
      } catch {
        // Confetti fallback
      }

      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      // 4. Any wrong value
      triggerShake("Oops, that's not our secret code, my love 💗 Try again!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className={`glass-card ${isShaking ? 'shake-animation' : ''}`}>
      {/* Heart Lock Illustration Badge */}
      <div className="passcode-icon-badge" aria-hidden="true">
        <svg
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shackle */}
          <path
            d="M20 28V20C20 13.3726 25.3726 8 32 8C38.6274 8 44 13.3726 44 20V28"
            stroke="url(#roseGoldShackle)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Heart Lock Body */}
          <path
            d="M32 58C32 58 12 45 12 30C12 23.5 17 19 23 19C27.5 19 30.5 21.5 32 23.5C33.5 21.5 36.5 19 41 19C47 19 52 23.5 52 30C52 45 32 58 32 58Z"
            fill="url(#heartBodyGradient)"
          />
          {/* Keyhole */}
          <circle cx="32" cy="33" r="3.5" fill="#ffffff" />
          <path
            d="M30.5 34.5L33.5 34.5L34.5 42L29.5 42L30.5 34.5Z"
            fill="#ffffff"
          />

          <defs>
            <linearGradient id="roseGoldShackle" x1="20" y1="8" x2="44" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e8a87c" />
              <stop offset="0.5" stopColor="#d47a95" />
              <stop offset="1" stopColor="#b84b6c" />
            </linearGradient>
            <linearGradient id="heartBodyGradient" x1="12" y1="19" x2="52" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f48fb1" />
              <stop offset="0.6" stopColor="#d47a95" />
              <stop offset="1" stopColor="#8e2b47" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Romantic Heading & Instruction */}
      <h1 className="passcode-title">A little surprise for you...</h1>
      <p className="passcode-instruction">
        Enter the passcode to unlock your birthday surprise.
      </p>

      {/* Passcode Form */}
      <form onSubmit={handleSubmit} className="passcode-form" noValidate>
        {/* Interactive 6-slot pin presentation with hidden native input */}
        <div
          className="passcode-boxes-wrapper"
          onClick={handleSlotClick}
          role="group"
          aria-label="Passcode entry"
        >
          <input
            ref={inputRef}
            id="passcode-input"
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="passcode-hidden-input"
            aria-label="Enter six digit secret passcode"
            autoComplete="one-time-code"
            disabled={isUnlocking}
          />

          {[0, 1, 2, 3, 4, 5].map((index) => {
            const hasDigit = index < code.length;
            const isCurrent = index === code.length;

            return (
              <div
                key={index}
                className={`passcode-digit-slot ${
                  isCurrent ? 'active' : ''
                } ${hasDigit ? 'filled' : ''}`}
                aria-hidden="true"
              >
                {hasDigit ? <span className="passcode-digit-bullet" /> : null}
              </div>
            );
          })}
        </div>

        {/* Validation / Friendly Feedback */}
        <div
          className={`passcode-feedback ${feedback.type}`}
          role="status"
          aria-live="polite"
        >
          {feedback.text || ''}
        </div>

        {/* Submit Button (min 48px height) */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isUnlocking}
          style={{ width: '100%', maxWidth: '320px' }}
        >
          {isUnlocking ? 'Opening with love... 💕' : 'Unlock My Surprise ❤️'}
        </button>
      </form>
    </div>
  );
}
