/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // For development, we want a complete application with SSR
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Base path for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/Employee_Admin_Dashboard' : '',
  // Required for GitHub Pages
  trailingSlash: process.env.NODE_ENV === 'production',
  // Disable strict mode to enable more compatibility options
  reactStrictMode: false,
};

export default nextConfig; 