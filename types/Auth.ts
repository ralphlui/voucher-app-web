import { UserTypesEnum } from '@/types/User';

export interface Auth {
  user?: any | null;
  token?: string | null;
  success?: boolean;
  error?: string | null;
  role?: UserTypesEnum | null;
  email?: string | null;
}
