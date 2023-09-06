export default class Projectile {
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
