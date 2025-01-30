import React, { useEffect, useState } from "react";
import menuLogo from "../assets/icons/menu.svg";


import "./Header.scss";
import type { AddressModel, RSModel } from "@lara/models/generic.model";
import SideMenu from "@lara/components/side-menu/SideMenu";

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
        <nav className="header__main-nav">
          <a className="button--link header__main-nav--item" aria-label="Ir a página principal" href="/">
            Lara González
          </a>
          <a className="button--link header__main-nav--item" aria-label="Ir a página de proyectos" href="/proyectos">
            Proyectos
          </a>
          <a className="button--link header__main-nav--item" aria-label="Ir a página del estudio" href="/el-estudio">
            El estudio
          </a>
          <a className="button button--link button--dark" aria-label="Ir a página de contacto" href="/contacto">
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
