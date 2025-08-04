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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.message.trim()) {
      setError("Name, Mobile and Message are required");
      return;
    }

    setLoading(true);
    setError(null);

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
    } catch (err: any) {
      setError("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Enquiry</h1>
          <p className="text-gray-600">Please fill out the form below and we'll get back to you soon.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
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
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mobile number"
                  />
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
                  <input
                    type="number"
                    id="passoutYear"
                    name="passoutYear"
                    value={formData.passoutYear}
                    onChange={handleChange}
                    min="1990"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="technology" className="block text-sm font-medium text-gray-700 mb-1">
                    Technology
                  </label>
                  <input
                    type="text"
                    id="technology"
                    name="technology"
                    value={formData.technology}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., React, Node.js"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
                <div>
                  <label htmlFor="totalWorkExperience" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Work Experience
                  </label>
                  <input
                    type="text"
                    id="totalWorkExperience"
                    name="totalWorkExperience"
                    value={formData.totalWorkExperience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 3 years"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
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