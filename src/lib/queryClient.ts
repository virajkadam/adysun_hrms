import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 10 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes in milliseconds
      // Consider data stale after 1 minute
      staleTime: 1 * 60 * 1000, // 1 minute in milliseconds
      // Retry failed requests 3 times
      retry: 3,
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Background fetching - refetch in background when data is stale
      refetchOnMount: true,
      // Silent API calls - don't show loading states for background refetches
      notifyOnChangeProps: ['data', 'error'],
      // Optimistic updates for better UX
      placeholderData: (previousData: any) => previousData,
    },
    mutations: {
      // Retry failed mutations 1 time
      retry: 1,
    },
  },
});

// Helper functions for silent API calls
export const silentQueryOptions = {
  // Silent query options - no loading states, background only
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  notifyOnChangeProps: ['data', 'error'],
  // Don't show loading states
  placeholderData: (previousData: any) => previousData,
};

// Helper functions for background fetching
export const backgroundQueryOptions = {
  // Background fetching - always fetch in background
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: true,
  // Show loading states only for initial load
  notifyOnChangeProps: ['data', 'error'],
  // Keep previous data while fetching
  placeholderData: (previousData: any) => previousData,
};

// Helper functions for optimistic mutations
export const createOptimisticMutationOptions = (queryKey: string[]) => ({
  onMutate: async (variables: any) => {
    // Cancel any outgoing refetches
    await queryClient.cancelQueries({ queryKey });
    
    // Snapshot the previous value
    const previousData = queryClient.getQueryData(queryKey);
    
    // Return context for rollback
    return { previousData, queryKey };
  },
  onError: (err: any, variables: any, context: any) => {
    // Rollback on error
    if (context?.previousData && context?.queryKey) {
      queryClient.setQueryData(context.queryKey, context.previousData);
    }
  },
  onSettled: () => {
    // Always refetch after mutation
    queryClient.invalidateQueries({ queryKey });
  },
}); 