import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";

const ImageModal = ({ open, setOpen, imageUrl, setImageUrl, setImageApi }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    // Set canvas size to be the size of the crop area
    const diameter = Math.min(pixelCrop.width, pixelCrop.height);
    canvas.width = diameter;
    canvas.height = diameter;

    // Draw the circular cropped image
    ctx.beginPath();
    ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, 2 * Math.PI);
    ctx.clip();

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      diameter,
      diameter,
      0,
      0,
      diameter,
      diameter
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const reset = () => {
    setZoom(1);
    setCroppedAreaPixels(null);
    setOpen(false);
    setCrop({ x: 0, y: 0 });
  };

  const showCroppedImage = useCallback(async () => {
    try {
      if (!croppedAreaPixels) {
        throw new Error("No cropped area pixels");
      }

      const croppedImageBlob = await getCroppedImg(imageUrl, croppedAreaPixels);

      if (croppedImageBlob) {
        const croppedImageFile = new File(
          [croppedImageBlob],
          "cropped-image.jpg",
          {
            type: "image/jpeg",
            lastModified: new Date().getTime(),
          }
        );

        setImageApi(croppedImageFile);
        setImageUrl(URL.createObjectURL(croppedImageBlob));
        reset();
      }
    } catch (e) {
      console.error("Error creating cropped image:", e);
    }
  }, [imageUrl, croppedAreaPixels, setImageApi, setImageUrl]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        reset();
        setOpen(false);
      }}
    >
      <DialogContent>
        <Typography
          variant="h6"
          sx={{
            marginBottom: "10px",
            fontWeight: "600",
            fontFamily: "Inter",
          }}
        >
          Edit Image
        </Typography>
        <div className="image_resizer_box">
          <Cropper
            style={{
              containerStyle: {
                background: "#000",
              },
            }}
            cropShape="round"
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <Box>
          <Slider
            min={1}
            max={10}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            color={"#B7B7B7"}
            aria-label="Default"
            valueLabelDisplay="auto"
            sx={{
              width: "97%",
              margin: "auto",
              marginLeft: ".7rem",
              "& .MuiSlider-thumb": {
                height: 24,
                width: 24,
                backgroundColor: "#B7B7B7",
                boxShadow: "none",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                reset();
                setOpen(false);
              }}
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                padding: ".5rem 1.5rem",
                fontFamily: "Inter",
                color: "#FFF",
                border: "1px solid #DDD",
                letterSpacing: "0.5px",
                cursor: "pointer",
                textTransform: "none",
                ml: 2,
                boxShadow: "none",
                borderRadius: "8px",
                background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
                backgroundClip: "text",
                "-webkitBackgroundClip": "text",
                "-webkitTextFillColor": "transparent",
                ":hover": {
                  border: "1px solid #369D9C",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundImage:
                  "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
                fontWeight: 400,
                fontSize: "14px",
                padding: ".5rem 1.5rem",
                fontFamily: "Inter",
                color: "#FFF",
                border: "1px solid #DDD",
                letterSpacing: "0.5px",
                cursor: "pointer",
                textTransform: "none",
                ml: 2,
                boxShadow: "none",
                borderRadius: "8px",
              }}
              onClick={showCroppedImage}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
