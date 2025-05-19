// Custom deployment script for GitHub Pages with dynamic routes
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Clean previous build
console.log('Cleaning previous build...');
try {
  fs.rmSync(path.join(__dirname, 'out'), { recursive: true, force: true });
  fs.rmSync(path.join(__dirname, '.next'), { recursive: true, force: true });
} catch (error) {
  console.log('No previous build found or error cleaning:', error.message);
}

// Build the application
console.log('Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Create a .nojekyll file to prevent GitHub Pages from using Jekyll processing
fs.writeFileSync(path.join(__dirname, 'out', '.nojekyll'), '');

// Create a simple 404.html that redirects to index.html
const notFoundContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting...</title>
  <script>
    // Redirect to the homepage
    window.location.href = window.location.origin + '/Employee_Admin_Dashboard';
  </script>
</head>
<body>
  <p>Redirecting to the homepage...</p>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'out', '404.html'), notFoundContent);

console.log('Successfully prepared for GitHub Pages deployment!');
console.log('You can now push the "out" directory to your gh-pages branch.'); 