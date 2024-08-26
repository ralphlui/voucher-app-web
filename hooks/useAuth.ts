import { useSelector } from 'react-redux';

import { Auth } from '@/types/Auth';

export default function useAuth(): Auth {
  const auth: Auth = useSelector((state: any) => state.user);
  // console.log(auth);
  return auth;
}
