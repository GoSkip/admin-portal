import { Option } from "@components/inputs/select";
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

export const mounts: Option[] = [
  { key: "Counter", value: "counter" },
  { key: "Floor", value: "floor" },
  { key: "Swivel", value: "swivel" },
];

export const networks: Option[] = [
  { key: "Ethernet", value: "ethernet" },
  { key: "Wifi", value: "wifi" },
];

export const pinpads: Option[] = [
  { key: "ISMP4", value: "ismp4" },
  { key: "IPP3X", value: "ipp3x" },
  { key: "ISC250", value: "isc250" },
  { key: "LANE3000", value: "lane3000" },
  { key: "P400", value: "p400" },
];

export const printers: Option[] = [
  { key: "TM_M30", value: "tm_m30" },
  { key: "TM_M30II", value: "tm_m30ii" },
];
