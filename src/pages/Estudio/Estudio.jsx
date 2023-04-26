import React, { useState } from "react";
import "./estudio.css";

import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";

import { partners, espacies, espacios,spaces } from "../../constants";
import { about1, about2, about3, wbf1, profile } from "../../assets";



const Estudio = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const {t} = useTranslation("global")

const language = useSelector(state => state.language)

var lista;
if(language === "es") {
  lista = espacios
} else if (language === "en"){
  lista = spaces
} else {
  lista = espacies
}

  function handleClick(index) {
    setActiveTab(index);
    setActiveIndex(index);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="estudio">
              <ul className="estudio-list">
                {lista.map((espacio, index) => (
                  <li
                    key={index}
                    onClick={() => handleClick(index)}
                    className={activeIndex === index ? "active" : ""}
                  >
                    {espacio}
                  </li>
                ))}
              </ul>
              {/* SOBRE NOSOTROS */}
              <div
                className="sobre-nosotros"
                style={{ display: activeTab === 0 ? "block" : "none" }}
              >
                <h5 className="title">d'aura arquitectura</h5>
                <p className="general-text">{t("estudio-page.sobre-nosotros-1")}</p>

                <div className="sobre-nosotros-img">
                  <img src={about1} alt="about" className="img-fluid" />
                  <img src={about2} alt="about" className="img-fluid" />
                  <img src={about3} alt="about" className="img-fluid" />
                </div>

                <p className="general-text">{t("estudio-page.sobre-nosotros-2")}</p>
                <ul className="partner-list">
                  {partners.map((partner, index) => (
                    <li key={index}>
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {partner.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <div>
                  <img src={wbf1} alt="" className="img-fluid" />
                </div>
              </div>

              {/* EQUIPO */}
              <div
                className="eqiupo"
                style={{ display: activeTab === 1 ? "block" : "none" }}
              >
                <p className="general-text">{t("estudio-page.equipo")}</p>
                <div className="equipo-profile">
                  <div className="profile">
                    <img src={profile} alt="" className="img-fluid" />
                    <p>Núria Ayala i Mitjavila</p>
                  </div>
                  <div className="profile">
                    <img src={profile} alt="" className="img-fluid" />
                    <p>Joan Ramon Rius</p>
                  </div>
                  <div className="profile">
                    <img src={profile} alt="" className="img-fluid" />
                    <p>Miquel García Soler</p>
                  </div>
                  <div className="profile">
                    <img src={profile} alt="" className="img-fluid" />
                    <p>Núria Ayala i Mitjavila</p>
                  </div>
                  <div className="profile">
                    <img src={profile} alt="" className="img-fluid" />
                    <p>Núria Ayala i Mitjavila</p>
                  </div>
                  <div className="profile">
                    <img src={profile} alt="" className="img-fluid" />
                    <p>Núria Ayala i Mitjavila</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Estudio;
