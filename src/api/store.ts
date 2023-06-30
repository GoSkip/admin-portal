import { getBaseApi } from "./base";
export type GetStoresProps = {
  jwt: string;
  storeIds: number[];
};

export const fetchStores = async ({ jwt, storeIds }: GetStoresProps) => {
  const query = {
    store_id: storeIds,
    product: "sco",
  };

  return await getBaseApi({ jwt, endpoint: "/store", query });
};
