import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Kiosk } from "../../types/kiosk";
import {
  BarsArrowUpIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import formatMinsHours from "../../utils/formatMinsHours";
import { differenceInMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { fetchKiosksByRetailer } from "../../api/kiosk";
import requirePermissions from "../../hooks/requirePermissions";
import classNames from "classnames";
import {
  SessionContext,
  SessionContextType,
} from "../../contexts/SessionContext";
// @ts-ignore
import { set } from "lodash";
import { toast } from "react-toastify";
import {
  LoadingContext,
  LoadingContextType,
} from "../../contexts/LoadingContext";
const MAX_MINUTES_BEFORE_WARNING = 300; /* 5 hours */
const REFETCH_INTERVAL = 1000 * 60 * 1; /* 1 minutes */

const calcKioskLastTxnColor = (last_txn: Date | undefined | null) => {
  if (!last_txn) {
    return "bg-gray-100 text-gray-800";
  }

  if (differenceInMinutes(new Date(), last_txn) > MAX_MINUTES_BEFORE_WARNING) {
    return "bg-red-100 text-red-800";
  }

  return "bg-green-100 text-green-800";
};

const calcTotalPages = ({
  limit,
  totalResults,
}: {
  limit: number;
  totalResults: number;
}) => {
  return Math.ceil(totalResults / limit);
};

const calcFrom = ({ page, limit }: { page: number; limit: number }) => {
  return (page - 1) * limit + 1;
};

const calcTo = ({
  page,
  limit,
  totalResults,
}: {
  page: number;
  limit: number;
  totalResults: number;
}) => {
  if (totalResults < page * limit) {
    return totalResults;
  }

  return page * limit;
};

const calculateKioskDescriptrion = ({
  kioskDescriptor,
  kioskNumber,
}: {
  kioskDescriptor: string;
  kioskNumber: number;
}) => {
  if (kioskDescriptor) {
    return `${kioskDescriptor} - ${kioskNumber}`;
  }

  return `${kioskNumber}`;
};

const KioskList = (): JSX.Element => {
  requirePermissions(["kiosk.view"]);

  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const checkbox = useRef<HTMLInputElement | null>();
  const [checked, setChecked] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filteredKiosks, setFilteredKiosks] = useState<Kiosk[]>([]);
  const [selectedKiosks, setSelectedKiosks] = useState<Kiosk[]>([]);
  const limit = 10;
  const {
    active_retailer: { id: activeRetailerId },
    selectable_stores: stores,
    token_info: { token },
  } = session;

  const { isLoading } = useQuery(
    ["kiosks", activeRetailerId],
    () =>
      fetchKiosksByRetailer({
        retailerId: activeRetailerId,
        page,
        limit,
        jwt: token,
      }),
    {
      refetchInterval: REFETCH_INTERVAL,
      enabled: !!activeRetailerId,
      onError: (error) => {
        console.error(error);
        toast.error("Problem loading kiosks.");
      },
      onSuccess: ({ data: { kiosks, total_results } }) => {
        const filteredKiosks = kiosks
          .map((kiosk: any) => ({
            ...kiosk,
            inserted_at: new Date(kiosk.inserted_at),
            last_txn: kiosk.last_txn ? new Date(kiosk.last_txn) : null,
            store: stores.find((store) => store.id === kiosk.store_id),
          }))
          .filter(
            (k: Kiosk) =>
              k.store.name === "" || k.store.name.toLowerCase().includes(filter)
          )
          .sort((a: Kiosk, b: Kiosk) =>
            a.store.name.localeCompare(b.store.name)
          );
        setFilteredKiosks(filteredKiosks);
        setTotalResults(total_results);
        setTotalPages(calcTotalPages({ limit, totalResults: total_results }));
      },
    }
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

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedKiosks.length > 0 &&
      selectedKiosks.length < filteredKiosks.length;
    setChecked(
      selectedKiosks.length === filteredKiosks.length &&
        filteredKiosks.length > 0
    );
    setIndeterminate(isIndeterminate);
    set(checkbox, "current.indeterminate", isIndeterminate);
  }, [selectedKiosks, filteredKiosks]);

  function toggleAll() {
    setSelectedKiosks(checked || indeterminate ? [] : filteredKiosks);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="w-full pt-4 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Kiosks</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Kiosk
          </button>
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div className="mt-4 flex w-full">
        <div className="mt-1 flex-1 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="text-search"
              id="text-search"
              className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Filter results"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <BarsArrowUpIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Sort</span>
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg flex justify-center items-center">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="relative w-12 px-6 sm:w-16 sm:px-8"
                    >
                      <input
                        disabled={!totalResults}
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-500"
                    >
                      Store
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Kiosk
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Last Txn
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y divide-gray-200 bg-white ${
                    isLoading ? "blur-sm" : null
                  }`}
                >
                  {filteredKiosks.map((kiosk: Kiosk) => (
                    <tr
                      key={kiosk.id}
                      className={
                        selectedKiosks.includes(kiosk)
                          ? "bg-gray-50"
                          : undefined
                      }
                    >
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {selectedKiosks.includes(kiosk) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          value={kiosk.id}
                          checked={selectedKiosks.includes(kiosk)}
                          onChange={(e) =>
                            setSelectedKiosks(
                              e.target.checked
                                ? [...selectedKiosks, kiosk]
                                : selectedKiosks.filter(
                                    (k) => k.id !== kiosk.id
                                  )
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                          selectedKiosks.includes(kiosk)
                            ? "text-indigo-600"
                            : "text-gray-900"
                        )}
                      >
                        {kiosk.store.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                        {calculateKioskDescriptrion({
                          kioskDescriptor: kiosk.kiosk_descriptor,
                          kioskNumber: kiosk.kiosk_number,
                        })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`${calcKioskLastTxnColor(
                            kiosk.last_txn
                          )} inline-flex rounded-full px-2 text-xs font-semibold leading-5`}
                        >
                          {kiosk.last_txn
                            ? formatMinsHours(
                                differenceInMinutes(
                                  new Date(),
                                  new Date(kiosk.last_txn)
                                )
                              )
                            : "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {!isLoading && (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                {totalResults > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-medium">
                      {calcFrom({ page, limit })}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {calcTo({ page, limit, totalResults })}
                    </span>{" "}
                    of <span className="font-medium">{totalResults}</span>{" "}
                    results
                  </>
                ) : (
                  <>No results.</>
                )}
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <span
                  className="relative inline-flex items-center rounded-l-md border bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                  onClick={onPrevPage}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                {Array(totalPages)
                  .fill(null)
                  .map((_v, idx) => (
                    <span
                      key={idx}
                      aria-current="page"
                      onClick={onGotoPage(idx + 1)}
                      className={`${
                        idx + 1 === page
                          ? "bg-indigo-50 text-indigo-600"
                          : "hover:bg-gray-50"
                      } relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 cursor-pointer`}
                    >
                      {idx + 1}
                    </span>
                  ))}
                <span
                  className="relative inline-flex items-center rounded-r-md border bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                  onClick={onNextPage}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KioskList;
