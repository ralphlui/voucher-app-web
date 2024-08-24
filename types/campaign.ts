import { Store } from '@/types/Store';
import { SessionUserProps } from '@/types/User';

export interface Campaign {
  campaignId: string;
  description?: string;
  numberOfVouchers?: number;
  numberOfLikes?: number;
  tagsJson?: string;
  tandc?: string;
  amount?: GLfloat;
  startDate?: string;
  endDate?: string;
  store?: Store;
  campaignStatus?: string;
  numberOfClaimedVouchers?: number;
  pin?: string;
}

export interface CreateCampaignParamsProps {
  stores: Store[];
  currentSessionUser: SessionUserProps;
}

export interface CampaignListParamsProps {
  campaigns: Campaign[];
  currentSessionUser: SessionUserProps;
  pageNumber: number;
  totalRecord: number;
  size: number;
  redirectPath: string;
}

export interface MerchantUpdateCampaign {
  campaign: Campaign;
  stores: Store[];
  currentSessionUser: SessionUserProps;
}

export interface CampaignListByStoreParamsProps {
  campaignsByStore: Campaign[];
  currentSessionUser: SessionUserProps;
  storeName: string;
}

export interface CampaignDetailProps {
  campaign: Campaign;
  currentSessionUser: SessionUserProps;
}

export interface CampaignDetailPropsByFeed {
  campaignDetail: Campaign;
  feedStatus: string;
  userEmail: string;
}
