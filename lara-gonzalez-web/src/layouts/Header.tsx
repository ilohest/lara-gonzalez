import React, { useState } from "react";
import menuLogo from "../assets/icons/menu.svg";
import "./Header.scss";
import type { AddressModel, RSModel } from "@lara/models/generic.model";
import SideMenu from "@lara/components/side-menu/SideMenu";

const Header = ({
  email,
  address,
  rrss,
  backgroundColor,
  textColor,
}: {
  email: string | undefined;
  address?: AddressModel | undefined;
  rrss?: RSModel[] | undefined;
  backgroundColor: string;
  textColor: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="wrapper-fluid" style={{ backgroundColor }}>
      <nav className="header__main-nav" style={{ color: textColor }}>
        <a className="button--link header__main-nav--item" href="/">Lara González</a>
        <a className="button--link header__main-nav--item" href="/proyectos">Proyectos</a>
        <a className="button--link header__main-nav--item" href="/el-estudio">El estudio</a>
        <a className="button button--dark" href="/contacto">¿Hablamos?</a>
      </nav>
      <button
        id="button-side-menu-open"
        className="button-side-menu-open"
        onClick={() => setOpen(true)}
      >
        <img src={menuLogo.src} width={45} height={8} alt="Open menu" />
      </button>
      <SideMenu open={open} setOpen={setOpen} email={email} address={address} rrss={rrss} />
    </header>
  );
};

export default Header;
