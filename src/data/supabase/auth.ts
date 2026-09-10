import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import type { TSignInInput, TSignUpInput } from '@/entities/auth/schema/auth';
import { supabase } from './client';

export const signIn = async ({ email, password }: TSignInInput) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signUp = async ({ email, password }: Pick<TSignUpInput, 'email' | 'password'>) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) {
  return supabase.auth.onAuthStateChange(callback);
}
