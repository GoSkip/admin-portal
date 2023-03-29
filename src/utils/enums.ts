export enum Mount {
  Counter = "counter",
  Floor = "floor",
  Swivel = "swivel",
}

export enum Network {
  Ethernet = "ethernet",
  Wifi = "wifi",
}

export enum Pinpad {
  ISMP4 = "ismp4",
  IPP3X = "ipp3x",
  ISC250 = "isc250",
  LANE3000 = "lane3000",
  P400 = "p400",
}

export enum Printer {
  TM_M30 = "tm_m30",
  TM_M30II = "tm_m30ii",
}

export const mounts = Object.entries(Mount).map(([key, value]) => ({
  key,
  value,
}));

export const networks = Object.entries(Network).map(([key, value]) => ({
  key,
  value,
}));

export const pinpads = Object.entries(Pinpad).map(([key, value]) => ({
  key,
  value,
}));

export const printers = Object.entries(Printer).map(([key, value]) => ({
  key,
  value,
}));
