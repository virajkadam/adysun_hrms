'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithPhoneNumber, 
  PhoneAuthProvider, 
  signOut,
  onAuthStateChanged,
  User,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { checkAdminByPhone, createAdminSession, checkUserByPhone } from '../utils/firebaseUtils';

// Extend Window interface to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}

type AdminUser = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  pass: string;
  active: boolean;
  createdAt: any;
  isAdmin: boolean;
  userType: 'admin';
};

type EmployeeUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: 'active' | 'inactive';
  createdAt: any;
  isEmployee: boolean;
  isAdmin: boolean;
  userType: 'employee';
};

type CurrentUser = AdminUser | EmployeeUser | null;

type AuthContextType = {
  currentUser: User | null;
  currentAdmin: AdminUser | null;
  currentEmployee: EmployeeUser | null;
  currentUserData: CurrentUser;
  loading: boolean;
  signInWithPhone: (phoneNumber: string) => Promise<any>;
  signInWithCredentials: (phoneNumber: string, password: string) => Promise<any>;
  verifyOTP: (verificationId: string, otp: string) => Promise<any>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeUser | null>(null);
  const [currentUserData, setCurrentUserData] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithCredentials = async (phoneNumber: string, password: string) => {
    try {
      console.log('🔍 Debug: Input phoneNumber:', phoneNumber);
      console.log('🔍 Debug: Input password:', password);
      
      // Use the common authentication function
      const userData = await checkUserByPhone(phoneNumber);
      
      console.log('🔍 Debug: User data from DB:', userData);
      
      if (!userData) {
        console.log('❌ No user found');
        throw new Error('User not found');
      }
      
      if (userData.userType === 'admin') {
        // Admin authentication
        if (userData.active && userData.pass === password) {
          console.log('✅ Admin password match successful!');
          
          // Create a custom session for the admin
          const sessionId = await createAdminSession(userData.id, userData);
          console.log('✅ Custom authentication session created:', sessionId);
          
          // Store session ID in localStorage for persistence
          localStorage.setItem('adminSessionId', sessionId);
          localStorage.setItem('adminData', JSON.stringify(userData));
          
          setCurrentAdmin(userData);
          setCurrentEmployee(null);
          setCurrentUserData(userData);
          return { admin: userData, userType: 'admin' };
        } else {
          console.log('❌ Admin password mismatch or inactive!');
          throw new Error('Invalid password or inactive account');
        }
      } else if (userData.userType === 'employee') {
        // Employee authentication
        if (userData.status === 'active' && userData.password === password) {
          console.log('✅ Employee password match successful!');
          
          // Store employee data in localStorage for persistence
          localStorage.setItem('employeeSessionId', userData.id);
          localStorage.setItem('employeeData', JSON.stringify(userData));
          
          setCurrentEmployee(userData);
          setCurrentAdmin(null);
          setCurrentUserData(userData);
          return { employee: userData, userType: 'employee' };
        } else {
          console.log('❌ Employee password mismatch or inactive!');
          throw new Error('Invalid password or inactive account');
        }
      } else {
        console.log('❌ Unknown user type');
        throw new Error('Invalid user type');
      }
    } catch (error) {
      console.error('Error during credential sign in:', error);
      return Promise.reject(error);
    }
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      // TEMPORARY: Development bypass for testing admin collection
      if (phoneNumber === '+918806431723') {
        console.log('Using development bypass for admin testing');
        return { verificationId: 'dev-bypass-verification-id' };
      }

      // For development, you can use the test phone number: +1 999-999-9999
      // Create a RecaptchaVerifier instance
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log('Recaptcha verified');
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            console.log('Recaptcha expired');
          }
        });
      }

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error('RecaptchaVerifier is not initialized');
      }
      
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return { verificationId: confirmationResult.verificationId };
    } catch (error) {
      console.error('Error during phone sign in:', error);
      // Reset the reCAPTCHA so the user can try again
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      return Promise.reject(error);
    }
  };

  const verifyOTP = async (verificationId: string, otp: string) => {
    try {
      // TEMPORARY: Development bypass for testing admin collection
      if (verificationId === 'dev-bypass-verification-id') {
        console.log('Using development bypass for admin verification');
        // Check if the user is an admin using the phone number from the login form
        const userData = await checkUserByPhone('8806431723');
        
        if (userData) {
          if (userData.userType === 'admin') {
            setCurrentAdmin(userData);
            setCurrentEmployee(null);
            setCurrentUserData(userData);
            return { user: null, admin: userData, userType: 'admin' };
          } else if (userData.userType === 'employee') {
            setCurrentEmployee(userData);
            setCurrentAdmin(null);
            setCurrentUserData(userData);
            return { user: null, employee: userData, userType: 'employee' };
          }
        } else {
          setCurrentAdmin(null);
          setCurrentEmployee(null);
          setCurrentUserData(null);
          return { user: null, admin: null, employee: null };
        }
      }

      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await signInWithCredential(auth, credential);
      
      // Check if the user is an admin or employee
      const userData = await checkUserByPhone(result.user.phoneNumber || '');
      
      if (userData) {
        if (userData.userType === 'admin') {
          setCurrentAdmin(userData);
          setCurrentEmployee(null);
          setCurrentUserData(userData);
          return { user: result.user, admin: userData, userType: 'admin' };
        } else if (userData.userType === 'employee') {
          setCurrentEmployee(userData);
          setCurrentAdmin(null);
          setCurrentUserData(userData);
          return { user: result.user, employee: userData, userType: 'employee' };
        }
      } else {
        // User is authenticated but not found in admin or employee collections
        setCurrentAdmin(null);
        setCurrentEmployee(null);
        setCurrentUserData(null);
        return { user: result.user, admin: null, employee: null };
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      return Promise.reject(error);
    }
  };

  const logout = () => {
    setCurrentAdmin(null);
    setCurrentEmployee(null);
    setCurrentUserData(null);
    // Clear localStorage
    localStorage.removeItem('adminSessionId');
    localStorage.removeItem('adminData');
    localStorage.removeItem('employeeSessionId');
    localStorage.removeItem('employeeData');
    return signOut(auth);
  };

  const value = {
    currentUser,
    currentAdmin,
    currentEmployee,
    currentUserData,
    loading,
    signInWithPhone,
    signInWithCredentials,
    verifyOTP,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 