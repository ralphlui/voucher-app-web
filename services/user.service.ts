import apiSlice from '@/services/api';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ body }) => ({
        url: '/api/user/login',
        method: 'POST',
        body,
      }),
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: '/api/auth/user',
        method: 'GET',
      }),
    }),

    createUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
    }),

    getUsers: builder.query({
      query: ({ page }) => ({
        url: `/api/user?page=${page}`,
        method: 'GET',
      }),
    }),

    editUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/user',
        method: 'PATCH',
        body,
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/user/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} = userApi;
