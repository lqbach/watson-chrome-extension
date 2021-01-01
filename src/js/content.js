/*global chrome*/
/* content.bundle.js */

console.log("Chrome extension starting!");

chrome.runtime.onMessage.addListener(retrievePageContent);

function retrievePageContent(request, sender, sendResponse) {
  if (request.txt === "hello") {
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
}
