import axios from "axios";
export type GetStoresProps = {
  jwt: string;
  storeIds: number[];
};

export const getStores = async ({ jwt, storeIds }: GetStoresProps) => {
  const domain = import.meta.env.VITE_API_DOMAIN;
  const query = {
    store_id: storeIds,
    product: "sco",
  };

  return await axios.get(
    `${domain}/v1/store?query=${JSON.stringify(query)}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};
