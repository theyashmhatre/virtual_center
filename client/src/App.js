import { render } from "react-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  return <Login />;
};
render(<App />, document.getElementById("root"));
