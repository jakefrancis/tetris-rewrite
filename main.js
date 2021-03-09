/*

import {body,container,canvas,
  info,div,pointTotal,levelTotal,
  lineTotal,nextBlock,pauseScreen,
  displayPaused,startScreenDisplay,
  font,leftButton,rightButton,
  downButton,enterButton,rotateButton,
  escButton} from './src/dom.js'
*/
  import {colors,backgroundColor,pieces,pxSize,wellHeight,wellWidth} from './src/constants.js'

  //startScreenDisplay();

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const canvasWidth = pxSize * wellWidth
  const canvasHeight = pxSize * wellHeight

  canvas.width = canvasWidth
  canvas.height = canvasHeight
  canvas.style.background = 'black'

  document.body.appendChild(canvas)

  import Vector from './vector.js'

//blocks displayed on screen
  class Block {
      constructor(vec,color){
        this.pos = vec
        this.color = color
      }
      draw(can) {
        can.fillStyle = this.color
        can.fillRect(this.pos.x * pxSize, this.pos.y * pxSize, pxSize, pxSize)
      }
  }

//creates a has of coordinates
const produceWell = (width,height) => {
  let well = {}
  //gen xy coordinates of the well
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            well[`${x},${y}`] = null
        }
    }
   return well 
}

let gameWell = produceWell(wellWidth,wellHeight)

console.log(pieces)

let pieceCoords = new Vector(3,1)


const getIntialPieceCoords = (piece) => {
  let coords = {}
  let x = 0
  let y = 0
  let totalSize = piece.gridSize * piece.gridSize

  for(let i = 0; i < totalSize; i++){
    if(piece.shape[i] !== '-'){
      let vec = new Vector(x,y)
      vec.sum(pieceCoords)
      coords[`${vec.x},${vec.y}`] = new Block(vec,piece.color)
    }
    x++
    if(x === piece.gridSize){
      y++
      x = 0
    }    
  }
  return coords
}

let activePiece = {...pieces[2]}
let gamePiece = [...pieces[2].shape]
let gameSize = pieces[2].gridSize
let piece = getIntialPieceCoords({...pieces[2]})
console.log(piece)


const rotateGamePiece = (gamePiece, size) => {

      let rotatedArray = []
      let start = (size * size) - size
      let origin = start
      let count = gamePiece.length
      let counter = 1
      for(let i = 0; i < gamePiece.length; i++){
        rotatedArray.push(gamePiece[start])
        start -= size
        if(start < 0){
          start = origin + counter;
          counter++
        }       
      }
    return rotatedArray
}

const rotate = (pieceToRotate, count = 0) => {


  
  
  let prevShape = [...pieceToRotate.shape]
  let newShape = rotateGamePiece(pieceToRotate.shape,pieceToRotate.gridSize)
  let newPiece = {...pieceToRotate}
  newPiece.shape = newShape
  let rotations = 0
  let rotatedPiece = getIntialPieceCoords(newPiece)

  let freeRotation = checkCollion(rotatedPiece)
  console.log(freeRotation)
  while(!freeRotation){
    newShape = rotateGamePiece(newPiece.shape, newPiece.gridSize)
    newPiece.shape = newShape
    rotatedPiece = getIntialPieceCoords(newPiece)
    console.log(rotatedPiece)
    freeRotation = checkCollion(rotatedPiece)
    rotations = rotations + 1
    console.log(rotations)
  }
  
  activePiece = newPiece
  return rotatedPiece
}


gameWell['6,25'] = new Block(new Vector(6,25), 'red')



const movePiece = (piece,direction) => {
  let prev = {...piece}
 
  let newPiece = {}
  for(let block in piece){
    let vec = new Vector(piece[block].pos.x,piece[block].pos.y)
    vec.sum(direction)
    let square = new Block(vec,piece[block].color)    
    let coords = `${square.pos.x},${square.pos.y}`
    newPiece[coords] = square
  }
  if(checkCollion(newPiece)){
    pieceCoords.sum(direction)
    return newPiece
  }
  else{
    return prev
  }
}

const checkCollion = (piece) => {
  for(let block in piece){
      if(gameWell[block] !== null){
        return false
      }
  }
  return true
}

const drawPiece = (piece) => {
    for(let block in piece){
      piece[block].draw(ctx)
    }
}

const keyHandler = (event) => {
  let key = event.key
  
  switch(key){
    case 'ArrowDown':
      let down = new Vector(0,1)
      piece = movePiece(piece, down)
      timer = 0
      break;
    case 'ArrowRight':
      let right = new Vector(1,0)
      piece = movePiece(piece, right)
      break;
    case 'ArrowLeft':
        let left = new Vector(-1,0)
        piece =  movePiece(piece, left)
      break;
    case ' ':
        piece = rotate(activePiece)
         break;
    default:
      let idle = new Vector(0,0)
      piece = movePiece(piece, idle)
  }
}


let timer = 0
const moveDown = (piece) => {
  
  if(timer > 30){
    let down = new Vector(0,1)
    piece = movePiece(piece, down)
    timer = 0
  }
  console.log(timer)
  timer++
  return piece  
}


window.onkeydown = keyHandler

const drawWell = (well) => {
    for(let block in well){
      if(well[block] !== null){
        well[block].draw(ctx)
      }
    }
}




const gameLoop = () => {
  ctx.clearRect(0,0,canvasWidth, canvasHeight)
  drawPiece(piece)
  drawWell(gameWell)
  piece = moveDown(piece)
}

setInterval(gameLoop, 1000/60);