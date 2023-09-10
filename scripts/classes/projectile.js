export default class Projectile {
  constructor(game, x, y) {
    this.game = game
    this.x = x
    this.y = y
    this.width = 28
    this.height = 10
    this.speed = 3
    this.image = document.getElementById('fireball')
    this.frame = {
      current: 0,
      max: 3,
      timer: 0,
      interval: 30,
    }
    this.sprite = {
      width: 36.25,
      height: 20,
    }
    this.readyToRemove = false
  }

  update(deltaTime) {
    if (this.frame.timer > this.frame.interval) {
      this.frame.timer = 0
      if (this.frame.current < this.frame.max)
        this.frame.current++
      else
        this.frame.current = 0
    }
    else
      this.frame.timer += deltaTime

    this.x += this.speed
    if (this.x > this.game.width * 0.75)
     this.readyToRemove = true
  }

  draw(context) {
    context.drawImage(this.image, this.frame.current * this.sprite.width, 0, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height)
  }
}
