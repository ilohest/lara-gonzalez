import React from "react";
import "./Hero.scss";
import Heading from "../heading/Heading";

interface HeroProps {
  hero: {
    title: string;
    subtitle: string;
    gallery: string[];
  };
  backgroundColor: string;
  textColor: string;
}

const Hero: React.FC<HeroProps> = ({ hero, backgroundColor, textColor }) => {
  return (
    <section className="hero wrapper-fluid" style={{ backgroundColor, color: textColor }}>
      <div className="hero__header">
        <Heading tag="h1" size="xl" headingFontWeight={900}>{hero.title}</Heading>
        <Heading tag="h1" size="xl" headingFontWeight={900}>{hero.subtitle}</Heading>
      </div>
      <div className="hero__gallery">
          {hero.gallery.map((img, index) => (
            <img key={index} src={img} alt={`Gallery image ${index}`} />
          ))}
      </div>
    </section>
  );
};

export default Hero;
