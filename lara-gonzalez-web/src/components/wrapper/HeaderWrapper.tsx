import Header from "@lara/layouts/Header";
import React, { useEffect, useState } from "react";
import Hero from "../hero/Hero";

interface HeroData {
  title: string;
  subtitle?: string;
  gallery: { url: string; alt: string }[];
}

const rrss = [
  { platform: "Instagram", url: "https://www.instagram.com/lara.gonzalez.estudio?igsh=MWgxZDZkZWdkN3dtZw==" },
  { platform: "Linkedin", url: "https://www.linkedin.com/in/lara-gonz%C3%A1lez-775271133/" }
];

const email = "hola@laragonzalez.com"

const WrapperHeader = ({ 
  hero,
}: {
  hero?: HeroData; 
}) => {
  const [backgroundColor, setBackgroundColor] = useState("var(--color-light)");
  const [themeMode, setThemeMode] = useState<"light-mode" | "dark-mode">("light-mode");
  const [pageTitle, setPageTitle] = useState<string>("");
  const [size, setSize] = useState<string>("lg");

  const cleanPath = (path: string): string => {
    return path === "/" ? "/" : path.replace(/\/$/, "");
  };

  const pageTitles: { [key: string]: string } = {
    "/": "page__home",
    "/proyectos": "page__proyectos",
    "/contacto": "page__contacto",
    "/politica-privacidad": "page__legal",
    "/politica-cookies": "page__legal",
    "/el-estudio": "page__estudio"
  };

  const getPageTitle = (path: string) => {
    const normalizedPath = cleanPath(path);
   return pageTitles[normalizedPath] || "Página No Encontrada";
  };


  const getBackgroundColor = (path: string) => {
    const normalizedPath = cleanPath(path);
    switch (normalizedPath) {
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
    const normalizedPath = cleanPath(path);
    switch (normalizedPath) {
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

  // Para el HERO, solo la home tiene size "hg", el resto tiene size "lg"
  const getHeadingSize = (path: string) => {
    return path === "/" ? "hg" : "big";  
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setBackgroundColor(getBackgroundColor(path));
      setThemeMode(getThemeMode(path));
      setPageTitle(getPageTitle(path));
      setSize(getHeadingSize(path));
    }
  }, []);

  return (
    <header style={{ backgroundColor }} className={`header-wrapper ${pageTitle}`}>
      <Header email={email} rrss={rrss} backgroundColor={backgroundColor} themeMode={themeMode} />
      {hero && <Hero hero={hero} size={size} backgroundColor={backgroundColor} themeMode={themeMode} />}
    </header>
  );
};

export default WrapperHeader;
