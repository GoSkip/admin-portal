import { useState } from "react";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import TextInput from "@components/inputs/textInput";
import PrimaryButton from "@components/buttons/primary";
import SecondaryButton from "@components/buttons/secondary";
import { Ipad } from "@itypes/kiosk";
import { KioskDetailsForm } from ".";
import { differenceInMinutes } from "date-fns";
import formatMinsHours from "@utils/formatMinsHours";

type IpadCardProps = {
  enterSerialNoMode: boolean;
  setEnterSerialNoMode: (value: boolean) => void;
  onSubmitSerialNo: (serialNo: string) => void;
  formState: KioskDetailsForm;
  ipad: Ipad;
};

const IpadCard = ({
  enterSerialNoMode,
  setEnterSerialNoMode,
  onSubmitSerialNo,
  formState,
  ipad,
}: IpadCardProps): JSX.Element => {
  const [serialNo, setSerialNo] = useState<string>("");

  if (formState.ipadSerial) {
    return (
      <form className="bg-white rounded-lg shadow-sm p-6 col-span-4 sm:col-span-3">
        <h2 className="text-xl font-medium text-gray-900">iPad Details</h2>
        <p className="mt-1 text-gray-500">Hardware and software details last reported to the MDM service</p>
        <hr className="my-4 border-gray-200" />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700">
              Device Name
            </label>
            <TextInput label="Device Name" value={ipad.device_name} htmlId="deviceName" onChange={() => {}} disabled />
          </div>
          <div className="col-span-2">
            <label htmlFor="mdmName" className="block text-sm font-medium text-gray-700">
              MDM Name
            </label>
            <TextInput label="MDM Name" value={ipad.mdm_name} htmlId="mdmName" onChange={() => {}} disabled />
          </div>
          <div className="col-span-2">
            <label htmlFor="appVersion" className="block text-sm font-medium text-gray-700">
              App Version
            </label>
            <TextInput label="App Version" value={ipad.app_version} htmlId="appVersion" onChange={() => {}} disabled />
          </div>
          <div className="col-span-2">
            <label htmlFor="iosVersion" className="block text-sm font-medium text-gray-700">
              iOS Version
            </label>
            <TextInput label="iOS Version" value={ipad.ios_version} htmlId="iosVersion" onChange={() => {}} disabled />
          </div>
          <div className="col-span-2">
            <label htmlFor="modelVersion" className="block text-sm font-medium text-gray-700">
              Model Version
            </label>
            <TextInput label="Model Version" value={ipad.model} htmlId="modelVersion" onChange={() => {}} disabled />
          </div>
          <div className="col-span-2">
            <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
              Serial Number
            </label>
            <TextInput label="Serial Number" value={ipad.serial} htmlId="serialNumber" onChange={() => {}} disabled />
          </div>
          <div className="col-span-2">
            <label htmlFor="batteryLevel" className="block text-sm font-medium text-gray-700">
              Battery Level
            </label>
            <TextInput
              label="Battery Level"
              value={ipad.battery_level}
              htmlId="batteryLevel"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="ipadGroup" className="block text-sm font-medium text-gray-700">
              Group
            </label>
            <TextInput label="Group" value={ipad.group} htmlId="ipadGroup" onChange={() => {}} disabled />
          </div>
          <div className="col-span-2">
            <label htmlFor="ipadLastSeen" className="block text-sm font-medium text-gray-700">
              Last Seen
            </label>
            <TextInput
              label="Last Seen"
              value={ipad.last_seen ? `${formatMinsHours(differenceInMinutes(new Date(), ipad.last_seen))} ago` : ""}
              htmlId="ipadLastSeen"
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="ipadLastTxn" className="block text-sm font-medium text-gray-700">
              iPad Last Txn
            </label>
            <TextInput
              label="Last Transaction"
              value={ipad.last_txn ? `${formatMinsHours(differenceInMinutes(new Date(), ipad.last_txn))} ago` : ""}
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
      <p className="mt-1 text-gray-500">Hardware and software details last reported to the MDM service</p>
      <hr className="my-4 border-gray-200" />
      <div className="flex flex-col justify-center items-center">
        <ComputerDesktopIcon className="h-12 w-12 flex-shrink-0 text-blue-500 mt-8" />
        <p className="text-sm font-semibold mt-2">No iPad linked to this kiosk</p>
        <p className="text-sm text-gray-500 mt-2">Get started by entering the iPad serial number</p>
        <div className="mt-4 w-1/2 grid grid-cols-4">
          {enterSerialNoMode ? (
            <>
              <div className="col-span-4 sm:col-span-3">
                <TextInput
                  label="Serial number"
                  value={serialNo}
                  htmlId={"ipadSerial"}
                  onChange={e => setSerialNo(e.target.value)}
                />
              </div>
              <div className="col-span-1 mt-1 ml-2">
                <PrimaryButton label="Submit" onClick={() => onSubmitSerialNo(serialNo)} />
              </div>
            </>
          ) : (
            <div className="col-span-4 flex justify-center">
              <SecondaryButton label="Enter serial number" onClick={() => setEnterSerialNoMode(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IpadCard;
