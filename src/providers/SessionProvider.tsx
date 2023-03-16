import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { Session } from "../types/session";

type SessionContextProps = {
  session: Session | null;
  children: any;
};

const SessionProvider = ({
  session,
  children,
}: SessionContextProps): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!session?.loggedIn) {
      navigate("/login");
      sessionStorage.setItem("pathRedirect", location.pathname);
    }
  }, [session]);

  return (
    <SessionContext.Provider value={session}>
      {session?.loggedIn ? children : null}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
