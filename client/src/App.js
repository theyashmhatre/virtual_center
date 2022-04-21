import { Routes, Route,Navigate } from "react-router-dom";
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
import Offerings from "./pages/offerings/Offerings";
import Offering from "./pages/offerings/Offering";
import Solution from "./pages/solutions/Solution";
import Solvers from "./pages/Solvers";
import Side from "./components/Sidebar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const fnLoggedInfo=(bool)=>{
    setIsLoggedIn(bool)
  }
  return (
     <>
     {
       !isLoggedIn ?
       <div>
        <Routes>
        <Route
          path="login"
          element={
            <AuthNotRequired>
              <Login fnLoggedInfo={fnLoggedInfo} />
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
          path="*"
          element={
           <Navigate to="login" />
          }
        />
      
        </Routes>
       </div>
     :
    <div style={{width:'100%',minHeight:"100vh"}}>
    <div style={{width:'6%',display:'inline-block' , height:'100vh' , float:"left"}}><Side/></div>
    <div style={{width:'94%',display:'inline-block'}}>

      <Navbar/>
    
        
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
          path="solution/:solutionId"
          element={
            <AuthRequired>
              <Solution />
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
          path="reset-password/:username/:token"
          element={
            <AuthNotRequired>
              <ResetPassword />
            </AuthNotRequired>
          }
        />
      </Routes>
         
      <Footer />
      </div>
    </div>
}
    </>
    
  );
};

export default App;


