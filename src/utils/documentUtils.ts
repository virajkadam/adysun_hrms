import { db, storage } from '@/firebase/config';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Document, Company, Employee } from '@/types';

// Company related functions
export const getCompany = async (id: string): Promise<Company> => {
  try {
    const docRef = doc(db, 'companies', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // Create a default company if none exists
      const defaultCompany: Omit<Company, 'id'> = {
        name: 'Adysun Technologies',
        address: '123 Tech Park, Bangalore, Karnataka, India',
        phone: '+91 9876543210',
        email: 'contact@adysun.com',
        website: 'www.adysun.com',
        gstin: 'GST12345678',
        pan: 'ABCDE1234F',
        cin: 'U12345AB2023PTC123456',
        bankDetails: {
          accountName: 'Adysun Technologies Pvt Ltd',
          accountNumber: '12345678901234',
          bankName: 'HDFC Bank',
          ifscCode: 'HDFC0001234',
          branch: 'Main Branch',
        },
        signatory: {
          name: 'John Doe',
          designation: 'Director',
        },
        logo: ''
      };
      
      // Add the company to the database
      const newCompanyRef = await addDoc(collection(db, 'companies'), defaultCompany);
      
      // Return the newly created company
      return { id: newCompanyRef.id, ...defaultCompany };
    }
    
    return { id: docSnap.id, ...docSnap.data() } as Company;
  } catch (error) {
    console.error('Error in getCompany:', error);
    throw new Error('Failed to get or create company');
  }
};

export const getCompanies = async (): Promise<Company[]> => {
  const querySnapshot = await getDocs(collection(db, 'companies'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Company);
};

export const addCompany = async (company: Omit<Company, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'companies'), company);
  return docRef.id;
};

export const updateCompany = async (id: string, company: Partial<Company>): Promise<void> => {
  await updateDoc(doc(db, 'companies', id), company);
};

export const deleteCompany = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'companies', id));
};

// Employee related functions
export const getEmployee = async (id: string): Promise<Employee> => {
  const docRef = doc(db, 'employees', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error('Employee not found');
  }
  
  return { id: docSnap.id, ...docSnap.data() } as Employee;
};

export const getEmployees = async (): Promise<Employee[]> => {
  const querySnapshot = await getDocs(collection(db, 'employees'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Employee);
};

// Document related functions
export const getDocument = async (id: string): Promise<Document> => {
  const docRef = doc(db, 'documents', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error('Document not found');
  }
  
  return { id: docSnap.id, ...docSnap.data() } as Document;
};

export const getDocuments = async (): Promise<Document[]> => {
  const querySnapshot = await getDocs(collection(db, 'documents'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Document);
};

export const getEmployeeDocuments = async (employeeId: string): Promise<Document[]> => {
  const q = query(collection(db, 'documents'), where('employeeId', '==', employeeId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Document);
};

export const addDocument = async (document: Omit<Document, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'documents'), document);
  return docRef.id;
};

export const updateDocument = async (id: string, document: Partial<Document>): Promise<void> => {
  await updateDoc(doc(db, 'documents', id), document);
};

export const deleteDocument = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'documents', id));
};

// PDF related functions
export const uploadPdf = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Convert number to words (for salary amounts)
export const numberToWords = (num: number): string => {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertLessThanOneThousand = (n: number): string => {
    if (n < 20) {
      return units[n];
    }
    
    const digit = n % 10;
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (digit ? ' ' + units[digit] : '');
    }
    
    return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + convertLessThanOneThousand(n % 100) : '');
  };

  if (num === 0) return 'Zero';
  
  const indian = ['', 'Thousand', 'Lakh', 'Crore'];
  
  let result = '';
  let index = 0;
  
  while (num > 0) {
    let chunk: number;
    
    if (index === 0) {
      chunk = num % 1000;
      num = Math.floor(num / 1000);
    } else if (index === 1) {
      chunk = num % 100;
      num = Math.floor(num / 100);
    } else {
      chunk = num % 100;
      num = Math.floor(num / 100);
    }
    
    if (chunk) {
      result = convertLessThanOneThousand(chunk) + ' ' + indian[index] + ' ' + result;
    }
    
    index++;
  }
  
  return result.trim();
};

export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Date formatting utilities
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
};

