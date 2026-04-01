'use client';
import React from 'react';
import Link from 'next/link';

export type Product = {
  id: string;
  name: string;
  details: string;
  imageUrl: string;
  price: number;
};

export type Brand = {
  id: string;
  name: string;
  origin: string;
  description: string;
  products: Product[];
};

export default function BrandShowcase({ brands }: { brands: Brand[] }) {
  if (!brands || brands.length === 0) return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Sin Productos</h2>
    </div>
  );

  return (
    <section id="tienda" style={styles.container} className="mobile-padding">
      <div style={styles.brandList} className="mobile-gap">
        {brands.map((brand) => (
          <div key={brand.id} style={styles.brandSection} className="mobile-gap">
            <div style={styles.brandHeader}>
              <h3 style={styles.brandName} className="mobile-brand-title">{brand.name}</h3>
              <span style={styles.origin} className="mobile-brand-origin">{brand.origin}</span>
            </div>
            
            <div style={styles.productGrid} className="mobile-grid">
              {brand.products.map(product => (
                <Link 
                  href={`/producto/${product.id}`} 
                  key={product.id} 
                  style={styles.productLink}
                >
                  <div style={styles.productCard}>
                    <div style={styles.imageWrapper} className="mobile-image-wrapper">
                      <img src={product.imageUrl} alt={product.name} style={styles.productImage} className="mobile-product-img" />
                    </div>
                    <div style={styles.productInfo}>
                       <h4 style={styles.productName} className="mobile-product-name-catalog">{product.name}</h4>
                       <span style={styles.productPrice} className="mobile-product-price-catalog">{product.price.toFixed(2)} €</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    // Solid white background to override the black body background when scrolled down
    backgroundColor: '#ffffff',
    color: '#000000',
    position: 'relative',
    zIndex: 10, // Places this container explicitly above the fixed Canvas (zIndex: 0)
    padding: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    maxWidth: '800px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '3.5rem',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '24px',
  },
  sectionSubtitle: {
    fontFamily: 'var(--font-main)',
    fontSize: '1.2rem',
    opacity: 0.6,
    letterSpacing: '0.05em',
  },
  brandList: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '120px',
  },
  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
  },
  brandHeader: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  brandName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '3rem',
    marginBottom: '8px',
  },
  origin: {
    fontFamily: 'var(--font-main)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '0.85rem',
    opacity: 0.5,
    marginBottom: '24px',
    display: 'block',
  },
  description: {
    fontFamily: 'var(--font-main)',
    fontSize: '1.1rem',
    lineHeight: 1.8,
    opacity: 0.8,
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '60px',
  },
  productLink: {
    textDecoration: 'none',
    color: '#000',
    display: 'block',
    transition: 'transform 0.3s ease',
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
  imageWrapper: {
    height: '350px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#fafafa', // Subtle background for the bottle to float
    padding: '20px',
    borderRadius: '4px',
  },
  productImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    filter: 'drop-shadow(0px 15px 20px rgba(0,0,0,0.08))',
    transition: 'transform 0.4s ease',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  productName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.4rem',
    fontWeight: 400,
    letterSpacing: '0.05em',
  },
  productPrice: {
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    fontWeight: 300,
    opacity: 0.8,
  }
};
