import { Retailer } from "./retailer";

export type Session = {
  retailer_ids: number[];
  store_ids: number[];
  store_names: string[];
  token_info: {
    expiration: string;
    token: string;
  };
};
