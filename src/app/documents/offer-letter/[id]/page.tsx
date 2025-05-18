'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiDownload, FiEdit, FiTrash2, FiMail } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getDocument, getEmployee, deleteDocument, formatIndianCurrency, numberToWords, formatDate } from '@/utils/documentUtils';
import { Document, Employee } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function OfferLetterViewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const letterContainerRef = useRef<HTMLDivElement>(null);
  
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const documentData = await getDocument(id);
        setDocument(documentData);
        
        // Fetch related employee
        try {
          const employeeData = await getEmployee(documentData.employeeId);
          setEmployee(employeeData);
        } catch (err) {
          console.error('Error fetching employee:', err);
        }
      } catch (error: any) {
        setError(error.message || 'Failed to fetch document data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteClick = () => {
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading('Deleting offer letter...', { id: 'delete-letter' });
      await deleteDocument(id);
      toast.success('Offer letter deleted successfully', { id: 'delete-letter' });
      router.push('/documents/offer-letter');
    } catch (error: any) {
      setError(error.message || 'Failed to delete offer letter');
      toast.error('Failed to delete offer letter', { id: 'delete-letter' });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  const downloadPDF = async () => {
    if (!letterContainerRef.current) return;
    
    try {
      setIsGeneratingPDF(true);
      toast.loading('Generating PDF...', { id: 'generate-pdf' });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const letterElement = letterContainerRef.current;
      
      // Calculate the PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Convert HTML to canvas and then to PDF
      const canvas = await html2canvas(letterElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      // Add metadata to the PDF
      pdf.setProperties({
        title: `Offer Letter - ${employee?.name || 'Employee'}`,
        subject: `Offer for position of ${document?.data?.position || 'position'}`,
        author: document?.data?.company?.name || 'Company',
        keywords: 'offer letter, employment, job offer',
        creator: 'Adysun Admin Dashboard'
      });
      
      // Save the PDF
      pdf.save(`offer-letter-${employee?.name || 'employee'}.pdf`);
      
      toast.success('PDF generated successfully', { id: 'generate-pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF', { id: 'generate-pdf' });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const sendByEmail = async () => {
    if (!employee || !document) {
      toast.error('Cannot send email: Missing employee or document data');
      return;
    }
    
    try {
      toast.loading('Preparing to send email...', { id: 'send-email' });
      
      // First generate the PDF
      if (!letterContainerRef.current) {
        throw new Error('Cannot generate PDF: Letter container not found');
      }
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const letterElement = letterContainerRef.current;
      
      // Convert HTML to canvas and then to PDF
      const canvas = await html2canvas(letterElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      // For now, just show a success message
      // In a real implementation, you would:
      // 1. Convert the PDF to a blob
      // 2. Upload it to Firebase Storage or send directly to a backend API
      // 3. Have the backend send the email with the PDF attached
      
      toast.success(`Email with offer letter would be sent to ${employee.email}`, { id: 'send-email' });
      toast('This feature will be fully implemented in the next phase', { icon: 'ℹ️' });
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email', { id: 'send-email' });
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <Link href="/documents/offer-letter" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Offer Letters
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  if (!document || document.documentType !== 'offer') {
    return (
      <DashboardLayout>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>Offer letter not found</p>
        </div>
        <div className="mt-4">
          <Link href="/documents/offer-letter" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Offer Letters
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const { data } = document;

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      
      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link href="/documents/offer-letter" className="text-blue-600 hover:underline flex items-center gap-1 mb-1">
              <FiArrowLeft size={14} /> Back to Offer Letters
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Offer Letter
              <span className={`ml-3 text-sm font-normal px-2 py-1 rounded-full ${
                document.status === 'draft' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : document.status === 'issued' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
              </span>
            </h1>
            {employee && (
              <p className="text-gray-600 mt-1">
                {employee.name} - {data.position} in {data.department}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 disabled:bg-green-400"
              title="Download PDF"
              disabled={isGeneratingPDF}
            >
              <FiDownload size={16} /> {isGeneratingPDF ? 'Generating...' : 'Download'}
            </button>
            
            <button
              onClick={sendByEmail}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              title="Send by Email"
            >
              <FiMail size={16} /> Email
            </button>
            
            <Link
              href={`/documents/offer-letter/${id}/edit`}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
              title="Edit Offer Letter"
            >
              <FiEdit size={16} /> Edit
            </Link>
            
            {!deleteConfirm ? (
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                title="Delete Offer Letter"
              >
                <FiTrash2 size={16} /> Delete
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  title="Confirm Delete"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  title="Cancel Delete"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Letter Preview */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
        <div ref={letterContainerRef} className="max-w-4xl mx-auto">
          {/* Company Header */}
          {data.company && (
            <div className="text-center mb-8">
              {data.company.logo && (
                <img 
                  src={data.company.logo} 
                  alt={data.company.name} 
                  className="h-16 mx-auto mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-gray-800">{data.company.name}</h2>
              <p className="text-gray-600">{data.company.address}</p>
            </div>
          )}
          
          {/* Letter Date */}
          <div className="mb-8 text-right">
            <p className="text-gray-700">Date: {formatDate(document.createdAt)}</p>
          </div>
          
          {/* Recipient */}
          <div className="mb-8">
            <p className="text-gray-700">{data.employee?.name || employee?.name}</p>
            <p className="text-gray-700">{data.employee?.address || employee?.currentAddress}</p>
          </div>
          
          {/* Subject */}
          <div className="mb-8">
            <p className="text-xl font-bold text-center underline">OFFER LETTER</p>
          </div>
          
          {/* Letter Body */}
          <div className="mb-8 space-y-4 text-gray-700">
            <p>Dear {data.employee?.name || employee?.name},</p>
            
            <p>
              We are pleased to offer you the position of <strong>{data.position}</strong> in our <strong>{data.department}</strong> department. 
              We believe your skills and experience will be valuable additions to our organization.
            </p>
            
            <p>
              The details of your offer are as follows:
            </p>
            
            <div className="pl-4">
              <p><strong>Position:</strong> {data.position}</p>
              <p><strong>Department:</strong> {data.department}</p>
              <p><strong>Annual Salary:</strong> {formatIndianCurrency(data.salary)} ({numberToWords(data.salary)} Rupees Only)</p>
              <p><strong>Start Date:</strong> {formatDate(data.joiningDate)}</p>
            </div>

            {data.salaryComponents && (
              <div>
                <p className="font-semibold mt-4">Your monthly salary will be structured as follows:</p>
                <table className="w-full my-2 border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-1 font-medium">Basic Salary:</td>
                      <td className="py-1 text-right">{formatIndianCurrency(parseFloat(data.salaryComponents.basic))}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-1 font-medium">Dearness Allowance:</td>
                      <td className="py-1 text-right">{formatIndianCurrency(parseFloat(data.salaryComponents.da))}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-1 font-medium">Conveyance Allowance:</td>
                      <td className="py-1 text-right">{formatIndianCurrency(parseFloat(data.salaryComponents.conveyance))}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-1 font-medium">Medical Allowance:</td>
                      <td className="py-1 text-right">{formatIndianCurrency(parseFloat(data.salaryComponents.medical))}</td>
                    </tr>
                    <tr className="border-t-2 border-gray-400">
                      <td className="py-1 font-bold">Gross Monthly Salary:</td>
                      <td className="py-1 text-right font-bold">{formatIndianCurrency(parseFloat(data.salaryComponents.gross))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            
            <p>
              This offer is subject to the following terms and conditions:
            </p>
            
            <ul className="list-disc pl-8">
              {data.termsAndConditions?.map((term: string, index: number) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
            
            <p>
              If you accept this offer, please sign and return this letter at your earliest convenience. 
              We look forward to welcoming you to our team.
            </p>
            
            <p>
              Sincerely,
            </p>
            
            {data.company?.signatory && (
              <div className="mt-16">
                <p className="font-bold">{data.company.signatory.name}</p>
                <p>{data.company.signatory.designation}</p>
                <p>{data.company.name}</p>
              </div>
            )}
          </div>
          
          {/* Acceptance Section */}
          <div className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-gray-700 mb-4">I accept the offer and terms described above.</p>
            
            <div className="flex justify-between">
              <div>
                <p className="mb-8 text-gray-700">Signature: ________________________</p>
                <p className="text-gray-700">Name: {data.employee?.name || employee?.name}</p>
                <p className="text-gray-700">Date: ________________________</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 