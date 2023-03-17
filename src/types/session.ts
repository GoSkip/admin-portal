import { Retailer, emptyRetailer } from "./retailer";
export type Session = {
  active_retailer: Retailer;
  retailer_ids: number[];
  store_ids: number[];
  store_names: string[];
  token_info: {
    expiration: string;
    token: string;
  };
};

export const emptySession: Session = {
  active_retailer: emptyRetailer,
  retailer_ids: [],
  store_ids: [],
  store_names: [],
  token_info: {
    expiration: "",
    token: "",
  },
};
