import type { NextConfig } from "next";
import generateStaticPaths from "./scripts/exportPaths";

// Get the repository name from package.json if deploying to GitHub Pages
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const basePath = process.env.NODE_ENV === 'production' ? `/${repo}` : '';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Required for GitHub Pages static deployment
  basePath: basePath, // For GitHub Pages deployment
  assetPrefix: basePath, // For GitHub Pages deployment
  trailingSlash: true, // Makes URLs end with a slash for better compatibility with static hosting
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'storage.googleapis.com',
      'lh3.googleusercontent.com',      // Google user avatars
      'localhost',                      // For local development
      'employee-admin-c83e8.appspot.com', // Your specific Firebase Storage bucket
    ],
    unoptimized: true, // Required for GitHub Pages
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Generate static paths for dynamic routes
  // This is necessary for GitHub Pages because it doesn't support server-side dynamic routes
  async exportPathMap(defaultPathMap) {
    // Merge the default path map with our custom paths
    return {
      ...defaultPathMap,
      ...(await generateStaticPaths())
    };
  },
  async rewrites() {
    // Get the document generator URL from environment variables or use defaults
    const docGenUrl = process.env.DOCUMENT_GENERATOR_URL || 
      (process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3001'
        : 'https://document-generator.yourdomain.com');
    
    return [
      {
        source: '/document-generator/:path*',
        destination: `${docGenUrl}/:path*`
      }
    ]
  }
};

export default nextConfig;
