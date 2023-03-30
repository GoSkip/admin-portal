import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import { fetchKiosk } from "../../api/kiosk";
import { fetchStores } from "../../api/store";
import { mounts, networks, pinpads, printers } from "../../utils/enums";
import { toastError } from "../../toasts";
import { Action, Kiosk } from "../../types/kiosk";
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
import SelectSection from "./selectSection";
import InputSection from "./inputSection";

const terminals = [
  {
    key: "319",
    value: "319",
  },
  {
    key: "320",
    value: "320",
  },
  {
    key: "321",
    value: "321",
  },
  {
    key: "322",
    value: "322",
  },
  {
    key: "323",
    value: "323",
  },
  {
    key: "324",
    value: "324",
  },
  {
    key: "325",
    value: "325",
  },
];

const actorColors = new Map([
  ["device", "green"],
  ["admin", "gray"],
  ["admin portal", "gray"],
  ["kiosk app", "gray"],
  ["error", "red"],
]);

const sampleActions: Action[] = [
  {
    actor: "device",
    type: "restarted",
    timestamp: new Date(),
    metadata: "N/A",
  },
  {
    actor: "admin portal",
    type: "request restart",
    timestamp: new Date(),
    metadata: "N/A",
  },
  {
    actor: "device",
    type: "restarted",
    timestamp: new Date(),
    metadata: "N/A",
  },
  {
    actor: "kiosk app",
    type: "request restart",
    timestamp: new Date(),
    metadata: "N/A",
  },
  {
    actor: "device",
    type: "updated app",
    timestamp: new Date(),
    metadata: '{"name": "self-checkout"}',
  },
  {
    actor: "device",
    type: "installed profile",
    timestamp: new Date(),
    metadata: '{"profile_name":"Home screen..."}',
  },
  {
    actor: "device",
    type: "installed profile",
    timestamp: new Date(),
    metadata: '{"profile_name":"Home screen..."}',
  },
  {
    actor: "device",
    type: "removed profile",
    timestamp: new Date(),
    metadata: '{"profile_name":"App Lock: SCO..."}',
  },
  {
    actor: "error",
    type: "removed profile",
    timestamp: new Date(),
    metadata: '{"errors":["Device responded..."]}',
  },
];

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
  const [kiosk, setKiosk] = useState<Kiosk | null>(null);

  const [selectedTerminal, setSelectedTerminal] = useState(terminals[0]);
  const [selectedMount, setSelectedMount] = useState(mounts[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [selectedPinpad, setSelectedPinpad] = useState(pinpads[0]);
  const [selectedPrinter, setSelectedPrinter] = useState(printers[0]);

  const setValue = (key: string) => (value: any) => {
    if (kiosk === null) {
      return;
    }

    setKiosk({
      ...kiosk,
      [key]: value,
    });
  };

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
              <div className="px-4 pt-2 text-xl font-normal">Kiosk Details</div>
              <div className="px-4 pb-2 text-sm text-gray-500">
                Identifiers, accessories, and connection details
              </div>
              <hr />
              <div className="px-4 py-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  <InputSection
                    htmlId="kiosk-id"
                    label="Kiosk ID"
                    value={format(kiosk.inserted_at, "M/d/yyyy")}
                    disabled
                  />
                  <InputSection
                    htmlId="kiosk-description"
                    label="Kiosk Description"
                    value={kiosk.kiosk_descriptor}
                    onChange={setValue("kiosk_descriptor")}
                  />
                  <InputSection
                    htmlId="kiosk-inserted-at"
                    label="Kiosk Created"
                    value={kiosk.inserted_at.toLocaleString()}
                    disabled
                  />
                  <SelectSection
                    selectedItem={selectedTerminal}
                    setSelectedItem={setSelectedTerminal}
                    label="Terminal ID"
                    items={terminals}
                  />
                  <SelectSection
                    selectedItem={selectedMount}
                    setSelectedItem={setSelectedMount}
                    label="Mount"
                    items={mounts}
                  />
                  <SelectSection
                    selectedItem={selectedNetwork}
                    setSelectedItem={setSelectedNetwork}
                    label="Network"
                    items={networks}
                  />
                  <SelectSection
                    selectedItem={selectedPinpad}
                    setSelectedItem={setSelectedPinpad}
                    label="Pinpad"
                    items={pinpads}
                  />
                  <InputSection
                    htmlId="pinpad-serial"
                    label="Pinpad Serial #"
                    value={"pinpad serial no"}
                  />
                  <SelectSection
                    selectedItem={selectedPrinter}
                    setSelectedItem={setSelectedPrinter}
                    label="Printer"
                    items={printers}
                  />
                  <InputSection
                    htmlId="printer-serial"
                    label="Printer Serial #"
                    value={"printer serial no"}
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-8">
        <div className="grid grid-cols-1 gap-y-8 gap-x-8 md:grid-cols-1">
          {!!store && !!kiosk && (
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl md:col-span-2">
              <div className="px-4 pt-2 text-xl font-normal">iPad Details</div>
              <div className="px-4 pb-2 text-sm text-gray-500">
                Hardware and software details last reported to the MDM service
              </div>
              <hr />
              <div className="px-4 py-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  <InputSection
                    htmlId="device-name"
                    label="Device Name"
                    value={"Kwik-E-Mart 306-319"}
                    disabled
                  />
                  <InputSection
                    htmlId="mdm-name"
                    label="MDM Name"
                    value={"Kwik-E-Mart 306-319"}
                    disabled
                  />
                  <InputSection
                    htmlId="app-version"
                    label="App Version"
                    value={"1.7.2 (2314)"}
                    disabled
                  />
                  <InputSection
                    htmlId="ios-version"
                    label="iOS Version"
                    value={"14.4 (Build 18D52)"}
                    disabled
                  />
                  <InputSection
                    htmlId="model-version"
                    label="Model"
                    value={"iPad Pro 12.9-inch (4th Generation)"}
                    disabled
                  />
                  <InputSection
                    htmlId="serial-number"
                    label="Serial Number"
                    value={"DMPFC2WTPV03"}
                    disabled
                  />
                  <InputSection
                    htmlId="battery-level"
                    label="Battery Level"
                    value={"100%"}
                    disabled
                  />
                  <InputSection
                    htmlId="ipad-group"
                    label="Group"
                    value={"SCO Production"}
                    disabled
                  />
                  <InputSection
                    htmlId="ipad-last-seen"
                    label="Last Seen"
                    value={"25 min ago"}
                    disabled
                  />
                  <InputSection
                    htmlId="ipad-last-txn"
                    label="Last Transaction"
                    value={"6 min ago"}
                    disabled
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-8">
        {!!store && !!kiosk && (
          <div className="text-gray-600 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl grid grid-cols-4">
            <div className="col-span-1 text-left bg-gray-100 rounded-tl-xl pl-6 py-2">
              ACTOR
            </div>
            <div className="col-span-1 text-left bg-gray-100 pl-3 py-2">
              ACTION TYPE
            </div>
            <div className="col-span-1 text-left bg-gray-100 pl-3 py-2">
              TIMESTAMP
            </div>
            <div className="col-span-1 text-left bg-gray-100 rounded-tr-xl pl-3 py-2">
              METADATA
            </div>
            {sampleActions.map((action: Action) => (
              <Fragment key={action.timestamp.toString()}>
                <div className="col-span-1 bg-white border border-gray-50 py-3 pl-6 flex justify-start items-center">
                  <button
                    type="button"
                    className={classNames(
                      `bg-${actorColors.get(
                        action.actor
                      )}-100 text-${actorColors.get(action.actor)}-400`,
                      "rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm capitalize"
                    )}
                  >
                    {action.actor}
                  </button>
                </div>
                <div className="col-span-1 bg-white border border-gray-50 flex justify-start items-center py-3">
                  <div className="pl-3 capitalize font-medium">
                    {action.type}
                  </div>
                </div>
                <div className="col-span-1 bg-white border border-gray-50 flex justify-start items-center py-3">
                  <div className="pl-3">
                    {action.timestamp.toLocaleString()}
                  </div>
                </div>
                <div className="col-span-1 bg-white border border-gray-50 flex justify-start items-center py-3">
                  <div className="pl-3">{action.metadata}</div>
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kiosk;
