class Enemy {
  constructor({ game, speed, health, score }) {
    this.game = game
    this.x = this.game.width
    this.health = health
    this.score = score
    this.speedX = -speed
    this.readyToRemove = false
  }

  update() {
    this.x += this.speedX
    if (this.x + this.width <= 0)
      this.readyToRemove = true
  }

  draw(context) {
    context.fillStyle = 'red'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}

export class Angler extends Enemy {
  constructor(game) {
    super({
      game,
      speed: 1.75,
      score: 10,
      health: 5,
    })
    this.width = 228
    this.height = 169
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
