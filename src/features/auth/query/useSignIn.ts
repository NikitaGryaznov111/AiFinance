import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/features/auth/api/auth';
import type { TSignInInput } from '../types/auth';

export const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: async (input: TSignInInput) => {
      const { error } = await signIn(input);
      if (error) {
        throw new Error(error.message ?? 'Ошибка входа');
      }
    },
    retry: 0,
  });

  return {
    signIn: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
