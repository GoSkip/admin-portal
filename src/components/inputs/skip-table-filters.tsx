import React, { FC } from "react";

import { ForwardRefExoticComponent, Fragment, SVGProps } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { TableHeaderType } from "../data/skip-table";
import { mdiCheckboxBlankOutline, mdiMagnify, mdiSortDescending } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { IconButton } from "../buttons/icon";
import { Icon } from "@mdi/react";

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
  const { t } = useTranslation();
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
    <Menu as="div" className="block text-left">
      <div className="flex px-2.5">
        <Menu.Button
          className={({ open }) =>
            `flex w-full justify-between py-4 text-sm font-medium text-coolGray-700 ${
              isLastItem ? "" : "border-b border-coolGray-200"
            } ${open ? "bg-lightBlue-50" : ""}`
          }
        >
          {({ open }) => {
            return (
              <>
                <span>{item.label}</span>
                <div className="flex items-center gap-2.5">
                  {sortValue !== 0 && (
                    <IconButton color="coolGray-700" icon={XCircleIcon} size={0} small onClick={sortReset}></IconButton>
                  )}
                  <FunnelIcon
                    className={`h-4 w-4 ${sortValue === 1 ? "text-lightBlue-600" : "text-coolGray-300"}`}
                    aria-hidden="true"
                  />
                  <ChevronRightIcon
                    className={`h-4 w-4 ${open ? "text-coolGray-800" : "text-coolGray-300"}`}
                    aria-hidden="true"
                  />
                </div>
              </>
            );
          }}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 -translate-x-2"
        enterTo="transform opacity-100 translate-x-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-x-0"
        leaveTo="transform opacity-0 -translate-x-1"
      >
        <Menu.Items className="absolute left-full top-0 ml-1 z-10 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2 px-2.5 flex flex-col">
            <div className="relative flex border-b border-gray-200">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <Icon path={mdiMagnify} className="text-gray-300" size={0.8}></Icon>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="block ring-0 focus:ring-0 w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder={t("search")}
                aria-describedby="price-currency"
              />
            </div>
            {/* Loop through values */}
            <div
              className={`flex w-full justify-between py-4 text-sm font-medium text-coolGray-700 border-b border-coolGray-200`}
            >
              <span>Value 1</span>
              <div className="flex items-center gap-2.5">
                <span className="text-coolGray-300">[21]</span>
                <IconButton color="coolGray-300" icon={mdiCheckboxBlankOutline} size={0} small></IconButton>
              </div>
            </div>
            <div
              className={`flex w-full justify-between py-4 text-sm font-medium text-coolGray-700 border-b border-coolGray-200`}
            >
              <span>Value 2</span>
              <div className="flex items-center gap-2.5">
                <span className="text-coolGray-300">[21]</span>
                <IconButton color="coolGray-300" icon={mdiCheckboxBlankOutline} size={0} small></IconButton>
              </div>
            </div>
            <div
              className={`flex w-full justify-between py-4 text-sm font-medium text-coolGray-700 border-b border-coolGray-200`}
            >
              <span>Value 3</span>
              <div className="flex items-center gap-2.5">
                <span className="text-coolGray-300">[21]</span>
                <IconButton color="coolGray-300" icon={mdiCheckboxBlankOutline} size={0} small></IconButton>
              </div>
            </div>
            <div
              className={`flex w-full justify-between py-4 text-sm font-medium text-coolGray-700 border-b border-coolGray-200`}
            >
              <span>Value 4</span>
              <div className="flex items-center gap-2.5">
                <span className="text-coolGray-300">[21]</span>
                <IconButton color="coolGray-300" icon={mdiCheckboxBlankOutline} size={0} small></IconButton>
              </div>
            </div>
            <div className={`flex w-full justify-between py-4 text-sm font-medium text-coolGray-400`}>
              <span>{t("select-all")}</span>
              <IconButton color="coolGray-300" icon={mdiCheckboxBlankOutline} size={0} small></IconButton>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const SkipTableFilters = ({ items, disabled, value, onChange }: ComponentProps): JSX.Element => {
  const { t } = useTranslation();
  const label = t("filter");
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
          <FunnelIcon
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
