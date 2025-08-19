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
  
  // Convert CSS to non-blocking pattern with preload
  const cssLinks = [];
  html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, (match) => {
    if (match.includes('/assets/')) {
      // Extract href from the link tag
      const hrefMatch = match.match(/href="([^"]+)"/);
      if (hrefMatch) {
        const href = hrefMatch[1];
        // Create non-blocking CSS pattern
        const nonBlockingCss = `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>`;
        cssLinks.push(nonBlockingCss);
        modified = true;
        return ''; // Remove original blocking CSS
      }
    }
    return match;
  });
  
  // Remove JS modules from head and collect them
  const jsScripts = [];
  html = html.replace(/<script[^>]*type="module"[^>]*><\/script>/gi, (match) => {
    if (match.includes('/assets/')) {
      const srcMatch = match.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {
        const jsPath = srcMatch[1];
        
        // FORCE USE OF SMALLEST POSSIBLE BUNDLES
        if (jsPath.includes('index-') && jsPath.endsWith('.js')) {
          const fs = require('fs');
          const assetsDir = path.resolve('dist/public/assets');
          
          try {
            const files = fs.readdirSync(assetsDir);
            
            // Find ALL index files and pick the absolute smallest
            const indexFiles = files
              .filter(f => f.startsWith('index-') && f.endsWith('.js'))
              .map(f => ({
                name: f,
                size: fs.statSync(path.join(assetsDir, f)).size
              }))
              .sort((a, b) => a.size - b.size);
            
            if (indexFiles.length > 0) {
              const smallestFile = indexFiles[0];
              const correctedScript = match.replace(jsPath, `/assets/${smallestFile.name}`);
              jsScripts.push(correctedScript);
              console.log(`🎯 Force using smallest bundle: ${smallestFile.name} (${Math.round(smallestFile.size/1024)}KB)`);
              
              // Also add modulepreload for critical bundles
              if (!html.includes(`modulepreload" href="/assets/${smallestFile.name}"`)) {
                html = html.replace('</head>', `    <link rel="modulepreload" href="/assets/${smallestFile.name}">\n    <link rel="modulepreload" href="/assets/home-${smallestFile.name.split('-')[1]}">\n  </head>`);
              }
            } else {
              jsScripts.push(match);
              console.log(`⚠️ No index files found`);
            }
          } catch (err) {
            jsScripts.push(match);
            console.log(`⚠️ Error: ${err.message}`);
          }
        } else {
          jsScripts.push(match);
        }
        
        // Add modulepreload for critical chunks
        if (jsPath.includes('index-')) {
          const modulePreload = `<link rel="modulepreload" href="${jsPath}">`;
          if (!html.includes(modulePreload)) {
            html = html.replace('</head>', `    ${modulePreload}\n  </head>`);
          }
        }
      }
      modified = true;
      return ''; // Remove from original position
    }
    return match;
  });
  
  if (modified) {
    // Add resource hints and non-blocking CSS to head (after existing preloads) and JS to end of body
    if (cssLinks.length > 0) {
      // Insert resource hints and non-blocking CSS in head
      const criticalCSS = `    <!-- Critical Above-the-Fold CSS for FCP Optimization -->
    <style>
    /* Critical hero section CSS - inline for fastest FCP */
    #root{display:flex;flex-direction:column;min-height:100vh;font-family:'Inter',system-ui,-apple-system,sans-serif}
    .hero-critical{position:relative;min-height:100vh;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#1a1a2e 100%);overflow:hidden;display:flex;align-items:center;justify-content:center}
    .hero-content{position:relative;max-width:72rem;margin:0 auto;padding:5rem 1rem 8rem;display:grid;grid-template-columns:1fr;gap:3rem;align-items:center;min-height:80vh;width:100%}
    @media (min-width:1024px){.hero-content{grid-template-columns:1fr 1fr}}
    .hero-title{font-family:'Poppins',system-ui,-apple-system,sans-serif;font-weight:900;font-size:clamp(2rem,8vw,4rem);color:white;line-height:1.2;margin-bottom:1.5rem;letter-spacing:-0.02em}
    .gradient-text{background:linear-gradient(135deg,#00d4ff 0%,#00b4d8 100%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block}
    .hero-subtitle{color:#d1d5db;font-size:clamp(1.125rem,3vw,1.5rem);line-height:1.6;margin-bottom:2rem;max-width:32rem}
    .cta-button{background:#00d4ff;color:white;padding:1rem 2rem;border-radius:9999px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;transition:all 0.3s ease;border:none;cursor:pointer}
    .cta-button:hover{background:#00b4d8;transform:translateY(-2px)}
    /* Prevent layout shifts */
    *{box-sizing:border-box;font-kerning:none}
    body{margin:0;padding:0;font-family:'Inter',system-ui,-apple-system,sans-serif}
    </style>
    <!-- Performance optimization hints -->
    <link rel="dns-prefetch" href="//netlify.app">
    <link rel="preconnect" href="https://launchin7.netlify.app" crossorigin>
    <!-- Critical font preload to eliminate layout shift -->
    <link rel="preload" href="/assets/poppins-latin-700-normal-Qrb0O0WB.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/assets/inter-latin-400-normal-C38fXH4l.woff2" as="font" type="font/woff2" crossorigin>`;
      
      html = html.replace('</head>', `${criticalCSS}\n    ${cssLinks.join('\n    ')}\n  </head>`);
    }
    
    // Add JS to end of body
    const jsInjection = `
    <!-- JavaScript moved to end of body for performance -->
    ${jsScripts.join('\n    ')}
  </body>`;
    
    html = html.replace('</body>', jsInjection);
    fs.writeFileSync(htmlPath, html);
    console.log(`✅ Optimization complete: Made ${cssLinks.length} CSS non-blocking, moved ${jsScripts.length} JS files`);
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