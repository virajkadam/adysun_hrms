'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { db } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { CompanyHeader, FormattedDate, Paragraph, Signature, Footer, Watermark } from '@/components/pdf/PDFComponents';
import { commonStyles } from '@/components/pdf/PDFStyles';
import { formatIndianCurrency, numberToWords } from '@/components/pdf/SalaryUtils';
import toast, { Toaster } from 'react-hot-toast';

// Define styles for the Salary Slip
const salarySlipStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Calibri',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Calibri',
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontFamily: 'Calibri',
  },
  headerCell: {
    flex: 1,
    padding: 5,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
    backgroundColor: '#f0f0f0',
  },
  bold: {
    fontWeight: 'bold',
  },
  employeeInfoContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
  },
  employeeInfoSection: {
    flex: 1,
    padding: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  infoValue: {
    flex: 2,
    fontSize: 10,
    fontFamily: 'Calibri',
  },
  earningsDeductionsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 15,
  },
  earningsSection: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  deductionsSection: {
    flex: 1,
  },
  columnHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 5,
  },
  columnHeaderText: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  amountColumnHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
    textAlign: 'right',
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 5,
  },
  itemName: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Calibri',
  },
  itemAmount: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Calibri',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  totalLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  totalAmount: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
    textAlign: 'right',
  },
  netPayContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  netPayRow: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#e6e6e6',
  },
  netPayLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  netPayAmount: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
    textAlign: 'right',
  },
  netPayWords: {
    padding: 8,
    fontSize: 11,
    fontFamily: 'Calibri',
    fontStyle: 'italic',
  },
  signature: {
    marginTop: 50,
    flexDirection: 'row',
  },
  signatureSection: {
    flex: 1,
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 11,
    fontFamily: 'Calibri',
    marginTop: 20,
  },
  page: {
    padding: 40,
    paddingBottom: 60,
    fontFamily: 'Calibri',
    fontSize: 11,
    backgroundColor: 'white',
  },
});

