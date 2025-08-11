'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiClock, FiCheck, FiX } from 'react-icons/fi';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useAttendanceByEmployee, useTodayAttendance, useMarkAttendanceCheckIn, useMarkAttendanceCheckOut } from '@/hooks/useAttendance';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import TableHeader from '@/components/ui/TableHeader';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  totalHours: number;
}

interface TodayAttendance {
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  status?: string;
  totalHours?: number;
}

export default function EmployeeAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const router = useRouter();
  const { currentUserData } = useAuth();

  // Use attendance hooks
  const {
    data: attendanceRecords = [],
    isLoading: attendanceLoading,
    isError: attendanceError,
    error: attendanceErrorData
  } = useAttendanceByEmployee(currentUserData?.id || '');

  const {
    data: todayAttendance = {
      isCheckedIn: false,
      isCheckedOut: false
    },
    isLoading: todayLoading,
    isError: todayError,
    error: todayErrorData
  } = useTodayAttendance(currentUserData?.id || '');

  // Attendance mutations
  const checkInMutation = useMarkAttendanceCheckIn();
  const checkOutMutation = useMarkAttendanceCheckOut();

  // Helper function to convert 24-hour time to 12-hour format
  const formatTimeTo12Hour = (timeString: string | undefined): string => {
    if (!timeString) return '--';
    
    try {
      // Handle different time formats
      let time = timeString;
      
      // If it's already in 12-hour format, return as is
      if (timeString.includes('AM') || timeString.includes('PM')) {
        return timeString;
      }
      
      // If it's in 24-hour format (HH:MM), convert to 12-hour
      if (timeString.includes(':')) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
      }
      
      return timeString;
    } catch (error) {
      return timeString;
    }
  };

  useEffect(() => {
    // Check if user is authenticated and is employee
    if (!currentUserData || currentUserData.userType !== 'employee') {
      router.push('/login');
      return;
    }
  }, [currentUserData, router]);

  // Handle errors
  useEffect(() => {
    if (attendanceError && attendanceErrorData) {
      console.error('Attendance data error:', attendanceErrorData);
      toast.error('Failed to load attendance data');
    }
  }, [attendanceError, attendanceErrorData]);

  useEffect(() => {
    if (todayError && todayErrorData) {
      console.error('Today attendance error:', todayErrorData);
      toast.error('Failed to load today\'s attendance');
    }
  }, [todayError, todayErrorData]);

  const handleCheckIn = async () => {
    try {
      // Get employment ID for the employee
      const employmentQuery = query(
        collection(db, 'employments'),
        where('employeeId', '==', currentUserData?.id)
      );
      const employmentSnapshot = await getDocs(employmentQuery);
      
      if (employmentSnapshot.empty) {
        throw new Error('No employment record found for this employee.');
      }
      
      const employmentId = employmentSnapshot.docs[0].id;
      
      // Mark attendance check-in
      await checkInMutation.mutateAsync({ 
        employeeId: currentUserData?.id || '', 
        employmentId 
      });
      
      toast.success('Check-in successful!');
    } catch (error) {
      console.error('Check-in error:', error);
      toast.error(error instanceof Error ? error.message : 'Check-in failed. Please try again.');
    }
  };

  const handleCheckOut = async () => {
    try {
      // Mark attendance check-out
      await checkOutMutation.mutateAsync(currentUserData?.id || '');
      
      toast.success('Check-out successful!');
    } catch (error) {
      console.error('Check-out error:', error);
      toast.error(error instanceof Error ? error.message : 'Check-out failed. Please try again.');
    }
  };

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

  // Transform attendance data to match expected format with 12-hour time
  const transformedAttendanceRecords: AttendanceRecord[] = attendanceRecords.map((record: any) => ({
    id: record.id,
    date: record.date,
    checkIn: formatTimeTo12Hour(record.checkInTime) || '09:00 AM',
    checkOut: formatTimeTo12Hour(record.checkOutTime) || '06:00 PM',
    status: record.status || 'present',
    totalHours: record.totalHours || 9
  }));

  const isLoading = attendanceLoading || todayLoading;

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
    <EmployeeLayout
      breadcrumbItems={[
        { label: 'Dashboard', href: '/employee-dashboard' },
        { label: 'Attendance', isCurrent: true }
      ]}
    >
      <Toaster position="top-center" />
      
      {/* Attendance Records Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Attendance Records"
          total={transformedAttendanceRecords.length}
          active={transformedAttendanceRecords.filter(record => record.status === 'present').length}
          inactive={transformedAttendanceRecords.filter(record => record.status === 'absent').length}
          searchValue=""
          onSearchChange={() => {}}
          showSearch={false}
          showStats={true}
          backButton={{ href: '/employee-dashboard' }}
          headerClassName="px-6 pt-6 mb-0"
          showAttendanceMarking={true}
          attendanceData={{
            isCheckedIn: todayAttendance.isCheckedIn,
            checkInTime: todayAttendance.checkInTime || '',
            checkOutTime: todayAttendance.checkOutTime || '',
            checkInDate: todayAttendance.isCheckedIn ? new Date().toISOString().split('T')[0] : undefined,
            checkOutDate: todayAttendance.isCheckedOut ? new Date().toISOString().split('T')[0] : undefined,
            employeeName: currentUserData?.name
          }}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          isMarkingAttendance={checkInMutation.isPending || checkOutMutation.isPending}
        />

        <div className="p-6">
          {/* Month Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleMonthChange('prev')}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ←
              </button>
              <h2 className="text-lg font-semibold">
                {getMonthName(currentMonth)} {currentYear}
              </h2>
              <button
                onClick={() => handleMonthChange('next')}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                →
              </button>
            </div>
          </div>

          {/* Attendance Records Table */}
          {transformedAttendanceRecords.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No attendance records found for this month.</p>
            </div>
          ) : (
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
                  {transformedAttendanceRecords.map((record) => (
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
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
} 