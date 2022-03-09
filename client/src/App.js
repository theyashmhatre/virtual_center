import { render } from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import temp from "./components/temp";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
