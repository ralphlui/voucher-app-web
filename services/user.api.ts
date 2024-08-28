import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_USER_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});

export default userApi;
