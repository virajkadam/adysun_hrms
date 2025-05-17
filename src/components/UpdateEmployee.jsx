import React, { useState } from 'react';
import '../styles/UpdateEmployee.css';

function UpdateEmployee({ onBackClick, employeeData, onSubmit }) {
  // Initialize form state with employee data or empty values
  const [formData, setFormData] = useState({
    // Personal Details - Basic Information
    name: employeeData?.name || '',
    dob: employeeData?.dob || '',
    empId: employeeData?.empId || '',
    isActive: employeeData?.isActive || 'Yes',
    hometown: employeeData?.hometown || '',
    
    // Contact Information
    mobile: employeeData?.mobile || '',
    email: employeeData?.email || '',
    currentAddress: employeeData?.currentAddress || '',
    permanentAddress: employeeData?.permanentAddress || '',
    
    // Identification Documents
    aadharCard: employeeData?.aadharCard || '',
    drivingLicense: employeeData?.drivingLicense || '',
    vanNo: employeeData?.vanNo || '',
    panCard: employeeData?.panCard || '',
    
    // Bank Details
    bankName: employeeData?.bankName || '',
    accountNo: employeeData?.accountNo || '',
    ifscCode: employeeData?.ifscCode || '',
    accountHolderName: employeeData?.accountHolderName || '',
    
    // Educational Details - Graduation
    graduation: employeeData?.graduation || '',
    graduationBranch: employeeData?.graduationBranch || '',
    graduationMonth: employeeData?.graduationMonth || '',
    graduationYear: employeeData?.graduationYear || '',
    graduationCollege: employeeData?.graduationCollege || '',
    graduationUniversity: employeeData?.graduationUniversity || '',
    graduationMarks: employeeData?.graduationMarks || '',
    
    // Educational Details - 12th
    twelfthStandard: employeeData?.twelfthStandard || '',
    twelfthBranch: employeeData?.twelfthBranch || '',
    twelfthMonth: employeeData?.twelfthMonth || '',
    twelfthYear: employeeData?.twelfthYear || '',
    twelfthSchool: employeeData?.twelfthSchool || '',
    twelfthMarks: employeeData?.twelfthMarks || '',
    
    // Educational Details - Diploma
    diploma: employeeData?.diploma || '',
    diplomaBranch: employeeData?.diplomaBranch || '',
    diplomaMonth: employeeData?.diplomaMonth || '',
    diplomaYear: employeeData?.diplomaYear || '',
    diplomaCollege: employeeData?.diplomaCollege || '',
    diplomaMarks: employeeData?.diplomaMarks || '',
    
    // Educational Details - 10th
    tenthStandard: employeeData?.tenthStandard || '',
    tenthMonth: employeeData?.tenthMonth || '',
    tenthYear: employeeData?.tenthYear || '',
    tenthSchool: employeeData?.tenthSchool || '',
    tenthMarks: employeeData?.tenthMarks || '',
  });

  // Track form validation errors
  const [errors, setErrors] = useState({});

  // Add new validation state to track touched fields
  const [touchedFields, setTouchedFields] = useState({});

  // Add validation helper functions at the top of the component
  const validateName = (value) => {
    return /^[A-Za-z\s]{1,50}$/.test(value);
  };

  const validateMobile = (value) => {
    return /^[6-9][0-9]{9}$/.test(value);
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validateAadhar = (value) => {
    return /^[0-9]{12}$/.test(value);
  };

  const validatePAN = (value) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
  };

  const validateDrivingLicense = (value) => {
    if (!value) return true; // Optional field
    return /^[A-Z0-9]{15}$/.test(value);
  };

  const validateAccountNo = (value) => {
    return /^[0-9]{9,18}$/.test(value);
  };

  const validateIFSC = (value) => {
    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);
  };

  const validateMarks = (value) => {
    if (!value) return true; // For optional fields
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
  };

  // Add handleBlur function to track when fields lose focus
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields({
      ...touchedFields,
      [name]: true
    });
    
    // Only validate and show errors when field is touched and has a value
    if (value) {
      switch (name) {
        case 'name':
          if (!validateName(value)) {
            setErrors({...errors, [name]: 'Please enter a valid name'});
          }
          break;
        
        case 'mobile':
          if (!validateMobile(value)) {
            setErrors({...errors, [name]: 'Mobile number must start with 6-9 and be 10 digits'});
          }
          break;
        
        case 'email':
          if (!validateEmail(value)) {
            setErrors({...errors, [name]: 'Please enter a valid email'});
          }
          break;
        
        case 'aadharCard':
          if (!validateAadhar(value)) {
            setErrors({...errors, [name]: 'Please enter a valid Aadhar number'});
          }
          break;
        
        case 'panCard':
          if (!validatePAN(value)) {
            setErrors({...errors, [name]: 'Please enter a valid PAN'});
          }
          break;
        
        case 'accountNo':
          if (!validateAccountNo(value)) {
            setErrors({...errors, [name]: 'Please enter a valid account number'});
          }
          break;
        
        case 'ifscCode':
          if (!validateIFSC(value)) {
            setErrors({...errors, [name]: 'Please enter a valid IFSC code'});
          }
          break;
        
        case 'graduationMarks':
        case 'twelfthMarks':
        case 'diplomaMarks':
        case 'tenthMarks':
          if (!validateMarks(value)) {
            setErrors({...errors, [name]: 'Please enter valid marks'});
          }
          break;
      }
    }
  };

  // Modify handleChange to only handle input restrictions
  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
    
    // Only apply input restrictions, not validations
    switch (name) {
      case 'name':
        if (!/^[A-Za-z\s]*$/.test(value)) return; // Only allow letters and spaces
        break;
      
      case 'mobile':
        // Allow empty value for deletion
        if (value === '') {
          break;
        }
        // For first digit, only allow 6-9
        if (value.length === 1 && !/^[6-9]$/.test(value)) return;
        // For subsequent digits, allow any number
        if (value.length > 1 && !/^[6-9][0-9]*$/.test(value)) return;
        if (value.length > 10) return;
        break;
      
      case 'aadharCard':
        if (!/^[0-9]*$/.test(value)) return;
        if (value.length > 12) return;
        break;
      
      case 'panCard':
        finalValue = value.toUpperCase();
        if (value.length > 10) return;
        break;
      
      case 'accountNo':
        if (!/^[0-9]*$/.test(value)) return;
        if (value.length > 18) return;
        break;
      
      case 'ifscCode':
        finalValue = value.toUpperCase();
        if (value.length > 11) return;
        break;
      
      case 'graduationMarks':
      case 'twelfthMarks':
      case 'diplomaMarks':
      case 'tenthMarks':
        if (!/^\d*\.?\d*$/.test(value)) return;
        break;
    }

    setFormData({
      ...formData,
      [name]: finalValue,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Modify the validateForm function's educational validation section
  const validateForm = () => {
    const newErrors = {};
    
    // Keep existing mandatory field validations
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.empId) newErrors.empId = 'Employee ID is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.currentAddress) newErrors.currentAddress = 'Current address is required';
    if (!formData.aadharCard) newErrors.aadharCard = 'Aadhar card number is required';
    if (!formData.panCard) newErrors.panCard = 'PAN card number is required';
    
    // Keep existing bank details validation
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNo) newErrors.accountNo = 'Account number is required';
    if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.accountHolderName) newErrors.accountHolderName = 'Account holder name is required';
    
    // Check if graduation details are filled
    const hasGraduationDetails = formData.graduation || formData.graduationBranch || formData.graduationMonth || 
        formData.graduationYear || formData.graduationCollege || formData.graduationUniversity || 
        formData.graduationMarks;

    // If any graduation field is filled, all graduation fields become mandatory
    if (hasGraduationDetails) {
      if (!formData.graduation) newErrors.graduation = 'Degree is required';
      if (!formData.graduationBranch) newErrors.graduationBranch = 'Branch is required';
      if (!formData.graduationMonth) newErrors.graduationMonth = 'Month is required';
      if (!formData.graduationYear) newErrors.graduationYear = 'Year is required';
      if (!formData.graduationCollege) newErrors.graduationCollege = 'College name is required';
      if (!formData.graduationUniversity) newErrors.graduationUniversity = 'University name is required';
      if (!formData.graduationMarks) newErrors.graduationMarks = 'Marks are required';

      // If graduation is filled, either 12th or diploma becomes mandatory
      if (formData.educationType === "12th") {
        if (!formData.twelfthBranch) newErrors.twelfthBranch = 'Branch is required';
        if (!formData.twelfthMonth) newErrors.twelfthMonth = 'Month is required';
        if (!formData.twelfthYear) newErrors.twelfthYear = 'Year is required';
        if (!formData.twelfthSchool) newErrors.twelfthSchool = 'School name is required';
        if (!formData.twelfthMarks) newErrors.twelfthMarks = 'Marks are required';
      } else {
        if (!formData.diploma) newErrors.diploma = 'Diploma is required';
        if (!formData.diplomaBranch) newErrors.diplomaBranch = 'Branch is required';
        if (!formData.diplomaMonth) newErrors.diplomaMonth = 'Month is required';
        if (!formData.diplomaYear) newErrors.diplomaYear = 'Year is required';
        if (!formData.diplomaCollege) newErrors.diplomaCollege = 'College name is required';
        if (!formData.diplomaMarks) newErrors.diplomaMarks = 'Marks are required';
      }
    }

    // Check if 12th/Diploma details are filled
    const has12thDetails = formData.twelfthBranch || formData.twelfthMonth || formData.twelfthYear || 
                          formData.twelfthSchool || formData.twelfthMarks;
    
    const hasDiplomaDetails = formData.diploma || formData.diplomaBranch || formData.diplomaMonth || 
                             formData.diplomaYear || formData.diplomaCollege || formData.diplomaMarks;

    // If any 12th field is filled, all 12th fields become mandatory
    if (has12thDetails) {
      if (!formData.twelfthBranch) newErrors.twelfthBranch = 'Branch is required';
      if (!formData.twelfthMonth) newErrors.twelfthMonth = 'Month is required';
      if (!formData.twelfthYear) newErrors.twelfthYear = 'Year is required';
      if (!formData.twelfthSchool) newErrors.twelfthSchool = 'School name is required';
      if (!formData.twelfthMarks) newErrors.twelfthMarks = 'Marks are required';
    }

    // If any diploma field is filled, all diploma fields become mandatory
    if (hasDiplomaDetails) {
      if (!formData.diploma) newErrors.diploma = 'Diploma is required';
      if (!formData.diplomaBranch) newErrors.diplomaBranch = 'Branch is required';
      if (!formData.diplomaMonth) newErrors.diplomaMonth = 'Month is required';
      if (!formData.diplomaYear) newErrors.diplomaYear = 'Year is required';
      if (!formData.diplomaCollege) newErrors.diplomaCollege = 'College name is required';
      if (!formData.diplomaMarks) newErrors.diplomaMarks = 'Marks are required';
    }

    // 10th is mandatory if graduation or 12th/diploma is filled
    if (hasGraduationDetails || has12thDetails || hasDiplomaDetails || formData.tenthMonth || formData.tenthYear || 
        formData.tenthSchool || formData.tenthMarks) {
      if (!formData.tenthMonth) newErrors.tenthMonth = 'Month is required';
      if (!formData.tenthYear) newErrors.tenthYear = 'Year is required';
      if (!formData.tenthSchool) newErrors.tenthSchool = 'School name is required';
      if (!formData.tenthMarks) newErrors.tenthMarks = 'Marks are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form data submitted:', formData);
      onSubmit(formData);
      alert('Employee details updated successfully!');
      onBackClick(); // Return to previous page
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="update-employee-container">
      <div className="header">
        <button className="back-button" onClick={onBackClick}>
          Back to Home
        </button>
        <h1>{employeeData ? 'Update Employee Details' : 'Add New Employee'}</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="update-form">
        {/* PERSONAL DETAILS SECTION */}
        <h2 className="section-title">Personal Details</h2>
        
        <div className="section-container">
          {/* Basic Info Subsection */}
          <h3 className="subsection-title">Basic Information</h3>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.name && errors.name ? 'error' : ''}
                placeholder="Enter full name"
                maxLength={50}
              />
              {touchedFields.name && errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dob">Date of Birth *</label>
              <div className="date-field-container">
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={errors.dob ? 'error' : ''}
                  max={new Date().toISOString().split('T')[0]}
                />
                <svg className="calendar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              {errors.dob && <div className="error-message">{errors.dob}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="empId">Employee ID *</label>
              <input
                type="text"
                id="empId"
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                className={errors.empId ? 'error' : ''}
                disabled={employeeData}
                placeholder="Enter employee ID"
              />
              {errors.empId && <div className="error-message">{errors.empId}</div>}
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="isActive">Is Active</label>
              <select
                id="isActive"
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="hometown">Home Town</label>
              <input
                type="text"
                id="hometown"
                name="hometown"
                value={formData.hometown}
                onChange={handleChange}
                placeholder="Enter hometown"
              />
            </div>
          </div>
          
          {/* Contact Info Subsection */}
          <h3 className="subsection-title">Contact Information</h3>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="mobile">Mobile No *</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.mobile && errors.mobile ? 'error' : ''}
                placeholder="Enter mobile number"
                maxLength={10}
              />
              {touchedFields.mobile && errors.mobile && <div className="error-message">{errors.mobile}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email ID *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.email && errors.email ? 'error' : ''}
                placeholder="Enter email ID"
              />
              {touchedFields.email && errors.email && <div className="error-message">{errors.email}</div>}
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group wide">
              <label htmlFor="currentAddress">Current Address *</label>
              <textarea
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.currentAddress && errors.currentAddress ? 'error' : ''}
                rows="3"
                placeholder="Enter your current address"
              ></textarea>
              {touchedFields.currentAddress && errors.currentAddress && <div className="error-message">{errors.currentAddress}</div>}
            </div>
            
            <div className="form-group wide">
              <label htmlFor="permanentAddress">Permanent Address</label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your permanent address"
              ></textarea>
            </div>
          </div>
          
          {/* Identification Subsection */}
          <h3 className="subsection-title">Identification Documents</h3>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="aadharCard">Aadhar Card *</label>
              <input
                type="text"
                id="aadharCard"
                name="aadharCard"
                value={formData.aadharCard}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.aadharCard && errors.aadharCard ? 'error' : ''}
                placeholder="Enter Aadhar number"
                maxLength={12}
              />
              {touchedFields.aadharCard && errors.aadharCard && <div className="error-message">{errors.aadharCard}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="drivingLicense">Driving License</label>
              <input
                type="text"
                id="drivingLicense"
                name="drivingLicense"
                value={formData.drivingLicense}
                onChange={handleChange}
                placeholder="Enter driving license number"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="vanNo">VAN No</label>
              <input
                type="text"
                id="vanNo"
                name="vanNo"
                value={formData.vanNo}
                onChange={handleChange}
                placeholder="Enter VAN number"
              />
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="panCard">PAN Card *</label>
              <input
                type="text"
                id="panCard"
                name="panCard"
                value={formData.panCard}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.panCard && errors.panCard ? 'error' : ''}
                placeholder="Enter PAN number"
                maxLength={10}
              />
              {touchedFields.panCard && errors.panCard && <div className="error-message">{errors.panCard}</div>}
            </div>
          </div>
        </div>
        
        {/* BANK DETAILS SECTION */}
        <h2 className="section-title">Bank Details</h2>
        <div className="section-container">
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="bankName">Bank Name *</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.bankName && errors.bankName ? 'error' : ''}
                placeholder="Enter bank name"
              />
              {touchedFields.bankName && errors.bankName && <div className="error-message">{errors.bankName}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="accountNo">Account No *</label>
              <input
                type="text"
                id="accountNo"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.accountNo && errors.accountNo ? 'error' : ''}
                placeholder="Enter account number"
                maxLength={18}
              />
              {touchedFields.accountNo && errors.accountNo && <div className="error-message">{errors.accountNo}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="ifscCode">IFSC Code *</label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.ifscCode && errors.ifscCode ? 'error' : ''}
                placeholder="Enter IFSC code"
                maxLength={11}
              />
              {touchedFields.ifscCode && errors.ifscCode && <div className="error-message">{errors.ifscCode}</div>}
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="accountHolderName">Account Holder Name *</label>
              <input
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.accountHolderName && errors.accountHolderName ? 'error' : ''}
                placeholder="Enter account holder name"
              />
              {touchedFields.accountHolderName && errors.accountHolderName && <div className="error-message">{errors.accountHolderName}</div>}
            </div>
          </div>
        </div>
        
        {/* EDUCATIONAL DETAILS SECTION */}
        <h2 className="section-title">Educational Details</h2>
        <div className="section-container">
          {/* Graduation */}
          <h4 className="education-level-title">Graduation</h4>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="graduation">Degree {formData.graduation && '*'}</label>
              <input
                type="text"
                id="graduation"
                name="graduation"
                value={formData.graduation}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.graduation && errors.graduation ? 'error' : ''}
                placeholder="Enter degree name"
              />
              {touchedFields.graduation && errors.graduation && <div className="error-message">{errors.graduation}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="graduationBranch">Branch {(formData.graduation || formData.graduationBranch) && '*'}</label>
              <input
                type="text"
                id="graduationBranch"
                name="graduationBranch"
                value={formData.graduationBranch}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.graduationBranch && errors.graduationBranch ? 'error' : ''}
                placeholder="Enter branch name"
              />
              {touchedFields.graduationBranch && errors.graduationBranch && <div className="error-message">{errors.graduationBranch}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="graduationMonth">Month {(formData.graduation || formData.graduationMonth) && '*'}</label>
              <select
                id="graduationMonth"
                name="graduationMonth"
                value={formData.graduationMonth}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.graduationMonth && errors.graduationMonth ? 'error' : ''}
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              {touchedFields.graduationMonth && errors.graduationMonth && <div className="error-message">{errors.graduationMonth}</div>}
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="graduationYear">Passout Year {(formData.graduation || formData.graduationYear) && '*'}</label>
              <input
                type="number"
                id="graduationYear"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.graduationYear && errors.graduationYear ? 'error' : ''}
                min="1950"
                max="2050"
                placeholder="Enter year"
              />
              {touchedFields.graduationYear && errors.graduationYear && <div className="error-message">{errors.graduationYear}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="graduationCollege">College Name {(formData.graduation || formData.graduationCollege) && '*'}</label>
              <input
                type="text"
                id="graduationCollege"
                name="graduationCollege"
                value={formData.graduationCollege}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.graduationCollege && errors.graduationCollege ? 'error' : ''}
                placeholder="Enter college name"
              />
              {touchedFields.graduationCollege && errors.graduationCollege && <div className="error-message">{errors.graduationCollege}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="graduationUniversity">University Name {(formData.graduation || formData.graduationUniversity) && '*'}</label>
              <input
                type="text"
                id="graduationUniversity"
                name="graduationUniversity"
                value={formData.graduationUniversity}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.graduationUniversity && errors.graduationUniversity ? 'error' : ''}
                placeholder="Enter university name"
              />
              {touchedFields.graduationUniversity && errors.graduationUniversity && <div className="error-message">{errors.graduationUniversity}</div>}
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="graduationMarks">Marks {(formData.graduation || formData.graduationMarks) && '*'}</label>
              <input
                type="text"
                id="graduationMarks"
                name="graduationMarks"
                value={formData.graduationMarks}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.graduationMarks && errors.graduationMarks ? 'error' : ''}
                placeholder="Enter marks"
              />
              {touchedFields.graduationMarks && errors.graduationMarks && <div className="error-message">{errors.graduationMarks}</div>}
            </div>
          </div>
          
          {/* 12th/Diploma/10th Selection */}
          <h4 className="education-level-title">Previous Education *</h4>
          <div className="form-group-container">
            <div className="form-group">
              <label>Select Education Type *</label>
              <select
                value={formData.educationType || "12th"}
                onChange={(e) => {
                  // Clear other education type fields when switching
                  const newFormData = { ...formData };
                  if (e.target.value === "12th") {
                    // Clear diploma fields
                    newFormData.diploma = '';
                    newFormData.diplomaBranch = '';
                    newFormData.diplomaMonth = '';
                    newFormData.diplomaYear = '';
                    newFormData.diplomaCollege = '';
                    newFormData.diplomaMarks = '';
                  } else {
                    // Clear 12th fields
                    newFormData.twelfthBranch = '';
                    newFormData.twelfthMonth = '';
                    newFormData.twelfthYear = '';
                    newFormData.twelfthSchool = '';
                    newFormData.twelfthMarks = '';
                  }
                  newFormData.educationType = e.target.value;
                  setFormData(newFormData);
                }}
              >
                <option value="12th">12th Standard</option>
                <option value="diploma">Diploma</option>
              </select>
            </div>
          </div>

          {formData.educationType === "12th" ? (
            // 12th Standard Fields
            <>
              <div className="form-group-container">
                <div className="form-group">
                  <label htmlFor="twelfthBranch">Branch *</label>
                  <input
                    type="text"
                    id="twelfthBranch"
                    name="twelfthBranch"
                    value={formData.twelfthBranch}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.twelfthBranch && errors.twelfthBranch ? 'error' : ''}
                    placeholder="Enter branch"
                  />
                  {touchedFields.twelfthBranch && errors.twelfthBranch && <div className="error-message">{errors.twelfthBranch}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="twelfthMonth">Month *</label>
                  <select
                    id="twelfthMonth"
                    name="twelfthMonth"
                    value={formData.twelfthMonth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.twelfthMonth && errors.twelfthMonth ? 'error' : ''}
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  {touchedFields.twelfthMonth && errors.twelfthMonth && <div className="error-message">{errors.twelfthMonth}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="twelfthYear">Passout Year *</label>
                  <input
                    type="number"
                    id="twelfthYear"
                    name="twelfthYear"
                    value={formData.twelfthYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.twelfthYear && errors.twelfthYear ? 'error' : ''}
                    min="1950"
                    max="2050"
                    placeholder="Enter year"
                  />
                  {touchedFields.twelfthYear && errors.twelfthYear && <div className="error-message">{errors.twelfthYear}</div>}
                </div>
              </div>

              <div className="form-group-container">
                <div className="form-group">
                  <label htmlFor="twelfthSchool">School Name *</label>
                  <input
                    type="text"
                    id="twelfthSchool"
                    name="twelfthSchool"
                    value={formData.twelfthSchool}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.twelfthSchool && errors.twelfthSchool ? 'error' : ''}
                    placeholder="Enter school name"
                  />
                  {touchedFields.twelfthSchool && errors.twelfthSchool && <div className="error-message">{errors.twelfthSchool}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="twelfthMarks">Marks *</label>
                  <input
                    type="text"
                    id="twelfthMarks"
                    name="twelfthMarks"
                    value={formData.twelfthMarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.twelfthMarks && errors.twelfthMarks ? 'error' : ''}
                    placeholder="Enter marks"
                  />
                  {touchedFields.twelfthMarks && errors.twelfthMarks && <div className="error-message">{errors.twelfthMarks}</div>}
                </div>
              </div>
            </>
          ) : (
            // Diploma Fields
            <>
              <div className="form-group-container">
                <div className="form-group">
                  <label htmlFor="diploma">Diploma *</label>
                  <input
                    type="text"
                    id="diploma"
                    name="diploma"
                    value={formData.diploma}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.diploma && errors.diploma ? 'error' : ''}
                    placeholder="Enter diploma"
                  />
                  {touchedFields.diploma && errors.diploma && <div className="error-message">{errors.diploma}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="diplomaBranch">Branch *</label>
                  <input
                    type="text"
                    id="diplomaBranch"
                    name="diplomaBranch"
                    value={formData.diplomaBranch}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.diplomaBranch && errors.diplomaBranch ? 'error' : ''}
                    placeholder="Enter branch"
                  />
                  {touchedFields.diplomaBranch && errors.diplomaBranch && <div className="error-message">{errors.diplomaBranch}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="diplomaMonth">Month *</label>
                  <select
                    id="diplomaMonth"
                    name="diplomaMonth"
                    value={formData.diplomaMonth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.diplomaMonth && errors.diplomaMonth ? 'error' : ''}
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  {touchedFields.diplomaMonth && errors.diplomaMonth && <div className="error-message">{errors.diplomaMonth}</div>}
                </div>
              </div>

              <div className="form-group-container">
                <div className="form-group">
                  <label htmlFor="diplomaYear">Passout Year *</label>
                  <input
                    type="number"
                    id="diplomaYear"
                    name="diplomaYear"
                    value={formData.diplomaYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.diplomaYear && errors.diplomaYear ? 'error' : ''}
                    min="1950"
                    max="2050"
                    placeholder="Enter year"
                  />
                  {touchedFields.diplomaYear && errors.diplomaYear && <div className="error-message">{errors.diplomaYear}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="diplomaCollege">College Name *</label>
                  <input
                    type="text"
                    id="diplomaCollege"
                    name="diplomaCollege"
                    value={formData.diplomaCollege}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.diplomaCollege && errors.diplomaCollege ? 'error' : ''}
                    placeholder="Enter college name"
                  />
                  {touchedFields.diplomaCollege && errors.diplomaCollege && <div className="error-message">{errors.diplomaCollege}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="diplomaMarks">Marks *</label>
                  <input
                    type="text"
                    id="diplomaMarks"
                    name="diplomaMarks"
                    value={formData.diplomaMarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touchedFields.diplomaMarks && errors.diplomaMarks ? 'error' : ''}
                    placeholder="Enter marks"
                  />
                  {touchedFields.diplomaMarks && errors.diplomaMarks && <div className="error-message">{errors.diplomaMarks}</div>}
                </div>
              </div>
            </>
          )}

          {/* 10th Standard Fields */}
          <h4 className="education-level-title">10th Standard *</h4>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="tenthMonth">Month *</label>
              <select
                id="tenthMonth"
                name="tenthMonth"
                value={formData.tenthMonth}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.tenthMonth && errors.tenthMonth ? 'error' : ''}
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              {touchedFields.tenthMonth && errors.tenthMonth && <div className="error-message">{errors.tenthMonth}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="tenthYear">Passout Year *</label>
              <input
                type="number"
                id="tenthYear"
                name="tenthYear"
                value={formData.tenthYear}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.tenthYear && errors.tenthYear ? 'error' : ''}
                min="1950"
                max="2050"
                placeholder="Enter year"
              />
              {touchedFields.tenthYear && errors.tenthYear && <div className="error-message">{errors.tenthYear}</div>}
            </div>
          </div>

          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="tenthSchool">School Name *</label>
              <input
                type="text"
                id="tenthSchool"
                name="tenthSchool"
                value={formData.tenthSchool}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.tenthSchool && errors.tenthSchool ? 'error' : ''}
                placeholder="Enter school name"
              />
              {touchedFields.tenthSchool && errors.tenthSchool && <div className="error-message">{errors.tenthSchool}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="tenthMarks">Marks *</label>
              <input
                type="text"
                id="tenthMarks"
                name="tenthMarks"
                value={formData.tenthMarks}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.tenthMarks && errors.tenthMarks ? 'error' : ''}
                placeholder="Enter marks"
              />
              {touchedFields.tenthMarks && errors.tenthMarks && <div className="error-message">{errors.tenthMarks}</div>}
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onBackClick}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            {employeeData ? 'Save Changes' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEmployee; 