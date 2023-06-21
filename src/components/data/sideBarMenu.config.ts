import {
  ChartBarIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  TagIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import i18n from "../../i18n";

export interface MenuItem {
  id: number;
  label: string;
  to?: string;
  Icon?: any;
  children?: MenuItem[];
}

export const menuItems = [
  {
    id: 1,
    label: i18n.t("reports"),
    to: "/reports",
    Icon: ChartBarIcon,
    current: false,
  },
  {
    id: 2,
    label: i18n.t("kiosks"),
    to: "/kiosks",
    Icon: ComputerDesktopIcon,
    current: false,
  },
  {
    id: 3,
    label: i18n.t("products"),
    to: "/products",
    Icon: CircleStackIcon,
    current: false,
  },
  {
    id: 4,
    label: i18n.t("promotions"),
    to: "/promotions",
    Icon: TagIcon,
    current: false,
  },
  {
    id: 5,
    label: "People",
    Icon: UserCircleIcon,
    current: false,
    children: [
      { id: 51, label: i18n.t("clerks"), to: "/people/clerks", current: false },
      {
        id: 52,
        label: i18n.t("portal-users"),
        to: "/people/portal-users",
        current: false,
      },
    ],
  },
  {
    id: 6,
    label: "Administration",
    Icon: BuildingLibraryIcon,
    current: false,
    children: [
      { id: 61, label: i18n.t("files"), to: "/admin/files", current: false },
      { id: 62, label: i18n.t("taxes"), to: "/admin/taxes", current: false },
      {
        id: 63,
        label: i18n.t("loyalty"),
        to: "/admin/loyalty",
        current: false,
      },
      {
        id: 64,
        label: i18n.t("payments"),
        to: "/admin/payments",
        current: false,
      },
      { id: 65, label: i18n.t("stores"), to: "/admin/stores", current: false },
      {
        id: 66,
        label: i18n.t("retailer"),
        to: "/admin/retailer",
        current: false,
      },
    ],
  },
];

export const userNavigation = [
  { label: i18n.t("your-profile"), to: "#" },
  { label: i18n.t("settings"), to: "#" },
  { label: i18n.t("sign-out"), to: "/logout" },
];
