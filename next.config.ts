import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Remove static export for Netlify - it supports SSR
  // output: 'export', // Required for GitHub Pages static deployment
  // basePath: basePath, // For GitHub Pages deployment
  // assetPrefix: basePath, // For GitHub Pages deployment
  // trailingSlash: true, // Makes URLs end with a slash for better compatibility with static hosting
  
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'storage.googleapis.com',
      'lh3.googleusercontent.com',      // Google user avatars
      'localhost',                      // For local development
      'employee-admin-c83e8.appspot.com', // Your specific Firebase Storage bucket
    ],
    unoptimized: false, // Enable image optimization for Netlify
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Note: rewrites don't work with static exports, but we'll leave this commented for reference
  // when deploying to a platform that supports server-side functionality
  /* 
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
  */
};

export default nextConfig;
