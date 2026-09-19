import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { TUser } from '@/entities/auth/types/user';
import { getCurrentUser, onAuthUserChange } from '@/data/supabase/auth';

type TSessionContext = {
  user: TUser | null;
  isLoading: boolean;
};

const SessionContext = createContext<TSessionContext | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => {
        setIsLoading(false);
      });

    const { data } = onAuthUserChange(setUser);
    return () => data.subscription.unsubscribe();
  }, []);

  return <SessionContext.Provider value={{ user, isLoading }}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return value;
};
