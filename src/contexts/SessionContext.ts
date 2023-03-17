import { createContext } from "react";
import { Session, emptySession } from "../types/session";

export type SessionContextType = {
  session: Session;
  setSession: (session: Session) => any;
};

export const SessionContext = createContext<SessionContextType>({
  session: emptySession,
  setSession: () => {},
});
