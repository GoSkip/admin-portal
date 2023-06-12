import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { portalUsers } from "../../../components/data/portalUsers.config";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const PortalUsers = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<boolean>(true);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleActiveUserClick = (id: number) => {
    navigate(`/people/portal-users/${id}`);
  };

  const handleNewUserClick = () => {
    navigate("/people/portal-users/new");
  };

  const filteredUsers =
    activeFilter === true
      ? portalUsers.filter((user) => user.active)
      : portalUsers.filter((user) => !user.active);

  return (
    <div>
      <div>
        <div className="flex h-20 -mt-4 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-gray-900 text-xl">{t("portal-users")}</div>
            </div>
          </div>
          <div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <button className="rounded-md bg-white outline outline-1 outline-gray-400 px-4 py-2 text-md font-medium text-gray-600">
                  {t("export")}
                </button>
                <button
                  onClick={() => handleNewUserClick()}
                  className="rounded-md bg-[#0284c7] outline outline-1 outline-gray-400 px-4 py-2 text-md font-medium text-gray-50"
                >
                  {t("new-user")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className={`inline-flex items-center px-1 text-md font-medium mr-10  ${
              activeFilter === true
                ? "border-b-2 border-indigo-500 pb-4 text-[#0ea5e9]"
                : "pt-1 text-gray-400"
            }`}
            onClick={() => setActiveFilter(true)}
          >
            {t("active-users")}
          </button>
          <button
            className={`inline-flex items-center px-1 text-md font-medium mr-10  ${
              activeFilter === false
                ? "border-b-2 border-indigo-500 pb-4 text-[#0ea5e9]"
                : "pt-1 text-gray-400"
            }`}
            onClick={() => setActiveFilter(false)}
          >
            {t("inactive-users")}
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
                placeholder={t("filter-results") || ""}
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
              <span className="text-gray-600 font-normal">{t("sort")}</span>
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
                placeholder={t("actions") || ""}
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
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-2">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pl-6 text-left text-sm font-normal text-gray-500"
                    >
                      <input type="checkbox" />
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase text-gray-500 sm:pl-6"
                    >
                      {t("first")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                    >
                      {t("last")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                    >
                      {t("email")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-xs font-medium uppercase text-gray-500"
                    >
                      {t("role")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                    >
                      {t("stores")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredUsers.map((user, i) => (
                    <tr
                      key={`${i}-${user.email}`}
                      onClick={() => handleActiveUserClick(user.id)}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        <input type="checkbox" />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        {user.first}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.last}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-normal ${
                            user.role === "Store"
                              ? "text-lightBlue-800 bg-lightBlue-100 "
                              : user.role === "Retailer"
                              ? "text-emerald-800 bg-emerald-100"
                              : user.role === "File"
                              ? "text-coolGray-800 bg-coolGray-100"
                              : "text-purple-800 bg-purple-100"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.stores.length > 1 ? (
                          <span className="font-bold">
                            {t("n-stores", {
                              n: user.stores.length,
                            })}
                          </span>
                        ) : (
                          user.stores.map((store, ii) => (
                            <span key={`${store}-${i}-${ii}`}>{store}</span>
                          ))
                        )}
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
