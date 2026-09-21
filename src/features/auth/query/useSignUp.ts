import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/data/supabase/auth';
import type { TSignUpInput } from '../schema/auth';

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
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
