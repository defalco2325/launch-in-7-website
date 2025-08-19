#!/usr/bin/env node
// Post-build script compatible with Netlify - uses CommonJS when needed
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../dist/public/index.html');

console.log('Looking for HTML file at:', htmlPath);

if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extract CSS link tags from head
  const cssLinkRegex = /<link[^>]*rel="stylesheet"[^>]*>/gi;
  const cssLinks = html.match(cssLinkRegex) || [];
  console.log('Found CSS links:', cssLinks.length);
  
  // Extract script tags from head
  const scriptRegex = /<script[^>]*type="module"[^>]*src="\/assets[^"]*"[^>]*><\/script>/gi;
  const scripts = html.match(scriptRegex) || [];
  console.log('Found script tags:', scripts.length);
  
  if (cssLinks.length === 0 && scripts.length === 0) {
    console.log('No resources to move - they may already be at end of body');
    process.exit(0);
  }
  
  // Remove CSS and scripts from head
  cssLinks.forEach(link => {
    html = html.replace(link, '');
  });
  scripts.forEach(script => {
    html = html.replace(script, '');
  });
  
  // Add them to end of body
  const bodyEndTag = '</body>';
  const resourcesToInject = `
    <!-- Resources moved to end of body to eliminate render blocking -->
    ${cssLinks.join('\n    ')}
    ${scripts.join('\n    ')}
  ${bodyEndTag}`;
  
  html = html.replace(bodyEndTag, resourcesToInject);
  
  // Write the optimized HTML
  fs.writeFileSync(htmlPath, html);
  console.log('✅ Build optimized: CSS and JS moved to end of body');
} else {
  console.error('❌ HTML file not found at:', htmlPath);
  console.log('Current directory:', __dirname);
  console.log('Files in dist/public:', fs.readdirSync(path.resolve(__dirname, '../dist/public')));
  process.exit(1);
}