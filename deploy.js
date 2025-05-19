// Custom deployment script for GitHub Pages with dynamic routes
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting GitHub Pages deployment...');

// Set production environment
process.env.NODE_ENV = 'production';

try {
  // 1. Run the Next.js build
  console.log('Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. Create .nojekyll file to prevent GitHub from ignoring files that begin with an underscore
  const nojekyllPath = path.join(__dirname, 'out', '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('Created .nojekyll file');

  // 3. Create a 404.html page that redirects to the index
  const notFoundPath = path.join(__dirname, 'out', '404.html');
  const notFoundContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - Redirecting</title>
  <script>
    // Single Page Application handling for GitHub Pages
    // Redirects all requests to the index.html
    sessionStorage.setItem('redirect', window.location.pathname);
    window.location.href = '/Employee_Admin_Dashboard/';
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
  `;
  fs.writeFileSync(notFoundPath, notFoundContent);
  console.log('Created 404.html file for SPA routing');

  // 4. Deploy to GitHub Pages
  console.log('Deploying to GitHub Pages...');
  execSync('npm run deploy', { stdio: 'inherit' });

  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
} 