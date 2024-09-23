import userApi from '@/services/user.api';

export const userApiSlice = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ body }) => ({
        url: '/api/users/login',
        method: 'POST',
        body,
      }),
    }),

    verifyUser: builder.mutation({
      query: ({ verifyid }) => ({
        url: `/api/users/verify/${verifyid}`,
        method: 'PATCH',
      }),
    }),

    createUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/users',
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
        url: '/api/users',
        method: 'PUT',
        body,
      }),
    }),

    // deleteUser: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/api/user/${id}`,
    //     method: 'DELETE',
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  // useGetUserInfoQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  // useDeleteUserMutation,
  useEditUserMutation,
  useVerifyUserMutation,
} = userApiSlice;

// ---- ---- ---- ---- ----legacy---- ---- ---- ---- ---- ----

export async function registerUser(
  email: string,
  username: string,
  password: string,
  role: string,
  image?: File
) {
  const formData = new FormData();
  const blob = new Blob(
    [
      JSON.stringify({
        email,
        username,
        password,
        role,
      }),
    ],
    {
      type: 'application/json',
    }
  );

  formData.append('user', blob);
  if (image != null) {
    formData.append('image', image);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/create`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result;
  } catch {
    return { message: 'Fetch data failed', result: [] };
  }
}

export async function forgotPassword(email: string, password: string) {
  const body = {
    email,
    password,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/resetPassword`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result;
}

export async function loginUser(email: string, password: string) {
  const body = {
    email,
    password,
  };

  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result;
}

export const verifyUser = async (verifyId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/verify?verifyid=${verifyId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();
  return data;
};
