import { UserTypeEnum } from '@/types/UserTypeEnum';

export interface Auth {
  user?: any | null;
  token?: string | null;
  success?: boolean;
  error?: string | null;
  role?: UserTypeEnum | null;
  email?: string | null;
  message?: string | null;
}
