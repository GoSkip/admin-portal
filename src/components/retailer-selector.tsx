import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import React, { FC, Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SessionContextType, SessionContext } from "../contexts/SessionContext";
import { Retailer } from "../types/retailer";

export const RetailerSelector: FC<{ retailers: Retailer[] }> = ({
  retailers,
}) => {
  const { session, setActiveRetailer } =
    useContext<SessionContextType>(SessionContext);
  // @ts-ignore
  const { t } = useTranslation();

  const handleRetailerChange = (id: number) => {
    const retailer = retailers.find((r) => r.id === id);
    if (retailer) {
      setActiveRetailer(retailer);
    }
  };

  return (
    <div className="flex h-16 w-full shrink-0 items-center bg-lightBlue-500">
      <Listbox
        value={session.active_retailer.id}
        onChange={handleRetailerChange}
      >
        {({ open }) => (
          <>
            <div className="relative w-80">
              <Listbox.Button className="flex items-center justify-between cursor-pointer relative w-full h-16 py-2 px-5 text-left text-gray-200 text-lg sm:text-sm sm:leading-6">
                <span className="flex items-center gap-3">
                  <img
                    src={session.active_retailer.image_url}
                    alt=""
                    className="h-8 w-auto flex-shrink-0"
                  />
                  <span className="block truncate text-lg font-bold">
                    {session.active_retailer.name}
                  </span>
                </span>
                <ChevronUpDownIcon className="h-auto w-6 text-white" />
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 max-h-80 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {retailers.map((retailer: Retailer) => (
                    <Listbox.Option
                      key={retailer.name}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-lightBlue-500 text-gray-50" : "bg-white",
                          "transition relative cursor-pointer select-none py-4 pl-3 pr-9"
                        )
                      }
                      value={retailer.id}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <img
                              src={retailer.image_url}
                              alt=""
                              className="h-5 w-auto flex-shrink-0"
                            />
                            <span
                              className={classNames(
                                "font-semibold block truncate"
                              )}
                            >
                              {retailer.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-lightBlue-500",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-auto w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
