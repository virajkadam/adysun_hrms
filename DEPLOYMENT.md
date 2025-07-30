# Netlify Deployment Guide

This guide will help you deploy your Next.js Employee Admin Dashboard to Netlify.

## Prerequisites

1. A Netlify account (free at [netlify.com](https://netlify.com))
2. Your project connected to a Git repository (GitHub, GitLab, or Bitbucket)

## Configuration Files

The project is already configured for Netlify deployment with the following files:

### 1. `netlify.toml`
This file contains the build configuration:
- Build command: `npm run build`
- Publish directory: `.next`
- Node.js version: 20
- Next.js plugin for optimal performance

### 2. `next.config.ts`
Updated to work with Netlify:
- Removed static export configuration
- Enabled image optimization
- Configured for server-side rendering

### 3. `package.json`
Updated build scripts for Netlify deployment.

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Connect your repository:**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository: `Employee_Admin_Dashboard-1`

2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy site"

3. **Set up environment variables:**
   - Go to Site settings > Environment variables
   - Add your Firebase configuration:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize your site:**
   ```bash
   netlify init
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## Environment Variables

Make sure to set these environment variables in your Netlify dashboard:

### Required Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Optional Configuration
```
NEXT_PUBLIC_APP_NAME=Employee Admin Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Build Process

The build process includes:

1. **Dependencies installation:** `npm install`
2. **Build:** `npm run build` (creates `.next` directory)
3. **Next.js plugin:** Optimizes the build for Netlify
4. **Deployment:** Serves the built application

## Troubleshooting

### Common Issues

1. **Build fails with TypeScript errors:**
   - Ensure all TypeScript errors are fixed before deploying
   - Run `npm run lint` locally to check for issues

2. **Environment variables not working:**
   - Check that all Firebase environment variables are set in Netlify
   - Ensure variable names start with `NEXT_PUBLIC_` for client-side access

3. **Images not loading:**
   - Verify image domains are configured in `next.config.ts`
   - Check that image URLs are accessible

4. **Firebase authentication issues:**
   - Ensure Firebase project is properly configured
   - Check that authentication methods are enabled in Firebase console

### Build Logs

To view build logs:
1. Go to your Netlify dashboard
2. Click on your site
3. Go to "Deploys" tab
4. Click on any deploy to view logs

## Custom Domain (Optional)

To add a custom domain:

1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (up to 24 hours)

## Continuous Deployment

Netlify automatically deploys when you push to your main branch. To configure:

1. Go to Site settings > Build & deploy
2. Configure branch deployments
3. Set up branch protection if needed

## Performance Optimization

The configuration includes:

- **Caching headers** for static assets
- **Next.js plugin** for optimal performance
- **Image optimization** enabled
- **Automatic redirects** for SPA routing

## Support

For issues with:
- **Netlify deployment:** Check Netlify documentation
- **Next.js configuration:** Refer to Next.js docs
- **Firebase integration:** Check Firebase console and docs 