import { createContext } from "react";
import { Retailer } from "../types/retailer";
import { Session, emptySession } from "../types/session";

export type SessionContextType = {
  session: Session;
  setSession: (session: Session) => void;
  setActiveRetailer: (retailer: Retailer) => void;
};

export const SessionContext = createContext<SessionContextType>({
  session: emptySession,
  setSession: () => {},
  setActiveRetailer: () => {},
});
