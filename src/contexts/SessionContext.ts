import { createContext } from "react";
import { Session } from "../types/session";

export type SessionContextType = {
  session: Session | null;
  setSession: (session: null | Session) => any;
};

export const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
});
