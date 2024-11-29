import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  useTheme,
  styled,
  Alert,
  Backdrop,
  Fade,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FootPrintBg from "../../../assets/images/FootPrintBg.png";
import OffSetBg from "../../../assets/images/OffSetBg.png";
import CarbonZeroBg from "../../../assets/images/CarbonZeroBg.png";
import SubscriptionBg from "../../../assets/images/SubscriptionBg.png";
import check from "../../../assets/images/check.svg"
import forwardArrow from "../../../assets/images/forwardArrow.svg"
import forwardArrowBlack from "../../../assets/images/forwardArrowBlack.svg"
import api from '../../../api';

const ModalOverlay = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}));

const ModalContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '60%',
  backgroundImage: `url(${SubscriptionBg})`,
  backgroundSize: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: 'white',
  borderRadius: '12px',
  maxHeight: '100vh',
  overflowY: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px soild red',
  zIndex: theme.zIndex.drawer + 2,
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none'
}));

const ModalContent = styled(Box)(({ theme }) => ({
  // padding: theme.spacing(3),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    zIndex: -1,
  }
}));

const StyledCard = styled(Card)(({ isactive }) => ({
  backgroundColor: isactive === 'true' ? '#fff' : 'rgba(27, 26, 29, 0.40)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(255, 255, 255, 0.40)',
  borderRadius: '12px',
  padding: "20px 14px",
  width:'260px'
}));

