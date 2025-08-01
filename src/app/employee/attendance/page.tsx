'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiClock, FiCheck, FiX } from 'react-icons/fi';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { formatDateToDayMonYear } from '@/utils/documentUtils';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  totalHours: number;
}

export default function EmployeeAttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const router = useRouter();
  const { currentUserData } = useAuth();

  useEffect(() => {
    // Check if user is authenticated and is employee
    if (!currentUserData || currentUserData.userType !== 'employee') {
      router.push('/login');
      return;
    }

    // Mock attendance data - replace with actual API call
    const fetchAttendanceData = async () => {
      try {
        setIsLoading(true);
        
        // Mock data for demonstration
        const mockData: AttendanceRecord[] = [
          {
            id: '1',
            date: '2024-01-15',
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'present',
            totalHours: 9
          },
          {
            id: '2',
            date: '2024-01-16',
            checkIn: '09:15 AM',
            checkOut: '06:00 PM',
            status: 'late',
            totalHours: 8.75
          },
          {
            id: '3',
            date: '2024-01-17',
            checkIn: '09:00 AM',
            checkOut: '03:00 PM',
            status: 'half-day',
            totalHours: 6
          },
          {
            id: '4',
            date: '2024-01-18',
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'present',
            totalHours: 9
          },
          {
            id: '5',
            date: '2024-01-19',
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'present',
            totalHours: 9
          }
        ];
        
        setAttendanceRecords(mockData);
      } catch (error: any) {
        console.error('Error fetching attendance data:', error);
        toast.error('Failed to load attendance data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, [currentUserData, router, currentMonth, currentYear]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <FiCheck className="w-4 h-4 text-green-600" />;
      case 'absent':
        return <FiX className="w-4 h-4 text-red-600" />;
      case 'late':
        return <FiClock className="w-4 h-4 text-yellow-600" />;
      case 'half-day':
        return <FiClock className="w-4 h-4 text-orange-600" />;
      default:
        return <FiClock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case 'present':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'absent':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'late':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'half-day':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  if (isLoading) {
    return (
      <EmployeeLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading attendance data...</p>
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
              <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>
              <p className="text-slate-700">View your attendance records</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleMonthChange('prev')}
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                ←
              </button>
              <span className="text-lg font-semibold text-gray-800">
                {getMonthName(currentMonth)} {currentYear}
              </span>
              <button
                onClick={() => handleMonthChange('next')}
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                →
              </button>
            </div>
          </div>
              </div>

        <div className="p-6">
          {/* Attendance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Present Days</p>
                  <p className="text-2xl font-bold text-green-600">
                    {attendanceRecords.filter(record => record.status === 'present').length}
                  </p>
              </div>
                <FiCheck className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absent Days</p>
                  <p className="text-2xl font-bold text-red-600">
                    {attendanceRecords.filter(record => record.status === 'absent').length}
                  </p>
              </div>
                <FiX className="w-8 h-8 text-red-500" />
            </div>
          </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Late Days</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {attendanceRecords.filter(record => record.status === 'late').length}
                  </p>
                </div>
                <FiClock className="w-8 h-8 text-yellow-500" />
              </div>
                  </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {attendanceRecords.reduce((total, record) => total + record.totalHours, 0)}
                  </p>
                </div>
                <FiCalendar className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Attendance Records Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Hours
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatDateToDayMonYear(record.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.checkIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.checkOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(record.status)}
                        <span className={getStatusBadge(record.status)}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.totalHours} hrs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {attendanceRecords.length === 0 && (
            <div className="text-center py-8">
              <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No attendance records found for this month.</p>
            </div>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
} 