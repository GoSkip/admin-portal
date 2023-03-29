import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { fetchKiosk } from "../../api/kiosk";
import { fetchStores } from "../../api/store";
import { Listbox, Transition } from "@headlessui/react";
import { mounts, networks, pinpads, printers } from "../../utils/enums";
import { toastError } from "../../toasts";
import { Kiosk } from "../../types/kiosk";
import classNames from "classnames";
import {
  SessionContext,
  SessionContextType,
} from "../../contexts/SessionContext";
import {
  LoadingContext,
  LoadingContextType,
} from "../../contexts/LoadingContext";
import { Retailer } from "../../types/retailer";
import { Store } from "../../types/store";
import transformKiosk from "../../utils/transformKiosk";
import { BeatLoader } from "react-spinners";

const terminalIdsList = [319, 320, 321, 322, 323, 324, 325];
const textInputClasses =
  "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm";
const actorColorMap = {
  device: "green",
  admin: "gray",
  "admin portal": "gray",
  "kiosk app": "gray",
  error: "red",
};

const Kiosk = (): JSX.Element => {
  const [store, setStore] = useState<Store | null>(null);
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const {
    active_retailer: { id: activeRetailerId },
    token_info: { token },
  } = session;
  const { storeId, kioskId } = useParams<{
    storeId: string;
    kioskId: string;
  }>();
  const [selectedTerminalId, setSelectedTerminalId] = useState(
    terminalIdsList[0]
  );
  const [kiosk, setKiosk] = useState<Kiosk | null>(null);

  const [selectedMount, setSelectedMount] = useState(mounts[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [selectedPinpad, setSelectedPinpad] = useState(pinpads[0]);
  const [selectedPrinter, setSelectedPrinter] = useState(printers[0]);

  const { isLoading: storeIsLoading } = useQuery(
    ["store", storeId],
    () =>
      fetchStores({
        jwt: token,
        storeIds: [Number(storeId)],
      }),
    {
      enabled: !!kioskId && !!storeId && !!token,
      onError: (error) => {
        console.error(error);
        toastError(`Problem loading store: ${storeId}.`);
      },
      onSuccess: (data) => {
        const store = data.data.retailers
          .find((retailer: Retailer) => retailer.id === activeRetailerId)
          .stores.find((store: Store) => store.id === Number(storeId));

        setStore(store);
      },
    }
  );

  const { isLoading: kioskIsLoading } = useQuery(
    ["kiosk", storeId, kioskId],
    () =>
      fetchKiosk({
        jwt: token,
        storeId: Number(storeId),
        kioskId: Number(kioskId),
      }),
    {
      enabled: !!kioskId && !!storeId && !!token,
      onError: (error) => {
        console.error(error);
        toastError(`Problem loading kiosk: ${kioskId}.`);
      },
      onSuccess: (data) => {
        const transformedData = transformKiosk(data.data);
        setKiosk(transformedData);
      },
    }
  );

  useEffect(() => {
    setIsLoading(storeIsLoading || kioskIsLoading);
  }, [storeIsLoading, kioskIsLoading]);

  return (
    <div className="w-full h-full">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4 pb-6">
          <li>
            <div>
              <Link
                to="/kiosks"
                className="text-gray-400 hover:text-gray-500 text-xl"
              >
                Kiosks
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link to="#" className="ml-4 text-xl">
                {!!store && !!kiosk ? (
                  `${store.name} - Kiosk ${kiosk.kiosk_number}`
                ) : (
                  <BeatLoader size={15} margin={2} />
                )}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div>
        <hr />
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-8">
        <div className="grid grid-cols-1 gap-y-8 gap-x-8 md:grid-cols-1">
          {!!store && !!kiosk && (
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="kiosk-id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Kiosk ID
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="kiosk-id"
                        id="kiosk-id"
                        value={format(kiosk?.inserted_at, "M/d/yyyy")}
                        disabled
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-4"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="kiosk-description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Kiosk Description
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="kiosk-description"
                        id="kiosk-description"
                        value={kiosk.kiosk_descriptor}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-4"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="kiosk-inserted-at"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Kiosk Created
                    </label>
                    <div className="mt-1">
                      <input
                        disabled
                        type="text"
                        name="kiosk-inserted-at"
                        id="kiosk-inserted-at"
                        value={kiosk.inserted_at.toLocaleString()}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-500 py-2 px-4"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <Listbox
                      value={selectedTerminalId}
                      onChange={setSelectedTerminalId}
                    >
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium text-gray-700">
                            Terminal ID
                          </Listbox.Label>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
                              <span className="block truncate">
                                {selectedTerminalId}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {terminalIdsList.map((id) => (
                                  <Listbox.Option
                                    key={id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-blue-600"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={id}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "block truncate"
                                          )}
                                        >
                                          {id}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-blue-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
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
                  <div className="sm:col-span-1">
                    <Listbox value={selectedMount} onChange={setSelectedMount}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium text-gray-700">
                            Mount
                          </Listbox.Label>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
                              <span className="block truncate capitalize">
                                {selectedMount.value}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {mounts.map((mount) => (
                                  <Listbox.Option
                                    key={mount.key}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-blue-600"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9 capitalize"
                                      )
                                    }
                                    value={mount}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "block truncate capitalize"
                                          )}
                                        >
                                          {mount.value}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "bg-blue-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
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
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kiosk;
