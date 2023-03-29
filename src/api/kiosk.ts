import axios from "axios";

export type FetchKiosksByRetailerQueryParams = {
  jwt: string;
  retailerId: number;
  page: number;
  limit: number;
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

export type FetchKioskQueryParams = {
  jwt: string;
  storeId: number;
  kioskId: number;
};

export const fetchKiosk = async ({
  jwt,
  storeId,
  kioskId,
}: FetchKioskQueryParams) => {
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
