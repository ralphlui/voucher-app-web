export enum UserTypesEnum {
  ADMIN = 'ADMIN',
  MERCHANT = 'MERCHANT',
  CUSTOMER = 'CUSTOMER',
}

export interface UserRegistrationResponseProps {
  message: string;
  result: [User];
}

export interface User {
  id: number;
  email: string;
  role: string;
  type: UserTypesEnum;
}

export type UserTypeProps = {
  id: number;
  type: UserTypesEnum;
};

export interface UserFilterType {
  setFilter: (setFilter: UserTypeProps) => void;
}

export interface SessionUserProps {
  email: string;
  name: string;
  role: string;
}
