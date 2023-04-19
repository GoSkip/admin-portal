import { useContext, useState } from "react";
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
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import SecondaryButton from "../../../components/buttons/secondary";
import StoreDetailsCard from "./storeDetailsCard";
import MetadataCard from "./metadataCard";

type NewKioskDetailsForm = {
  kioskId: string;
  kioskDescription: string;
  terminalId: Option | null;
  mount: Option | null;
  network: Option | null;
  pinpad: Option | null;
  printer: Option | null;
  pinpadSerial: string;
  printerSerial: string;
};

const NewKioskDetails = (): JSX.Element => {
  const { session } = useContext<SessionContextType>(SessionContext);
  const [formState, setFormState] = useState<NewKioskDetailsForm>({
    kioskId: "",
    kioskDescription: "",
    terminalId: null,
    mount: null,
    network: null,
    pinpad: null,
    printer: null,
    pinpadSerial: "",
    printerSerial: "",
  });

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

  const { selectable_stores } = session;
  const params = useParams();

  const store =
    selectable_stores.find(
      (store: Store) => String(store.id) === params.storeId
    ) || emptyStore;

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
              <Link
                to="/kiosks/new"
                className="text-gray-400 hover:text-gray-500 text-xl ml-4"
              >
                New Kiosk
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
                {store.name}
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
        <div className="bg-white rounded-lg shadow-sm p-6 col-span-3">
          <h2 className="text-xl font-medium text-gray-900">iPad Details</h2>
          <p className="mt-1 text-gray-500">
            Hardware and software details last reported to the MDM service
          </p>
          <hr className="my-4 border-gray-200" />
          <div className="flex flex-col justify-center items-center">
            <ComputerDesktopIcon className="h-12 w-12 flex-shrink-0 text-blue-500 mt-8" />
            <p className="text-sm font-semibold mt-2">
              No iPad linked to this kiosk
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Get started by entering the iPad serial number
            </p>
            <div className="mt-4">
              <SecondaryButton label="Enter serial number" disabled={true} />
            </div>
          </div>
        </div>
        <MetadataCard />
      </div>
    </div>
  );
};

export default NewKioskDetails;
