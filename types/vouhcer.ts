import { CampaignProps } from '@/types/Campaign';
import { SessionUserProps } from '@/types/User';

export interface Voucher {
  voucherId: string;
  campaign?: CampaignProps;
  voucherStatus?: string;
  amount?: GLfloat;
  claimTime?: string;
  consumedTime?: string;
  storeName?: string;
  validDate?: string;
}

export interface VoucherListParamsProps {
  vouchers: Voucher[];
  currentSessionUser: SessionUserProps;
  pageNumber: number;
  totalRecord: number;
  size: number;
}
