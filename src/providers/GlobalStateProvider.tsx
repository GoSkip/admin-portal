import { useState } from "react";
import { GlobalStateContext } from "../contexts/GlobalStateContext";

type GlobalStateContextProps = {
  children: any;
};

const GlobalStateProvider = ({
  children,
}: GlobalStateContextProps): JSX.Element => {
  const [filter, setFilter] = useState<string>("");

  return (
    <GlobalStateContext.Provider value={{ filter, setFilter }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
