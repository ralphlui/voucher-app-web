import { Campaign } from '@/types/Campaign';
import { SessionUserProps } from '@/types/User';

export interface Voucher {
  voucherId: string;
  campaign?: Campaign;
  voucherStatus?: string;
  amount?: GLfloat;
  claimTime?: string;
  consumedTime?: string;
}

export interface VoucherListParamsProps {
  vouchers: Voucher[];
  currentSessionUser: SessionUserProps;
  pageNumber: number;
  totalRecord: number;
  size: number;
}
