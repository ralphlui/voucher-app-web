import { UserTypesEnum } from '@/types/user';

export interface AuthState {
  loading?: boolean;
  user?: any | null;
  token?: string | null;
  success?: boolean;
  error?: string | null;
  role?: UserTypesEnum | null;
  email?: string | null;
}
