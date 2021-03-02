import React, { useState, useEffect, useRef } from "react";
import Slide from "./Slide.js";
import "./Carousel.css";
import load_gif from "../../../img/loading.gif";

const Carousel = (props) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

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
    if (num > array.length) {
      num = array.length;
    }

    return array.slice(0, num);
  };

  /**
   * TODO UPDATE: 2/25 below has been commented out to test question UI
   */

  useEffect(() => {
    if (isMounted.current) {
      props.onCarouselChange();
      setIsLoading(true);
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
        setIsLoading(false);
      });
    } else {
      isMounted.current = true;
    }
  }, [props.paragraphs]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   console.log("USE EFFECT CALLED BECAUSE PARAGRAPHS HAVE BEEN CHANGED");
  //   console.log(props.paragraphs);
  //   let quests = [
  //     {
  //       ans_idx: 1,
  //       answer: "Hololive Production",
  //       question: "What is the best VTuber production agency?",
  //       sent_num: 0,
  //       par_id: 0,
  //     },
  //     {
  //       ans_idx: 55,
  //       answer: "August",
  //       question: "When did the 2nd generation of Hololive talents debut?",
  //       sent_num: 0,
  //       par_id: 4,
  //     },
  //     {
  //       ans_idx: 132,
  //       answer: "Nakiri Ayame, Yuzuki Choco,[16] and Oozora Subaru",
  //       question:
  //         "Who did the 2nd generation of Hololive talents debut in September?",
  //       sent_num: 0,
  //       par_id: 4,
  //     },
  //     {
  //       ans_idx: 92,
  //       answer: "15 November",
  //       question: "When did Cover debut AZKi?",
  //       sent_num: 1,
  //       par_id: 4,
  //     },
  //     {
  //       ans_idx: 19,
  //       answer: "AZKi",
  //       question: "What was the name of the VTuber released by Cover?",
  //       sent_num: 1,
  //       par_id: 4,
  //     },
  //     {
  //       ans_idx: 1,
  //       answer: "18",
  //       question: "What year did Cover debut AZKi?",
  //       sent_num: 2,
  //       par_id: 4,
  //     },
  //   ];
  //   setSlides(quests);
  //   setIsLoading(false);
  //   props.onCarouselChange();
  // }, [props.paragraphs]);

  return isLoading ? (
    <img src={load_gif} className="animated-gif" alt="loading..." />
  ) : (
    <div className="carousel">
      {currIndex != 0 && (
        <a
          href="#"
          className="carousel__arrow carousel__arrow--left"
          onClick={goToPrevSlide}
        >
          <span className="fa fa-2x fa-angle-left" />
        </a>
      )}
      <ul className="carousel__slides">
        {slides.map((slide, index) => (
          <Slide
            showAns={props.showAnswers}
            key={index}
            index={index}
            activeIndex={currIndex}
            slide={slide}
          />
        ))}
      </ul>

      {currIndex != slides.length - 1 && (
        <a
          href="#"
          className="carousel__arrow carousel__arrow--right"
          onClick={goToNextSlide}
        >
          <span className="fa fa-2x fa-angle-right" />
        </a>
      )}

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
