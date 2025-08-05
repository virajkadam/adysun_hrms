"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
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
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Google Maps
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"/>
                  </svg>
                  Google Search
                </button>
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
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Google Maps
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"/>
                  </svg>
                  Google Search
                </button>
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

            {/* Contact Number */}
            <div>
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-semibold text-sm">Contact Number</span>
              </div>
              <div className="ml-6 space-y-2">
                <p className="text-gray-300 text-sm font-medium">+91 9579537523</p>
                <div className="flex items-center text-gray-300 text-sm">
                  <svg className="w-4 h-4 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Mon-Sat 10:00 AM - 6:00 PM
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <svg className="w-4 h-4 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Closed on Sundays & National Holidays
                </div>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);
    setMobileError(null);

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

    setLoading(true);

    try {
      await addDoc(collection(db, "enquiries"), {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        pan: formData.pan.trim() || null,
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
        <div className="max-w-2xl w-full">
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
                      PAN Number
                    </label>
                    <input
                      type="text"
                      id="pan"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter PAN number"
                    />
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
