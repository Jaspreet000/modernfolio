const fs = require('fs').promises;
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gif-encoder-2');

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function createGif(images, outputPath, options = {}) {
  const {
    width = 800,
    height = 450,
    delay = 500,
    quality = 10,
    repeat = 0
  } = options;

  // Check if all input images exist
  for (const imagePath of images) {
    if (!(await fileExists(imagePath))) {
      throw new Error(`Input image not found: ${imagePath}`);
    }
  }

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const encoder = new GIFEncoder(width, height);
  
  encoder.setDelay(delay);
  encoder.setQuality(quality);
  encoder.setRepeat(repeat);
  encoder.start();

  for (const imagePath of images) {
    const image = await loadImage(imagePath);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Calculate scaling to fit while maintaining aspect ratio
    const scale = Math.min(width / image.width, height / image.height);
    const scaledWidth = image.width * scale;
    const scaledHeight = image.height * scale;
    
    // Center the image
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;
    
    ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
    encoder.addFrame(ctx);
  }

  encoder.finish();
  await fs.writeFile(outputPath, encoder.out.getData());
}

async function createFeatureGifs() {
  const featuresDir = path.join(__dirname, '../public/features');
  
  try {
    // Create 3D interaction GIF
    await createGif(
      [
        path.join(featuresDir, '3d-1.png'),
        path.join(featuresDir, '3d-2.png')
      ],
      path.join(featuresDir, '3d.gif'),
      { delay: 1000 }
    );
    console.log('✅ Created 3D interaction GIF');

    // Create responsive design GIF
    await createGif(
      [
        path.join(featuresDir, 'responsive-1.png'),
        path.join(featuresDir, 'responsive-2.png'),
        path.join(featuresDir, 'responsive-3.png')
      ],
      path.join(featuresDir, 'responsive.gif'),
      { delay: 1500 }
    );
    console.log('✅ Created responsive design GIF');

    // Create performance GIF
    await createGif(
      [path.join(featuresDir, 'performance-1.png')],
      path.join(featuresDir, 'performance.gif'),
      { delay: 2000 }
    );
    console.log('✅ Created performance GIF');

    // Clean up PNG files
    const pngFiles = [
      '3d-1.png', '3d-2.png',
      'responsive-1.png', 'responsive-2.png', 'responsive-3.png',
      'performance-1.png'
    ];

    for (const file of pngFiles) {
      const filePath = path.join(featuresDir, file);
      if (await fileExists(filePath)) {
        await fs.unlink(filePath);
      }
    }
    console.log('✅ Cleaned up temporary PNG files');
  } catch (error) {
    console.error('Error creating GIFs:', error);
    throw error;
  }
}

createFeatureGifs().catch(console.error); 