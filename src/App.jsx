import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Onboarding from "./components/Onboarding/Onboarding";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Confirmation from "./components/Confirmation/Confirmation";
import Login from "./components/Login/Login";
import OrganizationStepper from "./components/OrganizationStepper/OrganizationStepper";
import Organization from "./components/OrganizationStepper/Organization";
import Details from "./components/OrganizationStepper/Details";
import Goals from "./components/OrganizationStepper/Goals";




function App() {


  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    // </Routes>
    <Routes>
      <Route path="/onboarding" element={
        <Onboarding />
} />
      <Route index path="/" element={<SignUp />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/organizationstepper" element={<OrganizationStepper />} />
      <Route path="/organization" element={<Organization />} />
      <Route path="/details" element={<Details />} />
      <Route path="/goals" element={<Goals />} />
    </Routes>
  );
}

export default App;
