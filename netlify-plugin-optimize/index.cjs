// Netlify Build Plugin to optimize HTML after build
module.exports = {
  onPostBuild: async ({ utils }) => {
    const fs = require('fs');
    const path = require('path');
    
    const htmlPath = path.join(process.cwd(), 'dist/public/index.html');
    
    console.log('Optimizing HTML for zero render blocking...');
    console.log('Looking for:', htmlPath);
    
    if (!fs.existsSync(htmlPath)) {
      return utils.build.failPlugin('index.html not found at ' + htmlPath);
    }
    
    let html = fs.readFileSync(htmlPath, 'utf-8');
    
    // Find and extract CSS/JS from head
    const cssMatches = [];
    const jsMatches = [];
    
    // Match CSS in head
    html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, (match) => {
      cssMatches.push(match);
      return ''; // Remove from head
    });
    
    // Match JS modules in head
    html = html.replace(/<script[^>]*type="module"[^>]*src="\/assets[^"]*"[^>]*><\/script>/gi, (match) => {
      jsMatches.push(match);
      return ''; // Remove from head
    });
    
    // Insert at end of body
    if (cssMatches.length > 0 || jsMatches.length > 0) {
      const toInject = `
    <!-- Optimized: Resources moved to end of body -->
    ${cssMatches.join('\n    ')}
    ${jsMatches.join('\n    ')}
  </body>`;
      
      html = html.replace('</body>', toInject);
      fs.writeFileSync(htmlPath, html);
      
      console.log(`✅ Moved ${cssMatches.length} CSS and ${jsMatches.length} JS files to end of body`);
    }
    
    // Copy static files
    const filesToCopy = ['robots.txt', 'sitemap.xml', '_headers', '_redirects'];
    for (const file of filesToCopy) {
      const src = path.join(process.cwd(), 'public', file);
      const dest = path.join(process.cwd(), 'dist/public', file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file}`);
      }
    }
  }
};