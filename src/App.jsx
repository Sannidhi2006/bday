import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import PasscodePage from './components/PasscodePage';
import BirthdayWelcomePage from './components/BirthdayWelcomePage';
import CakePage from './components/CakePage';
import LoveLetterPage from './components/LoveLetterPage';
import ShayariPage from './components/ShayariPage';
import VirtualHugPage from './components/VirtualHugPage';
import MemoriesPage from './components/MemoriesPage';

export default function App() {
  // Page state from 1 to 7
  const [page, setPage] = useState(1);

  const totalPages = 7;

  // Render current page component
  const renderCurrentPage = () => {
    switch (page) {
      case 1:
        return <PasscodePage onUnlock={() => setPage(2)} />;
      case 2:
        return (
          <BirthdayWelcomePage
            onNext={() => setPage(3)}
            onPrev={() => setPage(1)}
          />
        );
      case 3:
        return (
          <CakePage
            onNext={() => setPage(4)}
            onPrev={() => setPage(2)}
          />
        );
      case 4:
        return (
          <LoveLetterPage
            onNext={() => setPage(5)}
            onPrev={() => setPage(3)}
          />
        );
      case 5:
        return (
          <ShayariPage
            onNext={() => setPage(6)}
            onPrev={() => setPage(4)}
          />
        );
      case 6:
        return (
          <VirtualHugPage
            onNext={() => setPage(7)}
            onPrev={() => setPage(5)}
          />
        );
      case 7:
        return (
          <MemoriesPage
            onPrev={() => setPage(6)}
            onRestart={() => setPage(1)}
          />
        );
      default:
        return <PasscodePage onUnlock={() => setPage(2)} />;
    }
  };

  return (
    <main
      className={`app-container ${page === 2 || page === 5 ? 'page-welcome-mode' : ''} ${page === 4 ? 'page-letter-mode' : ''}`}
      style={page === 4 ? {
        '--letter-bg': `url("${import.meta.env.BASE_URL}images/envelope-bg.jpg")`,
        '--letter-bg-blur': `url("${import.meta.env.BASE_URL}images/envelope-bg-blur.jpg")`,
      } : undefined}
    >
      {/* Gentle slow floating hearts layer (pointer-events: none) */}
      <FloatingHearts count={7} />

      {/* Elegant 7-dot Heart Progress Indicator */}
      <nav className="progress-bar-container" aria-label="Surprise Chapters">
        {Array.from({ length: totalPages }, (_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === page;
          const isCompleted = stepNumber < page;

          return (
            <div
              key={stepNumber}
              className={`progress-dot ${isActive ? 'active' : ''} ${
                isCompleted ? 'completed' : ''
              }`}
              title={`Chapter ${stepNumber}`}
              aria-label={`Step ${stepNumber} of ${totalPages}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <svg
                viewBox="0 0 24 24"
                className="progress-dot-icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          );
        })}
      </nav>

      {/* Dynamic Page Fade Wrapper */}
      <div
        key={page}
        className={`page-fade-wrapper ${
          page === 2 || page === 5 ? 'fullscreen-fade-wrapper' : page === 7 ? 'gallery-fade-wrapper' : ''
        }`}
      >
        {renderCurrentPage()}
      </div>

      {/* Subtle Footer (hidden on Page 2, Page 5, and Page 7 as per requirements) */}
      {page !== 2 && page !== 5 && page !== 7 && (
        <footer className="app-footer">
          <p>Made with all my heart for Cuttu • 23rd October 💖</p>
        </footer>
      )}
    </main>
  );
}

