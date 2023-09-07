export default class Particles {
  constructor({ game, x, y }) {
    this.game = game
    this.x = x
    this.y = y
    this.image = document.getElementById('gears')
    this.frame = {
      x: Math.floor(Math.random() * 3),
      y: Math.floor(Math.random() * 3),
    }
    this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1)
    this.spriteSize = 50
    this.size = this.sizeModifier * this.spriteSize
    this.speed = {
      x: Math.random() * 6 - 3,
      y: Math.random() * -15,
    }
    this.gravity = 0.5
    this.readyToRemove = false
    this.angle = 0
    this.rotation = Math.random() * 0.2 - 0.1
    this.bounce = {
      count: 0,
      boundary: Math.random() * 80 + 50,
    }
  }

  update() {
    this.angle += this.rotation
    this.speed.y += this.gravity
    this.x -= this.speed.x + 3
    this.y += this.speed.y

    if (this.y > this.game.height - this.bounce.boundary && this.bounce.count < 3) {
      this.speed.y *= -0.75
      ++this.bounce.count
    }

    if (this.y > this.game.height + this.size || this.x < 0 - this.size)
      this.readyToRemove = true
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(this.image, this.frame.x * this.spriteSize, this.frame.y * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size)
    context.restore()
  }
}
