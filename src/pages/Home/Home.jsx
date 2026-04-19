/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './home.css';

import { motion } from 'framer-motion';
import { changeDocTitle } from '../../hooks/hooks';

import { axiosInstance } from '../../services/axiosInstance';

function Home({ setLogoColor }) {
  const [slides, setSlides] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLogoColor();
  }, []);

  const location = 'Home';

  const getHomeBanner = async () => {
    const { data } = await axiosInstance().get(
      '/banner?populate[slides][populate][imagen][fields][0]=url&populate[slides][populate][proyecto][fields][0]=id&populate[slides][populate][proyecto][fields][1]=nombre&populate[video][fields][0]=url',
    );

    const rawSlides = data?.attributes?.slides || [];
    const parsed = rawSlides
      .filter((s) => s?.imagen?.data?.attributes?.url)
      .map((s) => ({
        imageUrl: s.imagen.data.attributes.url,
        projectId: s.proyecto?.data?.id || null,
      }));
    setSlides(parsed);

    const video = data?.attributes?.video?.data?.attributes?.url;
    if (video) setVideoUrl(video);
  };

  useEffect(() => {
    changeDocTitle(location);
  }, [location]);

  useEffect(() => {
    getHomeBanner();
  }, []);

  const showVideo = videoUrl && slides.length === 0;

  const handleSlideClick = (projectId) => {
    if (projectId) {
      navigate(`/proyectos/${projectId}`);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200, transition: { duration: 0.2 } }}
      transition={{ duration: 1 }}
      className="home-section"
      key="/"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            {showVideo ? (
              <div className="hero-video-wrapper">
                <video
                  className="hero-video"
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            ) : (
              <>
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    {slides.length > 0 && slides.map((slide, index) => (
                      <div
                        className={`carousel-item${index === 0 ? ' active' : ''}`}
                        key={slide.imageUrl}
                        onClick={() => handleSlideClick(slide.projectId)}
                        style={slide.projectId ? { cursor: 'pointer' } : {}}
                        role={slide.projectId ? 'button' : undefined}
                        tabIndex={slide.projectId ? 0 : undefined}
                        onKeyDown={(e) => {
                          if (slide.projectId && (e.key === 'Enter' || e.key === ' ')) {
                            handleSlideClick(slide.projectId);
                          }
                        }}
                      >
                        <img
                          className="d-block img-fluid hero-img"
                          src={slide.imageUrl}
                          alt="Home slide"
                          width="1100px"
                          height="540px"
                        />
                      </div>
                    ))}
                  </div>
                  {slides.length > 1 && (
                    <>
                      <a
                        className="carousel-control-prev"
                        href="#carouselExampleControls"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#carouselExampleControls"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next</span>
                      </a>
                    </>
                  )}
                </div>

                <div className="mobile-home">
                  {slides.length > 0 && slides.map((slide) => (
                    <img
                      key={slide.imageUrl}
                      src={slide.imageUrl}
                      alt="Home"
                      className="img-fluid mobile-hero-img"
                      onClick={() => handleSlideClick(slide.projectId)}
                      style={slide.projectId ? { cursor: 'pointer' } : {}}
                      role={slide.projectId ? 'button' : undefined}
                      tabIndex={slide.projectId ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (slide.projectId && (e.key === 'Enter' || e.key === ' ')) {
                          handleSlideClick(slide.projectId);
                        }
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Home;
