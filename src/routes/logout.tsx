import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "@/toasts";

const Logout = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
    localStorage.removeItem("session");
    sessionStorage.removeItem("session");
    setTimeout(() => toastSuccess("Signed out!"), 500);
  }, []);

  return <></>;
};

export default Logout;
