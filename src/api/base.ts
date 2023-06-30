import axios from "axios";

type GetParams = {
  domain: string;
  baseEndpoint: string;
};

type InternalGetParams = {
  endpoint: string;
  jwt: string;
  query: object;
};

type PostParams = {
  domain: string;
  baseEndpoint: string;
};

type InternalPostParams = {
  endpoint: string;
  jwt: string;
  query: object;
  payload: object;
};

type PutParams = {
  domain: string;
  baseEndpoint: string;
};

type InternalPutParams = {
  endpoint: string;
  jwt: string;
  query: object;
  payload: object;
};

function get({ domain, baseEndpoint }: GetParams) {
  return function _get({ endpoint, jwt, query }: InternalGetParams) {
    return axios.get(`${domain}${baseEndpoint}${endpoint}?query=${JSON.stringify(query)}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    });
  };
}

function post({ domain, baseEndpoint }: PostParams) {
  return function _post({ endpoint, jwt, query, payload }: InternalPostParams) {
    return axios.post(`${domain}${baseEndpoint}${endpoint}?query=${JSON.stringify(query)}`, payload, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    });
  };
}

function put({ domain, baseEndpoint }: PutParams) {
  return function _put({ endpoint, jwt, query, payload }: InternalPutParams) {
    return axios.put(`${domain}${baseEndpoint}${endpoint}?query=${JSON.stringify(query)}`, payload, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    });
  };
}

export const getBaseApi = get({ domain: import.meta.env.VITE_API_DOMAIN, baseEndpoint: "/v1" });

export const getOnboarding = get({ domain: import.meta.env.VITE_ONBOARDING_DOMAIN, baseEndpoint: "/v1" });

export const postOnboarding = post({ domain: import.meta.env.VITE_ONBOARDING_DOMAIN, baseEndpoint: "/v1" });

export const putOnboarding = put({ domain: import.meta.env.VITE_ONBOARDING_DOMAIN, baseEndpoint: "/v1" });
