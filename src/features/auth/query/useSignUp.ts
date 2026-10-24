import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/features/auth/api/auth';
import type { TSignUpInput } from '../types/auth';

export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: async (input: TSignUpInput) => {
      const { data, error: signUpError } = await signUp(input);
      if (signUpError) {
        throw new Error(signUpError.message ?? 'Ошибка регистрации');
      }
      return data;
    },
    retry: 0,
  });

  return {
    signUp: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    needsEmailConfirm: mutation.data?.session === null,
  };
};
