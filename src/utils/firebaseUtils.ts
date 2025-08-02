import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Employee, Employment, Salary } from '../types';
import { useAuditTrail } from '../hooks/useAuditTrail';

// Admin authentication functions
export const checkAdminByPhone = async (phoneNumber: string) => {
  try {
    // Remove +91 prefix if present and clean the phone number
    const cleanPhone = phoneNumber.replace(/^\+91/, '');
    
    const q = query(collection(db, 'admins'), where('mobile', '==', cleanPhone));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const adminDoc = querySnapshot.docs[0];
      const adminData = adminDoc.data();
      return { 
        id: adminDoc.id, 
        name: adminData.name || '',
        email: adminData.email || '',
        mobile: adminData.mobile || '',
        pass: adminData.password || '', // Changed from 'pass' to 'password'
        active: adminData.active || false,
        createdAt: adminData.createdAt,
        isAdmin: true,
        userType: 'admin' as const
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error checking admin by phone:', error);
    throw error;
  }
};

export const checkAdminByEmail = async (email: string) => {
  try {
    const q = query(collection(db, 'admins'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const adminDoc = querySnapshot.docs[0];
      return { 
        id: adminDoc.id, 
        ...adminDoc.data(),
        isAdmin: true 
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error checking admin by email:', error);
    throw error;
  }
};

// Custom session management for Mobile + Password authentication
export const createAdminSession = async (adminId: string, adminData: any) => {
  try {
    console.log('🔐 Creating custom admin session...');
    
    // Create a session document
    const sessionData = {
      adminId: adminId,
      adminName: adminData.name,
      adminEmail: adminData.email,
      adminMobile: adminData.mobile,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true
    };
    
    const sessionRef = await addDoc(collection(db, 'admin_sessions'), sessionData);
    console.log('✅ Admin session created:', sessionRef.id);
    
    return sessionRef.id;
  } catch (error) {
    console.error('Error creating admin session:', error);
    throw error;
  }
};

export const validateAdminSession = async (sessionId: string) => {
  try {
    const sessionDoc = await getDoc(doc(db, 'admin_sessions', sessionId));
    
    if (sessionDoc.exists()) {
      const sessionData = sessionDoc.data();
      const now = new Date();
      const expiresAt = sessionData.expiresAt.toDate();
      
      if (sessionData.isActive && now < expiresAt) {
        return sessionData;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error validating admin session:', error);
    return null;
  }
};

// Employee CRUD operations
export const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
  try {
    console.log('🚀 Starting employee creation process...');
    
    // Ensure password field is always present
    const employeeDataWithPassword = {
      ...employeeData,
      password: employeeData.password || '1234', // Default password if not provided
    };
    
    console.log('📋 Employee data to save:', employeeDataWithPassword);
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    console.log('🔐 === CUSTOM AUTHENTICATION CHECK ===');
    console.log('🔑 Session ID:', sessionId);
    console.log('👤 Admin Data:', adminData ? '✅ Found' : '❌ Not found');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      console.log('💡 This means custom authentication failed');
      console.log('🔧 Solution: Make sure admin is logged in with Mobile + Password');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('🔐 === FIRESTORE WRITE ATTEMPT ===');
    console.log('📁 Collection: employees');
    console.log('📄 Document data:', JSON.stringify(employeeDataWithPassword, null, 2));
    
    const docRef = await addDoc(collection(db, 'employees'), employeeDataWithPassword);
    
    console.log('✅ === SUCCESS ===');
    console.log('🆔 New Employee ID:', docRef.id);
    console.log('📁 Document created in Firestore successfully!');
    
    return { id: docRef.id, ...employeeDataWithPassword };
  } catch (error: any) {
    console.log('❌ === ERROR ===');
    console.log('🚨 Error type:', error.constructor.name);
    console.log('📝 Error message:', error.message);
    console.log('🔍 Error code:', error.code);
    
    if (error.code === 'permission-denied') {
      console.log('🔒 PERMISSION DENIED - This means:');
      console.log('   1. Custom admin session is invalid or expired');
      console.log('   2. Firestore rules are blocking the operation');
      console.log('   3. Check if admin is properly logged in with Mobile + Password');
    }
    
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id: string, employeeData: Partial<Employee>) => {
  try {
    console.log('🔄 Starting employee update process...');
    
    // Get audit fields using the hook
    const { getAuditFields } = useAuditTrail();
    const auditFields = getAuditFields();
    
    // Ensure password field is preserved if not being updated
    const updateDataWithAudit = {
      ...employeeData,
      ...auditFields,
    };
    
    // If password is not being updated, ensure it's not removed
    if (!employeeData.password) {
      // Get current employee data to preserve existing password
      const currentEmployee = await getEmployee(id);
      if (currentEmployee && currentEmployee.password) {
        updateDataWithAudit.password = currentEmployee.password;
      } else {
        // Set default password if none exists
        updateDataWithAudit.password = '1234';
      }
    }
    
    console.log('📋 Employee update data with audit:', updateDataWithAudit);
    
    const employeeRef = doc(db, 'employees', id);
    await updateDoc(employeeRef, updateDataWithAudit);
    
    console.log('✅ Employee updated successfully with audit trail');
    return { id, ...updateDataWithAudit };
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'employees', id));
    return true;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    console.log('🔍 Fetching employees with custom authentication...');
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    console.log('🔐 === CUSTOM AUTHENTICATION CHECK ===');
    console.log('🔑 Session ID:', sessionId);
    console.log('👤 Admin Data:', adminData ? '✅ Found' : '❌ Not found');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      console.log('💡 This means custom authentication failed');
      console.log('🔧 Solution: Make sure admin is logged in with Mobile + Password');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('📁 Fetching from collection: employees');
    
    const querySnapshot = await getDocs(collection(db, 'employees'));
    const employees: Employee[] = [];
    querySnapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() } as Employee);
    });
    
    console.log('✅ Successfully fetched employees:', employees.length);
    return employees;
  } catch (error) {
    console.error('Error getting employees:', error);
    throw error;
  }
};

