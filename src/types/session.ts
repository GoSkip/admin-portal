import { Retailer, emptyRetailer } from "./retailer";
import { Store, emptyStore } from "./store";

export type Session = {
  active_retailer: Retailer;
  active_store: Store;
  selectable_stores: Store[];
  retailer_ids: number[];
  store_ids: number[];
  store_names: string[];
  permissions: string[];
  rememberMe: boolean;
  token_info: {
    expiration: string;
    token: string;
  };
};

export const emptySession: Session = {
  active_retailer: emptyRetailer,
  active_store: emptyStore,
  selectable_stores: [],
  retailer_ids: [],
  store_ids: [],
  store_names: [],
  permissions: [],
  rememberMe: false,
  token_info: {
    expiration: "",
    token: "",
  },
};
