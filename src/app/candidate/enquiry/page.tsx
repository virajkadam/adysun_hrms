"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { validatePANFormat, checkPANExistsAnywhere } from "@/utils/firebaseUtils";
import Image from "next/image";
import Link from "next/link";

interface EnquiryFormData {
  name: string;
  mobile: string;
  pan: string;
  passoutYear: string;
  technology: string;
  role: string;
  totalWorkExperience: string;
  message: string;
}

// Header Component for Enquiry Form
const EnquiryHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center">
            <Image
              src="/adysun-logo.png"
              alt="Adysun Ventures Logo"
              width={40}
              height={40}
              className="object-contain mr-3"
              priority
            />
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 uppercase tracking-tight leading-none">
                ADYSUN VENTURES
              </h1>
              <p className="text-lg text-gray-500 font-normal leading-tight -mt-1">
                Inspire. Imagine. Implement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Footer Component for Enquiry Form
const EnquiryFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Our Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center text-orange-400">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Our Locations
            </h3>
            
            {/* Pune Office */}
            <div className="mb-6">
              <div className="flex items-start mb-3">
                <svg className="w-4 h-4 mr-2 mt-1 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Pune Office (Head Office)</p>
                  <p className="text-gray-300 text-sm">Adysun Ventures Pvt. Ltd.</p>
                  <p className="text-gray-300 text-sm">Workplex, S no 47, Near Bhapkar Petrol Pump, Pune, Maharashtra - 411009</p>
                </div>
              </div>
              <div className="flex space-x-2 ml-6">
                <Link href={"https://maps.app.goo.gl/ABiUMnGGjcG7sT6o6"} target="_blank">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Google Maps
                </button>
                </Link>
                <Link href={"https://g.co/kgs/C5Fe6uz"} target="_blank">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"/>
                  </svg>
                  Google Search
                </button>
                </Link>
              </div>
            </div>

            {/* Thane Office */}
            <div>
              <div className="flex items-start mb-3">
                <svg className="w-4 h-4 mr-2 mt-1 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Thane Office (Mumbai Division)</p>
                  <p className="text-gray-300 text-sm">Adysun Ventures Pvt. Ltd.</p>
                  <p className="text-gray-300 text-sm">A2, 704, Kanchanpushp Society Kavesar, Thane West, Thane, Maharashtra - 400607</p>
                </div>
              </div>
              <div className="flex space-x-2 ml-6">
                <Link href={"https://maps.app.goo.gl/tziAu2cdmPzLm9ie9"} target="_blank">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Google Maps
                </button>
                </Link>
                <Link href={"https://g.co/kgs/C5Fe6uz"} target="_blank">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"/>
                  </svg>
                  Google Search
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center text-orange-400">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Contact Us
            </h3>

            {/* Email Addresses */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="font-semibold text-sm">Email Addresses</span>
              </div>
              <div className="ml-6 space-y-2">
                <p className="text-gray-300 text-sm">
                  <span className="font-medium">General Inquiries:</span> info@adysunventures.com
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="font-medium">HR & Recruitment:</span> hr@adysunventures.com
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-orange-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Follow Us
              </h3>
              <div className="ml-6">
                <ul className="flex space-x-4">
                  <li>
                    <a 
                      href="https://x.com/adysunventures" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Twitter"
                      className="flex justify-center items-center w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.instagram.com/adysunventures/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Instagram"
                      className="flex justify-center items-center w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.linkedin.com/in/adysun-ventures/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      className="flex justify-center items-center w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://g.co/kgs/C5Fe6uz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Google Business Profile"
                      className="flex justify-center items-center w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://maps.app.goo.gl/ABiUMnGGjcG7sT6o6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Google Maps"
                      className="flex justify-center items-center w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Adysun Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function EnquirySubmitPage() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    mobile: "",
    pan: "",
    passoutYear: "",
    technology: "",
    role: "",
    totalWorkExperience: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [panError, setPanError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);
    setMobileError(null);
    setPanError(null);

    // Validate required fields
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.mobile.trim()) {
      setError("Mobile number is required");
      return;
    }

    if (!formData.message.trim()) {
      setError("Message is required");
      return;
    }

    // Validate mobile number format
    if (formData.mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    const firstDigit = parseInt(formData.mobile.charAt(0));
    if (firstDigit < 6 || firstDigit > 9) {
      setError("Mobile number must start with 6, 7, 8, or 9");
      return;
    }

    // Validate mobile number contains only digits
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Mobile number must contain only digits");
      return;
    }

    // Validate PAN card if provided
    if (formData.pan.trim()) {
      if (!validatePANFormat(formData.pan)) {
        setError("Please enter a valid PAN number (e.g., ABCDE1234F)");
        return;
      }

      // Check if PAN already exists
      const panExists = await checkPANExistsAnywhere(formData.pan.toUpperCase());
      if (panExists) {
        setError("This PAN number is already registered. Please use a different PAN or contact support.");
        return;
      }
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "enquiries"), {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        pan: formData.pan.trim() ? formData.pan.trim().toUpperCase() : null,
        passoutYear: formData.passoutYear.trim() || null,
        technology: formData.technology.trim() || null,
        role: formData.role.trim() || null,
        totalWorkExperience: formData.totalWorkExperience.trim() || null,
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setFormData({
        name: "",
        mobile: "",
        pan: "",
        passoutYear: "",
        technology: "",
        role: "",
        totalWorkExperience: "",
        message: "",
      });
    } catch (error: unknown) {
      console.error("Enquiry submission error:", error);
      setError("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Mobile number validation
    if (name === "mobile") {
      if (value.length > 0) {
        const firstDigit = parseInt(value.charAt(0));
        if (firstDigit >= 1 && firstDigit <= 5) {
          setMobileError("Mobile number must start with 6, 7, 8, or 9");
        } else {
          setMobileError(null);
        }
      } else {
        setMobileError(null);
      }
    }

    // PAN number validation
    if (name === "pan") {
      if (value.length > 0) {
        if (!validatePANFormat(value)) {
          setPanError("Please enter a valid PAN number (e.g., ABCDE1234F)");
        } else {
          setPanError(null);
        }
      } else {
        setPanError(null);
      }
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <EnquiryHeader />
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xs w-full space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  Enquiry Submitted Successfully!
                </h2>
                <p className="text-green-600 mb-4">
                  Thank you for your enquiry. We will get back to you soon.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
        <EnquiryFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <EnquiryHeader />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Submit Your Enquiry
            </h1>
            <p className="text-gray-600">
              Please fill out the form below and we&apos;ll get back to you
              soon.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <span className="text-red-500">*</span> Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <span className="text-red-500">*</span> Mobile
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      maxLength={10}
                      pattern="[6-9][0-9]{9}"
                      inputMode="numeric"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        mobileError ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      title="Mobile number must start with 6, 7, 8, or 9"
                    />
                    {mobileError && (
                      <p className="mt-1 text-sm text-red-600">{mobileError}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="pan"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <span className="text-red-500">*</span> PAN Number
                    </label>
                    <input
                      type="text"
                      id="pan"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        panError ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter PAN number (e.g., ABCDE1234F)"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                      title="PAN number must be in format: ABCDE1234F"
                    />
                    {panError && (
                      <p className="mt-1 text-sm text-red-600">{panError}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="passoutYear"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Passout Year
                    </label>
                    <select
                      id="passoutYear"
                      name="passoutYear"
                      value={formData.passoutYear}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Passout Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                      <option value="2011">2011</option>
                      <option value="2010">2010</option>
                      <option value="2009">2009</option>
                      <option value="2008">2008</option>
                      <option value="2007">2007</option>
                      <option value="2006">2006</option>
                      <option value="2005">2005</option>
                      <option value="2004">2004</option>
                      <option value="2003">2003</option>
                      <option value="2002">2002</option>
                      <option value="2001">2001</option>
                      <option value="2000">2000</option>
                      <option value="Before 2000">Before 2000</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="technology"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Technology
                    </label>
                    <select
                      id="technology"
                      name="technology"
                      value={formData.technology}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Technology</option>
                      <option value="React">React</option>
                      <option value="Angular">Angular</option>
                      <option value="Vue.js">Vue.js</option>
                      <option value="Node.js">Node.js</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="C#">C#</option>
                      <option value="PHP">PHP</option>
                      <option value="Ruby">Ruby</option>
                      <option value="Go">Go</option>
                      <option value="Swift">Swift</option>
                      <option value="Kotlin">Kotlin</option>
                      <option value="Flutter">Flutter</option>
                      <option value="React Native">React Native</option>
                      <option value="AWS">AWS</option>
                      <option value="Azure">Azure</option>
                      <option value="Google Cloud">Google Cloud</option>
                      <option value="Docker">Docker</option>
                      <option value="Kubernetes">Kubernetes</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="PostgreSQL">PostgreSQL</option>
                      <option value="MySQL">MySQL</option>
                      <option value="Redis">Redis</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Role</option>
                      <option value="Frontend Developer">
                        Frontend Developer
                      </option>
                      <option value="Backend Developer">
                        Backend Developer
                      </option>
                      <option value="Full Stack Developer">
                        Full Stack Developer
                      </option>
                      <option value="Mobile Developer">Mobile Developer</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Data Engineer">Data Engineer</option>
                      <option value="Machine Learning Engineer">
                        Machine Learning Engineer
                      </option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="QA Engineer">QA Engineer</option>
                      <option value="Software Architect">
                        Software Architect
                      </option>
                      <option value="System Administrator">
                        System Administrator
                      </option>
                      <option value="Database Administrator">
                        Database Administrator
                      </option>
                      <option value="Security Engineer">
                        Security Engineer
                      </option>
                      <option value="Business Analyst">Business Analyst</option>
                      <option value="Technical Lead">Technical Lead</option>
                      <option value="Team Lead">Team Lead</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="totalWorkExperience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Total Work Experience
                    </label>
                    <select
                      id="totalWorkExperience"
                      name="totalWorkExperience"
                      value={formData.totalWorkExperience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Experience</option>
                      <option value="Fresher">Fresher (0 years)</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years">3 years</option>
                      <option value="4 years">4 years</option>
                      <option value="5 years">5 years</option>
                      <option value="6-8 years">6-8 years</option>
                      <option value="9-12 years">9-12 years</option>
                      <option value="13+ years">13+ years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <span className="text-red-500">*</span> Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Please enter your enquiry message..."
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
                    {error}
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
                  >
                    {loading ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <EnquiryFooter />
    </div>
  );
}
