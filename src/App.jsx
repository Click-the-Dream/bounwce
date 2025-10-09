import React from "react";
import LandingPage from "./LandingPage";
import CreateAccount from "./BackgroundPage";
import BackgroundPage from "./BackgroundPage";
import LoginPage from "./features/auth/LoginPage";
import CreateAccountPage from "./features/auth/CreateAccountPage";
import VerifyAccount from "./features/auth/VerifyAccount";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <LandingPage />
      {/* <CreateAccount />
      <div className="App">
        <BackgroundPage />
      </div>
      <LoginPage />
      <CreateAccountPage />
      <VerifyAccount /> */}
    </>
  );
}

export default App;

