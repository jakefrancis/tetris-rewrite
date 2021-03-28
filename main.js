/*

import {body,container,canvas,
  info,div,pointTotal,levelTotal,
  lineTotal,nextBlock,pauseScreen,
  displayPaused,startScreenDisplay,
  font,leftButton,rightButton,
  downButton,enterButton,rotateButton,
  escButton} from './src/dom.js'
*/
  import {colors,backgroundColor,pieces,pxSize,altPx,wellHeight,wellWidth} from './src/constants.js'
  //startScreenDisplay();

  const wrapper = document.getElementById('canvas-wrapper')
  const wellWrapper = document.createElement('div')
  wellWrapper.className = 'well-wrapper'
  wrapper.appendChild(wellWrapper)
  const canvas = document.createElement('canvas')
  const holdCanvas = document.createElement('canvas')
  const nextCanvas = document.createElement('canvas')

  const translucentMask = document.getElementById('translucent-mask')
  const startMenu = document.getElementById('start-menu')
  const pauseMenu = document.getElementById('pause-menu')
  const confirmationMenu = document.getElementById('confirmation-menu')
  const controlsMenu = document.getElementById('controls-menu')
  const optionsMenu = document.getElementById('options-menu')
  const optionsButton = document.getElementById('options-main-button')
  const listDescription = document.getElementsByClassName('list-wrapper')
  console.log(listDescription)
  for(let i = 0; i < listDescription.length; i++){
    listDescription[i].style.fontSize = `${1.5 * altPx}px`
  }

  const backOptionsButton = document.getElementById('back-options-button')
  const backPauseOptionsButton = document.getElementById('back-pause-options-button')
  const optionsPauseButton = document.getElementById('options-pause-button')
  const vibrateButton = document.getElementById('vibrate-button')
  const soundButton = document.getElementById('sound-button')

  const yesButton = document.getElementById('yes-button')
  const noButton = document.getElementById('no-button')
  const pauseButton = document.getElementById('pause')
  const pauseIcon = document.getElementById('pause-button')
  const backControlsButton = document.getElementById('back-controls-button')

  const gameOverMenu = document.getElementById('game-over-menu')
  const gameOverScore =  document.getElementById('score-id')
  const newGameOverButton = document.getElementById('new-game-over-button')

  pauseIcon.style.width = `${2 * pxSize}px`

  const instructionsButton = document.getElementById('instructions-button')
  const mobileControlsButton = document.getElementById('mobile-controls-button')
  const desktopControlsButton = document.getElementById('desktop-controls-button')

  const mobileControlsMenu = document.getElementById('mobile-controls-menu')
  const desktopControlsMenu = document.getElementById('desktop-controls-menu')

  const mobileControlsBackButton = document.getElementById('mobile-controls-back-button')
  const desktopControlsBackButton = document.getElementById('desktop-controls-back-button')
  

  const newGameButton = document.getElementById('new-game-button')
  const continueButton = document.getElementById('continue-button')
  const restartButton = document.getElementById('restart-button')

  let vibrationOn = true

  //validates if browser is capable of handling the vibrate function
  //disables the ability to toggle the vibrate function on and off
  if (!navigator.vibrate) {
    optionsButton.style.display = 'none'
    vibrateButton.style.display = 'none'
    vibrationOn = false
  }

  const vibrate = (length = 10) => {
    if(vibrationOn){
      window.navigator.vibrate(length)
    }    
  } 

  

  const setFontSize = (() => {
    let fontSize = `${pxSize}px`
    let itemSize =`${altPx}px`
  
    let menuFonts = document.getElementsByClassName('menu-font')
    for(let item of menuFonts){
      item.style.fontSize = fontSize
    }
  
    let itemFonts = document.getElementsByClassName('item-font')
    for(let item of itemFonts){
      item.style.fontSize = itemSize
    }
  })()

  const newGame = () => {
    clearAllCanvas()
    piece = resetGame()
    pointsHeading.innerText = 0
    levelHeading.innerText = 'Level 1'
    currentState = 'playing'
    translucentMask.style.background = 'none'
    pauseButton.style.display = 'block'
    gameOverMenu.style.display = 'none'
    startMenu.style.display = 'none'
    wrapper.style.zIndex = 0;
    vibrate()
  }

  newGameButton.onclick = newGame

  const continueGame = () => {
    currentState = 'playing'
    pauseMenu.style.display = 'none'
    translucentMask.style.background = 'none'
    pauseButton.style.display = 'block'
    wrapper.style.zIndex = 0;
    vibrate()    
  }

  continueButton.onclick = continueGame



  const pauseGame = () => {
    currentState = 'paused'
    pauseButton.style.display = 'none'
    translucentMask.style.background = `rgb(0,0,0,.5)`
    pauseMenu.style.display = 'flex'
    wrapper.style.zIndex = -1;
    vibrate()
  }

  const restartGame = () => {
    confirmationMenu.style.display = 'none'
    startMenu.style.display = 'flex'
    translucentMask.style.background = 'black'
    vibrate()    
  }
  yesButton.onclick = restartGame

  const returnToPause = () => {
    confirmationMenu.style.display = 'none'
    pauseMenu.style.display = 'flex'
    vibrate()    
  }
  noButton.onclick = returnToPause

  const confirmMenu = () => {
    pauseMenu.style.display = 'none'
    confirmationMenu.style.display = 'flex'
    vibrate()
  }

  restartButton.onclick = confirmMenu

  const controlsBackToStartMenu = () => {
    controlsMenu.style.display = 'none'
    startMenu.display = 'flex'
    vibrate()
  }

  backControlsButton.onclick = controlsBackToStartMenu

  const controlsDisplay= () => {
    startMenu.display = 'none'
    controlsMenu.style.display = 'flex'
    vibrate()
  }

  instructionsButton.onclick = controlsDisplay

  const optionsDisplay = () => {
    startMenu.style.display ='none'
    optionsMenu.style.display = 'flex'
    vibrate()
  }

  optionsButton.onclick = optionsDisplay

  const optionsPauseDisplay = () => {
    pauseMenu.style.display = 'none'
    backOptionsButton.style.display = 'none'
    backPauseOptionsButton.style.display = 'block'
    optionsMenu.style.display = 'flex'
    vibrate()
  }

  optionsPauseButton.onclick = optionsPauseDisplay

  const optionsBackToStartMenu = () => {
    optionsMenu.style.display = 'none'
    startMenu.style.display = 'flex'
    vibrate()
  }
  
  backOptionsButton.onclick = optionsBackToStartMenu

  const optionsBackToPauseMenu = () => {
    optionsMenu.style.display = 'none'
    backOptionsButton.style.display = 'block'
    backPauseOptionsButton.style.display = 'none'
    pauseMenu.style.display ='flex'
    vibrate()
  }

  backPauseOptionsButton.onclick = optionsBackToPauseMenu



  const toggleVibration = () => {
    vibrationOn = !vibrationOn
    vibrateButton.innerText = vibrationOn ? 'VIBRATION IS ON': 'VIBRATION IS OFF'
    vibrate()
  }

  vibrateButton.onclick = toggleVibration


  const gameOverDisplay = () => {
      console.log('over')
      gameOverMenu.style.display = 'flex'
      gameOverScore.innerText = `SCORE: ${points}`
  }

  newGameOverButton.onclick = newGame

  const displayMobileControls = () => {
     controlsMenu.style.display = 'none'
     mobileControlsMenu.style.display = 'flex'
     vibrate()
  }

  mobileControlsButton.onclick = displayMobileControls

  const mobileControlsBack = () => {
    mobileControlsMenu.style.display = 'none'
    controlsMenu.style.display = 'flex'
    vibrate()
  }

  mobileControlsBackButton.onclick = mobileControlsBack

  const displayDesktopControls = () => {
    controlsMenu.style.display = 'none'
    desktopControlsMenu.style.display = 'flex'
    vibrate()
 }

 desktopControlsButton.onclick = displayDesktopControls


 const desktopControlsBack = () => {
  desktopControlsMenu.style.display = 'none'
  controlsMenu.style.display = 'flex'
  vibrate()
}

