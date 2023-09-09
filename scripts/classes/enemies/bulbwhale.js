import Enemy from './base.js'

export default class Bulbwhale extends Enemy {
  constructor(game) {
    const image = document.getElementById('bulbwhale')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: Math.floor(Math.random() * 2),
        max: 38,
      },
      speed: 3,
      score: 40,
      health: 10,
      damage: 3,
    })
    this.width = 270
    this.height = 219
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