// Salary calculation related functions
export const calculateSalaryComponents = (lpa: number) => {
  const monthlyMultiplier = 1/12;
  const annual = lpa * 100000; // Convert LPA to annual amount
  
  // Basic - 50% of CTC
  const basic = annual * 0.5;
  
  // HRA - 40% of Basic
  const hra = basic * 0.4;
  
  // Education Allowance - Fixed
  const educationAllowance = 2400;
  
  // Monthly Reimbursement - Fixed
  const monthlyReimbursement = 36000;
  
  // LTA - 8% of Basic
  const lta = basic * 0.08;
  
  // Statutory Bonus - 8.33% of Basic, capped at 20991
  const statutoryBonus = Math.min(basic * 0.0833, 20991);
  
  // Calculate remaining amount for Special Allowance
  const subTotal = basic + hra + educationAllowance + monthlyReimbursement + lta + statutoryBonus;
  
  // Employer Contributions
  const gratuity = basic * 0.0417; // 4.17% of basic
  const monthlyWellness = 1200;
  const healthInsurance = annual * 0.00429; // 0.429% of CTC
  const employerPF = Math.min(basic * 0.12, 21600); // 12% of basic, capped at 21600
  
  // Special Allowance is the balancing amount
  const specialAllowance = annual - subTotal - gratuity - monthlyWellness - healthInsurance - employerPF;
  
  return {
    monthly: {
      basic: basic * monthlyMultiplier,
      hra: hra * monthlyMultiplier,
      educationAllowance: educationAllowance * monthlyMultiplier,
      monthlyReimbursement: monthlyReimbursement * monthlyMultiplier,
      lta: lta * monthlyMultiplier,
      statutoryBonus: statutoryBonus * monthlyMultiplier,
      specialAllowance: specialAllowance * monthlyMultiplier,
      gratuity: gratuity * monthlyMultiplier,
      monthlyWellness: monthlyWellness * monthlyMultiplier,
      healthInsurance: healthInsurance * monthlyMultiplier,
      employerPF: employerPF * monthlyMultiplier,
      totalMonthly: (basic + hra + educationAllowance + monthlyReimbursement + lta + statutoryBonus + specialAllowance) * monthlyMultiplier
    },
    annual: {
      basic: basic,
      hra: hra,
      educationAllowance: educationAllowance,
      monthlyReimbursement: monthlyReimbursement,
      lta: lta,
      statutoryBonus: statutoryBonus,
      specialAllowance: specialAllowance,
      gratuity: gratuity,
      monthlyWellness: monthlyWellness,
      healthInsurance: healthInsurance,
      employerPF: employerPF,
      total: annual
    },
    lpa,
    salaryInWords: `${numberToWords(lpa)} Lakh`
  };
};

// Calculate salary components for the appraisal letter
export const calculateAppraisalSalaryComponents = (lpa: number) => {
  const annualSalary = lpa * 100000;

  // Standard Indian salary structure
  const basic = Math.round(annualSalary * 0.40); // 40% of CTC
  const hra = Math.round(basic * 0.50); // 50% of Basic
  const da = Math.round(annualSalary * 0.10); // 10% of CTC
  const conveyance = 19200; // Standard yearly conveyance
  const medical = 15000; // Standard medical allowance
  const special = annualSalary - (basic + hra + da + conveyance + medical);

  // Monthly calculations
  const monthlyBasic = Math.round(basic / 12);
  const monthlyHRA = Math.round(hra / 12);
  const monthlyDA = Math.round(da / 12);
  const monthlyConveyance = Math.round(conveyance / 12);
  const monthlyMedical = Math.round(medical / 12);
  const monthlySpecial = Math.round(special / 12);
  const monthlyTotal = monthlyBasic + monthlyHRA + monthlyDA + monthlyConveyance + monthlyMedical + monthlySpecial;

  return {
    basic: monthlyBasic.toFixed(2),
    hra: monthlyHRA.toFixed(2),
    da: monthlyDA.toFixed(2),
    conveyance: monthlyConveyance.toFixed(2),
    medical: monthlyMedical.toFixed(2),
    special: monthlySpecial.toFixed(2),
    total: monthlyTotal.toFixed(2),
    salaryInWords: `Rupees ${numberToWords(annualSalary)} Only Per Annum`
  };
};

// Calculate monthly payslip components
export const calculatePayslipComponents = (salary: number) => {
  // Base calculations
  const basic = Math.round(salary * 0.40); // 40% of salary
  const hra = Math.round(basic * 0.50); // 50% of basic
  const specialAllowance = salary - (basic + hra);
  
  // Deductions
  const pf = Math.min(Math.round(basic * 0.12), 1800); // 12% of basic, max 1800
  const pt = 200; // Professional Tax, fixed
  
  // Calculate net salary
  const totalEarnings = basic + hra + specialAllowance;
  const totalDeductions = pf + pt;
  const netSalary = totalEarnings - totalDeductions;
  
  return {
    earnings: {
      basic,
      hra,
      specialAllowance
    },
    deductions: {
      pf,
      pt
    },
    totalEarnings,
    totalDeductions,
    netSalary
  };
}; 