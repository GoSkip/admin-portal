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
  { id: 1, label: i18n.t("reports"), to: "/reports", Icon: ChartBarIcon },
  { id: 2, label: i18n.t("kiosks"), to: "/kiosks", Icon: ComputerDesktopIcon },
  { id: 3, label: i18n.t("products"), to: "/products", Icon: CircleStackIcon },
  { id: 4, label: i18n.t("promotions"), to: "/promotions", Icon: TagIcon },
  {
    id: 5,
    label: "People",
    Icon: UserCircleIcon,
    children: [
      { id: 51, label: i18n.t("clerks"), to: "/people/clerks" },
      { id: 52, label: i18n.t("portal-users"), to: "/people/portal-users" },
    ],
  },
  {
    id: 6,
    label: "Administration",
    Icon: BuildingLibraryIcon,
    children: [
      { id: 61, label: i18n.t("files"), to: "/admin/files" },
      { id: 62, label: i18n.t("taxes"), to: "/admin/taxes" },
      { id: 63, label: i18n.t("loyalty"), to: "/admin/loyalty" },
      { id: 64, label: i18n.t("payments"), to: "/admin/payments" },
      { id: 65, label: i18n.t("stores"), to: "/admin/stores" },
      { id: 66, label: i18n.t("retailer"), to: "/admin/retailer" },
    ],
  },
];

export const userNavigation = [
  { label: i18n.t("your-profile"), to: "#" },
  { label: i18n.t("settings"), to: "#" },
  { label: i18n.t("sign-out"), to: "/logout" },
];
