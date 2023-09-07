export default class Enemy {
  constructor({ game, image, frames, speed, health, score, damage = 0, type = 'damage' }) {
    this.game = game
    this.image = image
    this.x = this.game.width
    this.frame = frames
    this.health = health
    this.score = score
    this.speedX = -speed
    this.damage = damage
    this.type = type
    this.readyToRemove = false
  }

  update() {
    this.x += this.speedX
    if (this.x + this.width <= 0)
      this.readyToRemove = true

    if (this.frame.x < this.frame.max) ++this.frame.x
    else this.frame.x = 0
  }

  draw(context) {
    context.drawImage(this.image, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}
