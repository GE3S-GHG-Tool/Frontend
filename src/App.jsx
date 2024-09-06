import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Onboarding from "./components/Onboarding/Onboarding";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Confirmation from "./components/Confirmation/Confirmation";
import Login from "./components/Login/Login";
import OrganizationStepper from "./components/OrganizationStepper/OrganizationStepper";
import Organization from "./components/OrganizationStepper/Organization";
import Details from "./components/OrganizationStepper/Details";
import Goals from "./components/OrganizationStepper/Goals";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import VerifyOTP from "./components/VerifyOTP/VerifyOTP";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import AccountCreationHeader from "./components/AccountCreationHeader/AccountCreationHeader";
import AccountCreationIntro from "./components/AccountCreationIntro/AccountCreationIntro";
import CreateAccountSucessfully from "./components/AccCreateSuccesfully/CreateAccountSuccessfully";
import GenerateReports from "./components/GenerateReports/GenerateReport";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/verify-otp" element={<VerifyOTP/>} />
      <Route path="/change-password" element={<ChangePassword/>} />
      <Route path="/organizationstepper" element={<OrganizationStepper />} />
      <Route path="/organization" element={<Organization />} />
      <Route path="/details" element={<Details />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/account-creation-header" element={<AccountCreationHeader/>}/>
      <Route path="/account-Intro" element={<AccountCreationIntro/>}/>
      <Route path="/create-account-successfully" element={<CreateAccountSucessfully/>}/>
      <Route path="/generate-reports" element={<GenerateReports/>}/>
    </Routes>
  );
}

export default App;
