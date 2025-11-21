"use client";
import { useState, useEffect, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { validatePANFormat, checkPANExistsAnywhere } from "@/utils/firebaseUtils";
import { checkMobileExists, checkEmailExists } from "@/utils/firebaseUtils";
import Image from "next/image";
import Link from "next/link";
import SocialMediaLinks from "@/components/ui/SocialMediaLinks";

interface EnquiryFormData {
  name: string;
  mobile: string;
  pan: string;
  email: string;
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
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Our Locations
            </h3>
            
            {/* Pune Office */}
            <div className="mb-6">
              <div className="flex items-start mb-3">
                <svg className="w-4 h-4 mr-2 mt-1 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Google Maps
                </button>
                </Link>
                <Link href={"https://g.co/kgs/C5Fe6uz"} target="_blank">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Search
                </button>
                </Link>
              </div>
            </div>

            {/* Thane Office */}
            <div>
              <div className="flex items-start mb-3">
                <svg className="w-4 h-4 mr-2 mt-1 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Google Maps
                </button>
                </Link>
                <Link href={"https://g.co/kgs/C5Fe6uz"} target="_blank">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
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
              <SocialMediaLinks title="Follow Us" />
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
    email: "",
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
  const [panDuplicateError, setPanDuplicateError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);
  const panDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown effect for Instagram redirect
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      window.open('https://www.instagram.com/adysunventures/', '_blank');
    }
  }, [success, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);
    setMobileError(null);
    setPanError(null);
    setEmailError(null);
    setPanDuplicateError(null);

    // Validate required fields
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.mobile.trim()) {
      setError("Mobile number is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email address is required");
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
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

    // Check if mobile already exists
    const mobileExists = await checkMobileExists(formData.mobile.trim());
    if (mobileExists) {
      setError("This mobile number is already registered. Please use a different mobile number or contact support.");
      return;
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(formData.email.trim());
    if (emailExists) {
      setError("This email address is already registered. Please use a different email or contact support.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "enquiries"), {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        pan: formData.pan.trim() ? formData.pan.trim().toUpperCase() : null,
        email: formData.email.trim(),
        passoutYear: formData.passoutYear.trim() || null,
        technology: formData.technology.trim() || null,
        role: formData.role.trim() || null,
        totalWorkExperience: formData.totalWorkExperience.trim() || null,
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setCountdown(50);
      setFormData({
        name: "",
        mobile: "",
        pan: "",
        email: "",
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
    const processedValue =
      name === "pan"
        ? value.toUpperCase().replace(/\s+/g, "")
        : value;

    setFormData({
      ...formData,
      [name]: processedValue,
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
      if (processedValue.length > 0) {
        if (!validatePANFormat(processedValue)) {
          setPanError("Please enter a valid PAN number (e.g., ABCDE1234F)");
          setPanDuplicateError(null);
        } else {
          setPanError(null);
          setPanDuplicateError(null);
        }
      } else {
        setPanError(null);
        setPanDuplicateError(null);
      }
    }

    // Email validation
    if (name === "email") {
      if (value.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setEmailError("Please enter a valid email address");
        } else {
          setEmailError(null);
        }
      } else {
        setEmailError(null);
      }
      if (panDebounceRef.current) {
        clearTimeout(panDebounceRef.current);
      }
      if (processedValue.length === 10 && validatePANFormat(processedValue)) {
        panDebounceRef.current = setTimeout(async () => {
          try {
            const exists = await checkPANExistsAnywhere(processedValue);
            setPanDuplicateError(exists ? "This PAN number is already registered" : null);
          } catch (error) {
            console.error("Error checking PAN uniqueness:", error);
          }
        }, 1000);
      } else {
        setPanDuplicateError(null);
      }
    }

    // Mobile uniqueness validation (debounced)
    if (name === "mobile") {
      if (value.length === 10 && /^[6-9]\d{9}$/.test(value)) {
        // Check mobile uniqueness after a delay
        setTimeout(async () => {
          try {
            const exists = await checkMobileExists(value);
            if (exists) {
              setMobileError("This mobile number is already registered");
            } else {
              setMobileError(null);
            }
          } catch (error) {
            console.error('Error checking mobile uniqueness:', error);
          }
        }, 1000); // 1 second delay
      }
    }

    // Email uniqueness validation (debounced)
    if (name === "email") {
      if (value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        // Check email uniqueness after a delay
        setTimeout(async () => {
          try {
            const exists = await checkEmailExists(value);
            if (exists) {
              setEmailError("This email address is already registered");
            } else {
              setEmailError(null);
            }
          } catch (error) {
            console.error('Error checking email uniqueness:', error);
          }
        }, 1000); // 1 second delay
      }
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <EnquiryHeader />
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Enquiry Submitted!
                </h2>
                <p className="text-gray-600">
                  Thank you for your enquiry. We'll get back to you soon.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-700">
                  Redirecting to our Instagram page in <span className="font-semibold text-blue-900">{countdown}</span> seconds...
                </p>
                <button
                  onClick={() => window.open('https://www.instagram.com/adysunventures/', '_blank')}
                  className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Go to Instagram Now
                </button>
              </div>
              
              <p className="text-xs text-gray-500">
                You'll be redirected to stay connected with us on social media.
              </p>
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
                        panError || panDuplicateError ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter PAN number (e.g., ABCDE1234F)"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                      title="PAN number must be in format: ABCDE1234F"
                    />
                    {panError && (
                      <p className="mt-1 text-sm text-red-600">{panError}</p>
                    )}
                    {panDuplicateError && !panError && (
                      <p className="mt-1 text-sm text-red-600">{panDuplicateError}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <span className="text-red-500">*</span> Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        emailError ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {emailError && (
                      <p className="mt-1 text-sm text-red-600">{emailError}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
