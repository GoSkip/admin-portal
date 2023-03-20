export type Kiosk = {
  id: number;
  inserted_at: Date;
  kiosk_number: number;
  kiosk_descriptor: string;
  store: Store;
  last_txn?: Date;
  ipad?: Ipad;
  actions?: Action[];
  mount?: string;
  printer?: string;
  terminal_id?: number;
  network?: string;
  pinpad?: string;
  pinpad_serial?: string;
  printer_serial?: string;
};

export type Ipad = {
  device_name: string;
  mdm_name: string;
  app_version: string;
  ios_version: string;
  model: string;
  serial_number: string;
  battery_level: number;
  group: string;
  last_seen: Date;
  last_txn: Date;
};

export type Action = {
  actor: string;
  type: string;
  timestamp: Date;
  metadata: string;
};

export type Store = {
  id: number;
  name: string;
  pos_site_id?: string;
  address?: string;
  address2?: string;
  phone?: string;
};
