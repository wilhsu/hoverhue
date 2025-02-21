let timePassed = 0;
let isTracking = true; // Controls cursor tracking
let mouseAct = true; // Controls gradient rendering
let isExtensionActive = false; // This was so funny, would start making orbs even before clicking the extension
let currentCell = null;
let startTime = null;
let timeInterval = 1000; // Default to 1s

// square cell side
const cellSide = 50;

// 2D array
const rows = Math.ceil(window.innerHeight / cellSide);
const cols = Math.ceil(window.innerWidth / cellSide);
const cellTimeData = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => ({ hours: 0, minutes: 0, seconds: 0 }))
);

// Floating div setup
const floatingDiv = document.createElement("div");
floatingDiv.id = "timeTracker";
floatingDiv.style.position = "absolute";
floatingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
floatingDiv.style.color = "white";
floatingDiv.style.padding = "5px";
floatingDiv.style.borderRadius = "5px";
floatingDiv.style.display = "none";
floatingDiv.style.zIndex = "1000";
document.body.appendChild(floatingDiv);

// We took a lot of help from ChatGPT for the toggling because that was the most confusing part of the code
// Handle messages from popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "activateExtension") {
    isExtensionActive = true;
    console.log("Extension activated");
  } else if (message.action === "toggleTracking") {
    isTracking = message.value;
    console.log(`Cursor Tracking: ${isTracking ? "ON" : "OFF"}`);
  } else if (message.action === "toggleVisibility") {
    mouseAct = message.value;
    console.log(`Map Visibility: ${mouseAct ? "ON" : "OFF"}`);
  } else if (message.action === "updateTimeInterval") {
    timeInterval = message.value; // Ensure this updates
    console.log(`Time interval updated to: ${timeInterval}ms`);
  }
});

function setup() {
  let h = document.body.clientHeight;
  newCanvas = createCanvas(windowWidth, h);
  newCanvas.position(0, 0);
  newCanvas.style("pointer-events", "none");
  newCanvas.style("z-index", "999"); // We have trust issues, can you tell?
  colorMode(RGB, 255, 255, 255, 1);
  // we're sure there is a more D.R.Y. way to do this
  gradientColors = {
        morning1: [
          color(252, 93, 255, 0.1),
          color(150, 255, 90, 0.2),
          color(255, 251, 0, 0.1),
          color(255, 151, 107, 0.2),          
        ],
        morning2: [
          color(252, 93, 255, 0.1),
          color(255, 151, 107, 0.2),
          color(255, 251, 0, 0.1),
          color(150, 255, 90, 0.2),
        ],
        morning3: [
          color(150, 255, 90, 0.2),
          color(255, 251, 0, 0.1),
          color(252, 93, 255, 0.1),
          color(255, 151, 107, 0.2),
        ],
        afternoon1: [
          color(114, 255, 255, 0.1),
          color(255, 195, 0, 0.1),
          color(255, 126, 62, 0.2),
          color(250, 109, 170, 0.2),
        ],
        afternoon2: [
          color(255, 126, 62, 0.1),
          color(255, 195, 0, 0.1),
          color(114, 255, 255, 0.1),
          color(250, 109, 170, 0.2),
        ],
        afternoon3: [
          color(255, 126, 62, 0.1),
          color(245, 51, 51, 0.2),
          color(255, 195, 0, 0.1),
          color(114, 255, 255, 0.1),
        ],
        night1: [
          color(91, 56, 180, 0.1),
          color(66, 98, 255, 0.2),
          color(255, 163, 58, 0.1),
          color(0, 10, 143, 0.2),
        ],
        night2: [
          color(0, 10, 143, 0.2),
          color(66, 98, 255, 0.2),
          color(255, 163, 58, 0.1),
          color(91, 56, 180, 0.1),
          
        ],
        night3: [
          color(66, 98, 255, 0.2),
          color(91, 56, 180, 0.1),
          color(0, 10, 143, 0.2),
          color(255, 163, 58, 0.1),
        ],
        midnight1: [
          color(67, 0, 63, 0.2),
          color(149, 0, 255, 0.2),
          color(72, 0, 255, 0.1),
          color(0, 3, 101, 0.1),
        ],
        midnight2: [
          color(72, 0, 255, 0.1),
          color(67, 0, 63, 0.2),
          color(149, 0, 255, 0.2),
          color(0, 3, 101, 0.1),
        ],
        midnight3: [
          color(67, 0, 63, 0.2),
          color(0, 3, 101, 0.1),
          color(72, 0, 255, 0.1),
          color(149, 0, 255, 0.2),
        ],
      };

  console.log("Canvas is setup");
}

