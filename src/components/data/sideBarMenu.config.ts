import {
  ChartBarIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  TagIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export interface MenuItem {
  id: number;
  label: string;
  to?: string;
  Icon?: any;
  children?: MenuItem[];
}

export const menuItems = [
  { id: 1, label: "Reports", to: "/reports", Icon: ChartBarIcon },
  { id: 2, label: "Kiosks", to: "/kiosks", Icon: ComputerDesktopIcon },
  { id: 3, label: "Products", to: "/products", Icon: CircleStackIcon },
  { id: 4, label: "Promotions", to: "/promotions", Icon: TagIcon },
  {
    id: 5,
    label: "People",
    Icon: UserCircleIcon,
    children: [
      { id: 51, label: "Clerks", to: "/people/clerks" },
      { id: 52, label: "Portal Users", to: "/people/portal-users" },
    ],
  },
  {
    id: 6,
    label: "Administration",
    Icon: BuildingLibraryIcon,
    children: [
      { id: 61, label: "Files", to: "/admin/files" },
      { id: 62, label: "Taxes", to: "/admin/taxes" },
      { id: 63, label: "Loyalty", to: "/admin/loyalty" },
      { id: 64, label: "Payments", to: "/admin/payments" },
      { id: 65, label: "Stores", to: "/admin/stores" },
      { id: 66, label: "Retailer", to: "/admin/retailer" },
    ],
  },
];

export const userNavigation = [
  { label: "Your Profile", to: "#" },
  { label: "Settings", to: "#" },
  { label: "Sign Out", to: "/logout" },
];
