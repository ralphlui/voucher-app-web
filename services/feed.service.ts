import apiSlice from '@/services/api';

export const feedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedByEmail: builder.query({
      query: ({ email, page_size = 5, page_number = 0 }) => ({
        url: `/api/feed/getAllByEmail?page=${page_number}&size=${page_size}`,
        method: 'POST', // to be changed to 'GET',
        params: { page_size, page_number },
        body: JSON.stringify({ email }),
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
  }),
});

export const { useGetFeedByEmailQuery } = feedApiSlice;

// ---- ---- ---- ---- ----legacy---- ---- ---- ---- ---- ----

export const fetchAllActiveFeedListByCustomer = async (
  email: string,
  page?: number,
  size?: number
) => {
  const requestBody = {
    email,
  };

  let url = '';
  if (page !== undefined) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feed/getAllByEmail?page=${page}&size=${size}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feed/getAllByEmail`;
  }
  const res = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  return data;
};
