import { StoreDetailProps } from '@/types/store';
import { SessionUserProps } from '@/types/user';

export interface CampaignProps {
  campaignId: string;
  description: string;
  numberOfVouchers: number;
  numberOfLikes: number;
  tagsJson: string;
  tandc: string;
  amount: GLfloat;
  startDate: string;
  endDate: string;
  store: StoreDetailProps;
  campaignStatus: string;
  numberOfClaimedVouchers: number;
  pin: string;
}

export interface CreateCampaignParamsProps {
  stores: StoreDetailProps[];
  currentSessionUser: SessionUserProps;
}

export interface CampaignListParamsProps {
  campaigns: CampaignProps[];
  currentSessionUser: SessionUserProps;
  pageNumber: number;
  totalRecord: number;
  size: number;
  redirectPath: string;
}

export interface MerchantUpdateCampaignProps {
  campaign: CampaignProps;
  stores: StoreDetailProps[];
  currentSessionUser: SessionUserProps;
}

export interface CampaignListByStoreParamsProps {
  campaignsByStore: CampaignProps[];
  currentSessionUser: SessionUserProps;
  storeName: string;
}

export interface CampaignDetailProps {
  campaign: CampaignProps;
  currentSessionUser: SessionUserProps;
}

export interface CampaignDetailPropsByFeed {
  campaignDetail: CampaignProps;
  feedStatus: string;
  userEmail: string;
}
