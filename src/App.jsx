import React from "react";
import { Navigate, BrowserRouter, Routes,Route,Outlet, useLocation } from "react-router-dom";


// import { CiUser } from "react-icons/ci";

import WelcomePage from "./WelcomePage";
import CreateAccountPage from "./features/auth/CreateAccountPage";
import VerifyAccount from "./features/auth/VerifyAccount";
import LoginPage from "../src/features/auth/LoginPage"

function App() {
  return ( 
    <div className="App">
      <Routes>
        <Route path="/" element={ <CreateAccountPage /> } />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/verifyAccount" element={ <VerifyAccount />} />
        {/* <Route path="/" element={ <WelcomePage />} /> */}
       
      </Routes>
    </div>
      // <Button />
      // <Input />
  
  );
}

export default App;

