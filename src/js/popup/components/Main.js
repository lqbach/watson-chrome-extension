import React, { useEffect, useState } from "react";
import Button from "./Button.js";
import QuestionList from "./QuestionList.js";
import Carousel from "./Carousel.js";
import bubbaImg from "../../../img/bubba.png";
import "./Main.css";

const Main = (props) => {
  const [contentPars, setContentPars] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCarouselLoad = () => {
    console.log("triggered handle carouselLoad");
    setShowCarousel(true);
    console.log(showCarousel);
  };

  const handleShowAnswersClick = () => {
    setShowAnswers(true);
  };

  const getPageData = () => {
    console.log("calling getPageData()");
    let msg = {
      subject: "getParsFromContent",
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, msg);
    });
  };

  const selectPars = (paragraphs) => {
    let parIndex = [];
    for (let i = 0; i < paragraphs.length; i++) {
      parIndex.push(i);
    }

    if (parIndex.length > 5) {
      const shuffledIndex = parIndex.sort(() => 0.5 - Math.random());
      parIndex = shuffledIndex.slice(0, 5);
    }

    let pars = parIndex.map((el) => ({ parIndex: el, par: paragraphs[el] }));
    console.log("SELECTED FOLLOWING PARAGRAPHS FOR EXTRACTION:");
    console.log(pars);
    return pars;
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      if (msg.from === "content" && msg.subject === "retrievePars") {
        console.log("CALLING CHROME RUNTIME USEEFFECT LISTENER");
        console.log(contentPars);
        let pars = selectPars(msg.pars);
        setContentPars(pars);
      }
    });
  }, []);

  return (
    <div className="main">
      <div className="main-container">
        <div className={showCarousel ? "hide-content" : "show-content"}>
          <h1>Click On Bubba to Generate Questions!</h1>
          <div className="button-container">
            <img
              className="bubbaImgLrg"
              title="Generate new questions"
              src={bubbaImg}
              onClick={getPageData}
              alt="Generate Questions"
            />
          </div>
        </div>

        <div className={showCarousel ? "show-content" : "hide-content"}>
          <div className="carousel-container">
            <Carousel
              paragraphs={contentPars}
              onCarouselChange={handleCarouselLoad}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              showAnswers={showAnswers}
            />
          </div>
          <div className="button-panel">
            {!isLoading && (showAnswers ? (
              <div>
                <img
                  className="bubbaImgSmall"
                  title="Generate new questions"
                  src={bubbaImg}
                  onClick={getPageData}
                  alt="Generate Questions"
                />
              </div>
            ) : (
              <button onClick={handleShowAnswersClick}>Show Answers</button>
            ))}
          </div>
        </div>

        {/* <QuestionList paragraphs={contentPars} showList={qlist} /> */}
      </div>
    </div>
  );
};

export default Main;
