import { Fragment, useContext } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SessionContext, SessionContextType } from "../contexts/SessionContext";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Retailer } from "../types/retailer";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { NavElement } from "../types/navElement";

type DesktopProps = {
  retailers: Retailer[];
  navigation: NavElement[];
};

const Desktop = ({ retailers, navigation }: DesktopProps): JSX.Element => {
  const { session, setActiveRetailer } =
    useContext<SessionContextType>(SessionContext);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar is you like */}
      <div className="flex flex-grow flex-col overflow-y-auto bg-blue-500 pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <Listbox value={session.active_retailer} onChange={setActiveRetailer}>
            {({ open }) => (
              <>
                <div className="relative w-full">
                  <Listbox.Button className="cursor-pointer relative w-full cursor-default bg-blue-500 py-2 px-8 text-left text-gray-200 text-lg sm:text-sm sm:leading-6 hover:bg-blue-600">
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
                    <Listbox.Options className="absolute z-10 max-h-56 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {retailers.map((retailer: Retailer) => (
                        <Listbox.Option
                          key={retailer.name}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-blue-400 text-gray-50"
                                : "bg-white",
                              "relative cursor-pointer select-none py-2 pl-3 pr-9"
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
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {retailer.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-blue-600",
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
        <div className="mt-5 flex flex-1 flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive, isPending }) =>
                  classNames(
                    isActive || isPending
                      ? "bg-blue-600 text-white"
                      : "text-blue-100 hover:bg-blue-600",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
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
      </div>
    </div>
  );
};

export default Desktop;
