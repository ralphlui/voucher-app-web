import { AuthState } from '@/types/AuthState';
import { useSelector } from 'react-redux';

export default function useAuth(): AuthState {
  const auth: AuthState = useSelector((state: any) => state.auth);
  console.log(auth);
  return auth;
}
