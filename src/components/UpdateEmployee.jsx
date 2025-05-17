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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate mandatory fields
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.empId) newErrors.empId = 'Employee ID is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.currentAddress) newErrors.currentAddress = 'Current address is required';
    if (!formData.aadharCard) newErrors.aadharCard = 'Aadhar card number is required';
    if (!formData.panCard) newErrors.panCard = 'PAN card number is required';
    
    // Bank details validation
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNo) newErrors.accountNo = 'Account number is required';
    if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.accountHolderName) newErrors.accountHolderName = 'Account holder name is required';
    
    // Educational details validation - only 10th is mandatory
    if (!formData.tenthYear) newErrors.tenthYear = '10th passout year is required';
    if (!formData.tenthSchool) newErrors.tenthSchool = '10th school name is required';
    if (!formData.tenthMarks) newErrors.tenthMarks = '10th marks are required';
    
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
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dob">Date of Birth *</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? 'error' : ''}
              />
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
                disabled={employeeData} // Disable editing for existing employees
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
                className={errors.mobile ? 'error' : ''}
              />
              {errors.mobile && <div className="error-message">{errors.mobile}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email ID *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
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
                className={errors.currentAddress ? 'error' : ''}
                rows="3"
              ></textarea>
              {errors.currentAddress && <div className="error-message">{errors.currentAddress}</div>}
            </div>
            
            <div className="form-group wide">
              <label htmlFor="permanentAddress">Permanent Address</label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                rows="3"
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
                className={errors.aadharCard ? 'error' : ''}
              />
              {errors.aadharCard && <div className="error-message">{errors.aadharCard}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="drivingLicense">Driving License</label>
              <input
                type="text"
                id="drivingLicense"
                name="drivingLicense"
                value={formData.drivingLicense}
                onChange={handleChange}
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
                className={errors.panCard ? 'error' : ''}
              />
              {errors.panCard && <div className="error-message">{errors.panCard}</div>}
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
                className={errors.bankName ? 'error' : ''}
              />
              {errors.bankName && <div className="error-message">{errors.bankName}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="accountNo">Account No *</label>
              <input
                type="text"
                id="accountNo"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                className={errors.accountNo ? 'error' : ''}
              />
              {errors.accountNo && <div className="error-message">{errors.accountNo}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="ifscCode">IFSC Code *</label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className={errors.ifscCode ? 'error' : ''}
              />
              {errors.ifscCode && <div className="error-message">{errors.ifscCode}</div>}
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
                className={errors.accountHolderName ? 'error' : ''}
              />
              {errors.accountHolderName && <div className="error-message">{errors.accountHolderName}</div>}
            </div>
          </div>
        </div>
        
        {/* EDUCATIONAL DETAILS SECTION */}
        <h2 className="section-title">Educational Details</h2>
        <div className="section-container">
          {/* Higher Education */}
          <h3 className="subsection-title">Higher Education</h3>
          
          {/* Graduation */}
          <h4 className="education-level-title">Graduation</h4>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="graduation">Degree</label>
              <input
                type="text"
                id="graduation"
                name="graduation"
                value={formData.graduation}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="graduationBranch">Branch</label>
              <input
                type="text"
                id="graduationBranch"
                name="graduationBranch"
                value={formData.graduationBranch}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="graduationMonth">Month</label>
              <select
                id="graduationMonth"
                name="graduationMonth"
                value={formData.graduationMonth}
                onChange={handleChange}
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
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="graduationYear">Passout Year</label>
              <input
                type="number"
                id="graduationYear"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                min="1950"
                max="2050"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="graduationCollege">College Name</label>
              <input
                type="text"
                id="graduationCollege"
                name="graduationCollege"
                value={formData.graduationCollege}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="graduationUniversity">University Name</label>
              <input
                type="text"
                id="graduationUniversity"
                name="graduationUniversity"
                value={formData.graduationUniversity}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="graduationMarks">Marks</label>
              <input
                type="text"
                id="graduationMarks"
                name="graduationMarks"
                value={formData.graduationMarks}
                onChange={handleChange}
                placeholder="CGPA or Percentage"
              />
            </div>
          </div>
          
          {/* 12th */}
          <h4 className="education-level-title">12th Standard</h4>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="twelfthStandard">12th</label>
              <input
                type="text"
                id="twelfthStandard"
                name="twelfthStandard"
                value={formData.twelfthStandard}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="twelfthBranch">Branch</label>
              <input
                type="text"
                id="twelfthBranch"
                name="twelfthBranch"
                value={formData.twelfthBranch}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="twelfthMonth">Month</label>
              <select
                id="twelfthMonth"
                name="twelfthMonth"
                value={formData.twelfthMonth}
                onChange={handleChange}
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
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="twelfthYear">Passout Year</label>
              <input
                type="number"
                id="twelfthYear"
                name="twelfthYear"
                value={formData.twelfthYear}
                onChange={handleChange}
                min="1950"
                max="2050"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="twelfthSchool">School Name</label>
              <input
                type="text"
                id="twelfthSchool"
                name="twelfthSchool"
                value={formData.twelfthSchool}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="twelfthMarks">Marks</label>
              <input
                type="text"
                id="twelfthMarks"
                name="twelfthMarks"
                value={formData.twelfthMarks}
                onChange={handleChange}
                placeholder="Percentage"
              />
            </div>
          </div>
          
          {/* Other Education */}
          <h3 className="subsection-title">Other Education</h3>
          
          {/* Diploma */}
          <h4 className="education-level-title">Diploma</h4>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="diploma">Diploma</label>
              <input
                type="text"
                id="diploma"
                name="diploma"
                value={formData.diploma}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="diplomaBranch">Branch</label>
              <input
                type="text"
                id="diplomaBranch"
                name="diplomaBranch"
                value={formData.diplomaBranch}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="diplomaMonth">Month</label>
              <select
                id="diplomaMonth"
                name="diplomaMonth"
                value={formData.diplomaMonth}
                onChange={handleChange}
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
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="diplomaYear">Passout Year</label>
              <input
                type="number"
                id="diplomaYear"
                name="diplomaYear"
                value={formData.diplomaYear}
                onChange={handleChange}
                min="1950"
                max="2050"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="diplomaCollege">College Name</label>
              <input
                type="text"
                id="diplomaCollege"
                name="diplomaCollege"
                value={formData.diplomaCollege}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="diplomaMarks">Marks</label>
              <input
                type="text"
                id="diplomaMarks"
                name="diplomaMarks"
                value={formData.diplomaMarks}
                onChange={handleChange}
                placeholder="Percentage"
              />
            </div>
          </div>
          
          {/* 10th */}
          <h4 className="education-level-title">10th Standard</h4>
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="tenthStandard">10th</label>
              <input
                type="text"
                id="tenthStandard"
                name="tenthStandard"
                value={formData.tenthStandard}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="tenthMonth">Month</label>
              <select
                id="tenthMonth"
                name="tenthMonth"
                value={formData.tenthMonth}
                onChange={handleChange}
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
            </div>
            
            <div className="form-group">
              <label htmlFor="tenthYear">Passout Year *</label>
              <input
                type="number"
                id="tenthYear"
                name="tenthYear"
                value={formData.tenthYear}
                onChange={handleChange}
                min="1950"
                max="2050"
                className={errors.tenthYear ? 'error' : ''}
              />
              {errors.tenthYear && <div className="error-message">{errors.tenthYear}</div>}
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
                className={errors.tenthSchool ? 'error' : ''}
              />
              {errors.tenthSchool && <div className="error-message">{errors.tenthSchool}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="tenthMarks">Marks *</label>
              <input
                type="text"
                id="tenthMarks"
                name="tenthMarks"
                value={formData.tenthMarks}
                onChange={handleChange}
                placeholder="Percentage"
                className={errors.tenthMarks ? 'error' : ''}
              />
              {errors.tenthMarks && <div className="error-message">{errors.tenthMarks}</div>}
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