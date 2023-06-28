// @ts-nocheck
import { Retailer } from "@itypes/retailer";
import { userNavigation } from "@utils/navigation";
import LangSwitcher from "./langSwitcher";
import { useTranslation } from "react-i18next";

import { Fragment, useContext } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { FC } from "react";
import { IconButton } from "./buttons/icon";
import { NavLink } from "react-router-dom";
import { SessionContext, SessionContextType } from "@contexts/SessionContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type NavBarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
};

const NavBar: FC<NavBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { session } = useContext<SessionContextType>(SessionContext);
  const { t } = useTranslation();
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-lightBlue-500 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-lightBlue-200 lg:hidden" onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-lightBlue-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <IconButton
            icon={MagnifyingGlassIcon}
            color="lightBlue-200"
            colorHover="lightBlue-100"
            srOnlyText="View notifications"
          ></IconButton>
          <button
            type="button"
            className="p-1 text-sm font-semibold transition text-lightBlue-200 hover:text-lightBlue-100 focus:outline-none"
          >
            <span className="sr-only">{t("view-notifications")}</span>
            <span>{t("support")}</span>
          </button>
          <LangSwitcher></LangSwitcher>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-lightBlue-400" aria-hidden="true" />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5 transition text-lightBlue-200 hover:text-lightBlue-100">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-lightBlue-400"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item key="k0">
                  {({ active }) => (
                    <NavLink
                      to="/me"
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "flex flex-col px-4 py-3 text-sm leading-6 text-gray-900"
                      )}
                    >
                      <span>Signed in as</span>
                      <span className="font-medium truncate">{session.username}</span>
                    </NavLink>
                  )}
                </Menu.Item>
                {userNavigation.map(item => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <NavLink
                        to={item.href}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-4 py-3 text-sm leading-6 text-gray-700"
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
      </div>
    </div>
  );
};

export default NavBar;
