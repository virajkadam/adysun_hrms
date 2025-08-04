"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Mobile number validation
    if (name === 'mobile') {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Enquiry</h1>
          <p className="text-gray-600">Please fill out the form below and we&apos;ll get back to you soon.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
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
                      mobileError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit mobile number"
                    title="Mobile number must start with 6, 7, 8, or 9"
                  />
                  {mobileError && (
                    <p className="mt-1 text-sm text-red-600">{mobileError}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="passoutYear" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="technology" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Mobile Developer">Mobile Developer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Data Engineer">Data Engineer</option>
                    <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="Software Architect">Software Architect</option>
                    <option value="System Administrator">System Administrator</option>
                    <option value="Database Administrator">Database Administrator</option>
                    <option value="Security Engineer">Security Engineer</option>
                    <option value="Business Analyst">Business Analyst</option>
                    <option value="Technical Lead">Technical Lead</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="totalWorkExperience" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
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
  );
} 