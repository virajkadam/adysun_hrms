'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiDownload, FiPrinter, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { formatDateToDayMonYear } from '@/utils/documentUtils';
import { ActionButton } from '@/components/ui/ActionButton';
import TableHeader from '@/components/ui/TableHeader';
import Pagination from '@/components/ui/Pagination';

interface MonthlyLeaveData {
  month: string;
  year: number;
  totalDays: number;
  approvedDays: number;
  pendingDays: number;
  rejectedDays: number;
  leaveTypes: {
    casual: number;
    sick: number;
    annual: number;
    personal: number;
  };
}

interface LeaveRecord {
  id: string;
  month: string;
  year: number;
  type: 'casual' | 'sick' | 'annual' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  totalDays: number;
  wasEdited?: boolean;
}

// Static data for demonstration
const monthlyData: MonthlyLeaveData[] = [
  {
    month: 'January',
    year: 2024,
    totalDays: 8,
    approvedDays: 6,
    pendingDays: 2,
    rejectedDays: 0,
    leaveTypes: { casual: 3, sick: 2, annual: 3, personal: 0 }
  },
  {
    month: 'February',
    year: 2024,
    totalDays: 5,
    approvedDays: 5,
    pendingDays: 0,
    rejectedDays: 0,
    leaveTypes: { casual: 2, sick: 0, annual: 3, personal: 0 }
  },
  {
    month: 'March',
    year: 2024,
    totalDays: 12,
    approvedDays: 10,
    pendingDays: 1,
    rejectedDays: 1,
    leaveTypes: { casual: 4, sick: 3, annual: 4, personal: 1 }
  },
  {
    month: 'April',
    year: 2024,
    totalDays: 3,
    approvedDays: 3,
    pendingDays: 0,
    rejectedDays: 0,
    leaveTypes: { casual: 1, sick: 1, annual: 1, personal: 0 }
  }
];

const leaveRecords: LeaveRecord[] = [
  {
    id: '1',
    month: 'January',
    year: 2024,
    type: 'casual',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    reason: 'Personal work',
    status: 'approved',
    totalDays: 3
  },
  {
    id: '2',
    month: 'January',
    year: 2024,
    type: 'sick',
    startDate: '2024-01-25',
    endDate: '2024-01-26',
    reason: 'Health issue',
    status: 'approved',
    totalDays: 2
  },
  {
    id: '3',
    month: 'January',
    year: 2024,
    type: 'annual',
    startDate: '2024-01-30',
    endDate: '2024-02-01',
    reason: 'Family vacation',
    status: 'pending',
    totalDays: 3
  },
  {
    id: '4',
    month: 'February',
    year: 2024,
    type: 'casual',
    startDate: '2024-02-10',
    endDate: '2024-02-11',
    reason: 'Personal appointment',
    status: 'approved',
    totalDays: 2
  },
  {
    id: '5',
    month: 'February',
    year: 2024,
    type: 'annual',
    startDate: '2024-02-20',
    endDate: '2024-02-22',
    reason: 'Holiday trip',
    status: 'approved',
    totalDays: 3
  },
  {
    id: '6',
    month: 'March',
    year: 2024,
    type: 'casual',
    startDate: '2024-03-05',
    endDate: '2024-03-08',
    reason: 'Personal work',
    status: 'approved',
    totalDays: 4
  },
  {
    id: '7',
    month: 'March',
    year: 2024,
    type: 'sick',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    reason: 'Medical emergency',
    status: 'approved',
    totalDays: 3
  },
  {
    id: '8',
    month: 'March',
    year: 2024,
    type: 'annual',
    startDate: '2024-03-25',
    endDate: '2024-03-28',
    reason: 'Family function',
    status: 'pending',
    totalDays: 4
  },
  {
    id: '9',
    month: 'March',
    year: 2024,
    type: 'personal',
    startDate: '2024-03-30',
    endDate: '2024-03-30',
    reason: 'Personal emergency',
    status: 'rejected',
    totalDays: 1
  },
  {
    id: '10',
    month: 'April',
    year: 2024,
    type: 'casual',
    startDate: '2024-04-05',
    endDate: '2024-04-05',
    reason: 'Personal work',
    status: 'approved',
    totalDays: 1
  },
  {
    id: '11',
    month: 'April',
    year: 2024,
    type: 'sick',
    startDate: '2024-04-12',
    endDate: '2024-04-12',
    reason: 'Health issue',
    status: 'approved',
    totalDays: 1
  },
  {
    id: '12',
    month: 'April',
    year: 2024,
    type: 'annual',
    startDate: '2024-04-20',
    endDate: '2024-04-20',
    reason: 'Personal day',
    status: 'approved',
    totalDays: 1
  }
];

