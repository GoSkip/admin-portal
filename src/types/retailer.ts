import { Store } from "./store";

export type Retailer = {
  id: number;
  image_url: string;
  name: string;
  features: string[];
  stores: Store[];
};

export const emptyRetailer: Retailer = {
  id: 0,
  image_url: "",
  name: "",
  features: [],
  stores: [],
};
