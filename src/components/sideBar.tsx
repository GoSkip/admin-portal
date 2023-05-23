import React, { useState, useRef, useEffect } from "react";
import { menuItems } from "./data/sideBarMenu.config";
import type { MenuItem } from "./data/sideBarMenu.config";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const [openMenuIds, setOpenMenuIds] = useState<number[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleMenuItemClick = (
    itemId: number,
    to: string | undefined,
    children?: MenuItem[]
  ) => {
    if (children) {
      setOpenMenuIds((prevOpenMenuIds) => {
        if (prevOpenMenuIds.includes(itemId)) {
          return prevOpenMenuIds.filter((id) => id !== itemId);
        } else {
          return [itemId];
        }
      });
    } else if (to && typeof to !== undefined) {
      setSelectedItemId(itemId);
      navigate(to);
    } else {
      setSelectedItemId(null);
    }
  };

  const isItemSelected = (
    itemId: number | null,
    children?: MenuItem[]
  ): boolean => {
    if (!itemId || !children) return false;
    return (
      children.some((child) => isItemSelected(itemId, child.children)) ||
      itemId === children[0].id
    );
  };

  const SidebarFooter = () => {
    return (
      <div className="absolute bottom-0 left-0 border-t border-gray-200 justify-center items-center w-full h-28 pb-16 space-x-4 bg-white lg:flex dark:bg-gray-800 sidebar-bottom-menu">
        <div className="text-[#0284c7] text-xs flex justify-between">
          <h4 className="mr-2 mt-1">CloudPOS^ by </h4>
          <svg
            width="37"
            height="25"
            viewBox="0 0 37 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.138 18.103c-2.343.352-4.64.916-6.862 1.703-2.11.752-4.163 1.694-6.057 2.992a.335.335 0 0 0-.077.488l1.237 1.575c.07.092.18.139.29.139h.002c.07 0 .142-.02.206-.06 1.62-1.038 3.486-1.845 5.407-2.465a33.913 33.913 0 0 1 6.308-1.38c2.142-.258 4.304-.319 6.42-.137 1.986.172 3.936.564 5.73 1.233a.374.374 0 0 0 .476-.193l1.057-2.504a.341.341 0 0 0-.213-.455c-2.215-.762-4.515-1.149-6.793-1.284a32.829 32.829 0 0 0-1.865-.052 35.83 35.83 0 0 0-5.266.4M4.012 2.856A4.31 4.31 0 0 0 .816 6.8c-.177 2.964 2.362 4.26 4.415 4.895.632.194 1.273.412 1.845.749.467.275.898.707 1.003 1.257.11.564-.154 1.2-.694 1.44-1.017.45-1.903-.52-2.043-1.462a.205.205 0 0 0-.232-.174l-2.547.332a.212.212 0 0 0-.188.234c.135 1.128.764 2.635 2.121 3.486.641.4 1.36.604 2.123.604.46 0 .936-.076 1.423-.221 1.933-.576 3.039-2.226 3.015-4.245a4.284 4.284 0 0 0-1.369-3.09C8.673 9.646 7.331 9.3 5.968 8.886c-.874-.267-1.908-.739-2.165-1.703-.184-.69.217-1.421.868-1.546.65-.124 1.179.297 1.376.868.11.325.19.674.24.977a.2.2 0 0 0 .083.134.21.21 0 0 0 .158.034l2.533-.443a.215.215 0 0 0 .178-.243c-.305-1.914-.987-3.112-2.146-3.771A3.809 3.809 0 0 0 5.19 2.69c-.386 0-.78.055-1.178.165M19.434.218l-2.658.318a.176.176 0 0 0-.147.108L14.664 7.19c-.04.096-.193.079-.21-.023L13.45 1.089c-.009-.056-.065-.095-.125-.087l-2.624.436c-.06.008-.101.06-.092.115l2.243 14.205c.01.063.075.104.137.084.406-.132 1.824-.579 2.652-.713a.077.077 0 0 0 .062-.088l-.597-3.634c-.003-.027.032-.043.05-.02l2.708 3.344c.023.03.06.048.098.043 1.002-.114 2.144-.232 3.172-.318.068-.006.097-.078.053-.134l-4.303-5.31a.092.092 0 0 1-.014-.09L19.664.486c.052-.123-.066-.27-.206-.27h-.024M24.475.02l-2.622.02a.199.199 0 0 0-.194.195l.077 14.1c0 .052.05.098.105.095.897-.05 1.905-.072 2.713 0 .054.005.101-.031.101-.083l-.07-14.23A.103.103 0 0 0 24.48.02h-.004zm5.516 8.611h-.02l.513-5.524.036.003c.846.024 1.609.374 2.143.98.504.569.752 1.317.683 2.05-.158 1.661-1.227 2.495-3.163 2.495a5.64 5.64 0 0 1-.192-.004M28.01 0a.2.2 0 0 0-.13.048.198.198 0 0 0-.074.14l-1.371 14.125a.2.2 0 0 0 .047.15.201.201 0 0 0 .137.074l2.528.288h.022c.105 0 .194-.08.204-.185l.323-3.19.028.002c3.37.315 6.14-1.857 6.442-5.045.14-1.494-.3-2.937-1.242-4.063C33.93 1.158 32.45.507 30.78.29 29.264.089 28.032 0 28.032 0A.138.138 0 0 0 28.01 0"
              fill="#0284C7"
            />
          </svg>
        </div>
      </div>
    );
  };

  const renderMenuItems = (items: MenuItem[], parentIds: number[] = []) => {
    return items.map((item) => {
      const itemIds = [...parentIds, item.id];
      const isOpen = openMenuIds.includes(item.id);

      return (
        <div key={item.id}>
          <div
            className={`flex items-center w-full cursor-pointer h-8 ml-2 mt-1 font-normal text-[#4b5563] stroke-[#9ca3af] transition duration-200 border-transparent border-l-4 hover:border-l-4 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-[#f0f9ff] ${
              item.id === selectedItemId
                ? "selected text-[#028fc7] font-semibold"
                : ""
            }`}
            onClick={() => handleMenuItemClick(item.id, item.to, item.children)}
          >
            <div className="flex-grow align-middle pl-2">{item.label}</div>
            <div className="flex items-center justify-center w-10">
              {item.children && (
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              )}
            </div>
          </div>
          {item.children && isOpen && (
            <div className="pl-10">
              {renderMenuItems(item.children, itemIds)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <aside className="fixed left-0 z-20 pt-1 pb-32 flex-col flex-shrink-0 hidden w-60 h-full font-normal duration-75 lg:flex transition-width bg-white">
      <div className="pr-3 -py-4 overflow-y-auto h-screen">
        {renderMenuItems(menuItems)}
      </div>
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
