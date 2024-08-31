import { Campaign } from '@/types/Campaign';

export type Feed = {
  feedId: string;
  campaign?: Campaign;
  read?: boolean;
};

export type FeedTableCard = {
  feeds: Feed[];
  pageNumber: number;
  totalRecord: number;
  size: number;
};
