import Game from './classes/game.js'

let playBtn

// init method
const startGame = () => {
  document.body.removeChild(playBtn)

  // constants & variables
  const GAME_WIDTH = 1080
  const GAME_HEIGHT = 480

  // setup canvas
  const canvasElement = document.createElement('canvas')
  canvasElement.setAttribute('id', 'canvas')
  document.body.appendChild(canvasElement)
  const canvas = document.getElementById('canvas')
  canvas.width = GAME_WIDTH
  canvas.height = GAME_HEIGHT
  const ctx = canvas.getContext('2d')
  
  // game initialization
  const game = new Game({
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  })

  let lastTime = 0
  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    game.update(deltaTime)
    game.draw(ctx)
    requestAnimationFrame(animate)
  }

  animate(0)
}

const createButton = (text, clickListener, classes) => {
  const button = document.createElement('button')
  classes.forEach(className => button.classList.add(className))
  button.addEventListener('click', clickListener)
  button.innerText = text
  return button
}

const showPlayBtn = () => {
  playBtn = createButton('Play', startGame, ['ui-btn'])
  document.body.appendChild(playBtn)
}

const showRestartBtn = () => {
  const restartBtn = createButton('Restart', () => location.reload(), ['ui-btn', 'restart-btn'])
  document.body.appendChild(restartBtn)
}

window.addEventListener('load', showPlayBtn)
document.addEventListener('gameOver', showRestartBtn)
