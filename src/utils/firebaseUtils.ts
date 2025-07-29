import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Employee, Employment } from '../types';

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
        isAdmin: true 
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
    console.log('📋 Employee data to save:', employeeData);
    
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
    console.log('📄 Document data:', JSON.stringify(employeeData, null, 2));
    
    const docRef = await addDoc(collection(db, 'employees'), employeeData);
    
    console.log('✅ === SUCCESS ===');
    console.log('🆔 New Employee ID:', docRef.id);
    console.log('📁 Document created in Firestore successfully!');
    
    return { id: docRef.id, ...employeeData };
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
    const employeeRef = doc(db, 'employees', id);
    await updateDoc(employeeRef, employeeData);
    return { id, ...employeeData };
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

export const getEmployee = async (id: string) => {
  try {
    const docRef = doc(db, 'employees', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Employee;
    } else {
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
    const employmentRef = doc(db, 'employments', id);
    await updateDoc(employmentRef, employmentData);
    return { id, ...employmentData };
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
    const docRef = doc(db, 'employments', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Employment;
    } else {
      throw new Error('Employment not found');
    }
  } catch (error) {
    console.error('Error getting employment:', error);
    throw error;
  }
};

export const getEmploymentsByEmployee = async (employeeId: string) => {
  try {
    const q = query(collection(db, 'employments'), where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);
    const employments: Employment[] = [];
    querySnapshot.forEach((doc) => {
      employments.push({ id: doc.id, ...doc.data() } as Employment);
    });
    return employments;
  } catch (error) {
    console.error('Error getting employments by employee:', error);
    throw error;
  }
}; 