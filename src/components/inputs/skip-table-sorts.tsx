import React, { FC } from "react";

import { ForwardRefExoticComponent, Fragment, SVGProps } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BarsArrowDownIcon, BarsArrowUpIcon, ChevronDownIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { TableHeaderType } from "../data/skip-table";
import { Icon } from "@mdi/react";
import { mdiSortDescending } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { IconButton } from "../buttons/icon";

type ComponentProps = {
  items: TableHeaderType[];
  value: string[];
  disabled?: boolean;
  onChange?: (key: string, v: number) => any;
};

type MenuItemProps = {
  item: TableHeaderType;
  sorts: string[];
  isLastItem: boolean;
  onChange: (key: string, v: number) => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const DropdownItemClasses = (isActive: boolean) => {
  return classNames(
    isActive ? "bg-gray-100 text-gray-900" : "text-gray-700",
    "group flex items-center px-4 py-2 text-sm cursor-pointer"
  );
};

const menuBtnBackground = (isDisabled: boolean | undefined) => {
  if (isDisabled) {
    return "text-coolGray-300";
  }
  return "text-coolGray-700 hover:bg-gray-50";
};

const MenuItem = ({ item, isLastItem, sorts, onChange }: MenuItemProps): JSX.Element => {
  const sortAsc = () => {
    onChange(item.value, 1);
  };
  const sortDesc = () => {
    onChange(item.value, -1);
  };
  const sortReset = () => {
    onChange(item.value, 0);
  };
  const v = item.value;
  const sortValue = sorts.includes(v) ? 1 : sorts.includes(`-${v}`) ? -1 : 0;
  return (
    <div className="flex px-2.5">
      <span
        className={`flex w-full justify-between py-4 text-sm font-medium text-coolGray-700 ${
          isLastItem ? "" : "border-b border-coolGray-200"
        }`}
      >
        <span>{item.label}</span>
        <div className="flex gap-2.5">
          {sortValue !== 0 && (
            <IconButton color="coolGray-700" icon={XCircleIcon} size={0} small onClick={sortReset}></IconButton>
          )}
          <IconButton
            color={sortValue === 1 ? "lightBlue-600" : "coolGray-300"}
            icon={BarsArrowUpIcon}
            size={0}
            small
            onClick={sortAsc}
          ></IconButton>
          <IconButton
            color={sortValue === -1 ? "lightBlue-600" : "coolGray-300"}
            icon={BarsArrowDownIcon}
            size={0}
            small
            onClick={sortDesc}
          ></IconButton>
        </div>
      </span>
    </div>
  );
};

export const SkipTableSorts = ({ items, disabled, value, onChange }: ComponentProps): JSX.Element => {
  const { t } = useTranslation();
  const label = t("sort");
  const handleSortChange = (key: string, v: number) => {
    if (onChange) {
      onChange(key, v);
    }
  };
  if (items.length === 0) {
    return <span></span>;
  }
  return (
    <Menu as="div" className="relative inline-block text-left" aria-disabled={disabled}>
      <div>
        <Menu.Button
          disabled={disabled}
          className={`inline-flex w-full justify-center gap-x-2 rounded-md px-4 py-2.5 text-sm font-medium bg-white shadow-sm ring-1 ring-inset ring-gray-300 ${menuBtnBackground(
            disabled
          )}`}
        >
          <BarsArrowUpIcon
            className={`h-5 w-5 ${
              disabled ? "text-coolGray-400" : value.length > 0 ? "text-lightBlue-600" : "text-coolGray-700"
            }`}
            aria-hidden="true"
          />
          {label}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            <div className="text-lg text-coolGray-900 font-medium mb-4 px-2.5">{label}</div>
            {items.map((item, i) => {
              return (
                <MenuItem
                  key={`${i}-${item.value}`}
                  sorts={value}
                  isLastItem={i === items.length - 1}
                  item={item}
                  onChange={handleSortChange}
                ></MenuItem>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
