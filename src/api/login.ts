import axios from "axios";
export type LoginProps = {
  username: string;
  password: string;
  mocked?: boolean;
};

export const login = async ({ username, password, mocked }: LoginProps): Promise<any> => {
  if (mocked) {
    /*
      The `mocked` property is added as a workaround to bypass login.
      You can use it in case if API server is down or your internet is off.
    */
    return new Promise(resolve => {
      resolve({
        data: {
          selectable_stores: [],
          retailer_ids: [],
          store_ids: [],
          store_names: [],
          permissions: [],
          token_info: {
            expiration: "",
            token: "",
          },
          lang: "en",
        },
      });
    });
  }

  const domain = import.meta.env.VITE_LOGIN_DOMAIN;

  return axios.post(
    `${domain}/v1/login/app`,
    {
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
