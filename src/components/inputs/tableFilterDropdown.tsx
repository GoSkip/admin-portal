import React, { FC, Fragment, useEffect, useState } from "react";
import { IconButton } from "@components/buttons/icon";
import { mdiFilterVariant } from "@mdi/js";

import { Menu, Transition, Combobox } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Icon from "@mdi/react";
import { uniqueArrayByKey } from "@utils/data-types";
import { stopPropagation } from "@utils/events";

export type TableFilterDropdownItemType = {
  label: string;
  value: string;
};

type TableFilterDropdownType = {
  label: string;
  items: TableFilterDropdownItemType[];
  onChange?: (v: string | null) => void;
};

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const menuItemClasses = (isActive: boolean, isSelected: boolean) => {
  return classNames(
    isActive ? "bg-gray-100 text-gray-900" : "text-gray-700",
    isSelected ? (isActive ? "bg-lightBlue-200" : "bg-lightBlue-100") : "",
    "relative transition group flex items-center px-4 py-2 text-sm cursor-pointer"
  );
};

const MenuItem: FC<{
  item: TableFilterDropdownItemType;
  selectedValue?: string | null;
  onClick: (v: string) => void;
}> = ({ item, selectedValue, onClick }) => {
  const isSelected = selectedValue === item.value;
  const handleItemClick = () => {
    if (onClick) {
      onClick(item.value);
    }
  };
  return (
    <Menu.Item>
      {({ active }) => (
        <span className={menuItemClasses(active, isSelected)} onClick={handleItemClick}>
          {item.label}
          {isSelected && (
            <span className={classNames("absolute inset-y-0 right-0 flex items-center pr-4 text-lightBlue-600")}>
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </span>
      )}
    </Menu.Item>
  );
};

export const TableFilterDropdown: FC<TableFilterDropdownType> = ({ items, label, onChange }) => {
  const uniqueItems = uniqueArrayByKey(items, "value");
  const itemsLength = uniqueItems.length;
  const maxItemsLength = 4;
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const filteredItems = (
    query === ""
      ? uniqueItems
      : uniqueItems.filter(item => {
          return item.label?.toString().toLowerCase().includes(query.toLowerCase());
        })
  ) as TableFilterDropdownItemType[];
  if (itemsLength === 0) {
    return null;
  }

  const handleItemChange = (v: string) => {
    setSelectedValue(v);
    if (onChange) {
      onChange(v);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left" onClick={stopPropagation}>
      <div>
        <Menu.Button
          className="flex justify-center items-center rounded-circle pa-1 text-gray-200 hover:text-gray-500"
          onClick={stopPropagation}
        >
          <Icon path={mdiFilterVariant} size={0.8} />
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
        <Menu.Items
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            itemsLength > maxItemsLength ? "" : "max-h-[300px] overflow-y-auto"
          }`}
        >
          {itemsLength > maxItemsLength ? (
            // Use `autocomplete` component
            <Combobox as="div" value={selectedValue} onChange={setSelectedValue}>
              <div className="relative">
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6"
                  placeholder={label || "Search..."}
                  onChange={event => setQuery(event.target.value)}
                  displayValue={(item: TableFilterDropdownItemType) => item?.label}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredItems.length > 0 && (
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredItems.map((item, i) => (
                      <Combobox.Option
                        key={`${i}-${item.value}`}
                        value={item}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active ? "bg-lightBlue-600 text-white" : "text-gray-900"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <span className={classNames("block truncate", `${selected && "font-semibold"}`)}>
                              {item.label}
                            </span>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-lightBlue-600"
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          ) : (
            // Use `selectbox` component
            <div className="py-1">
              {filteredItems.map((item, i) => {
                return (
                  <MenuItem
                    key={`${i}-${item.value}`}
                    item={item}
                    selectedValue={selectedValue}
                    onClick={handleItemChange}
                  ></MenuItem>
                );
              })}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
