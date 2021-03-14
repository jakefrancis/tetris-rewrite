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

  console.log(pxSize)
  const wrapper = document.getElementById('canvas-wrapper')
  const canvas = document.createElement('canvas')
  const holdCanvas = document.createElement('canvas')
  const nextCanvas = document.createElement('canvas')

  const ctx = canvas.getContext('2d')
  const holdCtx = holdCanvas.getContext('2d')
  const nextCtx = nextCanvas.getContext('2d')

  const canvasWidth = pxSize * wellWidth
  const canvasHeight = pxSize * wellHeight

  let held = false

  canvas.width = canvasWidth
  canvas.height = canvasHeight

  holdCanvas.width = nextCanvas.width = pxSize * 5
  holdCanvas.height = nextCanvas.height = pxSize * 5 
  canvas.style.background = 'black'

  canvas.className='well'
  holdCanvas.className='hold'
  nextCanvas.className ='next'

  wrapper.appendChild(canvas)
  wrapper.appendChild(holdCanvas)
  wrapper.appendChild(nextCanvas)

  import Vector from './vector.js'

//blocks displayed on screen
  class Block {
      constructor(x,y,color){
        this.x = x
        this.y = y
        this.color = color
      }
      draw(can,ghost = false) {
        if(!ghost){
          can.fillStyle = `rgb(${this.color[0] - 50},${this.color[1] - 50},${this.color[2] -50},${this.color[3]})`
          
        }
        can.fillStyle = !ghost ? `rgb(${this.color[0]},${this.color[1]},${this.color[2]},${this.color[3]})` : 'rgb(255,255,255,0.3)' 
        can.fillRect(this.x * pxSize, this.y * pxSize, pxSize, pxSize)
      }
  }
//~~~~~~~~~~~~~~~~
//hash should be converted to a 2d array or matrix makes it really messy to check lines
//~~~~~~~~~~~~~~~~

