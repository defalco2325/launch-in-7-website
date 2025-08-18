#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Complete build script for deployment
 * This script runs the full build process and fixes the deployment structure
 */
function buildForDeployment() {
  console.log('🏗️  Starting deployment build...\n');
  
  try {
    // Step 1: Run the standard build
    console.log('1️⃣  Building frontend and backend...');
    execSync('vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
      stdio: 'inherit',
      cwd: __dirname
    });
    console.log('✅ Build completed\n');
    
    // Step 2: Fix deployment structure
    console.log('2️⃣  Fixing deployment structure...');
    
    const distPath = path.join(__dirname, 'dist');
    const publicPath = path.join(distPath, 'public');
    
    if (fs.existsSync(publicPath)) {
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
        console.log(`   ✅ Moved ${file} to dist root`);
      });
      
      // Remove the empty public directory
      fs.rmdirSync(publicPath);
      console.log('   ✅ Removed empty dist/public directory');
    }
    
    // Step 3: Verify the structure
    console.log('\n3️⃣  Verifying deployment structure...');
    const distContents = fs.readdirSync(distPath);
    const hasIndexHtml = distContents.includes('index.html');
    const hasServerJs = distContents.includes('index.js');
    
    console.log('📁 Contents of dist directory:');
    distContents.forEach(item => {
      const itemPath = path.join(distPath, item);
      const isDir = fs.lstatSync(itemPath).isDirectory();
      console.log(`   ${isDir ? '📁' : '📄'} ${item}`);
    });
    
    if (hasIndexHtml && hasServerJs) {
      console.log('\n🎉 Deployment build successful!');
      console.log('✅ index.html found at dist/index.html');
      console.log('✅ server bundle found at dist/index.js');
      console.log('\n🚀 Your app is ready for deployment on Replit!');
      console.log('💡 Recommended: Use Autoscale deployment for this full-stack app');
    } else {
      console.log('\n⚠️  Warning: Missing required files:');
      if (!hasIndexHtml) console.log('   ❌ index.html not found');
      if (!hasServerJs) console.log('   ❌ index.js (server) not found');
    }
    
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildForDeployment();