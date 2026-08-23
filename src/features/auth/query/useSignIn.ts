import { useMutation } from '@tanstack/react-query';
import type { TSignInInput } from '@/entities/auth/schema';
import { signIn } from '@/data/supabase/auth';

export const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: async (input: TSignInInput) => {
      const { data, error } = await signIn(input);
      if (error) {
        throw new Error(error.message ?? 'Ошибка входа');
      }
      return data;
    },
    retry: 0,
  });

  return {
    signIn: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
