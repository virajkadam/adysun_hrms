'use client';

import Link from 'next/link';
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Info,
  ChevronRight,
  Building2,
  User,
  CheckCircle
} from 'lucide-react';
import { GoogleMapsButton, GoogleSearchButton } from '../ui/HollowButton';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/assets/adysunventures_logo.png" 
                  alt="Adysun Ventures Logo" 
                  className="w-10 h-10"
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold">ADYSUN VENTURES</h3>
                  <p className="text-sm text-gray-300">Inspire. Imagine. Implement.</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                We are a high-performance service provider that delivers exceptional results through innovative solutions and dedicated expertise.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://x.com/adysunventures" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="Twitter (X)"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/adysunventures/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/adysun-ventures/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://g.co/kgs/C5Fe6uz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="Google Business"
                >
                  <Building2 className="w-5 h-5" />
                </a>
                <a 
                  href="https://maps.app.goo.gl/ABiUMnGGjcG7sT6o6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="Google Maps"
                >
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-2 text-white">Quick Links</h4>
              <div className="w-12 h-0.5 bg-gray-400 mb-6"></div>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="flex items-center text-white hover:text-gray-300 transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 mr-2 text-white" />
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex items-center text-white hover:text-gray-300 transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 mr-2 text-white" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="flex items-center text-white hover:text-gray-300 transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 mr-2 text-white" />
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/technologies" className="flex items-center text-white hover:text-gray-300 transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 mr-2 text-white" />
                    Technologies
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="flex items-center text-white hover:text-gray-300 transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 mr-2 text-white" />
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="flex items-center text-white hover:text-gray-300 transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 mr-2 text-white" />
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Locations */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-2 text-white">Our Locations</h4>
              <div className="w-12 h-0.5 bg-gray-400 mb-6"></div>
              <div className="space-y-6">
                {/* Pune Office */}
                <div>
                  <div className="flex items-start space-x-3 mb-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                       <h5 className="font-semibold text-orange-500">Pune Office (Head Office)</h5>
                       <p className="text-white text-sm mt-1">
                         Adysun Ventures Pvt. Ltd.<br />
                         Workplex, S no 47,<br />
                         Near Bhapkar Petrol Pump,<br />
                         Pune, Maharashtra - 411009
                       </p>
                     </div>
                   </div>
                   <div className="flex space-x-2 mt-3">
                     <GoogleMapsButton href="https://maps.app.goo.gl/ABiUMnGGjcG7sT6o6" />
                     <GoogleSearchButton href="https://g.co/kgs/C5Fe6uz" />
                   </div>
                </div>

                {/* Thane Office */}
                <div>
                  <div className="flex items-start space-x-3 mb-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-orange-500">Thane Office (Mumbai Division)</h5>
                      <p className="text-white text-sm mt-1">
                        Adysun Ventures Pvt. Ltd.<br />
                        A2, 704, Kanchanpushp Society<br />
                        Kavesar, Thane West,<br />
                        Thane, Maharashtra - 400607
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <GoogleMapsButton href="https://maps.app.goo.gl/ABiUMnGGjcG7sT6o6" />
                    <GoogleSearchButton href="https://g.co/kgs/C5Fe6uz" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-2 text-white">Contact Us</h4>
              <div className="w-12 h-0.5 bg-gray-400 mb-6"></div>
              <div className="space-y-6">
                {/* Email Addresses Section */}
                <div>
                  <h6 className="text-orange-500 mb-3 font-semibold flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-orange-500" />
                    Email Addresses
                  </h6>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white text-sm mb-1">General Inquiries</p>
                      <a href="mailto:info@adysunventures.com" className="text-white hover:text-gray-300 transition-colors duration-300 text-sm">
                        info@adysunventures.com
                      </a>
                    </div>
                    <div>
                      <p className="text-white text-sm mb-1">HR & Recruitment</p>
                      <a href="mailto:hr@adysunventures.com" className="text-white hover:text-gray-300 transition-colors duration-300 text-sm">
                        hr@adysunventures.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Number Section */}
                <div>
                  <h6 className="text-orange-500 mb-3 font-semibold flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-orange-500" />
                    Contact Number
                  </h6>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-white" />
                      <a href="tel:+919579537523" className="text-white hover:text-gray-300 transition-colors duration-300 text-sm">
                        +91 9579537523
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">Mon-Sat 10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">Closed on Sundays & National Holidays</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Footer Section */}
      <div className="border-t border-gray-700">
        {/* Company Info Section */}
        <div className="bg-white py-3">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-black text-sm mb-1">
                Adysun Ventures Private Limited
              </p>
              <p className="text-black text-sm">
                CIN : U72900PN2020PTC196380
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="bg-black py-3">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © Copyright 2025 ADYSUN VENTURES PVT. LTD. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
