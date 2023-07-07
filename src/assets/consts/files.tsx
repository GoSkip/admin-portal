import { SelectListItemType } from "@components/inputs/selectList";

export enum FileType {
  PLU = "plu",
  CSVItemPromotion = "CsvItemPromotion",
  CSVProduct = "CsvProduct",
  JSONItemPromotion = "JsonItemPromotion",
  JSONProduct = "JsonProduct",
  JSONLinkedProduct = "JsonLinkedProduct",
  BONaxmlItemPromotion = "BoNaxmlItemPromotion",
  BONaxmlProduct = "BoNaxmlProduct",
  BONaxmlLinkedProduct = "BoNaxmlLinkedProduct",
  NaxmlItemPromotion = "NaxmlItemPromotion",
  NaxmlProduct = "NaxmlProduct",
  NaxmlLinkedProduct = "NaxmlLinkedProduct",
}

export const FileTypes: SelectListItemType[] = [
  {
    title: "PLUs / Hot Key Categories",
    desc: "PLU items with their associated categories / subcategories",
    value: FileType.PLU,
    fileType: "csv",
  },
  {
    title: "Promotions (CSV)",
    desc: "Item-level discounts with their associated items & trigger requirements",
    value: FileType.CSVItemPromotion,
    fileType: "csv",
  },
  {
    title: "Products (CSV)",
    desc: "Items with their price & associated details (description, tax, restrictions)",
    value: FileType.CSVProduct,
    fileType: "csv",
  },
  {
    title: "Promotions (JSON)",
    desc: "Item-level discounts with their associated items & trigger requirements",
    value: FileType.JSONItemPromotion,
    fileType: "json",
  },
  {
    title: "Products (JSON)",
    desc: "Items with their price & associated details (description, tax, restrictions)",
    value: FileType.JSONProduct,
    fileType: "json",
  },
  {
    title: "Linked Products (JSON)",
    desc: "Items that are triggered to automatically add to a cart when a linked item is in the cart",
    value: FileType.JSONLinkedProduct,
    fileType: "json",
  },
  {
    title: "Promotions (NAXML)",
    desc: "Item-level discounts with their associated items & trigger requirements",
    value: FileType.BONaxmlItemPromotion,
    fileType: "naxml",
  },
  {
    title: "Products (NAXML)",
    desc: "Items with their price & associated details (description, tax, restrictions)",
    value: FileType.BONaxmlProduct,
    fileType: "naxml",
  },
  {
    title: "Linked Products (NAXML)",
    desc: "Items that are triggered to automatically add to a cart when a linked item is in the cart",
    value: FileType.BONaxmlLinkedProduct,
    fileType: "naxml",
  },
  {
    title: "Promotions (PDI)",
    desc: "Item-level discounts with their associated items & trigger requirements",
    value: FileType.NaxmlItemPromotion,
    fileType: "pdi",
  },
  {
    title: "Products (PDI)",
    desc: "Items with their price & associated details (description, tax, restrictions)",
    value: FileType.NaxmlProduct,
    fileType: "pdi",
  },
  {
    title: "Linked Products (PDI)",
    desc: "Items that are triggered to automatically add to a cart when a linked item is in the cart",
    value: FileType.NaxmlLinkedProduct,
    fileType: "pdi",
  },
];

export enum FileActionType {
  AddOrUpdate = "add_or_update",
  Delete = "delete",
}

export const fileActionTypes: SelectListItemType[] = [
  {
    title: "Add or Update",
    desc: "PLUs included in this file will either add new PLUs or update existing PLUs in the store(s) you select.",
    value: FileActionType.AddOrUpdate,
  },
  {
    title: "Delete",
    desc: "PLUs included in this file will delete existing PLUs in the store(s) you select.",
    value: FileActionType.Delete,
  },
];

export enum ApplicableStoreType {
  Single = "single",
  Multiple = "multiple",
  All = "all",
}

export const applicableStoreTypes: SelectListItemType[] = [
  {
    title: "Single",
    desc: "Update the Products for a single store",
    value: ApplicableStoreType.Single,
  },
  {
    title: "Multiple",
    desc: "Update the Products for all the stores you select in the next step",
    value: ApplicableStoreType.Multiple,
  },
  {
    title: "All",
    desc: "Update the Products for all the stores you have edit access for",
    value: ApplicableStoreType.All,
  },
];
