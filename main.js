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
      constructor(x,y,color){
        this.x = x
        this.y = y
        this.color = color
      }
      draw(can,ghost = false) {
        can.fillStyle = !ghost ? this.color : 'rgb(255,255,255,0.3)' 
        can.fillRect(this.x * pxSize, this.y * pxSize, pxSize, pxSize)
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

const fillBagOfPieces = (pieces,duplicates = 6) => {
      let bag = []
      for(let piece of pieces){
        for(let i = 0; i < duplicates; i++){
          bag.push({...piece})
        }
      }
      return bag
}     
    

const pickRandomPiece= (bag) => {
  let randomIndex = Math.floor(Math.random() * bag.length)
  return bag.splice(randomIndex, 1)[0]
}



const fillBagIfEmpty = (bag,pieces,duplicates = 6) => {
      return bag = bag.length === 0 ? fillBagOfPieces(pieces,duplicates) : bag
}


let pieceBag = [] 
pieceBag = fillBagIfEmpty(pieceBag,pieces,2)
console.log(pieceBag)
console.log(pickRandomPiece(pieceBag))
console.log(pieceBag)

const startingCoords = {x: 3, y: 1}

let pieceCoords = {...startingCoords}


const getIntialPieceCoords = (piece) => {
  let coords = {}
  let x = 0
  let y = 0
  let totalSize = piece.gridSize * piece.gridSize

  for(let i = 0; i < totalSize; i++){
    if(piece.shape[i] !== '-'){
      let vecX = x + pieceCoords.x
      let vecY = y + pieceCoords.y
      coords[`${vecX},${vecY}`] = new Block(vecX,vecY,piece.color)
    }
    x++
    if(x === piece.gridSize){
      y++
      x = 0
    }    
  }
  return coords
}




let activePiece = pickRandomPiece(pieceBag)
let piece = getIntialPieceCoords(activePiece)
let ghostPiece = {...piece}

const pickNewPiece = (bag) => {
    pieceCoords = {...startingCoords}
    activePiece = pickRandomPiece(bag)
    pieceBag = fillBagIfEmpty(bag,pieces,2)
    piece = getIntialPieceCoords(activePiece)
    ghostPiece = {...piece}
    return piece
}


console.log(piece)


const rotateGamePiece = (gamePiece, size) => {
      let rotatedArray = []
      let start = (size * size) - size
      let origin = start
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
  console.log(rotatedPiece)

  let freeRotation = verifyNoCollision(rotatedPiece)
  
  if(pieceToRotate.name !== 'bar'){
    console.log(pieceToRotate.name)
    rotatedPiece = wallKick(rotatedPiece, freeRotation)
    freeRotation = verifyNoCollision(rotatedPiece)
  }
  

  while(!freeRotation){
    console.log(rotations)
    newShape = rotateGamePiece(newPiece.shape, newPiece.gridSize)
    newPiece.shape = newShape
    rotatedPiece = getIntialPieceCoords(newPiece)
    freeRotation = verifyNoCollision(rotatedPiece)

    if(pieceToRotate.name !== 'bar'){
      console.log(pieceToRotate.name)
      rotatedPiece = wallKick(rotatedPiece, freeRotation)
      freeRotation = verifyNoCollision(rotatedPiece)
    }
    rotations = rotations + 1
    if(rotations > 3){      
      break;
    }
  }
  
  activePiece = newPiece
  return rotatedPiece
}

const wallKick = (piece,freeRotating) => {
  if(!freeRotating){
    piece = movePiece(piece, {x:-1,y:0})
    freeRotating = verifyNoCollision(piece)
    if(!freeRotating){
      piece = movePiece(piece, {x: 1,y:0})
      freeRotating = verifyNoCollision(piece)
      if(!freeRotating){
        piece = movePiece(piece, {x:-1,y:0})
        freeRotating = verifyNoCollision(piece) 
      }
    }
  }  
  return piece
}

const movePiece = (piece,direction,ghost = false,autoDrop = false) => {
  let prev = {...piece} 
  let newPiece = createPieceFromMove(piece,direction)
  if(verifyNoCollision(newPiece)){

      pieceCoords.x += direction.x
      pieceCoords.y += direction.y
  
    return newPiece
  }
  else{
    return prev
  }
}


const createPieceFromMove = (piece, direction) => {
  let newPiece = {}
  for(let block in piece){
    let vecX = piece[block].x + direction.x
    let vecY = piece[block].y + direction.y
    let square = new Block(vecX,vecY,piece[block].color)    
    let coords = `${vecX},${vecY}`
    newPiece[coords] = square
  }
  return newPiece
}

const verifyNoCollision = (piece) => {
  for(let block in piece){
      if(gameWell[block] !== null){
        return false
      }
  }
  return true
}

const drawPiece = (piece, ghost = false) => {
    for(let block in piece){
      piece[block].draw(ctx,ghost)
    }
}

const keyHandler = (event) => {
  let key = event.key
  
  switch(key){
    case 'ArrowDown':
      let down =  {x: 0, y: 1}
      piece = movePiece(piece, down)
      timer = 0
      break;
    case 'ArrowRight':
      let right =  {x: 1, y: 0}
      piece = movePiece(piece, right)
      bottom = true
      ghostPiece = {...piece}
      break;
    case 'ArrowLeft':
        let left =  {x: -1, y: 0}
        piece =  movePiece(piece, left)
        bottom = true
        ghostPiece = {...piece}
      break;
    case ' ':
        piece = rotate(activePiece)
        bottom = true
        ghostPiece = {...piece}
         break;
    default:
      let idle = {x: 0, y: 0}
      piece = movePiece(piece, idle)
  }
}


let timer = 0



window.onkeydown = keyHandler

const drawWell = (well) => {
    for(let block in well){
      if(well[block] !== null){
        well[block].draw(ctx)
      }
    }
}


let bottom = true



const dropGhostPiece = (ghostPiece) => {
  //copy the piece object provide to avoid mutation
  let copy = {...ghostPiece}
  let prev;
  //down vector
  let down =  {x: 0, y: 1} 
  //keep moving the ghostPiece down the well until you find a collision
  while(verifyNoCollision(copy)){
    prev = {...copy}
    copy = createPieceFromMove(copy,down)
  }
  //return the previous position prior to finding a collison. 
    return prev
  
}

const moveDown = (piece) => {  
  if(timer > 30){
    let down =  {x: 0, y: 1}
    let prevCoords = {...pieceCoords}
    piece = movePiece(piece, down)
    //if the coords are the same that means the piece is no longer moving down,
    //or too  put it simply it collided with something. 
    if(pieceCoords.x === prevCoords.x 
      && pieceCoords.y === prevCoords.y){
    storeInWell(piece)
    gameWell = lineClear(gameWell,wellWidth,wellHeight)
    piece = pickNewPiece(pieceBag)
    }
    timer = 0
  }
  timer++
  return piece
}

const storeInWell = (piece) => {
    for(let block in piece){
      gameWell[block] = piece[block]
    }
}

const lineClear = (well,width,height) => {
    let linesCleared = 0
    let widthCount = 0
    let blockCount = 0
    let nullCount = 0
    //if the event of a line clear/s we will copy the well into an array
    //splice the entire row/s or line/s from the array
    //insert a new empty line/s at the beginning
    //then rebuild the well hashmap from the array
    let wellArray = buildWellArrayFromHash(well,width,height)
    for(let y = wellArray.length - 1; y >= 0; y--){
        if(wellArray[y] === null){
          nullCount++
          if(nullCount === width){
            break;
          }
        }
        else{
          blockCount++
          if(blockCount === width){
            linesCleared++
            wellArray.splice(y,width)
            for(let i = 0; i < width; i++){
              wellArray.unshift(null)
            }
            y += width
          }
        }
        widthCount++
        if(widthCount === width){
          nullCount = 0
          blockCount = 0
          widthCount = 0
      }
    }
    if(linesCleared > 0){
      return rebuildWellHash(wellArray,width,height)
    }
    return well
}

const buildWellArrayFromHash = (well,width,height) => {
  let wellArray = []
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            wellArray.push(well[`${x},${y}`])
        }
    }
  return wellArray
}

const rebuildWellHash = (wellArray,width,height) => {
    let hash = {}
    let endX =  width - 1
    let x = 0
    let y = 0
    for(let item of wellArray){
      if(item !== null){
        item.x = x
        item.y = y
      }    
      hash[`${x},${y}`] = item
      x++
      if(x > endX){
        y++
        x = 0
      }
    }
  return hash
}




const gameLoop = () => {
  ctx.clearRect(0,0,canvasWidth, canvasHeight)  
  ghostPiece = dropGhostPiece(ghostPiece)
  drawPiece(ghostPiece,true)
  drawPiece(piece) 
  drawWell(gameWell)
  piece = moveDown(piece)
}

setInterval(gameLoop, 1000/60);