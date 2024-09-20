import feedApi from '@/services/feed.api';

export const feedApiSlice = feedApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedByUserId: builder.query({
      query: ({ userId, page_size = 5, page_number = 0 }) => ({
        url: `/api/feeds/users/${userId}?page=${page_number}&size=${page_size}`,
        method: 'GET',
        params: { userId, page_size, page_number },
      }),
      providesTags: ['Feed'],
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
    getFeedById: builder.query({
      query: (id: string) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/feeds/${id}`,
        method: 'GET',
      }),
    }),
    updateReadStatus: builder.mutation({
      query: (id: string) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/feeds/${id}/readStatus`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useGetFeedByUserIdQuery, useGetFeedByIdQuery, useUpdateReadStatusMutation } =
  feedApiSlice;
