import Enemy from './base.js'

export default class Moonfish extends Enemy {
  constructor(game) {
    const image = document.getElementById('moonfish')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: 0,
        max: 38,
      },
      speed: 6,
      score: 30,
      health: 5,
      damage: 2.5,
      type: 'moon',
    })
    this.width = 227
    this.height = 240
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
