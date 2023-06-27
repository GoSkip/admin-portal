import axios from "axios";

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

export type FetchKioskIpadQueryParams = {
  jwt: string;
  serialNumber: string;
  appIdentifier: string;
};

export type FetchKioskIpadLogsQueryParams = {
  jwt: string;
  serialNumber: string;
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

export const fetchKiosksByRetailer: any = async ({
  retailerId,
  page,
  limit,
  jwt,
}: FetchKiosksByRetailerQueryParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.get(
    `${domain}/v1/kiosk/list_by_retailer?query=${JSON.stringify({
      retailer_id: retailerId,
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

export const fetchKiosk = async ({ jwt, storeId, kioskId }: FetchKioskQueryParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.get(
    `${domain}/v1/kiosk/show?query=${JSON.stringify({
      store_id: storeId,
      kiosk_id: kioskId,
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const fetchKioskIpad = async ({ jwt, serialNumber, appIdentifier }: FetchKioskIpadQueryParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.get(
    `${domain}/v1/kiosk/show_ipad?query=${JSON.stringify({
      serial_number: serialNumber,
      app_identifier: appIdentifier,
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const fetchKioskIpadLogs = async ({ jwt, serialNumber }: FetchKioskIpadLogsQueryParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.get(
    `${domain}/v1/kiosk/show_ipad_logs?query=${JSON.stringify({
      serial_number: serialNumber,
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const createKiosk = async ({ jwt, storeId }: CreateKioskQueryParams, payload: CreateKioskPayloadParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.post(
    `${domain}/v1/kiosk?query=${JSON.stringify({
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

export const updateKiosk = async ({ jwt, storeId }: UpdateKioskQueryParams, payload: UpdateKioskPayloadParams) => {
  const domain = import.meta.env.VITE_ONBOARDING_DOMAIN;

  return await axios.put(
    `${domain}/v1/kiosk_update?query=${JSON.stringify({
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
