import React from "react";
import closeIcon from "../../assets/icons/close.svg";


import "./SideMenu.scss";
import type { AddressModel, RSModel } from "@lara/models/generic.model";

interface Props {
  open: boolean;
  setOpen: Function;
  email: string | undefined;
  address: AddressModel | undefined;
  rrss: RSModel[] | undefined;
}

const SideMenu = ({ open, setOpen, email, address, rrss }: Props) => {
  const classOpen = open ? " side-menu--open" : "";

  return (
    <dialog className={`side-menu${classOpen}`}>
      <button
        title="Menu cerrar"
        id="button-side-menu-close"
        className="button-side-menu-close"
        aria-expanded="false"
        onClick={() => {
          setOpen(false);
        }}>
        <img src={closeIcon.src} width={32} height={32} alt="Cerrar menú" />
      </button>
      <nav className="side-menu__nav">
        <ul>
        <li>
            <a href="/">Lara González</a>
          </li>
          <li>
            <a href="/proyectos">Proyectos</a>
          </li>
          <li>
            <a href="/el-estudio">El estudio</a>
          </li>
        </ul>
      </nav>
      <div className="side-menu__bottom">
        {/* {email && (
          <a className="side-menu__email" href={`emailto:${email}`}>
            {email}
          </a>
        )} */}
        {rrss && (
          <div className="side-menu__social">
            {rrss.map((rs: RSModel, index: number) => {
              return (
                <a key={index} href={rs.link} target="_blank">
                  {rs.name}
                </a>
              );
            })}
          </div>
        )}
        <a className="button button--link button--light" href="/contacto">
          ¿Hablamos?
        </a>
      </div>
    </dialog>
  );
};

export default SideMenu;
