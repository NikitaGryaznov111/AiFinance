import { getCategories } from '@/features/operations/api/category';
import { useQuery } from '@tanstack/react-query';

export const useCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return { data, isLoading };
};
