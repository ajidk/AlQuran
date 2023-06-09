import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSwipe = (event: React.TouchEvent<HTMLImageElement>) => {
    const { clientX: startX } = event.touches[0];

    const handleTouchMove = (event: TouchEvent) => {
      const { clientX: currentX } = event.touches[0];
      const deltaX = startX - currentX;

      if (deltaX > 50 && currentImageIndex < images.length - 1) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      } else if (deltaX < -50 && currentImageIndex > 0) {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" onClick={previousImage}>
          Previous
        </Button>
      </Grid>
      {images.map((imageUrl, index) => (
        <img
          src={imageUrl}
          alt={`Image ${index + 1}`}
          key={index}
          onTouchStart={handleSwipe}
          style={{ display: index === currentImageIndex ? "block" : "none" }}
        />
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={nextImage}>
          Next
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">{`Image ${currentImageIndex + 1} of ${
          images.length
        }`}</Typography>
      </Grid>
    </Grid>
  );
};

export default Carousel;
