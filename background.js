/// Used ChatGPT here considering we didn't really know how to messages from one script to another for a chrome extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// from popup.js to content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);

  // Broadcast the message to all tabs
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, message, (response) => {
        if (chrome.runtime.lastError) {
          console.error(`Error sending message to tab ${tab.id}:`, chrome.runtime.lastError.message);
        }
      });
    });
  });

  sendResponse({ status: "broadcasted" });
});

// WILL'S UPDATES
// chrome.runtime.onInstalled.addListener(() => {
//     console.log("Extension installed");
//   });
  
//   // Relay messages from popup.js to content.js
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Message received in background:", message);
  
//     // Broadcast the message to all tabs
//     chrome.tabs.query({}, (tabs) => {
//       tabs.forEach((tab) => {
//         chrome.tabs.sendMessage(tab.id, message, (response) => {
//           if (chrome.runtime.lastError) {
//             console.error(`Error sending message to tab ${tab.id}:`, chrome.runtime.lastError.message);
//           }
//         });
//       });
//     });
  
//     sendResponse({ status: "broadcasted" });
//   });
  