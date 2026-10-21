import React, { useState } from 'react';

export default function BirthdayWelcomePage({ onNext }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="welcome-root" aria-label="Birthday Welcome for Cuttu">
      <audio
        src={`${import.meta.env.BASE_URL}audio/haareya.mpeg`}
        autoPlay
        loop
        preload="auto"
      />

      {/* ── BACKGROUND LAYER ── */}
      {imageError ? (
        <div className="welcome-fallback-bg" aria-hidden="true" />
      ) : (
        <div className="welcome-img-bg" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}images/cuttu.jpg`}
            alt=""
            className="welcome-bg-img"
            onError={() => setImageError(true)}
            draggable="false"
          />
        </div>
      )}

      {/* Dark gradient overlay for text readability */}
      <div className="welcome-overlay" aria-hidden="true" />

      {/* ── CONTENT LAYER ── */}
      <div className="welcome-content-layer">
        {/* Heading at top */}
        <div className="welcome-top-section">
          <h1 className="welcome-heading">
            HAPPY BIRTHDAY MY CUTTU ❤️
          </h1>
        </div>

        {/* Message + Button always at bottom */}
        <div className="welcome-bottom-section">
          <div className="welcome-glass-message">
            <p className="welcome-message-text">
              This is ur special day and I wanted to make it more special, so I made this for u 💗
            </p>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="btn-primary welcome-btn-open"
            id="btn-welcome-open"
            aria-label="Click to open birthday surprise"
          >
            CLICK TO OPEN 💌
          </button>
        </div>
      </div>
    </div>
  );
}