// Update getEmployee function to include admin session validation
export const getEmployee = async (id: string) => {
  try {
    console.log('🔍 Fetching employee with custom authentication...');
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    console.log('🔐 === CUSTOM AUTHENTICATION CHECK ===');
    console.log('🔑 Session ID:', sessionId);
    console.log('👤 Admin Data:', adminData ? '✅ Found' : '❌ Not found');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      console.log('💡 This means custom authentication failed');
      console.log('🔧 Solution: Make sure admin is logged in with Mobile + Password');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('📁 Fetching employee ID:', id);
    
    const docRef = doc(db, 'employees', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('✅ Employee found successfully');
      return { id: docSnap.id, ...docSnap.data() } as Employee;
    } else {
      console.log('❌ Employee not found in database');
      throw new Error('Employee not found');
    }
  } catch (error) {
    console.error('Error getting employee:', error);
    throw error;
  }
};

// Employment CRUD operations
export const addEmployment = async (employmentData: Omit<Employment, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'employments'), employmentData);
    return { id: docRef.id, ...employmentData };
  } catch (error) {
    console.error('Error adding employment:', error);
    throw error;
  }
};

export const updateEmployment = async (id: string, employmentData: Partial<Employment>) => {
  try {
    console.log('🔄 Starting employment update process...');
    
    // Get audit fields using the hook
    const { getAuditFields } = useAuditTrail();
    const auditFields = getAuditFields();
    
    // Add audit fields to update data
    const updateDataWithAudit = {
      ...employmentData,
      ...auditFields,
    };
    
    console.log('📋 Employment update data with audit:', updateDataWithAudit);
    
    const employmentRef = doc(db, 'employments', id);
    await updateDoc(employmentRef, updateDataWithAudit);
    
    console.log('✅ Employment updated successfully with audit trail');
    return { id, ...updateDataWithAudit };
  } catch (error) {
    console.error('Error updating employment:', error);
    throw error;
  }
};

export const deleteEmployment = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'employments', id));
    return true;
  } catch (error) {
    console.error('Error deleting employment:', error);
    throw error;
  }
};

export const getEmployments = async () => {
  try {
    console.log('🔍 Fetching employments with custom authentication...');
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('📁 Fetching from collection: employments');
    
    const querySnapshot = await getDocs(collection(db, 'employments'));
    const employments: Employment[] = [];
    querySnapshot.forEach((doc) => {
      employments.push({ id: doc.id, ...doc.data() } as Employment);
    });
    
    console.log('✅ Successfully fetched employments:', employments.length);
    return employments;
  } catch (error) {
    console.error('Error getting employments:', error);
    throw error;
  }
};

