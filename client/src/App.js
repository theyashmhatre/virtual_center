import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Challenges from "./components/Challenges";
import Home from "./components/Home";
import Challenge from "./components/Challenge";
import Idea from "./components/Idea";
import AuthRequired from "./components/AuthRequired";

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
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="challenge" element={<AuthRequired><Challenge /></AuthRequired>} />
        <Route path="solutions" element={<AuthRequired><Idea /></AuthRequired>} />
      </Routes>
    </div>
  );
};

export default App;
