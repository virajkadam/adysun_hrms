import { FiLogOut, FiBell } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect will be handled by the auth state change in the context
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-0 lg:left-64 z-10">
      <div className="flex items-center justify-between h-full px-4">
        <h1 className="text-xl font-semibold text-gray-800 lg:hidden">
          Admin Dashboard
        </h1>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiBell className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="h-8 w-px bg-gray-200"></div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-500"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 