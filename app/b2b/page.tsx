'use client';

import React, { useState } from 'react';
import Preloader from '@/components/Preloader';

export default function B2BPage() {
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ company: '', contactName: '', email: '', message: '' });
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
      <section style={styles.section}>
        <div style={styles.container}>
          <h1 style={styles.title}>DIVISIÓN PROFESIONAL</h1>
          <p style={styles.subtitle}>
            Una alianza estratégica para la alta gastronomía y el canal HORECA.
            Distribuimos la excelencia de Jaume Giró i Giró y Cayetano del Pino.
          </p>
          
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Solicitar Catálogo B2B</h2>
            {status === 'success' ? (
              <p style={styles.successMessage}>Su solicitud ha sido recibida. Nuestro equipo se pondrá en contacto a la mayor brevedad.</p>
            ) : (
              <form style={styles.form} onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Nombre de la Empresa / Restaurante" 
                  style={styles.input} 
                />
                <input 
                  type="text" 
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  placeholder="Persona de Contacto" 
                  style={styles.input} 
                />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Correo Electrónico Corporativo" 
                  style={styles.input} 
                />
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Mensaje o Consulta" 
                  rows={4} 
                  style={styles.input}
                />
                <button type="submit" disabled={status === 'loading'} style={styles.submitBtn}>
                  {status === 'loading' ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'}
                </button>
                {status === 'error' && <p style={styles.errorMessage}>Ocurrió un error. Por favor inténtelo de nuevo.</p>}
              </form>
            )}
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
  },
  section: {
    padding: '150px 5vw',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
  },
  subtitle: {
    fontFamily: 'var(--font-main)',
    fontSize: '1.2rem',
    opacity: 0.7,
    lineHeight: 1.6,
    marginBottom: '60px',
  },
  formContainer: {
    backgroundColor: '#050505',
    padding: '60px 40px',
    border: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'left',
  },
  formTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem',
    marginBottom: '30px',
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
    padding: '15px 0',
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
  },
  submitBtn: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    fontFamily: 'var(--font-main)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: 600,
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
