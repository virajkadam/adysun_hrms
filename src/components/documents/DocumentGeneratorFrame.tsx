import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import dynamic from 'next/dynamic';

// Dynamically import v2 document components with no SSR for all documents
const OfferLetterV2 = dynamic(() => import('@/app/doc_pages/pages/v2/OfferLetter'), { ssr: false });
const AppointmentLetterV2 = dynamic(() => import('@/app/doc_pages/pages/v2/AppointmentLetter'), { ssr: false });
const RelievingLetterV2 = dynamic(() => import('@/app/doc_pages/pages/v2/RelievingLetter'), { ssr: false });
const AppraisalLetterV2 = dynamic(() => import('@/app/doc_pages/pages/v2/AppraisalLetter'), { ssr: false });
const PaySlipGeneratorV2 = dynamic(() => import('@/app/doc_pages/pages/v2/PaySlipGenerator'), { ssr: false });
const BankStatementV2 = dynamic(() => import('@/app/doc_pages/pages/v2/BankStatement'), { ssr: false });
const ManageBankV2 = dynamic(() => import('@/app/doc_pages/pages/v2/ManageBank'), { ssr: false });
const IncrementLetterV2 = dynamic(() => import('@/app/doc_pages/pages/v2/OfferLetter'), { ssr: false }); // Using OfferLetter as fallback

interface DocumentGeneratorFrameProps {
  documentType: string;
  title: string;
  description: string;
  backPath: string;
  backLabel: string;
}

const DocumentGeneratorFrame: React.FC<DocumentGeneratorFrameProps> = ({
  documentType,
  title,
  description,
  backPath,
  backLabel
}) => {
  // Render the appropriate document component based on type
  const renderDocumentComponent = () => {
    // Map v1 document types to v2 components
    if (documentType.startsWith('v2/')) {
      // V2 documents
      switch (documentType) {
        case 'v2/offer-letter':
          return <OfferLetterV2 />;
        case 'v2/appointment-letter':
          return <AppointmentLetterV2 />;
        case 'v2/relieving-letter':
          return <RelievingLetterV2 />;
        case 'v2/appraisal-letter':
          return <AppraisalLetterV2 />;
        case 'v2/payslip':
          return <PaySlipGeneratorV2 />;
        case 'v2/bank-statement':
          return <BankStatementV2 />;
        case 'v2/manage-bank':
          return <ManageBankV2 />;
        default:
          return <div>V2 document type not found</div>;
      }
    } else {
      // Standard documents (v1) - use V2 components instead of v1
      switch (documentType) {
        case 'offer-letter':
          return <OfferLetterV2 />;
        case 'appointment-letter':
          return <AppointmentLetterV2 />;
        case 'relieving-letter':
          return <RelievingLetterV2 />;
        case 'appraisal-letter':
          return <AppraisalLetterV2 />;
        case 'increment-letter':
          return <IncrementLetterV2 />;
        case 'payslip':
          return <PaySlipGeneratorV2 />;
        default:
          return <div>Document type not found</div>;
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link href={backPath} className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
          <FiArrowLeft size={16} /> {backLabel}
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="document-container w-full">
          {renderDocumentComponent()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentGeneratorFrame; 