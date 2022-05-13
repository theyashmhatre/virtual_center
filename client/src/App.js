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
import EditChallenge from "./pages/challenges/EditChallenge";
import FilteredChallenges from "./pages/challenges/FilteredChallenges";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreateOffering from "./pages/offerings/CreateOffering";
import EditOffering from "./pages/offerings/EditOffering";
import Offering from "./pages/offerings/Offering";
import Offerings from "./pages/offerings/Offerings";
import EditProfile from "./pages/profile/EditProfile";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/Settings";
import EditSolution from "./pages/solutions/EditSolution";
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
        <Route
          path="main/edit-offering/:offeringId"
          element={<EditOffering />}
        />
        <Route
          path="/challenge"
          element={<Navigate to="/challenge/challenges" />}
        />
        <Route
          path="/challenge/challenges/filter-by/:accountName"
          element={<FilteredChallenges />}
        />
        <Route path="challenge/dashboard" element={<Dashboard />} />
        <Route path="challenge/challenges" element={<Challenges />} />
        <Route
          path="challenge/create-challenge"
          element={<CreateChallenge />}
        />
        <Route
          path="challenge/edit-challenge/:challengeId"
          element={<EditChallenge />}
        />
        <Route path="challenge/:challengeId" element={<Challenge />} />
        <Route path="challenge/solution/:solutionId" element={<Solution />} />
        <Route
          path="challenge/edit-solution/:solutionId"
          element={<EditSolution />}
        />
        <Route path="challenge/solvers" element={<Solvers />} />
        <Route path="account/profile" element={<Profile />} />
        <Route path="account/profile/edit-profile" element={<EditProfile />} />
        <Route path="account/settings" element={<Settings />} />
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
