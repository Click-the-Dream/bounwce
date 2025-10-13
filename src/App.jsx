import React from "react";
import { Navigate, BrowserRouter, Routes,Route,Outlet, useLocation } from "react-router-dom";


// import { CiUser } from "react-icons/ci";

import AuthLayout from './features/auth/AuthLayout'
import VerifyAccount from "./features/auth/VerifyAccount";
import LoginPage from "../src/features/auth/LoginPage"
import CreateAccount from "./features/auth/CreateAccount";

function App() {
  return ( 
    <div className="App">
      <Routes>
        <Route  element={ <AuthLayout /> }>
          <Route path="/login" element={ <LoginPage />} />
          <Route path="/createAccount" element={ <CreateAccount />} />
          <Route path="/verifyAccount" element={ <VerifyAccount />} />
        </Route>
    
       <Route path="*" element={< Navigate to="/createAccount" replace />} />
      </Routes>
    </div>
      // <Button />
      // <Input />
  
  );
}

export default App;

