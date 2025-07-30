import { useQuery } from '@tanstack/react-query';
import { getEmployees, getEmployments } from '@/utils/firebaseUtils';
import { queryKeys } from '@/lib/queryKeys';

// Dashboard stats type
export interface DashboardStats {
  employeeCount: number;
  employmentCount: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching dashboard statistics
 * Combines employee and employment data with intelligent caching
 */
export const useDashboardStats = (): DashboardStats => {
  // Fetch employees
  const {
    data: employees = [],
    isLoading: employeesLoading,
    isError: employeesError,
    error: employeesErrorData,
    refetch: refetchEmployees
  } = useQuery({
    queryKey: queryKeys.employees.lists(),
    queryFn: getEmployees,
    refetchOnWindowFocus: false, // Don't refetch on window focus for dashboard
  });

  // Fetch employments
  const {
    data: employments = [],
    isLoading: employmentsLoading,
    isError: employmentsError,
    error: employmentsErrorData,
    refetch: refetchEmployments
  } = useQuery({
    queryKey: queryKeys.employments.lists(),
    queryFn: getEmployments,
    refetchOnWindowFocus: false,
  });

  // Combined loading state
  const isLoading = employeesLoading || employmentsLoading;
  
  // Combined error state
  const isError = employeesError || employmentsError;
  const error = employeesErrorData || employmentsErrorData;

  // Combined refetch function
  const refetch = () => {
    refetchEmployees();
    refetchEmployments();
  };

  return {
    employeeCount: employees.length,
    employmentCount: employments.length,
    isLoading,
    isError,
    error,
    refetch,
  };
};

/**
 * Optimized hook for dashboard stats with background refetching
 * Uses the silent query options for better UX
 */
export const useDashboardStatsOptimized = (): DashboardStats => {
  const {
    data: employees = [],
    isLoading: employeesLoading,
    isError: employeesError,
    error: employeesErrorData,
    refetch: refetchEmployees
  } = useQuery({
    queryKey: queryKeys.employees.lists(),
    queryFn: getEmployees,
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Don't refetch on mount if we have cached data
    notifyOnChangeProps: ['data', 'error'], // Silent background updates
  });

  const {
    data: employments = [],
    isLoading: employmentsLoading,
    isError: employmentsError,
    error: employmentsErrorData,
    refetch: refetchEmployments
  } = useQuery({
    queryKey: queryKeys.employments.lists(),
    queryFn: getEmployments,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    notifyOnChangeProps: ['data', 'error'],
  });

  const isLoading = employeesLoading || employmentsLoading;
  const isError = employeesError || employmentsError;
  const error = employeesErrorData || employmentsErrorData;

  const refetch = () => {
    refetchEmployees();
    refetchEmployments();
  };

  return {
    employeeCount: employees.length,
    employmentCount: employments.length,
    isLoading,
    isError,
    error,
    refetch,
  };
}; 