import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const feedApi = createApi({
  reducerPath: 'feed',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_FEED_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  tagTypes: ['Feed'],
  endpoints: (builder) => ({}),
});

export default feedApi;
