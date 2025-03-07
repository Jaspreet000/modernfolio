const { spawn } = require('child_process');
const path = require('path');

async function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const process = spawn('node', [scriptPath], {
      stdio: 'inherit'
    });

    process.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script exited with code ${code}`));
      }
    });
  });
}

async function generateAssets() {
  console.log('🔍 Capturing screenshots...');
  await runScript(path.join(__dirname, 'capture-screenshots.js'));
  
  console.log('🎨 Creating GIFs...');
  await runScript(path.join(__dirname, 'create-gifs.js'));
  
  console.log('📊 Generating Lighthouse score...');
  await runScript(path.join(__dirname, 'create-lighthouse-score.js'));
  
  console.log('✨ Assets generated successfully!');
}

generateAssets().catch(console.error); 