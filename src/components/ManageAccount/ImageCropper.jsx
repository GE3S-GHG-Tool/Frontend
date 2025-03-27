import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import { GradientButton, OutlinedButton } from "./Buttons";


const ImageCropper = ({
  open,
  setOpen,
  imageUrl,
  setImageApi,
  setCroppedImage,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      // image.crossOrigin = "anonymous";
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], "cropped_image.jpg", {
          type: "image/jpeg",
        });
        resolve(file);
      }, "image/jpeg");
    });
  };

  const showCroppedImage = useCallback(async () => {
    try {
      if (!croppedAreaPixels) {
        throw new Error("No cropped area pixels");
      }

      const croppedImageFile = await getCroppedImg(imageUrl, croppedAreaPixels);
      if (croppedImageFile) {
        const croppedImageUrl = URL.createObjectURL(croppedImageFile);
        setImageApi(croppedImageUrl); // Set the image URL for preview
        setCroppedImage(croppedImageFile); // Set the cropped image file for API call
        reset();
      }
    } catch (e) {
      console.error("Error creating cropped image:", e);
      reset();
    }
  }, [imageUrl, croppedAreaPixels, setImageApi]);

  const reset = () => {
    setZoom(1);
    setCroppedAreaPixels(null);
    setOpen(false);
    setCrop({ x: 0, y: 0 });
  };

  return (
    <Dialog
      open={open}
      onClose={reset}
      sx={{
        ".MuiBackdrop-root": {
          background: "rgba(0, 0, 0, 0.3)",
        },
        ".MuiPaper-root": {
          width: "100%",
          maxWidth: 520,
          height: "80vh",
          borderRadius: "1rem",
          p: 3,
        },
      }}
    >
      <DialogContent
        style={{
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h5"
          sx={{
            mb: 2,
          }}
        >
          Edit Image
        </Typography>

        {/* Cropper */}
        <Box
          sx={{
            backgroundColor: "#000",
            position: "relative",
            width: "100%",
            height: "400px", // Fixed height for cropper
            marginBottom: "16px",
            "@media (max-width: 600px)": {
              height: "300px", // Adjust for smaller screens
            },
          }}
        >
          <Cropper
            style={{
              backgroundColor: "#000",
            }}
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>

        {/* Slider */}
        <Box sx={{ marginBottom: "16px" }}>
          <Slider
            min={1}
            max={10}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            aria-label="Zoom"
            valueLabelDisplay="auto"
            color={"#B7B7B7"}
            sx={{
              width: "100%",
              // margin: "auto",
              // marginLeft: ".7rem",
              "& .MuiSlider-thumb": {
                height: 24,
                width: 24,
                backgroundColor: "#B7B7B7",
                boxShadow: "none",
              },
            }}
          />
        </Box>

        {/* Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: "0.8rem" }}
        >
          {/* <Button onClick={reset} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
          >
            Upload
          </Button> */}
          <OutlinedButton onClick={reset}>Cancel</OutlinedButton>
          <GradientButton onClick={showCroppedImage}>Upload</GradientButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
