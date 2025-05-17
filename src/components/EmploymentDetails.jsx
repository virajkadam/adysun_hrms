import React from 'react';
import '../styles/EmploymentDetails.css';

function EmploymentDetails({ employee, onBackClick }) {
  if (!employee) {
    return (
      <div className="employment-details-container">
        <div className="header">
          <button className="back-button" onClick={onBackClick}>
            Back to List
          </button>
          <h1>Employment Details</h1>
        </div>
        <div className="loading">Loading employee data...</div>
      </div>
    );
  }

  return (
    <div className="employment-details-container">
      <div className="header">
        <button className="back-button" onClick={onBackClick}>
          Back to List
        </button>
        <h1>Employment Details</h1>
       
      </div>
      
      <div className="employee-header">
        <h2>{employee.name} - {employee.empId}</h2>
        <div className="status-badge" data-status={employee.isActive === 'Yes' ? 'active' : 'inactive'}>
          {employee.isActive === 'Yes' ? 'Active' : 'Inactive'}
        </div>
      </div>
      
      <div className="cards-container">
        {/* EMPLOYMENT DETAILS SECTION */}
        <h2 className="section-title">Employment Information</h2>
        
        <div className="section-container">
          {/* Employment Details */}
          <h3 className="subsection-title">Employment Details</h3>
          <div className="subsection-container">
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.employmentId || 'EMP-001'}</div>
                  <div className="label">Employment ID</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.ctc || '₹800,000'}</div>
                  <div className="label">CTC</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.joiningDate || '01-01-2020'}</div>
                  <div className="label">Joining Date</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.relievingDate || 'N/A'}</div>
                  <div className="label">Relieving Date</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.trainingCtc || '₹600,000'}</div>
                  <div className="label">Training CTC</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.incrementDate || '01-04-2021'}</div>
                  <div className="label">Increment Date</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.incrementCtc || '₹900,000'}</div>
                  <div className="label">Increment CTC</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.relievingCtc || 'N/A'}</div>
                  <div className="label">Relieving CTC</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.pf || 'Yes'}</div>
                  <div className="label">PF</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.resignation || 'No'}</div>
                  <div className="label">Resignation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* SALARY DETAILS SECTION */}
        <h2 className="section-title">Salary Information</h2>
        <div className="section-container">
          {/* Salary Details */}
          <h3 className="subsection-title">Salary Details</h3>
          <div className="subsection-container">
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.salaryId || 'SAL-001'}</div>
                  <div className="label">Salary ID</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.salaryPerAnnum || '₹800,000'}</div>
                  <div className="label">Salary Per Annum</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.salaryPerMonth || '₹66,667'}</div>
                  <div className="label">Salary Per Month</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.basic || '₹40,000'}</div>
                  <div className="label">Basic</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.epf || '₹3,600'}</div>
                  <div className="label">EPF</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.hra || '₹16,000'}</div>
                  <div className="label">HRA</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.pt || '₹200'}</div>
                  <div className="label">PT</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.medicalAllowance || '₹1,250'}</div>
                  <div className="label">Medical Allowance</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.insurance || '₹500'}</div>
                  <div className="label">Insurance</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.gratuity || '₹1,923'}</div>
                  <div className="label">Gratuity</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.totalLeaves || '24 days/year'}</div>
                  <div className="label">Total Leaves</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.salaryCreditDate || '1st of every month'}</div>
                  <div className="label">Salary Credit Date</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.month || 'Current Month'}</div>
                  <div className="label">Month</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.additional || '₹0'}</div>
                  <div className="label">Additional</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.payableDays || '30 days'}</div>
                  <div className="label">Payable Days</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.paymentMode || 'Bank Transfer'}</div>
                  <div className="label">Payment Mode</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.additionalAllowance || '₹5,000'}</div>
                  <div className="label">Additional Allowance</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.specialAllowance || '₹3,000'}</div>
                  <div className="label">Special Allowance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* JOB DETAILS SECTION */}
        <h2 className="section-title">Job Details</h2>
        <div className="section-container">
          <div className="subsection-container">
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.jobTitle || 'Software Engineer'}</div>
                  <div className="label">Job Title</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.department || 'Engineering'}</div>
                  <div className="label">Department</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.location || 'Headquarters'}</div>
                  <div className="label">Location</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.reportingManager || 'Jane Smith'}</div>
                  <div className="label">Reporting Manager</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.employmentType || 'Full-time'}</div>
                  <div className="label">Employment Type</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">{employee.workSchedule || '9:00 AM - 6:00 PM'}</div>
                  <div className="label">Work Schedule</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmploymentDetails; 