
import {wellWidth,wellHeight,backgroundColor, pxSize} from './constants.js'

const width = wellWidth * pxSize
const height = wellHeight * pxSize

let body = document.querySelectorAll("body");
let container = document.createElement("div");
container.style.position = "relative";
container.setAttribute("id", "container");
container.style.width = width * 2 + 5 + "px";
container.style.height = height;
container.style.margin = "auto";
document.body.appendChild(container);

let canvas = document.createElement("canvas");

canvas.style.border = "solid 1px";
canvas.style.position = "absolute";
canvas.setAttribute("id", "wish");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
canvas.style.backgroundColor = backgroundColor;

container.appendChild(canvas);

let info = document.createElement("div");

info.setAttribute("id", "points");
//info.setAttribute('class', 'font-effect-anaglyph')
info.style.width = width + "px";

info.style.position = "absolute";
info.style.height = height + "px";
info.style.border = "solid 1px";
info.style.display = "inline-block";
info.style.marginLeft = width + 5 + "px";
info.style.background = backgroundColor;
info.style.textAlign = "center";
container.appendChild(info);

let div = document.querySelectorAll("div");
let pointTotal = document.createElement("h1");
let levelTotal = document.createElement("h1");
let lineTotal = document.createElement("h1");

pointTotal.setAttribute("id", "pointTotal");
pointTotal.style.paddingTop = "50px";
pointTotal.textContent = "Points: " + 0;
levelTotal.style.paddingTop = "1em";
levelTotal.textContent = "Level: " + 0;
lineTotal.style.paddingTop = "1em";
lineTotal.textContent = "Lines: " + 0;
let nextBlock = document.createElement("canvas");
info.appendChild(nextBlock);
info.appendChild(pointTotal);
info.appendChild(levelTotal);
info.appendChild(lineTotal);

let pauseScreen = document.createElement("div");
let displayPaused = document.createElement("h1");
displayPaused.setAttribute("id", "displayPaused");
//displayPaused.setAttribute('class', 'font-effect-anaglyph')

displayPaused.style.paddingTop = "100px";

//dom for start screen

function startScreenDisplay() {
  displayPaused.textContent = "Press Enter\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "To Start\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "Press Space\r\n";
  displayPaused.textContent += "\r\n";

  displayPaused.textContent += "To Rotate\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "Press Arrows\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "To Move\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "Press ESC\r\n";
  displayPaused.textContent += "\r\n";
  displayPaused.textContent += "To Pause";
}

//starts the start screen
//startScreenDisplay();




//font info
let font = "Press Start 2P";

//adjust font for the pause screen
displayPaused.style.fontFamily = font;

//pause screen dom stuff

pauseScreen.appendChild(displayPaused);
pauseScreen.setAttribute("id", "pauseScreen");
pauseScreen.style.width = width + "px";
pauseScreen.style.position = "absolute";
pauseScreen.style.height = height + "px";
pauseScreen.style.border = "solid 1px";
pauseScreen.style.display = "inline-block";
pauseScreen.style.textAlign = "center";
pauseScreen.style.background = backgroundColor;
container.appendChild(pauseScreen);

//This would be better written in a function//

//ideally with an array storing all of the text content and dir and tempdir variables//

//this was / is touch controls will implement a better touch experience

let leftButton = document.createElement("button");
leftButton.onclick = function () {
  dir = "ArrowLeft";
};
leftButton.textContent = "left";
let rightButton = document.createElement("button");
rightButton.onclick = function () {
  dir = "ArrowRight";
};
rightButton.textContent = "right";
let downButton = document.createElement("button");
downButton.onclick = function () {
  dir = "Arrowdown";
};
downButton.textContent = "down";
let rotateButton = document.createElement("button");
rotateButton.onclick = function () {
  tempDir = "Space";
};
rotateButton.textContent = "rotate";
let enterButton = document.createElement("button");
enterButton.onclick = function () {
  tempDir = "Enter";
};
enterButton.textContent = "start";
let escButton = document.createElement("button");
escButton.onclick = function () {
  tempDir = "Escape";
};
escButton.textContent = "pause";

document.body.appendChild(leftButton);
document.body.appendChild(rightButton);
document.body.appendChild(downButton);
document.body.appendChild(rotateButton);
document.body.appendChild(enterButton);
document.body.appendChild(escButton);


 
export {body,container,canvas,
  info,div,pointTotal,levelTotal,
  lineTotal,nextBlock,pauseScreen,
  displayPaused,startScreenDisplay,
  font,leftButton,rightButton,
  downButton,enterButton,rotateButton,
  escButton}