import axios from "axios";
export type GetFilesProps = {
  jwt: string;
  retailerId: number;
  limit: number;
  page: number;
};

export const fetchFiles = async ({
  jwt,
  limit,
  page,
  retailerId,
}: GetFilesProps) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;
  const query = {
    store_id: retailerId,
    // limit,
    // page,
    product: "sco",
    begin_time: "2023-05-27T21:00:00.000Z",
    end_time: "2023-06-07T21:00:00.000Z",
  };
  const response = await axios.get(
    `${domain}/v1/file/store?query=${JSON.stringify(query)}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};