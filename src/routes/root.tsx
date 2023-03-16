import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { SessionContext } from "../contexts/SessionContext";
import SessionProvider from "../providers/SessionProvider";

const Root = (): JSX.Element => {
  const session = useContext(SessionContext);

  return (
    <SessionProvider renderException={false}>
      <Sidebar />
      <Outlet />
    </SessionProvider>
  );
};

export default Root;
