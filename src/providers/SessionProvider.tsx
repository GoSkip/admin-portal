import { useEffect, useState } from "react";
import { SessionContext } from "@contexts/SessionContext";
import { Session, emptySession } from "@itypes/session";
// @ts-ignore
import advancedStoreSort from "@utils/advancedStoreSort";
import { isPast } from "date-fns";
import { Retailer } from "@itypes/retailer";

type SessionContextProps = {
  children: any;
};

const SessionProvider = ({ children }: SessionContextProps): JSX.Element => {
  const [session, setSession] = useState<Session>(emptySession);

  let prevSession: Session | null = null;

  if (localStorage.getItem("token")) {
    prevSession = JSON.parse(String(localStorage.getItem("session")));
  } else if (sessionStorage.getItem("session")) {
    prevSession = JSON.parse(String(sessionStorage.getItem("session")));
  }

  const _setSession = (session: Session) => {
    setSession(session);

    sessionStorage.setItem("session", JSON.stringify(session));

    if (session.rememberMe) {
      localStorage.setItem("session", JSON.stringify(session));
    }
  };

  const setActiveRetailer = (retailer: Retailer) => {
    const selectable_stores = retailer.stores.flat().sort(advancedStoreSort);
    _setSession({ ...session, active_retailer: retailer, selectable_stores });
  };

  const setLang = (lang: string) => {
    localStorage.setItem("app-lang", lang);
    _setSession({ ...session, lang });
  };

  useEffect(() => {
    if (prevSession) {
      if (isPast(new Date(prevSession.token_info.expiration))) {
        localStorage.removeItem("session");
        sessionStorage.removeItem("session");
      } else {
        _setSession(prevSession);
      }
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session: session || prevSession,
        setSession: _setSession,
        setActiveRetailer,
        setLang,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
