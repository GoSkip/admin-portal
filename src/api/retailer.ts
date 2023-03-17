import axios from "axios";
import { getStores } from "./store";
import { Store } from "../types/store";
export type GetRetailersProps = {
  jwt: string;
  storeIds: number[];
  retailerIds: number[];
};

type ApiStore = {
  id: number;
  day_close: string;
  name: string;
  timezone: string;
};

export const getRetailers = async ({
  jwt,
  storeIds,
  retailerIds,
}: GetRetailersProps) => {
  const domain = import.meta.env.VITE_API_DOMAIN;
  const retailerQuery = {
    retailer_id: retailerIds,
    product: "sco",
  };

  const retailers = await axios.get(
    `${domain}/v1/store/retailer?query=${JSON.stringify(retailerQuery)}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  
  const stores = await getStores({ jwt, storeIds });
  
  console.log(retailers, stores);
  return stores;
};
