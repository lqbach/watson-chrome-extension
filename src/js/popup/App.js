/*global chrome*/
import "./App.css";
import React, { useEffect, useState } from "react";
import Button from "./components/Button.js";
import QuestionList from "./components/QuestionList";
import Header from "./components/Header";
import { hot } from "react-hot-loader";

const App = (props) => {
  const [qlist, setQlist] = useState(false);
  const [contentPars, setContentPars] = useState([]);

  const getPageData = () => {
    console.log("calling getPageData()")
    let msg = {
      subject: "getParsFromContent",
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, msg);
    });

    setQlist(true);
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
    console.log("SELECTED FOLLOWING PARAGRAPHS FOR EXTRACTION:")
    console.log(pars)
    return pars;
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      if (msg.from === "content" && msg.subject === "retrievePars") {
        let pars = selectPars(msg.pars);
        setContentPars(pars);
      }
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Button onClick={getPageData}>Click Me!</Button>
      <QuestionList paragraphs={contentPars} showList={qlist} />
    </div>
  );
};

export default hot(module)(App);
