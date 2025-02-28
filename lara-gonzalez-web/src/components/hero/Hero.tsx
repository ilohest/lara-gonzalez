import React, { useEffect } from "react";
import "./Hero.scss";
import Heading from "../heading/Heading";

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
  useEffect(() => {
    function getPageHero() {
      const pageHero = document.querySelector('.hero') as HTMLElement;
      const pageHeader = document.querySelector('.header') as HTMLElement;

      if (window.innerWidth <= 932 && window.innerHeight <= 812) {
        if (pageHero && pageHeader) {
          const deviceHeight = window.innerHeight;
          const pageHeaderHeight = pageHeader.offsetHeight;
          const heroHeight = deviceHeight - pageHeaderHeight;
          console.log(heroHeight);
          pageHero.style.height = `${heroHeight}px`;
        }
      } else {
        pageHero.style.height = "";
      }
    }

    getPageHero();

    const handleResize = () => {
      setTimeout(() => {
        getPageHero();
      }, 50);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            <img key={`image-${index}`} className={`studio-gallery studio-gallery-${index}`} src={img.url} alt={img.alt} />
          ))}
      </div>
    </section>
  );
};

export default Hero;
