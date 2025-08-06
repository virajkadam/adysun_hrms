'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

type LoginFormValues = {
  phone: string;
  password: string;
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const { signInWithCredentials } = useAuth();
  const router = useRouter();

  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🔍 Debug: Form data submitted:', data);
      
      const formattedPhoneNumber = `+91${data.phone}`;
      console.log('🔍 Debug: Formatted phone number:', formattedPhoneNumber);
      
      toast.loading('Verifying credentials...', { id: 'login' });
      
      const result = await signInWithCredentials(formattedPhoneNumber, data.password);
      
      if (result.userType === 'admin' && result.admin && result.admin.active) {
        toast.success('Admin login successful!', { id: 'login' });
        
        // Check for redirect parameter
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirect') || '/dashboard';
        router.push(redirectTo);
      } else if (result.userType === 'employee' && result.employee && result.employee.status === 'active') {
        toast.success('Employee login successful!', { id: 'login' });
        
        // Check for redirect parameter
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirect') || '/employee-dashboard';
        router.push(redirectTo);
      } else {
        setError('Invalid credentials or access denied.');
        toast.error('Invalid credentials or access denied.', { id: 'login' });
        setIsLoading(false);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage, { id: 'login' });
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster position="top-center" />
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          {/* Logo and Company Name */}
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/adysun-logo.png"
              alt="Adysun Ventures Logo"
              width={50}
              height={50}
              className="object-contain mr-3"
              priority
            />
            <h1 className="text-3xl font-bold text-gray-900">Adysun Ventures</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Login Portal</h2>
          <p className="mt-2 text-gray-600">
            Enter your credentials to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        )}

        <form 
          onSubmit={handleSubmit(handleLoginSubmit)}
          className="mt-8 space-y-6"
        >
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              })}
              className="py-3 px-4 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter mobile number"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 4,
                    message: 'Password must be at least 4 characters'
                  }
                })}
                className="py-3 px-4 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-black pr-10"
                placeholder="Enter password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-500" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Enquiry Link */}
        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Looking for job opportunities?
          </p>
          <Link
            href="/candidate/enquiry"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Job enquiry form
          </Link>
        </div> */}
      </div>
    </div>
  );
} 