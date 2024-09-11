import coreApi from '@/services/core.api';

export const campaignApiSlice = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: ({ page_size = 5, page_number = 0 }) => ({
        url: `/api/campaign/all/active?page=${page_number}&size=${page_size}`,
        method: 'GET',
        params: { page_size, page_number },
      }),
      providesTags: ['Campaign'],
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
    getCampaignByEmail: builder.query({
      query: ({ email, page_size = 5, page_number = 0 }) => ({
        url: `/api/campaign/getAllByEmail?page=${page_number}&size=${page_size}`,
        method: 'POST', // to be changed to 'GET',
        params: { page_size, page_number },
        body: JSON.stringify({ email }),
      }),
      providesTags: ['Campaign'],
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
    getCampaignById: builder.query({
      query: ({ campaignId }) => ({
        url: `/api/campaign/getById`,
        method: 'POST', // to be changed to GET
        body: JSON.stringify({ campaignId }),
      }),
    }),
    createCampaign: builder.mutation({
      query: (formData) => ({
        url: `/api/campaign/create`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Campaign'],
    }),
    updateCampaign: builder.mutation({
      query: (formData) => ({
        url: `/api/campaign/update`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Campaign'],
    }),
  }),
});

export const {
  useGetCampaignByEmailQuery,
  useGetCampaignByIdQuery,
  useGetCampaignsQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
} = campaignApiSlice;

// ---- ---- ---- ---- ----legacy---- ---- ---- ---- ---- ----

//For MERCHANT
export const fetchCampaignsByMerchant = async (useremail: string, page?: number, size?: number) => {
  const requestBody = {
    email: useremail,
  };

  let url = '';
  if (page !== undefined) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/getAllByEmail?page=${page}&size=${size}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/getAllByEmail`;
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

export const createCampaign = async (
  description: string,
  startDate: string,
  endDate: string,
  tandc: string,
  numberOfLikes: number,
  tagsJson: string,
  numberOfVouchers: number,
  amount: number,
  store: { storeId: string },
  createdBy: { email: string }
) => {
  const requestBody = {
    description,
    startDate,
    endDate,
    numberOfVouchers,
    numberOfLikes,
    tagsJson,
    amount,
    tandc,
    store,
    createdBy,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  return data;
};

export const updateCampaign = async (
  campaignId: string,
  description: string,
  startDate: string,
  endDate: string,
  tandc: string,
  numberOfLikes: number,
  tagsJson: string,
  numberOfVouchers: number,
  amount: number,
  store: { storeId: string },
  updatedBy: { email: string }
) => {
  const requestBody = {
    campaignId,
    description,
    startDate,
    endDate,
    numberOfVouchers,
    numberOfLikes,
    tagsJson,
    amount,
    tandc,
    store,
    updatedBy,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  return data;
};

export const promoteCampaignByMerchant = async (
  campaignId: string,
  updatedBy: { email: string }
) => {
  const body = {
    campaignId,
    updatedBy,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/promote`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
};

export const getMerchantCampaignsByStoreId = async (storeId: string) => {
  const requestBody = {
    storeId,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/getAllByStoreId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  return data;
};

// *********** END of MERCHANT ***************** //

// For Customer
export const fetchCampaignsByCustomer = async (page?: number, size?: number) => {
  let url = '';
  if (page !== undefined) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/all/active?page=${page}&size=${size}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/all/active`;
  }
  const res = await fetch(`${url}`);

  const data = await res.json();
  return data;
};

export const getCustomerCampaignsByStoreId = async (storeId: string) => {
  const requestBody = {
    storeId,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/getAllByStoreId?status=PROMOTED`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }
  );

  const data = await res.json();
  return data;
};

export const fetchCampaignByID = async (campaignId: string) => {
  const requestBody = {
    campaignId,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaign/getById`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  return data;
};
