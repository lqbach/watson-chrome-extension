import React, { useState, useEffect } from "react";
import Slide from "./Slide.js";
import "./Carousel.css";

const Carousel = (props) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  const goToSlide = (num) => {
    if (num < 0 || num > slides.length - 1) {
      return;
    }
    setCurrIndex(num);
  };

  const goToNextSlide = () => {
    if (slides.length == 0) {
      return;
    }

    if (currIndex == slides.length - 1) {
      setCurrIndex(-1);
    }

    setCurrIndex(currIndex + 1);
  };

  const goToPrevSlide = () => {
    if (slides.length == 0) {
      return;
    }

    if (currIndex == 0) {
      setCurrIndex(slides.length);
    }

    setCurrIndex(currIndex - 1);
  };

  return (
    <div className="carousel">
      <a
        href="#"
        className="carousel__arrow carousel__arrow--left"
        onClick={goToPrevSlide}
      >
        <span className="fa fa-2x fa-angle-left" />
      </a>

      <ul className="carousel__slides">
        {props.slides.map((slide, index) => (
          <Slide
            key={index}
            index={index}
            activeIndex={currIndex}
            slide={slide}
          />
        ))}
      </ul>

      <a
        href="#"
        className="carousel__arrow carousel__arrow--right"
        onClick={goToNextSlide}
      >
        <span className="fa fa-2x fa-angle-right" />
      </a>

      <ul className="carousel__indicators">
        {props.slides.map((slide, index) => (
          <li>
            <a
              className={
                index == currIndex
                  ? "carousel__indicator carousel__indicator--active"
                  : "carousel__indicator"
              }
              onClick={goToSlide(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
