import { createContext } from "react";

export type GlobalStateContextType = {
  filter: string;
  pendingChangesMode: boolean;
  onDiscardPendingChangesFn: () => void;
  onSavePendingChangesFn: () => void;
  setFilter: (filter: string) => void;
  setPendingChangesMode: (pendingChangesMode: boolean) => void;
  setOnDiscardPendingChangesFn: (fn: () => any) => void;
  setOnSavePendingChangesFn: (fn: () => any) => void;
};

export const GlobalStateContext = createContext<GlobalStateContextType>({
  filter: "",
  pendingChangesMode: false,
  onDiscardPendingChangesFn: () => {},
  onSavePendingChangesFn: () => {},
  setFilter: () => {},
  setPendingChangesMode: () => {},
  setOnDiscardPendingChangesFn: () => {},
  setOnSavePendingChangesFn: () => {},
});
