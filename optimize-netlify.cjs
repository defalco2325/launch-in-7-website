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
  html = html.replace(/<script[^>]*type="module"[^>]*><\/script>/gi, (match) => {
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
  
  // Copy static files to ensure they're available
  const staticFiles = ['robots.txt', 'sitemap.xml'];
  staticFiles.forEach(file => {
    const src = path.resolve('public', file);
    const dest = path.resolve('dist/public', file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file}`);
    }
  });

  // Create _headers file for Netlify caching
  const headersContent = `# Cache static assets for 1 year
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.js
  Cache-Control: public, max-age=31536000, immutable  
/*.css
  Cache-Control: public, max-age=31536000, immutable
/*.woff2
  Cache-Control: public, max-age=31536000, immutable
/*.woff
  Cache-Control: public, max-age=31536000, immutable

# Security headers
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin`;

  const redirectsContent = `# SPA fallback with SEO file exceptions
/robots.txt  /robots.txt  200
/sitemap.xml /sitemap.xml 200
/*           /index.html  200`;

  fs.writeFileSync(path.resolve('dist/public', '_headers'), headersContent);
  fs.writeFileSync(path.resolve('dist/public', '_redirects'), redirectsContent);
  console.log('Created _headers and _redirects files');
  
  console.log('=== OPTIMIZATION COMPLETE ===');
} catch (error) {
  console.error('Optimization error:', error);
  // Don't fail the build
  process.exit(0);
}