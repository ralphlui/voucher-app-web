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
