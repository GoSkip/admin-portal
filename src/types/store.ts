export type Store = {
  id: number;
  dayClose: string;
  name: string;
  timezone: string;
  posSiteId?: string;
  address?: string;
  address2?: string;
  phone?: string;
};

export const emptyStore = {
  id: 0,
  dayClose: "",
  name: "",
  timezone: "",
};
