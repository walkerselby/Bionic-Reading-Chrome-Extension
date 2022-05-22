// background.js

let autoConvVal;
chrome.storage.sync.get("autoConv", ({ autoConv }) => {
  autoConvVal = autoConv;
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active && autoConvVal) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: convertToReadableText,
          });
  }
})

// The body of this function will be executed as a content script inside the current page
function convertToReadableText() {
    // setting global styles
    var style = document.createElement("style");
    style.textContent = "b { font-weight: bold !important; }";
    document.head.appendChild(style);

    let tags = ["p", "font", "span", "h1", "h2"];

    	tags.forEach((element) => {
    		pList = document.getElementsByTagName(element);
    		// making half of the letters in a word bold
    		for (let sentence of pList) {
    		  const sentenceText = sentence.innerText;
    		  const textArr = sentenceText.split(" ");
    		  const textArrTransformed = textArr.map((word) => {
    			const length = word.length;
    			const midPoint = Math.floor(length / 2);
    			const firstHalf = word.slice(0, midPoint);
    			const secondHalf = word.slice(midPoint);
    			const htmlWord = `<b>${firstHalf}</b>${secondHalf}`;
    			return htmlWord;
    		  });
    		  console.log();
    		  sentence.innerHTML = textArrTransformed.join(" ");
    		}
    	});
}
