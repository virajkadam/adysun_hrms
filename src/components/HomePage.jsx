import React from 'react';
import '../styles/HomePage.css';

function HomePage({ onEmployeeDetailsClick, onUpdateClick }) {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Employee Management System</h1>
      </div>
      
      <div className="content-area">
        <div className="placeholder-content">
          <h2>Employee Information</h2>
          <p>Welcome to the Employee Management System. Use the buttons below to manage employee records.</p>
        </div>
      </div>
      
      <div className="button-container">
        <button className="action-button" onClick={onEmployeeDetailsClick}>Employee Details</button>
        <button className="action-button">Employment Details</button>
        <button className="action-button update" onClick={onUpdateClick}>Update</button>
        <button className="action-button delete">Delete</button>
      </div>
    </div>
  );
}

export default HomePage; 