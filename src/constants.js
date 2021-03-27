
const pastelColors = [
  "#b19cd9",
  "#20b2aa",
  "#ffb6c1",
  "#93ccea",
  "#fafad2",
  "#29ab87",
  "#c8a2c8",
];

const eighties = [
  'fcee21',
  'e91961',
  '29abe3',
  'fcee21',
  'e91961',
  '29abe3',
  'fcee21',
]

const eightiesTop = [
  'e91961',
  '29abe3',
  'fcee21',
  'e91961',
  '29abe3',
  'fcee21',
  '29abe3',
]

const outrun = [
  'f9c80e',
  'ff4365',
  '2de2e6',
  '791e94',
  'f9c80e',
  'ff4365',
  '2de2e6',
]

const outrunTop = [
  'ff4365',
  '2de2e6',
  '791e94',
  'ff4365',
  '2de2e6',
  '791e94',
  'f9c80e'
]

const colorBlock = [
  'fe91b1',
  'f8d581',
  '54d4ed',
  '0174d1',
  'fe91b1',
  'f8d581',
  '54d4ed',
]

const colorBlockTop = [
  'f8d581',
  '54d4ed',
  '0174d1',
  'f8d581',
  '54d4ed',
  '0174d1',
  'fe91b1'
]



const memphis = [
"#FB4337",
"#1865B5",
"#FFF85E",
"#E397BE",
"#6FCCC6",
"#FB4337",
"#1865B5"
]

const memphisTop = [
  "#1865B5",
  "#FFF85E",
  "#E397BE",
  "#6FCCC6",
  "#FB4337",
  "#FFF85E",
  "#E397BE"
]

const  eightiesAlt = [
  'ff2153',
  '10e7e2',
  'ff68a8',
  '3968cb',
  'ff68a8',
  'f9eb0f',
  'ff2153',
]

const eightiesAltTop = [
  '10e7e2',
  'ca7cd8',
  '3968cb',
  'ff68a8',
  'f9eb0f',
  'ff2153',
  '10e7e2',
]



const hexToValues = (hex) => {
let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

result = result ? [parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16),1] 
: null

return [...result]
}

const rgbStringToValues = (string) =>  string.match(/[\d\.]+/g).map(val => Number(val))

//converts color values to an array of rgb values
//prevents me from having to do this manually
const convertToValues = (string) => {
  if(string[0] === 'r'){
    return rgbStringToValues(string)
  }
  else{
    return hexToValues(string)
  }
}



const paleColors = [
  'rgb(255, 240, 245,1)',
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
const colors = memphis;
const topColors = memphisTop

const pieces = [
  {
    name: "rightL",
    color: convertToValues(colors[0]),
    topColor: convertToValues(topColors[0]),
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
    color: convertToValues(colors[1]),
    topColor: convertToValues(topColors[1]),
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
    color: convertToValues(colors[2]),
    topColor: convertToValues(topColors[2]),
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
    color: convertToValues(colors[3]),
    topColor: convertToValues(topColors[3]),
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
    color: convertToValues(colors[4]),
    topColor: convertToValues(topColors[4]),
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
    color: convertToValues(colors[5]),
    topColor: convertToValues(topColors[5]),
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
    color: convertToValues(colors[6]),
    topColor: convertToValues(topColors[6]),
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