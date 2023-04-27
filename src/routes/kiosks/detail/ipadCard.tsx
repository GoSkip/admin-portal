import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { KioskDetailsForm } from "./index";
import TextInput from "../../../components/inputs/textInput";
import PrimaryButton from "../../../components/buttons/primary";
import SecondaryButton from "../../../components/buttons/secondary";

type IpadCardProps = {
  enterSerialNoMode: boolean;
  setEnterSerialNoMode: (value: boolean) => void;
  formState: KioskDetailsForm;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const IpadCard = ({
  enterSerialNoMode,
  setEnterSerialNoMode,
  formState,
  handleInputChange,
}: IpadCardProps): JSX.Element => {
  if (!formState.ipadSerial) {
    return (
      <form className="bg-white rounded-lg shadow-sm p-6 col-span-4 sm:col-span-3">
        <h2 className="text-xl font-medium text-gray-900">iPad Details</h2>
        <p className="mt-1 text-gray-500">
          Hardware and software details last reported to the MDM service
        </p>
        <hr className="my-4 border-gray-200" />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <label
              htmlFor="deviceName"
              className="block text-sm font-medium text-gray-700"
            >
              Device Name
            </label>
            <TextInput
              label="Device Name"
              value="Kwik-E-Mart 306-319"
              htmlId="deviceName"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="mdmName"
              className="block text-sm font-medium text-gray-700"
            >
              MDM Name
            </label>
            <TextInput
              label="MDM Name"
              value="Kwik-E-Mart 306-319"
              htmlId="mdmName"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="appVersion"
              className="block text-sm font-medium text-gray-700"
            >
              App Version
            </label>
            <TextInput
              label="App Version"
              value="1.7.2 (2314)"
              htmlId="appVersion"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="iosVersion"
              className="block text-sm font-medium text-gray-700"
            >
              iOS Version
            </label>
            <TextInput
              label="iOS Version"
              value="14.4 (Build 18D52)"
              htmlId="iosVersion"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="modelVersion"
              className="block text-sm font-medium text-gray-700"
            >
              Model Version
            </label>
            <TextInput
              label="Model Version"
              value="iPad Pro 12.9-inch (4th Generation)"
              htmlId="modelVersion"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="serialNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Serial Number
            </label>
            <TextInput
              label="Serial Number"
              value="DMPFC2WTPV03"
              htmlId="serialNumber"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="batteryLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Battery Level
            </label>
            <TextInput
              label="Battery Level"
              value="100%"
              htmlId="batteryLevel"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="ipadGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Group
            </label>
            <TextInput
              label="Group"
              value="SCO Production"
              htmlId="ipadGroup"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="ipadLastSeen"
              className="block text-sm font-medium text-gray-700"
            >
              Last Seen
            </label>
            <TextInput
              label="Last Seen"
              value="25 min ago"
              htmlId="ipadLastSeen"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="ipadLastTxn"
              className="block text-sm font-medium text-gray-700"
            >
              iPad Last Txn
            </label>
            <TextInput
              label="Last Transaction"
              value="6 min ago"
              htmlId="ipadLastTxn"
              onChange={() => {}}
              disabled
            />
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 col-span-4 sm:col-span-3">
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
        <div className="mt-4 w-1/2 grid grid-cols-4">
          {enterSerialNoMode ? (
            <>
              <div className="col-span-4 sm:col-span-3">
                <TextInput
                  label="Serial number"
                  value={formState.ipadSerial}
                  htmlId={"ipadSerial"}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-1 mt-1 ml-2">
                <PrimaryButton label="Submit" onClick={() => {}} />
              </div>
            </>
          ) : (
            <div className="col-span-4 flex justify-center">
              <SecondaryButton
                label="Enter serial number"
                onClick={() => setEnterSerialNoMode(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IpadCard;
