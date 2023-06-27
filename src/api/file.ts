import axios from "axios";
export type GetStoreFilesProps = {
  jwt: string;
  storeId: number;
  limit: number;
  page: number;
};
export type GetRetailerFilesProps = {
  jwt: string;
  retailerId: number;
  limit: number;
  page: number;
};

export type GetRetailerFileProp = {
  jwt: string;
  retailerId: number;
  fileId: number;
};

export const fetchStoreFiles = async ({ jwt, limit, page, storeId }: GetStoreFilesProps) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;
  const query = {
    store_id: storeId,
    product: "sco",
    begin_time: "2023-06-01T21:00:00.000Z",
    end_time: "2023-06-30T21:00:00.000Z",
  };
  const response = await axios.get(`${domain}/v1/file/store?query=${JSON.stringify(query)}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};

export const fetchRetailerFiles = async ({ jwt, limit, page, retailerId }: GetRetailerFilesProps) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;
  const query = {
    retailer_id: retailerId,
    product: "sco",
    begin_time: "2023-06-01T21:00:00.000Z",
    end_time: "2023-06-30T21:00:00.000Z",
  };
  const response = await axios.get(`${domain}/v1/file/retailer?query=${JSON.stringify(query)}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};

export const fetchFile = async ({ jwt, retailerId, fileId }: GetRetailerFileProp) => {
  // TODO: Find the correct endpoint to fetch a single file
  const domain = import.meta.env.VITE_INTERATIONS_DOMAIN;
  const query = {
    fileIds: [fileId],
  };
  const response = await axios.get(`${domain}/v2/backoffice/files/status?query=${JSON.stringify(query)}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};
