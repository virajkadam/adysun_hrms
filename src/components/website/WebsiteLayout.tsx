'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface WebsiteLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function WebsiteLayout({ children, title, description }: WebsiteLayoutProps) {
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setIsIndustriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Made sticky */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <img 
                  src="/assets/adysunventures_logo.png" 
                  alt="Adysun Ventures Logo" 
                  className="w-8 h-8"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">ADYSUN VENTURES</span>
                  <span className="text-sm text-gray-500 -mt-1">Inspire. Imagine. Implement.</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link href="/about-us" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </Link>
                <Link href="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Services
                </Link>
                <Link href="/partners" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Partners
                </Link>
                <Link href="/technologies" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Technologies
                </Link>
                
                {/* Industries Dropdown */}
                <div className="relative" ref={industriesRef}>
                  <button
                    onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                  >
                    Industries
                    <svg className={`ml-1 w-4 h-4 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isIndustriesOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <Link 
                          href="/industries/ecommerce" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsIndustriesOpen(false)}
                        >
                          E-Commerce
                        </Link>
                        <Link 
                          href="/industries/transportation" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsIndustriesOpen(false)}
                        >
                          Transportation
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link href="/careers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Careers
                </Link>
                <Link href="/clients" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Clients
                </Link>
                <Link href="/contact-us" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/about-us" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/services" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Services
                </Link>
                <Link href="/partners" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Partners
                </Link>
                <Link href="/technologies" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Technologies
                </Link>
                <Link href="/industries" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Industries
                </Link>
                <Link href="/careers" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Careers
                </Link>
                <Link href="/clients" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Clients
                </Link>
                <Link href="/contact-us" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content - Added top padding to account for fixed header */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/assets/adysunventures_logo.png" 
                  alt="Adysun Ventures Logo" 
                  className="w-8 h-8"
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">ADYSUN VENTURES</h3>
                  <p className="text-sm text-gray-400 -mt-1">Inspire. Imagine. Implement.</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                We deliver high-performance services to help your business embrace innovation and tackle the ever-changing challenges of today's digital world.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  📘
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  🐦
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  💼
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  📷
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors text-sm">
                    → About
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-gray-300 hover:text-white transition-colors text-sm">
                    → Contact
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                    → Services
                  </Link>
                </li>
                <li>
                  <Link href="/technologies" className="text-gray-300 hover:text-white transition-colors text-sm">
                    → Technologies
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300 hover:text-white transition-colors text-sm">
                    → Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Industries</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/industries/stock-exchange" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Stock Exchange
                  </Link>
                </li>
                <li>
                  <Link href="/industries/ecommerce" className="text-gray-300 hover:text-white transition-colors text-sm">
                    E-Commerce
                  </Link>
                </li>
                <li>
                  <Link href="/industries/transportation" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Transportation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © Copyright 2025 ADYSUN VENTURES PVT. LTD. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
