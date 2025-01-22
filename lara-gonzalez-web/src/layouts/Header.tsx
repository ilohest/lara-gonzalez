import React, { useEffect, useState } from "react";
import mainLogo from "../assets/images/logo.svg";
import altLogo from "../assets/images/logo.svg";
import menuLogo from "../assets/icons/menu.svg";


import "./Header.scss";
import type { AddressModel, RSModel } from "@lara/models/generic.model";
import SideMenu from "@lara/components/SideMenu/SideMenu";

const Header = ({
  email,
  address,
  rrss,
}: {
  email: string | undefined;
  address?: AddressModel | undefined;
  rrss?: RSModel[] | undefined;
  logoType?: "main" | "alt" | "white";
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
    <>
      <header className="wrapper-fluid">
        {/* <a
          className={`header__logotype header__logotype--mobile header__logotype--main}`}
          aria-label="Ir a la página de inicio"
          href="/"
        >

            <img
              src={mainLogo.src}
              width={176}
              height={63}
              alt="Lara González logo"
            />
          
        </a> */}
        <nav className="header__main-nav">
          <a className="header__main-nav--item" aria-label="Ir a página principal" href="/">
            Lara González
          </a>
          {/* <a
            className={`header__logotype header__logotype--main`}
            aria-label="Ir a la página de inicio"
            href="/"
          >
            <img
              src={mainLogo.src}
              width={176}
              height={63}
              alt="Lara González logo"
            />
          </a> */}
          <a className="header__main-nav--item" aria-label="Ir a página de proyectos" href="/proyectos">
            Proyectos
          </a>
          <a className="header__main-nav--item" aria-label="Ir a página del estudio" href="/el-estudio">
            El estudio
          </a>
          <a className="button button--dark" aria-label="Ir a página de contacto" href="/contacto">
            ¿Hablamos?
          </a>
        </nav>
        <button
          title="Menu"
          id="button-side-menu-open"
          className="button-side-menu-open"
          aria-expanded="false"
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src={menuLogo.src} width={45} height={8} alt="Open menu" />

        </button>
      </header>
      <SideMenu
        open={open}
        setOpen={setOpen}
        email={email}
        address={address}
        rrss={rrss}
      />
    </>
  );
};

export default Header;
