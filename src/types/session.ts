export type Session = {
  retailer_ids: number[];
  store_ids: number[];
  store_names: string[];
  token_info: {
    expiration: string;
    token: string;
  };
};

export const emptySession = {
  retailer_ids: [],
  store_ids: [],
  store_names: [],
  token_info: {
    expiration: "",
    token: "",
  },
};
