import { useContext } from "react";
import { SessionContext, SessionContextType } from "@contexts/SessionContext";

function requirePermissions(requiredPermissions: string[]) {
  const {
    session: { permissions },
  } = useContext<SessionContextType>(SessionContext);

  const success = !requiredPermissions.some(perm => !permissions.includes(perm));

  /**
   *
   * TODO: This hook will block the rendering of the page / element if they do not have the needed
   * permissions. Since fine-grained permissions do not exist on the backend yet,
   * this is a placeholder.
   *
   */

  return success;
}

export default requirePermissions;
