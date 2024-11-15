import "./VerifyAccount.css";
import Wrapper from "../Wrapper/Wrapper";

export default function VerifyAccount() {
  return (
    <Wrapper>
      <div className="signup_page">
      <h1>Create a free account!</h1>
        <div className="confirmtick">
          <svg width="90" height="90" viewBox="0 0 113 113" fill="none">
            <circle
              cx="56.5"
              cy="56.5"
              r="56"
              fill="url(#paint0_linear_939_5057)"
            />
            <path
              d="M34.0957 56.3002L49.0854 71.29L78.9071 41.4683"
              stroke="white"
              strokeWidth="8.83606"
            />
            <defs>
              <linearGradient
                id="paint0_linear_939_5057"
                x1="0.5"
                y1="0.5"
                x2="130.171"
                y2="27.4392"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#51ADAC" />
                <stop offset="1" stopColor="#4FA874" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p>Your account has been verified successfully!</p>
        <button> Continue </button>

        <div
          style={{
            width: "80%",
            height: "16vh",
            borderRadius: "50%",
            margin: "0 auto",
            position: "absolute",
            bottom: "-20px",
            left: "10%",
            background: "#598483",
            filter: "blur(20px)",
            opacity: 0.8,
            zIndex: -1,
          }}
        ></div>
      </div>
    </Wrapper>
  );
}


