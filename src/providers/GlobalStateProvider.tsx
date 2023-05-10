import { useState } from "react";
import { GlobalStateContext } from "../contexts/GlobalStateContext";

type GlobalStateContextProps = {
  children: any;
};

const GlobalStateProvider = ({
  children,
}: GlobalStateContextProps): JSX.Element => {
  const [filter, setFilter] = useState<string>("");
  const [pendingChangesMode, setPendingChangesMode] = useState<boolean>(false);
  const [discardPendingChangesCallback, setDiscardPendingChangesCallback] =
    useState<() => void>(() => {
      return () => {};
    });
  const [savePendingChangesCallback, setSavePendingChangesCallback] = useState<
    () => void
  >(() => {
    return () => {};
  });

  return (
    <GlobalStateContext.Provider
      value={{
        filter,
        pendingChangesMode,
        discardPendingChangesCallback,
        savePendingChangesCallback,
        setFilter,
        setPendingChangesMode,
        setDiscardPendingChangesCallback,
        setSavePendingChangesCallback,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
