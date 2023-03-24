import Layout from "../components/layout";
import SessionProvider from "../providers/SessionProvider";
import GlobalStateProvider from "../providers/GlobalStateProvider";

const Root = (): JSX.Element => {
  return (
    <SessionProvider renderException={false}>
      <GlobalStateProvider>
        <Layout />
      </GlobalStateProvider>
    </SessionProvider>
  );
};

export default Root;
