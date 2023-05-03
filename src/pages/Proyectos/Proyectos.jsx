import React, { useEffect, useState } from "react";

import "./proyectos.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { proyectosES, coloresEs } from "../../constants/proyectos-es";
import { proyectosEN, colors } from "../../constants/proyectos-en";
import { proyectosCA, colorsCA } from "../../constants/proyectos-ca";

import {
  listaProyectos,
  projectList,
  listaProjectes,
} from "../../constants/index";

const Proyectos = ({ setLogoColor }) => {
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation("global");

  const idiomas = {
    es: "todos",
    en: "all",
    ca: "tots"
  };

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(idiomas[lang]);

  useEffect(() => {
    setCategoriaSeleccionada(idiomas[lang]);
  }, [lang]);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  function mostrarProyectos(categoria, colores) {
    setCategoriaSeleccionada(categoria);
    setIsOpen(!isOpen);
    setLogoColor(colores[categoria]);
  }


  var proyectos;
  var categorias;
  var colores;
  var lista;

  if (lang === "es") {
    lista = listaProyectos;
    proyectos = proyectosES;
    colores = coloresEs;
    categorias = Object.keys(coloresEs);
  } else if (lang === "en") {
    lista = projectList;
    proyectos = proyectosEN;
    colores = colors;
    categorias = Object.keys(colors);
  } else {
    lista = listaProjectes;
    proyectos = proyectosCA;
    colores = colorsCA;
    categorias = Object.keys(colorsCA);
  }

  return (
    <div className="proyectos">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200, transition: { duration: 0.2} }}
              transition={{ duration: 1, delay: 0.5 }}
              key="proyectos"
            >
              <ul className="categories-list">
                {lista.map((categoria, index) => (
                  <li
                    key={index}
                    onClick={() => mostrarProyectos(categoria, colores)}
                    style={{
                      color:
                        categoria === categoriaSeleccionada
                          ? colores[categoria]
                          : "",
                    }}
                  >
                    {categoria}
                  </li>
                ))}
              </ul>

              <div className="dropdown">
                <h5
                  className="mobile-title"
                  style={{
                    color:
                      categorias === categoriaSeleccionada
                        ? colores[categorias]
                        : "",
                  }}
                >
                  {t("navbar.proyectos").toUpperCase()}
                </h5>
                <button
                  className="dropdown-toggle"
                  onClick={handleToggle}
                  style={{
                    color:
                      categorias === categoriaSeleccionada
                        ? colores[categorias]
                        : "",
                  }}
                >
                  {categoriaSeleccionada.toUpperCase()}
                </button>
                {isOpen && (
                  <ul className="dropdown-menu">
                    {lista.map((categoria, index) => (
                      <li
                        key={index}
                        onClick={() => mostrarProyectos(categoria, colores)}
                        style={{
                          color:
                            categoria === categoriaSeleccionada
                              ? colores[categoria]
                              : "",
                        }}
                      >
                        {categoria}
                        {index < lista.length - 1 && <hr />}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
            <div className="grid-container">
              <div className="wrapper">
                {proyectos.map((proyecto, index) => {
                  if (
                    categoriaSeleccionada === idiomas[lang] ||
                    proyecto.categoria === categoriaSeleccionada
                  ) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        key={index}
                      >
                        <Link
                          to={`/proyectos/${proyecto.categoria}/${proyecto.ref}`}
                          className="link-project"
                        >
                          <div
                            className="proyect-thumb"
                            data-categoria={proyecto.categoria}
                          >
                            <img
                              src={proyecto.images[0]}
                              alt={proyecto.ref}
                              key={index}
                              width="300px"
                              height="300px"
                              className="img-fluid proyect-img"
                            />
                            <div className="proyect-description">
                              <p>
                                {proyecto.short
                                  ? proyecto.short.toUpperCase()
                                  : proyecto.ref}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
