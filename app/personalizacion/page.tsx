'use client';

import React, { useState } from 'react';
import Preloader from '@/components/Preloader';

export default function PersonalizacionPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    details: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/personalization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error en el envío');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', details: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main style={styles.main}>
      <Preloader />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Crea Algo Único</h1>
          <p style={styles.subtitle}>
            Ediciones exclusivas, regalos de empresa y celebraciones a medida. 
            Personalizamos nuestras botellas y packaging para que lleven tu sello.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={styles.gallerySection}>
        <div style={{...styles.gridContainer, gridTemplateColumns: 'repeat(3, 1fr)'}}>
          <div style={styles.galleryItem}>
            <div style={styles.imageWrapper}>
              <img src="/kumbra_3.jpg" alt="Botella Personalizada Kumbra Yachts" style={styles.image} />
            </div>
            <h3 style={styles.itemTitle}>Botellas con Marca</h3>
            <p style={styles.itemDesc}>Tu logotipo grabado en una botella premium. Ideal para eventos corporativos y regalos de empresa.</p>
          </div>
          <div style={styles.galleryItem}>
            <div style={styles.imageWrapper}>
              <img src="/kumbra_1.jpg" alt="Gift Box Personalizado Kumbra Yachts" style={styles.image} />
            </div>
            <h3 style={styles.itemTitle}>Gift Box Exclusivo</h3>
            <p style={styles.itemDesc}>Set completo con botella y copas en estuche premium personalizado con tu imagen de marca.</p>
          </div>
          <div style={styles.galleryItem}>
            <div style={styles.imageWrapper}>
              <img src="/kumbra_2.jpg" alt="Experiencia Premium Kumbra Yachts" style={styles.image} />
            </div>
            <h3 style={styles.itemTitle}>Experiencia Premium</h3>
            <p style={styles.itemDesc}>Presentaciones únicas para momentos inolvidables. Cada detalle pensado para impresionar.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section style={styles.formSection}>
        <div style={styles.formContainer}>
          <h2 style={styles.formHeading}>Solicita tu Personalización</h2>
          <p style={styles.formSubheading}>
            Cuéntanos tu idea. Nuestro equipo de diseño se pondrá en contacto contigo 
            para dar vida a tu proyecto con el máximo cuidado y calidad.
          </p>

          {status === 'success' && (
            <div style={styles.successMessage}>
              ¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.
            </div>
          )}

          {status === 'error' && (
            <div style={styles.errorMessage}>
              Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <input 
                type="text" 
                name="name" 
                placeholder="Nombre completo *" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <input 
                type="email" 
                name="email" 
                placeholder="Correo electrónico *" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                style={styles.input}
              />
            </div>
            <div style={styles.inputRow}>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Teléfono" 
                value={formData.phone} 
                onChange={handleChange} 
                style={{...styles.input, flex: 1}}
              />
              <input 
                type="text" 
                name="company" 
                placeholder="Empresa (Opcional)" 
                value={formData.company} 
                onChange={handleChange} 
                style={{...styles.input, flex: 1}}
              />
            </div>
            <div style={styles.inputGroup}>
              <textarea 
                name="details" 
                placeholder="Cuéntanos sobre tu idea de personalización (cantidad aproximada, fecha, diseño deseado)... *" 
                value={formData.details} 
                onChange={handleChange} 
                required 
                rows={5}
                style={styles.textarea}
              />
            </div>
            <button 
              type="submit" 
              style={{...styles.submitBtn, opacity: status === 'loading' ? 0.7 : 1}}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'ENVIAR SOLICITUD'}
            </button>
          </form>
        </div>
      </section>


    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    backgroundColor: '#0a0a0a',
    color: '#fff',
    minHeight: '100vh',
    overflowX: 'hidden',
  },
  heroSection: {
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 5vw 60px',
    background: 'linear-gradient(to bottom, #000, #0a0a0a)',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: 400,
    letterSpacing: '0.1em',
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'var(--font-main)',
    fontSize: '1.2rem',
    lineHeight: 1.6,
    opacity: 0.8,
  },
  gallerySection: {
    padding: '5vw',
    backgroundColor: '#0a0a0a',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  galleryItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: '3/4',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#111',
    borderRadius: '4px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  itemTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    letterSpacing: '0.05em',
    marginTop: '1rem',
  },
  itemDesc: {
    fontFamily: 'var(--font-main)',
    opacity: 0.7,
    lineHeight: 1.5,
  },
  formSection: {
    padding: '10vw 5vw',
    backgroundColor: '#111',
  },
  formContainer: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  formHeading: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
  formSubheading: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: '3rem',
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '16px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
    transition: 'border-color 0.3s',
  },
  submitBtn: {
    padding: '20px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    fontFamily: 'var(--font-serif)',
    fontSize: '1rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  successMessage: {
    padding: '20px',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    border: '1px solid rgba(0, 255, 0, 0.3)',
    color: '#4ade80',
    marginBottom: '20px',
    textAlign: 'center',
    borderRadius: '4px',
  },
  errorMessage: {
    padding: '20px',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    border: '1px solid rgba(255, 0, 0, 0.3)',
    color: '#f87171',
    marginBottom: '20px',
    textAlign: 'center',
    borderRadius: '4px',
  }
};
