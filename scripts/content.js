let timePassed = 0;
let a = [0,0,0,0,true, true]
let milliseconds = a[0];
let seconds = a[1];
let minutes = a[2]; 
let hrs = a[3];
let mouseAct = a[4];
let resetTime = 0;
let starter = a[5];

function setup(){
    let h = document.body.clientHeight;
    newCanvas = createCanvas(windowWidth, h);
    newCanvas.position(0,0);
    newCanvas.style('pointer-events', 'none');
    colorMode(RGB, 255, 255, 255, 1);
}

function draw(){
    background(255, 0, 0, 0);
    if(mouseAct){
        fillGradient('radial', {
        from : [mouseX, mouseY, 0],
        to : [mouseX, mouseY, timePassed*10],
        steps : [
            color(252, 93, 255, 0.2),
            color(150, 255, 90, 0.1),
            color(255, 251, 0, 0.1),
            color(255, 151, 107, 0.1),
            color(255,255,255, 0.1)
        ]
        });
        noStroke();
        ellipse(mouseX, mouseY, timePassed*10);

        // console.log(seconds);
        if (int(millis() / 100) % 10 != milliseconds) {
            milliseconds++;
        }
        if (milliseconds >= 10) {
            milliseconds -= 10;
            seconds++;
        }
        if (seconds >= 60) {
            seconds -= 60;
            minutes++;
        }
    }
}

function mouseMoved(){
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hrs = 0;
}


let dataFromContent = {
    s: seconds,
    m: minutes,
    h: hrs,
};

chrome.runtime.sendMessage({ action: "sendDataToPopup", data: dataFromContent });

chrome.runtime.sendMessage({ action: "getDataFromContentScript", data: "someData" });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleVisibility") {
      const element = document.querySelector("#defaultCanvas0");  // Example: target a specific element
  
      if (element) {
        if (message.visibility === "show") {
          element.style.opacity = "1";  // Show the element
        } else if (message.visibility === "hide") {
          element.style.opacity = "0";   // Hide the element
        }
      }
    }
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateContent") {
    //   const newInputValue = message.inputValue;
      const newTimeVal = message.timeVal;
      
      // Update your content.js variables or take actions based on the input value
      

      if(newTimeVal === "s"){
        timePassed = seconds;
      } else if(newTimeVal === "m"){
        timePassed = minutes;
      } else if(newTimeVal === "h"){
        timePassed = hrs;
      } else {
        timePassed = seconds;
      }

    //   console.log(timePassed);

    console.log("Received input value from popup:", newTimeVal);
    console.log("Time passed:", timePassed);
    //   console.log(newTimeVal);
  
      // Example: you can directly update some variable in content.js
    //   let contentVariable = newInputValue;
    // let contentVariable = newTimeVal;
  
      // Optionally, if you need to manipulate the page (e.g., change the DOM):
    //   document.body.innerText = `New Content: ${newTimeVal}`;
    }
});

