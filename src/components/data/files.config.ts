export interface File {
  id: number;
  fileType: string;
  siteName: string;
  siteId: number;
  uploaded: Date;
  status: string;
  fileSize: number;
  fileId: number;
}

export interface FileFromApi {
  id: number;
  business_name: string;
  file_type: string;
  inserted_at: Date;
  parser_module: string;
  status: string;
  size: number;
  store_id: number;
  store_name: string;
  updated_at: string;
}

export const getFileStatus = (str: string) => {
  switch (str) {
    case "parsed":
      return "Success";
    case "unparsed":
      return "In Queue";
    case "errored":
      return "Errored";
    case "parsing":
      return "In Process";
  }
  return str;
};

export const createFile: (file: FileFromApi) => File = (file: FileFromApi) => {
  return {
    id: file.id,
    fileType: file.file_type || file.parser_module,
    siteName: file.store_name,
    siteId: file.store_id,
    uploaded: new Date(file.inserted_at),
    status: file.status,
    fileSize: file.size,
    fileId: file.id,
  };
};

export const files: File[] = [
  {
    id: 1,
    fileType: "Promos (CSV)",
    siteName: "#1165 Eagle Mountain",
    siteId: 1231,
    uploaded: new Date("2023-03-29Z13:47:00"),
    status: "In Queue",
    fileSize: 5591,
    fileId: 1161022,
  },
  {
    id: 2,
    fileType: "Products (CSV)",
    siteName: "#1165 Eagle Mountain",
    siteId: 1231,
    uploaded: new Date("2023-03-29Z13:14:00"),
    status: "In Process",
    fileSize: 4126,
    fileId: 1161021,
  },
  {
    id: 3,
    fileType: "PLU",
    siteName: "#1165 Eagle Mountain",
    siteId: 1231,
    uploaded: new Date("2023-03-29Z13:01:00"),
    status: "Success",
    fileSize: 35,
    fileId: 1161020,
  },
  {
    id: 4,
    fileType: "Promos (NAXML)",
    siteName: "#308 Downtown",
    siteId: 899,
    uploaded: new Date("2023-03-28Z20:28:00"),
    status: "Success",
    fileSize: 98456,
    fileId: 1159862,
  },
  {
    id: 5,
    fileType: "Linked Products (NAXML)",
    siteName: "#308 Downtown",
    siteId: 899,
    uploaded: new Date("2023-03-28Z18:12:00"),
    status: "Success",
    fileSize: 1684538,
    fileId: 1159858,
  },
  {
    id: 6,
    fileType: "Products (NAXML)",
    siteName: "#308 Downtown",
    siteId: 899,
    uploaded: new Date("2023-03-28Z17:07:00"),
    status: "Errored",
    fileSize: 1684538,
    fileId: 1159857,
  },
  {
    id: 7,
    fileType: "Promos (JSON)",
    siteName: "#21 West Philadelphia",
    siteId: 621,
    uploaded: new Date("2023-03-27Z18:51:00"),
    status: "Success",
    fileSize: 52864,
    fileId: 1159841,
  },
  {
    id: 8,
    fileType: "Linked Products (JSON)",
    siteName: "#21 West Philadelphia",
    siteId: 621,
    uploaded: new Date("2023-03-27Z16:18:00"),
    status: "Errored",
    fileSize: 135648,
    fileId: 1159840,
  },
  {
    id: 9,
    fileType: "Products (JSON)",
    siteName: "#21 West Philadelphia",
    siteId: 621,
    uploaded: new Date("2023-03-27Z16:16:00"),
    status: "Success",
    fileSize: 135648,
    fileId: 1159799,
  },
  {
    id: 10,
    fileType: "Promos (PDI)",
    siteName: "#306 Leominster",
    siteId: 2166,
    uploaded: new Date("2023-03-24Z19:21:00"),
    status: "Success",
    fileSize: 726293,
    fileId: 1159750,
  },
  {
    id: 11,
    fileType: "Linked Products (PDI)",
    siteName: "#306 Leominster",
    siteId: 2166,
    uploaded: new Date("2023-03-24Z18:47:00"),
    status: "Success",
    fileSize: 726293,
    fileId: 1159747,
  },
  {
    id: 12,
    fileType: "Products (PDI)",
    siteName: "#306 Leominster",
    siteId: 2166,
    uploaded: new Date("2023-03-24Z18:32:00"),
    status: "Success",
    fileSize: 726293,
    fileId: 1159698,
  },
];
