// let HTMLbody = document.querySelector("body");
// let newCanvas = document.querySelector("body").createElement("canvas");

// let newCanvas = document.createElement("canvas");
// newCanvas.setAttribute("id", "canvasHTML");

// document.getElementsByTagName("body").appendChild(newCanvas);



// function setup(){
//     newCanvas = createCanvas(windowWidth, windowHeight);
//     newCanvas.position(0,0);
    
//     console.log("byee");
// }

// function draw(){
//     background(255, 0, 0, 0.2);
//     console.log("hiii");
// }


// heatmap code


// let timePassed = 0;
// let a = [0,0,0,0,true, true]
// let milliseconds = a[0];
// let seconds = a[1];
// let minutes = a[2];
// let hrs = a[3];
// let mouseAct = a[4];
// let resetTime = 0;
// let starter = a[5];
// let timeInt;
// let intRadio;
// let radioVal = document.getElementsByName('intervalOpt').value;
// console.log(radioVal);

let timeNow = new Date().getHours();

console.log(timeNow);

// instancer ver.

// const s = ( sketch ) => {
 
//     sketch.setup = () => {
//         let h = document.body.getClientHeight;
//       sketch.createCanvas(sketch.windowWidth, h);
//       sketch.createCanvas.position(0,0);
//     };
  
//     sketch.draw = () => {
//       sketch.background(0);
//       sketch.fill(255);
//       sketch.rect(sketch.mouseX,sketch.mouseY,50,50);
//     };
// };
  
// let myp5 = new p5(s);

// function setup(){
//     let h = document.body.clientHeight;
//     let newCanvas = createCanvas(windowWidth, h);
//     console.log(h);
//     newCanvas.position(0,0);
//     newCanvas.style('pointer-events', 'none');
//     background(0, 0);

    // console.log(radioVal.value);

    // intRadio = document.createElement('input');
    // intRadio.setAttribute = ('type', 'radio');
    // document.getElementById("timeInt").appendChild(intRadio)

    // p5 ver
    // intRadio = createRadio();
    // intRadio.parent('#timeInt');
    
    // intRadio.option('s', '1s'); //value, label
    // intRadio.option('m', '1m');
    // intRadio.option('h', '1h');

    // intRadio.selected('minutes');
    
// }

// function draw(){
//     // ellipse(mouseX, mouseY, 50);

//   if (mouseAct) {

//     if(intRadio.value() === "s"){
//       timePassed = seconds;
//     } else if (intRadio.value() === "m"){
//       timePassed = minutes;
//     } else if (intRadio.value() === "h"){
//       timePassed = hrs;
//     }
//     timePassed = seconds;
//     // let gradientOpacity = map(timePassed, 0, 60, .5, 0.1); 
//     let gradientOpacity = .1;

//     fillGradient('radial', {
//       from : [mouseX, mouseY, 0],
//       to : [mouseX, mouseY, timePassed*10],
//       steps : [
//           color(255, 255, 0, gradientOpacity),
//           color(200, 100, 164, gradientOpacity),
//           color(255, 255, 0, gradientOpacity),
//           color(0, 255, 0, gradientOpacity)
//       ]
//     });
//   }
// }

// function setup() {
//   newCanvas = createCanvas(windowWidth, windowHeight);
//     //   myCanvas.parent("body");
//     // myCanvas.position(0,0);

//   colorMode(RGB, 255, 255, 255, 1);
  
// //   button = select("#save-image");
// //   button.mousePressed(saveJPG);

//   intRadio = createRadio();
//   intRadio.parent('#timeInt');
  
//   intRadio.option('s', '1s'); //value, label
//   intRadio.option('m', '1m');
//   intRadio.option('h', '1h');

//   intRadio.selected('minutes');

//   console.log(timeNow);


//   background(255, 0, 0, 1);
// }

// function draw() {

//   if (mouseAct) {

//     if(intRadio.value() === "s"){
//       timePassed = seconds;
//     } else if (intRadio.value() === "m"){
//       timePassed = minutes;
//     } else if (intRadio.value() === "h"){
//       timePassed = hrs;
//     }
//     timePassed = seconds;
//     // let gradientOpacity = map(timePassed, 0, 60, .5, 0.1); 
//     let gradientOpacity = .1;

//     fillGradient('radial', {
//       from : [mouseX, mouseY, 0],
//       to : [mouseX, mouseY, timePassed*10],
//       steps : [
//           color(255, 255, 0, gradientOpacity),
//           color(200, 100, 164, gradientOpacity),
//           color(255, 255, 0, gradientOpacity),
//           color(0, 255, 0, gradientOpacity)
//       ]
//     });
//     noStroke();
//     ellipse(mouseX, mouseY, timePassed*10);
    
//     if (int(millis() / 100) % 10 != milliseconds) {
//       milliseconds++;
//     }
//     if (milliseconds >= 10) {
//       milliseconds -= 10;
//       seconds++;
//     }
//     if (seconds >= 60) {
//       seconds -= 60;
//       minutes++;
//     }
//   }

//   timeDisplay = select('#stopwatch');
//   timeDisplay.html(`${hrs} h ${minutes} m ${seconds} s spent @ x:${mouseX} y:${mouseY}`);

// }

// function mouseMoved(){
//   milliseconds = 0;
//   seconds = 0;
//   minutes = 0;
//   hrs = 0;
// }

// function saveJPG(){
//   console.log("saving")
//   save();
//   console.log("saved...?") 
// }

// // Stopwatch p5.js demo by MSingh10 https://editor.p5js.org/MSingh10/sketches/JyeMsf9Wk

// function showHide() {
//   var x = document.getElementById("canvasHTML");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }

// // to do:
// // + ability to change interval of ellipse placing based on time/slider value
// // - integrate interface to chrome extension
// // - fix show/hide display properties
// // - link colors with time API
// // - randomizing colors