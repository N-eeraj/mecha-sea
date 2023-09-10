import Enemy from './base.js'

export default class Razorfin extends Enemy {
  constructor(game) {
    const image = document.getElementById('razorfin')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: 0,
        max: 38,
      },
      speed: 2,
      score: 15,
      health: 5,
      damage: 1,
    })
    this.width = 187
    this.height = 149
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
