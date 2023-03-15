import { createContext } from "react";
import { Session } from "../types/session";

export const SessionContext = createContext<Session | null>(null);
