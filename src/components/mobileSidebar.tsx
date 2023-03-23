import React, { Fragment, useContext } from "react";
import { Transition, Dialog, Listbox } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { SessionContext, SessionContextType } from "../contexts/SessionContext";
import { Retailer } from "../types/retailer";
import classNames from "classnames";
import { NavElement } from "../types/navElement";
import { NavLink } from "react-router-dom";

type MobileProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  retailers: Retailer[];
  navigation: NavElement[];
};

const Mobile = ({
  retailers,
  sidebarOpen,
  setSidebarOpen,
  navigation,
}: MobileProps): JSX.Element => {
  const { session, setActiveRetailer } =
    useContext<SessionContextType>(SessionContext);
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-blue-500 pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-shrink-0 items-center px-4">
                <Listbox
                  value={session.active_retailer}
                  onChange={setActiveRetailer}
                >
                  {({ open }) => (
                    <>
                      <div className="relative mt-2 w-full">
                        <Listbox.Button className="cursor-pointer relative w-full cursor-default bg-blue-500 py-2 px-2 text-left text-gray-200 text-lg sm:text-sm sm:leading-6 hover:bg-blue-600">
                          <span className="flex items-center justify-between">
                            <img
                              src={session.active_retailer.image_url}
                              alt=""
                              className="h-10 w-10 rounded-full"
                            />
                            <span className="block truncate text-center">
                              {session.active_retailer.name}
                            </span>
                            <ChevronUpDownIcon className="h-4 w-4" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 w-full max-h-56 overflow-auto bg-blue-600 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {retailers.map((retailer: Retailer) => (
                              <Listbox.Option
                                key={retailer.name}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-blue-400 text-gray-50"
                                      : "bg-white",
                                    "relative cursor-pointer select-none py-4 pl-3 pr-9"
                                  )
                                }
                                value={retailer}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <img
                                        src={retailer.image_url}
                                        alt=""
                                        className="h-5 w-5 flex-shrink-0 rounded-full"
                                      />
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {retailer.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-blue-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
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
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive, isPending }) =>
                        classNames(
                          isActive || isPending
                            ? "bg-blue-600 text-white"
                            : "text-blue-100 hover:bg-blue-600",
                          "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                        )
                      }
                    >
                      {({ isActive, isPending }) => (
                        <>
                          <item.icon
                            className={classNames(
                              isActive || isPending ? "" : "",
                              "mr-4 h-6 w-6 flex-shrink-0 text-blue-300"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Mobile;
