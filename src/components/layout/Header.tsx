'use client';

import { FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      // After successful logout, navigate to the login page
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-0 lg:left-64 z-10">
      <div className="flex items-center justify-between h-full px-4">
        {/* Mobile title - hidden on desktop */}
        <h1 className="text-xl font-semibold text-gray-800 lg:hidden">
          Admin Dashboard
        </h1>
        
        {/* Center logo and company name - hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center">
            <Image
              src="/adysun-logo.png"
              alt="Adysun Ventures Logo"
              width={30}
              height={30}
              className="object-contain mr-2"
              priority
            />
            <span className="text-xl font-semibold text-gray-800">Adysun Ventures</span>
          </div>
        </div>
        
        {/* Logout button on the right side */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          <FiLogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header; 