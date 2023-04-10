import { NavElement } from "../types/navElement";
import {
  ChartBarIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  TagIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const navigation: NavElement[] = [
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  { name: "Kiosks", href: "/kiosks", icon: ComputerDesktopIcon },
  { name: "Products", href: "/products", icon: CircleStackIcon },
  { name: "Promotions", href: "/promotions", icon: TagIcon },
  { name: "People", href: "/people", icon: UserCircleIcon },
  { name: "Administration", href: "/admin", icon: BuildingLibraryIcon },
];

const userNavigation: NavElement[] = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign Out", href: "/logout" },
];

export { navigation, userNavigation };
