import { getOnboarding, postOnboarding } from "./base";

export type FetchIpadQueryParams = {
  jwt: string;
  serialNumber: string;
  appIdentifier: string;
};

export type FetchIpadLogsQueryParams = {
  jwt: string;
  serialNumber: string;
};

export type RestartIpadQueryParams = {
  jwt: string;
  device_id: number;
};

export type PushAssignedAppsQueryParams = {
  jwt: string;
  device_id: number;
};

export const fetchIpad = async ({ jwt, serialNumber, appIdentifier }: FetchIpadQueryParams) => {
  const query = {
    serial_number: serialNumber,
    app_identifier: appIdentifier,
  };

  return await getOnboarding({ jwt, endpoint: "/ipad/show", query });
};

export const fetchIpadLogs = async ({ jwt, serialNumber }: FetchIpadLogsQueryParams) => {
  const query = {
    serial_number: serialNumber,
  };

  return await getOnboarding({ jwt, endpoint: "/ipad/show_logs", query });
};

export const restartIpad = async ({ jwt, device_id }: RestartIpadQueryParams) => {
  const query = {
    device_id,
  };

  return postOnboarding({ jwt, endpoint: "/ipad/restart", query, payload: {} });
};

export const pushAssignedApps = async ({ jwt, device_id }: PushAssignedAppsQueryParams) => {
  const query = {
    device_id,
  };

  return postOnboarding({ jwt, endpoint: "/ipad/push_assigned_apps", query, payload: {} });
};
