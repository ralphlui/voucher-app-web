import { CampaignProps } from '@/types/campaign';

export type FeedProps = {
  feedId: string;
  campaign: CampaignProps;
  read: boolean;
};

export type FeedTableCard = {
  feeds: FeedProps[];
  pageNumber: number;
  totalRecord: number;
  size: number;
};
