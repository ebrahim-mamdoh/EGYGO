'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }) {
  // Create a new QueryClient instance
  // We use useState to ensure the client is created only once per component mount
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Time in milliseconds after which data is considered stale
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Time in milliseconds after which inactive queries are garbage collected
            gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in v4)
            // Retry failed requests
            retry: 3,
            // Retry delay
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch on window focus
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: 'always',
          },
          mutations: {
            // Retry failed mutations
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}