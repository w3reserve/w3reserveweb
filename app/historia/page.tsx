'use client';

import React, { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import CanvasAnimation from '@/components/CanvasAnimation';

export default function HistoriaPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const heroScrollDistance = (window.innerHeight * 5) - window.innerHeight;
      const progress = heroScrollDistance > 0 
        ? Math.min(1, Math.max(0, currentScroll / heroScrollDistance)) 
        : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBeatStyle = (start: number, end: number) => {
    const duration = end - start;
    const fadeWindow = duration * 0.25; 
    let opacity = 0;
    let transformY = 20;

    if (scrollProgress >= start && scrollProgress <= end) {
      if (scrollProgress < start + fadeWindow) {
        const fadeProgress = (scrollProgress - start) / fadeWindow;
        opacity = fadeProgress;
        transformY = 20 * (1 - fadeProgress);
      } else if (scrollProgress > end - fadeWindow) {
        const fadeProgress = (end - scrollProgress) / fadeWindow;
        opacity = fadeProgress;
        transformY = -20 * (1 - fadeProgress);
      } else {
        opacity = 1;
        transformY = 0;
      }
    } else if (scrollProgress > end) {
      transformY = -20;
    }

    return {
      opacity,
      transform: `translateY(${transformY}px)`,
      transition: 'opacity 0.1s linear, transform 0.1s linear',
      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
    } as React.CSSProperties;
  };

  return (
    <main style={styles.main}>
      <Preloader />
      
      {/* 500vh Scrollytelling Animation Block */}
      <div style={{ height: '500vh', position: 'relative', zIndex: 1 }}>
        <CanvasAnimation />
        <div style={styles.beatsContainer}>
          <section style={{ ...styles.beatSection, ...getBeatStyle(0, 0.20) }}>
            <h1 style={styles.titleBeat}>W3 RESERVE</h1>
            <p style={styles.subtitleBeat}>"Nuestra filosofía: El origen de una visión artesanal."</p>
          </section>
          <section style={{ ...styles.beatSection, ...getBeatStyle(0.25, 0.45) }}>
            <h2 style={styles.titleBeat}>EXCELENCIA PARA TODOS</h2>
            <div style={{ display: 'flex', gap: '40px', marginTop: '16px' }}>
              <p style={styles.subtitleBeat}>"Compra directa. Experiencia sencilla y clara."</p>
              <p style={styles.subtitleBeat}>"Soluciones exclusivas para restaurantes y empresas."</p>
            </div>
          </section>
          <section style={{ ...styles.beatSection, ...getBeatStyle(0.50, 0.75) }}>
            <h2 style={styles.titleBeat}>SUMÉRGETE EN EL ORIGEN</h2>
            <p style={styles.subtitleBeat}>"Catas guiadas, eventos privados y experiencias gastronómicas."</p>
          </section>
          <section style={{ ...styles.beatSection, ...getBeatStyle(0.80, 1.0) }}>
            <h2 style={styles.titleBeat}>CREA ALGO ÚNICO</h2>
            <p style={styles.subtitleBeat}>"Ediciones especiales y regalos a medida. Tu sello en W3 Reserve."</p>
          </section>
        </div>
      </div>

      {/* Chapter 1: The Origins (Starts naturally after the 500vh scroll) */}
      <section style={{...styles.editorialSection, position: 'relative', zIndex: 10}}>
        <div style={styles.editorialGridContainer}>
          <div style={styles.textColumn}>
            <span style={styles.chapterNumber}>01</span>
            <h2 style={styles.heading}>Tradición, compromiso y excelencia</h2>
            <p style={styles.paragraph}>
              Arraigados en la tradición y el compromiso, las Caves Jaume Giró i Giró son 
              herederas de una historia que se remonta a mediados del siglo XIX. Fundadas 
              oficialmente por <strong>Ramón Giró i Mata en 1926</strong>, en el corazón de Sant Sadurní d’Anoia, 
              las cavas son un reflejo de un patrimonio único, con una filosofía artesanal basada 
              en la calidad y la sostenibilidad.
            </p>
            <p style={styles.paragraph}>
              Con un legado que combina pasión y excelencia, nos hemos convertido en un referente 
              en el mundo del cava. Nuestros productos nacen de un cuidado minucioso por la tierra, 
              elaborados con un proceso artesanal que respeta el medio ambiente y realza la esencia 
              del Penedés. Cada botella es una muestra viva de nuestra dedicación y amor por el vino.
            </p>
          </div>
          <div style={styles.imageColumn}>
            <img src="/historia_1.png" alt="Historic Origin" style={styles.coverImage} />
          </div>
        </div>
      </section>

      {/* Chapter 2: The Process (Inverted) */}
      <section style={{...styles.editorialSection, backgroundColor: '#f9f9f9', color: '#000', position: 'relative', zIndex: 10}}>
        <div style={{...styles.editorialGridContainer, flexDirection: 'row-reverse'}}>
          <div style={styles.textColumn}>
            <span style={styles.chapterNumberBlack}>02</span>
            <h2 style={styles.headingBlack}>El Arte de la Crianza</h2>
            <p style={{...styles.paragraph, color: '#333'}}>
              El proceso de crianza se extiende entre los 18 y hasta 120 meses en rima, 
              en íntimo contacto con sus propias levaduras, aportando complejidad y una textura inigualable. 
              La fermentación se realiza en frío, favoreciendo la conservación de los aromas más frescos y florales.
            </p>
            <p style={{...styles.paragraph, color: '#333'}}>
              Nuestros vinos muestran un perfil equilibrado (11,5% - 11,95% Vol.). 
              Presentan finísimas burbujas, revelando aromas a manzana, melocotón, piña y frutos del bosque. 
              En boca, la frescura y la cremosidad danzan con una acidez que aporta vivacidad a los paladares más exigentes.
            </p>
          </div>
          <div style={styles.imageColumn}>
             <img src="/historia_2.png" alt="Crianza Process" style={styles.coverImage} />
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer style={{...styles.footer, position: 'relative', zIndex: 10}}>
        <h3 style={styles.footerTitle}>W3 RESERVE</h3>
        <p style={styles.footerContact}>Tel.: 611 406 315 - Andreu Dagas | 636 621 194 - Albert Perea</p>
      </footer>
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
  beatsContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    pointerEvents: 'none', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  beatSection: {
    position: 'absolute',
    textAlign: 'left',
    width: '100%',
    maxWidth: '600px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    bottom: '10%',
    left: '5%',
    background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
    borderRadius: '20px 0 0 20px',
  },
  titleBeat: {
    fontFamily: 'var(--font-serif)',
    fontSize: '3rem',
    fontWeight: 400,
    letterSpacing: '0.15em',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  subtitleBeat: {
    fontSize: '1.25rem',
    fontWeight: 300,
    opacity: 0.8,
    lineHeight: 1.5,
  },
  editorialSection: {
    padding: '10vw 5vw',
    backgroundColor: '#000',
    color: '#fff',
  },
  editorialGridContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    gap: '8vw',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textColumn: {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  chapterNumber: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    color: 'rgba(255,255,255,0.3)',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    paddingBottom: '1rem',
    display: 'inline-block',
    width: '50px',
  },
  chapterNumberBlack: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    color: 'rgba(0,0,0,0.3)',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    paddingBottom: '1rem',
    display: 'inline-block',
    width: '50px',
  },
  heading: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
    lineHeight: 1.2,
    marginBottom: '1rem',
    fontWeight: 400,
  },
  headingBlack: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
    lineHeight: 1.2,
    marginBottom: '1rem',
    fontWeight: 400,
    color: '#000',
  },
  paragraph: {
    fontFamily: 'var(--font-main)',
    fontSize: '1.1rem',
    lineHeight: 1.8,
    opacity: 0.8,
    maxWidth: '600px',
  },
  imageColumn: {
    flex: '1 1 400px',
    height: '70vh',
    minHeight: '400px',
    position: 'relative',
    overflow: 'hidden',
  },
  elegantPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0a0a0a',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  elegantDarkPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
    border: '1px solid rgba(0,0,0,0.1)',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  footer: {
    padding: '6vw 5vw',
    textAlign: 'center',
    backgroundColor: '#000',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  footerTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
  },
  footerContact: {
    fontFamily: 'var(--font-main)',
    fontSize: '0.9rem',
    opacity: 0.5,
    letterSpacing: '0.05em',
  }
};
