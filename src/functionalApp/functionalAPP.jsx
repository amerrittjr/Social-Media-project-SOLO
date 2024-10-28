import { useEffect } from "react";
import { getData } from "./api";

const App = () => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>React App</h1>
    </div>
  );
};

export default App;
