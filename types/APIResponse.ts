import { UserTypesEnum } from '@/types/user';

export interface APIResponse<T> {
  success?: boolean;
  message?: string;
  totalRecord?: number;
  data?: T;
}

export interface ResultItem {
  email?: string;
  username?: string;
  role?: UserTypesEnum;
  image?: string;
}

export interface UserResponse {
  message?: string;
  result?: ResultItem[];
}
