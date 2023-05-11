import { useState } from "react";
import { toastError } from "../../../toasts";

import axios from "axios";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  SessionContext,
  SessionContextType,
} from "../../../contexts/SessionContext";

export const fetchUsers: any = async ({
  search_strings,
  limit,
  offset,
  jwt,
}: any) => {
  // const domain = import.meta.env.VITE_LOGIN_DOMAIN;
  // return await axios.get(
  //   `${domain}/v1/admin/api_user/search?query=${JSON.stringify({
  //     search_strings,
  //     limit,
  //     offset,
  //     jwt,
  //   })}`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${jwt}`,
  //     },
  //   }
  // );
};

const PortalUsers = (): JSX.Element => {
  const [offset, setOffset] = useState<number>(0);
  const { session } = useContext<SessionContextType>(SessionContext);
  const limit = 10;
  const { token } = session.token_info;

  const people = [
    {
      first: "Justin",
      last: "Turner",
      email: "jturner@retailer.com",
      role: "Store",
      stores: "#328 Carmi Lanes",
    },
    {
      first: "Clayton",
      last: "Turner",
      email: "kersh@retailer.com",
      role: "Store",
      stores: "6 stores",
    },
    {
      first: "Walker",
      last: "Buelher",
      email: "thewalker@retailer.com",
      role: "Store",
      stores: "#3723 Manresa",
    },
    {
      first: "File",
      last: "Admin",
      email: "skipadmin@retailer.com",
      role: "Store",
      stores: "All stores",
    },
    {
      first: "Mookie",
      last: "Betts",
      email: "mookie@retailer.com",
      role: "Store",
      stores: "5 stores",
    },
    {
      first: "Chris",
      last: "Taylor",
      email: "ct3@retailer.com",
      role: "Store",
      stores: "#306 Leominster",
    },
    {
      first: "Dave",
      last: "Roberts",
      email: "dave.roberts@retailer.com",
      role: "Store",
      stores: "All stores",
    },
  ];

  return (
    <div>
      <div>
        <div className="flex h-20 -mt-4 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-gray-900 text-xl">Users</div>
            </div>
          </div>
          <div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <span className="rounded-md bg-white outline outline-1 outline-gray-400 px-4 py-2 text-md font-medium text-gray-600">
                  Export
                </span>
                <span className="rounded-md bg-[#0284c7] outline outline-1 outline-gray-400 px-4 py-2 text-md font-medium text-gray-50">
                  New User
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="inline-flex items-center border-b-2 border-indigo-500 px-1 pb-4 mr-10 text-md font-medium text-[#0ea5e9]">
            Active users
          </span>
          <span className="inline-flex items-center  px-1 pt-1 text-md font-medium text-gray-400">
            Inactive users
          </span>
        </div>
        <hr />
        <div className="flex space-x-12 mt-4">
          <div className="mt-2 flex rounded-md shadow-sm w-2/3">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="filter"
                name="filter"
                id="filter"
                className="block w-full rounded-l-lg border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-md focus:ring-2 focus:ring-inset focus:ring-gray-50 sm:text-sm sm:leading-6"
                placeholder="Filter results"
              />
            </div>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-md font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <BarsArrowUpIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="text-gray-500">Sort</span>
              <ChevronDownIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-2 flex rounded-md w-64">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="actions"
                name="actions"
                id="actions"
                className="block w-full rounded-l-lg border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-md focus:ring-2 focus:ring-inset focus:ring-gray-50 sm:text-sm sm:leading-6"
                placeholder="Actions"
              />
            </div>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ChevronDownIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pl-6 text-left text-sm font-semibold text-gray-500"
                    >
                      <input type="checkbox" />
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6"
                    >
                      FIRST
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                    >
                      LAST
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                    >
                      EMAIL
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-500"
                    >
                      ROLE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                    >
                      STORES
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        <input type="checkbox" />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        {person.first}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.last}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <span className="inline-flex items-center rounded-full bg-[#e0f2fe] px-4 py-1 text-sm font-medium text-[#075985]">
                          {person.role}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.stores}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalUsers;