//creates a hash of coordinates
const produceWell = (width,height) => {
  let well = []
  //gen xy coordinates of the well
    for(let y = 0; y < height; y++){
          well.push([])
        for(let x = 0; x < width; x++){
            well[y].push(null)
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
pieceBag = fillBagIfEmpty(pieceBag,pieces,4)
console.log(pieceBag)
console.log(pickRandomPiece(pieceBag))
console.log(pieceBag)

const startingCoords = {x: 3, y: 1}

let pieceCoords = {...startingCoords}


const getIntialPieceCoords = (piece,alt = false,) => {
  let coords = []
  let x = 0
  let y = 0
  let totalSize = piece.gridSize * piece.gridSize

  for(let i = 0; i < totalSize; i++){
    if(piece.shape[i] !== '-'){
      if(!alt){
        let vecX = x + pieceCoords.x
        let vecY = y + pieceCoords.y
        coords[`${vecX},${vecY}`] = new Block(vecX,vecY,piece.color)
      }
      else{
        coords[`${x + 0.5},${y + 0.5}`] = new Block(x + 0.5,y + 0.5,piece.color)
      }
    }
    else{

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
let nextPiece = pickRandomPiece(pieceBag)
let next = getIntialPieceCoords(nextPiece, true)
let ghostPiece = {...piece}

const pickNewPiece = (bag) => {
    pieceCoords = {...startingCoords}
    activePiece = {...nextPiece}
    nextPiece = pickRandomPiece(bag)
    pieceBag = fillBagIfEmpty(bag,pieces,2)
    next = getIntialPieceCoords(nextPiece,true)
    piece = getIntialPieceCoords(activePiece)
    ghostPiece = {...piece}
    return piece
}

let holdPiece = null
let hold = null

const swapHoldPiece = (piece) => {
  if(!held){
    if(holdPiece !== null){
      pieceCoords = {...startingCoords}
      let holdCopy = {...holdPiece}
      holdPiece = {...activePiece}
      activePiece = holdCopy
      hold = getIntialPieceCoords(holdPiece, true)
      piece = getIntialPieceCoords(activePiece)
      ghostPiece ={...piece}
      held = true
      return piece
    }
    else{
      holdPiece = {...activePiece}
      hold = getIntialPieceCoords(holdPiece,true)
      piece = pickNewPiece(pieceBag)
      held = true
      return piece
    }
  }
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
      let coord = block.split(',')
      let x = Number(coord[0])
      let y = Number(coord[1])
      if(gameWell[y] === undefined ){
        return false
      }
      if(gameWell[y][x] === undefined){
        return false
      }
      if(gameWell[y][x] !== null){
        return false
      }
  }
  return true
}

const drawPiece = (piece,context, ghost = false) => {
  if(piece === null) return
    for(let block in piece){
      piece[block].draw(context,ghost)
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
    case 'c':
        piece = swapHoldPiece(piece)
        break;        
    default:
      let idle = {x: 0, y: 0}
      piece = movePiece(piece, idle)
  }
}


let timer = 0



window.onkeydown = keyHandler
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false)

canvas.addEventListener('click',tapHandler)

function tapHandler(event) {
  event.preventDefault()
  piece = rotate(activePiece)
  bottom = true
  ghostPiece = {...piece}
}

let xDown = null;
let yDown = null;

function handleTouchEnd(evt){
  xDown = null
  yDown = null
}

function getTouches(evt) {
  return evt.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;


  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    //most significant
    if (xDiff > pxSize * 1.5) {
      let left =  {x: -1, y: 0}
      piece =  movePiece(piece, left)
      bottom = true
      ghostPiece = {...piece}
      xDown = xUp   
  
    } else if(xDiff < pxSize * -1.5){
      let right =  {x: 1, y: 0}
      piece = movePiece(piece, right)
      bottom = true
      ghostPiece = {...piece}
      xDown = xUp   
    
    }
  } else {
    if (yDiff > 5 * pxSize) {
      piece = swapHoldPiece(piece)
      yDown = yUp
      xDown = xUp  
    } 
    else if(yDiff < pxSize * -2){
      console.log('hard')
      //let down =  {x: 0, y: 1}
      piece = dropGhostPiece(piece)
      timer = 0    
      yDown = yUp
      xDown = xUp  
    }    
    else if(yDiff < pxSize * -1){
      let down =  {x: 0, y: 1}
      piece = movePiece(piece, down)
      timer = 0    
      yDown = yUp
      xDown = xUp  
    }
  }
  // reset values //
  //xDown = xUp;
  //yDown = yDiff;
}

const drawWell = (well) => {
    for(let y = 0; y < well.length; y++){
      for(let x = 0;x < well[y].length; x++ ){
        if(well[y][x] !== null){
          well[y][x].draw(ctx)
        }        
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
    held = false
    gameWell = lineClear(gameWell,wellWidth,wellHeight)
    piece = pickNewPiece(pieceBag)
    if(!verifyNoCollision(piece)){
      resetGame()
    }
    }
    timer = 0
  }
  timer++
  return piece
}

const storeInWell = (piece) => {
    for(let block in piece){
      let x = piece[block].x
      let y = piece[block].y
      gameWell[y][x] = piece[block]
    }
}

const lineClear = (well) => {
    let linesCleared = 0
    let blockCount = 0
    let nullCount = 0
    for(let y = wellHeight - 1; y >= 0; y--){
       for(let x = wellWidth -1; x >=0; x--){
         if(well[y][x] === null) nullCount++;
         else blockCount++;
         if(nullCount === wellWidth) break;
         
         if(blockCount === wellWidth){
           well.splice(y,1)
           well.unshift([])
           for(let i = 0; i < wellWidth; i++){
             well[0].push(null)
           }
           linesCleared++     
           y++
         }
        
       }
       blockCount = 0
       nullCount = 0
    }
    if(linesCleared > 0){
      console.log(rebuildWell(well))
      return rebuildWell(well)
    }
    return well
}


const rebuildWell = (well) => {
  let copy = [...well]
   for(let y = 0; y < wellHeight; y++){
      for(let x = 0; x < wellWidth; x++){
        if(copy[y][x] !== null){
          console.log(copy[y][x])
          console.log(y)
          copy[y][x].x = x
          copy[y][x].y = y
          console.log(copy[y][x])
        }       
      }
    }
    return copy
}

const topClear = (well) => {
  let top = well[0]
  for(let x = 0; x < top.length; x++){
    if(well[x] !== null) return false
  }
  return true
}

const resetGame = () => {
  gameWell = produceWell(wellWidth,wellHeight)
}




const gameLoop = () => {
  ctx.clearRect(0,0,canvasWidth, canvasHeight)
  nextCtx.clearRect(0,0,pxSize * 5, pxSize * 5)
  holdCtx.clearRect(0,0,pxSize * 5, pxSize * 5)
    
  ghostPiece = dropGhostPiece(ghostPiece)
  drawPiece(ghostPiece,ctx,true)
  
  drawWell(gameWell)
  drawPiece(piece,ctx) 
  drawPiece(next,nextCtx)
  drawPiece(hold, holdCtx)
  piece = moveDown(piece)
}

setInterval(gameLoop, 1000/60);