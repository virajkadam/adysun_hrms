'use client';

import React from 'react';
import Link from 'next/link';
import { FiFileText, FiBriefcase, FiFile, FiUser, FiClipboard, FiHome } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Define document types for the dashboard
const documents = [
  { 
    title: 'Offer Letter', 
    description: 'Generate offer letters for new employees',
    path: '/dashboard/documents/offer-letter', 
    icon: <FiFileText size={24} /> 
  },
  { 
    title: 'Appointment Letter', 
    description: 'Generate appointment letters for confirmed employees',
    path: '/dashboard/documents/appointment-letter', 
    icon: <FiFileText size={24} /> 
  },
  { 
    title: 'Payslip Generator', 
    description: 'Generate monthly payslips for employees',
    path: '/dashboard/documents/payslip', 
    icon: <FiFile size={24} /> 
  },
  { 
    title: 'Relieving Letter', 
    description: 'Generate relieving letters for leaving employees',
    path: '/dashboard/documents/relieving-letter', 
    icon: <FiFileText size={24} /> 
  },
  { 
    title: 'Appraisal Letter', 
    description: 'Generate appraisal letters for promoted employees',
    path: '/dashboard/documents/appraisal-letter', 
    icon: <FiClipboard size={24} /> 
  },
  { 
    title: 'Manage Company', 
    description: 'View and update company information details',
    path: '/dashboard/documents/company-card', 
    icon: <FiBriefcase size={24} /> 
  },
];

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Document Generator</h1>
            <p className="text-slate-800">Generate HR documents with customizable templates</p>
          </div>
          <Link href="/dashboard/documents/v2" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Try Version 2
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <Link 
              key={index} 
              href={doc.path} 
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mr-3">
                  {doc.icon}
                </div>
                <h2 className="text-lg font-semibold text-slate-800">{doc.title}</h2>
              </div>
              <p className="text-slate-800 text-sm">{doc.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 