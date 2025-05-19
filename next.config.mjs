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
  // For GitHub Pages deployment with a static export
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Set the base path for GitHub Pages
  basePath: '/Employee_Admin_Dashboard',
  // Use trailing slashes for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig; 