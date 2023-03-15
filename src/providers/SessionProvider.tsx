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
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