export const getEmployment = async (id: string) => {
  try {
    console.log('🔍 Fetching employment with custom authentication...');
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    console.log('🔐 === CUSTOM AUTHENTICATION CHECK ===');
    console.log('🔑 Session ID:', sessionId);
    console.log('👤 Admin Data:', adminData ? '✅ Found' : '❌ Not found');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      console.log('💡 This means custom authentication failed');
      console.log('🔧 Solution: Make sure admin is logged in with Mobile + Password');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('📁 Fetching employment ID:', id);
    
    const docRef = doc(db, 'employments', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('✅ Employment found successfully');
      return { id: docSnap.id, ...docSnap.data() } as Employment;
    } else {
      console.log('❌ Employment not found in database');
      throw new Error('Employment not found');
    }
  } catch (error) {
    console.error('Error getting employment:', error);
    throw error;
  }
};

export const getEmploymentsByEmployee = async (employeeId: string) => {
  try {
    console.log('🔍 Fetching employments by employee with custom authentication...');
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    console.log('🔐 === CUSTOM AUTHENTICATION CHECK ===');
    console.log('🔑 Session ID:', sessionId);
    console.log('👤 Admin Data:', adminData ? '✅ Found' : '❌ Not found');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      console.log('💡 This means custom authentication failed');
      console.log('🔧 Solution: Make sure admin is logged in with Mobile + Password');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('📁 Fetching employments for employee ID:', employeeId);
    
    const q = query(collection(db, 'employments'), where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);
    const employments: Employment[] = [];
    querySnapshot.forEach((doc) => {
      employments.push({ id: doc.id, ...doc.data() } as Employment);
    });
    
    console.log('✅ Employments fetched successfully:', employments.length, 'records');
    return employments;
  } catch (error) {
    console.error('Error getting employments by employee:', error);
    throw error;
  }
}; 

/**
 * Get admin data from localStorage for audit purposes
 * @returns Admin data object or throws error if not found
 */
export const getAdminDataForAudit = () => {
  const adminSessionId = localStorage.getItem('adminSessionId');
  const adminData = localStorage.getItem('adminData');
  
  if (!adminSessionId || !adminData) {
    throw new Error('No admin session found. Please log in as admin first.');
  }
  
  const admin = JSON.parse(adminData);
  return {
    adminId: admin.id,
    adminName: admin.name,
    currentTimestamp: new Date().toISOString()
  };
};

/**
 * Get admin name by admin ID
 * @param adminId - The admin ID to look up
 * @returns Admin name or 'Unknown Admin' if not found
 */
export const getAdminNameById = async (adminId: string): Promise<string> => {
  try {
    if (!adminId) return 'Unknown Admin';
    
    const adminDoc = await getDoc(doc(db, 'admins', adminId));
    
    if (adminDoc.exists()) {
      const adminData = adminDoc.data();
      return adminData.name || 'Unknown Admin';
    }
    
    return 'Unknown Admin';
  } catch (error) {
    console.error('Error getting admin name by ID:', error);
    return 'Unknown Admin';
  }
};

/**
 * Get employee name by employee ID
 * @param employeeId - The employee ID to look up
 * @returns Employee name or 'Unknown Employee' if not found
 */
export const getEmployeeNameById = async (employeeId: string): Promise<string> => {
  try {
    if (!employeeId) return 'Unknown Employee';
    
    const employeeDoc = await getDoc(doc(db, 'employees', employeeId));
    
    if (employeeDoc.exists()) {
      const employeeData = employeeDoc.data();
      return employeeData.name || 'Unknown Employee';
    }
    
    return 'Unknown Employee';
  } catch (error) {
    console.error('Error getting employee name by ID:', error);
    return 'Unknown Employee';
  }
};

/**
 * Get employment title by employment ID
 * @param employmentId - The employment ID to look up
 * @returns Employment title or 'Unknown Employment' if not found
 */
