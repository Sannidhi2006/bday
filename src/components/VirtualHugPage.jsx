import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function VirtualHugPage({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return; // Prevent re-triggering
    setIsOpen(true);
    setShowParticles(true);

    // Celebratory burst of romantic sparkles and hearts
    try {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.58 },
        colors: ['#f48fb1', '#ec407a', '#d81b60', '#ffc107', '#ffffff'],
      });
    } catch {
      // Confetti fallback
    }

    // Clean up particles after animation completes
    setTimeout(() => {
      setShowParticles(false);
    }, 2800);
  };

  return (
    <div className="gift-card">

      {!isOpen ? (
        /* ========================================================
           STATE 1: BEFORE OPENING GIFT
           ======================================================== */
        <div>
          <h1 className="gift-prompt-title">
            There's a surprise for u 🎁❤️
          </h1>
          <p className="gift-instruction">
            Tap your gift, my love!
          </p>

          <button
            type="button"
            className="gift-box-btn"
            onClick={handleOpenGift}
            aria-label="Tap to open your birthday surprise gift"
            id="btn-open-gift"
          >
            <svg
              className="gift-svg"
              viewBox="0 0 260 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                {/* Box body gradient */}
                <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff0f5" />
                  <stop offset="50%" stopColor="#f8bbd0" />
                  <stop offset="100%" stopColor="#f48fb1" />
                </linearGradient>

                {/* Ribbon gradient */}
                <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f06292" />
                  <stop offset="50%" stopColor="#d81b60" />
                  <stop offset="100%" stopColor="#ad1457" />
                </linearGradient>

                {/* Lid gradient */}
                <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#fce4ec" />
                  <stop offset="100%" stopColor="#f8bbd0" />
                </linearGradient>
              </defs>

              {/* Box shadow on floor */}
              <ellipse cx="130" cy="235" rx="90" ry="12" fill="rgba(184, 75, 108, 0.2)" />

              {/* Box Base */}
              <rect
                x="40"
                y="95"
                width="180"
                height="125"
                rx="14"
                fill="url(#boxGrad)"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="2"
              />

              {/* Vertical Ribbon on Box */}
              <rect x="118" y="95" width="24" height="125" fill="url(#ribbonGrad)" />

              {/* Horizontal Ribbon on Box */}
              <rect x="40" y="150" width="180" height="20" fill="url(#ribbonGrad)" />

              {/* Animated Lid and Bow Group */}
              <g className="gift-lid-group">
                {/* Lid Body */}
                <rect
                  x="30"
                  y="70"
                  width="200"
                  height="30"
                  rx="8"
                  fill="url(#lidGrad)"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="2"
                />
                <rect x="118" y="70" width="24" height="30" fill="url(#ribbonGrad)" />

                {/* Big Cute Ribbon Bow */}
                {/* Left Bow Loop */}
                <path
                  d="M130 70 C100 35 60 48 105 68 C120 74 128 72 130 70 Z"
                  fill="url(#ribbonGrad)"
                />
                {/* Right Bow Loop */}
                <path
                  d="M130 70 C160 35 200 48 155 68 C140 74 132 72 130 70 Z"
                  fill="url(#ribbonGrad)"
                />
                {/* Bow Center Knot */}
                <ellipse cx="130" cy="70" rx="12" ry="10" fill="#880e4f" />
                {/* Flowing Ribbon Tails */}
                <path d="M124 75 Q110 95 105 110" stroke="#ad1457" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M136 75 Q150 95 155 110" stroke="#ad1457" strokeWidth="4" strokeLinecap="round" fill="none" />
              </g>
            </svg>
          </button>
        </div>
      ) : (
        /* ========================================================
           STATE 2: WARM VIRTUAL HUG EMBRACE REVEAL
           ======================================================== */
        <div className="hug-reveal-container" aria-live="polite">
          {/* Burst Particles released from gift */}
          {showParticles && (
            <div className="floating-hearts-container" aria-hidden="true">
              {['💖', '✨', '💕', '🫂', '🌸', '🤍', '💗'].map((emoji, idx) => (
                <span
                  key={idx}
                  className="floating-heart-item"
                  style={{
                    left: `${20 + idx * 10}%`,
                    fontSize: '28px',
                    animationDuration: '2.5s',
                    '--drift-x': `${(idx % 2 === 0 ? 1 : -1) * 35}px`,
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}

          {/* Warm Virtual Hug Hugging Bears Image */}
          <div className="hug-image-wrapper">
            <img
              src={`${import.meta.env.BASE_URL}images/hug.jpg`}
              alt="Cute virtual hug"
              className="hug-image"
              loading="lazy"
            />
          </div>

          {/* Exact Required Texts */}
          <h2 className="hug-exact-title">Virtual hug for u 🫂❤️</h2>
          <p className="hug-exact-subtitle">I miss u sooo much</p>

          {/* CONTINUE Button (Strictly rendered ONLY after gift is opened) */}
          <button
            type="button"
            onClick={onNext}
            className="btn-primary btn-continue-entrance"
            style={{ width: '100%', maxWidth: '280px' }}
            id="btn-hug-continue"
          >
            CONTINUE 💗
          </button>
        </div>
      )}
    </div>
  );
}