export default function LeaveReportPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const router = useRouter();
  const { currentUserData } = useAuth();

  // Filter records based on selections
  const filteredRecords = leaveRecords.filter(record => {
    const monthMatch = selectedMonth === 'all' || record.month === selectedMonth;
    const statusMatch = selectedStatus === 'all' || record.status === selectedStatus;
    const typeMatch = selectedType === 'all' || record.type === selectedType;
    return monthMatch && statusMatch && typeMatch;
  });

  // Pagination calculations
  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleBack = () => {
    router.push('/employee/leaves');
  };

  const handleExportPDF = () => {
    toast.success('PDF export started...');
    // PDF export logic would go here
  };

  const handlePrint = () => {
    window.print();
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

  const totalStats = monthlyData.reduce((acc, month) => ({
    totalDays: acc.totalDays + month.totalDays,
    approvedDays: acc.approvedDays + month.approvedDays,
    pendingDays: acc.pendingDays + month.pendingDays,
    rejectedDays: acc.rejectedDays + month.rejectedDays
  }), { totalDays: 0, approvedDays: 0, pendingDays: 0, rejectedDays: 0 });

  return (
    <EmployeeLayout>
      <Toaster position="top-center" />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Leave Reports"
          total={filteredRecords.length}
          active={filteredRecords.filter(record => record.status === 'approved').length}
          inactive={filteredRecords.filter(record => record.status === 'rejected').length}
          searchValue=""
          onSearchChange={() => {}}
          searchPlaceholder="Search reports"
          searchAriaLabel="Search reports"
          onRefresh={() => {}}
          isRefreshing={false}
          showSearch={false}
          showStats={false}
          backButton={{ href: '/employee/leaves' }}
          actionButtons={[
            {
              label: 'Export PDF',
              onClick: handleExportPDF,
              icon: <FiDownload />,
              variant: 'info' as const,
            },
            {
              label: 'Print',
              onClick: handlePrint,
              icon: <FiPrinter />,
              variant: 'secondary' as const,
            }
          ]}
          headerClassName="px-6 pt-6 mb-0"
        />

        <div className="p-6">
          {/* Overall Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Leave Days</p>
                  <p className="text-2xl font-bold text-blue-600">{totalStats.totalDays}</p>
                </div>
                <FiCalendar className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved Days</p>
                  <p className="text-2xl font-bold text-green-600">{totalStats.approvedDays}</p>
                </div>
                <FiCalendar className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Days</p>
                  <p className="text-2xl font-bold text-yellow-600">{totalStats.pendingDays}</p>
                </div>
                <FiCalendar className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected Days</p>
                  <p className="text-2xl font-bold text-red-600">{totalStats.rejectedDays}</p>
                </div>
                <FiCalendar className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Monthly Summary Cards */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {monthlyData.map((month) => (
                <div key={`${month.month}-${month.year}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900">{month.month} {month.year}</h4>
                    <span className="text-sm text-gray-500">{month.totalDays} days</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Approved:</span>
                      <span className="text-green-600 font-medium">{month.approvedDays}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pending:</span>
                      <span className="text-yellow-600 font-medium">{month.pendingDays}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rejected:</span>
                      <span className="text-red-600 font-medium">{month.rejectedDays}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Casual:</span>
                        <span className="font-medium">{month.leaveTypes.casual}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Sick:</span>
                        <span className="font-medium">{month.leaveTypes.sick}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Annual:</span>
                        <span className="font-medium">{month.leaveTypes.annual}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Personal:</span>
                        <span className="font-medium">{month.leaveTypes.personal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <FiFilter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Months</option>
                {monthlyData.map((month) => (
                  <option key={`${month.month}-${month.year}`} value={month.month}>
                    {month.month} {month.year}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Types</option>
                <option value="casual">Casual</option>
                <option value="sick">Sick</option>
                <option value="annual">Annual</option>
                <option value="personal">Personal</option>
              </select>
            </div>
          </div>

          {/* Detailed Leave Records Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
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
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.month} {record.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getLeaveTypeBadge(record.type)}>
                        {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                      </span>
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
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {record.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No leave records found for the selected filters.</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </EmployeeLayout>
  );
}