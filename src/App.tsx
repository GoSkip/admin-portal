import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Sidebar from "./components/layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default App;
