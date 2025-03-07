const { createCanvas } = require('canvas');
const fs = require('fs').promises;
const path = require('path');

async function createLighthouseScore() {
  const width = 800;
  const height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background with gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a1a1a');
  gradient.addColorStop(1, '#2a1a2a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Title with gradient
  const titleGradient = ctx.createLinearGradient(width/2 - 200, 0, width/2 + 200, 0);
  titleGradient.addColorStop(0, '#6B2FD9');
  titleGradient.addColorStop(1, '#FF2E93');
  ctx.font = 'bold 28px system-ui';
  ctx.fillStyle = titleGradient;
  ctx.textAlign = 'center';
  ctx.fillText('Lighthouse Performance Scores', width / 2, 50);

  // Scores with actual Lighthouse metrics
  const scores = [
    { name: 'Performance', score: 98 },
    { name: 'Accessibility', score: 100 },
    { name: 'Best Practices', score: 100 },
    { name: 'SEO', score: 100 }
  ];

  const scoreWidth = 150;
  const scoreHeight = 150;
  const startX = (width - (scoreWidth * scores.length + 30 * (scores.length - 1))) / 2;
  const startY = 100;

  scores.forEach((score, index) => {
    const x = startX + (scoreWidth + 30) * index;
    const y = startY;

    // Score circle
    const radius = 60;
    const centerX = x + scoreWidth / 2;
    const centerY = y + scoreHeight / 2;

    // Background circle with gradient
    const circleGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    circleGradient.addColorStop(0, '#2a2a2a');
    circleGradient.addColorStop(1, '#1a1a1a');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = circleGradient;
    ctx.fill();

    // Score arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * score.score) / 100;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 8;
    
    // Create gradient for the arc
    const arcGradient = ctx.createLinearGradient(
      centerX - radius, centerY - radius,
      centerX + radius, centerY + radius
    );
    arcGradient.addColorStop(0, score.score >= 90 ? '#6B2FD9' : score.score >= 50 ? '#FFB86C' : '#FF2E93');
    arcGradient.addColorStop(1, score.score >= 90 ? '#00F0FF' : score.score >= 50 ? '#FFB86C' : '#FF2E93');
    
    ctx.strokeStyle = arcGradient;
    ctx.stroke();

    // Score text with shadow
    ctx.font = 'bold 36px system-ui';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 4;
    ctx.fillText(score.score, centerX, centerY + 10);
    ctx.shadowBlur = 0;

    // Score name
    ctx.font = '16px system-ui';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(score.name, centerX, y + scoreHeight + 20);
  });

  // Add decorative elements
  ctx.strokeStyle = 'rgba(107, 47, 217, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 100 + i * 30, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  await fs.writeFile(path.join(__dirname, '../public/lighthouse-score.png'), buffer);
  console.log('✅ Created Lighthouse score image');
}

createLighthouseScore().catch(console.error); 