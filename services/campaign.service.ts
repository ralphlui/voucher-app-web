import coreApi from '@/services/core.api';
import { Campaign } from '@/types/Campaign';

export const campaignApiSlice = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: ({ description = '', page_size = 10, page_number = 0 }) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/core/campaigns?description=${description}&page=${page_number}&size=${page_size}`,
        method: 'GET',
        params: { description, page_size, page_number },
      }),
      providesTags: ['Campaign'],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getCampaignsByUserId: builder.query({
      query: ({ userId, page_size = 10, page_number = 0 }) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/core/campaigns/users/${userId}?page=${page_number}&size=${page_size}`,
        method: 'GET',
        params: { userId, page_size, page_number },
      }),
      providesTags: ['Campaign'],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getCampaignsByStoreId: builder.query({
      query: ({ storeId, description = '', page_size = 10, page_number = 0 }) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/core/campaigns/stores/${storeId}?description=${description}&page=${page_number}&size=${page_size}`,
        method: 'GET',
        params: { storeId, description, page_size, page_number },
      }),
      providesTags: ['Campaign'],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getCampaignById: builder.query({
      query: (id: string) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/core/campaigns/${id}`,
        method: 'GET', // to be changed to GET
      }),
    }),
    createCampaign: builder.mutation({
      query: (campaign: Campaign) => ({
        url: `/api/core/campaigns`,
        method: 'POST',
        body: campaign,
      }),
      invalidatesTags: ['Campaign'],
    }),
    updateCampaign: builder.mutation({
      query: (campaign: Campaign) => ({
        url: `/api/core/campaigns/${campaign.campaignId}`,
        method: 'PUT',
        body: campaign,
      }),
      invalidatesTags: ['Campaign'],
    }),
  }),
});

export const {
  useGetCampaignsByUserIdQuery,
  useGetCampaignByIdQuery,
  useGetCampaignsQuery,
  useGetCampaignsByStoreIdQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
} = campaignApiSlice;
