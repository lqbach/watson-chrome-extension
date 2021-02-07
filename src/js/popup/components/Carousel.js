import React, { useState, useEffect } from "react";
import Slide from "./Slide.js";
import "./Carousel.css";

const Carousel = (props) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  const goToSlide = (num) => {
    console.log(slides.length);
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

    if (currIndex < 1) {
      setCurrIndex(slides.length);
    }

    setCurrIndex(currIndex - 1);
  };

  const fetchQuestions = async (paragraph) => {
    let context = paragraph.par;
    console.log("CALLING API WITH THE FOLLOWING CONTEXT:");
    console.log(context);
    const response = await fetch(process.env.REACT_APP_SERVER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ context: context }),
    });

    console.log(response);
    const data = await response.json();
    data["qa"].forEach((el) => (el.par_id = paragraph.parIndex));
    console.log("RECEIVED FETCH FROM SERVER");
    console.log(data["qa"]);
    return data["qa"];
  };

  const selectRandom = (array, max) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    let num = max;
    if(num > array.length){
      num = array.length;
    }

    return array.slice(0, num);

  };

  useEffect(() => {
    console.log("USE EFFECT CALLED BECAUSE PARAGRAPHS HAVE BEEN CHANGED");
    console.log(props.paragraphs);
    let quests = [];

    props.paragraphs.forEach((par) => quests.push(fetchQuestions(par)));

    console.log("QUESTIONS PUSHED INTO QUEUE");
    console.log(quests);

    Promise.allSettled(quests).then((results) => {
      console.log("CREATED NEW QUESTIONS");
      let new_quests = [];

      results.forEach((result) => {
        console.log(result);
        if (result.status === "fulfilled") {
          console.log("CONCATTED QUESTIONS");
          new_quests = new_quests.concat(result.value);
        }
      });
      console.log(new_quests);
      new_quests = selectRandom(new_quests, 5);
      console.log(new_quests);
      setSlides(new_quests);
    });
  }, [props.paragraphs]);

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
        {slides.map((slide, index) => (
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
        {slides.map((slide, index) => (
          <li>
            <a
              className={
                index == currIndex
                  ? "carousel__indicator carousel__indicator--active"
                  : "carousel__indicator"
              }
              onClick={() => goToSlide(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
