import axios from "axios";
import { getOnboarding, postOnboarding } from "./base";

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

export type SendTerminalSignupEmailParams = {
  jwt: string;
  email: string;
  domain: string;
  url: string;
  qr_svg: string;
};

export const fetchTerminals: any = async ({ jwt, storeId, page, limit }: FetchTerminalsQueryParams) => {
  const query = {
    store_id: storeId,
    page,
    limit,
  };

  return await getOnboarding({ jwt, endpoint: "/terminal/list", query });
};

export const createTerminalSignup: any = async ({ jwt, storeId }: CreateTerminalSignupQueryParams) => {
  const query = {
    store_id: storeId,
  };

  return await postOnboarding({ jwt, endpoint: "/terminal/signup", query, payload: {} });
};

export const fetchTerminalSignup: any = async ({ jwt, storeId, terminalSignupId }: FetchTerminalSignupQueryParams) => {
  const query = {
    store_id: storeId,
    terminal_signup_id: terminalSignupId,
  };

  return await getOnboarding({ jwt, endpoint: "/terminal/signup", query });
};

export const sendTerminalSignupEmail: any = async ({
  jwt,
  email,
  domain,
  url,
  qr_svg,
}: SendTerminalSignupEmailParams) => {
  const urlDomain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.post(
    `${urlDomain}/v1/terminal/signup/send_email`,
    {
      email,
      domain,
      url,
      qr_svg,
    },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};
