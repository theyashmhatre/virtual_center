import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Challenges from "./components/Challenges";
import Home from "./components/Home";
import Challenge from "./components/Challenge";
import AuthRequired from "./components/AuthRequired";
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
        <Route path="home" element={<AuthRequired><Home /></AuthRequired>} />
        <Route path="challenges" element={<AuthRequired><Challenges /></AuthRequired>} />
        <Route path="dashboard" element={<AuthRequired><Dashboard /></AuthRequired>} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:username/:token" element={<ResetPassword />} />
        <Route path="challenge" element={<AuthRequired><Challenge /></AuthRequired>} />
        <Route path="solutions" element={<AuthRequired><Solutions /></AuthRequired>} />
        <Route path="offerings" element={<AuthRequired><Offerings /></AuthRequired>} />
        <Route path="offering" element={<AuthRequired><Offering /></AuthRequired>} />
        <Route path="solvers" element={<AuthRequired><Solvers /></AuthRequired>} />
      </Routes>
    </div>
  );
};

export default App;
