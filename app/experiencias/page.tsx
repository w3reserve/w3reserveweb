'use client';

import React, { useState } from 'react';
import Preloader from '@/components/Preloader';

export default function ExperienciasPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: 1,
    message: ''
  });
  const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', date: '', guests: 1, message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main style={styles.main}>
      <Preloader />
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>EXPERIENCIAS<br/>SENSORIALES</h1>
          <p style={styles.subtitle}>EL ORIGEN DEL CAVA A SU ALCANCE</p>
        </div>
      </section>

      <section style={styles.content}>
        <div style={styles.grid}>
          <div style={styles.textBlock}>
            <span style={styles.number}>01</span>
            <h2 style={styles.heading}>Visita Origen</h2>
            <p style={styles.paragraph}>
              Un recorrido inmersivo por nuestras bodegas históricas en Sant Sadurní d’Anoia. 
              Descubra el proceso de crianza centenario, el misterio de las cavas subterráneas 
              y culmine con una cata guiada de 3 Reservas acompañados de gastronomía local.
            </p>
            
            <div style={styles.formContainer}>
              {status === 'success' ? (
                <p style={styles.successMessage}>Su reserva ha sido confirmada formalmente. Le enviaremos los detalles.</p>
              ) : (
                <form style={styles.form} onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nombre Completo" 
                    style={styles.input} 
                  />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Correo Electrónico" 
                    style={styles.input} 
                  />
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      style={{...styles.input, flex: 1}} 
                    />
                    <input 
                      type="number" 
                      min="1"
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                      placeholder="Personas" 
                      style={{...styles.input, width: '100px'}} 
                    />
                  </div>
                  <button type="submit" disabled={status === 'loading'} style={styles.btn}>
                    {status === 'loading' ? 'PROCESANDO...' : 'RESERVAR PLAZA'}
                  </button>
                  {status === 'error' && <p style={styles.errorMessage}>Error de conexión. Inténtelo de nuevo.</p>}
                </form>
              )}
            </div>
          </div>
          
          <div style={styles.imageBlock}>
             <div style={styles.placeholderImg}></div>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    backgroundColor: '#000',
    color: '#fff',
    minHeight: '100vh',
    overflowX: 'hidden',
  },
  hero: {
    position: 'relative',
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111', // Solid premium background without AI imagery
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '0 20px',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(3rem, 6vw, 6rem)',
    lineHeight: 1.1,
    letterSpacing: '0.05em',
    marginBottom: '2rem',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'var(--font-main)',
    fontSize: 'clamp(0.8rem, 1.2vw, 1.2rem)',
    letterSpacing: '0.3em',
    opacity: 0.7,
  },
  content: {
    padding: '10vw 5vw',
  },
  grid: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    gap: '8vw',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textBlock: {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2rem',
  },
  number: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    color: 'rgba(255,255,255,0.3)',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    paddingBottom: '1rem',
    display: 'inline-block',
    width: '50px',
  },
  heading: {
    fontFamily: 'var(--font-serif)',
    fontSize: '3rem',
    fontWeight: 400,
  },
  paragraph: {
    fontFamily: 'var(--font-main)',
    fontSize: '1.1rem',
    lineHeight: 1.8,
    opacity: 0.8,
  },
  formContainer: {
    width: '100%',
    marginTop: '20px',
    backgroundColor: '#050505',
    padding: '40px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    padding: '12px 10px',
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    outline: 'none',
  },
  btn: {
    marginTop: '20px',
    padding: '16px 32px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    fontFamily: 'var(--font-main)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.3s, color 0.3s',
  },
  imageBlock: {
    flex: '1 1 400px',
    height: '600px',
  },
  placeholderImg: {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/fachada.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  successMessage: {
    color: '#4CAF50',
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    padding: '20px',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid rgba(76, 175, 80, 0.3)',
  },
  errorMessage: {
    color: '#f44336',
    fontFamily: 'var(--font-main)',
    fontSize: '0.9rem',
    marginTop: '10px',
  }
};
