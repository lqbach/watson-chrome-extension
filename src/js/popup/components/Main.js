import React, { useEffect, useState } from "react";
import Button from "./Button.js";
import QuestionList from "./QuestionList.js";
import Carousel from "./Carousel.js";
import "./Main.css";

const Main = (props) => {
  const [qlist, setQlist] = useState(false);
  const [contentPars, setContentPars] = useState([]);

  const carouselSlidesData = [
    {
      content:
        "Tomorrow, you will be released. If you are bored of brawling with thieves and want to achieve something there is a rare blue flower that grows on the eastern slopes. Pick one of these flowers. If you can carry it to the top of the mountain, you may find what you were looking for in the first place.",
      author: "Bane",
      source: "facebook",
    },
    {
      content:
        "You have learn to bury your guilt with anger. I will teach you to confront it and to face the truth.",
      author: "Ra's Al Ghul",
      source: "Snapchat",
    },
    {
      content:
        "Introduce a little anarchy, upset the established order and everything becomes chaos. I'm an agent of chaos. Oh, and you know the thing about chaos? It's fair.",
      author: "Joker",
      source: "facebook",
    },
    {
      content:
        "I can't do that as Bruce Wayne... as a man. I'm flesh and blood. I can be ignored, destroyed. But as a symbol, I can be incorruptible, I can be everlasting.",
      author: "Bruce Wayne",
      source: "facebook",
    },
    {
      content:
        "But it's not who you are underneath... it's what you do that defines you.",
      author: "Rachel Dawes",
      source: "twitter",
    },
    {
      content:
        "When their enemies were at the gates the Romans would suspend democracy and appoint one man to protect the city. It wasn't considered an honor, it was a public service.",
      author: "John Blake",
      source: "Google+",
    },
    {
      content:
        "Master Wayne, you've been gone a long time. You look very fashionable. Apart from the mud.",
      author: "Alfred Pennyworth",
      source: "twitter",
    },
  ];

  const getPageData = () => {
    console.log("calling getPageData()");
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
    console.log("SELECTED FOLLOWING PARAGRAPHS FOR EXTRACTION:");
    console.log(pars);
    return pars;
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      if (msg.from === "content" && msg.subject === "retrievePars") {
        console.log(contentPars);
        let pars = selectPars(msg.pars);
        setContentPars(pars);
      }
    });
  }, []);

  return (
    <div className="main">
      <div className="main-container">
        <div className="button-container">
          <Button onClick={getPageData}>Click Me!</Button>
        </div>
        <div className="carousel-container">
          <Carousel slides={carouselSlidesData} paragraphs={contentPars} />
        </div>
        {/* <QuestionList paragraphs={contentPars} showList={qlist} /> */}
      </div>
    </div>
  );
};

export default Main;
