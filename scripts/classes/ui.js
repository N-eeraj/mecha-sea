export default class UI {
  constructor(game) {
    this.game = game
    this.hp = {
      width: 25,
      height: 20,
    }
    this.ammo = {
      width: 3,
      height: 20,
    }
    this.color = {
      text: 'white',
      hp: {
        available: '#5F0',
        unavailable: '#050',
      },
      ammo: {
        available: '#FFF',
        unavailable: '#FFF7',
      },
    }
  }

  draw(context) {
    // score
    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'
    context.fillStyle = this.color.text
    context.font = '20px bangers'
    context.textAlign = 'right'
    context.fillText(`Score: ${this.game.score}`, this.game.width - 10, 30)

    // hp
    for (let i = 0; i < this.game.player.hp.max; i++) {
      if (i < this.game.player.hp.current)
        context.fillStyle = this.color.hp.available
      else
        context.fillStyle = this.color.hp.unavailable
      context.fillRect(20 + i * this.hp.width, 20, this.hp.width, this.hp.height)
    }

    // ammo
    for (let i = 0; i < this.game.player.ammo.max; i++) {
      if (i < this.game.player.ammo.current)
        context.fillStyle = this.color.ammo.available
      else
        context.fillStyle = this.color.ammo.unavailable
      context.fillRect(20 + i * 5, 50, this.ammo.width, this.ammo.height)
    }

    // game over message
    if (this.game.gameOver) {
      context.fillStyle = this.color.text
      context.font = '72px bangers'
      context.textAlign = 'center'
      context.fillText('Game over', this.game.width * 0.5, this.game.height * 0.5)
    }
  }
}
