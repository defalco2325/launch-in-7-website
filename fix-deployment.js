#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Fix deployment structure by moving files from dist/public to dist root
 * This script addresses the deployment issue where Replit expects index.html
 * at the root of the dist folder, not in a public subfolder.
 */
function fixDeploymentStructure() {
  const distPath = path.join(__dirname, 'dist');
  const publicPath = path.join(distPath, 'public');
  
  console.log('🔧 Fixing deployment structure...');
  
  // Check if dist/public exists
  if (!fs.existsSync(publicPath)) {
    console.log('❌ dist/public directory not found. Run build first.');
    process.exit(1);
  }
  
  try {
    // Read all files in dist/public
    const files = fs.readdirSync(publicPath);
    
    // Move each file from dist/public to dist
    files.forEach(file => {
      const sourcePath = path.join(publicPath, file);
      const targetPath = path.join(distPath, file);
      
      // If target exists, remove it first
      if (fs.existsSync(targetPath)) {
        if (fs.lstatSync(targetPath).isDirectory()) {
          fs.rmSync(targetPath, { recursive: true });
        } else {
          fs.unlinkSync(targetPath);
        }
      }
      
      // Move the file/directory
      fs.renameSync(sourcePath, targetPath);
      console.log(`✅ Moved ${file} to dist root`);
    });
    
    // Remove the empty public directory
    fs.rmdirSync(publicPath);
    console.log('✅ Removed empty dist/public directory');
    
    console.log('🚀 Deployment structure fixed successfully!');
    console.log('📁 index.html is now at dist/index.html');
    
  } catch (error) {
    console.error('❌ Error fixing deployment structure:', error.message);
    process.exit(1);
  }
}

fixDeploymentStructure();