// Salary Slip PDF Document Component
const SalarySlipPDF = ({ formData }) => {
  const safeFormData = formData || {};

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return "";
    }
  };

  // Get month and year for salary slip
  const getSalarySlipMonth = () => {
    const payDate = safeFormData.payDate ? new Date(safeFormData.payDate) : new Date();
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(payDate).toUpperCase();
  };

  return (
    <Document>
      <Page size="A4" style={salarySlipStyles.page}>
        {/* Watermark */}
        <Watermark logoSrc={safeFormData.companyLogo} />

        {/* Company Header */}
        <CompanyHeader
          companyName={safeFormData.companyName || 'COMPANY NAME'}
          companyAddress={safeFormData.companyAddressLine1 || 'COMPANY ADDRESS'}
          companyLogo={safeFormData.companyLogo}
          companyPhone={safeFormData.companyPhone || 'PHONE NUMBER'}
          companyWebsite={safeFormData.companyWebsite || 'WEBSITE'}
          companyColor={safeFormData.companyColor || '#FF0000'}
        />

        {/* Salary Slip Title */}
        <Text style={salarySlipStyles.title}>SALARY SLIP FOR THE MONTH OF {getSalarySlipMonth()}</Text>

        {/* Employee Information */}
        <View style={salarySlipStyles.employeeInfoContainer}>
          <View style={{ ...salarySlipStyles.employeeInfoSection, flexDirection: 'column' }}>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>EMP Code</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.employeeId || 'EMP001'}</Text>
            </View>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>Name</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.employeeName || 'Employee Name'}</Text>
            </View>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>Designation</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.designation || 'Designation'}</Text>
            </View>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>PAN</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.pan || 'XXXXXXXXXX'}</Text>
            </View>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>Location</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.location || 'Location'}</Text>
            </View>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>DOJ</Text>
              <Text style={salarySlipStyles.infoValue}>{formatDate(safeFormData.payDate) || 'DD/MM/YYYY'}</Text>
            </View>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>Department</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.department || 'Department'}</Text>
            </View>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>Payable Days</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.payableDays || '30'}</Text>
            </View>
          </View>

          <View style={salarySlipStyles.employeeInfoSection}>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>Bank Name:</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.bankName || 'Bank Name'}</Text>
            </View>
            <View style={salarySlipStyles.infoRow}>
              <Text style={salarySlipStyles.infoLabel}>Bank A/C No:</Text>
              <Text style={salarySlipStyles.infoValue}>{safeFormData.accountNumber || 'XXXXXXXXXXXX'}</Text>
            </View>
          </View>
        </View>

        {/* Salary Information - Earnings and Deductions */}
        <View style={salarySlipStyles.earningsDeductionsContainer}>
          {/* Earnings Section */}
          <View style={salarySlipStyles.earningsSection}>
            <View style={salarySlipStyles.columnHeader}>
              <Text style={salarySlipStyles.columnHeaderText}>Earnings</Text>
              <Text style={salarySlipStyles.amountColumnHeader}>Amount (₹)</Text>
            </View>

            {/* Earnings Items */}
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}>Basic</Text>
              <Text style={salarySlipStyles.itemAmount}>Rs. {formatIndianCurrency(safeFormData.basicSalary || 0)}</Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}>DA</Text>
              <Text style={salarySlipStyles.itemAmount}>Rs. {formatIndianCurrency(safeFormData.da || 0)}</Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}>Conveyance Allowance</Text>
              <Text style={salarySlipStyles.itemAmount}>Rs. {formatIndianCurrency(safeFormData.conveyanceAllowance || 0)}</Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}>Other Allowance</Text>
              <Text style={salarySlipStyles.itemAmount}>Rs. {formatIndianCurrency(safeFormData.otherAllowance || 0)}</Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}>Medical Allowance</Text>
              <Text style={salarySlipStyles.itemAmount}>Rs. {formatIndianCurrency(safeFormData.medicalAllowance || 0)}</Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}>CCA</Text>
              <Text style={salarySlipStyles.itemAmount}>Rs. {formatIndianCurrency(safeFormData.cca || 0)}</Text>
            </View>

            {/* Total Earnings */}
            <View style={salarySlipStyles.totalRow}>
              <Text style={salarySlipStyles.totalLabel}>Gross Salary</Text>
              <Text style={salarySlipStyles.totalAmount}>
                Rs. {formatIndianCurrency(
                  (safeFormData.basicSalary || 0) +
                  (safeFormData.da || 0) +
                  (safeFormData.conveyanceAllowance || 0) +
                  (safeFormData.otherAllowance || 0) +
                  (safeFormData.medicalAllowance || 0) +
                  (safeFormData.cca || 0)
                )}
              </Text>
            </View>
          </View>

          {/* Deductions Section */}
          <View style={salarySlipStyles.deductionsSection}>
            <View style={salarySlipStyles.columnHeader}>
              <Text style={salarySlipStyles.columnHeaderText}>Deductions</Text>
              <Text style={salarySlipStyles.amountColumnHeader}>Amount (₹)</Text>
            </View>

            {/* Deduction Items */}
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}>Professional Tax</Text>
              <Text style={salarySlipStyles.itemAmount}>Rs. {formatIndianCurrency(safeFormData.professionalTax || 0)}</Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}>Other Deductions</Text>
              <Text style={salarySlipStyles.itemAmount}>Rs. {formatIndianCurrency(safeFormData.otherDeductions || 0)}</Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}></Text>
              <Text style={salarySlipStyles.itemAmount}></Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}></Text>
              <Text style={salarySlipStyles.itemAmount}></Text>
            </View>
            <View style={salarySlipStyles.item}>
              <Text style={salarySlipStyles.itemName}></Text>
              <Text style={salarySlipStyles.itemAmount}></Text>
            </View>

            {/* Total Deductions */}
            <View style={salarySlipStyles.totalRow}>
              <Text style={salarySlipStyles.totalLabel}>Total Deductions</Text>
              <Text style={salarySlipStyles.totalAmount}>
                Rs. {formatIndianCurrency(
                  (safeFormData.professionalTax || 0) +
                  (safeFormData.otherDeductions || 0)
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* Net Pay */}
        <View style={salarySlipStyles.netPayContainer}>
          <View style={salarySlipStyles.netPayRow}>
            <Text style={salarySlipStyles.netPayLabel}>Net Pay</Text>
            <Text style={salarySlipStyles.netPayAmount}>
              Rs. {formatIndianCurrency(
                (safeFormData.basicSalary || 0) +
                (safeFormData.da || 0) +
                (safeFormData.conveyanceAllowance || 0) +
                (safeFormData.otherAllowance || 0) +
                (safeFormData.medicalAllowance || 0) +
                (safeFormData.cca || 0) -
                (safeFormData.professionalTax || 0) -
                (safeFormData.otherDeductions || 0)
              )}
            </Text>
          </View>
          <Text style={salarySlipStyles.netPayWords}>
            Amount in words: {safeFormData.amountInWords || 'Rupees only'}
          </Text>
        </View>

        {/* Signature */}
        <View style={salarySlipStyles.signature}>
          <View style={salarySlipStyles.signatureSection}>
            <Text style={salarySlipStyles.signatureText}>Employee Signature</Text>
          </View>
          <View style={salarySlipStyles.signatureSection}>
            <Text style={salarySlipStyles.signatureText}>Authorised Signatory</Text>
          </View>
        </View>

        {/* This is a computer generated salary slip */}
        <Text style={{ fontSize: 9, marginTop: 30, textAlign: 'center', fontFamily: 'Calibri' }}>
          This is a computer-generated Salary slip. No Signature is required.
        </Text>

        {/* Footer */}
        <Footer
          companyName={safeFormData.companyName || 'COMPANY NAME'}
          companyAddress={safeFormData.companyAddressLine1 || 'COMPANY ADDRESS'}
          companyPhone={safeFormData.companyPhone || 'PHONE NUMBER'}
          companyWebsite={safeFormData.companyWebsite || 'WEBSITE'}
          companyColor={safeFormData.companyColor || '#FF0000'}
        />
      </Page>
    </Document>
  );
};

