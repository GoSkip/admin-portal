import React, { FC, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { ItemType } from "../inputs/combobox";
import { IconButton } from "../buttons/icon";

type ComponentProps = {
  value: (string | number)[];
  onChange?: (v: (string | number)[]) => void;
  label?: string;
  items: ItemType[];
};

export const MultipleChipDropdown: FC<ComponentProps> = ({ label, value, onChange, items }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {value.map((v, i) => {
        const itemLabel = items.find(item => item.value === v)?.label;
        const handleClose = () => {
          if (onChange) {
            onChange(value.filter(vi => vi !== v));
          }
        };
        return (
          <div
            key={i}
            className="flex items-center gap-1.5 bg-blue-100 rounded-lg px-2 py-1 text-sm font-medium text-blue-800"
          >
            <span>{itemLabel}</span>
            <IconButton
              customClasses="h-4 w-4"
              color="lightBlue-400"
              colorHover="lightBlue-400"
              icon={XMarkIcon}
              small
              size={0}
              onClick={handleClose}
            ></IconButton>
          </div>
        );
      })}
      <Listbox value={value} multiple onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="cursor-pointer inline-flex items-center gap-x-1 rounded-lg bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
              <PlusIcon className="h-4 w-4 text-green-800" aria-hidden="true" />
              <span>{label}</span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 -translate-y-2"
              enterTo="transform opacity-100 translate-y-0"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 translate-y-0"
              leaveTo="transform opacity-0 -translate-y-1"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-56 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map(item => (
                  <Listbox.Option
                    key={item.value}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-lightBlue-600" : "text-gray-900",
                        "relative cursor-pointer select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={item.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate capitalize"
                          )}
                        >
                          {item.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-lightBlue-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};
