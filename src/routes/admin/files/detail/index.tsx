import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { SessionContext, SessionContextType } from "../../../../contexts/SessionContext";
import { GlobalStateContext, GlobalStateContextType } from "../../../../contexts/GlobalStateContext";
import { Store } from "../../../../types/store";
import Select, { Option } from "../../../../components/inputs/select";
import TextInput from "../../../../components/inputs/textInput";
import { mounts, networks, pinpads, printers } from "../../../../utils/enums";
import { UpdateKioskPayloadParams, UpdateKioskQueryParams, fetchKiosk, updateKiosk } from "../../../../api/kiosk";
import { fetchStores } from "../../../../api/store";
import StoreDetailsCard from "./storeDetailsCard";
import MetadataCard from "./metadataCard";
import { toastError, toastSuccess } from "../../../../toasts";
import { Retailer } from "../../../../types/retailer";
import transformKiosk from "../../../../utils/transformKiosk";
import { LoadingContext, LoadingContextType } from "../../../../contexts/LoadingContext";
import ActionsCard, { TaxStrategyType } from "./actionsCard";
import { fetchTerminals } from "../../../../api/terminal";
import Dropdown, { DropdownItemType } from "../../../../components/dropdown";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { TwoLineInfo } from "../../../../components/data/two-line-info";
import Breadcrumbs from "../../../../components/breadcrumbs";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { fetchFile } from "../../../../api/file";

const appIdentifier = import.meta.env.PROD ? "com.goskip.Self-Checkout" : "com.goskip.Self-Checkout.sandbox";

export type FileDetailsForm = {
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

const emptyFormState: FileDetailsForm = {
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

const emptyTaxStrategies: TaxStrategyType[] = [
  {
    id: "1",
    value: "3",
  },
  {
    id: "3",
    value: "35",
  },
  {
    id: "4",
    value: "54",
  },
];

const FileDetails = (): JSX.Element => {
  const allowAxiosRequests = false;
  const [enterSerialNoMode, setEnterSerialNoMode] = useState(false);
  const [terminalOptions, setTerminalOptions] = useState<Option[]>([]);
  const { storeId, fileId } = useParams();
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { setPendingChangesMode, pendingChangesMode, setDiscardPendingChangesCallback, setSavePendingChangesCallback } =
    useContext<GlobalStateContextType>(GlobalStateContext);
  const {
    active_retailer,
    token_info: { token },
  } = session;
  const [store, setStore] = useState<Store | null>(null);
  const [defaultFormState, setDefaultFormState] = useState<FileDetailsForm>(emptyFormState);
  const [formState, setFormState] = useState<FileDetailsForm>(emptyFormState);
  const [kioskMetadata, setKioskMetadata] = useState<KioskMetadata>({
    insertedAt: null,
    updatedAt: null,
  });

  const { isFetching: storeIsFetching } = useQuery(
    ["store", storeId],
    () =>
      fetchStores({
        jwt: token,
        storeIds: [Number(storeId)],
      }),
    {
      enabled: !!fileId && !!storeId && !!token,
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
      enabled: !!fileId && !!storeId && !!token && allowAxiosRequests,
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
    ["kiosk", storeId, fileId],
    () =>
      fetchKiosk({
        jwt: token,
        storeId: Number(storeId),
        kioskId: Number(fileId),
      }),
    {
      enabled: !!fileId && !!storeId && !!token && allowAxiosRequests,
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
        toastError(`Problem loading kiosk: ${fileId}.`);
      },
      onSuccess: data => {
        const transformedData = transformKiosk(data.data);

        const newFormState: FileDetailsForm = {
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

        setDefaultFormState(newFormState);
        setFormState(newFormState);
        setKioskMetadata({
          insertedAt: new Date(data.data.inserted_at),
          updatedAt: new Date(data.data.updated_at),
        });
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

  const isLoading = kioskIsFetching || storeIsFetching || terminalsIsFetching || mutationIsLoading;

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
      kiosk_id: Number(fileId),
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

  return (
    <div className="w-full h-auto">
      <div className="grid grid-cols-4">
        <div className="col-span-4 sm:col-span-3">
          <Breadcrumbs
            root={{ target: "/admin/files", label: "Files" }}
            branches={[{ target: "#", label: "View Details" }]}
            righthandComponent={<Dropdown items={actionsDropdownItems} label="Actions" />}
          />
          <div>
            <hr />
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4">
        <div className="bg-white rounded-lg shadow p-5 col-span-4 sm:col-span-3">
          <div className="grid grid-cols-6 gap-4">
            <TwoLineInfo className="col-span-3" label="File type" value="Products (NAXML)"></TwoLineInfo>
            <TwoLineInfo className="col-span-3" label="Status" value="Success" valueColor="success"></TwoLineInfo>
            {true && (
              <>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-coolGray-500">Items</span>
                </div>
                <div className="col-span-4">
                  <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between gap-4 p-3 text-coolGray-900 text-sm leading-6">
                      <div className="flex flex-1 gap-2 items-center">
                        <CheckCircleIcon className="h-auto w-5 flex-shrink-0 text-success" aria-hidden="true" />
                        <div className="flex min-w-0 flex-1 gap-2">
                          <span className="truncate">Items in file</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-gray-400">28</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {true && (
              <>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-coolGray-500">File issues</span>
                </div>
                <div className="col-span-4">
                  <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between gap-4 p-3 text-coolGray-900 text-sm leading-6">
                      <div className="flex flex-1 gap-2 items-center">
                        <ExclamationCircleIcon className="h-auto w-5 flex-shrink-0 text-error" aria-hidden="true" />
                        <div className="flex min-w-0 flex-1 gap-2">
                          <span className="truncate">Items ignored</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-gray-400">28</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <StoreDetailsCard store={store} />
      </div>
      <div className="mt-4 grid grid-cols-4">
        <ActionsCard taxStrategies={emptyTaxStrategies} />
        <MetadataCard />
      </div>
    </div>
  );
};

export default FileDetails;
