import { SessionUserProps } from '@/types/user';

export type StoreDetailProps = {
  storeId: string;
  storeName: string;
  description: string;
  address: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  image: string;
  contactNumber: string;
};

export type StoreCard = {
  store: StoreDetailProps;
};

export type UpdateStoreCard = {
  store: StoreDetailProps;
  currentSessionUser: SessionUserProps;
};

export type CountryProps = {
  id: string;
  value: string;
};
export interface CountryFilter {
  setFilter: (setFilter: CountryProps) => void;
  defaultValue: string;
}

export type StoreTableCard = {
  stores: StoreDetailProps[];
  pageNumber: number;
  totalRecord: number;
  size: number;
};
