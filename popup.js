document.addEventListener("DOMContentLoaded", () => {
  const trackingToggle = document.getElementById("trackingToggle");
  const visibilityToggle = document.getElementById("visibilityToggle");

  trackingToggle.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleTracking",
        value: isChecked,
      });
    });
  });

  visibilityToggle.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleVisibility",
        value: isChecked,
      });
    });
  });

  // Activate extension when popup is opened
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "activateExtension" });
  });
});
