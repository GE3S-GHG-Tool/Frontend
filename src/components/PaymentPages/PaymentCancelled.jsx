import "../VerifyAccount/VerifyAccount.css";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../context/User-signup";

export default function PaymentCancelled() {
    const { email } = useSignup();
    console.log(email)

    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/");
    };

    return (
        <Wrapper>
            <div className="account-created-successfully" style={{ width: '28vw' }}>
                {/* <h1>Create a free account!</h1> */}
                <div className="confirmtick" style={{marginBottom:'2rem'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 112 112" fill="none">
                        <path d="M56 83.7635C57.0868 83.7635 57.9973 83.3964 58.7316 82.6622C59.4616 81.928 59.8267 81.0175 59.8267 79.9307C59.8267 78.848 59.4596 77.9395 58.7253 77.2053C57.9911 76.4711 57.0827 76.1019 56 76.0978C54.9173 76.0936 54.0089 76.4607 53.2747 77.1991C52.5404 77.9375 52.1733 78.8459 52.1733 79.9244C52.1733 81.003 52.5404 81.9135 53.2747 82.656C54.0089 83.3985 54.9173 83.7718 56 83.7635ZM52.8889 63.1742H59.1111V25.8409H52.8889V63.1742ZM56.0187 112C48.2782 112 40.9982 110.532 34.1787 107.595C27.3633 104.654 21.4335 100.663 16.3893 95.6231C11.3452 90.5831 7.35259 84.6595 4.41156 77.8524C1.47052 71.0453 0 63.7674 0 56.0187C0 48.2699 1.47052 40.9899 4.41156 34.1787C7.34845 27.3633 11.3327 21.4335 16.3644 16.3893C21.3961 11.3452 27.3218 7.35259 34.1413 4.41156C40.9609 1.47052 48.2409 0 55.9813 0C63.7218 0 71.0018 1.47052 77.8213 4.41156C84.6367 7.34844 90.5665 11.3348 95.6107 16.3707C100.655 21.4065 104.647 27.3321 107.588 34.1475C110.529 40.963 112 48.2409 112 55.9813C112 63.7218 110.532 71.0018 107.595 77.8213C104.658 84.6409 100.667 90.5706 95.6231 95.6106C90.579 100.651 84.6554 104.643 77.8524 107.588C71.0495 110.534 63.7716 112.004 56.0187 112ZM56 105.778C69.8963 105.778 81.6667 100.956 91.3111 91.3111C100.956 81.6666 105.778 69.8963 105.778 56C105.778 42.1037 100.956 30.3333 91.3111 20.6889C81.6667 11.0444 69.8963 6.22222 56 6.22222C42.1037 6.22222 30.3333 11.0444 20.6889 20.6889C11.0444 30.3333 6.22222 42.1037 6.22222 56C6.22222 69.8963 11.0444 81.6666 20.6889 91.3111C30.3333 100.956 42.1037 105.778 56 105.778Z" fill="#FF5151" />
                    </svg>
                </div>
                <p style={{ textAlign: 'center' }}>Your payment was cancelled. Please try again later</p>
                <button onClick={handleContinue} style={{ background: 'transparent' }}> Continue </button>

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


