import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Usa la importación de Swiper directamente
import "swiper/css";
import "swiper/css/navigation";  // Estilos de navegación
import "swiper/css/thumbs"; // Estilos de miniaturas
import ImageWrapper from "../wrapper/ImageWrapper";
import "./ImageSlider.scss";


interface ImageSliderProps {
  images: { url: string; name: string; alt: string; width: number; height: number }[];
  index: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, index }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <section className="image-slider">
      {/* Slider principal */}
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={16}
        autoplay={false}
        simulateTouch={true}
        thumbs={{ swiper: thumbsSwiper }} // Conecta las miniaturas con el slider principal
        //modules={[Navigation, Thumbs]} // Usa los módulos directamente
      >
        {images.map((slide, i) => (
          <SwiperSlide key={i}>
            <ImageWrapper image={slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider de miniaturas */}
      <Swiper
        onSwiper={setThumbsSwiper} // Conecta el swiper de miniaturas al principal
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        //watchSlidesVisibility={true}
        watchSlidesProgress={true}
        //modules={[Thumbs]} // Solo el módulo de miniaturas
        className="thumbs"
      >
        {images.map((slide, i) => (
          <SwiperSlide key={i}>
            <img
              src={slide.url}
              alt={slide.alt}
              className="thumb"
              style={{ width: 80, height: 80, objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ImageSlider;
