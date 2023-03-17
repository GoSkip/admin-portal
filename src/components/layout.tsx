import { Fragment, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRetailers } from "../api/retailer";
import { Outlet } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import {
  ChartBarIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  TagIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { SessionContext } from "../contexts/SessionContext";

const navigation = [
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  { name: "Kiosks", href: "/kiosks", icon: ComputerDesktopIcon },
  { name: "Products", href: "/products", icon: CircleStackIcon },
  { name: "Promotions", href: "/promotions", icon: TagIcon },
  { name: "People", href: "/people", icon: UserCircleIcon },
  {
    name: "Administration",
    href: "/admin",
    icon: BuildingLibraryIcon,
  },
];

const Layout = (): JSX.Element => {
  const { session } = useContext(SessionContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["retailers"],
    queryFn: () =>
      getRetailers({
        jwt: session.token_info.token,
        storeIds: session.store_ids,
        retailerIds: session.retailer_ids,
      }),
  });
  
  console.log(data);
  return (
    <div>
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
              enterFrom="-translate-x-0"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
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
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Skip Logo"
                    />
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive, isPending }) =>
                          classNames(
                            isActive || isPending
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                          )
                        }
                      >
                        {({ isActive, isPending }) => (
                          <>
                            <item.icon
                              className={classNames(
                                isActive || isPending
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 h-6 w-6 flex-shrink-0"
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
                <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                  <a href="#" className="group block flex-shrink-0">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          Austin Benesh
                        </p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          View Profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Skip Logo"
              />
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive, isPending }) =>
                    classNames(
                      isActive || isPending
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                    )
                  }
                >
                  {({ isActive, isPending }) => (
                    <>
                      <item.icon
                        className={classNames(
                          isActive || isPending
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-3 h-6 w-6 flex-shrink-0"
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
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <a href="#" className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Austin Benesh
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    View Profile
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 bg-indigo-50 border-b-[1px]">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
            </div>
          </div>
        </div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
