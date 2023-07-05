import { menuItems } from "@components/data/sideBarMenu.config";
import { NavLink, useLocation } from "react-router-dom";

import { FC, Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Retailer } from "@itypes/retailer";
import skipLogo from "@assets/images/skip-logo.svg";
import { RetailerSelector } from "@components/retailer-selector";
import { useTranslation } from "react-i18next";
import PendingBar from "@components/pendingBar";
import { GlobalStateContext, GlobalStateContextType } from "@contexts/GlobalStateContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type SidebarProps = {
  retailers: Retailer[];
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({ open, retailers, setOpen }) => {
  const { pendingChangesMode } = useContext<GlobalStateContextType>(GlobalStateContext);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  if (pendingChangesMode) {
    return <PendingBar />;
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden bg-white">
                  <RetailerSelector retailers={retailers}></RetailerSelector>
                  <nav className="flex flex-1 flex-col px-4">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {menuItems.map(item => (
                            <li key={item.label}>
                              {!item.children ? (
                                <NavLink
                                  to={item.to}
                                  className={({ isActive }) => {
                                    return classNames(
                                      item.current || isActive
                                        ? "active bg-lightBlue-50 text-lightBlue-600 border-lightBlue-600"
                                        : "text-gray-700 hover:text-lightBlue-600 hover:bg-lightBlue-50",
                                      "border-l-4 border-transparent cursor-pointer group transition flex gap-x-3 py-2 px-3 text-sm leading-6 font-semibold"
                                    );
                                  }}
                                >
                                  <item.Icon
                                    className={classNames(
                                      item.current
                                        ? "text-lightBlue-600"
                                        : "text-gray-400 group-[.active]:text-lightBlue-600 group-hover:text-lightBlue-600",
                                      "h-6 w-6 shrink-0 transition"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.label}
                                </NavLink>
                              ) : (
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button
                                        className={classNames(
                                          item.current || open
                                            ? "bg-lightBlue-50 text-lightBlue-600 border-lightBlue-600"
                                            : "text-gray-700 hover:text-lightBlue-600 hover:border-lightBlue-600 hover:bg-lightBlue-50",
                                          "flex items-center border-l-4 border-transparent group transition w-full text-left py-2 px-3 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                        )}
                                      >
                                        <item.Icon
                                          className={classNames(
                                            item.current || open
                                              ? "text-lightBlue-600"
                                              : "text-gray-400 group-hover:text-lightBlue-600",
                                            "h-6 w-6 shrink-0 transition"
                                          )}
                                          aria-hidden="true"
                                        />
                                        {item.label}
                                        <ChevronDownIcon
                                          className={classNames(
                                            open ? "rotate-180" : "",
                                            item.current || open
                                              ? "text-lightBlue-600"
                                              : "text-gray-400 group-hover:text-lightBlue-600",
                                            "ml-auto h-5 w-5 transition shrink-0"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </Disclosure.Button>
                                      <ul
                                        className={classNames(
                                          open ? "duration-500 max-h-80" : "max-h-0",
                                          "block overflow-hidden transition-[max-height]"
                                        )}
                                      >
                                        {item.children.map((subItem, i) => (
                                          <li key={subItem.label} className={classNames(i === 0 ? "mt-1" : "")}>
                                            <NavLink
                                              to={subItem.to}
                                              className={({ isActive }: { isActive: boolean }) => {
                                                return classNames(
                                                  subItem.current || isActive
                                                    ? "active bg-lightBlue-50 text-lightBlue-500 border-lightBlue-600"
                                                    : "hover:bg-lightBlue-50",
                                                  "block border-l-4 border-transparent transition py-2 pr-3 pl-12 font-medium text-sm leading-6 text-gray-700"
                                                );
                                              }}
                                            >
                                              {subItem.label}
                                            </NavLink>
                                          </li>
                                        ))}
                                      </ul>
                                    </>
                                  )}
                                </Disclosure>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="-mx-6 mt-auto">
                        <a
                          href="https://getskip.com/"
                          target="_blank"
                          className="flex border-t border-gray-200 justify-center items-center gap-x-1.5 px-6 py-4 text-sm font-medium leading-6 text-lightBlue-600"
                        >
                          <span aria-hidden="true">CloudPOS^ by</span>
                          <img className="h-9 w-9 rounded-full" src={skipLogo} alt="" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col overflow-y-auto overflow-x-hidden bg-white">
          <RetailerSelector retailers={retailers}></RetailerSelector>
          <nav className="flex flex-1 flex-col pt-5 border-r border-gray-200 px-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {menuItems.map(item => (
                    <li key={item.label}>
                      {!item.children ? (
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => {
                            return classNames(
                              item.current || isActive
                                ? "active bg-lightBlue-50 text-lightBlue-600 border-lightBlue-600"
                                : "text-gray-700 hover:text-lightBlue-600 hover:border-lightBlue-600 hover:bg-lightBlue-50",
                              "border-l-4 border-transparent cursor-pointer group transition flex gap-x-3 py-2 px-3 text-sm leading-6 font-semibold"
                            );
                          }}
                        >
                          <item.Icon
                            className={classNames(
                              item.current
                                ? "text-lightBlue-600"
                                : "text-gray-400 group-[.active]:text-lightBlue-600 group-hover:text-lightBlue-600",
                              "h-6 w-6 shrink-0 transition"
                            )}
                            aria-hidden="true"
                          />
                          {item.label}
                        </NavLink>
                      ) : (
                        <Disclosure as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  item.current || open
                                    ? "bg-lightBlue-50 text-lightBlue-600 border-lightBlue-600"
                                    : "text-gray-700 hover:text-lightBlue-600 hover:border-lightBlue-600 hover:bg-lightBlue-50",
                                  "flex border-l-4 border-transparent items-center group transition w-full text-left py-2 px-3 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                )}
                              >
                                <item.Icon
                                  className={classNames(
                                    item.current || open
                                      ? "text-lightBlue-600"
                                      : "text-gray-400 group-hover:text-lightBlue-600",
                                    "h-6 w-6 shrink-0 transition"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.label}
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "rotate-180" : "",
                                    item.current || open
                                      ? "text-lightBlue-600"
                                      : "text-gray-400 group-hover:text-lightBlue-600",
                                    "ml-auto h-5 w-5 transition shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <ul
                                className={classNames(
                                  open ? "duration-500 max-h-80" : "max-h-0",
                                  "block overflow-hidden transition-[max-height]"
                                )}
                              >
                                {item.children.map((subItem, i) => (
                                  <li key={subItem.label} className={classNames(i === 0 ? "mt-1" : "")}>
                                    <NavLink
                                      to={subItem.to}
                                      className={({ isActive }: { isActive: boolean }) => {
                                        return classNames(
                                          subItem.current || isActive
                                            ? "active bg-lightBlue-50 text-lightBlue-500 border-lightBlue-600"
                                            : "hover:bg-lightBlue-50",
                                          "block border-l-4 border-transparent transition py-2 pr-3 pl-12 font-medium text-sm leading-6 text-gray-700"
                                        );
                                      }}
                                    >
                                      {subItem.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <a
                  href="https://getskip.com/"
                  target="_blank"
                  className="flex border-t border-gray-200 justify-center items-center gap-x-1.5 px-6 py-4 text-sm font-medium leading-6 text-lightBlue-600"
                >
                  <span aria-hidden="true">CloudPOS^ by</span>
                  <img className="h-9 w-9 rounded-full" src={skipLogo} alt="" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
