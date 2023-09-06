export default class UI {
  constructor(game) {
    this.game = game
    this.width = 3
    this.height = 20
    this.color = {
      available: '#5F0',
      unavailable: '#050',
    }
  }

  draw(context) {
    for (let i = 0; i < this.game.ammo.max; i++) {
      if (i < this.game.ammo.current)
        context.fillStyle = this.color.available
      else
        context.fillStyle = this.color.unavailable
      context.fillRect(20 + i * this.width, 50, this.width, this.height)
    }
  }
}
