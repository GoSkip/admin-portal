import Layout from "../components/layout";
import SessionProvider from "../providers/SessionProvider";

const Root = (): JSX.Element => {
  return (
    <SessionProvider renderException={false}>
      <Layout />
    </SessionProvider>
  );
};

export default Root;
