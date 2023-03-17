import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { Session, emptySession } from "../types/session";
import { isPast } from "date-fns";
import { Retailer } from "../types/retailer";

type SessionContextProps = {
  children: any;
  renderException: boolean;
};

const SessionProvider = ({
  children,
  renderException,
}: SessionContextProps): JSX.Element => {
  const [session, setSession] = useState<Session>(emptySession);
  const navigate = useNavigate();
  const location = useLocation();
  const prevSession = JSON.parse(String(sessionStorage.getItem("session")));
  const pathname = location.pathname;

  const invalidSession = !session.token_info.token && !prevSession;

  const _setSession = (session: Session) => {
    setSession(session);
    sessionStorage.setItem("session", JSON.stringify(session));
  };

  const setActiveRetailer = (retailer: Retailer) => {
    _setSession({ ...session, active_retailer: retailer });
  };

  useEffect(() => {
    if (prevSession) {
      if (isPast(new Date(prevSession.token_info.expiration))) {
        sessionStorage.removeItem("session");
      } else {
        setSession(prevSession);
      }
    }
  }, []);

  useEffect(() => {
    if (invalidSession && pathname !== "/login") {
      sessionStorage.setItem("pathRedirect", location.pathname);
      navigate("/login");
    }
  }, [invalidSession]);

  return (
    <SessionContext.Provider
      value={{
        session: session || prevSession,
        setSession: _setSession,
        setActiveRetailer,
      }}
    >
      {!invalidSession || renderException ? children : null}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
