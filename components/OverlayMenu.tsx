'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function OverlayMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>W3 RESERVE</div>
        <button 
          style={styles.hamburger} 
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <div style={styles.line}></div>
          <div style={styles.line}></div>
          <div style={styles.line}></div>
        </button>
      </header>

      <div style={{
          ...styles.overlay,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <button 
          style={styles.closeBtn} 
          onClick={() => setIsOpen(false)}
          aria-label="Close Menu"
        >
          &times;
        </button>
        <nav style={styles.nav}>
          <Link href="/historia" style={styles.link} onClick={() => setIsOpen(false)}>Historia</Link>
          <a href="/#tienda" style={styles.link} onClick={() => setIsOpen(false)}>Tienda (B2C)</a>
          <a href="#" style={styles.link} onClick={() => setIsOpen(false)}>Profesional (B2B)</a>
          <a href="#" style={styles.link} onClick={() => setIsOpen(false)}>Experiencias y Catas</a>
          <a href="#" style={styles.link} onClick={() => setIsOpen(false)}>Personalización</a>
        </nav>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '24px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  hamburger: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '8px',
  },
  line: {
    width: '32px',
    height: '2px',
    backgroundColor: 'var(--foreground)',
    borderRadius: '2px',
    transition: '0.3s',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    zIndex: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.4s ease',
  },
  closeBtn: {
    position: 'absolute',
    top: '32px',
    right: '40px',
    background: 'transparent',
    border: 'none',
    color: 'var(--foreground)',
    fontSize: '3rem',
    cursor: 'pointer',
    lineHeight: 1,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
  },
  link: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.5rem',
    fontWeight: 400,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    transition: 'color 0.4s ease, transform 0.4s ease',
  }
};
