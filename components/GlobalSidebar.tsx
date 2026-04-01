'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';

export default function GlobalSidebar() {
  const pathname = usePathname();
  const { items, setIsCartOpen } = useCart();
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <aside style={styles.sidebar} className="mobile-sidebar">
        <div style={styles.topSection}>
          <Link href="/" style={styles.logo} className="mobile-sidebar-logo">W3</Link>
        </div>

        <nav style={styles.nav} className="mobile-sidebar-nav">
          <Link href="/historia" style={{...styles.navItem, color: pathname === '/historia' ? '#fff' : 'rgba(255,255,255,0.4)'}} className="mobile-sidebar-nav-item">
            <span style={styles.navText}>Historia</span>
          </Link>
          <a href="/#tienda" style={{...styles.navItem, color: pathname === '/' ? '#fff' : 'rgba(255,255,255,0.4)'}} className="mobile-sidebar-nav-item">
            <span style={styles.navText}>Tienda</span>
          </a>
          <Link href="/b2b" style={{...styles.navItem, color: pathname === '/b2b' ? '#fff' : 'rgba(255,255,255,0.4)'}} className="mobile-sidebar-nav-item">
            <span style={styles.navText}>B2B</span>
          </Link>
          <Link href="/experiencias" style={{...styles.navItem, color: pathname === '/experiencias' ? '#fff' : 'rgba(255,255,255,0.4)'}} className="mobile-sidebar-nav-item">
            <span style={styles.navText}>Catas</span>
          </Link>
        </nav>

        <div style={styles.bottomSection}>
           <button style={styles.cartButton} onClick={() => setIsCartOpen(true)}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
               <line x1="3" y1="6" x2="21" y2="6"></line>
               <path d="M16 10a4 4 0 0 1-8 0"></path>
             </svg>
             {totalItems > 0 && (
               <span style={styles.cartBadge}>{totalItems}</span>
             )}
           </button>
        </div>
      </aside>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '80px', // Persistent narrow sidebar
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRight: '1px solid rgba(255,255,255,0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '40px 0',
  },
  topSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: '0.1em',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    marginTop: '-40px', // slight visual balance
  },
  navItem: {
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.4)',
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)', // Read from bottom to top
    fontFamily: 'var(--font-main)',
    fontSize: '0.85rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
  },
  navText: {
    display: 'inline-block',
  },
  bottomSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  cartButton: {
    position: 'relative',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
  },
  cartBadge: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};
