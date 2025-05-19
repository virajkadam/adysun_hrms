'use client';

import React from 'react';
import DocumentGeneratorFrame from '@/components/documents/DocumentGeneratorFrame';

export default function PayslipV2Page() {
  return (
    <DocumentGeneratorFrame
      documentType="v2/payslip"
      title="Payslip Generator (v2)"
      description="Generate and customize payslips with selectable text"
      backPath="/dashboard/documents/v2"
      backLabel="Back to Documents"
    />
  );
} 