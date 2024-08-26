import apiSlice from '@/services/api';

export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreByEmail: builder.query({
      query: ({ email, page_size = 5, page_number = 1 }) => ({
        url: `/api/store/getAllByUser?page=${page_number}&size=${page_size}`,
        method: 'POST', // to be changed to 'GET',
        params: { page_size, page_number },
        body: JSON.stringify({ email }),
      }),
      providesTags: ['Store'],
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

export const { useGetStoreByEmailQuery } = storeApiSlice;

// ---- ---- ---- ---- ----legacy---- ---- ---- ---- ---- ----

// import { getCurrentUserEmail } from '@/utils';

export const fetchStoreListByMerchant = async (useremail: string, page?: number, size?: number) => {
  let body = {};
  const email = ''; //await getCurrentUserEmail(useremail);
  if (email) {
    body = {
      email,
    };
  } else throw new Error('Undefined email');

  const headers = {
    'Content-Type': 'application/json',
  };

  let url = '';
  if (page !== undefined) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/getAllByUser?page=${page}&size=${size}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/getAllByUser`;
  }

  const res = await fetch(`${url}`, {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export async function createStoreByMerchant(
  storeName: string,
  description: string,
  address1: string,
  address2: string,
  postalCode: string,
  country: string,
  contactNumber: string,
  image?: File,
  createdBy?: { email: string }
) {
  const formData = new FormData();
  const blob = new Blob(
    [
      JSON.stringify({
        storeName,
        description,
        address1,
        address2,
        postalCode,
        contactNumber,
        country,
        createdBy,
      }),
    ],
    {
      type: 'application/json',
    }
  );

  formData.append('store', blob);
  if (image != null) {
    formData.append('image', image);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/create`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch {
    return { success: false, message: 'Fetch data failed to create store.' };
  }
}

export async function updateStoreByMerchant(
  storeId: string,
  storeName: string,
  description: string,
  address1: string,
  address2: string,
  postalCode: string,
  country: string,
  contactNumber: string,
  image?: File,
  updatedBy?: { email: string }
) {
  const formData = new FormData();
  const deleted = false;
  const blob = new Blob(
    [
      JSON.stringify({
        storeId,
        storeName,
        description,
        address1,
        address2,
        postalCode,
        contactNumber,
        country,
        updatedBy,
        deleted,
      }),
    ],
    {
      type: 'application/json',
    }
  );

  formData.append('store', blob);
  if (image != null) {
    formData.append('image', image);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/update`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  return result;
}

//For Customer
export const fetchAllActiveStore = async (page?: number, size?: number) => {
  let url = '';
  if (page !== undefined) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/getAll?page=${page}&size=${size}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/getAll`;
  }

  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error('Failed to fetch all active store data from the API');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch data from the API');
  }
};