// Main Component
function SalarySlipGeneratorV2() {
  const [companies, setCompanies] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [employments, setEmployments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showPDF, setShowPDF] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    payDate: new Date().toISOString().split('T')[0],
    location: "",
    payableDays: "30",
    leaves: "0",
    month: new Date().getMonth().toString(),
    pan: "",
    basicSalary: 0,
    da: 0,
    conveyanceAllowance: 0,
    otherAllowance: 0,
    medicalAllowance: 0,
    cca: 0,
    professionalTax: 0,
    otherDeductions: 0,
    companyName: "",
    companyAddressLine1: "",
    companyColor: "",
    companyEmail: "",
    companyPhone: "",
    companyWebsite: "",
    companyLogo: "",
    companyHR: ""
  });

  // Use React.useMemo to memoize the PDF document to prevent unnecessary re-renders
  const memoizedPdfDocument = React.useMemo(() => (
    <SalarySlipPDF formData={formData} />
  ), [formData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchCompanies();
        await fetchCandidates();
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('Failed to load data');
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const fetchCompanies = async () => {
    const querySnapshot = await getDocs(collection(db, "companies"));
    const companyList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCompanies(companyList);
  };

  const fetchCandidates = async () => {
    try {
      // Try fetching from 'employees' collection
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employeesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched Employees:", employeesList);
      setCandidates(employeesList);

      // Now fetch all employments for these employees
      const employmentData = {};
      for (const employee of employeesList) {
        try {
          // Query employments for this employee
          const q = query(collection(db, 'employments'), where('employeeId', '==', employee.id));
          const empSnapshot = await getDocs(q);

          if (!empSnapshot.empty) {
            // Get the most recent employment (usually there will be just one)
            const employmentsList = empSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Sort by startDate (descending) to get the most recent employment first
            const sortedEmployments = employmentsList.sort((a, b) => {
              return new Date(b.startDate) - new Date(a.startDate);
            });

            employmentData[employee.id] = sortedEmployments[0];
            console.log(`Found employment for ${employee.name}:`, sortedEmployments[0]);
          } else {
            console.log(`No employment found for employee: ${employee.name}`);
          }
        } catch (err) {
          console.error(`Error fetching employment for employee ${employee.id}:`, err);
        }
      }

      setEmployments(employmentData);

      if (employeesList.length === 0) {
        console.warn("No employees found in the database. Please add employees in the admin dashboard first.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Add this function to calculate days in month
  const getDaysInMonth = (month) => {
    const year = new Date().getFullYear();
    return new Date(year, month + 1, 0).getDate();
  };

  // Calculate salary components
  const calculateSalary = (lpa, leaves = 0, selectedMonth) => {
    // Convert inputs to numbers and provide defaults
    const lpaNum = Number(lpa) || 0;
    const leavesNum = Number(leaves) || 0;
    const monthNum = Number(selectedMonth) || new Date().getMonth();

    // Get total days in selected month
    const daysInMonth = getDaysInMonth(monthNum);

    // Calculate payable days
    const payableDays = Math.max(0, daysInMonth - leavesNum);

    // Calculate base annual salary
    const annualSalary = lpaNum * 100000;

    // Calculate per day salary
    const perDaySalary = (annualSalary / 12) / daysInMonth;

    // Calculate effective monthly salary after leave deductions
    const effectiveSalary = Math.max(0, (annualSalary / 12) - (perDaySalary * leavesNum));

    // Calculate components with null checks and Math.max to prevent negative values
    const monthlyBasic = Math.max(0, Math.round(effectiveSalary * 0.5));
    const da = Math.max(0, Math.round(monthlyBasic * 0.2));
    const conveyanceAllowance = Math.max(0, Math.round(1600));
    const medicalAllowance = Math.max(0, Math.round(1250));
    const cca = Math.max(0, Math.round(500));
    const otherAllowance = Math.max(0, Math.round(effectiveSalary - monthlyBasic - da - conveyanceAllowance - medicalAllowance - cca));

    // Professional tax varies by state, using standard 200 for example
    const professionalTax = 200;

    // Calculate net amount
    const totalEarnings = monthlyBasic + da + conveyanceAllowance + otherAllowance + medicalAllowance + cca;
    const totalDeductions = professionalTax;
    const netAmount = totalEarnings - totalDeductions;

    // Convert to Indian words
    const amountInWords = `Rupees ${numberToWords(netAmount)} Only`;

    return {
      basicSalary: monthlyBasic,
      da,
      conveyanceAllowance,
      otherAllowance,
      medicalAllowance,
      cca,
      professionalTax,
      otherDeductions: 0,
      amountInWords,
      payableDays
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "company") {
      const selectedCompany = companies.find(company => company.name === value);
      if (selectedCompany) {
        setFormData(prev => ({
          ...prev,
          companyName: selectedCompany.name,
          companyAddressLine1: selectedCompany.address,
          companyColor: selectedCompany.serverColor,
          companyEmail: selectedCompany.email,
          companyPhone: selectedCompany.mobile,
          companyWebsite: selectedCompany.website,
          companyLogo: selectedCompany.logo,
          companyHR: selectedCompany.hrName
        }));
      }
    } else if (name === "employeeName") {
      const selectedEmployee = candidates.find(employee => employee.name === value);
      if (selectedEmployee) {
        console.log("Selected Employee:", selectedEmployee);

        // Get the employment details for this employee
        const employmentDetails = employments[selectedEmployee.id];
        console.log("Employment details:", employmentDetails);

        let employeeSalary;
        let employeeDesignation;
        let employeeDepartment;
        let employeeLocation;
        let employeePAN;

        if (employmentDetails) {
          // If we have employment details, use those
          employeeSalary = employmentDetails.salary || employmentDetails.ctc || 0;
          employeeDesignation = employmentDetails.jobTitle || employmentDetails.designation;
          employeeDepartment = employmentDetails.department;
          employeeLocation = employmentDetails.location;
          employeePAN = selectedEmployee.pan; // Usually PAN is in employee record
        } else {
          // Fallback to employee record if no employment details
          employeeSalary = selectedEmployee.salary || 0;
          employeeDesignation = selectedEmployee.position || selectedEmployee.jobTitle;
          employeeDepartment = selectedEmployee.department;
          employeeLocation = selectedEmployee.location;
          employeePAN = selectedEmployee.pan;
        }

        // Calculate CTC in LPA
        const ctcValue = employeeSalary ? (employeeSalary / 100000) : 0;

        // Get current month and leaves
        const currentMonth = formData.month;
        const leaves = formData.leaves;

        // Calculate salary components
        const salaryComponents = calculateSalary(ctcValue, leaves, currentMonth);

        setFormData(prev => ({
          ...prev,
          employeeName: selectedEmployee.name,
          employeeId: selectedEmployee.employeeId || selectedEmployee.id,
          designation: employeeDesignation || "",
          department: employeeDepartment || "",
          location: employeeLocation || "",
          pan: employeePAN || "",
          ...salaryComponents
        }));
      }
    } else if (name === "leaves" || name === "month") {
      // Recalculate salary when leaves or month changes
      const updatedFormData = { ...formData, [name]: value };

      // Find the selected employee to get LPA
      const selectedEmployee = candidates.find(employee => employee.name === formData.employeeName);
      if (selectedEmployee) {
        // Get the employment details
        const employmentDetails = employments[selectedEmployee.id];
        let employeeSalary;

        if (employmentDetails) {
          employeeSalary = employmentDetails.salary || employmentDetails.ctc || 0;
        } else {
          employeeSalary = selectedEmployee.salary || 0;
        }

        // Calculate CTC in LPA
        const ctcValue = employeeSalary ? (employeeSalary / 100000) : 0;

        // Calculate updated salary
        const salaryComponents = calculateSalary(
          ctcValue,
          updatedFormData.leaves,
          updatedFormData.month
        );

        setFormData({
          ...updatedFormData,
          ...salaryComponents
        });
      } else {
        setFormData(updatedFormData);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleGenerateSalarySlip = () => {
    setShowPDF(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" />
      <div className="mb-4">
        <Link href="/dashboard/documents" className="text-blue-600 hover:underline flex items-center gap-1">
          <FiArrowLeft size={16} /> Back to Documents
        </Link>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Salary Slip Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Employee Name</label>
            <select
              name="employeeName"
              value={formData.employeeName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Employee</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.name}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Company</label>
            <select
              name="company"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Month</label>
            <select
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>

          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Leaves</label>
            <input
              type="number"
              name="leaves"
              value={formData.leaves}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max={getDaysInMonth(Number(formData.month))}
            />
          </div>

          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Payable Days</label>
            <input
              type="text"
              value={formData.payableDays || getDaysInMonth(Number(formData.month))}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              readOnly
            />

          </div>

          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Pay Date</label>
            <input
              type="date"
              name="payDate"
              value={formData.payDate}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGenerateSalarySlip}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-md transition-all duration-200"
          >
            <FiDownload size={18} className="mr-2" />
            <span>Generate Salary Slip</span>
          </button>
        </div>
      </div>

      {/* PDF Preview Section - only show when Generate button is clicked */}
      {showPDF && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">PDF Preview</h3>

            <PDFDownloadLink
              document={memoizedPdfDocument}
              fileName={`SalarySlip_${formData.employeeName || 'Employee'}_${formData.payDate}.pdf`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
          </div>

          <div className="border rounded-lg" style={{ height: '80vh' }}>
            <PDFViewer width="100%" height="100%" className="rounded-lg">
              {memoizedPdfDocument}
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalarySlipGeneratorV2;
