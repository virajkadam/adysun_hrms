'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiPlus, FiClock, FiCheck, FiX } from 'react-icons/fi';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { getEmployeeLeaves } from '@/utils/firebaseUtils';
import { formatDateToDayMonYear } from '@/utils/documentUtils';

interface LeaveRecord {
  id: string;
  type: 'casual' | 'sick' | 'annual' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  totalDays: number;
}

export default function EmployeeLeavesPage() {
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  
  const router = useRouter();
  const { currentUserData } = useAuth();

  useEffect(() => {
    // Check if user is authenticated and is employee
    if (!currentUserData || currentUserData.userType !== 'employee') {
      router.push('/login');
      return;
    }

    // Fetch leave data for the current employee
    const fetchLeaveData = async () => {
      try {
        setIsLoading(true);
        
        // Use the employee-specific function to fetch leave data
        const leaveData = await getEmployeeLeaves(currentUserData.id);
        
        console.log('📊 Raw leave data received:', leaveData);
        
        // Transform the data to match the expected format
        const transformedData: LeaveRecord[] = leaveData.map((record: any) => {
          console.log('🔄 Processing leave record:', record);
          
          const transformed = {
            id: record.id,
            type: record.type || 'casual',
            startDate: record.startDate,
            endDate: record.endDate,
            reason: record.reason || 'Personal leave',
            status: record.status || 'pending',
            appliedDate: record.appliedDate,
            totalDays: record.totalDays || 1
          };
          
          console.log('✅ Transformed leave record:', transformed);
          return transformed;
        });
        
        console.log('📋 Final transformed leave records:', transformedData);
        setLeaveRecords(transformedData);
      } catch (error: any) {
        console.error('Error fetching leave data:', error);
        toast.error('Failed to load leave data');
        setLeaveRecords([]); // Set empty array instead of mock data
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveData();
  }, [currentUserData, router]);

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case 'casual':
        return <FiCalendar className="w-4 h-4 text-blue-600" />;
      case 'sick':
        return <FiCalendar className="w-4 h-4 text-red-600" />;
      case 'annual':
        return <FiCalendar className="w-4 h-4 text-green-600" />;
      case 'personal':
        return <FiCalendar className="w-4 h-4 text-purple-600" />;
      case 'maternity':
        return <FiCalendar className="w-4 h-4 text-pink-600" />;
      case 'paternity':
        return <FiCalendar className="w-4 h-4 text-indigo-600" />;
      default:
        return <FiCalendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getLeaveTypeBadge = (type: string) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (type) {
      case 'casual':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'sick':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'annual':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'personal':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'maternity':
        return `${baseClasses} bg-pink-100 text-pink-800`;
      case 'paternity':
        return `${baseClasses} bg-indigo-100 text-indigo-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleRequestLeave = () => {
    router.push('/employee/leaves/request');
  };

  if (isLoading) {
    return (
      <EmployeeLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading leave data...</p>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <Toaster position="top-center" />
      
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Leaves</h1>
              <p className="text-slate-700">View and manage your leave requests</p>
            </div>
            <button
              onClick={handleRequestLeave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <FiPlus className="w-4 h-4" />
              <span>Request Leave</span>
            </button>
          </div>
              </div>

        <div className="p-6">
          {/* Leave Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved Leaves</p>
                  <p className="text-2xl font-bold text-green-600">
                    {leaveRecords.filter(record => record.status === 'approved').length}
                  </p>
              </div>
                <FiCheck className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Leaves</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {leaveRecords.filter(record => record.status === 'pending').length}
                  </p>
              </div>
                <FiClock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected Leaves</p>
                  <p className="text-2xl font-bold text-red-600">
                    {leaveRecords.filter(record => record.status === 'rejected').length}
                  </p>
                </div>
                <FiX className="w-8 h-8 text-red-500" />
              </div>
                  </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Days</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {leaveRecords.reduce((total, record) => total + record.totalDays, 0)}
                  </p>
                </div>
                <FiCalendar className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Leave Records Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaveRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getLeaveTypeIcon(record.type)}
                        <span className={getLeaveTypeBadge(record.type)}>
                          {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateToDayMonYear(record.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateToDayMonYear(record.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.totalDays} day{record.totalDays > 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(record.status)}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateToDayMonYear(record.appliedDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {leaveRecords.length === 0 && (
            <div className="text-center py-8">
              <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No leave records found.</p>
            </div>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
} 