import React, { useState, useEffect, useRef } from 'react';

export default function MemoriesPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const closeBtnRef = useRef(null);

  // Lightbox keyboard & scroll-lock handlers
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <div className="memories-page-container">

      {/* ========================================================
          PINTEREST SCRAPBOOK COLLAGE FRAME
          ======================================================== */}
      <div className="pinterest-scrapbook-wrapper" role="region" aria-label="Our heart memories collage">
        <article
          className="pinterest-photo-frame"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Click to enlarge our heart photo collage"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
        >
          {/* Scrapbook washi tape decorations on top corners */}
          <div className="pinterest-washi-tape washi-left" aria-hidden="true" />
          <div className="pinterest-washi-tape washi-right" aria-hidden="true" />

          {/* Cute Pinterest scrapbook badge stamp */}
          <div className="pinterest-scrapbook-badge" aria-hidden="true">
            <span className="badge-heart">💖</span>
            <span className="badge-text">forever & always</span>
          </div>

          {/* Main Heart Collage Image */}
          <div className="pinterest-image-wrapper">
            <img
              src="/images/heart-collage.jpg"
              alt="Heart photo collage of our sweetest memories"
              className="pinterest-collage-img"
              loading="lazy"
            />
            {/* Click to expand hint overlay */}
            <div className="pinterest-zoom-hint" aria-hidden="true">
              <span>🔍 Click to expand</span>
            </div>
          </div>
        </article>
      </div>

      {/* ========================================================
          LIGHTBOX MODAL FOR FULL-SCREEN VIEWING
          ======================================================== */}
      {isLightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLightboxOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged memory photo view"
        >
          <div className="lightbox-dialog">
            <button
              ref={closeBtnRef}
              type="button"
              className="lightbox-close-btn"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close enlarged photo"
            >
              ✕
            </button>
            <img
              src="/images/heart-collage.jpg"
              alt="Heart photo collage full view"
              className="lightbox-image"
            />
          </div>
        </div>
      )}

      {/* ========================================================
          BOTTOM MESSAGE: "I LOVE YOU DARLING"
          ======================================================== */}
      <div className="memories-final-message-box">
        <p className="memories-final-text pinterest-final-text">
          I LOVE YOU DARLING <span className="final-beating-heart">❤️</span>
        </p>
      </div>
    </div>
  );
}
