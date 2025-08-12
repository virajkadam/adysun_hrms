'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiPlus, FiClock, FiCheck, FiX, FiEdit, FiEye } from 'react-icons/fi';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { getEmployeeLeaves, updateEmployeeLeaveEndDate } from '@/utils/firebaseUtils';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import { ActionButton } from '@/components/ui/ActionButton';
import TableHeader from '@/components/ui/TableHeader';

interface LeaveRecord {
  id: string;
  type: 'casual' | 'sick' | 'annual' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  totalDays: number;
  employmentId?: string;
  employeeId?: string;
  wasEdited?: boolean;
}

interface RawLeaveRecord {
  id: string;
  type?: LeaveRecord['type'];
  startDate: string;
  endDate: string;
  reason?: string;
  status?: LeaveRecord['status'];
  appliedDate: string;
  totalDays?: number;
  employmentId?: string;
  employeeId?: string;
  wasEdited?: boolean;
}

export default function EmployeeLeavesPage() {
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRecord | null>(null);
  const [newEndDate, setNewEndDate] = useState<string>('');
  
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
        console.log('📊 Number of leave records:', leaveData.length);
        
        // Transform the data to match the expected format
        const transformedData: LeaveRecord[] = (leaveData as RawLeaveRecord[]).map((record) => {
          console.log('🔄 Processing leave record:', record);
          
          const transformed: LeaveRecord = {
            id: record.id,
            type: (record.type as LeaveRecord['type']) || 'casual',
            startDate: record.startDate,
            endDate: record.endDate,
            reason: record.reason || 'Personal leave',
            status: (record.status as LeaveRecord['status']) || 'pending',
            appliedDate: record.appliedDate,
            totalDays: record.totalDays || 1,
            employmentId: record.employmentId,
            employeeId: record.employeeId,
            wasEdited: record.wasEdited || false,
          };
          
          console.log('✅ Transformed leave record:', transformed);
          return transformed;
        });
        
        console.log('📋 Final transformed leave records:', transformedData);
        console.log('📋 Number of transformed records:', transformedData.length);
        setLeaveRecords(transformedData);
      } catch (error: unknown) {
        console.error('Error fetching leave data:', error);
        toast.error('Failed to load leave data');
        setLeaveRecords([]); // Set empty array instead of mock data
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveData();
  }, [currentUserData, router]);

  const handleRequestLeave = () => {
    router.push('/employee/leaves/request');
  };

  // Handle refresh with toast feedback
  const handleRefresh = async () => {
    try {
      // Refetch leave data
      const leaveData = await getEmployeeLeaves(currentUserData?.id || '');
      const transformedData: LeaveRecord[] = (leaveData as RawLeaveRecord[]).map((record) => ({
        id: record.id,
        type: (record.type as LeaveRecord['type']) || 'casual',
        startDate: record.startDate,
        endDate: record.endDate,
        reason: record.reason || 'Personal leave',
        status: (record.status as LeaveRecord['status']) || 'pending',
        appliedDate: record.appliedDate,
        totalDays: record.totalDays || 1,
        employmentId: record.employmentId,
        employeeId: record.employeeId,
        wasEdited: record.wasEdited || false,
      }));
      setLeaveRecords(transformedData);
      toast.success('Leave data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing leave data:', error);
      toast.error('Failed to refresh leave data');
    }
  };

  const openEditModal = (leave: LeaveRecord) => {
    setSelectedLeave(leave);
    setNewEndDate(leave.endDate);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedLeave(null);
    setNewEndDate('');
  };

  const handleUpdateEndDate = async () => {
    if (!selectedLeave || !currentUserData) return;
    try {
      // Basic validation: new end date should be >= start date
      if (new Date(newEndDate) < new Date(selectedLeave.startDate)) {
        toast.error('End date cannot be before start date');
        return;
      }

      if (!selectedLeave.employmentId) {
        toast.error('Employment context missing for this leave');
        return;
      }

      const updated = await updateEmployeeLeaveEndDate(
        selectedLeave.employmentId,
        selectedLeave.id,
        currentUserData.id,
        newEndDate
      );

      // Update local state
      setLeaveRecords((prev) =>
        prev.map((rec) =>
          rec.id === selectedLeave.id
            ? {
                ...rec,
                endDate: updated.endDate,
                totalDays: updated.totalDays,
                wasEdited: true,
              }
            : rec
        )
      );

      toast.success('Leave updated');
      closeEditModal();
    } catch (e) {
      toast.error('Failed to update leave');
      console.error(e);
    }
  };

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
        <TableHeader
          title="My Leaves"
          total={leaveRecords.length}
          active={leaveRecords.filter(record => record.status === 'approved').length}
          inactive={leaveRecords.filter(record => record.status === 'rejected').length}
          searchValue=""
          onSearchChange={() => {}}
          searchPlaceholder="Search leaves"
          searchAriaLabel="Search leaves"
          onRefresh={handleRefresh}
          isRefreshing={false}
          showSearch={false}
          showStats={false}
          backButton={{ href: '/employee-dashboard' }}
          actionButtons={[
            {
              label: 'Request Leave',
              onClick: handleRequestLeave,
              icon: <FiPlus />,
              variant: 'success' as const,
            }
          ]}
          headerClassName="px-6 pt-6 mb-0"
        />

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
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
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
                      <div className="flex items-center gap-2">
                        <span>{formatDateToDayMonYear(record.endDate)}</span>
                        {record.wasEdited && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                            Edited
                          </span>
                        )}
                      </div>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-3">
                        <ActionButton
                          icon={<FiEye className="w-5 h-5" />}
                          title="View"
                          colorClass="bg-blue-100 text-blue-600 hover:text-blue-900"
                          href={`/employee/leaves/${record.id}`}
                        />
                        <ActionButton
                          icon={<FiEdit className="w-5 h-5" />}
                          title="Edit"
                          colorClass="bg-amber-100 text-amber-600 hover:text-amber-900"
                          onClick={() => openEditModal(record)}
                        />
                      </div>
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

      {/* Edit End Date Modal */}
      {editModalOpen && selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Leave End Date</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" value={selectedLeave.startDate} disabled className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={newEndDate}
                  min={selectedLeave.startDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeEditModal} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleUpdateEndDate} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Update</button>
            </div>
          </div>
        </div>
      )}
    </EmployeeLayout>
  );
} 