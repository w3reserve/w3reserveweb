'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brand}>W3 RESERVE</div>
        <div style={styles.links}>
          <a href="#" style={styles.link}>Política de Privacidad</a>
          <span style={styles.separator}>|</span>
          <a href="#" style={styles.link}>Política de Cookies</a>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} W3 Reserve. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    padding: '40px 20px',
    borderTop: '1px solid #222',
    fontFamily: 'var(--font-main)',
    position: 'relative',
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  brand: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.2rem',
    letterSpacing: '0.15em',
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    fontSize: '0.9rem',
    opacity: 0.7,
  },
  separator: {
    opacity: 0.3,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },
  copyright: {
    fontSize: '0.8rem',
    opacity: 0.4,
    marginTop: '10px',
  }
};
