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

export default function AppointmentLetterViewPage({ params }: { params: { id: string } }) {
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
      toast.loading('Deleting appointment letter...', { id: 'delete-letter' });
      await deleteDocument(id);
      toast.success('Appointment letter deleted successfully', { id: 'delete-letter' });
      router.push('/documents/appointment-letter');
    } catch (error: any) {
      setError(error.message || 'Failed to delete appointment letter');
      toast.error('Failed to delete appointment letter', { id: 'delete-letter' });
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
        title: `Appointment Letter - ${employee?.name || 'Employee'}`,
        subject: `Appointment for position of ${document?.data?.position || 'position'}`,
        author: document?.data?.company?.name || 'Company',
        keywords: 'appointment letter, employment, job offer',
        creator: 'Adysun Admin Dashboard'
      });
      
      // Save the PDF
      pdf.save(`appointment-letter-${employee?.name || 'employee'}.pdf`);
      
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
      
      toast.success(`Email with appointment letter would be sent to ${employee.email}`, { id: 'send-email' });
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
          <Link href="/documents/appointment-letter" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Appointment Letters
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  if (!document || document.documentType !== 'appointment') {
    return (
      <DashboardLayout>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>Appointment letter not found</p>
        </div>
        <div className="mt-4">
          <Link href="/documents/appointment-letter" className="text-blue-600 hover:underline flex items-center gap-1">
            <FiArrowLeft size={16} /> Back to Appointment Letters
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const { data } = document;
  const salaryComponents = data.salaryComponents;

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      
      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link href="/documents/appointment-letter" className="text-blue-600 hover:underline flex items-center gap-1 mb-1">
              <FiArrowLeft size={14} /> Back to Appointment Letters
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Appointment Letter
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
              href={`/documents/appointment-letter/${id}/edit`}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
              title="Edit Appointment Letter"
            >
              <FiEdit size={16} /> Edit
            </Link>
            
            {!deleteConfirm ? (
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                title="Delete Appointment Letter"
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
          
          {/* Reference Line and Date */}
          <div className="mb-8 flex justify-between">
            <p className="text-gray-700">Ref: APT/{new Date().getFullYear()}/{String(id).substring(0, 8)}</p>
            <p className="text-gray-700">Date: {formatDate(document.createdAt)}</p>
          </div>
          
          {/* Subject Line */}
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold underline">APPOINTMENT LETTER</h3>
          </div>
          
          {/* Recipient */}
          <div className="mb-8">
            <p className="text-gray-700 font-semibold">{data.employee?.name || employee?.name}</p>
            <p className="text-gray-700">{data.employee?.address || employee?.currentAddress}</p>
          </div>
          
          {/* Letter Body */}
          <div className="mb-8 space-y-4 text-gray-700">
            <p>Dear {data.employee?.name || employee?.name},</p>
            
            <p>
              We are pleased to confirm your appointment as <strong>{data.position}</strong> in our <strong>{data.department}</strong> department, effective from <strong>{formatDate(data.joiningDate)}</strong>.
            </p>
            
            <p>Your appointment is subject to the following terms and conditions:</p>
            
            <div className="pl-4 space-y-2">
              <p><strong>1. Compensation:</strong> Your annual cost to company (CTC) will be {formatIndianCurrency(data.ctc)} ({numberToWords(data.ctc)} Rupees Only) per annum.</p>
              
              {salaryComponents && (
                <div>
                  <p className="font-semibold mt-2">Salary Structure (Monthly):</p>
                  <table className="w-full my-2 border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-1 font-medium">Basic Salary:</td>
                        <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.basic)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 font-medium">HRA:</td>
                        <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.hra)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 font-medium">Education Allowance:</td>
                        <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.educationAllowance)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 font-medium">Monthly Reimbursement:</td>
                        <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.monthlyReimbursement)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 font-medium">LTA:</td>
                        <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.lta)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 font-medium">Statutory Bonus:</td>
                        <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.statutoryBonus)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 font-medium">Special Allowance:</td>
                        <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.specialAllowance)}</td>
                      </tr>
                      <tr className="border-t-2 border-gray-400">
                        <td className="py-1 font-bold">Gross Monthly Salary:</td>
                        <td className="py-1 text-right font-bold">{formatIndianCurrency(salaryComponents.monthly.totalMonthly)}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  {data.showPF && (
                    <div className="mt-4">
                      <p className="font-semibold">Employer Contributions:</p>
                      <table className="w-full my-2 border-collapse">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-1 font-medium">PF Contribution:</td>
                            <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.employerPF)}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-1 font-medium">Gratuity:</td>
                            <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.gratuity)}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-1 font-medium">Monthly Wellness:</td>
                            <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.monthlyWellness)}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-1 font-medium">Health Insurance:</td>
                            <td className="py-1 text-right">{formatIndianCurrency(salaryComponents.monthly.healthInsurance)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              <p><strong>2. Work Location:</strong> You will be based at our {data.location || 'office location'}.</p>
              
              <p><strong>3. Reporting Relationship:</strong> You will report to {data.reportingAuthority || 'your designated supervisor'}.</p>
              
              {data.bankDetails && (data.bankDetails.bankName || data.bankDetails.accountNumber) && (
                <p><strong>4. Bank Details:</strong> Your salary will be credited to your account at {data.bankDetails.bankName} (Account Number: {data.bankDetails.accountNumber}, IFSC: {data.bankDetails.ifscCode}, Branch: {data.bankDetails.branchName}).</p>
              )}
              
              <p><strong>{data.bankDetails ? '5' : '4'}. Terms and Conditions:</strong></p>
              <ul className="list-disc pl-8">
                {data.termsAndConditions?.map((term: string, index: number) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>
            
            <p>
              We welcome you to our organization and look forward to a mutually beneficial relationship.
            </p>
            
            <p>
              Yours sincerely,
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