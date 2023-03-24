import { createContext } from "react";

export type GlobalStateContextType = {
  filter: string;
  setFilter: (filter: string) => void;
};

export const GlobalStateContext = createContext<GlobalStateContextType>({
  filter: "",
  setFilter: () => {},
});
