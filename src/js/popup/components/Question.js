import React, { useEffect, useState } from "react";

const Question = (props) => {
  const highlightParagraph = () => {
    let msg = {
      subject: "highlightParagraph",
      parId: props.parId,
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, msg);
    });
  };

  const highlightSentence = () => {
    let msg = {
      subject: "highlightSentence",
      sentId: props.sentId,
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, msg);
    });
  };

  return (
    <div>
      <div className="question">{props.question}</div>
      <div>
        <button onClick={highlightParagraph}>Par</button>
        <button onClick={highlightSentence}>Sent</button>
      </div>
    </div>
  );
};

export default Question;
