export default class Projectile {
  constructor(game, x, y) {
    this.game = game
    this.x = x
    this.y = y
    this.width = 28
    this.height = 10
    this.speed = 3
    this.image = document.getElementById('projectile')
    this.readyToRemove = false
  }

  update() {
    this.x += this.speed
    if (this.x > this.game.width * 0.75)
      this.readyToRemove = true
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
