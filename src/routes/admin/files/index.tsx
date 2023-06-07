import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  File,
  createFile,
  getFileStatus,
} from "../../../components/data/files.config";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import PrimaryButton from "../../../components/buttons/primary";
import HeadingMd from "../../../components/typography/headingMd";
import Dropdown, { DropdownItemType } from "../../../components/dropdown";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { fetchFiles } from "../../../api/file";
import {
  SessionContext,
  SessionContextType,
} from "../../../contexts/SessionContext";
import { toastError } from "../../../toasts";
import requirePermissions from "../../../hooks/requirePermissions";
import {
  LoadingContext,
  LoadingContextType,
} from "../../../contexts/LoadingContext";
import {
  GlobalStateContext,
  GlobalStateContextType,
} from "../../../contexts/GlobalStateContext";
// @ts-ignore
import { set } from "lodash";
import { REFETCH_INTERVAL, calcTotalPages } from "../../kiosks";

const Files = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<boolean>(true);

  // const handleUploadFile = (file: File) => {
  //   console.log(file);
  //   navigate(`/admin/files`);
  // };

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Chicago",
  });

  const handleAction = (str: string) => {
    return true;
  };

  const actionsDropdownItems: DropdownItemType[] = [
    {
      name: "Download file",
      value: "download-file",
      icon: ArrowDownTrayIcon,
      onClick: handleAction,
    },
    {
      name: "Reparse file",
      value: "reparse-file",
      icon: ArrowPathIcon,
      onClick: handleAction,
    },
  ];

  // requirePermissions(["file.view"]);

  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { filter } = useContext<GlobalStateContextType>(GlobalStateContext);
  const checkbox = useRef<HTMLInputElement | null>();
  const [checked, setChecked] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const onClickNewFile = () => {
    navigate("/admin/files/new");
  };

  const limit = 10;
  const {
    active_retailer: { id: activeRetailerId },
    selectable_stores: stores,
    token_info: { token },
  } = session;

  const { isLoading } = useQuery(
    ["files", page, activeRetailerId],
    () =>
      fetchFiles({
        retailerId: activeRetailerId,
        page,
        limit,
        jwt: token,
      }),
    {
      notifyOnChangeProps: "all",
      refetchInterval: REFETCH_INTERVAL,
      enabled: !!activeRetailerId,
      onError: (error) => {
        toastError("Problem loading files.");
      },
      onSuccess: ({ data: { store_files: files, total_results } }) => {
        const mappedFiles = files.map(createFile);

        setFiles(mappedFiles);
        setTotalResults(total_results);
        setTotalPages(calcTotalPages({ limit, totalResults: total_results }));
      },
    }
  );

  const filteredFiles = files.filter(
    (file: File) =>
      filter === "" ||
      file.siteName.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const onPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const onGotoPage = (page: number) => () => {
    setPage(page);
  };

  const onGotoFileDetails = (fileId: number) => {
    navigate(`/files/${activeRetailerId}/${fileId}`);
  };

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedFiles.length > 0 && selectedFiles.length < filteredFiles.length;
    setChecked(
      selectedFiles.length === filteredFiles.length && filteredFiles.length > 0
    );
    setIndeterminate(isIndeterminate);
    set(checkbox, "current.indeterminate", isIndeterminate);
  }, [selectedFiles, filteredFiles]);

  function toggleAll() {
    setSelectedFiles(checked || indeterminate ? [] : filteredFiles);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div>
      <div>
        <div className="flex h-20 -mt-4 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <HeadingMd label="Files"></HeadingMd>
            </div>
          </div>
          <div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Dropdown
                  items={actionsDropdownItems}
                  label="Actions"
                ></Dropdown>
                <PrimaryButton
                  label="Upload file"
                  onClick={onClickNewFile}
                ></PrimaryButton>
              </div>
            </div>
          </div>
        </div>

        <hr />
        {/* TODO: Delete this hidden code once new design gets approved by @peter */}
        {false && (
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
        )}
      </div>
      <div className="mt-5 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full pt-2 pb-4 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-2">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="relative w-12 px-6 sm:w-16 sm:px-8"
                    >
                      <input
                        disabled={!totalResults && filteredFiles.length === 0}
                        type="checkbox"
                        className={`${
                          !checked && "opacity-50"
                        } absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lightBlue-600 focus:ring-lightBlue-500 sm:left-6`}
                        ref={checkbox as any}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-gray-500 sm:pl-6"
                    >
                      FILE TYPE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500"
                    >
                      SITE NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500"
                    >
                      SITE ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500"
                    >
                      UPLOADED
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500"
                    >
                      FILE SIZE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500"
                    >
                      FILE ID
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y divide-gray-200 bg-white ${
                    isLoading ? "blur-sm" : null
                  }`}
                >
                  {filteredFiles?.map((file) => {
                    const fileStatus = getFileStatus(file.status);
                    return (
                      <tr
                        key={file.fileType}
                        className={
                          selectedFiles.includes(file)
                            ? "bg-gray-50"
                            : undefined
                        }
                      >
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedFiles.includes(file) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-lightBlue-600" />
                          )}
                          <input
                            type="checkbox"
                            className={`${
                              !selectedFiles.includes(file) && "opacity-50"
                            } absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lightBlue-600 focus:ring-lightBlue-500 sm:left-6`}
                            value={file.id}
                            checked={selectedFiles.includes(file)}
                            onChange={(e) =>
                              setSelectedFiles(
                                e.target.checked
                                  ? [...selectedFiles, file]
                                  : selectedFiles.filter(
                                      (k) => k.id !== file.id
                                    )
                              )
                            }
                          />
                        </td>
                        <td
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                          onClick={() => {
                            if (file.id) {
                              onGotoFileDetails(file.id);
                            }
                          }}
                        >
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
                          {fileStatus === "Success" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                              {fileStatus}
                            </span>
                          ) : fileStatus === "In Queue" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-[#fef3c7] text-[#92400E]">
                              {fileStatus}
                            </span>
                          ) : fileStatus === "In Process" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-[#dbeafe] text-[#1E40AF]">
                              {fileStatus}
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-red-100 text-red-800">
                              {fileStatus}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {file.fileSize}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {file.fileId}
                        </td>
                      </tr>
                    );
                  })}
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
