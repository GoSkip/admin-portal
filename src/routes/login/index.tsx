import SessionProvider from "../../providers/SessionProvider";
import Login from "./login";

const LoginMeta = (): JSX.Element => {
  return (
    <SessionProvider renderException={true}>
      <Login />
    </SessionProvider>
  ) 
}

export default LoginMeta;