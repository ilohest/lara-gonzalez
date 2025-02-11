import React from "react";
import "./Hero.scss";
import Heading from "../heading/Heading";

interface HeroProps {
  hero: {
    title: string;
    subtitle?: string;
    gallery: string[];
  };
  backgroundColor: string;
  themeMode: "light-mode" | "dark-mode";
  size: any;
}

const Hero: React.FC<HeroProps> = ({ hero, backgroundColor, themeMode, size }) => {
  return (
    <section className="hero wrapper-fluid" style={{ backgroundColor }}>
      <div className="hero__header">
        <Heading tag="h1" size={size} color={themeMode === "light-mode" ? "dark" : "light"}>{hero.title}</Heading>
        <Heading tag="h2" size={size} color={themeMode === "light-mode" ? "dark" : "light"} fontFamily="secondary">{hero.subtitle}</Heading>
      </div>
      <div className="hero__gallery">
          {hero.gallery.map((img, index) => (
            <img key={`image-${index}`} className={`studio-gallery studio-gallery-${index}`} src={img} alt={`Lara González gallery image ${index}`} />
          ))}
      </div>
    </section>
  );
};

export default Hero;
