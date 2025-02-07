import "./ImageSlider.scss";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules"; 
import "swiper/css/thumbs";
import ImageWrapper from "../wrapper/ImageWrapper";


interface ImageSliderProps {
  images: { url: string; name: string; alt: string; width: number; height: number }[];
  index: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, index }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null); 

  return (
    <section className="image-slider">
      <div className="image-slider__wrapper">
        {/* Swiper principal */}
        <div className="image-slider__main">
          <Swiper
            loop={true}
            //slidesPerView={1}
            spaceBetween={16}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Thumbs]}
            autoplay={false}
            simulateTouch={true}
          >
            {images.map((slide, i) => (
              <SwiperSlide key={slide.url}>
                <ImageWrapper image={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Swiper de miniaturas */}
        <div className="image-slider__thumbs">
          <Swiper
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="thumbs"
          >
            {images.map((slide, i) => (
              <SwiperSlide key={`thumb-${slide.url}`}>
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="thumb"
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
