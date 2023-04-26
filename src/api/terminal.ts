import axios from "axios";

export type FetchTerminalsQueryParams = {
  jwt: string;
  storeId: number;
  page: number;
  limit: number;
};

export const fetchTerminals: any = async ({
  storeId,
  page,
  limit,
  jwt,
}: FetchTerminalsQueryParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.get(
    `${domain}/v1/terminal/list?query=${JSON.stringify({
      store_id: storeId,
      page,
      limit,
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};
