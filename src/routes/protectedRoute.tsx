import { useContext, useEffect } from "react";
import { SessionContext, SessionContextType } from "@contexts/SessionContext";
import { Navigate } from "react-router-dom";
import { Session } from "@itypes/session";
import { useLocation } from "react-router-dom";

interface ProtectedRoutesProps {
  children: any;
  routeExceptions: string[];
}

const ProtectedRoutes = ({ children, routeExceptions }: ProtectedRoutesProps): JSX.Element => {
  const location = useLocation();
  const { session }: { session: Session } = useContext<SessionContextType>(SessionContext);

  let prevSession: Session | null = null;

  if (localStorage.getItem("token")) {
    prevSession = JSON.parse(String(localStorage.getItem("session")));
  } else if (sessionStorage.getItem("session")) {
    prevSession = JSON.parse(String(sessionStorage.getItem("session")));
  }

  const invalidSession = !session.token_info.token && !prevSession;

  useEffect(() => {
    if (invalidSession && location.pathname !== "/login") {
      sessionStorage.setItem("pathRedirect", location.pathname);
    }
  }, [invalidSession]);

  if (invalidSession && !routeExceptions.includes(location.pathname)) {
    sessionStorage.removeItem("pathRedirect");
    sessionStorage.setItem("pathRedirect", location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
