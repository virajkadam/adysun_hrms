'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { db } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { commonStyles } from '@/components/pdf/PDFStyles';
import { CompanyHeader, FormattedDate, Paragraph, Signature, Footer } from '@/components/pdf/PDFComponents';
import { formatIndianCurrency, numberToWords } from '@/components/pdf/SalaryUtils';

// Define styles for the AppraisalLetter
const appraisalLetterStyles = StyleSheet.create({
  page: {
    padding: '25px 50px',
    fontSize: 10,
    fontFamily: 'Calibri',
    lineHeight: 1.3,
    color: '#000000',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  date: {
    marginBottom: 8,
    fontFamily: 'Calibri',
  },
  employeeName: {
    marginBottom: 8,
    fontFamily: 'Calibri',
    textTransform: 'capitalize',
  },
  subject: {
    marginBottom: 10,
    fontFamily: 'Calibri',
  },
  para: {
    marginBottom: 8,
    textAlign: 'justify',
    fontFamily: 'Calibri',
    lineHeight: 1.3,
  },
  tableContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 3,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingVertical: 4,
  },
  tableRowTotal: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#000000',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingVertical: 4,
    fontWeight: 'bold',
  },
  tableCol1: {
    width: '60%',
  },
  tableCol2: {
    width: '40%',
    textAlign: 'right',
  },
  signatureSection: {
    marginTop: 25,
    fontFamily: 'Calibri',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: '#FF0000',
    paddingTop: 5,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    marginBottom: 1,
    fontFamily: 'Calibri',
    textAlign: 'center',
  }
});

// Watermark styles
const watermarkStyles = StyleSheet.create({
  watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watermarkImage: {
    width: '80%',
    height: 'auto',
    opacity: 0.17,
  }
});

// Watermark component
const Watermark = ({ logoSrc }) => {
  if (!logoSrc) return null;
  return (
    <View style={watermarkStyles.watermarkContainer}>
      <Image src={logoSrc} style={watermarkStyles.watermarkImage} />
    </View>
  );
};

