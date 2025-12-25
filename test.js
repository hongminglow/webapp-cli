#!/usr/bin/env node

// Simple test script to verify the CLI works
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

async function testCLI() {
  console.log(chalk.blue('🧪 Testing webapp-template-cli...'));
  
  const testDir = 'test-generated-app';
  const currentDir = process.cwd();
  
  try {
    // Clean up any existing test directory
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
    
    console.log(chalk.yellow('📦 Creating test application...'));
    
    // Run the CLI to create a test app
    execSync(`node src/index.js ${testDir}`, { 
      stdio: 'inherit',
      cwd: currentDir 
    });
    
    console.log(chalk.green('✅ Test application created successfully!'));
    
    // Verify key files exist
    const requiredFiles = [
      'package.json',
      'src/App.tsx',
      'src/main.tsx',
      'src/components/Layout.tsx',
      'src/pages/Home.tsx',
      'src/pages/About.tsx',
      'src/stores/appStore.ts',
      'src/router/index.tsx',
      '.env',
      'README.md'
    ];
    
    console.log(chalk.yellow('🔍 Verifying generated files...'));
    
    for (const file of requiredFiles) {
      const filePath = path.join(testDir, file);
      if (await fs.pathExists(filePath)) {
        console.log(chalk.green(`✓ ${file}`));
      } else {
        console.log(chalk.red(`✗ ${file} - MISSING`));
      }
    }
    
    console.log(chalk.green('🎉 CLI test completed!'));
    console.log(chalk.blue(`📁 Test application available in: ${testDir}/`));
    console.log(chalk.gray('To run the test app:'));
    console.log(chalk.gray(`  cd ${testDir}`));
    console.log(chalk.gray('  npm install'));
    console.log(chalk.gray('  npm run dev'));
    
  } catch (error) {
    console.error(chalk.red('❌ Test failed:'), error.message);
    process.exit(1);
  }
}

// Run the test if this file is executed directly
console.log('Starting test...');
testCLI().catch(console.error);

export { testCLI };