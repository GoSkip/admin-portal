import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Fragment } from "react";

export type Option = {
  key: string;
  value: string;
};

type SelectProps = {
  selectedItem: Option | null;
  setSelectedItem: (option: Option | null) => void;
  label?: string;
  items: Option[];
};

const Select = ({ label, selectedItem, setSelectedItem, items }: SelectProps): JSX.Element => {
  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      {({ open }) => (
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
            <span className="block truncate capitalize">
              {selectedItem ? selectedItem.value : label ? `Select ${label}` : "Select item"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map(item => (
                <Listbox.Option
                  key={item.key}
                  className={({ active }) =>
                    classNames(
                      active ? "text-white bg-blue-600" : "text-gray-900",
                      "relative cursor-pointer select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={classNames(selected ? "font-semibold" : "font-normal", "block truncate capitalize")}
                      >
                        {item.value}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-white" : "text-blue-600",
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
  );
};

export default Select;
