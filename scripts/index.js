import Game from './classes/game.js'

// init method
const init = () => {

  // constants & variables
  const GAME_WIDTH = 720
  const GAME_HEIGHT = 480
  const canvas = document.getElementById('canvas')
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
    game.update()
    game.draw(ctx)
    requestAnimationFrame(animate)
  }

  canvas.width = GAME_WIDTH
  canvas.height = GAME_HEIGHT

  animate(0)
}

window.addEventListener('load', init)
