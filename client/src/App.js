import { Routes, Route } from "react-router-dom";
import AuthNotRequired from "./components/Authentication/AuthNotRequired";
import AuthRequired from "./components/Authentication/AuthRequired";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ResetPassword from "./pages/authentication/ResetPassword";
import Challenge from "./pages/challenges/Challenge";
import Challenges from "./pages/challenges/Challenges";
import CreateChallenge from "./pages/challenges/CreateChallenge";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Solutions from "./pages/Idea";
import Offerings from "./pages/offerings/Offerings";
import Offering from "./pages/offerings/Offering";
import Solvers from "./pages/Solvers";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRequired>
              <Home />
            </AuthRequired>
          }
        />
        <Route
          path="dashboard"
          element={
            <AuthRequired>
              <Dashboard />
            </AuthRequired>
          }
        />
        <Route
          path="challenges"
          element={
            <AuthRequired>
              <Challenges />
            </AuthRequired>
          }
        />
        <Route
          path="create-challenge"
          element={
            <AuthRequired>
              <CreateChallenge />
            </AuthRequired>
          }
        />
        <Route
          path="challenge/:challengeId"
          element={
            <AuthRequired>
              <Challenge />
            </AuthRequired>
          }
        />
        <Route
          path="solutions"
          element={
            <AuthRequired>
              <Solutions />
            </AuthRequired>
          }
        />
        <Route
          path="solvers"
          element={
            <AuthRequired>
              <Solvers />
            </AuthRequired>
          }
        />
        <Route
          path="offerings"
          element={
            <AuthRequired>
              <Offerings />
            </AuthRequired>
          }
        />
        <Route
          path="offering/:offeringId"
          element={
            <AuthRequired>
              <Offering />
            </AuthRequired>
          }
        />
        <Route
          path="login"
          element={
            <AuthNotRequired>
              <Login />
            </AuthNotRequired>
          }
        />
        <Route
          path="register"
          element={
            <AuthNotRequired>
              <Register />
            </AuthNotRequired>
          }
        />
        <Route
          path="forgot-password"
          element={
            <AuthNotRequired>
              <ForgotPassword />
            </AuthNotRequired>
          }
        />
        <Route
          path="reset-password/:username/:token"
          element={
            <AuthNotRequired>
              <ResetPassword />
            </AuthNotRequired>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
