import React, { useState } from 'react';
import { X } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error enviando la solicitud');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">
          <X size={24} color="#fff" />
        </button>
        
        <h2 style={styles.title}>Solicitud Exclusiva</h2>
        <p style={styles.subtitle}>Déjanos tus datos para personalizar una botella de W3 Reserve o agendar una cata privada.</p>
        
        {status === 'success' ? (
          <div style={styles.successMessage}>
            <p>Gracias por tu interés.</p>
            <p>Un embajador de W3 Reserve te contactará pronto.</p>
          </div>
        ) : (
          <form style={styles.form} onSubmit={handleSubmit}>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="Nombre Completo" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input 
              style={styles.input} 
              type="email" 
              placeholder="Correo Electrónico" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea 
              style={{ ...styles.input, height: '100px', resize: 'none' }} 
              placeholder="Detalles sobre su personalización o cata sugerida"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button 
              type="submit" 
              style={{ ...styles.submitBtn, opacity: status === 'loading' ? 0.7 : 1 }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
            {status === 'error' && <p style={styles.errorText}>Ha ocurrido un error. Inténtalo de nuevo.</p>}
          </form>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'relative',
    width: '90%',
    maxWidth: '500px',
    backgroundColor: 'rgba(20, 20, 20, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem',
    fontWeight: 400,
    letterSpacing: '0.1em',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 300,
    opacity: 0.7,
    lineHeight: 1.5,
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'var(--font-serif)',
    fontSize: '1.2rem',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.3s ease',
  },
  successMessage: {
    color: '#fff',
    fontFamily: 'var(--font-serif)',
    fontSize: '1.2rem',
    lineHeight: 1.6,
    padding: '40px 0',
  },
  errorText: {
    color: '#ff4444',
    fontSize: '0.85rem',
    marginTop: '8px',
  }
};
