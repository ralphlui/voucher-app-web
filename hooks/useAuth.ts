import { useSelector } from 'react-redux';

import { AuthState } from '@/types/AuthState';

export default function useAuth(): AuthState {
  const auth: AuthState = useSelector((state: any) => state.auth);
  console.log(auth);
  return auth;
}
