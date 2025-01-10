import React, { useState } from "react";
import { Button, Dialog, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { styled } from "@mui/system";
import SubscriptionBg from "../../../../assets/images/SubscriptionBg.png"

const ModalBox = styled("div")({
  padding: "3rem 2rem",
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  gap: "2rem",
  color: "white",
  borderRadius: "1rem",
  width: "75vh",
  background: `url(${SubscriptionBg})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'auto',
});

const StyledButton = {
  backgroundColor: "#00A57C",
  color: "#FFFFFF",
  padding: "0.5rem 1.4rem",
  display: "flex",
  height: "2.1rem",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "1.3rem",
  fontVariant: "unset",
  fontSize: "0.7rem",
  border: "0.554px solid grey",
  backgroundSize: 'auto',
  background:
     "radial-gradient(132.61% 50% at 50% 50.13%, #2E7B54 0%, #00191D 100%)",
  boxShadow:
    "0px 1.107px 0px -4.429px #005C31, 0px 2.214px 6.643px 0px rgba(255, 255, 255, 0.25) inset, 0px 4.429px 8.857px -4.429px #005C31, 0px -13.286px 17.714px 0px rgba(255, 255, 255, 0.22) inset, 0px 19.929px 17.714px -8.857px rgba(0, 92, 49, 0.21), 0px 4.429px 13.286px -8.857px rgba(255, 255, 255, 0.24) inset",
  width: "100%",
  "&:hover": {
    backgroundColor: "#008B68",
  },
};

const CloseButton = styled(IconButton)({
  position: "absolute",
  right: "10px",
  top: "10px",
  color: "#FFFFFF",
});

const CustomModal = ({
  open,
  onClose,
  title,
  description,
  onAction,
  planContains,
  price,
  type,
}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          overflow: "hidden",
          boxShadow: "16px 20px 68px 0px rgba(0, 0, 0, 0.25)",
        },
      }}
      BackdropProps={{
        style: {
          background: "rgba(0,0,0,0.50)",
          // backdropFilter: "blur(1px)",
        },
      }}
    >
      <ModalBox>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        <p
          style={{
            color: "#FFF",
            textAlign: "center",
            fontSize: "1.2rem",
            padding: "0",
            margin: "0",
            fontWeight: '350'
          }}
        >
          {title}
        </p>
        <div
          style={{
            display: "flex",
            padding: "1rem 1rem",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
            borderRadius: "0.6rem",
            border: "1px solid rgba(255, 255, 255, 0.40)",
            background: "rgba(27, 26, 29, 0.40)",
          }}
        >
          <div>
            <p style={{ margin: "0px 0px 16px 0px", padding: "0px", fontWeight: '500' }}>
              {description}
            </p>
            <div style={{ display: "flex", flexDirection: 'row', alignItems: "end" }}>
              <div>
                <p
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: "500",
                  }}
                >
                  ${price}
                </p>
              </div>
              <div style={{ paddingBottom: '12px' }}>
                <p style={{ fontSize: "0.8rem", fontWeight: "300" }}>
                  {" "}
                  &nbsp; / per {type}
                </p>
              </div>
            </div>
          </div>
          <>
            <button onClick={onAction} style={StyledButton}>
              Get Started &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <g clipPath="url(#clip0_1850_19597)">
                  <path
                    d="M3.62695 10H17.377"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.752 4.375L17.377 10L11.752 15.625"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1850_19597">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <hr
              style={{
                color: "rgba(217, 217, 217, 0.40)",
                width: "16vw",
                border: "1px solid rgba(217, 217, 217, 0.40)",
              }}
            />
          </>


          {(
            <div>
              <Typography
                style={{
                  marginBottom: "12px",
                  fontSize: "0.8rem",
                  fontWeight: "400",
                }}
              >
                Unlock
              </Typography>
              <p
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  gap: "6px",
                  fontSize: "0.7rem",
                  fontWeight: 'normal',
                  wordSpacing: "2px"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 23 23" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5781 19.3866C16.1668 19.3866 19.8866 15.6668 19.8866 11.0781C19.8866 6.4894 16.1668 2.76953 11.5781 2.76953C6.9894 2.76953 3.26953 6.4894 3.26953 11.0781C3.26953 15.6668 6.9894 19.3866 11.5781 19.3866ZM11.3641 14.4386L15.98 8.89955L14.5616 7.71755L10.5929 12.48L8.53816 10.4253L7.2326 11.7309L10.0021 14.5004L10.7169 15.2152L11.3641 14.4386Z"
                    fill="url(#paint0_linear_1728_20142)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1728_20142"
                      x1="3.26953"
                      y1="2.76953"
                      x2="22.5085"
                      y2="6.76642"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#369D9C" />
                      <stop offset="1" stopColor="#28814D" />
                    </linearGradient>
                  </defs>
                </svg>{" "}
                {planContains}
              </p>
            </div>
          )}
        </div>
      </ModalBox>
    </Dialog>
  );
};

export default CustomModal;