export const getEmploymentTitleById = async (employmentId: string): Promise<string> => {
  try {
    if (!employmentId) return 'Unknown Employment';
    
    const employmentDoc = await getDoc(doc(db, 'employments', employmentId));
    
    if (employmentDoc.exists()) {
      const employmentData = employmentDoc.data();
      return employmentData.jobTitle || employmentData.contractType || 'Unknown Employment';
    }
    
    return 'Unknown Employment';
  } catch (error) {
    console.error('Error getting employment title by ID:', error);
    return 'Unknown Employment';
  }
};

// Salary CRUD functions
export const addSalary = async (salaryData: Omit<Salary, 'id'>) => {
  try {
    const adminData = getAdminDataForAudit();
    
    // Validate that employeeId is provided
    if (!salaryData.employeeId) {
      throw new Error('Employee ID is required to create a salary record');
    }
    
    // Verify employee exists
    const employeeDoc = await getDoc(doc(db, 'employees', salaryData.employeeId));
    if (!employeeDoc.exists()) {
      throw new Error('Employee not found. Please select a valid employee.');
    }
    
    const salaryWithAudit = {
      ...salaryData,
      createdAt: new Date().toISOString(),
      createdBy: adminData.adminId,
      updatedAt: new Date().toISOString(),
      updatedBy: adminData.adminId,
    };
    
    const docRef = await addDoc(collection(db, 'salaries'), salaryWithAudit);
    console.log('✅ Salary added successfully for employee:', salaryData.employeeId, 'Salary ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding salary:', error);
    throw error;
  }
};

export const updateSalary = async (id: string, salaryData: Partial<Salary>) => {
  try {
    const adminData = getAdminDataForAudit();
    
    // If employeeId is being updated, validate the employee exists
    if (salaryData.employeeId) {
      const employeeDoc = await getDoc(doc(db, 'employees', salaryData.employeeId));
      if (!employeeDoc.exists()) {
        throw new Error('Employee not found. Please select a valid employee.');
      }
    }
    
    const salaryWithAudit = {
      ...salaryData,
      updatedAt: new Date().toISOString(),
      updatedBy: adminData.adminId,
    };
    
    const salaryRef = doc(db, 'salaries', id);
    await updateDoc(salaryRef, salaryWithAudit);
    console.log('✅ Salary updated successfully:', id);
  } catch (error) {
    console.error('Error updating salary:', error);
    throw error;
  }
};

export const deleteSalary = async (id: string) => {
  try {
    // Get salary data before deletion for logging
    const salaryDoc = await getDoc(doc(db, 'salaries', id));
    if (salaryDoc.exists()) {
      const salaryData = salaryDoc.data() as Salary;
      console.log('🗑️ Deleting salary for employee:', salaryData.employeeId, 'Salary ID:', id);
    }
    
    await deleteDoc(doc(db, 'salaries', id));
    console.log('✅ Salary deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting salary:', error);
    throw error;
  }
};

