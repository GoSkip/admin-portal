import { Fragment, useContext } from "react";
import { Listbox, Transition, Menu } from "@headlessui/react";
import { SessionContext, SessionContextType } from "../contexts/SessionContext";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Retailer } from "../types/retailer";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import PendingBar from "./pendingBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { userNavigation } from "../utils/navigation";
import {
  GlobalStateContext,
  GlobalStateContextType,
} from "../contexts/GlobalStateContext";

type NavBarProps = {
  retailers: Retailer[];
};

const NavBar = ({ retailers }: NavBarProps): JSX.Element => {
  const { session, setActiveRetailer } =
    useContext<SessionContextType>(SessionContext);
  const { pendingChangesMode } =
    useContext<GlobalStateContextType>(GlobalStateContext);

  if (pendingChangesMode) {
    return <PendingBar />;
  }

  return (
    <nav className="fixed z-30 flex mx-auto items-center justify-between w-full bg-[#0ea5e9]">
      <div className="flex flex-shrink-0 items-center">
        <Listbox value={session.active_retailer} onChange={setActiveRetailer}>
          {({ open }) => (
            <>
              <div className="relative w-80">
                <Listbox.Button className="cursor-pointer relative w-full  py-2 px-8 text-left text-gray-200 text-lg sm:text-sm sm:leading-6">
                  <span className="flex items-center justify-between">
                    <img
                      src={session.active_retailer.image_url}
                      alt=""
                      className="h-12 w-24"
                    />
                    <span className="block truncate text-center text-lg">
                      {session.active_retailer.name}
                    </span>
                    <ChevronUpDownIcon className="h-8 w-8" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 max-h-64 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {retailers.map((retailer: Retailer) => (
                      <Listbox.Option
                        key={retailer.name}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-blue-400 text-gray-50" : "bg-white",
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
      <div className="flex mr-7">
        <button
          type="button"
          className="p-1 text-gray-200 hover:text-white mr-5"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="p-1 text-gray-200 hover:text-white focus:outline-none mr-5"
        >
          <span className="sr-only">View notifications</span>
          <span>Support</span>
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <NavLink
                      to={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-600"
                      )}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default NavBar;
