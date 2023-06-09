import axios from "axios";

export type FetchTerminalsQueryParams = {
  jwt: string;
  storeId: number;
  page: number;
  limit: number;
};

export type CreateTerminalSignupQueryParams = {
  jwt: string;
  storeId: number;
};

export type FetchTerminalSignupQueryParams = {
  jwt: string;
  storeId: number;
  terminalSignupId: number;
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

export const createTerminalSignup: any = async ({
  jwt,
  storeId,
}: CreateTerminalSignupQueryParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.post(
    `${domain}/v1/terminal/signup?query=${JSON.stringify({
      store_id: storeId,
    })}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const fetchTerminalSignup: any = async ({
  jwt,
  storeId,
  terminalSignupId,
}: FetchTerminalSignupQueryParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.get(
    `${domain}/v1/terminal/signup?query=${JSON.stringify({
      store_id: storeId,
      terminal_signup_id: terminalSignupId,
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};
