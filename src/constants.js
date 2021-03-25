
const pastelColors = [
  "#b19cd9",
  "#20b2aa",
  "#ffb6c1",
  "#93ccea",
  "#fafad2",
  "#29ab87",
  "#c8a2c8",
];



const hexToValues = (hex) => {
let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
return result ? [parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16),1] 
: null
}

const rgbStringToValues = (string) =>  string.match(/[\d\.]+/g).map(val => Number(val))

const convertToValues = (string) => {
  if(string[0] === 'r'){
    return rgbStringToValues(string)
  }
  else{
    return hexToValues(string)
  }
}



const paleColors = [
  [255, 240, 245,1],
  [204,204,255,1],
  [150,123,182,1],
  [169,186,157,1],
  [255, 250, 205, 1],
  [253, 213, 177,1],
  [251, 174, 210, 1],
];
const backgroundColor = "#343434";
const  basicColors = [
  "#DE6B48",
  "#058ED9",
  "#FFBC42",
  "#320D6D",
  "#9CF6F6",
  "#EF7674",
  "#780116",
];
const colors = paleColors;


const pieces = [
  {
    name: "rightL",
    color: colors[0],
    gridSize: 3,
    height: 3,
    width: 2,
    offset: 0,
    shape: ["-", "-", "-", 
            "-", "-", "X", 
            "X", "X", "X"],
  },
  {
    name: "leftL",
    color: colors[1],
    gridSize: 3,
    height: 3,
    width: 2,
    offset: 0,
    shape: ["-", "-", "-",
            "X", "-", "-",
            "X", "X", "X"],
  },
  {
    name: "square",
    color: colors[2],
    gridSize: 4,
    height: 2,
    width: 2,
    offset: 0,
    shape: [
      "-", "-","-","-",
      "-","X","X","-",
      "-","X","X","-",
      "-","-","-","-",
    ],
  },
  {
    name: "tee",
    color: colors[3],
    gridSize: 3,
    height: 2,
    width: 3,
    offset: 0,
    shape: ["-", "-", "-", 
            "-", "X", "-",
            "X", "X", "X"],
  },
  {
    name: "rightStep",
    color: colors[4],
    gridSize: 3,
    height: 3,
    width: 2,
    offset: 0,
    shape: ["-", "-", "-", 
            "X", "X", "-", 
            "-", "X", "X"],
  },
  {
    name: "leftStep",
    color: colors[5],
    gridSize: 3,
    height: 3,
    width: 2,
    offset: 0,
    shape: ["-", "-", "-", 
            "-", "X", "X", 
            "X", "X", "-"],
  },
  {
    name: "bar",
    color: colors[6],
    gridSize: 4,
    height: 4,
    width: 1,
    offset: 0,
    shape: [
      "-","-","-","-",
      "-","-","-","-",
      "X","X","X","X",
      "-","-","-","-",
    ],
  },
];



//frame rate
const fps = 60;

//sizes of the blocks and wells
const wellHeight = 23;
const wellWidth = 10;

const wrapper = document.getElementById('canvas-wrapper')
let mobileSize = Math.floor((wrapper.offsetWidth / wellWidth) * 0.48)
mobileSize = mobileSize % 2 ? mobileSize : mobileSize + 1 
const deskTopSize = Math.floor(300 / wellWidth) 
const pxSize = Math.min(mobileSize,deskTopSize)
const altPx = Math.floor(pxSize / 2)


export {colors,backgroundColor,pieces,pxSize, altPx, wellHeight,wellWidth}