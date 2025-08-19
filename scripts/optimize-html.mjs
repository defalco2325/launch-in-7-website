#!/usr/bin/env node
// Post-build script to eliminate render blocking by moving CSS to end of body
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, '../dist/public/index.html');

if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extract CSS link tags from head
  const cssLinkRegex = /<link[^>]*rel="stylesheet"[^>]*>/gi;
  const cssLinks = html.match(cssLinkRegex) || [];
  
  // Extract script tags from head
  const scriptRegex = /<script[^>]*type="module"[^>]*src="\/assets[^"]*"[^>]*><\/script>/gi;
  const scripts = html.match(scriptRegex) || [];
  
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
  console.log('✅ Build optimized: CSS and JS moved to end of body to eliminate render blocking');
} else {
  console.error('❌ HTML file not found at:', htmlPath);
  process.exit(1);
}