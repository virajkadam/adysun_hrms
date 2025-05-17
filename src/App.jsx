import React, { useState } from 'react'
import './App.css'
import Login from './components/Login'
import EmployeeList from './components/EmployeeList'
import EmployeeDetails from './components/EmployeeDetails'
import UpdateEmployee from './components/UpdateEmployee'
import EmploymentDetails from './components/EmploymentDetails'

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  
  // Application state
  const [currentPage, setCurrentPage] = useState('login')
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)
  
  // Sample employee data - in a real app, this would come from an API or database
  const [employees, setEmployees] = useState([
    {
      empId: 'ADV001',
      name: 'John Doe',
      dob: '1990-05-15',
      isActive: 'Yes',
      hometown: 'New York',
      mobile: '9876543210',
      email: 'john.doe@example.com',
      currentAddress: '123 Main St, Apt 4B, New York, NY 10001',
      permanentAddress: '123 Main St, New York, NY 10001',
      aadharCard: '1234 5678 9012',
      drivingLicense: 'DL12345678',
      vanNo: 'VAN12345',
      panCard: 'ABCDE1234F',
      
      // Bank Details
      bankName: 'Bank of America',
      accountNo: '123456789012',
      ifscCode: 'ABCD0123456',
      accountHolderName: 'John Doe',
      
      // Educational Details
      graduation: 'B.Tech',
      graduationBranch: 'Computer Science',
      graduationMonth: 'May',
      graduationYear: '2015',
      graduationCollege: 'XYZ Engineering College',
      graduationUniversity: 'ABC University',
      graduationMarks: '8.5 CGPA',
      
      twelfthStandard: 'XII',
      twelfthBranch: 'Science',
      twelfthMonth: 'May',
      twelfthYear: '2011',
      twelfthSchool: 'PQR Higher Secondary School',
      twelfthMarks: '85%',
      
      diploma: 'Diploma in CS',
      diplomaBranch: 'Computer Science',
      diplomaMonth: 'June',
      diplomaYear: '2012',
      diplomaCollege: 'LMN Polytechnic',
      diplomaMarks: '75%',
      
      tenthStandard: 'X',
      tenthMonth: 'May',
      tenthYear: '2009',
      tenthSchool: 'RST School',
      tenthMarks: '80%',
      
      // Employment Details
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      location: 'Headquarters',
      reportingManager: 'Jane Smith',
      employmentType: 'Full-time',
      workSchedule: '9:00 AM - 6:00 PM',
      joiningDate: '2020-01-01',
      probationPeriod: '3 months',
      confirmationDate: '2020-04-01',
      currentExperience: '3 years',
      totalExperience: '5 years',
      
      // Compensation Details
      salary: '$75,000',
      payFrequency: 'Monthly',
      lastReviewDate: '2023-01-01',
      healthInsurance: 'Premium Plan',
      retirementPlan: '401(k)',
      paidTimeOff: '20 days/year',
      
      // Performance Details
      lastPerformanceRating: '4.5/5',
      lastPromotionDate: '2022-06-01',
      skills: 'JavaScript, React, Node.js, SQL, Git',
      certifications: 'AWS Certified Developer, Scrum Master'
    },
    {
      empId: 'ADV002',
      name: 'Jane Smith',
      dob: '1992-08-20',
      isActive: 'Yes',
      hometown: 'Boston',
      mobile: '8765432109',
      email: 'jane.smith@example.com',
      currentAddress: '456 Park Ave, Boston, MA 02115',
      permanentAddress: '456 Park Ave, Boston, MA 02115',
      aadharCard: '9876 5432 1098',
      drivingLicense: 'DL87654321',
      vanNo: 'VAN54321',
      panCard: 'FGHIJ5678K',
      
      // Bank Details
      bankName: 'Chase Bank',
      accountNo: '987654321098',
      ifscCode: 'EFGH7890123',
      accountHolderName: 'Jane Smith',
      
      // Educational Details
      graduation: 'M.S.',
      graduationBranch: 'Data Science',
      graduationMonth: 'June',
      graduationYear: '2017',
      graduationCollege: 'ABC University',
      graduationUniversity: 'ABC University',
      graduationMarks: '3.9 GPA',
      
      twelfthStandard: 'XII',
      twelfthBranch: 'Science',
      twelfthMonth: 'May',
      twelfthYear: '2010',
      twelfthSchool: 'Boston High School',
      twelfthMarks: '92%',
      
      diploma: '',
      diplomaBranch: '',
      diplomaMonth: '',
      diplomaYear: '',
      diplomaCollege: '',
      diplomaMarks: '',
      
      tenthStandard: 'X',
      tenthMonth: 'May',
      tenthYear: '2008',
      tenthSchool: 'Boston Middle School',
      tenthMarks: '88%',
      
      // Employment Details
      jobTitle: 'Data Scientist',
      department: 'Data Analytics',
      location: 'Boston Office',
      reportingManager: 'Robert Johnson',
      employmentType: 'Full-time',
      workSchedule: '9:00 AM - 5:00 PM',
      joiningDate: '2018-03-15',
      probationPeriod: '3 months',
      confirmationDate: '2018-06-15',
      currentExperience: '5 years',
      totalExperience: '5 years',
      
      // Compensation Details
      salary: '$85,000',
      payFrequency: 'Bi-weekly',
      lastReviewDate: '2023-03-15',
      healthInsurance: 'Gold Plan',
      retirementPlan: '401(k) with 5% match',
      paidTimeOff: '25 days/year',
      
      // Performance Details
      lastPerformanceRating: '4.8/5',
      lastPromotionDate: '2021-07-01',
      skills: 'Python, R, SQL, Machine Learning, Data Visualization',
      certifications: 'Google Data Analytics, Microsoft Azure Data Scientist'
    }
  ])

  // Navigation functions
  const navigateToLogin = () => {
    setIsAuthenticated(false)
    setUsername('')
    setCurrentPage('login')
  }
  
  const navigateToEmployeeList = () => setCurrentPage('employeeList')
  const navigateToEmployeeDetails = (empId) => {
    setSelectedEmployeeId(empId)
    setCurrentPage('employeeDetails')
  }
  
  const navigateToUpdateEmployee = (empId) => {
    setSelectedEmployeeId(empId)
    setCurrentPage('updateEmployee')
  }
  
  const navigateToAddEmployee = () => {
    setSelectedEmployeeId(null)
    setCurrentPage('updateEmployee')
  }
  
  const navigateToEmploymentDetails = (empId) => {
    setSelectedEmployeeId(empId)
    setCurrentPage('employmentDetails')
  }

  // Handle login
  const handleLogin = (username) => {
    setIsAuthenticated(true)
    setUsername(username)
    setCurrentPage('employeeList')
  }

  // Handle employee operations
  const handleUpdateEmployee = (updatedData) => {
    if (selectedEmployeeId) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.empId === selectedEmployeeId ? { ...updatedData } : emp
      ))
    } else {
      // Add new employee with ADV format ID
      const newEmployee = {
        ...updatedData,
        empId: `ADV${String(employees.length + 1).padStart(3, '0')}`
      }
      setEmployees([...employees, newEmployee])
    }
    navigateToEmployeeList()
  }

  const handleDeleteEmployee = (empId) => {
    setEmployees(employees.filter(emp => emp.empId !== empId))
  }

  // Get selected employee data
  const getSelectedEmployee = () => {
    return employees.find(emp => emp.empId === selectedEmployeeId) || null
  }

  // Render the current page
  const renderPage = () => {
    if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />
    }

    switch(currentPage) {
      case 'employeeList':
        return (
          <EmployeeList 
            employees={employees}
            onViewEmployee={navigateToEmployeeDetails}
            onEditEmployee={navigateToUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onAddEmployee={navigateToAddEmployee}
            onEmploymentDetails={navigateToEmploymentDetails}
            onLogout={navigateToLogin}
            username={username}
          />
        )
      case 'employeeDetails':
        return (
          <EmployeeDetails 
            employee={getSelectedEmployee()}
            onBackClick={navigateToEmployeeList}
          />
        )
      case 'updateEmployee':
        return (
          <UpdateEmployee 
            onBackClick={navigateToEmployeeList}
            employeeData={getSelectedEmployee()}
            onSubmit={handleUpdateEmployee}
          />
        )
      case 'employmentDetails':
        return (
          <EmploymentDetails
            employee={getSelectedEmployee()}
            onBackClick={navigateToEmployeeList}
          />
        )
      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="app">
      {renderPage()}
    </div>
  )
}

export default App
