import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  tagTypes: ['Campaign', 'Feed', 'Store', 'User', 'Voucher'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
