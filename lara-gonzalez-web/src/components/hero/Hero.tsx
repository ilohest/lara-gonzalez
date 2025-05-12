import React from "react";
import "./Hero.scss";
import Heading from "../heading/Heading";
import Picture from "src/atoms/Picture";

interface HeroProps {
  hero: {
    title: string;
    subtitle?: string;
    gallery: { url: string; alt: string }[];
  };
  backgroundColor: string;
  themeMode: "light-mode" | "dark-mode";
  size: any;
}

const Hero: React.FC<HeroProps> = ({ hero, backgroundColor, themeMode, size }) => {
  
  return (
    <section className="hero wrapper-fluid" style={{ backgroundColor }}>
      <div className="hero__header">
        <Heading tag="h1" size={size} color={themeMode === "light-mode" ? "dark" : "light"}>
        <span className="heading heading--primary">{hero.title}</span>
        <span className="heading heading--secondary">{hero.subtitle}</span>
        </Heading>
      </div>
      <div className="hero__gallery">
          {hero.gallery.map((img, index) => (
            <Picture
              key={`image-${index}`}
              className={`studio-gallery studio-gallery-${index}`}
              fetchPriority="high"
              blurPreload={true}
              src={img.url}
              alt={img.alt}
            />
          ))}
      </div>
    </section>
  );
};

export default Hero;
