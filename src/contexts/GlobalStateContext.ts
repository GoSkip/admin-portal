import { createContext } from "react";

export type GlobalStateContextType = {
  filter: string;
  pendingChangesMode: boolean;
  discardPendingChangesCallback: () => void;
  savePendingChangesCallback: () => void;
  setFilter: (filter: string) => void;
  setPendingChangesMode: (pendingChangesMode: boolean) => void;
  setDiscardPendingChangesCallback: (fn: () => any) => void;
  setSavePendingChangesCallback: (fn: () => any) => void;
};

export const GlobalStateContext = createContext<GlobalStateContextType>({
  filter: "",
  pendingChangesMode: false,
  discardPendingChangesCallback: () => {},
  savePendingChangesCallback: () => {},
  setFilter: () => {},
  setPendingChangesMode: () => {},
  setDiscardPendingChangesCallback: () => {},
  setSavePendingChangesCallback: () => {},
});
