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

// Employee CRUD operations
export const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'employees'), employeeData);
    return { id: docRef.id, ...employeeData };
  } catch (error) {
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
    const querySnapshot = await getDocs(collection(db, 'employees'));
    const employees: Employee[] = [];
    querySnapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() } as Employee);
    });
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
    const querySnapshot = await getDocs(collection(db, 'employments'));
    const employments: Employment[] = [];
    querySnapshot.forEach((doc) => {
      employments.push({ id: doc.id, ...doc.data() } as Employment);
    });
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