'use client';
import React, { useState, useEffect } from 'react';

export default function AgeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isVerified = sessionStorage.getItem('w3_age_verified');
    if (!isVerified) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('w3_age_verified', 'true');
    setShow(false);
    document.body.style.overflow = 'auto';
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>W3 RESERVE</h2>
        <p style={styles.text}>
          Para visitar nuestra tienda, debes ser mayor de edad en tu país de residencia.
          <br /><br />
          ¿Eres mayor de 18 años?
        </p>
        <div style={styles.buttonGroup}>
          <button style={{...styles.btn, ...styles.btnAccept}} onClick={handleAccept}>
            SÍ, SOY MAYOR DE 18
          </button>
          <button style={{...styles.btn, ...styles.btnDecline}} onClick={handleDecline}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(10px)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#000',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '60px 40px',
    maxWidth: '500px',
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'var(--font-main)',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem',
    marginBottom: '20px',
    letterSpacing: '0.1em',
  },
  text: {
    fontSize: '1rem',
    lineHeight: 1.6,
    opacity: 0.8,
    marginBottom: '40px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  btn: {
    padding: '16px 24px',
    fontSize: '0.9rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
  },
  btnAccept: {
    backgroundColor: '#fff',
    color: '#000',
  },
  btnDecline: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.3)',
  }
};
