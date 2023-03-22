import { Fragment, useEffect, useState, useContext } from "react";
import { Dialog, Menu, Transition, Listbox } from "@headlessui/react";
import {
  ChartBarIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  CheckIcon,
  TagIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
  XMarkIcon,
  BellIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { SessionContext } from "../contexts/SessionContext";
import { LoadingContext, LoadingContextType } from "../contexts/LoadingContext";
import LoadingProvider from "../providers/LoadingProvider";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { getRetailers } from "../api/retailer";
import { toastError } from "../toasts";
import { Retailer } from "../types/retailer";

const navigation = [
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  { name: "Kiosks", href: "/kiosks", icon: ComputerDesktopIcon },
  { name: "Products", href: "/products", icon: CircleStackIcon },
  { name: "Promotions", href: "/promotions", icon: TagIcon },
  { name: "People", href: "/people", icon: UserCircleIcon },
  { name: "Administration", href: "/admin", icon: BuildingLibraryIcon },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign Out", href: "#" },
];

const Layout = (): JSX.Element => {
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { session, setActiveRetailer } = useContext(SessionContext);
  const [sortedRetailers, setSortedRetailers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { active_retailer } = session;
  const { isLoading } = useQuery({
    queryKey: ["retailers"],
    queryFn: () =>
      getRetailers({
        jwt: session.token_info.token,
        storeIds: session.store_ids,
        retailerIds: session.retailer_ids,
      }),
    enabled: !!session.token_info.token,
    onError: (error) => {
      console.error(error);
      toastError("Problem loading retailers.");
    },
    onSuccess: (data) => {
      const sortedRetailers = data.data.retailers.sort(
        (a: Retailer, b: Retailer) => a.name.localeCompare(b.name)
      );
      setSortedRetailers(sortedRetailers);

      if (!active_retailer.id && !active_retailer.name) {
        setActiveRetailer(sortedRetailers[0]);
      }
    },
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-blue-700 pt-5 pb-4">
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
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=300"
                    alt="Skip Logo"
                  />
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
                              ? "bg-blue-800 text-white"
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

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-blue-600 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <Listbox
              value={session.active_retailer}
              onChange={setActiveRetailer}
            >
              {({ open }) => (
                <>
                  <div className="relative mt-2 w-full">
                    <Listbox.Button className="cursor-pointer relative w-full cursor-default bg-blue-600 py-2 px-2 text-left text-gray-200 text-lg sm:text-sm sm:leading-6 hover:bg-blue-700">
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {sortedRetailers.map((retailer: Retailer) => (
                          <Listbox.Option
                            key={retailer.name}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-900",
                                "relative cursor-default select-none py-2 pl-3 pr-9"
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
                                      active ? "text-white" : "text-blue-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aira-hidden="true"
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
                        ? "bg-blue-800 text-white"
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
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <form className="flex w-full lg:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <MagnifyingGlassIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search-field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                              "block px-4 py-2 text-sm text-gray-700"
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

        <main>
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <LoadingProvider noBlur={false}>
                <Outlet />
              </LoadingProvider>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
