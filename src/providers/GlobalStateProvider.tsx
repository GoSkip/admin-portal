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
  const [onDiscardPendingChangesFn, setOnDiscardPendingChangesFn] = useState<
    () => void
  >(() => {
    return () => {};
  });
  const [onSavePendingChangesFn, setOnSavePendingChangesFn] = useState<
    () => void
  >(() => {
    return () => {};
  });

  return (
    <GlobalStateContext.Provider
      value={{
        filter,
        pendingChangesMode,
        onDiscardPendingChangesFn,
        onSavePendingChangesFn,
        setFilter,
        setPendingChangesMode,
        setOnDiscardPendingChangesFn,
        setOnSavePendingChangesFn,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
