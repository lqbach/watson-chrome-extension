/*global chrome*/
/* content.bundle.js */

console.log("Chrome extension starting!");

chrome.runtime.onMessage.addListener(retrievePageContent);

function retrievePageContent(request, sender, sendResponse) {
  if (request.subject === "getParsFromContent") {
    console.log("retrievePageContent() called");
    let paragraphs = document.getElementsByTagName("p");
    let pars = [];
    for (let i = 0; i < paragraphs.length; i++) {
      pars.push(paragraphs[i].innerText);
    }
    chrome.runtime.sendMessage({
      from: "content",
      subject: "retrievePars",
      pars: pars,
    });
  }

  if (request.subject === "highlightParagraph") {
    let paragraphs = document.getElementsByTagName("p");
    let currParBG = paragraphs[request.parId].style["backgroundColor"];
    let currParTrans = paragraphs[request.parId].style["transition"];

    paragraphs[request.parId].style["backgroundColor"] = "yellow";
    paragraphs[request.parId].style["transition"] = "background-color 1s ease";
    paragraphs[request.parId].scrollIntoView(true);

    setTimeout(function () {
      paragraphs[request.parId].style["backgroundColor"] = currParBG;
      paragraphs[request.parId].style["transition"] =
        "background-color 1s ease";
    }, 4000);

    setTimeout(function () {
      paragraphs[request.parId].style["transition"] = currParTrans;
    }, 5000);
  }

  if (request.subject === "highlightSentence") {
    let paragraphs = document.getElementsByTagName("p");

    let currParBG = paragraphs[request.parId].style["backgroundColor"];

    let currParagraph = paragraphs[request.parId];

    let sentences = currParagraph.innerHTML.split(".");

    let originalText = sentences[request.sentId];

    sentences[request.sentId] =
      "<span style='background-color: aqua; transition: background-color 3s ease'>" +
      originalText +
      "</span>";

    currParagraph.innerHTML = sentences.join(".");

    setTimeout(function () {
      sentences[request.sentId] =
        "<span style='background-color: " +
        currParBG +
        "; transition: background-color 1s ease'>" +
        originalText +
        "</span>";

      currParagraph.innerHTML = sentences.join(".");
    }, 4000);

    setTimeout(function () {
      sentences[request.sentId] = originalText
      currParagraph.innerHTML = sentences.join(".");
    }, 5000);
  }
}
