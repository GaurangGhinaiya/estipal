import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, IconButton } from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageDialog = ({
  open,
  handleCloseDialog,
  selectedIndex,
  setSelectedIndex,
  imageData,
}) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
      <div className="relative bg-[#ffffff] p-5">
        <IconButton
          onClick={handleCloseDialog}
          style={{ position: "absolute", right: 10, top: 10, color: "white" }}
        >
          <CloseIcon />
        </IconButton>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={50}
          slidesPerView={1}
          initialSlide={selectedIndex}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {imageData?.map(
            (item, index) =>
              item && (
                <SwiperSlide
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item}
                    alt={`Slide ${index + 1}`}
                    className="h-[250px] sm:h-[600px] mx-auto align-middle !select-none"
                  />
                </SwiperSlide>
              )
          )}

          <div className="flex justify-end mt-[20px]">
            <Button
              className="!bg-[#dd4b39] !text-white"
              onClick={handleCloseDialog}
            >
              Close
            </Button>
          </div>
        </Swiper>
      </div>
    </Dialog>
  );
};

export default ImageDialog;
