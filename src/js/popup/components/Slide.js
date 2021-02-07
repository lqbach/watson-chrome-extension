import React from "react";
import "./Slide.css";

const Slide = (props) => {
  return (
    <li
      className={
        props.index == props.activeIndex
          ? "carousel__slide carousel__slide--active"
          : "carousel__slide"
      }
    >
      <p className="carousel-slide__content">{props.slide.question}</p>

      <p>
        <strong className="carousel-slide__author">
          {props.slide.answer}
        </strong>
        ,{" "}
        <small className="carousel-slide__source">
          {props.slide.parId}
        </small>
      </p>
    </li>
  );
};

export default Slide;
