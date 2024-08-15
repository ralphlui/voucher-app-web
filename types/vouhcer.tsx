import { CampaignProps } from './campaign';
import { SessionUserProps } from './user';

export interface VoucherProps {
  voucherId: string;
  campaign: CampaignProps;
  voucherStatus: string;
  amount: GLfloat;
  claimTime: string;
  consumedTime: string;
  storeName: string;
  validDate: string;
}

export interface VoucherListParamsProps {
  vouchers: VoucherProps[];
  currentSessionUser: SessionUserProps;
  pageNumber: number;
  totalRecord: number;
  size: number;
}