const SubscriptionModal = ({ open, onClose,redirectUrl }) => {
  const [plans, setPlans] = useState([]);
  const [stripePlans, setStripePlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  // const theme = useTheme();

  const planImages = {
    FootPrint: FootPrintBg,
    OffSet: OffSetBg,
    CarbonZero: CarbonZeroBg
  };

  const planFeatures = {
    FootPrint: ['Scope 1 Emissions', 'Unlock Unlimited Report Creation'],
    OffSet: ['Scope 1 & 2 Emissions', 'Unlock Advanced Analytics', 'Unlock Unlimited Report Creation'],
    CarbonZero: ['Scope 1, 2 & 3 Emissions', 'Unlock Advanced Analytics', 'Unlock Unlimited Report Creation']
  };

  const planDesc = {
    FootPrint: ['Essential GHG tracking and reporting.'],
    OffSet: ['Enhanced analytics, goal tracking, support.'],
    CarbonZero: ['Advanced tracking, real-time data, consulting.']
  };

  const planOrder = ['FootPrint', 'OffSet', 'CarbonZero'];

  const planToStripeMapping = {
    OffSet: 'prod_RG2Gjym3KnW6Pa',
    CarbonZero: 'prod_RG2H0fVmgliojz'
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!open) return;

      setLoading(true);
      setError(null);

      try {
        const [plansResponse, userResponse, stripePlansResponse] = await Promise.all([
          api.get('/subscription_plan/fetch_subscription_plans?type=premium'),
          api.get('/user/onboard-data'),
          axios.get('https://backend.ghg.ge3s.org/api/payment/fetch_all_products_and_prices')
        ]);

        // Handle your existing plans data
        if (plansResponse.data.success && plansResponse.data.subscriptionPlans) {
          const allPlans = [
            // Add FootPrint as a free plan since it's not in Stripe
            {
              name: 'FootPrint',
              price: 0,
              isFreePlan: true
            },
            ...plansResponse.data.subscriptionPlans
          ];
          setPlans(allPlans);
        }

        // Store Stripe plans data
        setStripePlans(stripePlansResponse.data);

        if (userResponse.data.organization?.premiumPlan?.name) {
          setCurrentPlan(userResponse.data.organization.premiumPlan.name);
          setUserEmail(userResponse.data.email);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch subscription data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open]);


  const getVisiblePlans = () => {
    if (!currentPlan) return planOrder;
    const currentIndex = planOrder.indexOf(currentPlan);
    return planOrder.slice(currentIndex);
  };

  const handleUpgrade = async (planName) => {
    if (currentPlan === planName || planName === 'FootPrint') return;

    setProcessingPayment(true);
    try {
      // Check if we have the user's email
      if (!userEmail) {
        throw new Error('User email not found');
      }

      const stripeProductId = planToStripeMapping[planName];
      if (!stripeProductId) {
        throw new Error('Invalid plan selected');
      }
      console.log(stripeProductId);
      const response = await axios.post('https://backend.ghg.ge3s.org/api/payment/create_checkout_session', {
        customerEmail: userEmail,
        subscriptionPlanId: stripeProductId,
        quantity: 1,
        url:redirectUrl
      });
      
      // Redirect to Stripe Checkout
      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Error initiating payment:', err);
      setError(err.message || 'Failed to initiate payment. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  // Function to get price from Stripe plans data
  const getPlanPrice = (planName) => {
    if (planName === 'FootPrint') return 0;

    const stripePlan = stripePlans.find(p => p.name === planName);
    if (stripePlan && stripePlan.prices && stripePlan.prices.length > 0) {
      return stripePlan.prices[0].amount;
    }

    const plan = plans.find(p => p.name === planName);
    return plan ? plan.price : 0;
  };

  if (!open) return null;

  return (
    <>
      <ModalOverlay open={open} onClick={onClose}>
        <Fade in={open}>
          <ModalContainer onClick={(e) => e.stopPropagation()} >
            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 10,
                top: 10,
                color: 'grey.500'
              }}
            >
              <CloseIcon />
            </IconButton>
            <ModalContent>
              <Box sx={{ position: 'relative' }}>
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '300',
                    mb: 3,
                    mt: 3 // Added top margin
                  }}
                >
                  Upgrade to OffSet/CarbonZero for enhanced Scope 2 & 3 features.
                </Typography>



                {/* Content */}
                <Box sx={{ mt: 2, mb:3}}> {/* Added margin top for better spacing */}
                  {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
                      <CircularProgress sx={{ color: 'white' }} />
                    </Box>
                  ) : error ? (
                    <Alert severity="error" sx={{ mb: 2, backgroundColor: '#2E1534', color: 'white' }}>
                      {error}
                    </Alert>
                  ) : (
                    <>
                      <Grid
                        // container
                        // spacing={currentPlan === "FootPrint" ? 0 : 0}
                        justifyContent="center"
                        alignItems="stretch"
                        sx={{
                          display: 'flex',
                          gap: '1.4rem',
                        }}
                      >
                        {getVisiblePlans().map((planName) => {
                          const isPlanActive = currentPlan === planName;
                          const plan = plans.find(p => p.name === planName);

                          return (
                            <Grid item xs={12} md={3.6} key={planName} sx={{ width: `${currentPlan === "FootPrint" ? '33%' : '60%'}`}}>
                              <StyledCard isactive={isPlanActive.toString()}>
                                <CardMedia
                                  component="img"
                                  height="100"
                                  image={planImages[planName]}
                                  alt={planName}
                                  sx={{
                                    borderRadius: '6px',
                                    width: "100%",
                                    margin: '0 auto'
                                  }}
                                />
                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                  <Typography
                                    // variant="h6"
                                    component="div"
                                    gutterBottom
                                    sx={{
                                      color: isPlanActive ? '#000' : '#FFF',
                                      fontSize: '1rem',
                                      mt: 1 // Added top margin
                                    }}
                                  >
                                    {planName}
                                  </Typography>

                                  <Box mb={2}>
                                    {planDesc[planName].map((desc, index) => (
                                      <Box
                                        key={index}
                                        display="flex"
                                        alignItems="center"
                                        mb={1}
                                        sx={{ color: isPlanActive ? '#000' : '#FFF' }}
                                      >
                                        <Typography sx={{ fontSize: '9px' }}>
                                          {desc}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                  <Box>
                                    <Typography
                                      component="span"
                                      sx={{
                                        fontSize: '2.2rem',
                                        fontWeight: '600',
                                        color: isPlanActive ? '#000' : '#FFF',
                                      }}
                                    >
                                      ${getPlanPrice(planName)}
                                    </Typography>
                                    <Typography
                                      variant="subtitle1"
                                      component="span"
                                      sx={{
                                        color: isPlanActive ? '#000' : '#FFF',
                                        ml: 1,
                                        fontSize: '10px'
                                      }}
                                    >
                                      / per anually
                                    </Typography>
                                  </Box>
                                  <hr style={{ background: 'rgba(217, 217, 217, 0.40)', width: '100%', height: '0.5px', margin: '1rem 0' }} />
                                  <div style={{ paddingBottom: '1rem', color: isPlanActive ? "black" : "#fff", fontSize: '10px' }}>Unlock</div>
                                  <Box mb={3}>
                                    {planFeatures[planName].map((feature, index) => (
                                      <Box
                                        key={index}
                                        display="flex"
                                        alignItems="center"
                                        mb={1}
                                      >
                                        <img src={check} width={20} />
                                        <Typography
                                          sx={{
                                            color: isPlanActive ? '#000' : '#FFF',
                                            ml: 1,
                                            fontSize: '10px'
                                          }}
                                        >
                                          {feature}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>

                                  <Box mt="auto">
                                    <Button
                                      fullWidth
                                      disabled={isPlanActive}
                                      onClick={() => handleUpgrade(planName)}
                                      sx={{
                                        background: isPlanActive ? '#fff' : 'radial-gradient(132.61% 50% at 50% 50.13%, #2E7B54 0%, #00191D 100%)',
                                        boxShadow: isPlanActive ? 'none' : '0px 1.107px 0px -4.429px #005C31, 0px 2.214px 6.643px 0px rgba(255, 255, 255, 0.25) inset, 0px 4.429px 8.857px -4.429px #005C31, 0px -13.286px 17.714px 0px rgba(255, 255, 255, 0.22) inset, 0px 19.929px 17.714px -8.857px rgba(0, 92, 49, 0.21), 0px 4.429px 13.286px -8.857px rgba(255, 255, 255, 0.24) inset',
                                        textTransform: 'none',
                                        fontSize: '10px',
                                        fontWeight: '300',
                                        border: isPlanActive ? ' 0.554px solid #2E7B54' : 'none',
                                        borderRadius: '20px',
                                        color: isPlanActive ? '#212D2C' : '#fff',
                                        '&:disabled': {
                                          color: '#212D2c'
                                        }
                                      }}
                                    >
                                      {isPlanActive ? <span style={{ color: 'black' }}>Currently in use</span> : 'Get Started'}&nbsp; {isPlanActive ? "" : <img width={15} src={forwardArrow} />}
                                    </Button>
                                  </Box>
                                </CardContent>
                              </StyledCard>
                            </Grid>
                          );
                        })}
                      </Grid>

                      {/* <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "2rem auto",
                        }}
                      >
                        <Typography
                          align="center"
                          sx={{
                            background: "#fff",
                            color: "#000",
                            padding: "5px 30px",
                            borderRadius: "20px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "12px",
                            justifyContent: "center",
                          }}
                        >
                          Generate report with only
                          {currentPlan === "OffSet" ? " scope 1 & 2 " : " scope 1 "}
                          emission data{" "}
                          <img src={forwardArrowBlack} width={16} />
                        </Typography>
                      </Box> */}
                    </>
                  )}
                </Box>
              </Box>
            </ModalContent>
          </ModalContainer>
        </Fade>
      </ModalOverlay>
    </>
  );
};

export default SubscriptionModal;