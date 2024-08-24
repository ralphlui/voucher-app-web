import { CampaignProps } from '@/types/Campaign';

export type Feed = {
  feedId: string;
  campaign?: CampaignProps;
  read?: boolean;
};

export type FeedTableCard = {
  feeds: Feed[];
  pageNumber: number;
  totalRecord: number;
  size: number;
};
