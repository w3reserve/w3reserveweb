'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Wait for window load or minimum time
    const timer = setTimeout(() => {
      setFade(true); // Start fading out
      setTimeout(() => setComplete(true), 1500); // 1.5s fade transition
    }, 2000); // 2 second mock load time (enough for initial frames to load)

    return () => clearTimeout(timer);
  }, []);

  if (complete) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 1.5s ease',
        opacity: fade ? 0 : 1,
        pointerEvents: complete ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#ffffff',
          animation: 'pulse 2s infinite',
        }}
      >
        W3 Reserve
      </div>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
