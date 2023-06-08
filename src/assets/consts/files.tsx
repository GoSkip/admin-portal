import { SelectListItemType } from "../../components/inputs/selectList";

export const FileTypes: SelectListItemType[] = [
  {
    title: "PLUs / Hot Key Categories",
    desc: "PLU items with their associated categories / subcategories",
    value: "PLU",
  },
  {
    title: "Products (CSV)",
    desc: "Items with their price & associated details (description, tax, restrictions)",
    value: "Products (CSV)",
  },
  {
    title: "Promotions (CSV)",
    desc: "Item-level discounts with their associated items & trigger requirements",
    value: "Promos (CSV)",
  },
  {
    title: "Products (JSON)",
    desc: "Items with their price & associated details (description, tax, restrictions)",
    value: "Products (JSON)",
  },
  {
    title: "Promotions (JSON)",
    desc: "Item-level discounts with their associated items & trigger requirements",
    value: "Promos (JSON)",
  },
];
