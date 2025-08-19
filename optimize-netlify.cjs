#!/usr/bin/env node
// Simple optimization script for Netlify - uses CommonJS
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve('dist/public/index.html');

console.log('=== NETLIFY BUILD OPTIMIZATION ===');
console.log('Looking for HTML at:', htmlPath);

try {
  if (!fs.existsSync(htmlPath)) {
    console.error('HTML not found, skipping optimization');
    process.exit(0);
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');
  let modified = false;
  
  // Remove CSS from head and collect them
  const cssLinks = [];
  html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, (match) => {
    if (match.includes('/assets/')) {
      cssLinks.push(match);
      modified = true;
      return ''; // Remove from original position
    }
    return match;
  });
  
  // Remove JS modules from head and collect them
  const jsScripts = [];
  html = html.replace(/<script[^>]*type="module"[^>]*>/gi, (match) => {
    if (match.includes('/assets/')) {
      jsScripts.push(match);
      modified = true;
      return ''; // Remove from original position
    }
    return match;
  });
  
  if (modified) {
    // Add to end of body
    const injection = `
    <!-- Resources moved to end of body for performance -->
    ${cssLinks.join('\n    ')}
    ${jsScripts.join('\n    ')}
  </body>`;
    
    html = html.replace('</body>', injection);
    fs.writeFileSync(htmlPath, html);
    console.log(`✅ Optimization complete: Moved ${cssLinks.length} CSS and ${jsScripts.length} JS files`);
  } else {
    console.log('No resources to optimize');
  }
  
  // Copy static files
  const staticFiles = ['robots.txt', 'sitemap.xml', '_headers', '_redirects'];
  staticFiles.forEach(file => {
    const src = path.resolve('public', file);
    const dest = path.resolve('dist/public', file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file}`);
    }
  });
  
  console.log('=== OPTIMIZATION COMPLETE ===');
} catch (error) {
  console.error('Optimization error:', error);
  // Don't fail the build
  process.exit(0);
}