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
  
  // Login Credentials - Make password required
  password: string; // Changed from optional to required
  
  // Identification Documents
  aadharCard?: string;
  drivingLicense?: string;
  panCard?: string;
  voterID?: string;
  
  // Bank Details
  bankName?: string;
  accountNo?: string;
  ifscCode?: string;
  accountHolderName?: string;
  branchName?: string;
  
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
    grade?: string;
  };
  
  // 12th Standard
  twelthStandard?: {
    school?: string;
    branch?: string;
    month?: string;
    passingYear?: string;
    schoolName?: string;
    marks?: string;
    board?: string;
    grade?: string;
  };
  
  // Diploma
  diploma?: {
    name?: string;
    branch?: string;
    month?: string;
    passingYear?: string;
    collegeName?: string;
    marks?: string;
    institute?: string;
    grade?: string;
  };
  
  // 10th Standard
  tenthStandard?: {
    school?: string;
    month?: string;
    passingYear?: string;
    schoolName?: string;
    marks?: string;
    board?: string;
    grade?: string;
    medium?: string;
  };
  
  // Legacy fields (keeping for backward compatibility)
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive';
  imageUrl?: string;
  
  // Salary information for offer letter
  salary?: number;
  
  // Audit fields
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
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
  relievingCtc?: number | null;
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
  educationAllowance?: number;
  monthlyReimbursement?: number;
  lta?: number;
  statutoryBonus?: number;
  healthInsurance?: number;
  employerPF?: number;
  paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
  
  // Job Details
  jobTitle?: string;
  designation?: string;
  department?: string;
  location?: string;
  reportingManager?: string;
  reportingAuthority?: string;
  employmentType?: string;
  workSchedule?: string;
  probationPeriod?: string;
  noticePeriod?: string;
  benefits: string[];
  
  // Resignation Details
  resignationDate?: string;
  lastWorkingDate?: string;
  reasonForLeaving?: string;
  exitInterviewDate?: string;
  
  // Appraisal Details
  appraisalDate?: string;
  previousSalary?: number;
  newSalary?: number;
  percentageIncrease?: number;
  performanceRating?: string;
  effectiveDate?: string;
  
  // NEW: Attendance Array
  attendance?: AttendanceRecord[];
  
  // NEW: Leaves Array
  leaves?: LeaveRecord[];
  
  // Audit fields
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

// NEW: Simplified attendance record for employment array
export interface AttendanceRecord {
  date: string; // YYYY-MM-DD format
  checkInTime?: string; // HH:MM:SS format
  checkOutTime?: string; // HH:MM:SS format
  checkInTimestamp?: any; // Firestore timestamp
  checkOutTimestamp?: any; // Firestore timestamp
  status: 'present' | 'absent' | 'late' | 'half-day';
  totalHours?: number;
  isLate?: boolean;
  isEarlyCheckOut?: boolean;
  checkInLocation?: string;
  checkOutLocation?: string;
  notes?: string;
}

// NEW: Leave record for employment array
export interface LeaveRecord {
  id?: string; // Generated ID for the leave record
  type: 'annual' | 'sick' | 'casual' | 'maternity' | 'paternity' | 'other';
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  reason: string;
  totalDays: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  appliedDate: string; // YYYY-MM-DD format
  approvedBy?: string; // Admin/Manager ID who approved
  approvedAt?: string; // YYYY-MM-DD format
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
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
  grossSalary?: number;
  totalAllowances?: number;
  totalDeductions?: number;
  lossOfPay?: number;
  workingDays?: number;
  paidDays?: number;
  issueDate: string;
  paidDate?: string;
  status: 'draft' | 'issued' | 'paid';
  documentUrl?: string;
}

// Document types for document generation
export interface Document {
  id: string;
  employeeId: string;
  employmentId?: string;
  documentType: 'offer' | 'appointment' | 'relieving' | 'appraisal' | 'increment' | 'payslip';
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'issued' | 'signed';
  documentUrl?: string;
  data?: any;
}

// Company information for documents
export interface Company {
  id: string;
  name: string;
  address: string;
  mobile: string;
  email: string;
  website: string;
  cin: string;
  logo: string;
  hrName: string;
  hrMobile: string;
  color: string;
  gstin?: string;
  pan?: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    branch: string;
  };
  signatory?: {
    name: string;
    designation: string;
  };
} 

// Simplify the Salary interface to only include essential fields
export interface Salary {
  id: string;
  employeeId: string;
  employmentId: string;
  
  // Essential Salary Information Only
  basicSalary: number;
  inhandSalary: number;
  totalSalary: number;
  
  // Period Information
  month: number;
  year: number;
  
  // Audit fields
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

// Attendance type
export interface Attendance {
  id: string;
  employeeId: string;
  employmentId: string;
  
  // Attendance Details
  date: string; // YYYY-MM-DD format
  checkInTime?: string; // HH:MM:SS format
  checkOutTime?: string; // HH:MM:SS format
  checkInTimestamp?: any; // Firestore timestamp
  checkOutTimestamp?: any; // Firestore timestamp
  
  // Status and Calculations
  status: 'present' | 'absent' | 'late' | 'half-day';
  totalHours?: number;
  isLate?: boolean;
  isEarlyCheckOut?: boolean;
  
  // Location (Optional)
  checkInLocation?: string;
  checkOutLocation?: string;
  
  // Notes
  notes?: string;
  
  // Audit fields
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
} 