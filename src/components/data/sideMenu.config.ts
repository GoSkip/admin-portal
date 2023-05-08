import {
    ChartBarIcon,
    ComputerDesktopIcon,
    CircleStackIcon,
    TagIcon,
    UserCircleIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export const sideMenu = [
    { label: "Reports", to: "/reports", Icon: ChartBarIcon },
    { label: "Kiosks", to: "/kiosks", Icon: ComputerDesktopIcon },
    { label: "Products", to: "/products", Icon: CircleStackIcon },
    { label: "Promotions", to: "/promotions", Icon: TagIcon },
    {
        label: "People",
        Icon: UserCircleIcon,
        children: [
            { label: "Clerks", to: "/people/clerks" },
            { label: "Users", to: "/people/users" },
        ],
    },
    {
        label: "Administration",
        to: "/admin",
        Icon: BuildingLibraryIcon,
        children: [
            { label: "Files", to: "/admin/files" },
            { label: "Taxes", to: "/admin/taxes" },
            { label: "Loyalty", to: "/admin/loyalty" },
            { label: "Payments", to: "/admin/payments" },
            { label: "Stores", to: "/admin/stores" },
            { label: "Retailer", to: "/admin/retailer" },
        ],
    },
];

export const userNavigation = [
    { label: "Your Profile", to: "#" },
    { label: "Settings", to: "#" },
    { label: "Sign Out", to: "/logout" },
];
