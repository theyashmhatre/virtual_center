import { Navigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ResetPassword from "./pages/authentication/ResetPassword";
import Challenge from "./pages/challenges/Challenge";
import Challenges from "./pages/challenges/Challenges";
import CreateChallenge from "./pages/challenges/CreateChallenge";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreateOffering from "./pages/offerings/CreateOffering";
import Offering from "./pages/offerings/Offering";
import Offerings from "./pages/offerings/Offerings";
import Solution from "./pages/solutions/Solution";
import Solvers from "./pages/Solvers";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Home />} />
        <Route path="main/create-offering" element={<CreateOffering />} />
        <Route path="main/offerings" element={<Offerings />} />
        <Route path="main/offering/:offeringId" element={<Offering />} />
        <Route path="/challenge" element={<Navigate to="/challenge/challenges" />} />
        <Route path="challenge/dashboard" element={<Dashboard />} />
        <Route path="challenge/challenges" element={<Challenges />} />
        <Route
          path="challenge/create-challenge"
          element={<CreateChallenge />}
        />
        <Route path="challenge/:challengeId" element={<Challenge />} />
        <Route path="challenge/solution/:solutionId" element={<Solution />} />
        <Route path="challenge/solvers" element={<Solvers />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="reset-password/:username/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