// Appraisal Letter PDF Document Component
const AppraisalLetterPDF = ({ formData }) => {
  // Helper to safely access formData
  const safeFormData = formData || {};
  
  // Format date function
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

  return (
    <Document>
      <Page size="A4" wrap={false} style={{...commonStyles.page, ...appraisalLetterStyles.page}}>
        {/* Watermark */}
        <Watermark logoSrc={safeFormData.companyLogo} />
        {/* Company Header - More compact */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: safeFormData.companyColor || '#FF0000',
          paddingBottom: 4,
          marginBottom: 10,
        }}>
          <View>
            <Text style={{
              color: safeFormData.companyColor || '#FF0000',
              fontSize: 12,
              fontWeight: 'bold',
              fontFamily: 'Calibri',
              textTransform: 'uppercase',
            }}>
              {safeFormData.companyName || 'COMPANY NAME'}
            </Text>
            <Text style={{fontFamily: 'Calibri', fontSize: 8}}>
              {safeFormData.companyAddressLine1 || 'COMPANY ADDRESS'}
            </Text>
            <Text style={{fontFamily: 'Calibri', fontSize: 8}}>
              Phone: {safeFormData.companyPhone || 'PHONE NUMBER'}
            </Text>
            <Text style={{fontFamily: 'Calibri', fontSize: 8}}>
              {safeFormData.companyWebsite || 'WEBSITE'}
            </Text>
          </View>
          {safeFormData.companyLogo && (
            <Image src={safeFormData.companyLogo} style={{width: 40, height: 40}} />
          )}
        </View>
        
        {/* Letter Title */}
        <Text style={appraisalLetterStyles.title}>
          Employee Appraisal Letter
        </Text>
        
        {/* Letter Content - Everything in one continuous flow with no fixed height container */}
        <View style={{ position: 'relative' }}>
          {/* Date */}
          <Text style={appraisalLetterStyles.date}>
            Date - {formatDate(safeFormData.date)}
          </Text>
          
          {/* Employee Name */}
          <Text style={appraisalLetterStyles.employeeName}>
            {safeFormData.employeeName || 'Employee Name'},
          </Text>
          
          {/* Subject */}
          <Text style={appraisalLetterStyles.subject}>
            Sub: Appraisal Letter
          </Text>
          
          {/* Appreciation Text */}
          <Text style={appraisalLetterStyles.para}>
            We would like to express our appreciation and commendation for all the passion
            and commitment you have been exhibiting in your existing role. In recognition
            of your contribution, it is our pleasure to award you a gross increase in your
            salary with effect from {formatDate(safeFormData.date)}.
          </Text>
          
          <Text style={{...appraisalLetterStyles.para, marginBottom: 5}}>
            Your revised salary structure as follows:
          </Text>
          
          {/* Compensation Table - More compact */}
          <View style={appraisalLetterStyles.tableContainer}>
            {/* Table Header */}
            <View style={appraisalLetterStyles.tableHeader}>
              <Text style={appraisalLetterStyles.tableCol1}>Compensation Heads</Text>
              <Text style={appraisalLetterStyles.tableCol2}>Compensation (In INR)</Text>
            </View>
            
            {/* Basic Row */}
            <View style={appraisalLetterStyles.tableRow}>
              <Text style={appraisalLetterStyles.tableCol1}>Basic</Text>
              <Text style={appraisalLetterStyles.tableCol2}>Rs {safeFormData.basic || '0.00'}</Text>
            </View>
            
            {/* DA Row */}
            <View style={appraisalLetterStyles.tableRow}>
              <Text style={appraisalLetterStyles.tableCol1}>Dearness Allowance</Text>
              <Text style={appraisalLetterStyles.tableCol2}>Rs {safeFormData.da || '0.00'}</Text>
            </View>
            
            {/* Conveyance Row */}
            <View style={appraisalLetterStyles.tableRow}>
              <Text style={appraisalLetterStyles.tableCol1}>Conveyance Allowance</Text>
              <Text style={appraisalLetterStyles.tableCol2}>Rs {safeFormData.conveyance || '0.00'}</Text>
            </View>
            
            {/* Other Row */}
            <View style={appraisalLetterStyles.tableRow}>
              <Text style={appraisalLetterStyles.tableCol1}>Other allowance</Text>
              <Text style={appraisalLetterStyles.tableCol2}>Rs {safeFormData.other || '0.00'}</Text>
            </View>
            
            {/* Total Row */}
            <View style={appraisalLetterStyles.tableRowTotal}>
              <Text style={appraisalLetterStyles.tableCol1}>Monthly Total</Text>
              <Text style={appraisalLetterStyles.tableCol2}>Rs {safeFormData.total || '0.00'}</Text>
            </View>
          </View>
          
          {/* Expectation Text */}
          <Text style={appraisalLetterStyles.para}>
            We expect you to keep up your performance in the years to come and grow with
            the organization. Please sign and return the duplicate copy in token of your
            acceptance, for your records.
          </Text>
          
          <Text style={{...appraisalLetterStyles.para, marginBottom: 15}}>
            Wish you all the best.
          </Text>
          
          {/* Signature Section - Increased bottom margin to prevent footer overlap */}
          <View style={{...appraisalLetterStyles.signatureSection, marginBottom: 60}}>
            <Text>Signature</Text>
            <Text style={{ marginTop: 20 }}>Hr Manager</Text>
          </View>
          
          {/* Spacer to prevent overlap */}
          <View style={{ height: 20 }}></View>
        </View>
        
        {/* Footer - Adjusted position */}
        <View fixed style={{
          position: 'absolute',
          bottom: 20,
          left: 50,
          right: 50,
          borderTopWidth: 1,
          borderTopColor: safeFormData.companyColor || '#FF0000',
          paddingTop: 4,
          textAlign: 'center',
        }}>
          <Text style={appraisalLetterStyles.footerText}>{safeFormData.companyName || 'COMPANY NAME'}</Text>
          <Text style={appraisalLetterStyles.footerText}>{safeFormData.companyAddressLine1 || 'COMPANY ADDRESS'}</Text>
          <Text style={appraisalLetterStyles.footerText}>+91 {safeFormData.companyPhone || 'PHONE NUMBER'}</Text>
          <Text style={appraisalLetterStyles.footerText}>{safeFormData.companyWebsite || 'WEBSITE'}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Main Component
function AppraisalLetterV2() {
  const [companies, setCompanies] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [employments, setEmployments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showPDF, setShowPDF] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    designation: "",
    department: "",
    effectiveDate: "",
    incrementDate: "",
    joiningDate: "",
    previousSalary: "",
    newSalary: "",
    incrementAmount: "",
    percentageIncrease: "",
    companyName: "",
    companyAddressLine1: "",
    companyColor: "",
    companyEmail: "",
    companyPhone: "",
    companyWebsite: "",
    companyLogo: ""
  });

  // Use React.useMemo to memoize the PDF document to prevent unnecessary re-renders
  const memoizedPdfDocument = React.useMemo(() => (
    <AppraisalLetterPDF formData={formData} />
  ), [formData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchCompanies();
        await fetchCandidates();
      } catch (error) {
        console.error("Error fetching data:", error);
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
          companyLogo: selectedCompany.logo
        }));
      }
    } else if (name === "employeeName") {
      const selectedEmployee = candidates.find(employee => employee.name === value);
      if (selectedEmployee) {
        console.log("Selected Employee:", selectedEmployee);
        
        // Get the employment details for this employee
        const employmentDetails = employments[selectedEmployee.id];
        console.log("Employment details:", employmentDetails);
        
        let joiningDate;
        let employeeDesignation;
        let employeeDepartment;
        let employeeSalary;
        let incrementDate;
        
        if (employmentDetails) {
          // If we have employment details, use those
          joiningDate = employmentDetails.joiningDate || employmentDetails.startDate;
          employeeDesignation = employmentDetails.jobTitle || employmentDetails.designation;
          employeeDepartment = employmentDetails.department;
          employeeSalary = employmentDetails.salary;
          incrementDate = employmentDetails.incrementDate || new Date().toISOString().split('T')[0];
        } else {
          // Fallback to employee record if no employment details
          joiningDate = selectedEmployee.joinDate;
          employeeDesignation = selectedEmployee.position || selectedEmployee.jobTitle;
          employeeDepartment = selectedEmployee.department;
          employeeSalary = selectedEmployee.salary;
          incrementDate = new Date().toISOString().split('T')[0];
        }
        
        // Default values for new salary calculations
        const previousSalary = employeeSalary || 0;
        const percentageIncrease = 10; // Default 10% increase
        const incrementAmount = Math.round(previousSalary * (percentageIncrease / 100));
        const newSalary = previousSalary + incrementAmount;
        
        setFormData(prev => ({
          ...prev,
          employeeName: selectedEmployee.name,
          designation: employeeDesignation || "",
          department: employeeDepartment || "",
          joiningDate: joiningDate || new Date().toISOString().split('T')[0],
          incrementDate: incrementDate,
          effectiveDate: incrementDate,
          previousSalary: previousSalary.toString(),
          newSalary: newSalary.toString(),
          incrementAmount: incrementAmount.toString(),
          percentageIncrease: percentageIncrease.toString()
        }));
      }
    } else if (name === "newSalary" || name === "previousSalary") {
      // Recalculate percentage and increment when salary values change
      let updatedFormData = { ...formData, [name]: value };
      const prevSalary = parseFloat(updatedFormData.previousSalary) || 0;
      const newSalary = parseFloat(updatedFormData.newSalary) || 0;
      
      if (prevSalary > 0 && newSalary > 0) {
        const incrementAmount = newSalary - prevSalary;
        const percentageIncrease = prevSalary > 0 ? ((incrementAmount / prevSalary) * 100).toFixed(2) : 0;
        
        updatedFormData = {
          ...updatedFormData,
          incrementAmount: incrementAmount.toString(),
          percentageIncrease: percentageIncrease.toString()
        };
      }
      
      setFormData(updatedFormData);
    } else if (name === "percentageIncrease") {
      // Recalculate new salary when percentage changes
      const percentage = parseFloat(value) || 0;
      const prevSalary = parseFloat(formData.previousSalary) || 0;
      const incrementAmount = Math.round(prevSalary * (percentage / 100));
      const newSalary = prevSalary + incrementAmount;
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        incrementAmount: incrementAmount.toString(),
        newSalary: newSalary.toString()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleGenerateDocument = () => {
    setShowPDF(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/dashboard/documents" className="text-blue-600 hover:underline flex items-center gap-1">
          <FiArrowLeft size={16} /> Back to Documents
        </Link>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Appraisal Letter Details</h2>
        
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
            <label className="block mb-2 text-sm font-medium text-gray-700">Effective Date</label>
            <input
              type="date"
              name="effectiveDate"
              value={formData.effectiveDate}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Previous Salary (Annual)</label>
            <input
              type="number"
              name="previousSalary"
              value={formData.previousSalary}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">New Salary (Annual)</label>
            <input
              type="number"
              name="newSalary"
              value={formData.newSalary}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Percentage Increase (%)</label>
            <input
              type="number"
              name="percentageIncrease"
              value={formData.percentageIncrease}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* PDF Preview Section - only show when Generate button is clicked */}
      {showPDF && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">PDF Preview</h3>
            
            <PDFDownloadLink 
              document={memoizedPdfDocument}
              fileName={`AppraisalLetter_${formData.employeeName || 'Employee'}.pdf`}
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

export default AppraisalLetterV2;
