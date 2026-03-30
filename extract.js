const ffmpegPath = require('ffmpeg-static');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const videoPath = path.join(process.env.HOME, 'Downloads', 'Product_midspin_ingredient_burst_delpmaspu_.mp4');
const outDir = path.join(__dirname, 'public', 'frames_hq');

// Clear existing frames
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

console.log('Extracting from:', videoPath);

try {
  // Extracting all native frames (24fps) to maximize smoothness
  // Scale to 1920 to maintain high resolution
  // q:v 1 for maximum JPEG quality
  const args = [
    '-i', videoPath,
    '-vf', 'scale=1920:-1',
    '-q:v', '1',
    path.join(outDir, 'ezgif-frame-%03d.jpg')
  ];
  
  execFileSync(ffmpegPath, args, { stdio: 'inherit' });
  
  const files = fs.readdirSync(outDir).filter(f => f.endsWith('.jpg'));
  console.log(`Extraction complete! Extracted ${files.length} frames.`);
} catch (e) {
  console.error('Error during extraction:', e.message);
}
