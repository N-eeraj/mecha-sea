export default class UI {
  constructor(game) {
    this.game = game
    this.width = 3
    this.height = 20
    this.color = {
      text: 'white',
      available: '#5F0',
      unavailable: '#050',
    }
  }

  draw(context) {
    // score
    this.drawText(context, () => {
      context.font = '20px helvetica'
      context.fillText(`Score: ${this.game.score}`, 20, 30)
    })

    // ammo
    for (let i = 0; i < this.game.ammo.max; i++) {
      if (i < this.game.ammo.current)
        context.fillStyle = this.color.available
      else
        context.fillStyle = this.color.unavailable
      context.fillRect(20 + i * this.width, 50, this.width, this.height)
    }

    if (!this.game.gameOver) return
    this.drawText(context, () => {
      context.font = '42px helvetica'
      context.textAlign = 'center'
      context.fillText('Game over', this.game.width * 0.5, this.game.height * 0.5)
    })
  }

  drawText(context, callback) {
    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'
    context.fillStyle = this.color.text
    callback()
    context.restore()
  }
}
