# Deploying the Admin Dashboard to GitHub Pages

This guide explains how to deploy the Next.js Admin Dashboard to GitHub Pages.

## Understanding the Challenges

Next.js applications with dynamic routes (like `/employees/[id]`) face challenges when deployed as static sites on GitHub Pages:

1. **Static Generation**: GitHub Pages only supports static websites.
2. **Dynamic Routes**: Paths like `/employees/[id]` require all possible values of `[id]` to be known at build time.
3. **Client-side Navigation**: For a good UX, we need client-side navigation between pages.

## Our Solution

The deployment strategy uses:

1. **Static Export**: Using Next.js's `output: 'export'` to generate static HTML.
2. **BasePath Configuration**: Configuring the app for the GitHub Pages subdirectory.
3. **Client-side Data Fetching**: Loading actual data on the client side.
4. **Fallback Static Pages**: Generating placeholder pages for dynamic routes.
5. **Custom 404 Page**: Redirecting unknown routes to the main application.

## Deployment Steps

1. **Prepare your code**:
   - Ensure all dynamic routes have corresponding `generateStaticParams()` functions.
   - Make sure client-side data fetching is robust with proper loading states.

2. **Deploy to GitHub Pages**:
   ```bash
   # Install dependencies if needed
   npm install
   
   # Deploy to GitHub Pages
   npm run deploy
   ```

   This runs:
   - `predeploy`: Executes `deploy.js` script that builds the app and prepares it for GitHub Pages
   - `deploy`: Uses `gh-pages` to push the `out` directory to the `gh-pages` branch

3. **Verify the deployment**:
   - Check your GitHub repository settings to ensure GitHub Pages is enabled
   - Visit `https://[your-username].github.io/Employee_Admin_Dashboard`

## Troubleshooting

If you encounter issues:

1. **"Page X is missing generateStaticParams()"**:
   - Add `generateStaticParams()` to the page or import it from another file.

2. **"Cannot find module 'X'"**:
   - Check for missing dependencies in package.json.

3. **Page not found on GitHub**:
   - Ensure GitHub Pages is publishing from the `gh-pages` branch.
   - Check if the `.nojekyll` file exists to prevent GitHub from ignoring underscore files.

4. **Cannot access API endpoints**:
   - Remember that GitHub Pages only serves static files. All API calls must be made client-side.

## Local Testing

To test the static export locally before deploying:

```bash
# Build the static export
npm run build

# Serve the static files
npx serve out
``` 