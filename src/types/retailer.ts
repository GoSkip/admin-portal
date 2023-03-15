import { Store } from "./store";

export type Retailer = {
  id: number;
  imageUrl: string;
  name: string;
  features: string[];
  stores: Store[];
};
