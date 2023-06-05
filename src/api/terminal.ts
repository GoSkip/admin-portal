import axios from "axios";

export type FetchTerminalsQueryParams = {
  jwt: string;
  storeId: number;
  page: number;
  limit: number;
};

export type CreateTerminalQueryParams = {
  jwt: string;
  storeId: number;
};

export type CreateTerminalPayloadParams = {
  live: boolean;
  password: string;
};

export const fetchTerminals: any = async ({
  storeId,
  page,
  limit,
  jwt,
}: FetchTerminalsQueryParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.get(
    `${domain}/v1/terminal/list?query=${JSON.stringify({
      store_id: storeId,
      page,
      limit,
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const createTerminal: any = async (
  { jwt, storeId }: CreateTerminalQueryParams,
  payload: CreateTerminalPayloadParams
) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.post(
    `${domain}/v1/terminal?query=${JSON.stringify({
      store_id: storeId,
    })}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};
