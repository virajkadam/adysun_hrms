'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);
  const mobileIndustriesRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.navigation-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsIndustriesOpen(false);
      }
    };

    if (isMenuOpen || isIndustriesOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isIndustriesOpen]);

  // Close industries dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideDesktop = industriesRef.current && industriesRef.current.contains(target);
      const isInsideMobile = mobileIndustriesRef.current && mobileIndustriesRef.current.contains(target);
      
      if (!isInsideDesktop && !isInsideMobile) {
        setIsIndustriesOpen(false);
      }
    };

    if (isIndustriesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isIndustriesOpen]);

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/partners', label: 'Partners' },
    { href: '/technologies', label: 'Technologies' },
    { href: '/careers', label: 'Careers' },
    { href: '/clients', label: 'Clients' },
    { href: '/contact-us', label: 'Contact' }
  ];

  const industriesItems = [
    { href: '/industries/ecommerce', label: 'E-commerce' },
    { href: '/industries/stock-exchange', label: 'Stock Exchange' }
  ];

  return (
    <nav 
      className={`navigation-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200' 
          : 'bg-transparent'
      } ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md flex-shrink-0"
            aria-label="Adysun Ventures Home"
          >
            <Image
              src="/adysun-logo.png"
              alt="Adysun Ventures Logo"
              width={40}
              height={40}
              className="w-10 h-10 flex-shrink-0"
            />
            <div className=" sm:block flex-shrink-0">
              <div className="text-base lg:text-lg font-bold text-gray-900">ADYSUN VENTURES</div>
              <div className="text-xs text-gray-600">Inspire. Imagine. Implement.</div>
            </div>
          </Link>

                    {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Home */}
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
              aria-label="Navigate to Home page"
            >
              Home
            </Link>
            
            {/* About */}
            <Link
              href="/about-us"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
              aria-label="Navigate to About page"
            >
              About
            </Link>
            
            {/* Services */}
            <Link
              href="/services"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
              aria-label="Navigate to Services page"
            >
              Services
            </Link>
            
            {/* Partners */}
            <Link
              href="/partners"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
              aria-label="Navigate to Partners page"
            >
              Partners
            </Link>
            
            {/* Technologies */}
            <Link
              href="/technologies"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
              aria-label="Navigate to Technologies page"
            >
              Technologies
            </Link>
            
            {/* Industries Dropdown */}
            <div ref={industriesRef} className="relative">
              <div className="flex items-center">
                <Link
                  href="/industries"
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] flex items-center justify-center text-sm lg:text-base"
                  aria-label="Navigate to Industries page"
                >
                  Industries
                </Link>
                <button
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-1 py-2 min-h-[44px] min-w-[32px] flex items-center justify-center text-sm lg:text-base"
                  onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                  aria-expanded={isIndustriesOpen}
                  aria-haspopup="true"
                  aria-label="Industries dropdown menu"
                >
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isIndustriesOpen ? 'rotate-180' : ''
                    }`} 
                    aria-hidden="true" 
                  />
                </button>
              </div>
              
              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-orange-200 py-2 transition-all duration-200 ${
                  isIndustriesOpen 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-2'
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-hidden={!isIndustriesOpen}
              >
                {industriesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                    onClick={() => setIsIndustriesOpen(false)}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} page`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Careers */}
            <Link
              href="/careers"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
              aria-label="Navigate to Careers page"
            >
              Careers
            </Link>
            
            {/* Clients */}
            <Link
              href="/clients"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
              aria-label="Navigate to Clients page"
            >
              Clients
            </Link>
            
            {/* Contact */}
            <Link
              href="/contact-us"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
              aria-label="Navigate to Contact page"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible'
          }`}
          aria-hidden={!isMenuOpen}
        >
                                                     <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-orange-200">
                    {/* Home */}
                    <Link
                      href="/"
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Navigate to Home page"
                    >
                      Home
                    </Link>
                    
                    {/* About */}
                    <Link
                      href="/about-us"
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Navigate to About page"
                    >
                      About
                    </Link>
                    
                    {/* Services */}
                    <Link
                      href="/services"
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Navigate to Services page"
                    >
                      Services
                    </Link>
                    
                    {/* Partners */}
                    <Link
                      href="/partners"
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Navigate to Partners page"
                    >
                      Partners
                    </Link>
                    
                    {/* Technologies */}
                    <Link
                      href="/technologies"
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Navigate to Technologies page"
                    >
                      Technologies
                    </Link>
                    
                    {/* Mobile Industries Dropdown */}
                    <div ref={mobileIndustriesRef} className="border-t border-orange-200 pt-2 mt-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/industries"
                          className="flex-1 text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                          onClick={() => setIsMenuOpen(false)}
                          aria-label="Navigate to Industries page"
                        >
                          Industries
                        </Link>
                        <button
                          className="px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center justify-center"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsIndustriesOpen(!isIndustriesOpen);
                          }}
                          aria-expanded={isIndustriesOpen}
                          aria-haspopup="true"
                          aria-label="Industries dropdown menu"
                        >
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isIndustriesOpen ? 'rotate-180' : ''
                            }`} 
                            aria-hidden="true" 
                          />
                        </button>
                      </div>
                      
                      {/* Mobile Dropdown Items */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isIndustriesOpen 
                            ? 'max-h-48 opacity-100 translate-y-0' 
                            : 'max-h-0 opacity-0 -translate-y-2'
                        }`}
                        aria-hidden={!isIndustriesOpen}
                      >
                        {industriesItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-6 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsIndustriesOpen(false);
                            }}
                            aria-label={`Navigate to ${item.label} page`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* Careers */}
                    <Link
                      href="/careers"
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Navigate to Careers page"
                    >
                      Careers
                    </Link>
                    
                    {/* Clients */}
                    <Link
                      href="/clients"
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Navigate to Clients page"
                    >
                      Clients
                    </Link>
                    
                    {/* Contact */}
                    <Link
                      href="/contact-us"
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Navigate to Contact page"
                    >
                      Contact
                    </Link>
                  </div>
        </div>
      </div>
    </nav>
  );
}
