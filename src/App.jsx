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
import GenerateReports from "./components/GenerateReports/GenerateReport";
import CreateAccountSuccessfully from "./components/AccCreateSuccesfully/CreateAccountSuccessfully";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import TeamMembers from "./components/Dashboard/TeamMembers";
import Facilities from "./components/Dashboard/Facilities";
import Survey from "./components/Dashboard/Survey/surveypages/Survey";
import Report from "./components/Dashboard/Report";
import Analytics from "./components/Dashboard/Analytics/Analytics";
import PersonalInfo from "./components/SignUp/PersonalInfo";
import ReportStateEmpty from "./components/ReportsComponent/ReportStateEmpty";
import GeneratedReport from "./components/ReportsComponent/Reports/GeneratedReport";
import EmissionsInventoryReport from "./components/EmissionsInventoryReport/EmissionsInventoryReport";

function App() {
  return (
    <Routes>
      <Route index path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/personalinfo" element={<PersonalInfo />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/organizationstepper" element={<OrganizationStepper />} />
      <Route path="/organization" element={<Organization />} />
      <Route path="/details" element={<Details />} />
      <Route path="/goals" element={<Goals />} />
      <Route
        path="/account-creation-header"
        element={<AccountCreationHeader />}
      />
      <Route path="/account-Intro" element={<AccountCreationIntro />} />
      <Route
        path="/create-account-successfully"
        element={<CreateAccountSuccessfully />}
      />
      <Route path="/generate-reports" element={<GenerateReports />} />
      <Route path="/reportgenerator" element={<ReportStateEmpty />} />
      <Route path="/ghgreport" element={<GeneratedReport />} />
      <Route path="/ghg-emissions-inventory-report" element={<EmissionsInventoryReport />} />
      {/* Dashboard routes */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="team-member" element={<TeamMembers />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="survey" element={<Survey />} />
        <Route path="report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default App;
