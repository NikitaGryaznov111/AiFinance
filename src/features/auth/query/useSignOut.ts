import { useMutation } from '@tanstack/react-query';
import { signOut } from '@/data/supabase/auth';

export const useSignOut = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await signOut();
      if (error) {
        throw new Error(error.message ?? 'Не удалось выйти');
      }
    },
    retry: 0,
  });

  return {
    signOut: mutation.mutate,
    isPending: mutation.isPending,
  };
};
