import React, { useEffect, useState } from "react";
import "./navbar.css";

import Logo from "../Logo/Logo";

import { useLocation } from "react-router";

import { useSelector } from "react-redux";

import { motion } from "framer-motion";

// import logo from "../../assets/dauralogo.svg";

import translations from "../../utils/languages.json";

const Navbar = () => {
  const location = useLocation();
  console.log("🚀 ~ file: Navbar.jsx:18 ~ Navbar ~ location:", location.pathname)

useEffect(()=> {

},[])

   
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const lang = useSelector((state) => state.language);

  const language = translations[lang];

  return (
    <header className="header">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "linear", duration: 1 }}
        exit={{ opacity: 0, y: -100 }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="navbar">
                <div className="link-container">
                  <a href="/proyectos" className="nav-link">
                    {language.proyectos}
                  </a>
                </div>
                <div className="link-container">
                  <a href="/" className="nav-link"/>
                  <Logo color="" width="100px" />
                </div>
                <div className="link-container last">
                  <a href="/estudio" className="nav-link">
                    {language.estudio}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="mobile-navbar">
                <div className="logo">
                  <a href="/" className="nav-link" />
                  <Logo color={`${location.pathname === '/proyectos' ? "red" : "black"}`} width="100px" />
                </div>
                <div
                  className={`hamburger ${isOpen ? "open" : ""}`}
                  onClick={handleToggleMenu}
                >
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
                <div className={`menu ${isOpen ? "open" : ""}`}>
                  <ul className="navbar-menu">
                    <li className="mobile-link">
                      <a href="/proyectos">{language.proyectos}</a>
                    </li>
                    <li className="mobile-link">
                      <a href="/espacios">{language.espacios}</a>
                    </li>
                    <li className="mobile-link">
                      <a href="/estudio">{language.estudio}</a>
                    </li>
                    <li className="mobile-link">
                      <a href="/contacto">{language.contacto}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
