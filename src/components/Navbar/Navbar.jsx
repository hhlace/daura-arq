import React, { useState } from "react";
import "./navbar.css";

import Logo from "../Logo/Logo";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Navbar = ({ logoColor }) => {


  const { t } = useTranslation("global");

  var colorEstudio;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <header className="header">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "linear", duration: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2} }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="navbar">
                <div className="link-container">
                  <a
                    href="/proyectos"
                    className="nav-link"
                    style={{
                      color: `${logoColor ? logoColor : "black"}`,
                    }}
                  >
                    <span>{t("navbar.proyectos")}</span>
                  </a>
                </div>
                <div className="link-container logo-container">
                  <a href="/" className="nav-link" />
                  <Logo logoColor={logoColor} />
                </div>
                <div className="link-container last">
                  <a
                    href="/estudio"
                    className="nav-link"
                    style={{
                      color: `${colorEstudio ? colorEstudio : "black"}`,
                    }}
                  >
                    <span className="last">{t("navbar.estudio")}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="mobile-navbar">
                <div className="logo">
                  <a href="/" className="nav-link" />
                  <Logo logoColor={logoColor} />
                </div>
                <div className={`hamburger open}`} onClick={handleToggleMenu}>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
              <div className={`menu ${isOpen ? "open" : ""}`}>
                <div className="col-12" style={{background: "transparent"}}>
                  <div className="nav-open-container">
                    <div className="logo">
                      <a href="/" className="nav-link" />
                      <Logo logoColor={logoColor} />
                    </div>
                    <div
                      className={`hamburger ${isOpen ? "open" : ""} close-nav`}
                      onClick={handleToggleMenu}
                    >
                      <div className="line"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                </div>

                <ul className="navbar-menu">
                  <li className="mobile-link">
                    <a href="/proyectos">{t("navbar.proyectos")}</a>
                  </li>
                  <li className="mobile-link">
                    <a href="/noticias">{t("footer.noticias")}</a>
                  </li>
                  <li className="mobile-link">
                    <a href="/estudio">{t("navbar.estudio")}</a>
                  </li>
                  <li className="mobile-link">
                    <a href="/contacto">{t("footer.contacto")}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
