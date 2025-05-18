'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import toast, { Toaster } from 'react-hot-toast';
import { Company } from '@/types';
import { getCompany, updateCompany, addCompany } from '@/utils/documentUtils';

export default function CompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<Partial<Company>>({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    gstin: '',
    pan: '',
    cin: '',
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      branch: '',
    },
    signatory: {
      name: '',
      designation: '',
    },
  });

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      try {
        // Try to get company with ID 'default' - this is just a placeholder,
        // in a real app you'd have a proper way to get the right company ID
        const companyData = await getCompany('default').catch(() => null);
        if (companyData) {
          setCompany(companyData);
          setFormData(companyData);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
        toast.error('Failed to load company details');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      
      if (section === 'bankDetails' || section === 'signatory') {
        setFormData(prev => ({
          ...prev,
          [section]: {
            ...(prev[section as keyof typeof prev] as Record<string, unknown> || {}),
            [field]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      toast.loading('Saving company details...', { id: 'save-company' });
      
      if (company) {
        await updateCompany(company.id, formData);
      } else {
        // Create a new company with a default ID
        await addCompany({
          ...formData,
          name: formData.name || '',
          address: formData.address || ''
        } as Omit<Company, 'id'>);
      }
      
      toast.success('Company details saved successfully', { id: 'save-company' });
    } catch (error) {
      console.error('Error saving company details:', error);
      toast.error('Failed to save company details', { id: 'save-company' });
    }
  };

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      
      <div className="mb-6">
        <Link href="/documents" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
          <FiArrowLeft size={16} /> Back to Documents
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Company Details</h1>
        <p className="text-gray-600">Manage company information used in document generation</p>
      </div>
      
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    id="gstin"
                    name="gstin"
                    value={formData.gstin || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">
                    PAN
                  </label>
                  <input
                    type="text"
                    id="pan"
                    name="pan"
                    value={formData.pan || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="cin" className="block text-sm font-medium text-gray-700 mb-1">
                    CIN
                  </label>
                  <input
                    type="text"
                    id="cin"
                    name="cin"
                    value={formData.cin || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 border-t pt-6 mt-4">
              <h2 className="text-lg font-semibold mb-4">Bank Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="bankDetails.accountName" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="bankDetails.accountName"
                  name="bankDetails.accountName"
                  value={formData.bankDetails?.accountName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="bankDetails.accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  id="bankDetails.accountNumber"
                  name="bankDetails.accountNumber"
                  value={formData.bankDetails?.accountNumber || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bankDetails.bankName"
                  name="bankDetails.bankName"
                  value={formData.bankDetails?.bankName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    id="bankDetails.ifscCode"
                    name="bankDetails.ifscCode"
                    value={formData.bankDetails?.ifscCode || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="bankDetails.branch" className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <input
                    type="text"
                    id="bankDetails.branch"
                    name="bankDetails.branch"
                    value={formData.bankDetails?.branch || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 border-t pt-6 mt-4">
              <h2 className="text-lg font-semibold mb-4">Signatory Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="signatory.name" className="block text-sm font-medium text-gray-700 mb-1">
                  Signatory Name
                </label>
                <input
                  type="text"
                  id="signatory.name"
                  name="signatory.name"
                  value={formData.signatory?.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="signatory.designation" className="block text-sm font-medium text-gray-700 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  id="signatory.designation"
                  name="signatory.designation"
                  value={formData.signatory?.designation || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
              >
                <FiSave /> Save Company Details
              </button>
            </div>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
} 