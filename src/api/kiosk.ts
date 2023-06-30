import { getOnboarding, postOnboarding, putOnboarding } from "./base";

export type FetchKiosksByRetailerQueryParams = {
  jwt: string;
  retailerId: number;
  page: number;
  limit: number;
};

export type FetchKioskQueryParams = {
  jwt: string;
  storeId: number;
  kioskId: number;
};

export type CreateKioskQueryParams = {
  jwt: string;
  storeId: number;
};

export type UpdateKioskQueryParams = {
  jwt: string;
  storeId: number;
};

export type UpdateKioskPayloadParams = {
  kiosk_id: number;
  terminal_id?: number;
  kiosk_number?: number;
  kiosk_descriptor?: string;
  mount?: string;
  network?: string;
  pinpad?: string;
  printer?: string;
  ipad_serial?: string;
  printer_serial?: string;
  pinpad_serial?: string;
};

export type CreateKioskPayloadParams = {
  terminal_id?: number;
  kiosk_number?: number;
  kiosk_descriptor?: string;
  mount?: string;
  network?: string;
  pinpad?: string;
  printer?: string;
  ipad_serial?: string;
  pinpad_serial?: string;
  printer_serial?: string;
};

export type CreateKioskParams = {
  queryParams: CreateKioskQueryParams;
  payloadParams: UpdateKioskQueryParams;
};

export type UpdateKioskParams = {
  queryParams: UpdateKioskQueryParams;
  payloadParams: UpdateKioskPayloadParams;
};

export const fetchKiosksByRetailer = async ({ jwt, retailerId, page, limit }: FetchKiosksByRetailerQueryParams) => {
  const query = {
    retailer_id: retailerId,
    page,
    limit,
  };

  return await getOnboarding({ jwt, endpoint: "/kiosk/list_by_retailer", query });
};

export const fetchKiosk = async ({ jwt, storeId, kioskId }: FetchKioskQueryParams) => {
  const query = {
    store_id: storeId,
    kiosk_id: kioskId,
  };

  return await getOnboarding({ jwt, endpoint: "/kiosk/show", query });
};

export const createKiosk = async ({ queryParams, payloadParams }: CreateKioskParams) => {
  const { storeId: store_id, jwt } = queryParams;
  const query = {
    store_id,
  };

  return await postOnboarding({ jwt, endpoint: "/kiosk", query, payload: payloadParams });
};

export const updateKiosk = async ({ queryParams, payloadParams }: UpdateKioskParams) => {
  const { storeId: store_id, jwt } = queryParams;
  const query = {
    store_id,
  };

  return await putOnboarding({ jwt, endpoint: "/kiosk_update", query, payload: payloadParams });
};
