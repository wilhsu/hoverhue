let dataForPopup = null;

// Listen for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendDataToPopup") {
    // Store the data for later use by the popup
    dataForPopup = message.data;
    console.log("Data stored from content.js:", dataForPopup);
  }

  // Respond to the sender if needed
  sendResponse({ status: "received" });
});

// Listen for requests from popup.js to get the stored data
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "requestDataFromPopup") {
    sendResponse({ data: dataForPopup });
  }
});