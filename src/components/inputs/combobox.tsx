import React, { FC, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox as TailwindCombobox } from "@headlessui/react";
import classNames from "classnames";

export type ItemType = {
  label: string;
  value: string | number;
  [key: string]: any;
};

export type ComboboxProps = {
  items: ItemType[];
  value?: string | number | null;
  label?: string | null;
  searchIn?: string[];
  onChange?: (v: string | number | null) => void;
};

export const Combobox: FC<ComboboxProps> = ({ label, value = null, searchIn = [], onChange, items }) => {
  const [query, setQuery] = useState("");
  const [displayValue, setDisplayValue] = useState<string>("");

  const filteredItems =
    query === ""
      ? items
      : items.filter(item => {
          const q = query.toLowerCase();
          // By default, search in the label
          const c1 = item.label.toLowerCase().includes(q);
          // Optionally, search in other fields
          const c2 = searchIn.some(field => item[field].toLowerCase().includes(q));
          return c1 || c2;
        });

  const handleChange = (v: string | number | null) => {
    if (onChange) {
      onChange(v);
    }
  };

  // Handle `value` changes
  useEffect(() => {
    if (value) {
      const item = items.find(item => item.value === value);
      if (item) {
        setDisplayValue(item.label);
      }
    } else {
      setDisplayValue("");
    }
  }, [value, items]);

  return (
    <TailwindCombobox as="div" value={value} onChange={handleChange}>
      <TailwindCombobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </TailwindCombobox.Label>
      <div className="relative mt-2">
        <TailwindCombobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6"
          onChange={event => setQuery(event.target.value)}
          displayValue={() => displayValue}
        />
        <TailwindCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </TailwindCombobox.Button>

        {filteredItems.length > 0 && (
          <TailwindCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.map(item => (
              <TailwindCombobox.Option
                key={item.value}
                value={item.value}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-lightBlue-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames("block truncate", selected && "font-semibold")}>{item.label}</span>

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
              </TailwindCombobox.Option>
            ))}
          </TailwindCombobox.Options>
        )}
      </div>
    </TailwindCombobox>
  );
};