function draw() {
  if (!isExtensionActive || !mouseAct) {
    clear();
    return;
  }

  background(255, 0, 0, 0);

  // More stuff for D.R.Y.
  function currentGradientColor() {
    const hour = new Date().getHours();
    if (hour >= 2 && hour < 4) return { colors: gradientColors.midnight2 };
    if (hour >= 4 && hour < 6) return { colors: gradientColors.midnight3 };
    if (hour >= 6 && hour < 8) return { colors: gradientColors.morning1 };
    if (hour >= 8 && hour < 10) return { colors: gradientColors.morning2 };
    if (hour >= 10 && hour < 12) return { colors: gradientColors.morning3 };
    if (hour >= 12 && hour < 14) return { colors: gradientColors.afternoon1 };
    if (hour >= 14 && hour < 16) return { colors: gradientColors.afternoon2 };
    if (hour >= 16 && hour < 18) return { colors: gradientColors.afternoon3 };
    if (hour >= 18 && hour < 20) return { colors: gradientColors.night1 };
    if (hour >= 20 && hour < 22) return { colors: gradientColors.night2 };
    if (hour >= 22 && hour < 24) return { colors: gradientColors.night3 };
    return { colors: gradientColors.midnight1 };
  }

  if (isTracking && mouseAct) {
    const colors = currentGradientColor();
  
    fillGradient("radial", {
      from: [mouseX, mouseY, 0],
      to: [mouseX, mouseY, timePassed],
      steps: colors.colors, // Use gradient color stops
    });
  
    noStroke();
    ellipse(mouseX, mouseY, timePassed * 2);

    let growthRate = .2; // Default for 1 second
    if (timeInterval === 60000) {
      growthRate = 1 / 60; // 1 minute
    } else if (timeInterval === 3600000) {
      growthRate = 1 / 3600; // 1 hour
    }

    timePassed += growthRate;

  }

  console.log(timePassed);
}

// cell from cursor position
function getCellFromPosition(x, y) {
  const row = Math.floor(y / cellSide);
  const col = Math.floor(x / cellSide);
  return { row, col };
}

// Update cell time
function updateCellTime(cell) {
  if (startTime && currentCell) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const cellData = cellTimeData[currentCell.row][currentCell.col];
    cellData.seconds += elapsed;
    if (cellData.seconds >= 60) {
      cellData.minutes += Math.floor(cellData.seconds / 60);
      cellData.seconds %= 60;
    }
    if (cellData.minutes >= 60) {
      cellData.hours += Math.floor(cellData.minutes / 60);
      cellData.minutes %= 60;
    }
  }
  startTime = Date.now();
  currentCell = cell;
}

// mouse movements
document.addEventListener("mousemove", (event) => {
  if (!isExtensionActive) return; // Ignore mouse events if extension is inactive

  const { row, col } = getCellFromPosition(event.clientX, event.clientY);
  const newCell = { row, col };

  if (isTracking) {
    if (!currentCell || currentCell.row !== row || currentCell.col !== col) {
      updateCellTime(newCell);
      timePassed = 0; // Only reset orb size when necessary
    }
    floatingDiv.style.display = "none"; // Hide floating div during tracking
  } else {
    const cellData = cellTimeData[row][col];
    floatingDiv.textContent = `You have spent ${cellData.hours}h ${cellData.minutes}m ${cellData.seconds}s here`;
    floatingDiv.style.left = `${event.clientX + 20}px`;
    floatingDiv.style.top = `${event.clientY - 20}px`;
    floatingDiv.style.display = "block";
  }

  currentCell = newCell;
});


// Logging 2D array periodically
setInterval(() => {
  if (isExtensionActive) {
    console.log("Cell Time Data:", cellTimeData);
  }
}, 5000);