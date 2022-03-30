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
import AuthNotRequired from "./components/AuthNotRequired";
import CreateChallenge from "./components/CreateChallenge";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthNotRequired><Login /></AuthNotRequired>} />
        <Route path="register" element={<AuthNotRequired><Register /></AuthNotRequired>} />
        <Route path="home" element={<AuthRequired><Home /></AuthRequired>} />
        <Route path="challenges" element={<AuthRequired><Challenges /></AuthRequired>} />
        <Route path="create-challenge" element={<AuthRequired><CreateChallenge /></AuthRequired>} />
        <Route path="dashboard" element={<AuthRequired><Dashboard /></AuthRequired>} />
        <Route path="forgot-password" element={<AuthNotRequired><ForgotPassword /></AuthNotRequired>} />
        <Route path="reset-password/:username/:token" element={<AuthNotRequired><ResetPassword /></AuthNotRequired>} />
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
