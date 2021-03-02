import React, { useState } from "react";
import "./Slide.css";

const Slide = (props) => {
  const [userAnswer, setUserAnswer] = useState("");

  const answerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const highlightParagraph = () => {
    console.log("calling highlightParagraph()");
    let msg = {
      subject: "highlightParagraph",
      parId: props.slide.par_id,
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, msg);
    });
  };

  const highlightSentence = () => {
    console.log("calling highlightSentence()");
    let msg = {
      subject: "highlightSentence",
      parId: props.slide.par_id,
      sentId: props.slide.sent_num,
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, msg);
    });
  };

  return (
    <li
      className={
        props.index == props.activeIndex
          ? "carousel__slide carousel__slide--active"
          : "carousel__slide"
      }
    >
      <p className="carousel-slide__content">{props.slide.question}</p>

      <form>
        <label>
          <input type="text" value={userAnswer} onChange={answerChange} />
        </label>
      </form>

      <div className="hint-panel">
        <button
          className="hint-btn"
          onClick={highlightParagraph}
          title="Hint: highlight paragraph"
        >
          <i style={{ color: "yellow" }} className="fa fa-2x fa-paragraph" />
        </button>
        <button
          className="hint-btn"
          onClick={highlightSentence}
          title="Hint: highlight sentence"
        >
          <i style={{ color: "purple" }} className="fa fa-2x fa-highlighter" />
        </button>

        {/* <button onClick={highlightParagraph}>Hint 1</button>
        <button onClick={highlightSentence}>Hint 2</button> */}
      </div>

      <p>
        {props.showAns && (
          <strong className="carousel-slide__author">
            {props.slide.answer}
          </strong>
        )}
      </p>
    </li>
  );
};

export default Slide;
