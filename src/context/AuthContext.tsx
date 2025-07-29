'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithPhoneNumber, 
  PhoneAuthProvider, 
  signOut,
  onAuthStateChanged,
  User,
  RecaptchaVerifier,
  signInWithCredential
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { checkAdminByPhone } from '../utils/firebaseUtils';

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
};

type AuthContextType = {
  currentUser: User | null;
  currentAdmin: AdminUser | null;
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
      
      // Check if the user is an admin with matching credentials
      const adminData = await checkAdminByPhone(phoneNumber);
      
      console.log('🔍 Debug: Admin data from DB:', adminData);
      
      if (adminData && adminData.active) {
        console.log('🔍 Debug: Admin found and active');
        console.log('🔍 Debug: DB password:', adminData.pass);
        console.log('🔍 Debug: Input password:', password);
        console.log('🔍 Debug: Passwords match?', adminData.pass === password);
        
        // For now, we'll do a simple password check
        // In production, you should hash passwords and compare hashes
        if (adminData.pass === password) {
          console.log('✅ Password match successful!');
          setCurrentAdmin(adminData);
          return { admin: adminData };
        } else {
          console.log('❌ Password mismatch!');
          throw new Error('Invalid password');
        }
      } else {
        console.log('❌ Admin not found or inactive');
        throw new Error('Admin not found or inactive');
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
        const adminData = await checkAdminByPhone('8806431723');
        
        if (adminData && adminData.active) {
          setCurrentAdmin(adminData);
          return { user: null, admin: adminData };
        } else {
          setCurrentAdmin(null);
          return { user: null, admin: null };
        }
      }

      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await signInWithCredential(auth, credential);
      
      // Check if the user is an admin
      const adminData = await checkAdminByPhone(result.user.phoneNumber || '');
      
      if (adminData && adminData.active) {
        setCurrentAdmin(adminData);
        return { user: result.user, admin: adminData };
      } else {
        // User is authenticated but not an admin
        setCurrentAdmin(null);
        return { user: result.user, admin: null };
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      return Promise.reject(error);
    }
  };

  const logout = () => {
    setCurrentAdmin(null);
    return signOut(auth);
  };

  const value = {
    currentUser,
    currentAdmin,
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