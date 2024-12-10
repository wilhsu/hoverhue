document.addEventListener("DOMContentLoaded", () => {
  const trackingToggle = document.getElementById("trackingToggle");
  const visibilityToggle = document.getElementById("visibilityToggle");
  // Debugging initialization
  console.log("Popup loaded. Tracking and Visibility toggles initialized.");
  // Tracking toggle functionality
  trackingToggle.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    console.log("Tracking Toggle changed. New state:", isChecked);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        console.log("Sending message to content script for Tracking Toggle.");
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "toggleTracking",
          value: isChecked,
        });
      } else {
        console.error("No active tabs found for Tracking Toggle.");
      }
    });
  });
  document.getElementById("sendDataButton").addEventListener("click", () => {
    const selectedInterval = document.querySelector(
      'input[name="intervalOpt"]:checked'
    ).value;
  
    chrome.runtime.sendMessage(
      { action: "updateTimeInterval", value: parseInt(selectedInterval) },
      (response) => {
        console.log("Time interval update sent:", response.status);
      }
    );
  });
  
  
  // let timeChecked = document.querySelector('input[name="intervalOpt"]');
  // console.log(timeChecked.value);
  // Map visibility toggle functionality
  visibilityToggle.addEventListener("change", () => {
    const opacity = visibilityToggle.checked ? "1" : "0";
    console.log("Visibility Toggle changed. New opacity:", opacity);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        console.log("Executing script to update gradientCanvas opacity.");
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (newOpacity) => {
            console.log("Updating gradientCanvas opacity to:", newOpacity);
            const gradientCanvas = document.getElementById("defaultCanvas0");
            if (gradientCanvas) {
              gradientCanvas.style.opacity = newOpacity;
              console.log("gradientCanvas opacity updated successfully.");
            } else {
              console.error("gradientCanvas not found on the page.");
            }
          },
          args: [opacity],
        });
      } else {
        console.error("No active tabs found for Visibility Toggle.");
      }
    });
  });
  // Activate extension when popup is opened
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "activateExtension" });
  });
});