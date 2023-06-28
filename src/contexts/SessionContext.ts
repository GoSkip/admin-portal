import { createContext } from "react";
import { Retailer } from "@itypes/retailer";
import { Session, emptySession } from "@itypes/session";

export type SessionContextType = {
  session: Session;
  setSession: (session: Session) => void;
  setActiveRetailer: (retailer: Retailer) => void;
  setLang: (lang: string) => void;
};

export const SessionContext = createContext<SessionContextType>({
  session: emptySession,
  setSession: () => {},
  setActiveRetailer: () => {},
  setLang: () => {},
});