desktopControlsBackButton.onclick =  desktopControlsBack









  pauseButton.onclick = pauseGame

  const pointsHeading = document.getElementById('points')
  const levelHeading = document.getElementById('level')


  const ctx = canvas.getContext('2d')
  const holdCtx = holdCanvas.getContext('2d')
  const nextCtx = nextCanvas.getContext('2d')

  const canvasWidth = pxSize * wellWidth
  const canvasHeight = pxSize * wellHeight

  let held = false
  const begginingDifficulty = 48
  let currentDifficulty = begginingDifficulty
  let level = 1
  let lines = 0
  let points = 0
  let lockDelay = 0


  canvas.width = canvasWidth
  canvas.height = canvasHeight

  holdCanvas.width = nextCanvas.width = altPx * 5
  holdCanvas.height = nextCanvas.height = altPx * 5

  canvas.className='well'
  holdCanvas.className='hold'
  nextCanvas.className ='next'

  wellWrapper.appendChild(canvas)
  wrapper.appendChild(holdCanvas)
  wrapper.appendChild(nextCanvas)

  //import Vector from './vector.js'

//blocks displayed on screen
  class Block {
      constructor(x,y,color,topColor,size){
        this.size = size
        this.trueCenter = ((holdCanvas.width / 2) - (altPx * this.size / 2)) / altPx
        this.x = x
        this.y = y
        this.color = color
        this.topColor = topColor
      }
      draw(can) {
        can.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]},${this.color[3]})`
        can.fillRect(this.x * pxSize, this.y * pxSize, pxSize, pxSize)
      }
      drawTop(can){
        can.fillStyle = this.topColor ? `rgb(${this.topColor[0]},${this.topColor[1]},${this.topColor[2]},${this.topColor[3]})` : `rgb(${this.color[0] * 1.2},${this.color[1] * 1.2},${this.color[2] * 1.2},${this.color[3]})`
        can.fillRect(this.x * pxSize, Math.floor((this.y * pxSize)-  pxSize * .2), pxSize, Math.floor(.3 * pxSize))   
      }
      drawGhost(can){
        can.fillStyle = 'rgb(255,255,255,0.3)' 
        can.fillRect(this.x * pxSize, this.y * pxSize, pxSize, pxSize)
      }
      drawAlt(can){
        can.fillStyle = 'rgb(255,255,255,1)' 
        can.fillRect(Math.floor((this.x + this.trueCenter) * altPx), Math.floor((this.y + this.trueCenter)* altPx), altPx, altPx)
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
        coords[`${vecX},${vecY}`] = new Block(vecX,vecY,[...piece.color], [...piece.topColor],piece.gridSize)
      }
      else{
        coords[`${x},${y}`] = new Block(x,y,[...piece.color],[...piece.topColor],piece.gridSize)
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





let pieceBag = [] 
pieceBag = fillBagIfEmpty(pieceBag,pieces,4)
let activePiece = pickRandomPiece(pieceBag)
let piece = getIntialPieceCoords(activePiece)
let nextPiece = pickRandomPiece(pieceBag)
let next = getIntialPieceCoords(nextPiece, true)
let ghostPiece = {...piece}
let potentialHold = {...activePiece}
let holdPiece = null
let hold = null




const pickNewPiece = (bag) => {
    pieceCoords = {...startingCoords}
    activePiece = {...nextPiece}
    potentialHold = {...activePiece}
    nextPiece = pickRandomPiece(bag)
    pieceBag = fillBagIfEmpty(bag,pieces,2)
    next = getIntialPieceCoords(nextPiece,true)
    piece = getIntialPieceCoords(activePiece)
    ghostPiece = {...piece}
    //vibrate()
    return piece
}



const swapHoldPiece = (piece) => {
  if(!held){
    if(holdPiece !== null){
      pieceCoords = {...startingCoords}
      let holdCopy = {...holdPiece}
      holdPiece = {...potentialHold}
      activePiece = holdCopy
      hold = getIntialPieceCoords(holdPiece, true)
      piece = getIntialPieceCoords(activePiece)
      ghostPiece ={...piece}
      held = true
      return piece
    }
    else{
      holdPiece = {...potentialHold}
      hold = getIntialPieceCoords(holdPiece,true)
      piece = pickNewPiece(pieceBag)
      held = true
      return piece
    }
  }
  return piece
  
 
}






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


  let freeRotation = verifyNoCollision(rotatedPiece)
  
  if(pieceToRotate.name !== 'bar'){
    rotatedPiece = wallKick(rotatedPiece, freeRotation)
    freeRotation = verifyNoCollision(rotatedPiece)
  }
  

  while(!freeRotation){
    newShape = rotateGamePiece(newPiece.shape, newPiece.gridSize)
    newPiece.shape = newShape
    rotatedPiece = getIntialPieceCoords(newPiece)
    freeRotation = verifyNoCollision(rotatedPiece)

    if(pieceToRotate.name !== 'bar'){
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
    let square = new Block(vecX,vecY,piece[block].color, piece[block].topColor,piece[block].gridSize)    
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

const drawPiece = (piece,context, ghost = false, alt = false) => {
  if(piece === null) return
    for(let block in piece){
      if(ghost){
        piece[block].drawGhost(context)
      }
      else if(alt){
        piece[block].drawAlt(context)
      }
      else{
        piece[block].draw(context)
      }      
      
    }
}

const drawTop = (piece, context) =>{
  if(piece === null) return
  for(let block in piece){
    piece[block].drawTop(context)
  }  
}

const keyHandler = (event) => {
  
  if(currentState !== 'playing') return
    let key = event.key
    switch(key){
      case 'ArrowDown':
        let down =  {x: 0, y: 1}
        piece = movePiece(piece, down)
        timer = 0
        break;
      case 'ArrowRight':
        if(!hardDropCommit){
          let right =  {x: 1, y: 0}
          piece = movePiece(piece, right)
          ghostPiece = {...piece}
        }   
        break;
      case 'ArrowLeft':
        if(!hardDropCommit){
          let left =  {x: -1, y: 0}
          piece =  movePiece(piece, left)
          ghostPiece = {...piece}
        }      
        break;
      case 'ArrowUp':
        if(!hardDropCommit){
             piece = rotate(activePiece)
          ghostPiece = {...piece}
        }
       
           break;
      case 'c':
        if(!hardDropCommit){
          piece = swapHoldPiece(piece)
        }
          
          break;
      case ' ':
        if(!hardDropCommit){
          piece = hardDrop(piece)  
          hardDropCommit = true
          timer = currentDifficulty
        }        
          break;
      case 'Escape':
        if(currentState === 'playing'){
          pauseGame() 
        }
                 
      default:
        let idle = {x: 0, y: 0}
        piece = movePiece(piece, idle)
    }

  
}


let timer = 0
let hardDropCommit = false



window.onkeydown = keyHandler
wrapper.addEventListener("touchstart", handleTouchStart, false);
wrapper.addEventListener("touchmove", handleTouchMove, false);
wrapper.addEventListener('touchend', handleTouchEnd, false)

wrapper.addEventListener('click',tapHandler)

function tapHandler(event) {
if(currentState !== 'playing') return
  if(!dropped){
    vibrate()
    event.preventDefault()
    piece = rotate(activePiece)
    ghostPiece = {...piece}
  } 
}

let xDown = null;
let yDown = null;
let direction = null
let dirEnd = false

function handleTouchEnd(evt){
  xDown = null
  yDown = null
  direction = null
  dirEnd = false
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

  if(currentState !== 'playing') return
  setTimeout(() => {
    if (!xDown || !yDown) {
      return;
    }
  
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
  
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
  
    if(!dirEnd){
      direction = Math.abs(xDiff) > Math.abs(yDiff) ? 'horizontal' : 'vertical'
    }
  
    if (Math.abs(xDiff) > Math.abs(yDiff) && hardDropCommit === false) {
      //most significant
      if (xDiff > pxSize * 1.5 ) {
        let left =  {x: -1, y: 0}
        piece =  movePiece(piece, left)
        ghostPiece = {...piece}
        xDown = xUp
        dirEnd = true
        vibrate()   
    
      } else if(xDiff < pxSize * -1.5 && hardDropCommit === false){
        let right =  {x: 1, y: 0}
        piece = movePiece(piece, right)
        ghostPiece = {...piece}
        xDown = xUp   
        dirEnd = true 
        vibrate()   
      
      }
    } else {
      if (yDiff > 5 * pxSize && direction === 'vertical' && hardDropCommit === false) {
        piece = swapHoldPiece(piece)
        yDown = yUp
        xDown = xUp
        dirEnd = true
        vibrate()  
      } 
      else if(yDiff < pxSize * -2 && direction === 'vertical'){
        //let down =  {x: 0, y: 1}
        piece = hardDrop(piece)  
        hardDropCommit = true
        timer = currentDifficulty
        lockDelay = 15
        yDown = 0
        xDown = 0
        dirEnd = true
        vibrate(30)
      }    
      else if(yDiff < pxSize * -1 && direction === 'vertical'){
        let down =  {x: 0, y: 1}
        piece = movePiece(piece, down)
        timer = 0    
        yDown = yUp
        xDown = xUp 
        dirEnd = true 
        vibrate()  
      }
    }
  }
,0)
  
  // reset values //
  //xDown = xUp;
  //yDown = yDiff;
}

const drawWell = (well) => {
    for(let y = 0; y < well.length; y++){
      for(let x = 0;x < well[y].length; x++ ){
        if(well[y][x] !== null){
          well[y][x].drawTop(ctx)
        }        
      }
    } 
}

const drawWellTop = (well) => {
  for(let y = 0; y < well.length; y++){
    for(let x = 0;x < well[y].length; x++ ){
      if(well[y][x] !== null){
        well[y][x].draw(ctx)
      }        
    }
  }
}


let bottom = false
let dropped = false

const hardDrop = (ghostPiece, ghost = false) => {
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
  if(!ghost){
    dropped = true
  }
    return prev
  
}

const moveDown = (piece) => {  
  if(timer > currentDifficulty || bottom === true){
    let down =  {x: 0, y: 1}
    let prevCoords = {...pieceCoords}
    piece = movePiece(piece, down)
    //if the coords are the same that means the piece is no longer moving down,
    //or too  put it simply it collided with something. 
    if(pieceCoords.x === prevCoords.x 
      && pieceCoords.y === prevCoords.y){
      bottom = true       
    }
    else{
      lockDelay = 0
      bottom = false
    }
      timer = 0
    
  }
  if(bottom){
    lockDelay++
    if(lockDelay === 30){
      storeInWell(piece)
      held = false
      gameWell = lineClear(gameWell,wellWidth,wellHeight)
      piece = pickNewPiece(pieceBag)
      if(dropped){
        dropped = false
      }
      if(!verifyNoCollision(piece)){
        currentState = 'game over'
        pauseButton.style.display = 'none'
      }
      lockDelay = 0
      bottom = false
      hardDropCommit = false
    } 
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
      lines += linesCleared
      points += calculatePoints(linesCleared)
      level = levelChange(lines)
      pointsHeading.innerText = String(points)
      console.log('Level:',level)
      let vibes = []
      for(let i = 0; i < linesCleared; i++){
        vibes.push(100)
        vibes.push(30)
      }
      vibrate(vibes)
      return rebuildWell(well)
    }
    return well
}


const rebuildWell = (well) => {
  let copy = [...well]
   for(let y = 0; y < wellHeight; y++){
      for(let x = 0; x < wellWidth; x++){
        if(copy[y][x] !== null){
          copy[y][x].x = x
          copy[y][x].y = y
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
  console.log(activePiece)
  gameWell = produceWell(wellWidth,wellHeight)
  pieceCoords = {...startingCoords}
  pieceBag = []
  pieceBag = fillBagIfEmpty(pieceBag,pieces,4)
  activePiece = pickRandomPiece(pieceBag)
  piece = getIntialPieceCoords(activePiece)
  nextPiece = pickRandomPiece(pieceBag)
  next = getIntialPieceCoords(nextPiece, true)
  held = false
  holdPiece = null
  hold = null
  ghostPiece = {...piece}
  points = 0
  level = 1
  lines = 0
  timer = 0
  currentDifficulty = begginingDifficulty
  return piece
}

const levelChange = (lines) => {
  let newLevel = Math.floor(lines / 10) + 1
  levelHeading.innerText = `Level ${newLevel}`
  currentDifficulty = begginingDifficulty - level * 5
  currentDifficulty = currentDifficulty < 4 ? 4 : currentDifficulty
  return newLevel
}

let phaseCount = 0
let phaseSpeed = 2
let phaseCoords = {x : 0,y : 0}

const phaseWell = () => {
  if(phaseCount >= phaseSpeed){
    
    phaseCount = 0
    phaseCoords.x = phaseCoords.x + 1
    if(phaseCoords.x > 9){
      phaseCoords.x = 0
      phaseCoords.y = phaseCoords.y + 1
      if(phaseCoords.y > 22){
        phaseCoords = {x : 0,y : 0}
        currentState = 'paused'
        gameOverDisplay()
        piece = resetGame()
      }
    }
  }
  phase(phaseCoords.x,phaseCoords.y)
  phaseCount++
}

const phase = (x,y) => {
  if(gameWell[y][x] !== null){
    vibrate()
    gameWell[y][x].color[3] = 0
    gameWell[y][x].topColor[3] = 0
  }
  else{
    phaseCount = phaseSpeed
  }
    
}

const calculatePoints = (linesCleared) => {
  let multiplier;
  switch(linesCleared){
    case 1:
      multiplier = 40
      break;
    case 2:
      multiplier = 100
      break;
    case 3:
      multiplier = 300
      break;
    case 4: 
      multiplier = 1200
      break;
    default:
      multiplier = 0
      break;      
  }
  let points = (level) * multiplier
  return points
}


const playing = () => {
  ctx.clearRect(0,0,canvasWidth, canvasHeight)
  nextCtx.clearRect(0,0,pxSize * 5, pxSize * 5)
  holdCtx.clearRect(0,0,pxSize * 5, pxSize * 5)
    
  ghostPiece = hardDrop(ghostPiece,true)
 
  
  
  drawTop(piece,ctx)
 
  drawWell(gameWell)
  drawWellTop(gameWell)
  drawPiece(ghostPiece,ctx,true)
  drawPiece(piece,ctx) 
  drawPiece(next,nextCtx,false,true)
  drawPiece(hold, holdCtx,false,true)
  piece = moveDown(piece)
}

const gameOver = () => {
  ctx.clearRect(0,0,canvasWidth, canvasHeight)
  nextCtx.clearRect(0,0,pxSize * 5, pxSize * 5)
  holdCtx.clearRect(0,0,pxSize * 5, pxSize * 5)
  phaseWell()
  drawWell(gameWell)
  drawWellTop(gameWell)
}

const clearAllCanvas = () => {
  ctx.clearRect(0,0,canvasWidth, canvasHeight)
  nextCtx.clearRect(0,0,pxSize * 5, pxSize * 5)
  holdCtx.clearRect(0,0,pxSize * 5, pxSize * 5)
}
let currentState = 'main'

const gameLoop = () => {
  switch(currentState){
    case 'playing':
      playing()
      break;
    case 'paused':
      //paused()
      break;
    case 'game over':
      gameOver()
      break;
  }
}

setInterval(gameLoop, 1000/60);