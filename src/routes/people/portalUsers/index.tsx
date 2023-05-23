import { useState } from "react";

import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

  const PortalUsers = (): JSX.Element => {
    const [activeFilter, setActiveFilter] = useState<boolean>(true);

    const people = [
      {
        id: 1,
        first: "Justin",
        last: "Turner",
        email: "jturner@retailer.com",
        role: "Store",
        stores: "#328 Carmi Lanes",
        active: true,
        phonenumber: "123-456-7890",
      },
      {
        id: 2,
        first: "Clayton",
        last: "Turner",
        email: "kersh@retailer.com",
        role: "Store",
        stores: "6 stores",
        active: true,
        phonenumber: "123-456-7890",
      },
      {
        id: 3,
        first: "Walker",
        last: "Buelher",
        email: "thewalker@retailer.com",
        role: "Retailer",
        stores: "#3723 Manresa",
        active: true,
        phonenumber: "123-456-7890",
      },
      {
        id: 4,
        first: "File",
        last: "Admin",
        email: "skipadmin@retailer.com",
        role: "Store",
        stores: "All stores",
        active: false,
        phonenumber: "123-456-7890",
      },
      {
        id: 5,
        first: "Mookie",
        last: "Betts",
        email: "mookie@retailer.com",
        role: "Store",
        stores: "5 stores",
      },
      {
        id: 6,
        first: "Chris",
        last: "Taylor",
        email: "ct3@retailer.com",
        role: "Store",
        stores: "#306 Leominster",
        active: true,
        phonenumber: "123-456-7890",
      },
      {
        id: 7,
        first: "Dave",
        last: "Roberts",
        email: "dave.roberts@retailer.com",
        role: "Store",
        stores: "All stores",
        active: false,
        phonenumber: "123-456-7890",
      },
      { 
        id: 8,
        first: "Clayton",
        last: "Kershaw",
        email: "kersh@retailer.com",
        role: "Retailer",
        stores: ["#306 Leominister", "#323 Gardner Parkway", "#3723 Manresa", "#399 Arvin", "#365 Stockdale", "#328 Carmi Lanes"],
        features: ["Clerks", "Kiosks", "PLUs", "Stores"],
        phonenumber: "801-478-0646"
      }
    ];

    const filteredPeople = activeFilter === true ? people.filter(person => person.active) : people.filter(person => !person.active);

    return (
      <div>
        <div>
          <div className="flex h-20 -mt-4 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-gray-900 text-xl">Portal Users</div>
              </div>
            </div>
            <div>
              <div className="sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <button className="rounded-md bg-white outline outline-1 outline-gray-400 px-4 py-2 text-md font-medium text-gray-600">
                    Export
                  </button>
                  <button className="rounded-md bg-[#0284c7] outline outline-1 outline-gray-400 px-4 py-2 text-md font-medium text-gray-50">
                    New User
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className={`inline-flex items-center px-1 text-md font-medium mr-10  ${activeFilter === true ?
              "border-b-2 border-indigo-500 pb-4 text-[#0ea5e9]" : "pt-1 text-gray-400"}`}
              onClick={() => setActiveFilter(true)}>
              Active users
            </button>
            <button className={`inline-flex items-center px-1 text-md font-medium mr-10  ${activeFilter === false ?
              "border-b-2 border-indigo-500 pb-4 text-[#0ea5e9]" : "pt-1 text-gray-400"}`}
              onClick={() => setActiveFilter(false)}>
              Inactive users
            </button>
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
                    {filteredPeople.map((person) => (
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
                          <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-normal ${person.role === "Store" ? "text-[#075985] bg-[#e0f2fe] " : "text-[#065f46] bg-[#d1fae5]"}`}>
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