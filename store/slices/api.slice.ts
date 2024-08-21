import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '@/store';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user.token;
      if (token) headers.set('authorization', token);
      return headers;
    },
  }),
  tagTypes: ['User', 'Campaign', 'Store', 'Voucher'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
