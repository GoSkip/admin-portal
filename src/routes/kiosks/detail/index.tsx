import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { SessionContext, SessionContextType } from "../../../contexts/SessionContext";
import { GlobalStateContext, GlobalStateContextType } from "../../../contexts/GlobalStateContext";
import { Store } from "../../../types/store";
import Select, { Option } from "../../../components/inputs/select";
import TextInput from "../../../components/inputs/textInput";
import { mounts, networks, pinpads, printers } from "../../../utils/enums";
import {
  UpdateKioskPayloadParams,
  UpdateKioskQueryParams,
  fetchKiosk,
  fetchKioskIpad,
  fetchKioskIpadLogs,
  updateKiosk,
} from "../../../api/kiosk";
import { fetchStores } from "../../../api/store";
import StoreDetailsCard from "../../../components/cards/storeDetailsCard";
import MetadataCard from "./metadataCard";
import { toastError, toastSuccess } from "../../../toasts";
import { Retailer } from "../../../types/retailer";
import Breadcrumbs from "../../../components/breadcrumbs";
import transformKiosk from "../../../utils/transformKiosk";
import { LoadingContext, LoadingContextType } from "../../../contexts/LoadingContext";
import IpadCard from "./ipadCard";
import ActionsCard from "./actionsCard";
import { fetchTerminals } from "../../../api/terminal";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import Dropdown, { DropdownItemType } from "../../../components/dropdown";
import { Action, Ipad } from "../../../types/kiosk";

const appIdentifier = import.meta.env.PROD ? "com.goskip.Self-Checkout" : "com.goskip.Self-Checkout.sandbox";

export type KioskDetailsForm = {
  kioskNumber: string;
  kioskDescription: string;
  terminalId: Option | null;
  mount: Option | null;
  network: Option | null;
  pinpad: Option | null;
  printer: Option | null;
  pinpadSerial: string;
  printerSerial: string;
  ipadSerial: string;
};

export type KioskUpdateFormProps = {
  queryParams: UpdateKioskQueryParams;
  payloadParams: UpdateKioskPayloadParams;
};

export type KioskMetadata = {
  insertedAt: Date | null;
  updatedAt: Date | null;
};

const emptyFormState: KioskDetailsForm = {
  kioskNumber: "1",
  kioskDescription: "",
  terminalId: null,
  mount: null,
  network: null,
  pinpad: null,
  printer: null,
  pinpadSerial: "",
  printerSerial: "",
  ipadSerial: "",
};

const emptyIpad: Ipad = {
  device_name: "",
  mdm_name: "",
  app_version: "",
  ios_version: "",
  model: "",
  serial: "",
  battery_level: "",
  group: "",
};

const actionsDropdownItems: DropdownItemType[] = [
  {
    name: "Restart iPad",
    value: "restart-ipad",
    icon: ArrowDownTrayIcon,
    onClick: () => {},
  },
  {
    name: "Push assigned apps",
    value: "push-assigned-apps",
    icon: ArrowDownTrayIcon,
    onClick: () => {},
  },
  {
    name: "Refresh iPad details",
    value: "refresh-ipad-details",
    icon: ArrowDownTrayIcon,
    onClick: () => {},
  },
];

