/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import './home.css';

import { motion } from 'framer-motion';
import { changeDocTitle } from '../../hooks/hooks';

import { axiosInstance } from '../../services/axiosInstance';

function Home({ setLogoColor }) {
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    setLogoColor();
  }, []);

  const location = 'Home';

  const getHomeBanner = async () => {
    const imageArray = [];
    const { data } = await axiosInstance().get('/banner?populate[imagen1][fields][0]=url&populate[imagen2][fields][0]=url&populate[imagen3][fields][0]=url&populate[video][fields][0]=url');
    if (data?.attributes?.imagen1?.data?.attributes?.url) imageArray.push(data?.attributes?.imagen1?.data?.attributes?.url);
    if (data?.attributes?.imagen2?.data?.attributes?.url) imageArray.push(data?.attributes?.imagen2?.data?.attributes?.url);
    if (data?.attributes?.imagen3?.data?.attributes?.url) imageArray.push(data?.attributes?.imagen3?.data?.attributes?.url);
    setImages(imageArray);

    const video = data?.attributes?.video?.data?.attributes?.url;
    if (video) setVideoUrl(video);
  };

  useEffect(() => {
    changeDocTitle(location);
  }, [location]);

  useEffect(() => {
    getHomeBanner();
  }, []);

  const showVideo = videoUrl && images.length === 0;

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
                    {images.length > 0 && images.map((image, index) => (
                      <div
                        className={`carousel-item${index === 0 ? ' active' : ''}`}
                        key={image}
                      >
                        <img
                          className="d-block img-fluid hero-img"
                          src={image}
                          alt="Home slide"
                          width="1100px"
                          height="540px"
                        />
                      </div>
                    ))}
                  </div>
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
                </div>

                <div className="mobile-home">
                  {images.length > 0 && images.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt="Home"
                      className="img-fluid mobile-hero-img"
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
