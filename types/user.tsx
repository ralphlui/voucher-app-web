export enum UserTypesEnum {
  'ADMIN',
  'MERCHANT',
  'CUSTOMER',
}

export interface UserRegistrationResponseProps {
  message: string;
  result: [UserInfoProps];
}

export interface UserInfoProps {
  email: string;
  role: string;
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
