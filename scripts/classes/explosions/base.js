export default class Explosion {
  constructor({ game, x, y }) {
    this.game = game
    this.frame = {
      current: 0,
      max: 8,
      timer: 0,
      interval: 30,
    }
    this.sprite = {
      height: 200,
      width: 200,
    }
    this.sizeModifier = Math.random() * 0.5 + 0.25
    this.width = this.sprite.width * this.sizeModifier
    this.height = this.sprite.height * this.sizeModifier
    this.x = x - this.width * 0.5
    this.y = y - this.height * 0.5
    this.readyToRemove = false
  }

  update(deltaTime) {
    if (this.frame.timer > this.frame.interval) {
      this.frame.current++
      this.frame.timer = 0
    }
    else this.frame.timer += deltaTime

    if (this.frame.current > this.frame.max)
      this.readyToRemove = true
  }

  draw(context) {
    context.drawImage(this.image, this.frame.current * this.sprite.width, 0, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height)
  }
}
