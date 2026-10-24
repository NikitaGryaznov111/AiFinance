import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/data/supabase/client';
import type { TUser } from '@/features/auth/types/auth';

function toUser(session: Session | null): TUser | null {
  if (!session?.user) {
    return null;
  }

  const displayName = session.user.user_metadata.displayName;

  return {
    id: session.user.id,
    email: session.user.email ?? null,
    displayName: typeof displayName === 'string' ? displayName : null,
  };
}

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signUp = async ({
  displayName,
  email,
  password,
}: {
  displayName: string;
  email: string;
  password: string;
}) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { displayName },
    },
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async (): Promise<TUser | null> => {
  const { data } = await supabase.auth.getSession();
  return toUser(data.session);
};

export function onAuthUserChange(callback: (user: TUser | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(toUser(session));
  });
  return () => {
    data.subscription.unsubscribe();
  };
}
