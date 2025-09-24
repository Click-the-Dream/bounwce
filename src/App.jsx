import React from "react";
import Button from "./components/Button";
import Input from "./components/Input";
// import { CiUser } from "react-icons/ci";
import LandingPage from "./LandingPage";
import CreateAccount from "./BackgroundPage";
import BackgroundPage from "./BackgroundPage";

function App() {
  return (
    <>
      {/* <LandingPage />
       <CreateAccount /> */}
        <div className="App">
      <BackgroundPage />
    </div>
      <Button />
      <Input />
    </>
  );
}

export default App;

