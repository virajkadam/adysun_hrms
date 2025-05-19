'use client';

import React from 'react';
import DocumentGeneratorFrame from '@/components/documents/DocumentGeneratorFrame';

export default function PayslipPage() {
  return (
    <DocumentGeneratorFrame
      documentType="payslip"
      title="Payslip Generator"
      description="Generate and customize payslips for employees"
      backPath="/dashboard/documents"
      backLabel="Back to Documents"
    />
  );
} 