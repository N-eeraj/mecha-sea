// to handle user input
export class InputHandler {
  constructor(game) {
    this.game = game
    window.addEventListener('keydown', ({ key }) => {
      if (['ArrowUp', 'ArrowDown'].includes(key) && !this.game.keys.includes(key))
        this.game.keys.push(key)
      else if (key === ' ')
        this.game.player.shootTop()
    })
    window.addEventListener('keyup', ({ key }) => this.game.keys = this.game.keys.filter(k => k !== key))
  }
}

// to handle player laser
export class Projectile {
  constructor(game, x, y) {
    this.game = game
    this.x = x
    this.y = y
    this.width = 10
    this.height = 3
    this.speed = 3
    this.outOfRange = false
  }

  update() {
    this.x += this.speed
    if (this.x > this.game.width * 0.75)
      this.outOfRange = true
  }

  draw(context) {
    context.fillStyle = 'red'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}

// to handle enemy damage effects
export class Particle {

}

// to handle player sprite & details
export class Player {
  constructor(game) {
    this.game = game
    this.width = 120
    this.height = 190
    this.x = 20
    this.y = 100
    this.speedY = 0
    this.maxSpeed = 3
    this.projectiles = []
  }

  update() {
    // handle movement
    if (this.game.keys.includes('ArrowUp')) (this.speedY += 5)
    else if (this.game.keys.includes('ArrowDown')) (this.speedY -= 5)
    else this.speedY = 0

    this.y -= this.speedY

    // handle projectiles
    this.projectiles.forEach(projectile => projectile.update())
    this.projectiles = this.projectiles.filter(projectile => !projectile.outOfRange)
  }

  draw(context) {
    context.fillStyle = 'blue'
    context.fillRect(this.x, this.y, this.width, this.height)
    this.projectiles.forEach(projectile => projectile.draw(context))
  }

  shootTop() {
    if (!this.game.playerAmmo) return
    this.projectiles.push(new Projectile(this.game, this.x + this.width / 2, this.y))
    this.game.playerAmmo--
  }
}

// to handle enemy
export class Enemy {

}

// to handle paralax effect
export class Layer {

}

// to handle entire background
export class Background {

}

// to handle score, timer & UI elements
export class UI {

}

// to handle all logic
export class Game {
  constructor({ width, height }) {
    this.width = width
    this.height = height
    this.keys = []
    this.playerAmmo = 25

    this.player = new Player(this)
    this.input = new InputHandler(this)
  }

  update() {
    this.player.update()
  }

  draw(context) {
    this.player.draw(context)
  }
}
