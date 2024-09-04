import logotop from "../../assets/images/topright.png";
import logobottom from "../../assets/images/bottomleft.png";
import SignUp from "../SignUp/SignUp";
import CreateAccount from "../CreateAccount/CreateAccount";
import Confirmation from "../Confirmation/Confirmation";
import Login from "../Login/Login";

export default function Onboarding() {
  return (
    <div className="onboard">
      <div className="imagesty">
        <img src={logotop} alt="Top_right_logo" className="topimg" />
      </div>
      <SignUp />
      <CreateAccount />
      <Confirmation />
      <Login />
      <div className="imagesty">
        <img src={logobottom} alt="Bottom_left_logo" className="bottomimg" />
      </div>
    </div>
  );
}
