import { render } from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Challenges from "./components/Challenges";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
