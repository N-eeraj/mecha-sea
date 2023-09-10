import Enemy from './base.js'

export default class Stalker extends Enemy {
  constructor(game) {
    const image = document.getElementById('stalker')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: 0,
        max: 38,
      },
      speed: 4.5,
      score: 15,
      health: 3,
      damage: 2.5,
    })
    this.width = 243
    this.height = 123
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
