export default class Shield {
  constructor(player) {
    this.player = player
    this.image = document.getElementById('shield')
    this.active = false
    this.frame = {
      current: 0,
      max: 24,
      timer: 0,
      interval: 15,
    }
  }

  update(deltaTime) {
    if (this.frame.timer > this.frame.interval) {
      this.frame.timer = 0
      if (this.frame.current < this.frame.max)
        ++this.frame.current
      else {
        this.frame.current = 0
        this.active = false
      }
    }
    else this.frame.timer += deltaTime
  }

  draw(context) {
    context.drawImage(this.image, this.frame.current * this.player.width, 0 * this.player.height, this.player.width, this.player.height, this.player.x, this.player.y, this.player.width, this.player.height)
  }
}
