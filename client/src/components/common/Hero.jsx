import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import Button from "./Button";
import "../../styles/Hero.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import imgHero1 from "/src/assets/imgs/hero1.avif";
import imgHero2 from "/src/assets/imgs/hero2.avif";
import imgHero3 from "/src/assets/imgs/hero3.avif";
import DumbbellIcon from "../icons/DumbbellIcon";

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: imgHero1,
    },
    {
      id: 2,
      image: imgHero2,
    },
    {
      id: 3,
      image: imgHero3,
    },
  ];

  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        speed={1000}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              <div
                className="hero-background"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-overlay"></div>
              </div>
              <div className="hero-content">
                <div className="logo-img">
                  <img src="/favicon.svg" alt="Logotipo Valus" />
                </div>
                <h2 className="hero-title">VALUS</h2>
                <h3>FUERZA Y RENDIMIENTO</h3>
                <Button
                  onClick={() =>
                    document
                      .getElementById("plans")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={"cta-button"}
                  text="Empieza"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-features">
        <div className="feature">
          <DumbbellIcon />
          <span>EQUIPAMIENTO DE CALIDAD</span>
        </div>
        <div className="feature">
          <DumbbellIcon />
          <span>ENTRENADORES EN FORMACIÓN CONTINUA</span>
        </div>
        <div className="feature">
          <DumbbellIcon />
          <span>APP PARA TRACKEO DE ENTRENAMIENTO</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
