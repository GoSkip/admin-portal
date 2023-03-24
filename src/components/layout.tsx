import { Fragment, useEffect, useState, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  GlobalStateContext,
  GlobalStateContextType,
} from "../contexts/GlobalStateContext";
import {
  ChartBarIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  TagIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import MobileSidebar from "./mobileSidebar";
import DesktopSidebar from "./desktopSidebar";
import { SessionContext } from "../contexts/SessionContext";
import { LoadingContext, LoadingContextType } from "../contexts/LoadingContext";
import LoadingProvider from "../providers/LoadingProvider";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { getRetailers } from "../api/retailer";
import { toastError } from "../toasts";
import { Retailer } from "../types/retailer";
import { NavElement } from "../types/navElement";

const navigation: NavElement[] = [
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  { name: "Kiosks", href: "/kiosks", icon: ComputerDesktopIcon },
  { name: "Products", href: "/products", icon: CircleStackIcon },
  { name: "Promotions", href: "/promotions", icon: TagIcon },
  { name: "People", href: "/people", icon: UserCircleIcon },
  { name: "Administration", href: "/admin", icon: BuildingLibraryIcon },
];
const userNavigation: NavElement[] = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign Out", href: "#" },
];

const Layout = (): JSX.Element => {
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { filter, setFilter } =
    useContext<GlobalStateContextType>(GlobalStateContext);
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
      <MobileSidebar
        retailers={sortedRetailers}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />
      {/* Static sidebar for desktop */}
      <DesktopSidebar retailers={sortedRetailers} navigation={navigation} />
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
                  Filter results
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
                    placeholder="Filter results"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
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
          </div>
        </div>

        <main>
          <div className="py-6">
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
