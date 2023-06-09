import { createContext } from "react";
import { Retailer } from "../types/retailer";
import { Session, emptySession } from "../types/session";
import { Store } from "../types/store";

export type SessionContextType = {
  session: Session;
  setSession: (session: Session) => void;
  setActiveRetailer: (retailer: Retailer) => void;
  setActiveStore: (store: Store) => void;
};

export const SessionContext = createContext<SessionContextType>({
  session: emptySession,
  setSession: () => {},
  setActiveRetailer: () => {},
  setActiveStore: () => {},
});
