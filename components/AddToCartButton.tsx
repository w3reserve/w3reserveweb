'use client';

import React from 'react';
import { useCart } from './CartContext';

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
  }
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button 
      style={styles.addBtn}
      onClick={() => addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.imageUrl,
        quantity: 1
      })}
    >
      Añadir al Carrito ({product.price.toFixed(2)} €)
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  addBtn: {
    padding: '20px 40px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    fontFamily: 'var(--font-main)',
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    marginTop: '40px',
    transition: 'background-color 0.3s ease',
  }
};
