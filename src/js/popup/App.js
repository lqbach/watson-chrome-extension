/*global chrome*/

import React, { useEffect } from "react";
import Button from "./components/Button.js";
import { hot } from "react-hot-loader";

const App = (props) => {
  const getPageData = () => {
    console.log("getting page data");

    let msg = {
      txt: "hello",
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, msg);
    });
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      console.log("I heard something!");
      if (msg.from === "content" && msg.subject === "retrievePars") {
        console.log("Retreived message from content");
        console.log(msg.pars);
      }
    });
  });

  return (
    <div className="App">
      <h1>Hello! </h1>
      <Button onClick={getPageData}>Click Me!</Button>
    </div>
  );
};

export default hot(module)(App);
