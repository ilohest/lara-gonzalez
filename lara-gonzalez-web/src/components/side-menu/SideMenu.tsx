import React from "react";
import Icon from '../shared/Icon';


import "./SideMenu.scss";
import type { RSModel } from "@lara/models/generic.model";

interface Props {
  open: boolean;
  setOpen: Function;
  email: string | undefined;
  rrss: RSModel[] | undefined;
}

const SideMenu = ({ open, setOpen, email, rrss }: Props) => {
  const classOpen = open ? " side-menu--open" : "";
  const tabIndex = open ? 0 : -1;


  return (
    <dialog className={`side-menu${classOpen}`}>
      <header className="side-menu__header">
        <a
          tabIndex={tabIndex}
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
        <button
          title="Menu cerrar"
          id="button-side-menu-close"
          className="button-side-menu-close"
          aria-expanded="false"
          onClick={() => {
            setOpen(false);
          }}>
          <Icon classes="icon--close" url="icons/close.svg" />
        </button>
      </header>
      <div className="side-menu__wrapper">
        <nav className="side-menu__nav">
          <ul>
            <li>
              <a href="/proyectos" tabIndex={tabIndex}>Proyectos</a>
            </li>
            <li>
              <a href="/el-estudio" tabIndex={tabIndex}>El estudio</a>
            </li>
          </ul>
        </nav>
        <div className="side-menu__bottom">
          <a className="button button--big button--solid-inverse" href="/contacto" tabIndex={tabIndex}>
            ¿Hablamos?
          </a>
          {email && (
            <div className="side-menu__email">
              <a href={`emailto:${email}`} tabIndex={tabIndex}>
                {email}
              </a>
            </div>
          )}
          {rrss && (
            <ul className="side-menu__social">
              {rrss.map((rs: RSModel, index: number) => {
                return (
                  <li key={index}>
                    <a href={rs.url} className="button button--link" target="_blank" tabIndex={tabIndex}>
                      <span>{rs.platform}</span>
                      <Icon classes="icon--arrow" url="icons/arrow.svg" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default SideMenu;
