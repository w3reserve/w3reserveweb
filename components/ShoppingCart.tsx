'use client';

import React from 'react';
import { useCart } from './CartContext';
import Image from 'next/image';

export default function ShoppingCart() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div style={styles.backdrop} onClick={() => setIsCartOpen(false)} />
      
      <div style={styles.drawer}>
        <div style={styles.header}>
          <h2 style={styles.title}>SU CARRITO</h2>
          <button style={styles.closeBtn} onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>

        {items.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Su carrito está vacío.</p>
            <button style={styles.continueBtn} onClick={() => setIsCartOpen(false)}>Continuar Explorando</button>
          </div>
        ) : (
          <div style={styles.cartContent}>
            <div style={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.itemImageContainer}>
                    <Image src={item.image} alt={item.name} layout="fill" objectFit="contain" />
                  </div>
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemBrand}>{item.brand}</p>
                    <div style={styles.quantityControls}>
                      <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span style={styles.qtySpan}>{item.quantity}</span>
                      <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div style={styles.itemPriceColumn}>
                    <p style={styles.itemPrice}>{item.price.toFixed(2)} €</p>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.footer}>
              <div style={styles.totalRow}>
                <span>Subtotal</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
              <p style={styles.taxesInfo}>Impuestos incluidos. Los gastos de envío se calculan en la pantalla de pago.</p>
              <button style={styles.checkoutBtn}>CONTINUAR AL PAGO</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(3px)',
    zIndex: 9999,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '450px',
    height: '100vh',
    backgroundColor: '#0a0a0a',
    borderLeft: '1px solid rgba(255,255,255,0.1)',
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
    animation: 'slideIn 0.3s ease-out forwards',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 40px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.2rem',
    letterSpacing: '0.1em',
    color: '#fff',
    fontWeight: 400,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '2rem',
    cursor: 'pointer',
    opacity: 0.5,
    transition: 'opacity 0.2s',
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    opacity: 0.5,
    gap: '20px',
  },
  continueBtn: {
    padding: '12px 24px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    fontFamily: 'var(--font-main)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  cartContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  itemsList: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  cartItem: {
    display: 'flex',
    gap: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  itemImageContainer: {
    position: 'relative',
    width: '70px',
    height: '100px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '4px',
  },
  itemDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '8px',
  },
  itemName: {
    fontFamily: 'var(--font-serif)',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 400,
    margin: 0,
  },
  itemBrand: {
    fontFamily: 'var(--font-main)',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: 0,
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: 'auto',
    border: '1px solid rgba(255,255,255,0.2)',
    width: 'fit-content',
    padding: '4px 8px',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    opacity: 0.7,
  },
  qtySpan: {
    color: '#fff',
    fontFamily: 'var(--font-main)',
    fontSize: '0.85rem',
    minWidth: '20px',
    textAlign: 'center',
  },
  itemPriceColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  itemPrice: {
    color: '#fff',
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    margin: 0,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    fontFamily: 'var(--font-main)',
    fontSize: '0.75rem',
    textDecoration: 'underline',
    padding: 0,
  },
  footer: {
    padding: '30px 40px',
    backgroundColor: '#050505',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#fff',
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    marginBottom: '15px',
  },
  taxesInfo: {
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'var(--font-main)',
    fontSize: '0.75rem',
    lineHeight: 1.5,
    marginBottom: '25px',
  },
  checkoutBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    fontFamily: 'var(--font-main)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 0.2s',
  }
};