const KioskDetails = (): JSX.Element => {
  const [enterSerialNoMode, setEnterSerialNoMode] = useState(false);
  const [terminalOptions, setTerminalOptions] = useState<Option[]>([]);
  const { storeId, kioskId } = useParams();
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { setPendingChangesMode, pendingChangesMode, setDiscardPendingChangesCallback, setSavePendingChangesCallback } =
    useContext<GlobalStateContextType>(GlobalStateContext);
  const {
    active_retailer,
    token_info: { token },
  } = session;
  const [store, setStore] = useState<Store | null>(null);
  const [defaultFormState, setDefaultFormState] = useState<KioskDetailsForm>(emptyFormState);
  const [formState, setFormState] = useState<KioskDetailsForm>(emptyFormState);
  const [kioskMetadata, setKioskMetadata] = useState<KioskMetadata>({
    insertedAt: null,
    updatedAt: null,
  });
  const [ipad, setIpad] = useState<Ipad>(emptyIpad);
  const [ipadLogs, setIpadLogs] = useState<Action[]>([]);

  const { isFetching: storeIsFetching } = useQuery(
    ["store", storeId],
    () =>
      fetchStores({
        jwt: token,
        storeIds: [Number(storeId)],
      }),
    {
      enabled: !!kioskId && !!storeId && !!token,
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
        toastError(`Problem loading store: ${storeId}`);
      },
      onSuccess: data => {
        let store = data.data.retailers
          .find((retailer: Retailer) => retailer.id === active_retailer.id)
          .stores.find((store: Store) => store.id === Number(storeId));

        store.dayClose = store.day_close;
        delete store.day_close;

        setStore(store);
      },
    }
  );

  const { isFetching: terminalsIsFetching } = useQuery(
    ["terminals", storeId],
    () =>
      fetchTerminals({
        jwt: token,
        page: 1,
        limit: 100,
        storeId: Number(storeId),
      }),
    {
      enabled: !!kioskId && !!storeId && !!token,
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
        toastError(`Problem loading terminals: ${storeId}`);
      },
      onSuccess: data => {
        const terminalOptions: Option[] = data.data.terminals.map((terminal: { id: number; store_id: number }) => ({
          key: String(terminal.id),
          value: String(terminal.id),
        }));

        setTerminalOptions(terminalOptions);
      },
    }
  );

  const { isFetching: kioskIsFetching } = useQuery(
    ["kiosk", storeId, kioskId],
    () =>
      fetchKiosk({
        jwt: token,
        storeId: Number(storeId),
        kioskId: Number(kioskId),
      }),
    {
      enabled: !!kioskId && !!storeId && !!token,
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
        toastError(`Problem loading kiosk: ${kioskId}.`);
      },
      onSuccess: data => {
        const transformedData = transformKiosk(data.data);

        const newFormState: KioskDetailsForm = {
          ...defaultFormState,
          kioskNumber: String(transformedData.kiosk_number),
          kioskDescription: transformedData.kiosk_descriptor,
          terminalId: transformedData.terminal_id
            ? {
                key: String(transformedData.terminal_id),
                value: String(transformedData.terminal_id),
              }
            : null,
          mount: transformedData.mount ? mounts.find(mount => mount.value === transformedData.mount) || null : null,
          network: transformedData.network
            ? networks.find(network => network.value === transformedData.network) || null
            : null,
          pinpad: transformedData.pinpad
            ? pinpads.find(pinpad => pinpad.value === transformedData.pinpad) || null
            : null,
          printer: transformedData.printer
            ? printers.find(printer => printer.value === transformedData.printer) || null
            : null,
          pinpadSerial: transformedData?.pinpad_serial ?? "",
          printerSerial: transformedData?.printer_serial ?? "",
          ipadSerial: transformedData?.ipad_serial ?? "",
        };

        setIpad(prevState => ({
          ...prevState,
          last_txn: new Date(data.data.last_txn),
        }));
        setDefaultFormState(newFormState);
        setFormState(newFormState);
        setKioskMetadata({
          insertedAt: new Date(data.data.inserted_at),
          updatedAt: new Date(data.data.updated_at),
        });
      },
    }
  );

  const { isFetching: ipadIsFetching } = useQuery(
    ["ipad", formState.ipadSerial],
    () =>
      fetchKioskIpad({
        jwt: token,
        serialNumber: formState.ipadSerial,
        appIdentifier,
      }),
    {
      enabled: !!kioskId && !!storeId && !!token && !!formState.ipadSerial,
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
        toastError(`Problem loading iPad: ${formState.ipadSerial}`);
        setIpad(emptyIpad);
        setFormState(defaultFormState);
        setPendingChangesMode(false);
      },
      onSuccess: ({
        data: { device_name, mdm_name, app_version, ios_version, model, serial, battery_level, group, last_seen },
      }) => {
        const ipad: Ipad = {
          device_name,
          mdm_name,
          app_version,
          ios_version,
          model,
          serial,
          battery_level,
          group,
          last_seen: new Date(last_seen),
        };

        setIpad(prevState => ({
          ...prevState,
          ...ipad,
        }));
      },
    }
  );

  const { isFetching: ipadLogsIsFetching } = useQuery(
    ["ipad_logs", formState.ipadSerial],
    () =>
      fetchKioskIpadLogs({
        jwt: token,
        serialNumber: formState.ipadSerial,
      }),
    {
      enabled: !!kioskId && !!storeId && !!token && !!formState.ipadSerial,
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
        toastError(`Problem loading logs for iPad: ${formState.ipadSerial}`);
      },
      onSuccess: ({ data: { logs } }) => {
        const formattedLogs: Action[] = logs.map((log: any) => ({
          actor: log.actor,
          type: log.action_type,
          timestamp: new Date(log.timestamp),
          metadata: log.metadata,
        }));

        setIpadLogs(formattedLogs);
      },
    }
  );

  const { mutate, isLoading: mutationIsLoading } = useMutation({
    mutationFn: (props: KioskUpdateFormProps) => updateKiosk(props.queryParams, props.payloadParams),
    onError: (error: any) => {
      console.error(error);
      toastError("Problem updating kiosk.");
    },
    onSuccess: () => {
      setPendingChangesMode(false);
      setDefaultFormState(formState);
      toastSuccess("Successfully updated kiosk!");
    },
  });

  const onSubmitSerialNo = (serialNo: string) => {
    if (!pendingChangesMode) {
      setPendingChangesMode(true);
    }

    setFormState((prevState: any) => ({
      ...prevState,
      ipadSerial: serialNo,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!pendingChangesMode) {
      setPendingChangesMode(true);
    }
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string) => (option: Option | null) => {
    if (option) {
      if (!pendingChangesMode) {
        setPendingChangesMode(true);
      }
      setFormState(prevState => ({
        ...prevState,
        [name]: option,
      }));
    }
  };

  const isLoading =
    kioskIsFetching ||
    storeIsFetching ||
    terminalsIsFetching ||
    ipadIsFetching ||
    ipadLogsIsFetching ||
    mutationIsLoading;

  useEffect(() => {
    if (isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    setDiscardPendingChangesCallback(() => () => {
      setFormState(defaultFormState);
    });
  }, [defaultFormState]);

  useEffect(() => {
    let payload: UpdateKioskPayloadParams = {
      kiosk_id: Number(kioskId),
    };

    if (formState.kioskNumber) {
      payload = { ...payload, kiosk_number: Number(formState.kioskNumber) };
    }

    if (formState.kioskDescription) {
      payload = { ...payload, kiosk_descriptor: formState.kioskDescription };
    }

    if (formState.terminalId) {
      payload = { ...payload, terminal_id: Number(formState.terminalId.value) };
    }

    if (formState.mount) {
      payload = { ...payload, mount: formState.mount.value };
    }

    if (formState.network) {
      payload = { ...payload, network: formState.network.value };
    }

    if (formState.pinpad) {
      payload = { ...payload, pinpad: formState.pinpad.value };
    }

    if (formState.printer) {
      payload = { ...payload, printer: formState.printer.value };
    }

    if (formState.pinpadSerial) {
      payload = { ...payload, pinpad_serial: formState.pinpadSerial };
    }

    if (formState.printerSerial) {
      payload = { ...payload, printer_serial: formState.printerSerial };
    }

    if (formState.ipadSerial) {
      payload = { ...payload, ipad_serial: formState.ipadSerial };
    }

    setSavePendingChangesCallback(() => () => {
      if (formState.kioskNumber === "" || isNaN(Number(formState.kioskNumber)) || Number(formState.kioskNumber) === 0) {
        toastError("Kiosk number must be an integer greater than 0.");
        return;
      }

      mutate({
        queryParams: {
          jwt: session.token_info.token,
          storeId: Number(storeId),
        },
        payloadParams: payload,
      });
    });
  }, [formState]);

  return (
    <div className="w-full h-auto">
      <div className="grid grid-cols-4">
        <div className="col-span-4 sm:col-span-3">
          <Breadcrumbs
            root={{ target: "/kiosks", label: "Kiosks" }}
            branches={[
              {
                target: "#",
                label: `${store?.name ?? "N/A"} - ${defaultFormState.kioskNumber}`,
              },
            ]}
            righthandComponent={<Dropdown items={actionsDropdownItems} label="Actions" />}
          />
          <div>
            <hr />
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm p-6 col-span-4 sm:col-span-3">
          <h2 className="text-xl font-medium text-gray-900">Kiosk details</h2>
          <p className="mt-1 text-gray-500">Identifiers, accessories, and connection details</p>
          <hr className="my-4 border-gray-200" />
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label htmlFor="kioskNumber" className="block text-sm font-medium text-gray-700">
                Kiosk Number
              </label>
              <TextInput htmlId="kioskNumber" value={String(formState.kioskNumber)} onChange={handleInputChange} />
            </div>
            <div className="col-span-2">
              <label htmlFor="kioskDescription" className="block text-sm font-medium text-gray-700">
                Kiosk Description
              </label>
              <TextInput htmlId="kioskDescription" value={formState.kioskDescription} onChange={handleInputChange} />
            </div>
            <div className="col-span-1">
              <label htmlFor="terminalId" className="block text-sm font-medium text-gray-700">
                Terminal ID
              </label>
              <Select
                items={terminalOptions}
                label="Terminal ID"
                selectedItem={formState.terminalId}
                setSelectedItem={handleSelectChange("terminalId")}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="mount" className="block text-sm font-medium text-gray-700">
                Mount
              </label>
              <Select
                label="Mount"
                items={mounts}
                selectedItem={formState.mount}
                setSelectedItem={handleSelectChange("mount")}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="network" className="block text-sm font-medium text-gray-700">
                Network
              </label>
              <Select
                label="Network"
                items={networks}
                selectedItem={formState.network}
                setSelectedItem={handleSelectChange("network")}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="pinpad" className="block text-sm font-medium text-gray-700">
                Pinpad
              </label>
              <Select
                label="Pinpad"
                items={pinpads}
                selectedItem={formState.pinpad}
                setSelectedItem={handleSelectChange("pinpad")}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="pinpadSerial" className="block text-sm font-medium text-gray-700">
                Pinpad Serial #
              </label>
              <TextInput htmlId="pinpadSerial" value={formState.pinpadSerial} onChange={handleInputChange} />
            </div>
            <div className="col-span-2">
              <label htmlFor="printer" className="block text-sm font-medium text-gray-700">
                Printer
              </label>
              <Select
                label="Printer"
                items={printers}
                selectedItem={formState.printer}
                setSelectedItem={handleSelectChange("printer")}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="printerSerial" className="block text-sm font-medium text-gray-700">
                Printer Serial #
              </label>
              <TextInput htmlId="printerSerial" value={formState.printerSerial} onChange={handleInputChange} />
            </div>
          </div>
        </div>
        <StoreDetailsCard store={store} />
      </div>
      <div className="mt-4 grid grid-cols-4">
        <IpadCard
          enterSerialNoMode={enterSerialNoMode}
          setEnterSerialNoMode={setEnterSerialNoMode}
          formState={formState}
          onSubmitSerialNo={onSubmitSerialNo}
          ipad={ipad}
        />
        <MetadataCard kioskMetadata={kioskMetadata} />
        <ActionsCard actions={ipadLogs} />
      </div>
    </div>
  );
};

export default KioskDetails;
