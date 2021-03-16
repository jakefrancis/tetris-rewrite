
const pastelColors = [
  "#b19cd9",
  "#20b2aa",
  "#ffb6c1",
  "#93ccea",
  "#fafad2",
  "#29ab87",
  "#c8a2c8",
];
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

const pxSize = Math.floor((window.innerWidth / wellWidth) * 0.5) ;
const altPx = Math.floor(pxSize / 2)


export {colors,backgroundColor,pieces,pxSize, altPx, wellHeight,wellWidth}