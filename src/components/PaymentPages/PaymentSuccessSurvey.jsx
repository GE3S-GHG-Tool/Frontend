import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Wrapper from "../Wrapper/Wrapper";
import api from '../../api';

const PaymentSuccessSurvey = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  console.log(sessionId)

  useEffect(() => {
    const updateSubscription = async () => {
      try {
        const response = await api.post(
          'https://backend.ghg.ge3s.org/api/payment/subscription/update_oragnization',
          {
            sessionId: sessionId,
            plan_type: 'addOnPlan'
          }
        );
        console.log('Subscription updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating subscription:', error.response?.data || error.message);
      }
    };

    if (sessionId) {
      updateSubscription();
    }
  }, [sessionId]);

  const handleContinue = () => {
    navigate("/survey");
  };

  return (
    <Wrapper>
      <div className="account-created-successfully">
        <div className="confirmtick" style={{ marginBottom: '2rem' }}>
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
        <p style={{ textAlign: 'center' }}>You successfully purchased Decarbonization Survey</p>
        <button onClick={handleContinue} style={{ background: 'transparent' }}>
          Continue
        </button>
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
        />
      </div>
    </Wrapper>
  );
};

export default PaymentSuccessSurvey;