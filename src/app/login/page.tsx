'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

type LoginFormValues = {
  phone: string;
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const { signInWithPhone } = useAuth();
  const router = useRouter();

  const handlePhoneSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const formattedPhoneNumber = `+91${data.phone}`;
      toast.loading('Sending verification code...', { id: 'sendingOtp' });
      
      const result = await signInWithPhone(formattedPhoneNumber);
      
      toast.success('Verification code sent successfully!', { id: 'sendingOtp' });
      
      // Navigate to verify page with phone and verificationId as query params
      router.push(`/verify?phone=${data.phone}&verificationId=${result.verificationId}`);
      // Keep loading state active until navigation completes (it happens automatically)
    } catch (error: any) {
      setError(error.message || 'Failed to send verification code');
      toast.error(error.message || 'Failed to send verification code', { id: 'sendingOtp' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster position="top-center" />
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-2 text-gray-600">
            Enter your phone number to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        )}

        <form 
          onSubmit={handleSubmit(handlePhoneSubmit)}
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
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending Code...' : 'Send Code'}
            </button>
          </div>

          {/* Hidden recaptcha container */}
          <div id="recaptcha-container"></div>
        </form>
      </div>
    </div>
  );
} 