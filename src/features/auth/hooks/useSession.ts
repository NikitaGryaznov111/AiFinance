import { useContext } from 'react';
import { SessionContext } from '../providers/SessionProvider';

export const useSession = () => {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return value;
};
