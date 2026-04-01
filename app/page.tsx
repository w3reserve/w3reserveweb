import React from 'react';
import Preloader from '@/components/Preloader';
import BrandShowcase from '@/components/BrandShowcase';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

export default async function Home() {
  const brands = await prisma.brand.findMany({
    include: { products: true }
  });

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Preloader />
      {/* Hero that drops directly into the catalog */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>NUESTRA COLECCIÓN<br/>LIMITADA</h1>
          <p style={styles.subtitle}>SUMÉRGETE EN EL ORIGEN</p>
        </div>
      </section>
      
      <BrandShowcase brands={brands} />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: 'relative',
    height: '30vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    color: '#fff',
  },
  heroContent: {
    textAlign: 'center',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(3rem, 6vw, 6rem)',
    fontWeight: 400,
    letterSpacing: '0.15em',
    marginBottom: '16px',
  },
  subtitle: {
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    letterSpacing: '0.6em', // significantly increased tracking
    textTransform: 'uppercase',
    opacity: 0.7,
  }
};
