// let timePassed = 0;
// let a = [0,0,0,0,true, true]
// let milliseconds = a[0];
// let seconds = a[1];
// let minutes = a[2];
// let hrs = a[3];
// let mouseAct = a[4];
// let resetTime = 0;
// let starter = a[5];

let radioSec = document.querySelector('#s');
let radioMin = document.querySelector('#m');
let radioHr = document.querySelector('#h');
// console.log(radioHr.checked);

// let ms = new Date().getMilliseconds();
// console.log(ms);
// document.querySelector('#stopwatch').innerHTML = `${}`;


let elapsedTime = 0; // Time in seconds
let stopwatchInterval;
let pageTitle = document.querySelector("title").text;


function formatTime(seconds) {
    // Convert elapsed time into hours, minutes, and seconds
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} spent on ${pageTitle}`;
}

function startStopwatch() {
    stopwatchInterval = setInterval(() => {
        elapsedTime++; // Increment time every second
        document.querySelector("#stopwatch").innerText = formatTime(elapsedTime); // Update display
    }, 1000);
}

// Start the stopwatch when the page loads
window.onload = startStopwatch;


// const visTog = document.querySelector("visibilityToggle");

// visTog.addEventListener("click", async() => {
//     var x = document.getElementById("canvasHTML");
//     if (x.style.display === "none") {
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
// })

// function showHide() {
//   var x = document.getElementById("canvasHTML");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }

// let timeNow = new Date().getTime();
// let newNow = new Date().getTime();
// let newNewNow = new Date().getTime();


// let currentTime = (newNewNow - newNow)/1000;

// console.log(newNow-timeNow);

// let seconds;
// let minutes;
// let hrs;


// function display(){
//     seconds = new Date().getSeconds();
//     minutes = new Date().getMinutes();
//     hrs = new Date().getHours();

//     document.querySelector("#stopwatch").innerHTML = `${hrs} ${minutes} ${seconds}`;

//     console.log(seconds);

//     return;
// }

// setInterval(display, 1000);

// let timeNow = new Date().getHours();
// // console.log(timeNow);


// function setup(){
//   intRadio = createRadio();
//   intRadio.parent('#timeInt');
  
//   intRadio.option('s', '1s'); //value, label
//   intRadio.option('m', '1m');
//   intRadio.option('h', '1h');

//   intRadio.selected('minutes');
// }

// function draw(){

    

//     if(mouseAct){
//         if (int(millis() / 100) % 10 != milliseconds) {
//         milliseconds++;
//         }
//         if (milliseconds >= 10) {
//         milliseconds -= 10;
//         seconds++;
//         }
//         if (seconds >= 60) {
//         seconds -= 60;
//         minutes++;
//         }
//     }
    
//     timeDisplay = select('#stopwatch');
//     timeDisplay.html(`${hrs} h ${minutes} m ${seconds} s spent @ x:${mouseX} y:${mouseY}`);

//     console.log(seconds);
// }

// function mouseMoved(){
//   milliseconds = 0;
//   seconds = 0;
//   minutes = 0;
//   hrs = 0;
// }