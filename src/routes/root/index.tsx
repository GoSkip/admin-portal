import SessionProvider from "../../providers/SessionProvider";
import Main from "./main";

const Index = (): JSX.Element => {
  return (
    <SessionProvider renderException={false}>
      <Main />
    </SessionProvider>
  );
};

export default Index;
