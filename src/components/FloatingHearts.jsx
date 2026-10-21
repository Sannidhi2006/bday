import React, { useMemo } from 'react';

/**
 * FloatingHearts - Minimal, gentle, slow-moving little hearts
 * Free of flowers, ribbons, sparkles, or stars.
 */
export default function FloatingHearts({ count = 7 }) {
  const hearts = useMemo(() => {
    // Only pure, delicate soft hearts
    const symbols = ['💕', '💗', '💖'];

    return Array.from({ length: count }, (_, i) => {
      // Distribute evenly across screen width with slight organic variation
      const left = (i * (100 / count) + 5) % 94;
      // "lil" small delicate size: 13px to 17px
      const size = 13 + (i % 3) * 2;
      // "moving slowly": 20s to 30s gentle drift
      const duration = 20 + (i % 4) * 2.5;
      // Staggered initial delays
      const delay = (i * 2.5) % 12;
      // Subtle gentle sway
      const driftX = (i % 2 === 0 ? 1 : -1) * (14 + (i % 3) * 6);
      const rot = (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 5);
      const symbol = symbols[i % symbols.length];

      return {
        id: i,
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        driftX: `${driftX}px`,
        rot: `${rot}deg`,
        symbol,
      };
    });
  }, [count]);

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart-item"
          style={{
            left: heart.left,
            fontSize: heart.fontSize,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
            '--drift-x': heart.driftX,
            '--rot': heart.rot,
          }}
        >
          {heart.symbol}
        </span>
      ))}
    </div>
  );
}

