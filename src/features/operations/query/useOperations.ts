import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from '@/shared/lib/toast';
import { createOperation, getOperations } from '../api/operation';
import { TOperationCreate } from '../types/operation';
import { queryClient } from '@/data/query/client';

export const useCreateOperation = () => {
  const mutation = useMutation({
    mutationFn: async (operation: TOperationCreate) => {
      await createOperation(operation);
    },
    onSuccess: () => {
      toast('Операция создана');
      queryClient.invalidateQueries({ queryKey: ['operations'] });
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  return {
    createOperation: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};

export const useGetOperations = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['operations'],
    queryFn: getOperations,
  });

  return {
    data,
    isLoading,
  };
};
