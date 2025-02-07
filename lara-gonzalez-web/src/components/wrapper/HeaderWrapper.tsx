import Header from "@lara/layouts/Header";
import React, { useEffect, useState } from "react";
import Hero from "../hero/Hero";
import "./HeaderWrapper.scss";


interface HeroData {
  title: string;
  subtitle?: string;
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
  const [themeMode, setThemeMode] = useState<"light-mode" | "dark-mode">("light-mode");

  const getBackgroundColor = (path: string) => {
    switch (path) {
      case "/":
        return "var(--color-primary)";
      case "/proyectos":
      case "/contacto":
      case "/politica-privacidad":
      case "/politica-cookies":
        return "var(--color-light)";
      case "/el-estudio":
        return "var(--color-secondary)";
      default:
        return "var(--color-light)";
    }
  };

  const getThemeMode = (path: string): "light-mode" | "dark-mode" => {
    switch (path) {
      case "/":
        return "dark-mode"; 
      case "/proyectos":
      case "/el-estudio":
      case "/contacto":
      case "/politica-privacidad":
      case "/politica-cookies":
        return "light-mode"; 
      default:
        return "light-mode";
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setBackgroundColor(getBackgroundColor(path));
      setThemeMode(getThemeMode(path));
    }
  }, []);

  return (
    <section style={{ backgroundColor }} className="header-wrapper">
      <Header email={email} backgroundColor={backgroundColor} themeMode={themeMode} />
      {hero && <Hero hero={hero} backgroundColor={backgroundColor} themeMode={themeMode} />}
    </section>
  );
};

export default WrapperHeader;
