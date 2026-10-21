import React from 'react';

export default function ShayariPage({ onNext }) {
  return (
    <div className="shayari-fullscreen-root" aria-label="Our Love Shayari">
      {/* ── AMBIENT BACKGROUND: Soft blur filling widescreen gaps ── */}
      <div className="shayari-ambient-bg" aria-hidden="true">
        <img
          src="/images/shayari-bg.jpg"
          alt=""
          className="shayari-ambient-img"
        />
      </div>

      {/* ── PHOTO STAGE: Fits the complete 720x943 photo properly without cropping ── */}
      <div className="shayari-photo-stage">
        <img
          src="/images/shayari-bg.jpg"
          alt="Us together"
          className="shayari-main-photo"
        />

        {/* Delicate lighting overlay keeping photo bright and text crystal clear */}
        <div className="shayari-photo-scrim" aria-hidden="true" />

        {/* ── CONTENT LAYER: Pure Shayari text directly on the photo (NO white sheet) ── */}
        <div className="shayari-content-layer">
        {/* Top Ornamental Flourish */}
        <div className="shayari-ornament-top" aria-hidden="true">
          <svg width="140" height="26" viewBox="0 0 120 24" fill="none">
            <path
              d="M60 12C45 12 35 3 20 3C10 3 0 12 0 12C0 12 10 21 20 21C35 21 45 12 60 12Z"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.2"
            />
            <path
              d="M60 12C75 12 85 3 100 3C110 3 120 12 120 12C120 12 110 21 100 21C85 21 75 12 60 12Z"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.2"
            />
            <circle cx="60" cy="12" r="3" fill="#ffffff" />
          </svg>
        </div>

        {/* The 4 Shayari Lines (sequential slow fade-in) */}
        <div className="shayari-lines-group">
          <p className="shayari-line shayari-line-1">
            Na jaane kaunsi dua qubool ho gayi,
          </p>
          <p className="shayari-line shayari-line-2">
            Meri zindagi teri maujoodgi se khoobsoorat ho gayi,
          </p>
          <p className="shayari-line shayari-line-3">
            Log dhoondhte hain khushiyan zamaane bhar mein,
          </p>
          <p className="shayari-line shayari-line-4">
            Mujhe tu mila, meri duniya mukammal ho gayi.
          </p>
        </div>

        {/* Bottom Ornamental Flourish */}
        <div className="shayari-ornament-bottom" aria-hidden="true">
          <svg width="140" height="26" viewBox="0 0 120 24" fill="none">
            <path
              d="M60 12C45 12 35 3 20 3C10 3 0 12 0 12C0 12 10 21 20 21C35 21 45 12 60 12Z"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.2"
            />
            <path
              d="M60 12C75 12 85 3 100 3C110 3 120 12 120 12C120 12 110 21 100 21C85 21 75 12 60 12Z"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.2"
            />
            <circle cx="60" cy="12" r="3" fill="#ffffff" />
          </svg>
        </div>

        {/* Continue Button */}
        <div className="shayari-continue-wrapper">
          <button
            type="button"
            onClick={onNext}
            className="btn-primary shayari-btn-continue"
            id="btn-shayari-continue"
          >
            Continue 💗
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
