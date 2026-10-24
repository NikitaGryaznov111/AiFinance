import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from '@/shared/lib/toast';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast(error.message);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 5000 * 60,
      retry: 3,
    },
  },
});
