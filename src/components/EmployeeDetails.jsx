import React from 'react';
import '../styles/EmployeeDetails.css';

function EmployeeDetails({ onBackClick }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="employee-details-container">
      <div className="header">
        <button className="back-button" onClick={onBackClick}>
          Back to Home
        </button>
        <h1>Employee Details</h1>
       
      </div>
      
      <div className="cards-container">
        {/* PERSONAL DETAILS SECTION */}
        <h2 className="section-title">Personal Details</h2>
        
        <div className="section-container">
          {/* Basic Info Subsection */}
          <h3 className="subsection-title">Basic Information</h3>
          <div className="subsection-container">
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">John Doe</div>
                  <div className="label">Name</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">15-05-1990</div>
                  <div className="label">DOB</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">EMP001</div>
                  <div className="label">Emp ID</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">Yes</div>
                  <div className="label">Is Active</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                    
                  <div className="value">New York</div>
                  <div className="label">Home Town</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Info Subsection */}
          <h3 className="subsection-title">Contact Information</h3>
          <div className="subsection-container">
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">9876543210</div>
                  <div className="label">Mobile No</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">john.doe@example.com</div>
                  <div className="label">Email ID</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card wide">
                <div className="card-item">
                  <div className="value">123 Main St, Apt 4B, New York, NY 10001</div>
                  <div className="label">Current Address</div>
                </div>
              </div>
              
              <div className="detail-card wide">
                <div className="card-item">
                  <div className="value">123 Main St, New York, NY 10001</div>
                  <div className="label">Permanent Address</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Identification Subsection */}
          <h3 className="subsection-title">Identification Documents</h3>
          <div className="subsection-container">
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">1234 5678 9012</div>
                  <div className="label">Aadhar Card</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">DL12345678</div>
                  <div className="label">Driving License</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">VAN12345</div>
                  <div className="label">VAN No</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">ABCDE1234F</div>
                  <div className="label">PAN Card</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* BANK DETAILS SECTION */}
        <h2 className="section-title">Bank Details</h2>
        <div className="section-container">
          <div className="cards-row">
            <div className="detail-card">
              <div className="card-item">
                <div className="value">Bank of America</div>
                <div className="label">Bank Details</div>
              </div>
            </div>
            
            <div className="detail-card">
              <div className="card-item">
                <div className="value">123456789012</div>
                <div className="label">Acc No</div>
              </div>
            </div>
            
            <div className="detail-card">
              <div className="card-item">
                <div className="value">ABCD0123456</div>
                <div className="label">IFSC Code</div>
              </div>
            </div>
          </div>
          
          <div className="cards-row">
            <div className="detail-card">
              <div className="card-item">
                <div className="value">John Doe</div>
                <div className="label">Bank Holder Name</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* EDUCATIONAL DETAILS SECTION */}
        <h2 className="section-title">Educational Details</h2>
        <div className="section-container">
          {/* Higher Education */}
          <h3 className="subsection-title">Higher Education</h3>
          <div className="subsection-container">
            {/* Graduation */}
            <h4 style={{ marginBottom: '15px', color: '#34495e' }}>Graduation</h4>
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">B.Tech</div>
                  <div className="label">Graduation</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">Computer Science</div>
                  <div className="label">Branch</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">May</div>
                  <div className="label">Month</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">2015</div>
                  <div className="label">Passout Year</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">XYZ Engineering College</div>
                  <div className="label">College Name</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">ABC University</div>
                  <div className="label">University Name</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">8.5 CGPA</div>
                  <div className="label">Marks</div>
                </div>
              </div>
            </div>
            
            {/* 12th */}
            <h4 style={{ margin: '25px 0 15px', color: '#34495e' }}>12th Standard</h4>
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">XII</div>
                  <div className="label">12th</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">Science</div>
                  <div className="label">Branch</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">May</div>
                  <div className="label">Month</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">2011</div>
                  <div className="label">Passout Year</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">PQR Higher Secondary School</div>
                  <div className="label">School Name</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">85%</div>
                  <div className="label">Marks</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Other Education */}
          <h3 className="subsection-title">Other Education</h3>
          <div className="subsection-container">
            {/* Diploma */}
            <h4 style={{ marginBottom: '15px', color: '#34495e' }}>Diploma</h4>
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">Diploma in CS</div>
                  <div className="label">Diploma</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">Computer Science</div>
                  <div className="label">Branch</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">June</div>
                  <div className="label">Month</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">2012</div>
                  <div className="label">Passout Year</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">LMN Polytechnic</div>
                  <div className="label">College Name</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">75%</div>
                  <div className="label">Marks</div>
                </div>
              </div>
            </div>
            
            {/* 10th */}
            <h4 style={{ margin: '25px 0 15px', color: '#34495e' }}>10th Standard</h4>
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">X</div>
                  <div className="label">10th</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">May</div>
                  <div className="label">Month</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">2009</div>
                  <div className="label">Passout Year</div>
                </div>
              </div>
            </div>
            
            <div className="cards-row">
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">RST School</div>
                  <div className="label">School Name</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="card-item">
                  <div className="value">80%</div>
                  <div className="label">Marks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails; 