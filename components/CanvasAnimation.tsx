'use client';

import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 192;

export default function CanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const requestRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Adjust standard zero padding based on ezgif format
      const numStr = i.toString().padStart(3, '0');
      img.src = `/frames_hq/ezgif-frame-${numStr}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          drawFrame(0, loadedImages);
        }
      };
      
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (frameIndex: number, imgArray = images) => {
    if (!canvasRef.current || !imgArray[frameIndex]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const img = imgArray[frameIndex];
    
    // We want to crop out the bottom watermark ("veo") from the original video
    const watermarkHeight = 60; 
    const sourceWidth = img.width;
    const sourceHeight = img.height - watermarkHeight;

    // Scale image to cover the canvas and zoom in slightly to hide edges
    const scale = Math.max(rect.width / sourceWidth, rect.height / sourceHeight);
    
    // Slight offset to ensure the cropped bottom is never visible
    const destWidth = sourceWidth * scale;
    const destHeight = sourceHeight * scale;
    const x = (rect.width / 2) - (destWidth / 2);
    // Align image towards bottom or center to maintain the crop out of frame
    const y = (rect.height / 2) - (destHeight / 2);

    ctx.clearRect(0, 0, rect.width, rect.height);
    // Draw the cropped portion: drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(img, 0, 0, sourceWidth, sourceHeight, x, y, destWidth, destHeight);
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // Lock the animation scroll distance strictly to the 500vh Hero section
    const heroScrollDistance = (window.innerHeight * 5) - window.innerHeight;
    const scrollFraction = heroScrollDistance > 0 
      ? Math.min(1, Math.max(0, scrollTop / heroScrollDistance)) 
      : 0;
    
    // Calculate the frame index
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(scrollFraction * FRAME_COUNT))
    );

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => drawFrame(currentFrameRef.current));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => drawFrame(currentFrameRef.current));
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [images]); // Rebind if images array changes

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
