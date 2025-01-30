import Header from "@lara/layouts/Header";
import React, { useEffect, useState } from "react";
import Hero from "../hero/Hero";

interface HeroData {
  title: string;
  subtitle: string;
  gallery: string[];
}

const WrapperHeader = ({ 
  hero,
  email,
}: {
  hero?: HeroData; 
  email?: string;
}) => {
  const [backgroundColor, setBackgroundColor] = useState("var(--color-light)");
  const [textColor, setTextColor] = useState("var(--color-dark-contrast)");

  const getBackgroundColor = (path: string) => {
    switch (path) {
      case "/":
        return "var(--color-dark)";
      case "/proyectos":
        return "var(--color-secondary)";
      case "/el-estudio":
        return "var(--color-tertiary)";
      case "/contacto":
        return "var(--color-light)";
      case "/politica-privacidad":
          return "var(--color-light)";
      case "/politica-cookies":
          return "var(--color-light)";
      default:
        return "var(--color-light)";
    }
  };

  const getTextColor = (path: string) => {
    switch (path) {
      case "/":
        return "var(--color-light)";
      case "/proyectos":
        return "var(--color-secondary-contrast)";
      case "/el-estudio":
        return "var(--color-tertiary-contrast)";
      case "/contacto":
        return "var(--color-dark)";
      case "/politica-privacidad":
          return "var(--color-dark)";
      case "/politica-cookies":
          return "var(--color-dark)";
      default:
        return "var(--color-light)";
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setBackgroundColor(getBackgroundColor(path));
      setTextColor(getTextColor(path));
    }
  }, []);

  return (
    <div style={{ backgroundColor, color: textColor }}>
      <Header email={email} backgroundColor={backgroundColor} textColor={textColor} />
      {hero && <Hero hero={hero} backgroundColor={backgroundColor} textColor={textColor} />}
    </div>
  );
};

export default WrapperHeader;
