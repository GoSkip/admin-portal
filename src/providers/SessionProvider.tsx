import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SessionContext, SessionContextType } from "../contexts/SessionContext";
import { Session } from "../types/session";
import { isPast } from "date-fns";

type SessionContextProps = {
  children: any;
  renderException: boolean;
};

const SessionProvider = ({
  children,
  renderException,
}: SessionContextProps): JSX.Element => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prevSession = JSON.parse(String(sessionStorage.getItem("session")));
  const pathname = location.pathname;

  const invalidSession = !session?.token_info?.token && !prevSession;

  const _setSession = (session: null | Session) => {
    sessionStorage.setItem("session", JSON.stringify(session));
    setSession(session);
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
      value={{ session: session || prevSession, setSession: _setSession }}
    >
      {!invalidSession || renderException ? children : null}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
