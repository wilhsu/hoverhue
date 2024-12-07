chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getDataFromContentScript") {
      console.log("Received data from content script:", message.data);
      sendResponse({ status: "success", receivedData: message.data });
    }
});

// document.getElementById("sendDataButton").addEventListener("click", () => {
//     // const inputValue = document.getElementById("userinput").value;
//     const timeVal = document.querySelector('input[name="intervalOpt"]:checked').value;
  
//     // Send the input value to content.js via message passing
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "updateContent", timeVal: timeVal });
//     });
// });

document.getElementById("sendDataButton").addEventListener("click", () => {
  // const inputValue = document.getElementById("userinput").value;
  const timeVal = document.querySelector('input[name="intervalOpt"]:checked').value;

  // Send the input value to content.js via message passing
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateContent", timeVal: timeVal });
  });
});

document.getElementById("showButton").addEventListener("click", () => {
  // Send message to content.js to show the element
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleVisibility", visibility: "show" });
  });
});

document.getElementById("hideButton").addEventListener("click", () => {
  // Send message to content.js to hide the element
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleVisibility", visibility: "hide" });
  });
});

// chrome.runtime.sendMessage({ action: "requestDataFromPopup" }, (response) => {
//   if (response.data) {
//     console.log("Received data from content.js:", dataForPopup);

//     // Optionally, update the popup UI with the received data
//     // document.getElementById("stopwatch").innerText = `${response.data.hrr}:${response.data.min}:${response.data.sec}`;
//   }
// });

// document.getElementById("visibilityToggle").addEventListener("click", showHide);
// // let c = document.getElementById("defaultCanvas0");
// // let c = document.querySelector("ca");

// function showHide() {
//     console.log(c);
// //   var x = document.getElementById("canvasHTML");
// //   if (x.style.display === "none") {
// //     x.style.display = "block";
// //   } else {
// //     x.style.display = "none";
// //   }
// }

// function setup(){
//     noCanvas;
//     let userinput = select("#userinput");
//     userinput.input(newText);

//     function newText(){

//         let params = {
//             active: true,
//             currentWindow: true
//         }

//         chrome.tabs.query(params, gotTab);

//         function gotTab(tabs){
//             console.log("got tabs")
//             console.log(tabs);

//             let message = userinput.value();
//             let msg = {
//                 txt: "hello"
//             }
//             chrom.tabs.sendMessage(tabs[0].id, msg);
//         }
//     }
// }
