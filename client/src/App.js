import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Challenges from "./components/Challenges";
import Home from "./components/Home";
import Challenge from "./components/Challenge";
import Solutions from "./components/Idea";
import Offerings from "./components/Offerings";
import Offering from "./components/Offering";
import Solvers from "./components/Solvers";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="challenge" element={<Challenge />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="offerings" element={<Offerings />} />
        <Route path="offering" element={<Offering />} />
        <Route path="solvers" element={<Solvers />} />
      </Routes>
    </div>
  );
};

export default App;
