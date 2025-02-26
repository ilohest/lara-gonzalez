import React, { useEffect, useState } from "react";
import "./Header.scss";
import type { RSModel } from "@lara/models/generic.model";
import SideMenu from "@lara/components/side-menu/SideMenu";
import Icon from '../components/shared/Icon';

const Header = ({
  email,
  rrss,
  backgroundColor,
  themeMode,
}: {
  email: string | undefined;
  rrss: RSModel[] | undefined;
  backgroundColor: string;
  themeMode: "light-mode" | "dark-mode";
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  });
  
  return (
    <header className={`wrapper-fluid header header__${themeMode}`} style={{ backgroundColor }}>
        <a
          className="header__logotype header__logotype--xs"
          aria-label="Ir a la página de inicio"
          href="/"
        >
          <img
            src="icons/lara-gonzalez-light.svg"
            width={165}
            height={12}
            alt="Lara González logo"
          />
        </a>
      <nav className="header__main-nav">
        <a
          className="header__logotype header__logotype--lg"
          aria-label="Ir a la página de inicio"
          href="/"
        >
          <img
            src="icons/lara-gonzalez-light.svg"
            width={190}
            height={15}
            alt="Lara González logo"
          />
        </a> 
        <a className="button button--link header__main-nav--item" href="/proyectos">
          <span>Proyectos</span>
         </a>
        <a className="button button--link header__main-nav--item" href="/el-estudio">
          <span>El estudio</span>
        </a>
        <a className={themeMode === "light-mode" ? "button button--regular button--outline" : "button button--regular button--outline-inverse"} href="/contacto">¿Hablamos?</a>
      </nav>
      <button
        id="button-side-menu-open"
        aria-label="Abrir/Cerrar menú"
        aria-expanded={open ? "true" : "false"}
        className={`button-side-menu-open header__${themeMode}`}
        onClick={() => setOpen(prevState => !prevState)}
      >
        <Icon classes="icon--open" url="icons/menu.svg" />
      </button>
      <SideMenu 
        open={open} 
        setOpen={setOpen} 
        email={email} 
        rrss={rrss} 
      />
    </header>
  );
};

export default Header;
