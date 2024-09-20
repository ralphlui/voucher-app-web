import coreApi from '@/services/core.api';

export const voucherApiSlice = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getVouchersByUserId: builder.query({
      query: ({ userId, page_size = 10, page_number = 0 }) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/core/vouchers/users/${userId}?page=${page_number}&size=${page_size}`,
        method: 'GET',
        params: { userId, page_size, page_number },
      }),
      providesTags: ['Voucher'],
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
    getVouchersByCampaignId: builder.query({
      query: ({ campaignId, page_size = 10, page_number = 0 }) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/core/vouchers/campaigns/${campaignId}?page=${page_number}&size=${page_size}`,
        method: 'GET',
        params: { campaignId, page_size, page_number },
      }),
      providesTags: ['Voucher'],
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
    getVoucherById: builder.query({
      query: (id: string) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/core/vouchers/${id}`,
        method: 'GET',
      }),
    }),
    claimVoucher: builder.mutation({
      query: ({ campaign, claimedBy }) => ({
        url: '/api/core/vouchers/claim',
        method: 'POST',
        body: JSON.stringify({ campaign, claimedBy }),
      }),
    }),
    consumeVoucher: builder.mutation({
      query: (voucherId: string) => ({
        url: `/api/core/vouchers/${voucherId}/consume`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetVouchersByUserIdQuery,
  useGetVoucherByIdQuery,
  useGetVouchersByCampaignIdQuery,
  useClaimVoucherMutation,
  useConsumeVoucherMutation,
} = voucherApiSlice;
