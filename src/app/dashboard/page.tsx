'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FiUsers, FiBriefcase, FiRefreshCw } from 'react-icons/fi';
import { getEmployees, getEmployments } from '@/utils/firebaseUtils';
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [employmentCount, setEmploymentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { currentAdmin } = useAuth();
  const router = useRouter();

  const fetchData = async () => {
    try {
      const employees = await getEmployees();
      const employments = await getEmployments();
      
      setEmployeeCount(employees.length);
      setEmploymentCount(employments.length);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const employees = await getEmployees();
      const employments = await getEmployments();
      
      setEmployeeCount(employees.length);
      setEmploymentCount(employments.length);
      toast.success('Dashboard refreshed successfully');
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
      toast.error('Failed to refresh dashboard');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Check if user is admin
    if (!currentAdmin) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [currentAdmin, router]);

  // If not admin, don't render dashboard
  if (!currentAdmin) {
    return null;
  }

  const cards = [
    {
      title: 'Employees',
      count: employeeCount,
      icon: <FiUsers className="w-8 h-8 text-blue-500" />,
      link: '/employees',
      color: 'bg-blue-50'
    },
    {
      title: 'Employments',
      count: employmentCount,
      icon: <FiBriefcase className="w-8 h-8 text-green-500" />,
      link: '/employments',
      color: 'bg-green-50'
    }
  ];

  return (
    <DashboardLayout>
      <Toaster position="top-center" />
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-slate-700">Welcome back, {currentAdmin.name}!</p>
          {/* <p className="text-sm text-gray-500">Admin ID: {currentAdmin.id}</p> */}
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`p-2 rounded-md transition-all duration-200 ${
            refreshing 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
          }`}
          title="Refresh dashboard data"
          aria-label="Refresh dashboard data"
        >
          <FiRefreshCw 
            className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
              href={card.link}
              key={card.title}
              className={`${card.color} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-700 font-medium">{card.title}</p>
                  <h3 className="text-3xl font-bold mt-2 text-gray-800">{card.count}</h3>
                </div>
                <div>{card.icon}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/employees/add"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <h3 className="font-medium text-gray-800">Add Employee</h3>
            <p className="text-sm text-gray-600 mt-1">Create a new employee record</p>
          </Link>
          
          <Link
            href="/employments/add"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <h3 className="font-medium text-gray-800">Add Employment</h3>
            <p className="text-sm text-gray-600 mt-1">Create a new employment record</p>
          </Link>
          
          <Link
            href="/dashboard/documents"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <h3 className="font-medium text-gray-800">Documents</h3>
            <p className="text-sm text-gray-600 mt-1">Generate and manage documents</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
} 