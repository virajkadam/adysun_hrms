// Employee type
export interface Employee {
  id: string;
  // Personal Details
  name: string;
  dateOfBirth?: string;
  employeeId?: string;
  isActive?: boolean;
  homeTown?: string;
  
  // Contact Information
  email: string;
  phone: string;
  currentAddress?: string;
  permanentAddress?: string;
  
  // Identification Documents
  aadharCard?: string;
  drivingLicense?: string;
  panCard?: string;
  voterID?: string;
  vanNo?: string;
  
  // Bank Details
  bankName?: string;
  accountNo?: string;
  ifscCode?: string;
  accountHolderName?: string;
  
  // Educational Details
  // Higher Education
  graduation?: {
    degree?: string;
    branch?: string;
    month?: string;
    passingYear?: string;
    collegeName?: string;
    universityName?: string;
    marks?: string;
  };
  
  // 12th Standard
  twelthStandard?: {
    school?: string;
    branch?: string;
    month?: string;
    passingYear?: string;
    schoolName?: string;
    marks?: string;
  };
  
  // Other Education
  otherEducation?: {
    diploma?: string;
    branch?: string;
    month?: string;
    passingYear?: string;
    collegeName?: string;
    marks?: string;
  };
  
  // 10th Standard
  tenthStandard?: {
    school?: string;
    month?: string;
    passingYear?: string;
    schoolName?: string;
    marks?: string;
  };
  
  // Legacy fields (keeping for backward compatibility)
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive';
  imageUrl?: string;
}

// Employment type
export interface Employment {
  id: string;
  employeeId: string;
  
  // Employment Information
  employmentId?: string;
  joiningDate?: string;
  incrementDate?: string;
  contractType: 'full-time' | 'part-time' | 'contract';
  startDate: string;
  endDate?: string;
  ctc?: number;
  inHandCtc?: number;
  relievingCtc?: number;
  isIT?: boolean;
  isResignation?: boolean;
  
  // Salary Information
  salary: number;
  salaryId?: string;
  salaryPerMonth?: number;
  basic?: number;
  da?: number;
  hra?: number;
  pf?: number;
  medicalAllowance?: number;
  transport?: number;
  gratuity?: number;
  totalLeaves?: number;
  salaryCreditDate?: string;
  payableDays?: number;
  paymentMode?: string;
  additionalAllowance?: number;
  specialAllowance?: number;
  paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
  
  // Job Details
  jobTitle?: string;
  department?: string;
  location?: string;
  reportingManager?: string;
  employmentType?: string;
  workSchedule?: string;
  benefits: string[];
}

// Salary Slip type
export interface SalarySlip {
  id: string;
  employeeId: string;
  employmentId: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: {
    type: string;
    amount: number;
  }[];
  deductions: {
    type: string;
    amount: number;
  }[];
  netSalary: number;
  issueDate: string;
  paidDate?: string;
  status: 'draft' | 'issued' | 'paid';
  documentUrl?: string;
} 