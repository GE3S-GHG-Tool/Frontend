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
import { Check, Close } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  //   backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "white",
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
              <Check sx={{ color: "#06b6d4", fontSize: "1rem" }} />
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
              sx={{
                position: "absolute",
                top: -40,
                right: 0,
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
