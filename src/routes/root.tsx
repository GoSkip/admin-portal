import Layout from "../components/layout";
import LoadingProvider from "../providers/LoadingProvider";
import SessionProvider from "../providers/SessionProvider";

const Root = (): JSX.Element => {
  return (
    <SessionProvider renderException={false}>
      <LoadingProvider>
        <Layout />
      </LoadingProvider>
    </SessionProvider>
  );
};

export default Root;
