
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
  "#fff0f5",
  "#ccccff",
  "#967bb6",
  "#a9ba9d",
  "#fffacd",
  "#fdd5b1",
  "#fbaed2",
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
    shape: ["-", "O", "-", 
            "-", "O", "-", 
            "-", "O", "O"],
  },
  {
    name: "leftL",
    color: colors[1],
    gridSize: 3,
    height: 3,
    width: 2,
    offset: 0,
    shape: ["-", "X", "-",
            "-", "X", "-",
            "X", "X", "-"],
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
    shape: ["-", "X", "-", 
            "X", "X", "X",
            "-", "-", "-"],
  },
  {
    name: "rightStep",
    color: colors[4],
    gridSize: 3,
    height: 3,
    width: 2,
    offset: 0,
    shape: ["-", "X", "-", 
            "X", "X", "-", 
            "X", "-", "-"],
  },
  {
    name: "leftStep",
    color: colors[5],
    gridSize: 3,
    height: 3,
    width: 2,
    offset: 0,
    shape: ["X", "-", "-", 
            "X", "X", "-", 
            "-", "X", "-"],
  },
  {
    name: "bar",
    color: colors[6],
    gridSize: 4,
    height: 4,
    width: 1,
    offset: 0,
    shape: [
      "-","X","-","-",
      "-","X","-","-",
      "-","X","-","-",
      "-","X","-","-",
    ],
  },
];



//frame rate
const fps = 60;

//sizes of the blocks and wells
const pxSize = 20;
const wellHeight = 30;
const wellWidth = 10;


export {colors,backgroundColor,pieces,pxSize,wellHeight,wellWidth}