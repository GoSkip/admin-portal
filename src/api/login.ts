import axios from "axios";
export type LoginProps = {
  username: string;
  password: string;
};

export const login = async ({
  username,
  password,
}: LoginProps): Promise<any> => {
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
