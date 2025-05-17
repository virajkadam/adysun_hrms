import React, { useState } from 'react';
import '../styles/EmployeeList.css';

function EmployeeList({ 
  employees, 
  onViewEmployee, 
  onEditEmployee, 
  onDeleteEmployee,
  onAddEmployee,
  onEmploymentDetails,
  onLogout,
  username 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'empId', direction: 'ascending' });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sorting when a column header is clicked
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Format employee ID to ADV00x format
  const formatEmployeeId = (id) => {
    // Extract any numbers from the ID
    const numMatch = id.match(/\d+/);
    if (!numMatch) return 'ADV001';
    
    // Get the number and format it with leading zeros
    const num = parseInt(numMatch[0], 10);
    return `ADV${num.toString().padStart(3, '0')}`;
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatEmployeeId(employee.empId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.mobile.includes(searchTerm)
    );
  });

  // Sort employees based on sortConfig
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Get sort indicator for column headers
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  return (
    <div className="employee-list-container">
      <div className="top-bar">
        <div className="welcome-message">
          <h2>Welcome, {username}</h2>
        </div>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      
      <div className="header">
        <h1>Employee Management System</h1>
      </div>
      
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <button className="add-button" onClick={onAddEmployee}>
          + Add Employee
        </button>
      </div>
      
      <div className="table-container">
        {employees.length === 0 ? (
          <div className="no-employees">
            <p>No employees found. Add your first employee to get started.</p>
          </div>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('empId')} className="id-column">
                  Employee ID {getSortIndicator('empId')}
                </th>
                <th onClick={() => requestSort('name')} className="name-column">
                  Name {getSortIndicator('name')}
                </th>
                <th onClick={() => requestSort('email')} className="email-column">
                  Email {getSortIndicator('email')}
                </th>
                <th onClick={() => requestSort('mobile')} className="mobile-column">
                  Mobile {getSortIndicator('mobile')}
                </th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee) => (
                <tr key={employee.empId}>
                  <td className="id-column">{formatEmployeeId(employee.empId)}</td>
                  <td className="name-column">{employee.name}</td>
                  <td className="email-column">{employee.email}</td>
                  <td className="mobile-column">{employee.mobile}</td>
                  <td className="action-buttons">
                    <button 
                      className="action-button view-button" 
                      onClick={() => onViewEmployee(employee.empId)}
                      title="View Details"
                    >
                      View
                    </button>
                    <button 
                      className="action-button edit-button" 
                      onClick={() => onEditEmployee(employee.empId)}
                      title="Edit Employee"
                    >
                      Edit
                    </button>
                    <button 
                      className="action-button employment-button" 
                      onClick={() => onEmploymentDetails(employee.empId)}
                      title="Employment Details"
                    >
                      Employment
                    </button>
                    <button 
                      className="action-button delete-button" 
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
                          onDeleteEmployee(employee.empId);
                        }
                      }}
                      title="Delete Employee"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeeList; 