import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coreApi = createApi({
  reducerPath: 'core',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_CORE_API_URL,
  }),
  tagTypes: ['Campaign', 'Store', 'Voucher'],
  endpoints: (builder) => ({}),
});

export default coreApi;
