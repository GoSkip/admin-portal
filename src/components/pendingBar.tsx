import PrimaryButton from "./buttons/primary";
import SecondaryButton from "./buttons/secondary";
import { useContext } from "react";
import { GlobalStateContext, GlobalStateContextType } from "../contexts/GlobalStateContext";

const PendingBar = (): JSX.Element => {
  const { savePendingChangesCallback, discardPendingChangesCallback, setPendingChangesMode } =
    useContext<GlobalStateContextType>(GlobalStateContext);

  return (
    <div className="fixed z-30 flex mx-auto items-center justify-between w-full bg-black text-white h-[64px]">
      <div />
      <div>Unsaved Changes</div>
      <div className="flex items-center justify-center">
        <SecondaryButton
          additionalClasses="mr-2"
          label="Discard"
          onClick={() => {
            setPendingChangesMode(false);
            discardPendingChangesCallback();
          }}
        />
        <PrimaryButton additionalClasses="mr-4" label="Save" onClick={savePendingChangesCallback} />
      </div>
    </div>
  );
};

export default PendingBar;
