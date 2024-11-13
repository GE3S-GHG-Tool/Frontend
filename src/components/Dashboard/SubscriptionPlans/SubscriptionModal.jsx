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
  // minWidth: '60%',
  backgroundImage: `url(${SubscriptionBg})`,
  backgroundSize: 'auto',
  paddingLeft:'2rem',
  paddingRight:'2rem',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: 'white',
  borderRadius: '12px',
  maxHeight: '90vh',
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
  // minWidth:'6rem',
  flexDirection: 'column',
  border: '1px solid rgba(255, 255, 255, 0.40)',
  borderRadius: '12px',
  padding: "20px 14px",
}));

const SubscriptionModal = ({ open, onClose }) => {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      if (!open) return;

      setLoading(true);
      setError(null);

      try {

        const [plansResponse, userResponse] = await Promise.all([
          api.get('/subscription_plan/fetch_subscription_plans?type=premium'),
          api.get('/user/onboard-data')
        ]);

        if (plansResponse.data.success && plansResponse.data.subscriptionPlans) {
          setPlans(plansResponse.data.subscriptionPlans);
        } else {
          throw new Error('Invalid plans data received');
        }

        if (userResponse.data.organization?.premiumPlan?.name) {
          setCurrentPlan(userResponse.data.organization.premiumPlan.name);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response) {
          if (err.response.status === 401) {
            setError('Authentication failed. Please try logging in again.');
          } else {
            setError(`Error: ${err.response.data.message || 'Failed to fetch subscription data'}`);
          }
        } else {
          setError('Failed to connect to the server. Please check your internet connection.');
        }
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
    if (currentPlan === planName) return;
    try {
      console.log(`Upgrading to ${planName} plan`);
    } catch (err) {
      console.error('Error upgrading plan:', err);
    }
  };


  if (!open) return null;

  return (
    <>
      <ModalOverlay open={open} onClick={onClose}>
        <Fade in={open}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalContent>
              <Box sx={{ position: 'relative' }}>
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: '300',
                    mb: 3,
                    mt: 3 // Added top margin
                  }}
                >
                  Upgrade to OffSet/CarbonZero for enhanced Scope 2 & 3 features.
                </Typography>

                {/* Close Button */}
                <IconButton
                  onClick={onClose}
                  sx={{
                    position: 'absolute',
                    right: -10,
                    top: 0,
                    color: 'grey.500'
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Content */}
                <Box sx={{ mt: 2 }}> {/* Added margin top for better spacing */}
                  {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
                      <CircularProgress />
                    </Box>
                  ) : error ? (
                    <Alert severity="error" sx={{ mb: 2, backgroundColor: '#2E1534', color: 'white' }}>
                      {error}
                    </Alert>
                  ) : (
                    <>
                      <Grid
                        // container
                        spacing={2}
                        justifyContent="center"
                        alignItems="stretch"
                        sx={{
                          display:'flex',
                          gap:'2rem'
                        }}
                      >
                        {getVisiblePlans().map((planName) => {
                          const isPlanActive = currentPlan === planName;
                          const plan = plans.find(p => p.name === planName);

                          return (
                            <Grid item xs={12} md={3.6} key={planName}>
                              <StyledCard isactive={isPlanActive.toString()}>
                                <CardMedia
                                  component="img"
                                  height="100"
                                  image={planImages[planName]}
                                  alt={planName}
                                  sx={{
                                    borderRadius: '6px',
                                    width: "90%",
                                    margin: '0 auto'
                                  }}
                                />
                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    gutterBottom
                                    sx={{
                                      color: isPlanActive ? '#000' : '#FFF',
                                      mt: 1 // Added top margin
                                    }}
                                  >
                                    {planName}
                                  </Typography>

                                  <Box mb={3}>
                                    {planDesc[planName].map((desc, index) => (
                                      <Box
                                        key={index}
                                        display="flex"
                                        alignItems="center"
                                        mb={1}
                                        sx={{ color: isPlanActive ? '#000' : '#FFF' }}
                                      >
                                        <Typography sx={{ fontSize: '12px' }}>
                                          {desc}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                  <Box>
                                    <Typography
                                      component="span"
                                      sx={{
                                        fontSize: '1.8rem',
                                        fontWeight: '600',
                                        color: isPlanActive ? '#000' : '#FFF'
                                      }}
                                    >
                                      ${plan ? plan.price : '0'}
                                    </Typography>
                                    <Typography
                                      variant="subtitle1"
                                      component="span"
                                      sx={{
                                        color: isPlanActive ? '#000' : '#FFF',
                                        ml: 1,
                                        fontSize: '12px'
                                      }}
                                    >
                                      / per anually
                                    </Typography>
                                  </Box>
                                  <hr style={{ background: 'rgba(217, 217, 217, 0.40)', width: '100%', height: '0.5px', margin: '1.5rem 0' }} />
                                  <div style={{ paddingBottom: '1rem', color: isPlanActive ? "black" : "#fff", fontSize: '12px' }}>Unlock</div>
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
                                            fontSize: '12px'
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
                                        fontSize: '12px',
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

                      <Typography
                        align="center"
                        sx={{
                          background: '#fff',
                          minWidth: '50%',
                          margin: '2rem auto',
                          color: '#000',
                          padding: '5px',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '14px',
                          justifyContent: 'center'
                        }}
                      >
                        Generate report with only
                        {
                          currentPlan === "OffSet" ? " scope 2 " : " scope 1 "
                        }
                        emission data  <img src={forwardArrowBlack} width={16} />
                      </Typography>
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