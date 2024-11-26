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
import VerifyAccount from "./components/VerifyAccount/VerifyAccount"
import ChangePassword from "./components/ChangePassword/ChangePassword";
import AccountCreationHeader from "./components/AccountCreationHeader/AccountCreationHeader";
import AccountCreationIntro from "./components/AccountCreationIntro/AccountCreationIntro";
import GenerateReports from "./components/GenerateReports/GenerateReport";
import CreateAccountSuccessfully from "./components/AccCreateSuccesfully/CreateAccountSuccessfully";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import TeamMembers from "./components/Dashboard/TeamMembers";
import Facilities from "./components/Dashboard/Facilities/Facilities";
import Survey from "./components/Dashboard/Survey/surveypages/Survey";
import Report from "./components/Dashboard/Report";
import Analytics from "./components/Dashboard/Analytics/Analytics";
import PersonalInfo from "./components/SignUp/PersonalInfo";
import ReportStateEmpty from "./components/ReportsComponent/ReportStateEmpty";
import GeneratedReport from "./components/ReportsComponent/Reports/GeneratedReport";
import EmissionsInventoryReport from "./components/EmissionsInventoryReport/EmissionsInventoryReport";
import { Typography } from "@mui/material";
import PrivateRoute from "./components/common/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ResetOTP from "./components/ResetPassword/ResetOTP";
import TotalEmissionsInventoryReport from "./components/EmissionsInventoryReport/TotalEmissionsInventoryReport";
import { Scope3Provider } from "./context/Scope3Context";
import SurveyQuestionSection from "./components/Dashboard/Survey/surveypages/DecarbonizationSurveyQsn";
import DecarbonizationSurveyQsnAns from "./components/Dashboard/Survey/surveypages/DecarbonizationSurveyQsnAns";
import EditReport from "./components/ReportsComponent/EditReport";
import ScopeDashboard from "./components/Dashboard/ScopeDashboard";
import SuccessModal from "./components/ChangePassword/SuccessModal";
import ChangePasswordVerified from "./components/ChangePassword/ChangePasswordVerified";
import PaymentSuccess from "./components/PaymentPages/PaymentSuccess";
import PaymentCancelled from "./components/PaymentPages/PaymentCancelled";
import PaymentSuccessSurvey from "./components/PaymentPages/PaymentSuccessSurvey";

function App() {
  return (
    <Scope3Provider>
      <AuthProvider>
        <Routes>
          <Route index path="/signup" element={<SignUp />} />
          {/* <Route index path="/test" element={<Test />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/personalinfo" element={<PersonalInfo />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/confirmation" element={<SuccessModal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otppage" element={<ResetOTP />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/account-verified" element={<VerifyAccount />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/change-password-success" element={<ChangePasswordVerified />} />
          <Route
            path="/organizationstepper"
            element={<OrganizationStepper />}
          />
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
          {/* <Route path="/generate-reports" element={<GenerateReports />} /> */}
          <Route path="/reportgenerator" element={<ReportStateEmpty />} />
          <Route path="/editreport/:id" element={<EditReport />} />
          <Route path="/ghgreport" element={<GeneratedReport />} />{" "}
          <Route path="app" element={<Typography>avavav</Typography>} />
          <Route
            path="/ghg-emissions-inventory-report"
            element={<EmissionsInventoryReport />}
          />
          <Route
            path="/scope-dashboard"
            element={<ScopeDashboard />}
          />
          <Route
            path="/emissionreport/:id"
            element={<TotalEmissionsInventoryReport />}
          />
          <Route path="checkout-success" element={<PaymentSuccess/>} />
          <Route path="checkout-success-survey" element={<PaymentSuccessSurvey/>} />
          <Route path="checkout-cancelled" element={<PaymentCancelled/>} />
          {/* Dashboard routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="team-member" element={<TeamMembers />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="survey" element={<Survey />} />
            <Route path="survey1" element={<SurveyQuestionSection />} />
            <Route path="survey2" element={<DecarbonizationSurveyQsnAns />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Scope3Provider>
  );
}

export default App;
