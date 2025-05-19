# Deploying to GitHub Pages

This document outlines the steps to deploy the Admin Dashboard application to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Access to the repository with appropriate permissions
- Node.js and npm installed

## Setup

1. **Update the homepage URL in package.json**

   Replace `[your-github-username]` with your actual GitHub username in the homepage property:

   ```json
   "homepage": "https://your-github-username.github.io/AdysunAdminDashboard"
   ```

2. **Set up GitHub repository secrets (if using GitHub Actions)**

   If you're using GitHub Actions for automated deployment, add the following secrets to your repository (Settings > Secrets and variables > Actions):

   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

## Deployment Options

### Option 1: Automated GitHub Actions Deployment

The repository is set up with GitHub Actions workflow that automatically deploys to GitHub Pages whenever changes are pushed to the main branch.

1. Push your changes to the main branch:

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. GitHub Actions will automatically build and deploy the application
3. Wait for the GitHub Actions workflow to complete (check the Actions tab in your repository)
4. Your site will be available at the URL specified in the homepage property of your package.json

### Option 2: Manual Deployment

You can deploy manually using the provided script:

1. Navigate to the project directory
2. Run the deployment script:

   ```bash
   npm run deploy:script
   ```

   Or run the commands separately:

   ```bash
   npm run build
   npm run deploy
   ```

3. The app will be deployed to the `gh-pages` branch of your repository
4. GitHub Pages will serve the application from this branch
5. Your site will be available at the URL specified in the homepage property of your package.json

## Troubleshooting

### Issue: Static Path Generation

If you encounter issues with dynamic routes not being generated correctly:

1. Update the `scripts/exportPaths.ts` file to include all dynamic routes used in the application
2. Make sure the `exportPathMap` function in `next.config.ts` is correctly configured

### Issue: CSS or JS not loading

If styles or scripts don't load:

1. Check the browser console for 404 errors
2. Verify that the `basePath` and `assetPrefix` in `next.config.ts` are set correctly
3. Make sure the `homepage` URL in `package.json` is correct

### Issue: API or Firebase not working

For apps with backends:

1. Update any API URLs to use absolute paths instead of relative paths
2. Make sure environment variables are properly set in the GitHub repository secrets
3. Consider setting up a separate API service or using serverless functions

## Notes

- Remember that GitHub Pages only serves static content, so server-side rendering won't work
- All API calls must be to external APIs or serverless functions
- The `.nojekyll` file is essential to prevent GitHub Pages from ignoring files that start with underscore 