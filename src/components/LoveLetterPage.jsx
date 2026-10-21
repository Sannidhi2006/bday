import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function LoveLetterPage({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showOnlyPhoto, setShowOnlyPhoto] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Sweet celebratory burst of rose and gold hearts
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f8bbd0', '#f48fb1', '#f06292', '#ffffff', '#e91e63'],
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className={`letter-page-wrapper ${isOpen ? 'letter-open-page' : 'letter-envelope-closed'}`}>
      {!isOpen ? (
        /* ========================================================
           CLOSED ENVELOPE PRESENTATION
           ======================================================== */
        <div>
          <p className="envelope-instruction-text">
            Tap the envelope to open your heart 💗
          </p>

          <button
            type="button"
            className="envelope-trigger-btn"
            onClick={handleOpenEnvelope}
            aria-label="Tap to open birthday love letter for Cuttu"
            id="btn-open-envelope"
          >
            <div className="envelope-box">
              {/* Postage Stamp */}
              <div className="envelope-stamp" aria-hidden="true">
                <span>💌</span>
                <span className="envelope-stamp-text">23 OCT</span>
              </div>

              {/* Romantic Postmark */}
              <div className="envelope-postmark" aria-hidden="true" />

              {/* Recipient Address */}
              <div className="envelope-address-lines">
                <p className="envelope-address-name">To My Cuttu ❤️</p>
                <p className="envelope-address-sub">Delivered Across The Miles</p>
              </div>

              {/* Envelope Folds & Flap SVG */}
              <svg
                className="envelope-flap-svg"
                viewBox="0 0 320 215"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Left and Right Side Folds */}
                <path d="M0 0 L145 110 L0 215 Z" fill="rgba(244, 143, 177, 0.45)" />
                <path d="M320 0 L175 110 L320 215 Z" fill="rgba(244, 143, 177, 0.4)" />
                {/* Bottom Fold */}
                <path d="M0 215 L160 100 L320 215 Z" fill="rgba(240, 98, 146, 0.35)" />
                {/* Top Flap (Closed over front) */}
                <path
                  d="M0 0 L160 115 L320 0 Z"
                  fill="url(#topFlapGradient)"
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="1"
                />
                <defs>
                  <linearGradient id="topFlapGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fce4ec" />
                    <stop offset="100%" stopColor="#f48fb1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Heart Wax Seal */}
              <div className="envelope-wax-seal" aria-hidden="true">
                <svg
                  className="envelope-wax-seal-heart"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      ) : (
        /* ========================================================
           OPENED LETTER WITH BEACH PHOTO BACKGROUND
           ======================================================== */
        <article className="letter-photo-card" aria-label="Birthday Love Letter">
          {/* Background beach photo filling card with exact proportions */}
          <div className="letter-photo-bg-wrap" aria-hidden="true">
            <img
              src="/images/letter-bg.jpg"
              alt="Us at the beach"
              className="letter-photo-bg-img"
            />
          </div>

          {/* Soft ambient overlay */}
          <div className="letter-photo-overlay" aria-hidden="true" />

          {/* Quick toggle to peek at full photo unobstructed */}
          <button
            type="button"
            className="letter-peek-btn"
            onClick={() => setShowOnlyPhoto((prev) => !prev)}
            aria-label={showOnlyPhoto ? 'Show love letter' : 'View full photo'}
            title={showOnlyPhoto ? 'Show love letter' : 'View full photo'}
          >
            {showOnlyPhoto ? '📜 Read Letter' : '👁️ View Photo'}
          </button>

          {/* Scrollable letter text container */}
          <div className={`letter-photo-content ${showOnlyPhoto ? 'letter-content-hidden' : ''}`}>
            <div className="letter-glass-parchment">
              <p className="letter-paragraph">
                Happiest birthday to my favourite person, my comfort place and my home........
              </p>

              <p className="letter-paragraph">
                i wish i was there with u today..I wish I could hug you so tight, kiss your forehead and tell you how much I love you while holding you close. I hate that we're so far away from each other when all I want is to be with you. Even after talking to you, I still miss you the second we hang up.........
              </p>

              <p className="letter-paragraph">
                I don't want anything big or fancy with you. I just want the little things, sitting next to you, holding your hand, annoying you, stealing kisses and falling asleep in your arms.........
              </p>

              <p className="letter-paragraph">
                I hope you get all the happiness in the world because you deserve it so much. I wish I could be there to celebrate you today and make you feel just how loved you are. If I could wish for one thing, it would be to hold you close right now and never let go....
              </p>

              <p className="letter-paragraph">
                No matter how far away you are, you're still the person I want beside me through everything. If I had to choose again, I'd choose you every single time. I love you more than I can explain, and I can't wait for the day I get to celebrate your birthday in your arms instead of through a screen............
              </p>

              <p className="letter-paragraph-final">
                HAPPY BIRTHDAY, MY LOVE ❤️😭 I MISS YOU SO SO MUCH AND I LOVE YOU MORE THAN YOU'LL EVER KNOW. I WISH I COULD HUG YOU AND KISS YOU RIGHT NOW. SENDING YOU ALL MY LOVE UNTIL I CAN FINALLY BE IN YOUR ARMS. 🫂💋❤️
              </p>

              <div style={{ textAlign: 'center', marginTop: '1.8rem' }}>
                <button
                  type="button"
                  onClick={onNext}
                  className="btn-primary"
                  style={{ width: '100%', maxWidth: '280px' }}
                  id="btn-letter-continue"
                >
                  Continue 💗
                </button>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