export const getSalaries = async () => {
  try {
    console.log('🔍 Fetching salaries with custom authentication...');
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    console.log('🔐 === CUSTOM AUTHENTICATION CHECK ===');
    console.log('🔑 Session ID:', sessionId);
    console.log('👤 Admin Data:', adminData ? '✅ Found' : '❌ Not found');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      console.log('💡 This means custom authentication failed');
      console.log('🔧 Solution: Make sure admin is logged in with Mobile + Password');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('📁 Fetching from collection: salaries');
    
    const querySnapshot = await getDocs(collection(db, 'salaries'));
    const salaries: Salary[] = [];
    querySnapshot.forEach((doc) => {
      salaries.push({ id: doc.id, ...doc.data() } as Salary);
    });
    
    const sortedSalaries = salaries.sort((a, b) => {
      // Sort by year descending, then by month descending
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
    
    console.log('✅ Successfully fetched salaries:', sortedSalaries.length);
    return sortedSalaries;
  } catch (error) {
    console.error('Error getting salaries:', error);
    throw error;
  }
};

export const getSalary = async (id: string) => {
  try {
    console.log('🔍 Fetching salary with custom authentication...');
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    console.log('🔐 === CUSTOM AUTHENTICATION CHECK ===');
    console.log('🔑 Session ID:', sessionId);
    console.log('👤 Admin Data:', adminData ? '✅ Found' : '❌ Not found');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      console.log('💡 This means custom authentication failed');
      console.log('🔧 Solution: Make sure admin is logged in with Mobile + Password');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('📁 Fetching salary ID:', id);
    
    const salaryDoc = await getDoc(doc(db, 'salaries', id));
    
    if (salaryDoc.exists()) {
      console.log('✅ Salary found successfully');
      return { id: salaryDoc.id, ...salaryDoc.data() } as Salary;
    }
    
    console.log('❌ Salary not found in database');
    throw new Error('Salary not found');
  } catch (error) {
    console.error('Error getting salary:', error);
    throw error;
  }
};

export const getSalariesByEmployee = async (employeeId: string) => {
  try {
    console.log('🔍 Fetching salaries for employee with custom authentication...');
    
    // Check for custom admin session
    const sessionId = localStorage.getItem('adminSessionId');
    const adminData = localStorage.getItem('adminData');
    
    console.log('🔐 === CUSTOM AUTHENTICATION CHECK ===');
    console.log('🔑 Session ID:', sessionId);
    console.log('👤 Admin Data:', adminData ? '✅ Found' : '❌ Not found');
    
    if (!sessionId || !adminData) {
      console.log('❌ CRITICAL: No admin session found!');
      console.log('💡 This means custom authentication failed');
      console.log('🔧 Solution: Make sure admin is logged in with Mobile + Password');
      throw new Error('No admin session found. Please log in as admin first.');
    }
    
    console.log('✅ Custom authentication session found');
    console.log('🔍 Fetching salaries for employee:', employeeId);
    
    const q = query(collection(db, 'salaries'), where('employeeId', '==', employeeId));
    console.log('📝 Query created with filter:', { employeeId });
    
    const querySnapshot = await getDocs(q);
    console.log('📊 Query results count:', querySnapshot.size);
    
    const salaries: Salary[] = [];
    querySnapshot.forEach((doc) => {
      const salary = { id: doc.id, ...doc.data() } as Salary;
      salaries.push(salary);
      console.log('💰 Found salary:', { id: doc.id, month: salary.month, year: salary.year });
    });
    
    const sortedSalaries = salaries.sort((a, b) => {
      // Sort by year descending, then by month descending
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
    
    console.log('✅ Returning sorted salaries:', sortedSalaries.length);
    return sortedSalaries;
  } catch (error) {
    console.error('❌ Error getting salaries by employee:', error);
    throw error;
  }
}; 

// Employee authentication functions
export const checkEmployeeByPhone = async (phoneNumber: string) => {
  try {
    // Remove +91 prefix if present and clean the phone number
    const cleanPhone = phoneNumber.replace(/^\+91/, '');
    
    const q = query(collection(db, 'employees'), where('phone', '==', cleanPhone));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const employeeDoc = querySnapshot.docs[0];
      const employeeData = employeeDoc.data();
      return { 
        id: employeeDoc.id, 
        name: employeeData.name || '',
        email: employeeData.email || '',
        phone: employeeData.phone || '',
        password: employeeData.password || '', // Assuming employees have password field
        status: employeeData.status || 'inactive',
        createdAt: employeeData.createdAt,
        isEmployee: true,
        isAdmin: false,
        userType: 'employee' as const
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error checking employee by phone:', error);
    throw error;
  }
};

// Function to update employee password
export const updateEmployeePassword = async (employeeId: string, newPassword: string) => {
  try {
    const employeeRef = doc(db, 'employees', employeeId);
    await updateDoc(employeeRef, {
      password: newPassword,
      updatedAt: new Date().toISOString()
    });
    console.log('✅ Employee password updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating employee password:', error);
    throw error;
  }
};

// Function to add password field to existing employees (for migration)
export const addPasswordToEmployees = async () => {
  try {
    console.log('🔄 Starting password migration for employees...');
    
    const querySnapshot = await getDocs(collection(db, 'employees'));
    const updatePromises: Promise<any>[] = [];
    
    querySnapshot.forEach((doc) => {
      const employeeData = doc.data();
      
      // If employee doesn't have a password field, add a default one
      if (!employeeData.password) {
        // New pattern: last 5 digits of mobile + @#$$
        const defaultPassword = `${employeeData.phone.slice(-5)}@#$$`;
        updatePromises.push(
          updateDoc(doc.ref, {
            password: defaultPassword,
            updatedAt: new Date().toISOString()
          })
        );
        console.log(`📝 Adding default password to employee: ${employeeData.name} (${defaultPassword})`);
      }
    });
    
    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
      console.log(`✅ Successfully updated ${updatePromises.length} employees with default passwords`);
    } else {
      console.log('ℹ️ All employees already have passwords');
    }
    
    return updatePromises.length;
  } catch (error) {
    console.error('Error adding passwords to employees:', error);
    throw error;
  }
};

// Function for employee to access their own data
export const getEmployeeSelf = async (employeeId: string) => {
  try {
    console.log('🔍 Fetching employee self data...');
    
    // Check for employee session
    const employeeSessionId = localStorage.getItem('employeeSessionId');
    const employeeData = localStorage.getItem('employeeData');
    
    console.log('🔐 === EMPLOYEE SESSION CHECK ===');
    console.log('🔑 Employee Session ID:', employeeSessionId);
    console.log('👤 Employee Data:', employeeData ? '✅ Found' : '❌ Not found');
    
    if (!employeeSessionId || !employeeData) {
      console.log('❌ CRITICAL: No employee session found!');
      throw new Error('No employee session found. Please log in as employee first.');
    }
    
    const currentEmployee = JSON.parse(employeeData);
    
    // Security check: Employee can only access their own data
    if (currentEmployee.id !== employeeId) {
      console.log('❌ SECURITY: Employee trying to access other employee data!');
      throw new Error('Access denied. You can only view your own data.');
    }
    
    console.log('✅ Employee session validated');
    console.log('📁 Fetching employee ID:', employeeId);
    
    const docRef = doc(db, 'employees', employeeId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('✅ Employee self data found successfully');
      return { id: docSnap.id, ...docSnap.data() } as Employee;
    } else {
      console.log('❌ Employee not found in database');
      throw new Error('Employee not found');
    }
  } catch (error) {
    console.error('Error getting employee self data:', error);
    throw error;
  }
};

// Function for employee to access their own employment data
export const getEmployeeSelfEmployment = async (employeeId: string) => {
  try {
    console.log('🔍 Fetching employee self employment data...');
    
    // Check for employee session
    const employeeSessionId = localStorage.getItem('employeeSessionId');
    const employeeData = localStorage.getItem('employeeData');
    
    if (!employeeSessionId || !employeeData) {
      throw new Error('No employee session found. Please log in as employee first.');
    }
    
    const currentEmployee = JSON.parse(employeeData);
    
    // Security check: Employee can only access their own data
    if (currentEmployee.id !== employeeId) {
      throw new Error('Access denied. You can only view your own data.');
    }
    
    console.log('✅ Employee session validated for employment data');
    
    const q = query(collection(db, 'employments'), where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);
    const employments: Employment[] = [];
    
    querySnapshot.forEach((doc) => {
      employments.push({ id: doc.id, ...doc.data() } as Employment);
    });
    
    console.log('✅ Employee employment data found:', employments.length);
    return employments;
  } catch (error) {
    console.error('Error getting employee self employment data:', error);
    throw error;
  }
};

// Common authentication function that checks both admin and employee
export const checkUserByPhone = async (phoneNumber: string) => {
  try {
    console.log('🔍 Checking user by phone:', phoneNumber);
    
    // First check if it's an admin
    const adminData = await checkAdminByPhone(phoneNumber);
    if (adminData && adminData.active) {
      console.log('✅ Found active admin');
      return { ...adminData, userType: 'admin' as const };
    }
    
    // Then check if it's an employee
    const employeeData = await checkEmployeeByPhone(phoneNumber);
    if (employeeData && employeeData.status === 'active') {
      console.log('✅ Found active employee');
      return { ...employeeData, userType: 'employee' as const };
    }
    
    console.log('❌ No active user found');
    return null;
  } catch (error) {
    console.error('Error checking user by phone:', error);
    throw error;
  }
}; 

// Employee-specific data access functions
export const getEmployeeAttendance = async (employeeId: string) => {
  try {
    console.log('🔍 Fetching employee attendance data...');
    
    // Check for employee session
    const employeeSessionId = localStorage.getItem('employeeSessionId');
    const employeeData = localStorage.getItem('employeeData');
    
    if (!employeeSessionId || !employeeData) {
      throw new Error('No employee session found. Please log in as employee first.');
    }
    
    const currentEmployee = JSON.parse(employeeData);
    
    // Security check: Employee can only access their own data
    if (currentEmployee.id !== employeeId) {
      throw new Error('Access denied. You can only view your own data.');
    }
    
    console.log('✅ Employee session validated for attendance data');
    
    const q = query(collection(db, 'attendance'), where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);
    const attendanceRecords: any[] = [];
    
    querySnapshot.forEach((doc) => {
      attendanceRecords.push({ id: doc.id, ...doc.data() });
    });
    
    console.log('✅ Employee attendance data found:', attendanceRecords.length);
    return attendanceRecords;
  } catch (error) {
    console.error('Error getting employee attendance data:', error);
    throw error;
  }
};

export const getEmployeeLeaves = async (employeeId: string) => {
  try {
    console.log('🔍 Fetching employee leave data...');
    
    // Check for employee session
    const employeeSessionId = localStorage.getItem('employeeSessionId');
    const employeeData = localStorage.getItem('employeeData');
    
    if (!employeeSessionId || !employeeData) {
      throw new Error('No employee session found. Please log in as employee first.');
    }
    
    const currentEmployee = JSON.parse(employeeData);
    
    // Security check: Employee can only access their own data
    if (currentEmployee.id !== employeeId) {
      throw new Error('Access denied. You can only view your own data.');
    }
    
    console.log('✅ Employee session validated for leave data');
    
    const q = query(collection(db, 'leaves'), where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);
    const leaveRecords: any[] = [];
    
    querySnapshot.forEach((doc) => {
      leaveRecords.push({ id: doc.id, ...doc.data() });
    });
    
    console.log('✅ Employee leave data found:', leaveRecords.length);
    return leaveRecords;
  } catch (error) {
    console.error('Error getting employee leave data:', error);
    throw error;
  }
};

export const getEmployeeDocument = async (employeeId: string, documentType: string) => {
  try {
    console.log('🔍 Fetching employee document:', documentType);
    
    // Check for employee session
    const employeeSessionId = localStorage.getItem('employeeSessionId');
    const employeeData = localStorage.getItem('employeeData');
    
    if (!employeeSessionId || !employeeData) {
      throw new Error('No employee session found. Please log in as employee first.');
    }
    
    const currentEmployee = JSON.parse(employeeData);
    
    // Security check: Employee can only access their own data
    if (currentEmployee.id !== employeeId) {
      throw new Error('Access denied. You can only view your own data.');
    }
    
    console.log('✅ Employee session validated for document access');
    
    const q = query(
      collection(db, 'employee_documents'), 
      where('employeeId', '==', employeeId),
      where('documentType', '==', documentType)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      console.log('✅ Employee document found:', documentType);
      return { id: querySnapshot.docs[0].id, ...docData };
    } else {
      console.log('❌ Employee document not found:', documentType);
      return null;
    }
  } catch (error) {
    console.error('Error getting employee document:', error);
    throw error;
  }
};

export const getEmployeeSalarySlips = async (employeeId: string) => {
  try {
    console.log('🔍 Fetching employee salary slips...');
    
    // Check for employee session
    const employeeSessionId = localStorage.getItem('employeeSessionId');
    const employeeData = localStorage.getItem('employeeData');
    
    if (!employeeSessionId || !employeeData) {
      throw new Error('No employee session found. Please log in as employee first.');
    }
    
    const currentEmployee = JSON.parse(employeeData);
    
    // Security check: Employee can only access their own data
    if (currentEmployee.id !== employeeId) {
      throw new Error('Access denied. You can only view your own data.');
    }
    
    console.log('✅ Employee session validated for salary slips');
    
    const q = query(collection(db, 'salary_slips'), where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);
    const salarySlips: any[] = [];
    
    querySnapshot.forEach((doc) => {
      salarySlips.push({ id: doc.id, ...doc.data() });
    });
    
    console.log('✅ Employee salary slips found:', salarySlips.length);
    return salarySlips;
  } catch (error) {
    console.error('Error getting employee salary slips:', error);
    throw error;
  }
}; 