const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

// Helper function to execute commands with pretty output
function execute(command, message) {
  console.log(`${colors.blue}[INFO]${colors.reset} ${message}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message} completed successfully.`);
    return true;
  } catch (error) {
    console.error(`${colors.red}[ERROR]${colors.reset} ${message} failed.`);
    console.error(error.message);
    return false;
  }
}

// Main deployment function
async function deployToGitHubPages() {
  try {
    console.log(`${colors.blue}=== GitHub Pages Deployment Script ===${colors.reset}`);
    
    // Step 1: Build the Next.js application
    if (!execute('npm run build', 'Building Next.js application')) return;
    
    // Step 2: Make sure the .nojekyll file exists in the output directory
    const nojekyllPath = path.join(process.cwd(), 'out', '.nojekyll');
    if (!fs.existsSync(nojekyllPath)) {
      fs.writeFileSync(nojekyllPath, '');
      console.log(`${colors.green}[SUCCESS]${colors.reset} Created .nojekyll file.`);
    }
    
    // Step 3: Deploy to GitHub Pages using gh-pages
    if (!execute('npm run deploy', 'Deploying to GitHub Pages')) return;
    
    console.log(`${colors.green}=== Deployment Completed Successfully ===${colors.reset}`);
    console.log(`${colors.yellow}Your site should be live at the URL specified in your package.json 'homepage' property.${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}[ERROR]${colors.reset} Deployment failed with error:`);
    console.error(error);
    process.exit(1);
  }
}

// Run the deployment
deployToGitHubPages(); 