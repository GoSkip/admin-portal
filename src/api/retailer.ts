import axios from "axios";
export type GetRetailersProps = {
  jwt: string;
  storeIds: number[];
  retailerIds: number[];
};

export const getRetailers = async ({ jwt, retailerIds }: GetRetailersProps) => {
  const domain = import.meta.env.VITE_API_DOMAIN;
  const retailerQuery = {
    retailer_id: retailerIds,
    product: "sco",
  };

  console.log("calling")
  return await axios.get(
    `${domain}/v1/store/retailer?query=${JSON.stringify(retailerQuery)}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};
