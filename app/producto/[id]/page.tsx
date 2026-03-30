import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import Preloader from '@/components/Preloader';

// Generate static params if optimizing for build, but dynamically fetching is fine.
// This is a Server Component.

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { brand: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <main style={styles.main}>
      <Preloader />
      
      <div style={styles.container}>
        {/* Left Column: Huge Image */}
        <div style={styles.imageCol}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={styles.hugeImage}
          />
        </div>

        {/* Right Column: Details */}
        <div style={styles.detailsCol}>
          <span style={styles.brandName}>{product.brand.name}</span>
          <h1 style={styles.productName}>{product.name}</h1>
          <p style={styles.price}>{product.price.toFixed(2)} €</p>
          
          <div style={styles.divider}></div>
          
          <div style={styles.descriptionBlock}>
            <p style={styles.descriptionText}>{product.details}</p>
          </div>

          <div style={styles.metadataBlock}>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Origen:</span>
              <span style={styles.metaValue}>{product.brand.origin}</span>
            </div>
          </div>

          {/* Client side Add to Cart Wrapper */}
          <AddToCartButton 
            product={{
              id: product.id,
              name: product.name,
              brand: product.brand.name,
              price: product.price,
              imageUrl: product.imageUrl
            }}
          />
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    backgroundColor: '#fff',
    color: '#000',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '120px 20px 60px',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '60px',
  },
  imageCol: {
    flex: '1 1 500px',
    height: '70vh',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    padding: '40px',
  },
  hugeImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    filter: 'drop-shadow(0px 30px 40px rgba(0,0,0,0.15))',
  },
  detailsCol: {
    flex: '1 1 500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 0',
  },
  brandName: {
    fontFamily: 'var(--font-main)',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '10px',
    display: 'block',
  },
  productName: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
    fontWeight: 400,
    lineHeight: 1.1,
    marginBottom: '20px',
  },
  price: {
    fontFamily: 'var(--font-main)',
    fontSize: '1.5rem',
    fontWeight: 300,
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#eaeaea',
    margin: '40px 0',
  },
  descriptionBlock: {
    marginBottom: '40px',
  },
  descriptionText: {
    fontFamily: 'var(--font-main)',
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: '#333',
  },
  metadataBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderTop: '1px solid #eaeaea',
    borderBottom: '1px solid #eaeaea',
    padding: '20px 0',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-main)',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  metaLabel: {
    color: '#888',
  },
  metaValue: {
    color: '#000',
    fontWeight: 500,
  }
};
