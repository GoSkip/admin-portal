import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  SessionContext,
  SessionContextType,
} from "../../../contexts/SessionContext";
import { Store, emptyStore } from "../../../types/store";
import Select, { Option } from "../../../components/inputs/select";
import TextInput from "../../../components/inputs/textInput";
import { mounts, networks, pinpads, printers } from "../../../utils/enums";
import { fetchKiosk } from "../../../api/kiosk";
import { fetchStores } from "../../../api/store";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import SecondaryButton from "../../../components/buttons/secondary";
import PrimaryButton from "../../../components/buttons/primary";
import StoreDetailsCard from "./storeDetailsCard";
import MetadataCard from "./metadataCard";
import { toastError } from "../../../toasts";
import { Retailer } from "../../../types/retailer";
import transformKiosk from "../../../utils/transformKiosk";
import {
  LoadingContext,
  LoadingContextType,
} from "../../../contexts/LoadingContext";
import IpadCard from "./ipadCard";

export type KioskDetailsForm = {
  kioskId: string;
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

const KioskDetails = (): JSX.Element => {
  const [enterSerialNoMode, setEnterSerialNoMode] = useState(false);
  const { storeId, kioskId } = useParams();
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const {
    active_retailer,
    token_info: { token },
  } = session;
  const [store, setStore] = useState<Store | null>(null);
  const [formState, setFormState] = useState<KioskDetailsForm>({
    kioskId: "",
    kioskDescription: "",
    terminalId: null,
    mount: null,
    network: null,
    pinpad: null,
    printer: null,
    pinpadSerial: "",
    printerSerial: "",
    ipadSerial: "",
  });

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
        toastError(`Problem loading store: ${storeId}`);
      },
      onSuccess: (data) => {
        const store = data.data.retailers
          .find((retailer: Retailer) => retailer.id === active_retailer.id)
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

        setFormState((prevState) => ({
          ...prevState,
          kioskId: String(transformedData.id),
          kioskDescription: transformedData.kiosk_descriptor,
          terminalId: transformedData.terminal_id
            ? {
                key: String(transformedData.terminal_id),
                value: String(transformedData.terminal_id),
              }
            : null,
          mount: transformedData.mount
            ? mounts.find((mount) => mount.value === transformedData.mount) ||
              null
            : null,
          network: transformedData.network
            ? networks.find(
                (network) => network.value === transformedData.network
              ) || null
            : null,
          pinpad: transformedData.pinpad
            ? pinpads.find(
                (pinpad) => pinpad.value === transformedData.pinpad
              ) || null
            : null,
          printer: transformedData.printer
            ? printers.find(
                (printer) => printer.value === transformedData.printer
              ) || null
            : null,
          pinpadSerial: transformedData?.pinpad_serial ?? "",
          printerSerial: transformedData?.printer_serial ?? "",
        }));
      },
    }
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string) => (option: Option | null) => {
    if (option) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: option,
      }));
    }
  };

  useEffect(() => {
    if (kioskIsLoading || storeIsLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [kioskIsLoading, storeIsLoading]);

  console.log(formState);

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
                {store?.name ?? "N/A"}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div>
        <hr />
      </div>
      <div className="mt-6 grid grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm p-6 col-span-4 sm:col-span-3">
          <h2 className="text-xl font-medium text-gray-900">Kiosk details</h2>
          <p className="mt-1 text-gray-500">
            Identifiers, accessories, and connection details
          </p>
          <hr className="my-4 border-gray-200" />
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label
                htmlFor="kioskId"
                className="block text-sm font-medium text-gray-700"
              >
                Kiosk ID
              </label>
              <TextInput
                htmlId="kioskId"
                value={formState.kioskId}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="kioskDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Kiosk Description
              </label>
              <TextInput
                htmlId="kioskDescription"
                value={formState.kioskDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="terminalId"
                className="block text-sm font-medium text-gray-700"
              >
                Terminal ID
              </label>
              <Select
                items={[
                  { key: "123", value: "123" },
                  { key: "234", value: "234" },
                  { key: "345", value: "345" },
                ]}
                label="Terminal ID"
                selectedItem={formState.terminalId}
                setSelectedItem={handleSelectChange("terminalId")}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="mount"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="network"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="pinpad"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="pinpadSerial"
                className="block text-sm font-medium text-gray-700"
              >
                Pinpad Serial #
              </label>
              <TextInput
                htmlId="pinpadSerial"
                value={formState.pinpadSerial}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="printer"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="printerSerial"
                className="block text-sm font-medium text-gray-700"
              >
                Printer Serial #
              </label>
              <TextInput
                htmlId="printerSerial"
                value={formState.printerSerial}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <StoreDetailsCard />
      </div>
      <div className="mt-8 grid grid-cols-4">
        <IpadCard
          enterSerialNoMode={enterSerialNoMode}
          setEnterSerialNoMode={setEnterSerialNoMode}
          formState={formState}
          handleInputChange={handleInputChange}
        />
        <MetadataCard />
      </div>
    </div>
  );
};

export default KioskDetails;
