import { getBaseApi } from "./base";

export type GetRetailersProps = {
  jwt: string;
  storeIds: number[];
  retailerIds: number[];
};

export const getRetailers = async ({ jwt, retailerIds }: GetRetailersProps) => {
  const query = {
    retailer_id: retailerIds,
    product: "sco",
  };

  return await getBaseApi({ jwt, endpoint: "/store/retailer", query });
};
