#!/usr/bin/env node

/**
 * Deploy to GitHub Pages
 * This wrapper makes the deployment script callable from npm scripts
 * 
 * Usage:
 * npm run deploy                    # Deploy without syncing locales
 * npm run deploy -- --sync-locales  # Deploy with locale sync
 */

const { spawn } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'deploy-github-pages.sh');
const args = process.argv.slice(2);

// Make script executable and run it
const deploy = spawn('bash', [scriptPath, ...args], {
  stdio: 'inherit',
  shell: true,
  cwd: path.dirname(scriptPath)
});

deploy.on('error', (error) => {
  console.error('Failed to start deployment:', error);
  process.exit(1);
});

deploy.on('close', (code) => {
  process.exit(code);
});
