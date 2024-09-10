import { Modal } from "@mui/material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  overflow: "visible",
}));

const GradientBackground = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85vw",
  height: "90vh",
  background: "#181818",
  borderRadius: "16px",
  boxShadow: "16px 20px 68px 0px rgba(0, 0, 0, 0.25)",
  p: 2,
});
const StyledListItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    fontSize: "0.8rem",
  },
});

const StyledListItem = styled(ListItem)({
  padding: 0,
  marginBottom: "0.5rem",
});

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: "20px",
  marginRight: "4px",
});
const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  isActive,
}) => (
  <StyledCard
    sx={{
      maxWidth: 320,
      width: "100%",
      m: 2,
      border: "1px solid rgba(255, 255, 255, 0.40)",
      color: isActive ? "#000" : "#fff",
      backgroundColor: isActive ? "#fff" : "rgba(27, 26, 29, 0.40)",
      //   height: "fit-content",
      minHeight: "50vh",
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Typography
        sx={{ fontSize: "1.3rem" }}
        variant="h5"
        component="div"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, fontSize: ".75rem" }}>
        {description}
      </Typography>
      <Typography
        variant="h3"
        component="div"
        sx={{ mb: 2, fontSize: "2rem", fontWeight: 600 }}
      >
        ${price}{" "}
        <Typography variant="subtitle1" component="span">
          / per annually
        </Typography>
      </Typography>
      <button className={isActive ? "price_inactive" : "price_active"}>
        {isActive ? "Currently in use" : buttonText}
      </button>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Unlock
      </Typography>
      <List>
        {features.map((feature, index) => (
          <StyledListItem key={index}>
            <StyledListItemIcon>
              <svg width="23" height="24" viewBox="0 0 23 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0781 20.3085C15.6668 20.3085 19.3866 16.5886 19.3866 12C19.3866 7.41127 15.6668 3.69141 11.0781 3.69141C6.4894 3.69141 2.76953 7.41127 2.76953 12C2.76953 16.5886 6.4894 20.3085 11.0781 20.3085ZM10.8641 15.3605L15.48 9.82143L14.0616 8.63943L10.0929 13.4019L8.03816 11.3472L6.7326 12.6527L9.50212 15.4222L10.2169 16.1371L10.8641 15.3605Z"
                  fill="url(#paint0_linear_1214_40191)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1214_40191"
                    x1="2.76953"
                    y1="3.69141"
                    x2="22.0085"
                    y2="7.68829"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#369D9C" />
                    <stop offset="1" stopColor="#28814D" />
                  </linearGradient>
                </defs>
              </svg>
            </StyledListItemIcon>
            <StyledListItemText primary={feature} />
          </StyledListItem>
        ))}
      </List>
    </CardContent>
  </StyledCard>
);
const PricingModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <GradientBackground>
        <Box>
          <Box sx={{ position: "relative", mb: 2 }}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{ color: "white", mb: 2, fontSize: "20px", pt: 2 }}
            >
              Expand Your Team and Capabilities - Upgrade to Offset or
              CarbonZero!
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 5,
                right: 10,
                color: "white",
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            <PricingCard
              title="Footprint"
              price={0}
              description="Essential GHG tracking and reporting."
              features={[
                "Scope 1 Emissions",
                "One user access",
                "One Facility access",
                "Real Time Support",
              ]}
              buttonText="Get Started"
              isActive={true}
            />
            <PricingCard
              title="Offset"
              price={20}
              description="Enhanced analytics, goal tracking, support."
              features={[
                "Scope 1 & 2 Emissions",
                "Three user access",
                "Two Facility access",
                "Generate up to 10 reports annually",
                "Real Time Support",
              ]}
              buttonText="Get Started"
              isActive={false}
            />
            <PricingCard
              title="CarbonZero"
              price={50}
              description="Advanced tracking, real-time data, consulting."
              features={[
                "Scope 1, 2 & 3 Emissions",
                "Five user access",
                "Four Facility access",
                "Generate up to 20 reports annually",
                "Real Time Support",
              ]}
              buttonText="Get Started"
              isActive={false}
            />
          </Box>
        </Box>
      </GradientBackground>
    </Modal>
  );
};

export default PricingModal;
