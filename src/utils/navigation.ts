import { NavElement } from "@itypes/navElement";
import {
  ChartBarIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  TagIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import i18n from "../i18n";

const navigation: NavElement[] = [
  { name: i18n.t("reports"), href: "/reports", icon: ChartBarIcon },
  { name: i18n.t("kiosks"), href: "/kiosks", icon: ComputerDesktopIcon },
  { name: i18n.t("products"), href: "/products", icon: CircleStackIcon },
  { name: i18n.t("promotions"), href: "/promotions", icon: TagIcon },
  { name: i18n.t("people"), href: "/people", icon: UserCircleIcon },
  { name: i18n.t("administration"), href: "/admin", icon: BuildingLibraryIcon },
];

const userNavigation: NavElement[] = [
  { name: i18n.t("account-settings"), href: "/account-settings" },
  { name: i18n.t("sign-out"), href: "/logout" },
];

export { navigation, userNavigation };
