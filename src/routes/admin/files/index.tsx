import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { files } from "../../../components/data/files.config";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Files = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<boolean>(true);

  const navigate = useNavigate();

  // const handleUploadFile = (file: File) => {
  //   console.log(file);
  //   navigate(`/admin/files`);
  // };

  const filteredFiles =
    files.length > 0
      ? files
      : null;

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Chicago"
  });

  return (
    <div>
      <div>
        <div className="flex h-20 -mt-4 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-gray-900 text-xl">Files</div>
            </div>
          </div>
          <div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <button
                  className="rounded-md bg-[#0284c7] outline outline-1 outline-gray-400 px-4 py-2 text-sm font-light text-gray-50"
                >
                  Upload file
                </button>
              </div>
            </div>
          </div>
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
              <span className="text-gray-600 font-normal">Sort</span>
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-gray-500 sm:pl-6"
                    >
                      FILE TYPE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      SITE NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      SITE ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      UPLOADED
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      FILE SIZE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      FILE ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredFiles?.map((file) => (
                    <tr
                      key={file.fileType}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        <input type="checkbox" />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        {file.fileType}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {file.siteName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                        {file.siteId}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {dateFormatter.format(file.uploaded)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {file.status ===  "Success" ? <span className="px-2 inline-flex text-xs leading-5 font-normal rounded-full bg-green-100 text-green-800">{file.status}</span>
                        : file.status === "In Queue" ? <span className="px-2 inline-flex text-xs leading-5 font-normal rounded-full bg-[#fef3c7] text-[#92400E]">{file.status}</span>
                        : file.status === "In Process" ? <span className="px-2 inline-flex text-xs leading-5 font-normal rounded-full bg-[#dbeafe] text-[#1E40AF]">{file.status}</span>
                        : <span className="px-2 inline-flex text-xs leading-5 font-normal rounded-full bg-red-100 text-red-800">{file.status}</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {file.fileSize}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {file.fileId}
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

export default Files;
