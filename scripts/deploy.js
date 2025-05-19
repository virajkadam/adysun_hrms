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
    
    // Step 1: Build the Next.js application in standalone mode
    if (!execute('npm run build', 'Building Next.js application')) return;
    
    // Step 2: Create an out directory for GitHub Pages
    const outDir = path.join(process.cwd(), 'out');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    // Step 3: Copy the build output to the out directory
    const buildDir = path.join(process.cwd(), 'build');
    if (fs.existsSync(buildDir)) {
      // Simple copy for demonstration. In a real project, you'd need to properly
      // copy the entire standalone output structure
      execute(`xcopy "${buildDir}" "${outDir}" /E /I /H /Y`, 'Copying build files to out directory');
    }
    
    // Step 4: Make sure the .nojekyll file exists in the output directory
    const nojekyllPath = path.join(outDir, '.nojekyll');
    if (!fs.existsSync(nojekyllPath)) {
      fs.writeFileSync(nojekyllPath, '');
      console.log(`${colors.green}[SUCCESS]${colors.reset} Created .nojekyll file.`);
    }
    
    // Step 5: Create a basic index.html that redirects to the app
    const indexPath = path.join(outDir, 'index.html');
    const indexContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Dashboard</title>
        <meta http-equiv="refresh" content="0;url=./build/index.html">
      </head>
      <body>
        <p>Redirecting to the Admin Dashboard...</p>
      </body>
      </html>
    `;
    fs.writeFileSync(indexPath, indexContent);
    console.log(`${colors.green}[SUCCESS]${colors.reset} Created redirecting index.html file.`);
    
    // Step 6: Deploy to GitHub Pages
    if (!execute('npm run deploy', 'Deploying to GitHub Pages')) return;
    
    console.log(`${colors.green}=== Deployment Completed Successfully ===${colors.reset}`);
    console.log(`${colors.yellow}Your site should be live at: https://santosh-mhetre.github.io/Employee_Admin_Dashboard/${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}[ERROR]${colors.reset} Deployment failed with error:`);
    console.error(error);
    process.exit(1);
  }
}

// Run the deployment
deployToGitHubPages(); 